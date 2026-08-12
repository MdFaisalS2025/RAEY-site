"use client";

import { useEffect, useRef, useState } from "react";
import { PALETTE } from "@/lib/palette";

const INK_3 = PALETTE.ink3;
const RULE = PALETTE.rule;
const CRITICAL = PALETTE.critical;
const TRACE = PALETTE.trace;

const DOCS = [
  { x: 20, y: 90, rot: -4, version: "v1.4", stale: true },
  { x: 130, y: 20, rot: 3, version: "v2.0", stale: true },
  { x: 210, y: 130, rot: -2, version: "v2.1", stale: false },
];

/**
 * A precise diagram of the actual problem: three copies of the same
 * protocol, three different revisions, only one of them current. Not
 * a generic document icon — the version tags are the point.
 *
 * Settles into place once scrolled into view (each copy staggered in
 * from a slightly scattered starting point, echoing the hero's
 * scattered-documents motif) and dims the other two on hover of any
 * one — a small interaction that makes the section's actual point
 * ("only one of these is current") something you can feel, not just
 * read. Purely decorative (aria-hidden on the parent svg), so the
 * hover state adds nothing a keyboard or screen-reader user would
 * need — it's mouse-only polish on top of a diagram that already
 * reads completely on its own.
 */
export function ProblemDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 340 300" className="h-full w-full" aria-hidden="true">
      {DOCS.map((d, i) => {
        const isDimmed = hovered !== null && hovered !== i;
        const settleX = active ? 0 : i % 2 === 0 ? -12 : 12;
        const settleY = active ? 0 : -20;
        const settleRot = active ? 0 : i % 2 === 0 ? -7 : 7;
        const scale = hovered === i ? 1.05 : isDimmed ? 0.97 : 1;

        return (
          <g
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              transform: `translate(${d.x + settleX}px, ${d.y + settleY}px) rotate(${d.rot + settleRot}deg) scale(${scale})`,
              transformOrigin: "45px 59px",
              opacity: active ? (isDimmed ? 0.4 : 1) : 0,
              transition: `transform 650ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, opacity 400ms ease ${i * 90}ms`,
            }}
          >
            <rect
              x="0"
              y="0"
              width="90"
              height="118"
              rx="2"
              stroke={d.stale ? RULE : TRACE}
              strokeWidth={d.stale ? 1 : 1.5}
              fill="none"
              opacity={d.stale ? 0.6 : 1}
            />
            {[0, 1, 2, 3].map((li) => (
              <line
                key={li}
                x1="14"
                y1={24 + li * 20}
                x2={li === 3 ? 55 : 76}
                y2={24 + li * 20}
                stroke={RULE}
                strokeWidth="1"
                opacity={d.stale ? 0.4 : 0.75}
              />
            ))}
            <text
              x="14"
              y="106"
              fontFamily="ui-monospace, 'Geist Mono', 'SF Mono', monospace"
              fontSize="11"
              fill={d.stale ? CRITICAL : TRACE}
            >
              {d.version}
              {d.stale ? " · superseded" : " · current"}
            </text>
          </g>
        );
      })}
      <text x="20" y="20" fontFamily="var(--font-utility)" fontSize="11" fill={INK_3}>
        SAME PROTOCOL, THREE REVISIONS
      </text>
    </svg>
  );
}
