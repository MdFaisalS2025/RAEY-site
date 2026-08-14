import Link from "next/link";
import { Grid } from "@/components/layout/grid";
import { Rule } from "@/components/layout/rule";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/layout/section-label";
import { Reveal } from "@/components/motion/reveal";
import { transparencyContent as c } from "@/content/transparency";

/**
 * Built with transparency, without a single statistic — the pilot
 * numbers stay real and verbatim at /research, one click away, not
 * deleted, just not a marketing-page's job. This is prose and a spec
 * table: what's built, tested, still needs validation, and not claimed.
 *
 * The third dark full-bleed band, not a fourth paper section. It sits
 * back to back with the closing CTA on purpose: the honesty record is
 * the right place on the page to feel weighty, and it breaks what
 * would otherwise be four consecutive paper sections at its midpoint.
 */
export function Transparency() {
  return (
    <Section id="transparency" ambient="slate" className="bg-slate">
      <Grid>
        <Reveal className="col-span-12 md:col-span-6">
          <SectionLabel index="06" label={c.label} variant="slate" />
          <h2 className="text-display-2 mt-4 max-w-[16ch] text-slate-ink">{c.heading}</h2>
          <p className="text-body-lg mt-4 max-w-[46ch] text-slate-ink-2">{c.sub}</p>
        </Reveal>

        <Reveal delay={80} className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0">
          <blockquote className="text-display-3 border-l-2 border-[color:var(--color-trace-light)] pl-6 font-serif text-slate-ink">
            {c.quote}
          </blockquote>
        </Reveal>
      </Grid>

      <div className="mt-16">
        <Rule variant="slate" />
        {c.roadmap.map((r, i) => (
          <div key={r.label}>
            <Grid className="py-6">
              <p className="text-meta col-span-12 text-slate-ink-2 md:col-span-3">
                {r.label}
              </p>
              <p className="text-body col-span-12 mt-2 text-slate-ink-2 md:col-span-8 md:col-start-4 md:mt-0">
                {r.body}
              </p>
            </Grid>
            {i < c.roadmap.length - 1 && <Rule variant="slate" />}
          </div>
        ))}
        <Rule variant="slate" />
      </div>

      <Grid className="mt-8">
        <p className="text-micro col-span-12 text-slate-ink-2 md:col-span-8">{c.disclaimer}</p>
        <Link
          href={c.researchLinkHref}
          className="group text-small col-span-12 mt-4 inline-flex w-fit items-center gap-1.5 border-b border-[color:var(--color-trace-light)] text-[color:var(--color-trace-light)] md:col-span-4 md:mt-0 md:justify-self-end"
        >
          {c.researchLinkLabel}{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Grid>
    </Section>
  );
}
