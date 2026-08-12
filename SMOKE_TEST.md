# Pre-deploy smoke test

No automated test suite exists for this site (a deliberate tradeoff for
a marketing/pilot-request site with no complex business logic). Run
this manually before every deploy that touches `app/`, `components/`,
`content/`, or `lib/`. Takes about 5 minutes.

## Build

- [ ] `npm run lint` — zero errors
- [ ] `npm run build` — completes clean, no red text in the output
- [ ] `package.json` still lists exactly four runtime dependencies
      (`next`, `react`, `react-dom`, `resend`) unless a dependency
      change was intentional

## Desktop (1440px+)

- [ ] Hero loads: headline, sub-copy, both CTA buttons, the animated
      document-card field to the right of the text
- [ ] Header nav links scroll to the right sections; the active link
      highlights as you scroll
- [ ] "How it works" section: the pinned trace animation plays through
      all six beats as you scroll
- [ ] Product/interface section: clicking a library item swaps the
      panel; hovering a citation highlights its source line and back
- [ ] Comparison section: the diagram draws itself in on scroll,
      hovering either side dims the other
- [ ] Transparency section renders, "Read the full pilot log" link
      goes to `/research`
- [ ] Pilot-request form: submit with a missing field shows the right
      inline error; submit with a bad email shows the right error

## Mobile (375px) and tablet (768px)

- [ ] No horizontal scroll/overflow anywhere on the page
- [ ] Hamburger menu opens, all nav links present, closes on link tap
      and on Escape
- [ ] Hero's animated card field is hidden (by design, `md:` and up
      only) — no overlapping-text bug
- [ ] Trace section falls back to the static frame, not the pinned
      scroll animation

## Reduced motion

- [ ] With OS-level "reduce motion" on: neither the trace canvas nor
      the hero card field animates; content is still fully visible

## No JavaScript

- [ ] Disable JS, load the page: hero heading, all section headings,
      and the interface section's content still render (server-side)

## Forms — the real path, not just the degraded one

- [ ] With `RESEND_API_KEY`/`DEMO_REQUEST_TO_EMAIL`/`DEMO_REQUEST_FROM_EMAIL`
      unset: submitting shows an honest error, never a fake success
- [ ] With those three set to real values: submit a real test entry
      and confirm the email actually arrives at the inbox
      `DEMO_REQUEST_TO_EMAIL` points to

## Content

- [ ] Grep visible copy for `—` (em dash), `TODO(`, and
      HIPAA/FDA/"clinically validated" language outside the one
      disclaimer line in `content/transparency.ts`
- [ ] `/research` still shows `content/research.ts` verbatim

## Cross-browser (do this before the *first* public launch, and after
any change to `components/archive/` or `components/trace/`)

- [ ] Chrome, Firefox, Safari (desktop), Edge — hero and trace
      animations both actually render, not just "build clean"
- [ ] iOS Safari, Android Chrome — same check on a real device if
      possible, not just a resized desktop window
