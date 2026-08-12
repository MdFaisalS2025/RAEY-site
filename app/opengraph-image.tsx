import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";
import { heroContent } from "@/content/hero";
import { PALETTE } from "@/lib/palette";
import { MARK_GEOMETRY } from "@/components/brand/mark-geometry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same mark as the favicon, paper background, trace accent — the OG
// card is the site's first impression for most of the pitch audience.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          background: PALETTE.paper,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="52" height="52" viewBox={MARK_GEOMETRY.viewBox} fill="none">
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
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: PALETTE.ink,
              letterSpacing: -0.5,
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.15,
            color: PALETTE.ink,
            maxWidth: 920,
          }}
        >
          {heroContent.headline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 26,
            lineHeight: 1.4,
            color: PALETTE.ink3,
            maxWidth: 820,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
