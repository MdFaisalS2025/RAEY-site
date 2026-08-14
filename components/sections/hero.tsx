import { Grid } from "@/components/layout/grid";
import { Rule } from "@/components/layout/rule";
import { ActionLink } from "@/components/ui/action-link";
import { ArchiveField } from "@/components/archive/archive-field";
import { heroContent } from "@/content/hero";
import { siteConfig } from "@/content/site";

/**
 * One headline, one sentence, two actions, and The Archive — a field
 * of scattered document cards in CSS 3D space — as the hero's
 * background. Scoped to the hero section itself (not a page-wide
 * fixed layer), so it needs no scroll-position bookkeeping: it just
 * sits behind the text, clipped to the section's own bounds.
 */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-rule">
      <ArchiveField />

      <Grid className="relative py-24 md:py-44">
        <div className="relative col-span-12 md:col-span-7 lg:col-span-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -inset-y-16 -z-[5] bg-[radial-gradient(closest-side,_var(--color-paper)_60%,_transparent_100%)] md:-inset-x-24"
          />
          <p className="animate-hero-rise text-meta text-ink-3">{heroContent.eyebrow}</p>
          <h1 className="animate-hero-rise text-display-1 mt-5 text-ink" style={{ animationDelay: "80ms" }}>
            {heroContent.headline}
            <br />
            <span className="text-trace">{heroContent.headlineAccent}</span>
          </h1>
          <p
            className="animate-hero-rise text-body-lg mt-6 max-w-[42ch] text-ink-2"
            style={{ animationDelay: "160ms" }}
          >
            {heroContent.sub}
          </p>
          <div
            className="animate-hero-rise mt-9 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "240ms" }}
          >
            <ActionLink href={siteConfig.cta.href} variant="button">
              {siteConfig.cta.label}
            </ActionLink>
            <ActionLink href={siteConfig.ctaSecondary.href} variant="text">
              {siteConfig.ctaSecondary.label}
            </ActionLink>
          </div>
        </div>
      </Grid>

      <Rule />
      <Grid>
        <div className="col-span-12 flex flex-col gap-3 py-5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
          {heroContent.facts.map((fact) => (
            <p key={fact} className="text-meta text-ink-3">
              {fact}
            </p>
          ))}
        </div>
      </Grid>
    </section>
  );
}
