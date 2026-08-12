import { Fragment } from "react";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/layout/section-label";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { useCasesContent as c } from "@/content/use-cases";

/**
 * A dense typographic index, closer to a book's back matter than
 * another grid of cards or a ladder of ruled rows: two columns, tight
 * leading, a number for structure instead of a hairline under every
 * entry.
 */
export function UseCases() {
  return (
    <Section id="use-cases" size="tight" className="border-b border-rule bg-paper-raised">
      <Grid>
        <Reveal className="col-span-12 md:col-span-6 md:col-start-3">
          <SectionLabel index="05" label={c.label} />
          <h2 className="text-display-3 mt-4 max-w-[26ch] text-ink">{c.heading}</h2>
        </Reveal>
      </Grid>

      <Grid className="mt-10">
        <div className="col-span-12">
          <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
            <RevealStagger
              as="li"
              stagger={45}
              itemClassName="flex gap-3"
              items={c.items.map((item, i) => (
                <Fragment key={item.title}>
                  <p className="text-micro pt-0.5 text-ink-3">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <p className="text-small font-medium leading-snug text-ink">{item.title}</p>
                    <p className="text-small leading-snug text-ink-2">{item.body}</p>
                  </div>
                </Fragment>
              ))}
            />
          </ul>
        </div>
      </Grid>
    </Section>
  );
}
