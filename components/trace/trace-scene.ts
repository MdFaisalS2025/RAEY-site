/**
 * Pure Canvas 2D drawing logic for the provenance trace, kept separate
 * from the React shell (provenance-trace.tsx) so the visual language is
 * one place and testable independent of scroll/DOM concerns.
 *
 * Six beats across progress 0-1: documents scatter, resolve into a
 * grid, a query sweeps through, one document isolates and enlarges,
 * one line inside it illuminates, and a trace line draws out to an
 * answer block. No particles, no nodes, no network — this is
 * information design, drawn like a technical schematic.
 *
 * All coordinates and line widths here are in CSS-pixel space, not
 * device-pixel space — the caller scales the canvas context by
 * devicePixelRatio once (see provenance-trace.tsx) so a lineWidth of 1
 * is genuinely 1 visual pixel on every display, retina included.
 */

export type TraceColors = {
  ink: string;
  ink2: string;
  rule: string;
  trace: string;
  verified: string;
  fontMono: string;
};

export type TraceDims = { width: number; height: number };

interface Glyph {
  scatterX: number;
  scatterY: number;
  scatterRot: number;
  driftSeed: number;
  gridCol: number;
  gridRow: number;
  lineCount: number;
  versionTag: string;
}

const GLYPH_COUNT = 12;
const GRID_COLS = 4;
const GRID_ROWS = 3;
export const MATCH_INDEX = 7;

const VERSION_POOL = ["v1.0", "v1.4", "v2.0", "v2.1", "v2.2", "v3.0", "v1.3", "v4.0"];

