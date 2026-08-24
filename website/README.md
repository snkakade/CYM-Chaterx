# CharterX website and operations portal

Read [`../DESIGN.md`](../DESIGN.md) before changing any public, admin or invoice interface. Repository instructions are in [`../AGENTS.md`](../AGENTS.md).

This directory contains the complete CharterX application. It includes the public marketing website, enquiry capture, the private CYM operations portal, invoice generation and the Cloudflare runtime configuration.

## Local development

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Open `http://127.0.0.1:3000`. The public website is at `/`; the private portal is at `/admin/login`.

For a production build running against the local Cloudflare-compatible runtime:

```bash
npm run build
npm run serve
```

The repository root also contains a small Live Server launcher. Port 5501 redirects to the full application on port 3000 because authentication, API routes and D1 cannot run inside a static Live Server process.

## Admin access

Generate a password hash:

```bash
npm run admin:hash-password -- "your-long-unique-password"
```

Store the email, hash and session secret in the ignored `.dev.vars` file:

```dotenv
ADMIN_EMAIL="owner@example.com"
ADMIN_PASSWORD_HASH="pbkdf2_sha256$100000$..."
SESSION_SECRET="at-least-32-random-characters"
```

Never commit `.dev.vars`, plaintext passwords or production secrets.

## Application structure

- `app/`: public routes, admin routes, API handlers, metadata and styles
- `components/`: shared public and operations interfaces
- `data/`: editable service, FAQ and insight content
- `db/`: runtime D1 schema definitions
- `drizzle/`: deployable D1 migrations
- `lib/`: authentication, database, lead, invoice and audit logic
- `public/images/`: runtime images and social previews
- `public/videos/`: runtime video deliveries and their manifest
- `scripts/`: development utilities
- `tests/`: rendered route and design-contract checks
- `worker/`: vinext Worker entry point
- `build/`: local Sites-compatible build integration

Original image and video masters are stored outside this application in the ignored repository-level `source-assets/` directory. Only assets referenced by the live website belong in `public/`.

## Operations portal

The protected `/admin` area manages:

- website enquiries and lead stages;
- priorities, internal notes and follow-up dates;
- USD-default invoices with saved-record currency preservation;
- printable CharterX invoice documents;
- CSV exports and recent audit activity.

Every protected page and mutation checks the signed admin session. Production should use encrypted Cloudflare secrets, with Cloudflare Access as an optional additional identity layer.

## Cloudflare production configuration

The app requires server execution and D1. Do not deploy only `dist/client`.

1. Create and bind a D1 database as `DB`.
2. Apply the migrations in `drizzle/` in numeric order.
3. Add encrypted `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` values.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Set the production D1 name and ID in the build environment.
6. Deploy the full vinext Worker and attach the custom domain.

## Verification

```bash
npm run lint
npm test
```

`npm test` creates a production build and checks the rendered public routes, hero media, navigation behaviour and design contract.
