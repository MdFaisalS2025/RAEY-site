import { useSyncExternalStore } from "react";

// Shared motion vocabulary. Every animated component on the site reads
// prefersReducedMotion() before doing anything JS-driven — the two
// Canvas 2D scenes (components/trace, components/ambient) and the
// desktop-only gate below.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function computeCanAnimateDesktop(): boolean {
  return (
    window.matchMedia("(min-width: 768px)").matches && !prefersReducedMotion()
  );
}

function subscribeCanAnimateDesktop(callback: () => void) {
  const widthQuery = window.matchMedia("(min-width: 768px)");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  widthQuery.addEventListener("change", callback);
  motionQuery.addEventListener("change", callback);
  return () => {
    widthQuery.removeEventListener("change", callback);
    motionQuery.removeEventListener("change", callback);
  };
}

function getServerSnapshotFalse() {
  return false;
}

// useSyncExternalStore, not useState+useEffect: reads external browser state
// (viewport, reduced-motion preference) rather than owning it, avoids a
// synchronous setState-in-effect, and re-evaluates automatically if the
// visitor resizes across the breakpoint or toggles their OS motion
// preference mid-session. Server/first-hydration snapshot is always false,
// so heavier desktop-only motion never flashes for SSR/no-JS/mobile.
export function useCanAnimateDesktop(): boolean {
  return useSyncExternalStore(
    subscribeCanAnimateDesktop,
    computeCanAnimateDesktop,
    getServerSnapshotFalse
  );
}
