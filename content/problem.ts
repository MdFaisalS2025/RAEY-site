export const problemContent = {
  label: "The problem",
  heading: "What's actually wrong on the ward",
  sub: "Four ways a protocol question becomes a guess.",
  items: [
    {
      title: "The answer is buried.",
      body: "Forty pages of PDF. One paragraph, ten minutes to find at 2am.",
    },
    {
      title: "The version matters.",
      body: "General AI answers from training data, not your hospital's current revision.",
    },
    {
      title: "Confidence without citations is dangerous.",
      body: "A wrong number can sound just as confident as a right one.",
    },
    {
      title: "Protocol changes don't announce themselves.",
      body: "A guideline updates. The printed copy on the shelf doesn't know that.",
    },
  ],
} as const;
