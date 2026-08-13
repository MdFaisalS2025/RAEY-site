import { MARK_GEOMETRY } from "./mark-geometry";

type MarkProps = {
  className?: string;
  /**
   * Two colourways only: the default two-tone (source nodes in `ink`,
   * connectors and hub in `trace`, for normal use on the paper background)
   * and `monochrome` — everything in `currentColor` — for small sizes,
   * the dark bands, and favicons. No gradient, no third variant.
   */
  monochrome?: boolean;
};

/**
 * The Trace AI mark: three source documents converging on one answer.
 * "Several approved protocols, one verified answer." It's a literal
 * drawing of the product's core mechanic — grounding an answer across a
 * hospital's connected source set — not a cross, caduceus, heartbeat, or
 * human figure.
 *
 * Geometry lives in mark-geometry.ts, the one place it's defined; this
 * component only applies color. Reduces cleanly at 16px: the hub stays
 * the dominant shape even once the three source nodes blur into texture.
 */
export function Mark({ className = "", monochrome = false }: MarkProps) {
  const accent = monochrome ? "currentColor" : "var(--color-trace)";
  const line = monochrome ? "currentColor" : "var(--color-ink)";

  return (
    <svg
      viewBox={MARK_GEOMETRY.viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Trace AI"
    >
      {/* connectors — three sources, one destination */}
      {MARK_GEOMETRY.connectors.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={accent}
          strokeWidth={MARK_GEOMETRY.strokeWidth}
          strokeLinecap="round"
        />
      ))}

      {/* source nodes — the approved protocols */}
      {MARK_GEOMETRY.nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={line} />
      ))}

      {/* hub — the verified answer */}
      <circle cx={MARK_GEOMETRY.hub.cx} cy={MARK_GEOMETRY.hub.cy} r={MARK_GEOMETRY.hub.r} fill={accent} />
    </svg>
  );
}
