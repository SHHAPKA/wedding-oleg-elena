# VPS deployment

This project runs as a Next.js server. The RSVP form uses server actions and the admin responses page is rendered on demand, so the production server must run Node.js behind a reverse proxy.

The deployment below targets:

- Ubuntu 24.04
- Node.js 24 LTS
- `systemd` for the app process
- Caddy for the public reverse proxy and HTTPS
- Manual updates from the GitHub `main` branch
- A root domain as canonical, with `www` redirected to it

Replace these values before running commands:

```bash
DOMAIN=wedding-oleg-elena.ru
VPS_IPV4=91.210.106.59
APP_DIR=/var/www/wedding-oleg-elena
```

## 1. Prepare the VPS

Log in to the fresh VPS as `root` or as a sudo-capable user. Create a dedicated deploy user before cloning the app:

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
sudoedit /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Paste the deploy user's public SSH key into `authorized_keys`. Keep the current admin SSH session open until a new SSH login as `deploy` succeeds.

Install base packages and open only SSH, HTTP, and HTTPS in `ufw`:

```bash
sudo apt update
sudo apt install -y ca-certificates curl git ufw xz-utils
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```

Install Node.js 24 LTS from the official Linux x64 archive. The version below is the current 24 LTS release used for this guide; replace it with a newer Node.js 24 LTS patch version when one is available:

```bash
NODE_VERSION=24.16.0
cd /tmp
curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz"
sudo tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1
node -v
npm -v
```

Install Caddy from its official Debian/Ubuntu package repository:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https gnupg
curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/gpg.key" | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
sudo chmod o+r /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
caddy version
```

## 2. Clone and build the app

Clone the repository as `deploy`:

```bash
sudo install -d -m 755 -o deploy -g deploy "$APP_DIR"
sudo -u deploy git clone https://github.com/SHHAPKA/wedding-oleg-elena.git "$APP_DIR"
cd "$APP_DIR"
```

Create the production environment file. It is intentionally ignored by Git:

```bash
sudo -u deploy cp .env.example .env.local
sudo -u deploy nano .env.local
sudo chmod 600 .env.local
```

Fill in the Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Install dependencies and create the production build:

```bash
sudo -u deploy npm ci
sudo -u deploy npm run build
```

## 3. Run Next.js with systemd

Install the service template from the repository:

```bash
sudo cp "$APP_DIR/deploy/systemd/wedding-oleg-elena.service" /etc/systemd/system/wedding-oleg-elena.service
sudo systemctl daemon-reload
sudo systemctl enable --now wedding-oleg-elena
sudo systemctl status wedding-oleg-elena --no-pager
```

The service runs `next start` on `127.0.0.1:3000`, loads `.env.local`, restarts on failure, and is not exposed directly to the internet.

Check the local backend before adding the domain:

```bash
curl -I http://127.0.0.1:3000
sudo journalctl -u wedding-oleg-elena -n 100 --no-pager
```

## 4. Point DNS to the VPS

In the DNS panel for the domain, add these records:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | VPS IPv4 address |
| `A` | `www` | VPS IPv4 address |

Do not add an `AAAA` record until IPv6 is configured and tested on the VPS. Wait until both hostnames resolve to the VPS before expecting Caddy to issue public certificates:

```bash
getent hosts "$DOMAIN"
getent hosts "www.$DOMAIN"
```

## 5. Enable Caddy and HTTPS

Copy the Caddyfile template and replace `example.com` with the real root domain in both server blocks:

```bash
sudo cp "$APP_DIR/deploy/caddy/Caddyfile" /etc/caddy/Caddyfile
sudoedit /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl status caddy --no-pager
```

The first Caddy server block proxies the root domain to the local Next.js process. The second redirects `www` to the root domain while preserving the path and query string.

Check the public endpoints after DNS and certificate issuance finish:

```bash
curl -I "https://$DOMAIN"
curl -I "http://$DOMAIN"
curl -I "https://www.$DOMAIN"
sudo journalctl -u caddy -n 100 --no-pager
```

## 6. Verify the release

Verify these flows in a browser:

1. Open the root domain over HTTPS.
2. Confirm that HTTP upgrades to HTTPS.
3. Confirm that `www` redirects to the root domain.
4. Submit the RSVP form and confirm that the row appears in Supabase.
5. Sign in at `/admin/login` and open `/admin/responses`.
6. Reboot the VPS and confirm that `systemd` and Caddy bring the site back automatically.

Useful diagnostics:

```bash
sudo systemctl status wedding-oleg-elena caddy --no-pager
sudo journalctl -u wedding-oleg-elena -f
sudo journalctl -u caddy -f
```

## 7. Publish updates

Log in as `deploy` and use the same app directory for manual updates:

```bash
cd "$APP_DIR"
git pull --ff-only origin main
npm ci
npm run build
sudo systemctl restart wedding-oleg-elena
sudo systemctl status wedding-oleg-elena --no-pager
```

Run the browser checks again after the restart. If a release must be rolled back, inspect recent commits, build the previous known-good commit, and restart the service:

```bash
cd "$APP_DIR"
git log --oneline -n 10
git switch --detach PREVIOUS_COMMIT
npm ci
npm run build
sudo systemctl restart wedding-oleg-elena
```

Return the server checkout to the deploy branch before the next normal update:

```bash
cd "$APP_DIR"
git switch main
git pull --ff-only origin main
```
