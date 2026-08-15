/**
 * The /product page: the full platform, one level deeper than the
 * homepage's citation-first pitch. The homepage stays deliberately
 * simple (per the redesign plan) — this page is where "what does RAEY
 * actually do" gets a real answer, without inventing anything the
 * platform doesn't currently do. Same honesty rules as the rest of the
 * site: no clinical-validation claim, no FDA/HIPAA claim, no em dashes.
 */
export const productContent = {
  hero: {
    eyebrow: "The full platform",
    heading: "Everything RAEY actually does.",
    sub: "The homepage makes one point: an answer, and a source to check it against. That's true, but it's not the whole system. This page is the rest of it, the parts that make RAEY something a hospital could actually run.",
    disclaimer:
      "Built and running today, against real documents. Not yet deployed at a real hospital, and no clinician has used it in a live clinical setting.",
  },

  roles: {
    label: "Access",
    heading: "Four roles. What you can't see is enforced, not just hidden.",
    sub: "Permissions are checked on the server for every request, not just used to decide what a page renders. A clinical login can't reach what a compliance login can by changing the URL.",
    items: [
      {
        name: "Clinical staff",
        body: "Ask questions, run bedside lookups, work from the SOPs their department owns.",
      },
      {
        name: "Educator",
        body: "Run scenario training and quick-reference sessions, see where real usage is showing a training gap.",
      },
      {
        name: "Governance & compliance",
        body: "Review proposed SOP changes, track the compliance heatmap, sign off on attestations.",
      },
      {
        name: "System admin",
        body: "Watch infrastructure and content health, manage the system itself.",
      },
    ],
  },

  pipeline: {
    label: "Ask RAEY",
    heading: "How a question becomes an answer you can check.",
    sub: "Five steps, each one there because skipping it would let something unverified reach the reader.",
    steps: [
      {
        title: "Ask, safely.",
        body: "A clinician types a plain-language question into the composer. Before it's sent anywhere, a PHI scanner checks it for identifiable patient information and flags it.",
      },
      {
        title: "Find the right passages.",
        body: "A hybrid search, dense and sparse together, with boosting tuned to the type of question being asked. Compound questions get a second retrieval pass. A cross-encoder reranker narrows everything down to what's actually relevant.",
      },
      {
        title: "Check before answering.",
        body: "An evidence-sufficiency gate asks whether what was found actually supports a confident answer, scoring relevance, keyword overlap, entity grounding, and semantic fit. If nothing clears the bar, RAEY says so and offers to search external literature instead of guessing.",
      },
      {
        title: "Answer, constrained.",
        body: "Generation runs on an LLM that's only allowed to use the retrieved SOP text, with a safe extractive fallback if the model is unavailable. Every clinical sentence carries a citation tied to the exact source passage, down to the character offset where possible.",
      },
      {
        title: "Verify the numbers.",
        body: "A separate verifier checks every dose, threshold, and timeframe the answer states against the source it's citing. A number that isn't actually grounded gets redacted, not guessed at.",
      },
    ],
  },

  actions: {
    label: "From an answer",
    heading: "An answer is a starting point, not a dead end.",
    sub: "Every answer comes with a real menu of what to do next, not just a copy button.",
    items: [
      {
        name: "External Evidence",
        body: "A live search across PubMed, Europe PMC, WHO, CDC, ClinicalTrials.gov, FDA, MedlinePlus, and CMS, graded by evidence strength, with real abstracts and excerpts, not just titles.",
      },
      {
        name: "Trust & Audit",
        body: "The faithfulness checks behind that specific answer, threshold, sequence, and contraindication checks, plus a confidence tier.",
      },
      {
        name: "SOP Version History",
        body: "A full timeline of changes to the source document, committee comments, and a version-to-version diff viewer.",
      },
      {
        name: "Compare with Clinical Evidence",
        body: "Fetches a real, topically matched published guideline and checks the SOP against it step by step: match, partial, or missing.",
      },
      {
        name: "Propose an SOP Update",
        body: "Opens a real governance workflow: committee review, voting, approval, and, if the update carries a compliance flag, a tracked staff acknowledgment requirement.",
      },
      {
        name: "Plain-language mode, regenerate, feedback",
        body: "Switch the answer to plain language, ask it again, leave a thumbs up or down, or flag a clinical override.",
      },
    ],
  },

  beyond: {
    label: "Beyond chat",
    heading: "The chat window is the front door, not the whole building.",
    sub: "",
    items: [
      {
        name: "SOP Library",
        body: "Full-text search across every approved document, with exact-passage citation viewing.",
      },
      {
        name: "Bedside Lookup",
        body: "Quick voice or text queries built for the point of care, not a desk.",
      },
      {
        name: "Scenario Training & Quick Reference",
        body: "Structured practice for education, separate from live clinical use.",
      },
      {
        name: "Governance suite",
        body: "SOP proposals, CAPA workflows, incident and exception reporting, and Part-11-style attestation signing.",
      },
      {
        name: "Role dashboards",
        body: "Clinical staff see their open proposals and department SOPs. Governance sees pending reviews and a compliance heatmap. Educators see training-need signals from real usage gaps. Admins see live infrastructure and content health.",
      },
      {
        name: "Evaluation",
        body: "RAEY runs its own quality metrics against itself: faithfulness, retrieval accuracy, and an adversarial red-team suite, with honest disclosure whenever a run used the extractive fallback instead of a real model.",
      },
    ],
  },

  integration: {
    label: "What it plugs into",
    heading: "Built to sit on top of what you already run, not replace it.",
    sub: "RAEY isn't meant to become a hospital's new system of record. It's a layer that reads from what already exists and writes back into it.",
    items: [
      {
        name: "It doesn't own your SOPs.",
        body: "RAEY ingests documents your hospital already has and answers strictly from those. The system of record for policy stays exactly where it already lives.",
      },
      {
        name: "CDS Hooks, not another app to open.",
        body: "A standard integration point lets your EMR call into RAEY at moments like opening a chart, so guidance shows up inside the workflow clinicians already use.",
      },
      {
        name: "Identity federates, it doesn't fork.",
        body: "A real deployment is meant to authenticate against your hospital's own identity provider, SAML, OAuth, or LDAP, instead of maintaining a second set of accounts.",
      },
      {
        name: "External evidence is fetched live, not stockpiled.",
        body: "RAEY doesn't maintain its own medical literature library. When it looks outside your SOPs, it queries PubMed, WHO, CDC, and the rest live, and cites straight back to them.",
      },
    ],
  },

  honesty: {
    body: "Everything on this page is built and running against real data today, not a mockup. That's a different claim from \"deployed in a hospital,\" and we're only making the first one. RAEY is not FDA cleared and isn't presented as HIPAA-certified. No hospital has used it in a live clinical setting yet.",
    linkLabel: "Read the full pilot log",
    linkHref: "/research",
  },

  cta: {
    label: "Talk to us about a pilot",
    href: "/#pilot",
  },
} as const;
