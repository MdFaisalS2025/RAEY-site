/**
 * In-memory, best-effort rate limiting for the one public,
 * unauthenticated endpoint on the site (the pilot-request form).
 *
 * Deliberately not backed by Redis/Upstash/Vercel KV — this site has
 * exactly four runtime dependencies on purpose, and adding a durable
 * store means adding an account and a dependency for what's currently
 * a single low-traffic form. The tradeoff: a serverless cold start
 * gets a fresh Map, so this resets on redeploys and doesn't share
 * state across concurrent instances. That's a real limitation, not a
 * secret one — if abuse becomes an actual problem, replace this with
 * Vercel KV or Upstash rather than trying to harden it further.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

// Periodic cleanup so the Map doesn't grow unbounded across a long-
// lived warm instance — runs at most once per window, only when the
// map has grown past a size worth bothering with.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < WINDOW_MS || hits.size < 500) return;
  lastSweep = now;
  for (const [key, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}

/** Returns true if `key` (typically an IP address) is within its rate limit. */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  sweep(now);

  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
}
