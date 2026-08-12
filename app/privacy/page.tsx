import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { privacyContent } from "@/content/privacy";
import { siteConfig, isPlaceholder } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <h1 className="text-display-2 text-ink">{privacyContent.heading}</h1>
        <p className="text-meta mt-3 text-ink-3">{privacyContent.updated}</p>

        <div className="mt-12 space-y-10">
          {privacyContent.sections.map((s) => (
            <div key={s.title} className="border-t border-rule pt-6">
              <h2 className="text-display-3 text-ink">{s.title}</h2>
              <p className="text-body mt-2 max-w-[62ch] text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="text-small mt-14 text-ink-2">
          {isPlaceholder(siteConfig.contactEmail) ? (
            "A direct contact route for privacy questions isn't published yet."
          ) : (
            <>
              Questions about any of this? Reach us at{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-trace underline underline-offset-2 hover:opacity-70"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </>
          )}
        </p>
      </Container>
    </Section>
  );
}
