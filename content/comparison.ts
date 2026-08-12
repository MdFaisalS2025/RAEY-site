/**
 * "General chatbot" vs. ProtocolMD. Factual differences in design intent,
 * not a takedown of any named competitor. Per the redesign plan, the
 * comparison must stay accurate and make no outcome claims on either side.
 */
export const comparisonContent = {
  label: "Comparison",
  heading: "Why ProtocolMD is different",
  sub: "A narrower, more accountable system than a general chatbot, built around one hospital's approved sources.",
  columns: {
    general: {
      label: "General chatbot",
      points: [
        "Trained on the internet, not your hospital's documents",
        "May not know your current, approved revision",
        "States an answer, no passage to check it against",
        "No built-in way to say \"I don't know\"",
      ],
    },
    protocolmd: {
      label: "ProtocolMD",
      points: [
        "Grounded only in protocols your hospital approves",
        "Tracks which revision is currently in force",
        "Every sentence cites its source passage",
        "Flags what it can't verify instead of guessing",
      ],
    },
  },
} as const;
