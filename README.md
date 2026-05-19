# wedding-oleg-elena

Wedding landing page scaffold with RSVP form and a minimal Supabase-backed admin area.

## Setup

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
