/**
 * The single source of truth for hex values used outside CSS: Canvas
 * 2D (components/trace/*), inline SVG presentation attributes (var()
 * isn't reliably supported there across browsers), and next/og's
 * ImageResponse (a separate Satori rendering context with no access
 * to the page's stylesheet at all). Every one of those contexts used
 * to hardcode its own copy of these hex values — this file replaces
 * five separate copies with one.
 *
 * Keep in sync with app/globals.css by hand: these are values, not
 * CSS custom properties, so nothing enforces the match automatically.
 */
export const PALETTE = {
  paper: "#f2f0eb",
  paperRaised: "#fefdfa",
  rule: "#dad6ce",
  ink: "#16181c",
  ink2: "#5a5e66",
  ink3: "#64686f",
  slate: "#101216",
  slateRule: "#2a2e36",
  slateInk: "#ededea",
  slateInk2: "#9aa0aa",
  trace: "#4b3bd8",
  traceDim: "#dcd8f7",
  traceLight: "#9b8eff",
  verified: "#1f7a5c",
  unverified: "#8f5f0a",
  critical: "#b3261e",
  criticalLight: "#e2726b",
} as const;
