import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { researchContent } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description: researchContent.sub,
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research · RAEY",
    description: researchContent.sub,
    url: "/research",
  },
  twitter: {
    title: "Research · RAEY",
    description: researchContent.sub,
  },
};

// The full pilot log, verbatim from content/research.ts — every number
// and caveat exactly as reported, unchanged by the rest of the redesign.
// Linked from the landing page's Transparency section rather than shown
// there: the numbers are real, they're just not a landing page's job.
export default function ResearchPage() {
  return (
    <Section className="bg-paper-raised">
      <Container className="max-w-3xl">
        <Reveal>
          <Link href="/#transparency" className="text-small text-trace hover:opacity-70">
            <span aria-hidden="true">←</span> Back to home
          </Link>
          <h1 className="text-display-2 mt-5 text-ink">{researchContent.heading}</h1>
          <p className="text-body-lg mt-3 text-ink-2">{researchContent.sub}</p>
          <p className="text-small mt-4 text-ink-3">{researchContent.venue}</p>
        </Reveal>

        <div className="mt-14 space-y-10">
          {researchContent.arc.map((item, i) => (
            <Reveal key={item.title} delay={i * 30}>
              <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule pt-8">
                <p className="text-meta text-ink-3">{i + 1}</p>
                <div>
                  <h2 className="text-display-3 text-ink">{item.title}</h2>
                  <p className="text-body mt-2 max-w-[60ch] text-ink-2">{item.body}</p>
                  {item.stat && (
                    <p className="text-meta mt-4 inline-block border border-rule bg-paper px-3 py-1.5 text-ink">
                      {item.stat}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
