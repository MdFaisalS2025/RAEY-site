/**
 * Reflects exactly what this site does today: no cookie banner, no
 * analytics script, no third party besides Resend for the demo-request
 * email. If analytics or a CMP get added later, update this alongside that
 * change, not after.
 */
export const privacyContent = {
  heading: "Privacy",
  updated: "Last updated when this site was built, in August 2026.",
  sections: [
    {
      title: "What this page covers",
      body: "This is the marketing site for the product, not the product itself. It describes what happens to information you give us here, through the demo-request form. It says nothing about how the product handles hospital data once deployed; that's a separate, more detailed conversation we'll have directly with your institution.",
    },
    {
      title: "What we collect",
      body: "Only what you type into the demo-request form: name, role, institution, email, and anything you write in the free-text field. We don't collect anything else. No analytics script runs on this site, and it sets no cookies.",
    },
    {
      title: "What we do with it",
      body: "We use it to reply to your demo request. Nothing else. No mailing list, no resale, no sharing beyond what's needed to send that one email.",
    },
    {
      title: "Who processes it",
      body: "The form is delivered via Resend, a third-party transactional email provider. Your submission passes through their infrastructure to reach our inbox. We don't use any other third-party service on this site.",
    },
    {
      title: "How long we keep it",
      body: "As long as it sits in our email inbox. There's no separate database, so ask us to delete a submission and we will.",
    },
    {
      title: "Your options",
      body: "You can ask what we have on file, have it corrected, or have it deleted. See below for how to reach us.",
    },
  ],
} as const;
