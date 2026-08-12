/**
 * Final CTA section, right above the pilot-request form. Previously
 * hardcoded inside components/sections/demo.tsx; moved here so every
 * section's copy lives in content/ without exception.
 */
export const ctaContent = {
  headlineLines: ["Start with a pilot on", "your own approved protocols."],
  sub: "Tell us about your hospital, and we'll follow up.",
} as const;
