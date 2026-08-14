import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/layout/section-label";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { ComparisonDiagram } from "./comparison-diagram";
import { comparisonContent as c } from "@/content/comparison";

/**
 * Paired columns, not a pricing-style ruled table: a single vertical
 * divide down the middle, no horizontal ladder of rows. The diagram
 * above draws the actual difference — one path ends in prose with
 * nothing to check it against, the other traces to one cited line.
 */
export function Comparison() {
  return (
    <Section id="comparison" className="border-b border-rule">
      <Grid>
        <Reveal className="col-span-12 md:col-span-6">
          <SectionLabel index="04" label={c.label} />
          <h2 className="text-display-2 mt-4 max-w-[16ch] text-ink">{c.heading}</h2>
          <p className="text-body-lg mt-4 max-w-[46ch] text-ink-2">{c.sub}</p>
        </Reveal>

        <Reveal delay={80} className="col-span-12 mt-10 aspect-[3/2] md:col-span-5 md:col-start-8 md:mt-0">
          <ComparisonDiagram />
        </Reveal>
      </Grid>

      <Grid className="mt-16">
        <div className="col-span-12 md:col-span-6 md:border-r md:border-rule md:pr-10">
          <Reveal variant="fade">
            <p className="text-meta text-ink-3">{c.columns.general.label}</p>
          </Reveal>
          <ul className="mt-5 space-y-4">
            <RevealStagger
              as="li"
              stagger={45}
              itemClassName="text-body text-ink-2"
              items={c.columns.general.points}
            />
          </ul>
        </div>

        <div className="col-span-12 mt-10 md:col-span-6 md:mt-0 md:pl-10">
          <Reveal variant="fade" delay={40}>
            <p className="text-meta text-trace">{c.columns.raey.label}</p>
          </Reveal>
          <ul className="mt-5 space-y-4">
            <RevealStagger
              as="li"
              stagger={45}
              itemClassName="text-body text-ink"
              items={c.columns.raey.points}
            />
          </ul>
        </div>
      </Grid>
    </Section>
  );
}
