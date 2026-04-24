# EyesPilot Landing Page

Route: `/` → `App.tsx` → `src/pages/Index.tsx` (exports `EyesPilotLanding` as default)

## Section map

| Order | Component | Anchor |
|-------|-----------|--------|
| 1 | `Navbar` | — |
| 2 | `HeroSection` | — |
| 3 | `ProblemSection` | `#probleme` |
| 4 | `SolutionSection` | `#solution` |
| 5 | `StepsSection` | `#methode` |
| 6 | `TrustSection` | — |
| 7 | `BetaSection` | `#tarifs` |
| 8 | `FAQSection` | `#faq` |
| 9 | `CTASection` | — |
| 10 | `Footer` | — |

All sections live in a single file: `src/pages/Index.tsx`.

## Constants to update before going live

```ts
const CALENDLY_URL = "https://calendly.com/VOTRE-LIEN-ICI"; // ← replace with your link
const CONTACT_EMAIL = "contact@eyespilot.net";
const CONTACT_PHONE = "+33644832903";
const CONTACT_PHONE_DISPLAY = "06 44 83 29 03";
```

## Logo

`EyesPilotLogo` is an SVG with a cursor-tracking pupil (via `mousemove` on `window`).
Pass `interactive={false}` to freeze the pupil — used in the hero badge and footer.

## Custom Tailwind classes

These classes are defined in `src/index.css` (not in `tailwind.config.ts`):

- `navbar-glass` — frosted-glass effect for the sticky nav
- `card-blue` — subtle blue-tinted card background
- `hero-gradient` — primary gradient used on service icon backgrounds

## Adding a section

1. Write a new component in `src/pages/Index.tsx`
2. Drop it into `EyesPilotLanding` at the desired position
3. If it needs a nav anchor, add `<a href="#your-id">` to the `Navbar` link lists (both desktop and mobile)

## Tests

```bash
npm test
```

Test file: `src/test/landing.test.tsx`

Covers: render smoke test, hero heading, all section headings, CTA link attributes, FAQ accordion toggle, contact info, mobile menu toggle.
