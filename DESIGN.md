# CharterX design contract

Status: approved source of truth  
Applies to: public website, mobile navigation, CRM, admin login, forms, concierge, invoices, print/PDF output and future CharterX interfaces

This document protects the established CharterX identity. It is not a mood board. Contributors must preserve these rules unless the owner explicitly changes the brand direction.

## 1. Brand character

CharterX is quiet, assured and commercially precise. It should feel premium without looking ornamental, corporate without looking generic, and maritime without relying on nautical clichés.

Use:

- generous space and clear visual order;
- short, meaningful copy;
- high-quality yacht imagery and HD hero video;
- restrained editorial composition;
- deep petrol, warm paper and champagne accents;
- confident sans-serif typography.

Avoid:

- visual theatre, excessive decoration or dashboard gimmicks;
- blinking lights, pulsing green dots or fake “live” indicators;
- gradients that introduce unrelated colours;
- dual-tone or mixed-font headings;
- oversized text that clips, overlaps or escapes the viewport;
- arrows beside Services or About in the main navigation;
- em dashes in public copy;
- more than two font families.

## 2. Canonical logo

The logo is the word `CHARTERX` in Montserrat with:

- `CHARTER` at weight 300;
- letter spacing of `0.25em`;
- a horizontal champagne strike through `CHARTER` at 50% height;
- `X` at weight 800 in champagne;
- no icon, crest, route line, alternate lettering or improvised lock-up.

The only approved implementation is:

- `website/components/CharterXWordmark.tsx` for the mark itself;
- `website/components/Logo.tsx` for the linked website logo.

Every header, footer, login, CRM panel, invoice and future asset must use that component. Context may change only scale and light/dark contrast. It may not change letter spacing, strike position, typeface, weights or X colour.

Logo colours:

- dark text: `--brand-ink`;
- light text: `--brand-paper`;
- strike and X: `--brand-logo-gold`.

## 3. Design tokens

The coded source of truth is `website/app/design-tokens.css`. Always use its variables.

Core palette:

| Token | Value | Use |
| --- | --- | --- |
| `--brand-ink` | `#071716` | Primary text and dark controls |
| `--brand-deep` | `#0b2220` | Dark sections and CRM surfaces |
| `--brand-cream` | `#f3f0e9` | Warm page backgrounds |
| `--brand-paper` | `#fbfaf7` | Cards, forms and invoice paper |
| `--brand-champagne` | `#d7b77a` | CTAs, fine rules and small accents |
| `--brand-logo-gold` | `#c4a467` | Logo strike and X only |
| `--brand-sea-glass` | `#a8d4c8` | Restrained labels and supporting accents |
| `--brand-muted` | `#64736f` | Secondary copy |
| `--brand-line` | `rgba(7, 23, 22, 0.12)` | Borders and dividers |

Do not add a new colour for a one-off component. First determine whether ink, deep, paper, champagne, sea glass, muted text or a transparent variant solves the need.

## 4. Typography

Only two families are approved:

- Montserrat via `--font-heading`: logo, headings and selected display numerals;
- Inter via `--font-body`: paragraphs, navigation, labels, forms and operational UI.

Rules:

- headings use one font, one weight and one colour across the complete line;
- do not use serif, script, decorative italic or alternate-display fonts;
- `<em>` inside headings must inherit the heading style and cannot create a colour or font change;
- navigation should feel lighter than body emphasis, never extra-bold;
- body copy should normally stay between 16px and 20px with comfortable line height;
- limit text measure to roughly 55–70 characters where practical;
- use sentence case except for concise navigation, labels and metadata.

## 5. Layout and spacing

- Maximum content width: `--brand-max-width` (`1440px`).
- Horizontal page padding: `--brand-page-pad`.
- Major section spacing: `--brand-section-space`.
- Fixed-header anchor offset: `--brand-anchor-offset`.
- Use fluid `clamp()` sizing and test wide desktop, laptop, tablet and phone widths.
- A hero must never clip its headline, support copy or primary CTA.
- A section described as a frame should fit within one desktop viewport when its content volume allows it.
- Preserve clear hierarchy: label, heading, support copy, action.
- Do not add decorative vertical or horizontal guide lines over hero media.

