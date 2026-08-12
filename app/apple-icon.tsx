import { ImageResponse } from "next/og";
import { PALETTE } from "@/lib/palette";
import { MARK_GEOMETRY } from "@/components/brand/mark-geometry";

// iOS applies its own corner mask, so this ships as a plain filled square —
// same mark, sized up, on the paper background.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: PALETTE.paper,
        }}
      >
        <svg width="120" height="120" viewBox={MARK_GEOMETRY.viewBox} fill="none">
          {MARK_GEOMETRY.connectors.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={PALETTE.trace}
              strokeWidth={MARK_GEOMETRY.strokeWidth}
              strokeLinecap="round"
            />
          ))}
          {MARK_GEOMETRY.nodes.map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={PALETTE.ink} />
          ))}
          <circle
            cx={MARK_GEOMETRY.hub.cx}
            cy={MARK_GEOMETRY.hub.cy}
            r={MARK_GEOMETRY.hub.r}
            fill={PALETTE.trace}
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
