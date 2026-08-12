/**
 * Site-wide copy and config. No CMS: this file (and its siblings in
 * /content) is the thing a non-engineer edits. Keep JSX out of here.
 */

export const siteConfig = {
  name: "ProtocolMD",
  tagline: "Hospital-approved answers, not internet guesses.",

  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Product", href: "#interface" },
    { label: "Transparency", href: "#transparency" },
  ],

  cta: { label: "Request pilot", href: "#pilot" },
  ctaSecondary: { label: "See how it works", href: "#how-it-works" },

  // TODO(client:contact-email) — real inbox for demo requests / fallback
  // when the Resend form is unavailable.
  contactEmail: "TODO(client:contact-email)",

  // TODO(client:linkedin) — company or founder LinkedIn URL.
  linkedIn: "TODO(client:linkedin)",
} as const;

/**
 * True while a config value is still the unfilled TODO(...) placeholder.
 * Callers use this to render honest fallback text instead of a broken
 * mailto: link or a relative href that resolves to a 404 — see
 * components/layout/footer.tsx, app/privacy/page.tsx, and
 * lib/actions/request-demo.ts.
 */
export function isPlaceholder(value: string): boolean {
  return value.startsWith("TODO(");
}
