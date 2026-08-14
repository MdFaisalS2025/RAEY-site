/**
 * Hero copy. One headline, one sentence, two actions — the plan's
 * "do not put a wall of text in the hero." The visual is The Archive
 * (components/archive/archive-field.tsx), a field of scattered
 * document cards in CSS 3D space, mounted inside hero.tsx.
 */
export const heroContent = {
  eyebrow: "Protocol intelligence for hospitals",
  headline: "Your hospital already has the answer.",
  headlineAccent: "RAEY helps you trust it.",
  sub: "It cites the exact passage behind every answer, and flags what it can't verify.",

  // The full-bleed rule beneath the hero, three short facts replacing
  // the old five-pill trust strip.
  facts: [
    "From your hospital's own approved documents",
    "Every answer shows its source",
    "Unverified values flagged, not guessed",
  ],
} as const;
