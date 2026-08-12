import type { ReactNode } from "react";

/**
 * The site's composition system, replacing the old centered 1152px
 * Container for every section. A 12-column grid spans the full
 * viewport (fluid gutters via --grid-gutter, capped at --grid-max so
 * ultrawide monitors don't stretch text into an unreadable single
 * line) and children are positioned by which columns they occupy —
 * col-span and col-start Tailwind utilities — not by a wrapper
 * max-width. That's what makes asymmetric composition possible: a
 * headline on cols 1-6 next to a visual on cols 7-12, rather than
 * everything stacked in one narrow column.
 *
 * Full-bleed visual layers (the provenance trace, the dark CTA band)
 * deliberately do NOT use Grid as their outer wrapper — they're a
 * plain full-width element, with Grid nested inside only for the text
 * that needs column alignment. That's the "grid vs. bleed" line: Grid
 * is for content, not for backgrounds.
 */
export function Grid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto grid w-full max-w-[var(--grid-max)] grid-cols-12 gap-x-4 px-[var(--grid-gutter)] md:gap-x-6 ${className}`}
    >
      {children}
    </div>
  );
}
