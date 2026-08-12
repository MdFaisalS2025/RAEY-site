/**
 * Where a protocol question actually gets asked — a dense typographic
 * index, near-appendix in tone, not eight more cards. Operational only:
 * no clinical outcome claims, no "reduces errors by X%."
 */
export const useCasesContent = {
  label: "Where it's used",
  heading: "Built around workflows, not a search box.",
  items: [
    { title: "Emergency protocols", body: "Fast lookup under pressure." },
    { title: "Sepsis workflows", body: "Step-by-step, grounded in the source." },
    { title: "Medication administration", body: "Dosing steps, flagged when missing." },
    { title: "Infection control", body: "Isolation steps tied to the current revision." },
    { title: "Nursing protocols", body: "Bedside questions, answered from the SOP." },
    { title: "Quality and safety", body: "A citeable record for review." },
    { title: "Onboarding", body: "New staff ask, instead of parsing manuals cold." },
    { title: "Policy change review", body: "Surfaces what a revision changed." },
  ],
} as const;
