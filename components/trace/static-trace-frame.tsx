import { traceContent } from "@/content/trace";
import { PALETTE } from "@/lib/palette";

// var() inside SVG presentation attributes isn't reliably supported
// across browsers, so this static fallback reads from lib/palette.ts
// (the single hardcoded copy of the design tokens) instead of the CSS
// custom properties directly.
const SLATE_RULE = PALETTE.slateRule;
const SLATE_INK_2 = PALETTE.slateInk2;
// traceLight, not trace — this SVG sits on the slate band, where plain
// trace measures ~2.6:1 (see provenance-trace.tsx's readColors for the
// same fix on the canvas version of this frame).
const TRACE = PALETTE.traceLight;
const VERIFIED = PALETTE.verified;

/**
 * The final beat of the provenance trace, rendered as plain SVG: what
 * mobile, prefers-reduced-motion, and no-JS/SSR all get instead of the
 * scroll-scrubbed canvas. Server-renderable, so it's never blank — and
 * on its own it's still a complete telling of the story: scattered
 * source documents, one isolated match, the exact passage lit up, a
 * trace line out to the answer.
 */
export function StaticTraceFrame() {
  const dimPositions: [number, number][] = [
    [40, 40], [120, 30], [70, 120], [150, 140], [30, 190],
  ];

  return (
    <svg
      viewBox="0 0 640 400"
      className="h-full w-full"
      role="img"
      aria-label={traceContent.staticCaption}
    >
      {dimPositions.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="52"
          height="68"
          rx="2"
          stroke={SLATE_RULE}
          strokeWidth="1"
          fill="none"
          opacity="0.35"
        />
      ))}

      {/* the isolated match document, enlarged */}
      <rect
        x="120"
        y="90"
        width="150"
        height="200"
        rx="3"
        stroke={SLATE_INK_2}
        strokeWidth="1"
        fill="none"
      />
      {[0, 1, 2, 3].map((i) => {
        const y = 120 + i * 40;
        const highlighted = i === 1;
        return (
          <g key={i}>
            <line
              x1={140}
              y1={y}
              x2={highlighted ? 245 : 235}
              y2={y}
              stroke={highlighted ? TRACE : SLATE_RULE}
              strokeWidth={highlighted ? 2 : 1}
            />
            {highlighted && (
              <line x1={135} y1={y - 5} x2={135} y2={y + 5} stroke={TRACE} strokeWidth="2" />
            )}
          </g>
        );
      })}

      {/* trace line to the answer block */}
      <path d="M 270 160 Q 380 160 420 160" stroke={TRACE} strokeWidth="1.5" fill="none" />

      {/* answer block */}
      <rect
        x="420"
        y="100"
        width="180"
        height="140"
        rx="3"
        stroke={VERIFIED}
        strokeWidth="1"
        fill="none"
      />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={440}
          y1={140 + i * 28}
          x2={i === 2 ? 540 : 580}
          y2={140 + i * 28}
          stroke={SLATE_INK_2}
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}