// Small deterministic PRNG (mulberry32) so the scattered layout is
// stable across renders and reloads rather than jumping every mount.
function seededRandom(seed: number) {
  let t = seed;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGlyphs(): Glyph[] {
  const random = seededRandom(1337);
  const glyphs: Glyph[] = [];
  for (let i = 0; i < GLYPH_COUNT; i++) {
    glyphs.push({
      scatterX: 0.08 + random() * 0.84,
      scatterY: 0.1 + random() * 0.8,
      scatterRot: (random() - 0.5) * 0.55,
      driftSeed: random() * 100,
      gridCol: i % GRID_COLS,
      gridRow: Math.floor(i / GRID_COLS),
      lineCount: 3 + Math.floor(random() * 3),
      versionTag: VERSION_POOL[Math.floor(random() * VERSION_POOL.length)],
    });
  }
  glyphs[MATCH_INDEX].versionTag = "v2.1";
  return glyphs;
}

const GLYPHS = buildGlyphs();

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function beatT(p: number, start: number, end: number, ease = true) {
  const raw = clamp01((p - start) / (end - start));
  return ease ? easeInOut(raw) : raw;
}

const BEATS = {
  organizeStart: 0.14,
  organizeEnd: 0.3,
  queryStart: 0.3,
  queryEnd: 0.46,
  isolateStart: 0.46,
  isolateEnd: 0.62,
  passageStart: 0.62,
  passageEnd: 0.8,
  answerStart: 0.8,
  answerEnd: 1.0,
} as const;

// The thresholds a visitor actually crosses, in order — beatIndexForProgress
// derives the active caption from these instead of splitting progress into
// equal sixths, so the caption in the margin always agrees with what the
// canvas is doing at that exact scroll position.
const BEAT_THRESHOLDS = [
  0,
  BEATS.organizeStart,
  BEATS.queryStart,
  BEATS.isolateStart,
  BEATS.passageStart,
  BEATS.answerStart,
];

export function beatIndexForProgress(p: number): number {
  const clamped = clamp01(p);
  let idx = 0;
  for (let i = 0; i < BEAT_THRESHOLDS.length; i++) {
    if (clamped >= BEAT_THRESHOLDS[i]) idx = i;
  }
  return idx;
}

function drawGlyph(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  rot: number,
  glyph: Glyph,
  colors: TraceColors,
  opacity: number,
  highlightLine: number | null,
  showVersion: boolean,
  lifted: boolean
) {
  if (opacity <= 0.003) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.globalAlpha = opacity;

  const rx = w / 2;
  const ry = h / 2;

  if (lifted) {
    ctx.shadowColor = "rgba(16, 18, 22, 0.35)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
  }

  // a near-imperceptible fill — just enough to read as a surface, not
  // a flat wireframe plane
  ctx.fillStyle = colors.ink;
  ctx.globalAlpha = opacity * 0.035;
  ctx.fillRect(-rx, -ry, w, h);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.globalAlpha = opacity;
  ctx.strokeStyle = colors.ink2;
  ctx.lineWidth = 1;
  ctx.strokeRect(-rx, -ry, w, h);

  const pad = w * 0.16;
  const gap = (h - pad * 2) / glyph.lineCount;
  for (let i = 0; i < glyph.lineCount; i++) {
    const ly = -ry + pad + gap * (i + 0.5);
    const shrink = i === glyph.lineCount - 1 ? w * 0.28 : 0;
    const lineW = w - pad * 2 - shrink;
    const isHighlight = highlightLine === i;
    ctx.save();
    ctx.strokeStyle = isHighlight ? colors.trace : colors.rule;
    ctx.lineWidth = isHighlight ? 2 : 1;
    ctx.globalAlpha = opacity * (isHighlight ? 1 : 0.7);
    ctx.beginPath();
    ctx.moveTo(-rx + pad, ly);
    ctx.lineTo(-rx + pad + lineW, ly);
    ctx.stroke();
    if (isHighlight) {
      // margin bracket beside the illuminated passage
      ctx.beginPath();
      ctx.moveTo(-rx + pad * 0.35, ly - 5);
      ctx.lineTo(-rx + pad * 0.35, ly + 5);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (showVersion) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = highlightLine !== null ? colors.trace : colors.ink2;
    ctx.font = `${Math.max(9, w * 0.075)}px ${colors.fontMono}, monospace`;
    ctx.textBaseline = "top";
    const label = highlightLine !== null ? `${glyph.versionTag} · current` : glyph.versionTag;
    ctx.fillText(label, -rx + pad * 0.35, ry + 6);
  }

  ctx.restore();
}

export function drawTraceFrame(
  ctx: CanvasRenderingContext2D,
  progress: number,
  time: number,
  dims: TraceDims,
  colors: TraceColors,
  question: string
) {
  const { width, height } = dims;
  ctx.clearRect(0, 0, width, height);
  const p = clamp01(progress);

  // The field always reserves the right third for the eventual answer
  // block so nothing reflows when that beat begins.
  const fieldLeft = width * 0.06;
  const fieldRight = width * 0.6;
  const fieldTop = height * 0.16;
  const fieldBottom = height * 0.86;
  const fieldW = fieldRight - fieldLeft;
  const fieldH = fieldBottom - fieldTop;
  const gridColW = fieldW / GRID_COLS;
  const gridRowH = fieldH / GRID_ROWS;
  const glyphW = Math.min(width, height) * 0.095;
  const glyphH = glyphW * 1.3;

  const layoutT = beatT(p, BEATS.organizeStart, BEATS.organizeEnd);
  const queryT = beatT(p, BEATS.queryStart, BEATS.queryEnd, false);
  const isolateT = beatT(p, BEATS.isolateStart, BEATS.isolateEnd);
  const passageT = beatT(p, BEATS.passageStart, BEATS.passageEnd);
  const answerT = beatT(p, BEATS.answerStart, BEATS.answerEnd);
  const isolateActive = isolateT > 0;
  const showVersions = layoutT > 0.4;

  const matchTargetX = width * 0.5;
  const matchTargetY = height * 0.5;
  const matchGridX = fieldLeft + (GLYPHS[MATCH_INDEX].gridCol + 0.5) * gridColW;
  const matchGridY = fieldTop + (GLYPHS[MATCH_INDEX].gridRow + 0.5) * gridRowH;
  const matchOffsetX = lerp(0, matchTargetX - matchGridX, isolateT);
  const matchOffsetY = lerp(0, matchTargetY - matchGridY, isolateT);
  const matchScale = lerp(1, 2.3, isolateT);

  let matchAbsX = matchGridX;
  let matchAbsY = matchGridY;

  GLYPHS.forEach((g, i) => {
    const scatterCx = fieldLeft + g.scatterX * fieldW;
    const scatterCy = fieldTop + g.scatterY * fieldH;
    const gridCx = fieldLeft + (g.gridCol + 0.5) * gridColW;
    const gridCy = fieldTop + (g.gridRow + 0.5) * gridRowH;

    let cx = lerp(scatterCx, gridCx, layoutT);
    let cy = lerp(scatterCy, gridCy, layoutT);

    // idle drift while still scattered, fading out as it organizes
    const driftAmount = 1 - layoutT;
    if (driftAmount > 0.01) {
      cx += Math.sin(time * 0.35 + g.driftSeed) * 5 * driftAmount;
      cy += Math.cos(time * 0.3 + g.driftSeed * 1.4) * 5 * driftAmount;
    }
    // a much smaller wobble stays alive at every stage, including once
    // fully organized — a stopped scroll should never look like a
    // frozen still image
    cx += Math.sin(time * 0.2 + g.driftSeed) * 1.4;
    cy += Math.cos(time * 0.17 + g.driftSeed * 1.3) * 1.4;

    const rot = lerp(g.scatterRot, 0, layoutT);
    const isMatch = i === MATCH_INDEX;

    let opacity = 1;
    if (isolateActive) {
      // the rest of the field recedes but stays faintly present, not
      // dropped to near-zero — the climax should still read as "one
      // match found among many," not "everything else vanished"
      opacity = isMatch ? 1 : lerp(1, 0.22, isolateT);
    }

    let drawCx = cx;
    let drawCy = cy;
    let drawW = glyphW;
    let drawH = glyphH;

    if (isMatch) {
      drawCx = cx + matchOffsetX;
      drawCy = cy + matchOffsetY;
      drawW = glyphW * matchScale;
      drawH = glyphH * matchScale;
      matchAbsX = drawCx;
      matchAbsY = drawCy;
    }

    const highlightLine = isMatch && passageT > 0 ? 1 : null;

    drawGlyph(
      ctx,
      drawCx,
      drawCy,
      drawW,
      drawH,
      rot,
      g,
      colors,
      opacity,
      highlightLine,
      showVersions && !(isolateActive && !isMatch),
      isMatch && isolateT > 0.15
    );
  });

  // query sweep — a line crossing the indexed grid, before isolation
  // begins, with the visitor's actual question set beside it
  if (queryT > 0 && queryT < 1 && !isolateActive) {
    const sweepY = fieldTop + queryT * fieldH;
    ctx.save();
    ctx.strokeStyle = colors.trace;
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(fieldLeft, sweepY);
    ctx.lineTo(fieldRight, sweepY);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = Math.min(1, queryT * 3);
    ctx.fillStyle = colors.trace;
    ctx.font = `12px ${colors.fontMono}, monospace`;
    ctx.textBaseline = "bottom";
    ctx.fillText(`“${question}”`, fieldLeft, sweepY - 8);
    ctx.restore();
  }

  // trace line + answer block
  if (answerT > 0) {
    const answerX = width * 0.78;
    const answerY = height * 0.5;
    const answerW = width * 0.3;
    const answerH = height * 0.24;

    const lineT = clamp01(answerT * 1.5);
    const endX = lerp(matchAbsX, answerX - answerW / 2 - 6, lineT);
    const endY = lerp(matchAbsY, answerY, lineT);

    ctx.save();
    ctx.strokeStyle = colors.trace;
    ctx.globalAlpha = Math.min(1, answerT * 1.4);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(matchAbsX, matchAbsY);
    ctx.quadraticCurveTo((matchAbsX + endX) / 2, matchAbsY, endX, endY);
    ctx.stroke();
    ctx.restore();

    // The block builds in stages rather than fading in as one unit: the
    // frame first, then the label, then each line in sequence, then the
    // citation marker settles in last — the climax reads as something
    // assembling, not a single cross-fade.
    if (answerT > 0.2) {
      const borderT = clamp01((answerT - 0.2) / 0.2);
      ctx.save();
      ctx.shadowColor = "rgba(16, 18, 22, 0.3)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 8;
      ctx.globalAlpha = borderT;
      ctx.strokeStyle = colors.verified;
      ctx.lineWidth = 1;
      ctx.strokeRect(answerX - answerW / 2, answerY - answerH / 2, answerW, answerH);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.restore();
    }

    if (answerT > 0.32) {
      const labelT = clamp01((answerT - 0.32) / 0.15);
      ctx.save();
      ctx.globalAlpha = labelT;
      ctx.fillStyle = colors.verified;
      ctx.font = `10px ${colors.fontMono}, monospace`;
      ctx.textBaseline = "bottom";
      ctx.fillText("ANSWER · CITED", answerX - answerW / 2, answerY - answerH / 2 - 6);
      ctx.restore();
    }

    const pad = answerW * 0.1;
    const lineCount = 3;
    const gap = (answerH - pad * 2) / lineCount;
    for (let i = 0; i < lineCount; i++) {
      const lineStart = 0.45 + i * 0.12;
      const lineT = clamp01((answerT - lineStart) / 0.15);
      if (lineT <= 0) continue;
      const ly = answerY - answerH / 2 + pad + gap * (i + 0.5);
      const shrink = i === lineCount - 1 ? answerW * 0.35 : 0;
      ctx.save();
      ctx.strokeStyle = colors.ink2;
      ctx.globalAlpha = lineT * 0.65;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(answerX - answerW / 2 + pad, ly);
      ctx.lineTo(answerX - answerW / 2 + pad + (answerW - pad * 2 - shrink) * lineT, ly);
      ctx.stroke();
      ctx.restore();

      if (i === 0 && answerT > 0.85) {
        const citeT = clamp01((answerT - 0.85) / 0.15);
        ctx.save();
        ctx.fillStyle = colors.trace;
        ctx.globalAlpha = citeT;
        ctx.font = `9px ${colors.fontMono}, monospace`;
        ctx.textBaseline = "middle";
        ctx.fillText("[1]", answerX + answerW / 2 - pad - shrink + 6, ly);
        ctx.restore();
      }
    }
  }
}

export const TRACE_BEAT_COUNT = 6;
