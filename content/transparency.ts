/**
 * Landing-page transparency section — replaces the old research.tsx +
 * where-we-are.tsx on the main scroll. Deliberately zero statistics: the
 * user's direction is that pilot numbers are "too much for a normal user
 * to understand" on a marketing page. The numbers still exist, verbatim,
 * one click away — see content/research.ts and app/research/page.tsx.
 * This file is prose only: what's built, what's tested, what still needs
 * validation, what is not claimed. No checkmarks, no progress bars — the
 * documentary register the rest of the site's honesty language uses.
 */
export const transparencyContent = {
  label: "Transparency",
  heading: "Where this actually stands",
  sub: "Pre-launch. No hospital has deployed this. No clinician has validated it.",
  quote:
    "A chatbot that answers with confidence and no citation isn't helpful. It's a liability wearing a helpful face. The system only says what it can point to.",
  roadmap: [
    {
      label: "Built",
      body: "Citation-grounded question answering. Numeric verification and redaction of unconfirmed values.",
    },
    {
      label: "Tested",
      body: "Evaluated against real public health guidance documents. Failure modes understood.",
    },
    {
      label: "Needs validation",
      body: "A real hospital corpus, clinician review, and evaluation on a held-out sample.",
    },
    {
      label: "Not claimed",
      body: "Clinical validation. FDA clearance. HIPAA compliance. Deployment or clinical use in any live setting.",
    },
  ],
  researchLinkLabel: "Read the full pilot log",
  researchLinkHref: "/research",
  disclaimer:
    "ProtocolMD is not a substitute for clinical judgment. It's built for protocol retrieval and verification.",
} as const;
