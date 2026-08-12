import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ctaContent } from "@/content/cta";
import { DemoForm } from "./demo-form";

/**
 * The closing CTA — the second of the site's two dark full-bleed
 * bands. Very simple: a headline, one sentence, the form. No wall of
 * text, no gradient, no glow.
 */
export function Demo() {
  return (
    <Section id="pilot" ambient="slate" className="bg-slate">
      <Grid>
        <Reveal className="col-span-12 md:col-span-6">
          <h2 className="text-display-2 text-slate-ink">
            {ctaContent.headlineLines[0]}
            <br />
            {ctaContent.headlineLines[1]}
          </h2>
          <p className="text-body-lg mt-4 max-w-[42ch] text-slate-ink-2">{ctaContent.sub}</p>
        </Reveal>

        <Reveal delay={80} className="col-span-12 mt-12 md:col-span-5 md:col-start-8 md:mt-0">
          <DemoForm />
        </Reveal>
      </Grid>
    </Section>
  );
}
