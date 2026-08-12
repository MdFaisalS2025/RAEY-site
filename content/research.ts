/**
 * The falsification arc, in order. The arc is the credibility (plan §7).
 * Every number here is real, from actual pilot runs against real CDC/AHRQ
 * documents, not simulated. No number appears without its caveat.
 */
export const researchContent = {
  heading: "Research",
  sub: "A real pilot result, reported honestly, including the parts that didn't work.",
  venue:
    "Target venue: ACM DocEng, a document-engineering venue, not a clinical one. There is no clinician validation here to support a clinical claim.",
  arc: [
    {
      title: "A prior-art check killed the original claim.",
      body: "The W3C Web Annotation Data Model already standardizes anchoring text to a verbatim quote. The real gap is anchoring paraphrased content, where a verbatim quote doesn't exist to anchor to.",
      stat: null,
    },
    {
      title: "Pilot 1: the baseline fails cleanly.",
      body: "24 hand-authored paraphrase pairs from real CDC guidance. A W3C-style verbatim/normalized quote match can't locate a genuine paraphrase, confirming the problem is real before trying to solve it.",
      stat: "0.0 coverage · 24 pairs, CDC",
    },
    {
      title: "Pilot 2: the hypothesis was falsified.",
      body: "Extended to 33 pairs across CDC and AHRQ. A plain embedding-similarity baseline beat the structural method under test, and the gap widened on exactly the long, heavily-paraphrased content the method was built for.",
      stat: "structural 0.576 vs. embedding 1.0 coverage · 33 pairs, 2 agencies",
    },
    {
      title: "Two redesigns, two more failures, and a diagnosis.",
      body: "Rebuilding the accept/reject gate around semantic similarity made it worse, not better: whole-block similarity couldn't tell a document's own sibling paragraphs apart, and clause-level matching saturated at a perfect score for right and wrong answers alike. Sentences in one clinical guideline share too much vocabulary for an absolute threshold to discriminate.",
      stat: null,
    },
    {
      title: "The fix that worked: a relative, not absolute, gate.",
      body: "Instead of “does this match well enough,” ask “does this match better than every real alternative in the same document.” Checked before seeing the aggregate result: the correct passage ranked first in every case, with a real margin every time.",
      stat: "33/33 rank check · IoU 0.999 · 0 false anchors",
    },
    {
      title: "An adversarial test broke it, and explained exactly how.",
      body: "A fifth document, built deliberately with decoy citation numbers, exposed a real failure mode: the safety comparison is only as good as the search feeding it, and a systemic decoy pattern corrupts that search for every candidate, not just the primary one.",
      stat: "2 false anchors in 5 adversarial pairs",
    },
    {
      title: "What this is, honestly.",
      body: "A real, mechanistically-understood pilot result, not a validated method. 38 pairs, one annotator, no held-out split, thresholds calibrated on the same data they're reported on, and the fix for the decoy-search problem is still unbuilt.",
      stat: null,
    },
  ],
} as const;
