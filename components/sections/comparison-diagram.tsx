"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { PALETTE } from "@/lib/palette";

const INK_3 = PALETTE.ink3;
const RULE = PALETTE.rule;
const UNVERIFIED = PALETTE.unverified;
const VERIFIED = PALETTE.verified;
const TRACE = PALETTE.trace;
const PAPER = PALETTE.paper;

// Generous over-estimates of each path's length — large enough that
// no actual path exceeds it, so a CSS transition from this value to 0
// reads as the line drawing itself in, without needing a DOM
// getTotalLength() measurement.
const LEFT_PATH_LEN = 90;
const RIGHT_PATH_LEN = 90;
const CITE_LINE_LEN = 30;

/**
 * The same question, answered two ways: one path ends in prose with
 * nothing to check it against, the other ends in a citation that
 * traces to one specific line. This is the actual difference the
 * comparison table describes, drawn rather than just listed.
 *
 * The two connector paths and the citation trace line draw themselves
 * in once the diagram scrolls into view — a stroke-dashoffset
 * transition, not a scroll-scrubbed animation, so it fires once and
 * settles. Skipped under prefers-reduced-motion via globals.css's
 * global transition-duration collapse, same as every other CSS-only
 * transition on the site.
 *
 * Hovering either half dims the other — a small way to let a visitor
 * inspect one path at a time instead of reading both answers at once,
 * on a diagram that otherwise only ever plays its entrance once.
 */
export function ComparisonDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const drawStyle = (len: number, delayMs: number): CSSProperties => ({
    strokeDasharray: len,
    strokeDashoffset: active ? 0 : len,
    transition: `stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <svg ref={ref} viewBox="0 0 340 230" className="h-full w-full" aria-hidden="true">
      <circle cx="170" cy="16" r="3.5" fill={INK_3} />
      <text x="20" y="10" fontFamily="var(--font-utility)" fontSize="10" fill={INK_3}>
        ONE QUESTION, TWO ANSWERS
      </text>

      {/* left: general chatbot, no source */}
      <g
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        style={{ opacity: hovered === "right" ? 0.35 : 1, transition: "opacity 300ms ease" }}
      >
        <path
          d="M170 18 C 120 42, 70 55, 58 86"
          stroke={RULE}
          strokeWidth="1"
          fill="none"
          style={drawStyle(LEFT_PATH_LEN, 0)}
        />
        <rect x="12" y="88" width="102" height="46" rx="2" stroke={RULE} strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <line x1="25" y1="104" x2="96" y2="104" stroke={RULE} strokeWidth="1" />
        <line x1="25" y1="116" x2="80" y2="116" stroke={RULE} strokeWidth="1" />
        <text x="12" y="156" fontFamily="var(--font-utility)" fontSize="10" fill={UNVERIFIED}>
          NO SOURCE TO CHECK
        </text>
      </g>

      {/* right: Trace AI, cited and traceable */}
      <g
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        style={{ opacity: hovered === "left" ? 0.35 : 1, transition: "opacity 300ms ease" }}
      >
        <path
          d="M170 18 C 220 42, 258 50, 268 84"
          stroke={TRACE}
          strokeWidth="1.5"
          fill="none"
          style={drawStyle(RIGHT_PATH_LEN, 80)}
        />
        <rect x="214" y="86" width="102" height="46" rx="2" stroke={TRACE} strokeWidth="1.5" fill="none" />
        <line x1="227" y1="102" x2="298" y2="102" stroke={RULE} strokeWidth="1" />
        <line x1="227" y1="114" x2="284" y2="114" stroke={RULE} strokeWidth="1" />
        <circle cx="291" cy="114" r="6" fill={TRACE} />
        <text x="291" y="117.5" fontFamily="var(--font-utility)" fontSize="8" fill={PAPER} textAnchor="middle">
          1
        </text>

        <line
          x1="265"
          y1="132"
          x2="265"
          y2="156"
          stroke={TRACE}
          strokeWidth="1"
          style={{ ...drawStyle(CITE_LINE_LEN, 260), strokeDasharray: active ? "2 2" : CITE_LINE_LEN }}
        />
        <rect x="228" y="158" width="74" height="30" rx="2" stroke={VERIFIED} strokeWidth="1" fill="none" />
        <line x1="238" y1="170" x2="292" y2="170" stroke={RULE} strokeWidth="1" />
        <line x1="238" y1="180" x2="280" y2="180" stroke={RULE} strokeWidth="1" />
        <text x="212" y="210" fontFamily="var(--font-utility)" fontSize="10" fill={VERIFIED}>
          TRACES TO ONE LINE
        </text>
      </g>
    </svg>
  );
}
