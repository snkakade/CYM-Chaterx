# CharterX — Website & CYM Operations Portal

CharterX is a premium yacht-growth website with a private commercial operations portal for `Collabrative Yatch Managemnet Limited`.

The public website covers OTA distribution, sales support, digital presence, SEO/SEM, listing quality, and revenue strategy. The protected `/admin` area receives website enquiries, manages follow-ups, creates CYM CharterX invoices, records invoice status, exports records, and keeps an audit trail.

## Revamped design branch

The `revamped` branch contains the refined editorial direction. It keeps the established page structure and adds:

- A once-per-session GSAP yacht loading sequence with reduced-motion fallback
- A quieter cream, deep-petrol, copper, and sea-glass colour system
- Larger spacing and a restrained sans-serif-led type hierarchy
- Two locally hosted, muted yacht films with accessible play/pause controls
- Prepared testimonial/proof positions that must be replaced with verified client quotes before launch
- A lazy-loaded, sandboxed live preview of the OTA Management experience

The film files and their source notes are in `public/videos/`. Replace them with CharterX-owned footage when available.

## Requirements and local development

- Node.js 22.13 or newer
- npm

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Open `http://localhost:3000`. The public website is at `/`; the private portal is at `/admin/login`.

For a production-style Cloudflare runtime preview:

```bash
npm run build
npm run serve
```

Unlike a plain Node preview, `npm run serve` runs the built application in the Cloudflare-compatible runtime so D1 and runtime secrets continue to work.

## Configure admin access

Generate a secure password hash:

```bash
npm run admin:hash-password -- "your-long-unique-password"
```

Place the result in an ignored `.dev.vars` file:

```dotenv
ADMIN_EMAIL="owner@example.com"
ADMIN_PASSWORD_HASH="pbkdf2_sha256$100000$..."
SESSION_SECRET="at-least-32-random-characters"
```

Generate a session secret with `openssl rand -hex 32`. Never commit `.dev.vars`, a plaintext password, or a production secret. Change the production password by generating a new hash and replacing the encrypted Cloudflare secret.

## Operations portal

Routes:

- `/admin/login` — private email and password sign-in
- `/admin` — commercial overview, lead pipeline, follow-up desk, invoices, and activity
- `/admin/invoices/[id]` — printable invoice / Save as PDF view

Features:

- Website enquiries stored in D1 rather than browser storage
- Lead stages: new, contacted, qualified, proposal, won, and lost
- High-priority flag, internal notes, and scheduled follow-up
- Invoice creation directly from a lead
- Multi-line invoices with GBP, EUR, or USD, tax calculation, due date, and notes
- Draft, sent, paid, overdue, and void invoice states
- Printable branded invoice documents
- Lead and invoice CSV exports
- Recent security and workflow activity log
- Dashboard metrics calculated from live records

The local D1 schema initializes automatically. The source-of-truth migration is `drizzle/0001_charterx_admin.sql`; runtime schema statements are kept in `db/schema.ts` for a clean first local run.

## Security model

- PBKDF2-SHA256 password hashing with Cloudflare's supported 100,000-iteration maximum and a per-password salt
- HMAC-signed, eight-hour, HTTP-only sessions
- `Secure` cookies on HTTPS and `SameSite=Strict`
- Server-side authorization on every protected page, write endpoint, and export
- Same-origin checks on administrative mutations
- Login throttling with a temporary block after repeated failures
- Generic sign-in errors to avoid account discovery
- Prepared D1 statements and strict server-side input limits
- Honeypot and IP-hash throttling on public enquiries; raw IP addresses are not stored
- `noindex`, no-cache, frame blocking, MIME sniffing protection, and restrictive browser permissions on admin routes
- Audit records for sign-in, sign-out, lead changes, invoice creation, and invoice status changes

For production, place `/admin*` behind Cloudflare Access as an additional identity layer if the team wants MFA or an email allowlist. The application login remains the required second gate.

## Cloudflare deployment and custom domain

This is now a full-stack application: the contact form, authentication, invoices, and admin pages require server execution and D1. Do not deploy only the static `dist/client` directory.

The project uses Cloudflare's Vite integration and runs in the Workers runtime. In Cloudflare, Workers and Pages are managed from the same **Workers & Pages** area. The native vinext production path is a full-stack Worker with static assets, API routes, SSR, and D1; this is the appropriate equivalent of a Pages site with Functions for this project.

Production setup:

1. Create a D1 database, for example `charterx-production`.
2. Bind it to the application as `DB`.
3. Apply `drizzle/0001_charterx_admin.sql` to the remote database.
4. Add encrypted runtime secrets: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET`.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain for canonical URLs, the sitemap, robots metadata, and social metadata.
6. Set `CLOUDFLARE_D1_DATABASE_NAME` and `CLOUDFLARE_D1_DATABASE_ID` in the build environment.
7. Deploy with the vinext Cloudflare adapter, then attach the valid domain under **Settings → Domains & Routes → Custom Domain**.

Example migration command after Wrangler is authenticated:

```bash
npx wrangler d1 execute charterx-production --remote --file=drizzle/0001_charterx_admin.sql
```

Use encrypted Cloudflare secrets rather than plaintext Wrangler `vars` for credentials. Add the custom domain through Cloudflare rather than manually creating only a CNAME, so Cloudflare can provision the correct route and certificate.

## Project structure

- `app/` — public pages, admin pages, API routes, metadata, robots, sitemap, and styles
- `components/` — public components plus the admin dashboard, login, forms, and invoice controls
- `db/` — runtime schema definitions
- `drizzle/` — deployable D1 migration SQL
- `lib/` — authentication, database access, validation, invoice, lead, and audit logic
- `data/` — editable public services, FAQs, insights, and growth steps
- `public/images/` — WebP imagery and social preview
- `public/videos/` — optimised maritime clips and source notes
- `public/fonts/` — self-hosted Source Serif 4, Source Sans 3, and IBM Plex Mono font system
- `scripts/` — password-hash utility

## Public content and brand updates

- Brand mark and trading name: `components/Logo.tsx`
- Registered legal name and organization schema: `app/layout.tsx`
- Services, FAQs, Growth Engine, and Insights: `data/site.ts`
- Longer page copy: the relevant route under `app/`
- Images: `public/images/`
- Shared motion: `components/MotionProvider.tsx`
- Page metadata: each `app/**/page.tsx`
- Production domain: `NEXT_PUBLIC_SITE_URL`

Keep the registered address, company number, VAT details, bank details, and formal payment terms accurate before issuing a real invoice. Payment instructions can be entered in each invoice's notes field until a verified company billing profile is provided.

## Contact form

`components/ContactForm.tsx` submits to `/api/leads`. Valid submissions are stored in D1 and appear immediately in the admin lead pipeline. The form has client and server validation, a hidden bot trap, payload limits, and repeat-submission throttling.

The strategy-call link remains a placeholder until the final scheduling URL is supplied.

## Final checks

```bash
npm run lint
npm test
```

`npm test` creates a production build and verifies the public routes. Before production launch, also verify the remote D1 binding, secrets, Cloudflare Access policy if used, final custom domain, and a real end-to-end enquiry and invoice flow in the production environment.
