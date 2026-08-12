/**
 * Deterministic layout data for The Archive's floating document
 * cards — same seeded-PRNG convention as trace-scene.ts and
 * problem-diagram.tsx, so the field is stable across renders and
 * reloads rather than reshuffling every mount.
 */

export interface ArchiveCard {
  id: number;
  leftPct: number;
  topPct: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  size: number;
  accent: boolean;
  lineCount: number;
  duration: number;
  delay: number;
}

const CARD_COUNT = 26;
const Z_NEAR = -40;
const Z_FAR = -620;

function mulberry32(seed: number) {
  let t = seed;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCards(): ArchiveCard[] {
  const random = mulberry32(4242);
  const cards: ArchiveCard[] = [];
  for (let i = 0; i < CARD_COUNT; i++) {
    cards.push({
      id: i,
      // Biased into the right ~40% of the hero — the headline and
      // body copy live in the left column (up to 7/12 ≈ 58% wide at
      // the md breakpoint, see hero.tsx's Grid), and solid dark cards
      // sitting directly over reading text made it unreadable. Left
      // clear here, with margin past the column edge, not just faded
      // by the scrim.
      leftPct: 58 + random() * 38,
      topPct: 4 + random() * 92,
      z: Z_NEAR + random() * (Z_FAR - Z_NEAR),
      rotX: (random() - 0.5) * 40,
      rotY: (random() - 0.5) * 50,
      rotZ: (random() - 0.5) * 22,
      size: 62 + random() * 42,
      // roughly one in six carries the trace accent — the "approved
      // source" among the scattered field
      accent: i % 6 === 0,
      lineCount: 3 + Math.floor(random() * 3),
      duration: 7 + random() * 6,
      // negative delay starts each card mid-cycle, so the field never
      // reads as freshly synchronized on load
      delay: -random() * 12,
    });
  }
  return cards;
}

export const ARCHIVE_CARDS = buildCards();
