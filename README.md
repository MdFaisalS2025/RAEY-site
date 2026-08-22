# RAEY marketing site

Next.js 16 (App Router) + Tailwind v4 + TypeScript. Four runtime dependencies, no CMS.

## Editing copy

All visible copy lives in `content/*.ts` as plain typed objects. Components only render it; there's
no JSX in `content/`. If you're changing what the site says, that's almost always the only folder
you need to touch.

Two files track ongoing work:

- `CONTENT_TODO.md` — real gaps marked `TODO(client:...)` in source (a placeholder contact email,
  an unset production domain). The site builds and deploys with these in place, but shouldn't launch
  until they're resolved.
- `SMOKE_TEST.md` — a manual pre-deploy checklist.

## Development

```bash
npm run dev     # Turbopack dev server
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

`npm run dev` has an intermittent Turbopack font-resolution issue in some environments after the
`.next` cache is cleared. If it fails to start, run `npm run build && npm run start` instead.

## Structure

- `app/` — routes. Each page's own copy lives in the matching `content/*.ts` file.
- `components/layout/` — the grid, section, and rule primitives every page composes with.
- `components/motion/` — the `Reveal`/`RevealStagger` scroll-entrance system.
- `components/brand/` — the mark and wordmark, both reading from `components/brand/mark-geometry.ts`
  as the single source of the logo's coordinates.
- `lib/` — the request-demo server action, an in-memory rate limiter, and shared palette/motion
  utilities used outside CSS (Canvas 2D, `next/og` image generation).

## Deploying

Deploys to Vercel on push to `master`. Requires `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
`DEMO_REQUEST_TO_EMAIL`, and `DEMO_REQUEST_FROM_EMAIL` set in Vercel's environment settings — see
`.env.example` and `CONTENT_TODO.md` for what's still outstanding.
