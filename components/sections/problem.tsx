import { Fragment } from "react";
import { Grid } from "@/components/layout/grid";
import { Rule } from "@/components/layout/rule";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/layout/section-label";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { ProblemDiagram } from "./problem-diagram";
import { problemContent } from "@/content/problem";

/**
 * A large statement, a precise diagram, and four numbered lines — the
 * Linear "1.1 / 1.2" register. No cards.
 */
export function Problem() {
  return (
    <Section id="problem" className="border-b border-rule">
      <Grid>
        <Reveal className="col-span-12 md:col-span-6">
          <SectionLabel index="01" label={problemContent.label} />
          <h2 className="text-display-2 mt-4 max-w-[14ch] text-ink">
            {problemContent.heading}
          </h2>
          <p className="text-body-lg mt-4 max-w-[42ch] text-ink-2">{problemContent.sub}</p>
        </Reveal>
        <Reveal delay={80} className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-0">
          <div className="aspect-[4/3]">
            <ProblemDiagram />
          </div>
        </Reveal>
      </Grid>

      <div className="mt-16">
        <Rule />
        <RevealStagger
          stagger={40}
          items={problemContent.items.map((item, i) => (
            <Fragment key={item.title}>
              <Grid className="py-8">
                <p className="text-meta col-span-2 text-ink-3 md:col-span-1">
                  1.{i + 1}
                </p>
                <h3 className="text-display-3 col-span-10 text-ink md:col-span-4">
                  {item.title}
                </h3>
                <p className="text-body col-span-12 mt-3 text-ink-2 md:col-span-6 md:col-start-7 md:mt-0">
                  {item.body}
                </p>
              </Grid>
              <Rule />
            </Fragment>
          ))}
        />
      </div>
    </Section>
  );
}
