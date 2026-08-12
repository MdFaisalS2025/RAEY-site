"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";

type RevealVariant = "rise" | "fade";
type RevealTag = "div" | "li";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** ms — for staggering siblings without a shared parent orchestrator. */
  delay?: number;
  /** "rise" (default) travels up 12px while fading in; "fade" is
   * opacity-only, for small inline elements where a rise reads as too
   * much motion for how little moves. */
  variant?: RevealVariant;
  /** Wrapper element — "li" keeps <ul>/<ol> semantics intact when a
   * Reveal sits directly inside a list instead of around it. */
  as?: RevealTag;
};

// useLayoutEffect warns ("does nothing on the server") if it ever runs
// during SSR; Next only executes client-component effects in the
// browser regardless, but this avoids the console noise.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll-reveal used on every section except the hero (its own load
 * sequence) and the provenance trace (its own scroll-scrubbed logic).
 * Plain IntersectionObserver + CSS transition, fires once, never
 * re-animates on scroll back up.
 *
 * Renders fully visible by default so content is never blank for SSR,
 * no-JS, or the instant before hydration completes. A layout effect
 * flips the entrance animation on before the browser's first paint,
 * so JS-enabled visitors still see the intended rise rather than a
 * flash of static content. globals.css collapses transition durations
 * under prefers-reduced-motion, so no separate reduced-motion branch
 * is needed here.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setVisible(false);
    setAnimating(true);
  }, []);

  useEffect(() => {
    if (!animating) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animating]);

  const hiddenState = variant === "fade" ? "opacity-0" : "translate-y-3 opacity-0";
  const visibleState = variant === "fade" ? "opacity-100" : "translate-y-0 opacity-100";
  const revealClassName = `transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
    visible ? visibleState : hiddenState
  } ${className}`;
  const revealStyle = { transitionDelay: `${delay}ms` };

  if (as === "li") {
    return (
      <li ref={ref as Ref<HTMLLIElement>} className={revealClassName} style={revealStyle}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={revealClassName} style={revealStyle}>
      {children}
    </div>
  );
}

type RevealStaggerProps = {
  items: readonly ReactNode[];
  as?: RevealTag;
  itemClassName?: string;
  /** ms between each item's reveal. */
  stagger?: number;
  variant?: RevealVariant;
};

/**
 * A per-child stagger: each item in the array gets its own Reveal with
 * an incrementing delay, so a list organizes into view piece by piece
 * instead of arriving as one block. Renders no wrapper of its own —
 * drop it directly inside the caller's existing <ul>/<div> so list
 * semantics and grid layout classes stay exactly where they were.
 */
export function RevealStagger({
  items,
  as = "div",
  itemClassName = "",
  stagger = 60,
  variant = "rise",
}: RevealStaggerProps) {
  return (
    <>
      {items.map((item, i) => (
        <Reveal key={i} as={as} delay={i * stagger} variant={variant} className={itemClassName}>
          {item}
        </Reveal>
      ))}
    </>
  );
}