## 6. Header and navigation

- At the top of a page the header is transparent with no blur, border or shadow.
- Blur and the solid/frosted treatment begin only after scrolling.
- Main navigation uses text only for Services and About; no dropdown chevrons.
- Header navigation and CTA typography remain slimmer and smaller than page headings.
- The header CTA is a restrained pill, not a heavy capsule.
- All hash navigation must use the shared header-aware alignment in `MotionProvider.tsx`.

## 7. Heroes and media

- Use only the highest-quality local hero video available, normally the UHD/HD source.
- Video remains muted, looping, plays inline and has a real poster fallback.
- Frame the vessel as the subject; set object position per route when necessary.
- Use a dark overlay only to guarantee legibility, not to hide poor framing.
- Hero headings use one tone and one type style. No highlighted yellow phrase.
- Keep support copy concise and visually subordinate to the headline.
- Honour `prefers-reduced-motion` and never require motion to understand content.

## 8. Buttons and calls to action

- Primary CTA: champagne background, dark ink, slim pill proportions.
- Secondary CTA: quiet text or outlined treatment.
- Prefer direct labels such as “Start your review”, “Check your growth score” and “Request a call”.
- Avoid vague labels, duplicated CTAs or competing primary actions in one frame.
- Verify every CTA destination, including cross-page hashes, on desktop and mobile.
- The Connect concierge must not cover forms, cookie controls, footer links or legal content.

## 9. Copy

- Write short, specific and commercially meaningful sentences.
- Avoid inflated forecasts, vague claims, jargon and theatrical language.
- Do not use em dashes. Use a period, comma, colon or rewritten sentence.
- Use British English for general copy: enquiries, optimisation and organised.
- Use “yacht” or “vessel” precisely; do not scatter nautical metaphors.
- The approved contact email is `connect@cymcharterx.com`.
- The legal name is `Collaborative Yacht Management Limited`, trading as CharterX.

## 10. Motion and interaction

- Motion should clarify entry, hierarchy or state change.
- Keep transitions restrained and generally between 180ms and 850ms.
- No blinking, pulsing or continuously animated status indicators.
- Status changes in the CRM update in place; do not force a full-page reload.
- Preserve keyboard focus, reduced-motion fallbacks and visible focus states.

## 11. CRM, login and invoices

- These interfaces use the same logo, fonts and palette as the public site.
- Operational density may increase, but the visual character must remain quiet and premium.
- Default CRM and invoice currency is USD. Existing records retain their saved currency.
- Invoice documents use warm paper, deep-petrol rules and restrained champagne labels.
- Invoice metadata styles must never target or alter descendants of the logo component.
- Printed invoices must retain logo proportions, readable tables and clear totals.

## 12. Footer and concierge

- Footer uses the deep background, restrained white text and champagne links.
- Admin login, Privacy and “Designed by Shreyash K” must remain visible and unobstructed.
- The designer credit links to `https://shreyashkakade.com/websites` and stays subtle.
- Reserve space for the floating Connect launcher at all responsive widths.

## 13. Accessibility and production readiness

- Maintain WCAG AA contrast for text and controls.
- Every meaningful image requires useful alt text; decorative imagery uses empty alt text or `aria-hidden`.
- Interactive controls require keyboard access and visible focus.
- Do not convey state through colour alone.
- Avoid horizontal overflow and clipped controls.
- Run `npm test` after visual-system changes. The production build and all tests must pass.

## 14. Change checklist

Before considering a design change complete, confirm:

1. The canonical logo component is reused unchanged.
2. Only Montserrat and Inter appear.
3. Headings use one tone and type treatment.
4. No em dash or blinking indicator was introduced.
5. Colours come from `design-tokens.css`.
6. Header behaviour is unchanged unless explicitly requested.
7. Hero and CTA content fits the viewport.
8. Every CTA lands at the correct location below the header.
9. Connect, cookies and footer content do not overlap.
10. CRM and invoice changes preserve session and print behaviour.
11. Desktop and mobile layouts remain usable.
12. The production build and tests pass.
