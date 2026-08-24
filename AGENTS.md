# CharterX repository instructions

Before changing any public page, admin page, invoice, component, stylesheet, motion, copy, image, video, or responsive behaviour, read [`DESIGN.md`](DESIGN.md) in full.

The rules in `DESIGN.md` are the approved CharterX design contract. They apply to human contributors and coding agents, including Codex and Antigravity.

Mandatory safeguards:

- Never recreate, redraw, restyle, or approximate the CharterX logo. Render `website/components/CharterXWordmark.tsx` directly or use `website/components/Logo.tsx` when the mark links home.
- Never introduce a third font, split-colour heading, coloured word inside a heading, blinking indicator, decorative dashboard light, em dash, or unapproved brand colour.
- Reuse tokens from `website/app/design-tokens.css`. Do not hard-code a near-match when a token exists.
- Preserve the transparent-at-rest and blurred-on-scroll header behaviour.
- Keep CTA destinations header-aware and verify that anchored content is visible after navigation.
- Public pages, the CRM, login and invoices belong to one brand system. Do not create an isolated admin or invoice theme.
- Do not deploy or push unless the user explicitly requests it. Keep local work on the configured local preview.
- Run the production build and automated tests after design-system changes.

If a request conflicts with `DESIGN.md`, follow the user’s explicit request and update `DESIGN.md` in the same change so the repository remains truthful.
