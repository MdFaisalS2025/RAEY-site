/**
 * The real-interface section: what using ProtocolMD actually looks
 * like: a protocol library, a question, an answer with inline
 * citations, and the source passage those citations point to. Same
 * synthetic clinical corpus style used elsewhere on the site, kept
 * consistent on purpose. This is illustrative content, not a live
 * backend, and is labelled as a preview: synthetic, never presented as
 * a real hospital document.
 *
 * Three full documents, not one plus decorative library entries — every
 * item in the library rail is genuinely clickable and swaps the panel.
 */
export const interfaceContent = {
  label: "The interface",
  heading: "This is what a clinician sees.",
  previewNote: "Illustrative preview. Synthetic corpus, not real.",
  libraryHeading: "Approved protocols",
  annotations: {
    citation: "cites the source line",
    version: "current revision",
    approved: "hospital-approved",
    flagged: "not in source",
  },
  documents: [
    {
      libraryLabel: "Sepsis Management Protocol v2.1",
      question: "What's the max norepinephrine dose for septic shock?",
      answer: [
        {
          text: "Obtain two sets of blood cultures before starting antibiotics.",
          citation: 1,
          sourceLine: 1,
          state: "verified" as const,
        },
        {
          text: "If MAP stays under 65 mmHg, start norepinephrine at 0.05 mcg/kg/min.",
          citation: 2,
          sourceLine: 3,
          state: "verified" as const,
        },
        {
          text: "Maximum dose:",
          redacted: "not confirmed in the cited source",
          sourceLine: null,
          state: "flagged" as const,
        },
      ],
      source: {
        name: "Sepsis Management Protocol",
        version: "v2.1",
        lines: [
          "Step 1: Screen with qSOFA.",
          "Step 2: Obtain two sets of blood cultures before antibiotics.",
          "Step 3: Measure lactate.",
          "Step 7: If MAP under 65 mmHg, start norepinephrine at 0.05 mcg/kg/min.",
        ],
      },
    },
    {
      libraryLabel: "Infection Control Policy v4",
      question: "When is contact isolation required?",
      answer: [
        {
          text: "Contact isolation is required for confirmed or suspected multidrug-resistant organisms.",
          citation: 1,
          sourceLine: 0,
          state: "verified" as const,
        },
        {
          text: "Gown and gloves must be worn for all room entry.",
          citation: 2,
          sourceLine: 2,
          state: "verified" as const,
        },
        {
          text: "Duration:",
          redacted: "not confirmed in the cited source",
          sourceLine: null,
          state: "flagged" as const,
        },
      ],
      source: {
        name: "Infection Control Policy",
        version: "v4",
        lines: [
          "Step 1: Confirm MDRO status or suspected MDRO exposure.",
          "Step 2: Post isolation signage at room entry.",
          "Step 3: Gown and gloves required for all room entry.",
          "Step 5: Dedicated equipment stays in the room.",
        ],
      },
    },
    {
      libraryLabel: "Medication Administration SOP v9",
      question: "What is the two-identifier check before administering medication?",
      answer: [
        {
          text: "Confirm patient identity using two identifiers before administration.",
          citation: 1,
          sourceLine: 0,
          state: "verified" as const,
        },
        {
          text: "Cross-check the medication against the active order.",
          citation: 2,
          sourceLine: 1,
          state: "verified" as const,
        },
        {
          text: "Override threshold:",
          redacted: "not confirmed in the cited source",
          sourceLine: null,
          state: "flagged" as const,
        },
      ],
      source: {
        name: "Medication Administration SOP",
        version: "v9",
        lines: [
          "Step 1: Confirm patient identity using two identifiers.",
          "Step 2: Cross-check medication against the active order.",
          "Step 3: Verify dose, route, and time against the order.",
          "Step 6: Document administration immediately after.",
        ],
      },
    },
  ],
} as const;
