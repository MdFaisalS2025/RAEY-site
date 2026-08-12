import type { ReactNode } from "react";

/**
 * Vertical rhythm control. Applies --spacing-section (140px desktop /
 * 88px mobile, see globals.css) by default, so most sections share one
 * baseline rhythm — but six consecutive sections at the exact same gap
 * is also what made the page feel monotonous. `size="tight"` is for
 * denser, appendix-register content (Use Cases); the hero opts out
 * entirely with its own larger padding, since the most important
 * screen on the page should have more room than the rest, not the
 * same amount.
 *
 * scroll-mt-20 (80px) clears the sticky header (h-16, 64px unscrolled) so
 * every in-page anchor jump — nav links, the skip-to-content link, the
 * Transparency "read the full pilot log" link — lands the target
 * heading visibly below the header instead of underneath it.
 *
 * `ambient="slate"` tags a section for components/ambient/ambient-field.tsx
 * to read: the background field mixes toward the slate palette while a
 * tagged section is in view, so it belongs to the section behind it.
 */
export function Section({
  children,
  className = "",
  id,
  ambient,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ambient?: "slate";
  size?: "default" | "tight";
}) {
  const spacing = size === "tight" ? "py-14 md:py-24" : "py-section";
  return (
    <section
      id={id}
      data-ambient={ambient}
      className={`scroll-mt-20 ${spacing} ${className}`}
    >
      {children}
    </section>
  );
}
