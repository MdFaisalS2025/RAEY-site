import type { Metadata } from "next";
import Link from "next/link";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/layout/section-label";
import { Rule } from "@/components/layout/rule";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { productContent as c } from "@/content/product";

export const metadata: Metadata = {
  title: "Product",
  description: c.hero.sub,
  alternates: { canonical: "/product" },
};

// The deep-dive companion to the homepage: everything the homepage's
// citation-first pitch doesn't have room for. Same layout primitives
// and honesty conventions as the rest of the site, just organized
// section by section instead of as one scroll narrative.
export default function ProductPage() {
  return (
    <>
      <Section className="border-b border-rule pb-14 pt-20 md:pt-28">
        <Grid>
          <Reveal className="col-span-12 md:col-span-8">
            <Link href="/" className="text-small text-trace hover:opacity-70">
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
            <p className="text-meta mt-6 text-ink-3">{c.hero.eyebrow}</p>
            <h1 className="text-display-1 mt-4 text-ink">{c.hero.heading}</h1>
            <p className="text-body-lg mt-6 max-w-[58ch] text-ink-2">{c.hero.sub}</p>
          </Reveal>
          <Reveal
            variant="fade"
            delay={80}
            className="col-span-12 mt-8 self-end md:col-span-4 md:mt-0"
          >
            <p className="text-small border-l-2 border-trace pl-4 text-ink-3">
              {c.hero.disclaimer}
            </p>
          </Reveal>
        </Grid>
      </Section>

      {/* Roles */}
      <Section>
        <Grid>
          <Reveal className="col-span-12 md:col-span-6">
            <SectionLabel index="01" label={c.roles.label} />
            <h2 className="text-display-2 mt-4 max-w-[16ch] text-ink">{c.roles.heading}</h2>
            <p className="text-body mt-4 max-w-[52ch] text-ink-2">{c.roles.sub}</p>
          </Reveal>

          <div className="col-span-12 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <RevealStagger
              stagger={60}
              items={c.roles.items.map((role) => (
                <div key={role.name} className="border-t border-rule pt-5">
                  <p className="text-small font-medium text-ink">{role.name}</p>
                  <p className="text-body mt-2 text-ink-2">{role.body}</p>
                </div>
              ))}
            />
          </div>
        </Grid>
      </Section>

      {/* Pipeline */}
      <Section className="bg-paper-raised">
        <Grid>
          <Reveal className="col-span-12 md:col-span-7">
            <SectionLabel index="02" label={c.pipeline.label} />
            <h2 className="text-display-2 mt-4 max-w-[18ch] text-ink">{c.pipeline.heading}</h2>
            <p className="text-body mt-4 max-w-[52ch] text-ink-2">{c.pipeline.sub}</p>
          </Reveal>

          <div className="col-span-12 mt-12 space-y-8">
            {c.pipeline.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 40}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule pt-6">
                  <p className="text-meta text-ink-3">{i + 1}</p>
                  <div>
                    <h3 className="text-display-3 text-ink">{step.title}</h3>
                    <p className="text-body mt-2 max-w-[62ch] text-ink-2">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Grid>
      </Section>

      {/* From an answer */}
      <Section>
        <Grid>
          <Reveal className="col-span-12 md:col-span-7">
            <SectionLabel index="03" label={c.actions.label} />
            <h2 className="text-display-2 mt-4 max-w-[18ch] text-ink">{c.actions.heading}</h2>
            <p className="text-body mt-4 max-w-[52ch] text-ink-2">{c.actions.sub}</p>
          </Reveal>

          <div className="col-span-12 mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <RevealStagger
              stagger={50}
              items={c.actions.items.map((item) => (
                <div key={item.name} className="border border-rule bg-paper-raised p-5">
                  <p className="text-small font-medium text-ink">{item.name}</p>
                  <p className="text-small mt-2 text-ink-2">{item.body}</p>
                </div>
              ))}
            />
          </div>
        </Grid>
      </Section>

      {/* Beyond chat */}
      <Section className="bg-paper-raised">
        <Grid>
          <Reveal className="col-span-12 md:col-span-7">
            <SectionLabel index="04" label={c.beyond.label} />
            <h2 className="text-display-2 mt-4 max-w-[18ch] text-ink">{c.beyond.heading}</h2>
          </Reveal>

          <div className="col-span-12 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            <RevealStagger
              stagger={50}
              items={c.beyond.items.map((item) => (
                <div key={item.name} className="border-t border-rule pt-5">
                  <p className="text-small font-medium text-ink">{item.name}</p>
                  <p className="text-small mt-2 text-ink-2">{item.body}</p>
                </div>
              ))}
            />
          </div>
        </Grid>
      </Section>

      {/* Integration */}
      <Section id="integration" ambient="slate" className="bg-slate">
        <Grid>
          <Reveal className="col-span-12 md:col-span-6">
            <SectionLabel index="05" label={c.integration.label} variant="slate" />
            <h2 className="text-display-2 mt-4 max-w-[18ch] text-slate-ink">
              {c.integration.heading}
            </h2>
            <p className="text-body mt-4 max-w-[48ch] text-slate-ink-2">{c.integration.sub}</p>
          </Reveal>

          <div className="col-span-12 mt-10 space-y-6 md:col-span-5 md:col-start-8 md:mt-0">
            <RevealStagger
              stagger={60}
              items={c.integration.items.map((item) => (
                <div key={item.name} className="border-l-2 border-[color:var(--color-trace-light)] pl-5">
                  <p className="text-small font-medium text-slate-ink">{item.name}</p>
                  <p className="text-small mt-1.5 text-slate-ink-2">{item.body}</p>
                </div>
              ))}
            />
          </div>
        </Grid>
      </Section>

      {/* Honesty callout */}
      <Section size="tight">
        <Grid>
          <Reveal className="col-span-12 md:col-span-8">
            <p className="text-body max-w-[64ch] text-ink-2">{c.honesty.body}</p>
            <Link
              href={c.honesty.linkHref}
              className="text-small mt-4 inline-flex items-center gap-1.5 border-b border-current pb-0.5 font-medium text-ink transition-opacity hover:opacity-70"
            >
              {c.honesty.linkLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </Grid>
      </Section>

      <Rule />

      {/* Closing CTA */}
      <Section size="tight">
        <Grid>
          <Reveal className="col-span-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-display-3 max-w-[24ch] text-ink">
              Want to see this running on your own protocols?
            </p>
            <ActionLink href={c.cta.href} variant="button">
              {c.cta.label}
            </ActionLink>
          </Reveal>
        </Grid>
      </Section>
    </>
  );
}
