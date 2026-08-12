# Content TODOs

Everything below is a real gap in `/content` or a component, marked
`TODO(client:...)` in source. The site builds and deploys with these in
place — it must not **launch** until they're resolved. Check items off as
they're filled in and redeploy.

| Marker | Where | What's needed |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel env settings | Production domain, once purchased/verified. Used for OG/canonical URLs (see `app/layout.tsx`); resolves to localhost in dev and the Vercel preview URL in prod until set. |
| `TODO(client:contact-email)` | `content/site.ts` | Real inbox for demo requests and the Resend-down fallback. Until set, the footer and `/privacy` show honest "coming soon" text instead of a broken link, and the form's error state omits the fallback contact line. |
| `TODO(client:linkedin)` | `content/site.ts` | Company or founder LinkedIn URL. Until set, the footer simply omits the LinkedIn link rather than pointing anywhere broken. |

**Also required before launch, not before build:**
- `RESEND_API_KEY`, `DEMO_REQUEST_TO_EMAIL`, `DEMO_REQUEST_FROM_EMAIL` in Vercel's env settings (see `.env.example`) — the "Request pilot" form degrades honestly without them (shows a real error naming the fallback contact) but won't actually send email until they're set.
