/**
 * The provenance trace — the site's signature visual. Six beats drawn
 * on a canvas (see components/trace/trace-scene.ts), one caption per
 * beat, shown in the left margin as the visitor scrolls through the
 * pinned section. This is the whole product thesis rendered visually:
 * ProtocolMD does not invent an answer, it locates one inside approved
 * hospital documents and shows exactly where it came from.
 */
export const traceContent = {
  label: "How it works",
  question: "What's the max norepinephrine dose for septic shock?",
  beats: [
    "A hospital's approved protocols.",
    "Indexed, versioned, structured.",
    "A question comes in.",
    "One approved source.",
    "The exact passage.",
    "The answer, with its source.",
  ],
  staticCaption: "Every answer traces back to one approved passage.",
} as const;
