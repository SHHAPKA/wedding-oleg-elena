# wedding-oleg-elena

Wedding landing page scaffold with RSVP form and a minimal Supabase-backed admin area.

## Local setup

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase/schema.sql`.
3. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. In Supabase Auth, create an admin user with email/password.
5. Run the app:

```bash
npm run dev
```

Routes:

- `/` - landing page scaffold with RSVP form
- `/admin/login` - admin login
- `/admin/responses` - RSVP responses table

## Checks

```bash
npm run lint
npm run build
```

## Ubuntu VPS deployment with Caddy

This app needs a running Next.js server. The RSVP form uses server actions and
the admin responses page is rendered on demand, so do not deploy it as a static
HTML export.

The production setup is:

```text
Internet -> Caddy -> Next.js on 127.0.0.1:3000 -> Supabase
```

The repo includes:

- `deploy/ubuntu/wedding-site.service` - a `systemd` service template.
- `deploy/ubuntu/Caddyfile` - a Caddy reverse proxy block.
- `.nvmrc` - the preferred Node.js major version for this project.

### 1. Prepare Supabase

1. Create the Supabase project if it does not exist yet.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Create the admin email/password user in Supabase Auth.
4. Keep these values ready for the server:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Prepare the VPS

1. Point the domain A or AAAA record to the VPS IP address.
2. Connect to the Ubuntu server over SSH.
3. Install Git, Node.js 24 LTS, and Caddy. Node.js must be available
   system-wide at `/usr/bin/npm` for the included service file.
4. Allow inbound HTTP and HTTPS traffic to ports `80` and `443`.
5. Create the unprivileged app user and app directory:

```bash
sudo useradd --system --user-group --home-dir /var/www/wedding-oleg-elena --shell /usr/sbin/nologin wedding
sudo mkdir -p /var/www/wedding-oleg-elena
sudo chown wedding:wedding /var/www/wedding-oleg-elena
```

### 3. Clone, configure, and build

Clone the repository into the app directory:

```bash
sudo -u wedding git clone <repository-url> /var/www/wedding-oleg-elena
cd /var/www/wedding-oleg-elena
```

Create the production env file before building:

```bash
sudo -u wedding nano .env.production.local
```

Set the Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Install dependencies and build the app:

```bash
sudo -u wedding npm ci
sudo -u wedding npm run build
```

### 4. Enable the Next.js service

Copy the service template and start it:

```bash
sudo cp deploy/ubuntu/wedding-site.service /etc/systemd/system/wedding-site.service
sudo systemctl daemon-reload
sudo systemctl enable --now wedding-site
sudo systemctl status wedding-site
```

The service listens only on `127.0.0.1:3000`. Check its logs with:

```bash
journalctl -u wedding-site -f
```

### 5. Connect Caddy

Open `/etc/caddy/Caddyfile`, copy the block from `deploy/ubuntu/Caddyfile`,
and replace `example.com` with the real domain:

```caddy
your-domain.example {
    reverse_proxy 127.0.0.1:3000
}
```

Validate and reload Caddy:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy should request HTTPS certificates automatically once the domain points to
the server and ports `80` and `443` are reachable.

### 6. Verify the live site

Run the HTTP check and then test the user flows in a browser:

```bash
curl -I https://your-domain.example
```

1. Open `/` and submit a test RSVP response.
2. Open `/admin/login` and sign in with the Supabase admin user.
3. Confirm that the response appears on `/admin/responses`.

If Caddy needs inspection too, use:

```bash
sudo journalctl -u caddy -f
```

### 7. Deploy later updates

For each new release:

```bash
cd /var/www/wedding-oleg-elena
sudo -u wedding git pull
sudo -u wedding npm ci
sudo -u wedding npm run build
sudo systemctl restart wedding-site
```
