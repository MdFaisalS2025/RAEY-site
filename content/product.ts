/**
 * The /product page: the full platform, one level deeper than the
 * homepage's citation-first pitch. The homepage stays deliberately
 * simple (per the redesign plan) — this page is where "what does RAEY
 * actually do" gets a real answer.
 *
 * Accuracy rules for this file, learned the hard way after an earlier
 * draft shipped four wrong claims: describe only what the system
 * actually does today, never what it's about to do. Specifically, there
 * is NO reranker enabled by default (a heuristic one was tried and
 * found to double-count signals already in the base score), the demo
 * corpus is synthetic, and Bedside Lookup is text, not voice.
 *
 * Positioning: the software is finished and runs on whatever corpus
 * it's pointed at. The synthetic protocols are a consequence of having
 * no hospital partner yet, not a limitation of the system. That framing
 * is the pitch, so keep it. Separately and unchanged: no clinician
 * validation, no FDA clearance, no HIPAA certification, not a
 * substitute for clinical judgment.
 *
 * No em dashes in any user-visible string.
 */
export const productContent = {
  hero: {
    eyebrow: "The full platform",
    heading: "Everything RAEY actually does.",
    sub: "The homepage makes one point: an answer, and a source to check it against. True, but it's a fraction of the system. This page is the rest of it.",
    // Kept separate from `sub` so the meta description stays inside the
    // ~155 char range search results actually render.
    metaDescription:
      "The full RAEY platform: how a question becomes a cited answer, what happens to that answer next, and what it plugs into.",
    disclaimer:
      "The software is finished and runs today. The protocols it currently runs on are synthetic, written for this project, because no hospital has handed us a corpus yet. Point it at yours and nothing about the system changes.",
  },

  roles: {
    label: "Access",
    heading: "Four roles. What you can't see is enforced, not just hidden.",
    sub: "Sessions are JWT-backed, passwords are bcrypt-hashed, and every endpoint checks permissions on the server. A clinical login can't reach what a compliance login can by editing the URL.",
    items: [
      {
        name: "Clinical staff",
        body: "Ask questions, run bedside lookups, work from the SOPs their department owns. Submit feedback and incident reports, propose updates.",
        dashboard: "Sees their open proposals and department SOPs.",
      },
      {
        name: "Educator",
        body: "Run scenario training and quick-reference sessions, and see what staff are asking that the SOPs don't currently answer.",
        dashboard: "Sees training gaps drawn from real questions.",
      },
      {
        name: "Governance and compliance",
        body: "Review proposals, work through attestations, CAPA and exceptions, and track compliance across the document set.",
        dashboard: "Sees pending reviews and a compliance heatmap.",
      },
      {
        name: "System admin",
        body: "Manage users and source configuration, run the evaluation harness, watch system health.",
        dashboard: "Sees live infrastructure and content health.",
      },
    ],
  },

  pipeline: {
    label: "Ask RAEY",
    heading: "How a question becomes an answer you can check.",
    sub: "Six steps. Each one is there because skipping it would let something unverified reach the person reading.",
    steps: [
      {
        title: "Ask, safely.",
        body: "A clinician types a plain-language question. Before it goes anywhere, a scanner checks it for identifiable patient information and warns before sending.",
      },
      {
        title: "Work out what's actually being asked.",
        body: "The question gets sorted into one of six types: procedure, threshold, contraindication, monitoring, medication, or general. Clinical abbreviations and synonyms get expanded. A compound question gets split into its parts. If it's genuinely ambiguous, RAEY asks a clarifying question instead of picking an interpretation and hoping.",
      },
      {
        title: "Find the right passages.",
        body: "Dense embeddings and keyword search run at the same time, and their results get fused by reciprocal rank fusion. Ranking is boosted toward the kind of passage the question calls for, so a dosage question surfaces threshold content rather than a policy preamble. When one SOP points at another, a second pass follows the reference.",
      },
      {
        title: "Decide what the evidence can actually support.",
        body: "Before generating anything, RAEY scores what it found on relevance, keyword overlap, entity grounding, and semantic fit. Then it routes one of five ways: answer from your SOP library, go out to published evidence, combine the two, say there's nothing here to answer from, or come back with a clarifying question. Abstaining is a real outcome, not an error state.",
      },
      {
        title: "Answer, constrained.",
        body: "Generation is restricted to the passages that were actually retrieved. If no model is configured, it falls back to extraction, quoting the SOP directly rather than writing anything new. Every clinical sentence carries a citation.",
      },
      {
        title: "Check the answer against the source it cites.",
        body: "The Procedural Faithfulness Verifier is the part of this we're most proud of. It re-reads the generated answer against the source looking for wrong thresholds and dosages, steps that went missing or came back in the wrong order, and contraindications that got dropped. A number the source doesn't actually support is redacted to \"[value not confirmed in cited source]\" rather than stated as fact.",
      },
    ],
    footnote:
      "It also behaves like the chat apps people already use: answers stream in, you can stop or regenerate one, edit a question and resend it, and every conversation stays in a sidebar.",
  },

  citations: {
    label: "Citations",
    heading: "A citation that admits how precise it isn't.",
    sub: "Most systems either give you an exact quote or give you nothing. Real documents are messier than that, so citations here degrade through six rungs, and the interface tells you which rung you got.",
    rungs: [
      {
        name: "Exact offset",
        body: "The citation points at a specific character range. Click it and the precise text highlights.",
      },
      {
        name: "Step anchor",
        body: "The exact range wasn't recoverable, so it anchors to a numbered step in the procedure.",
      },
      {
        name: "Snippet",
        body: "No step number to anchor to, but the matching passage itself is identified.",
      },
      {
        name: "Section",
        body: "Narrowed to a section of the document, not a single passage.",
      },
      {
        name: "Whole document",
        body: "The right document, with no reliable position inside it.",
      },
      {
        name: "Couldn't locate",
        body: "Said plainly, rather than pointing somewhere approximate and letting it look exact.",
      },
    ],
    note: "A citation never claims more precision than it actually has. That sounds like a small thing until you've watched someone trust a confident-looking reference that pointed at the wrong paragraph.",
  },

  actions: {
    label: "From an answer",
    heading: "An answer is a starting point, not a dead end.",
    sub: "Every answer comes with somewhere to go next.",
    items: [
      {
        name: "External Evidence",
        body: "A live search across PubMed, Europe PMC, CDC, WHO, ClinicalTrials.gov, FDA, MedlinePlus, and CMS, ranked by evidence grade rather than by date, with real abstracts and excerpts instead of a list of links.",
      },
      {
        name: "Trust and Audit",
        body: "The checks behind that specific answer: faithfulness score, which generation mode produced it, confidence tier, and how the evidence-sufficiency scoring came out.",
      },
      {
        name: "SOP Version History",
        body: "The timeline of changes to the source document, committee comments, and a diff between any two revisions.",
      },
      {
        name: "Compare with Clinical Evidence",
        body: "Pulls a topically matched published guideline and, where your SOP differs, says why: a genuine conflict, a stale reference, a wording difference that changes nothing, or something that can't be judged without knowing your institution's context. It used to flag every difference as a red \"Needs Review\", which taught people to ignore it.",
      },
      {
        name: "Propose an SOP Update",
        body: "Opens the real governance workflow: committee review, voting, approval, and, when the change carries a compliance flag, a staff acknowledgment requirement that's actually tracked. You can also switch an answer to plain language, regenerate it, or flag a clinical override.",
      },
    ],
  },

  beyond: {
    label: "Beyond chat",
    heading: "The chat window is the front door, not the whole building.",
    sub: "Most of what makes this usable in a hospital happens outside the conversation.",
    items: [
      {
        name: "SOP Library",
        body: "Full-text search across every approved document, with the same exact-passage citation viewing.",
      },
      {
        name: "Bedside Lookup",
        body: "A kiosk-style quick-answer mode, built for someone standing at a bedside rather than sitting at a desk.",
      },
      {
        name: "Scenario Training and Quick Reference",
        body: "Structured practice for education, kept separate from live clinical lookup so the two never get confused.",
      },
      {
        name: "Governance suite",
        body: "Proposals and committee voting, CAPA linked to incidents, exception and deviation tracking, and Part-11-style attestations that are signed and hash-chained.",
      },
      {
        name: "Gap reports",
        body: "Every question staff asked that no SOP could answer, collected. It doubles as a training signal and a list of what your document set is missing.",
      },
      {
        name: "Evaluation",
        body: "RAGAS metrics, an adversarial red-team suite, and ablations, run on a live dashboard rather than quoted as one number on a slide. It discloses when a run fell back to extraction instead of a real model.",
      },
    ],
  },

  integration: {
    label: "What it plugs into",
    heading: "Built to sit on top of what you already run, not replace it.",
    sub: "RAEY isn't trying to become your new system of record. It reads from what exists and writes back into it.",
    items: [
      {
        name: "It doesn't own your SOPs.",
        body: "RAEY ingests documents you already have and answers strictly from those. The system of record for policy stays where it is.",
      },
      {
        name: "CDS Hooks, not another app to open.",
        body: "A CDS Hooks v2 endpoint lets your EMR call RAEY inline, during order entry for example, so guidance appears in the workflow clinicians are already in.",
      },
      {
        name: "Identity federates, it doesn't fork.",
        body: "A real deployment authenticates against your existing identity provider over SAML, OAuth, or LDAP, rather than becoming a second set of accounts to manage.",
      },
      {
        name: "Evidence is fetched live, not stockpiled.",
        body: "There's no private copy of the medical literature here. When RAEY looks outside your SOPs it queries the source and cites straight back to it.",
      },
    ],
  },

  spec: {
    label: "Under the hood",
    heading: "The actual stack.",
    sub: "If you evaluate systems like this for a living, here's what's underneath without the plain-language translation.",
    rows: [
      { term: "Embeddings", value: "sentence-transformers, bge-small-en-v1.5" },
      { term: "Keyword search", value: "BM25 and TF-IDF" },
      { term: "Fusion", value: "Reciprocal rank fusion, plus chunk-type boosting" },
      {
        term: "Query types",
        value: "Six: procedure, threshold, contraindication, monitoring, medication, general",
      },
      { term: "Multi-hop", value: "Second retrieval pass when one SOP references another" },
      { term: "Reranker", value: "None by default. A heuristic reranker double-counted signals already in the base score" },
      { term: "Inference", value: "Ollama locally, or Groq hosted" },
      { term: "No-model fallback", value: "Extractive. Quotes the SOP directly, generates nothing" },
      {
        term: "External sources",
        value: "Eight: PubMed, Europe PMC, CDC, WHO, ClinicalTrials.gov, FDA, MedlinePlus, CMS",
      },
      { term: "Evaluation", value: "RAGAS, adversarial red-team suite, ablations" },
      { term: "Auth", value: "JWT sessions, bcrypt hashing, per-endpoint permission checks" },
      { term: "EMR integration", value: "CDS Hooks v2" },
      { term: "Demo corpus", value: "22 synthetic protocols, written for this project" },
    ],
  },

  honesty: {
    body: "Everything on this page is built and running, not a mockup and not a roadmap. What it runs on right now is a corpus of 22 synthetic protocols we wrote ourselves, because we don't have a hospital partner yet. None of the system is tied to that corpus. It ingests whatever documents you already have and answers strictly from those, so the honest version of what's missing here is your SOPs, not our code. That's the whole shape of a pilot.",
    notClaimed:
      "What we are not claiming: no clinician has validated the output, RAEY is not FDA cleared, it isn't presented as HIPAA-certified, and it is not a substitute for clinical judgment.",
    linkLabel: "Read the full research log",
    linkHref: "/research",
  },

  cta: {
    label: "Talk to us about a pilot",
    href: "/#pilot",
  },
} as const;
