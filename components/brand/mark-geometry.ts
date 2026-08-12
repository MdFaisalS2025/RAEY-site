/**
 * The one source of truth for the mark's coordinates. Previously this
 * geometry was hand-copied into 9 places (the React component, the
 * three ImageResponse icon routes, and six public SVG files) — any
 * change meant editing all nine and hoping they stayed in sync. Now
 * every one of those reads from here.
 *
 * Recentred and thickened from the original: the shape used to sit
 * 4.8 units from the left edge of its 32-box but only 2.5 from the
 * right, and 1.4px connector strokes nearly vanished at 24px header
 * size. This version is ~3.2-3.4 padding on both sides, 2px strokes,
 * and larger nodes/hub — legible at 24px and confident at 32px.
 *
 * Three source documents converging on one verified answer: connector
 * lines are drawn from each node's edge to the hub's edge along the
 * line between their centers, not from arbitrary offset points.
 */
export const MARK_GEOMETRY = {
  viewBox: "0 0 32 32",
  strokeWidth: 2,
  nodes: [
    { cx: 6, cy: 8, r: 2.6 },
    { cx: 6, cy: 16, r: 2.6 },
    { cx: 6, cy: 24, r: 2.6 },
  ],
  hub: { cx: 23, cy: 16, r: 6 },
  connectors: ["M8.4 9.1L17.6 13.4", "M8.6 16H17", "M8.4 22.9L17.6 18.6"],
} as const;
