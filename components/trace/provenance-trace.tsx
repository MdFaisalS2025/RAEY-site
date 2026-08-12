"use client";

import { useEffect, useRef, useState } from "react";
import { Grid } from "@/components/layout/grid";
import { SectionLabel } from "@/components/layout/section-label";
import { useCanAnimateDesktop } from "@/lib/motion";
import { traceContent } from "@/content/trace";
import { StaticTraceFrame } from "./static-trace-frame";
import { drawTraceFrame, beatIndexForProgress, type TraceColors } from "./trace-scene";

// Viewport-heights of scroll consumed while the canvas is pinned. Long
// enough that all six beats get room to read, short enough it doesn't
// feel like a stuck page — the drawing doesn't have 500vh of content
// in it, so the pin no longer asks for that much scroll.
const PIN_HEIGHT_VH = 280;

function readColors(): TraceColors {
  const style = getComputedStyle(document.documentElement);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return {
    ink: get("--color-slate-ink"),
    ink2: get("--color-slate-ink-2"),
    rule: get("--color-slate-rule"),
    // --color-trace-light, not --color-trace: this canvas draws on the
    // #101216 slate band, where plain --color-trace measures ~2.6:1 —
    // below even the 3:1 UI-component minimum. trace-light exists in
    // globals.css specifically for this surface and measures ~6.9:1.
    trace: get("--color-trace-light"),
    verified: get("--color-verified"),
    fontMono: get("--font-geist-mono"),
  };
}

/**
 * The site's signature visual: a scroll-pinned Canvas 2D drawing of a
 * hospital's approved protocols resolving into one cited passage. Only
 * ever mounted when useCanAnimateDesktop() is true (desktop, motion
 * allowed) — mobile and reduced-motion visitors get StaticTraceFrame
 * instead, which is a complete telling of the story on its own, not a
 * degraded version of this one.
 *
 * Progress is read directly from getBoundingClientRect() inside a rAF
 * loop, not a scroll event listener or React state — no re-renders on
 * scroll, no scroll-library dependency. The caption text is the only
 * thing that goes through React state, and only when the active beat
 * index actually changes.
 */
export function ProvenanceTrace() {
  const canAnimate = useCanAnimateDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [beatIndex, setBeatIndex] = useState(0);

  useEffect(() => {
    if (!canAnimate) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = readColors();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let cancelled = false;
    const start = performance.now();

    // The backing store is sized in device pixels, but the context is
    // scaled by dpr so every drawing call below operates in CSS-pixel
    // space — a lineWidth of 1 is genuinely one visual pixel on every
    // display. Without this scale (the bug this fixes), a lineWidth of
    // 1 meant one *device* pixel, which renders at half visual weight
    // on any 2x display.
    let cssWidth = 0;
    let cssHeight = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      cssWidth = rect.width;
      cssHeight = rect.height;
      canvas!.width = Math.round(cssWidth * dpr);
      canvas!.height = Math.round(cssHeight * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function tick() {
      if (cancelled) return;
      const rect = wrap!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const time = (performance.now() - start) / 1000;

      drawTraceFrame(
        ctx!,
        progress,
        time,
        { width: cssWidth, height: cssHeight },
        colors,
        traceContent.question
      );

      const idx = beatIndexForProgress(progress);
      setBeatIndex((prev) => (prev === idx ? prev : idx));

      raf = requestAnimationFrame(tick);
    }

    // The loop only runs while the pinned wrapper is near the viewport —
    // without this it ticks every frame for the entire session even
    // scrolled far past the section, reading getBoundingClientRect()
    // and drawing to a canvas nobody can see. A generous rootMargin
    // starts/stops it a viewport-height early so there's no visible
    // pop-in right at the boundary.
    let running = false;
    function startLoop() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }
    function stopLoop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { rootMargin: "100% 0px 100% 0px" }
    );
    visibilityObserver.observe(wrap);

    return () => {
      cancelled = true;
      stopLoop();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [canAnimate]);

  const caption = traceContent.beats[beatIndex];

  return (
    <section
      id="how-it-works"
      aria-label="How ProtocolMD finds an answer"
      data-ambient="slate"
      className="relative scroll-mt-20 bg-slate"
    >
      <p className="sr-only">
        {traceContent.staticCaption} A hospital&rsquo;s approved protocols are indexed
        and versioned. A question is matched to one approved source. The exact passage
        is located and cited in the answer.
      </p>

      {canAnimate ? (
        <div ref={wrapRef} style={{ height: `${PIN_HEIGHT_VH}vh` }} className="relative">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
            <Grid className="pointer-events-none relative h-full items-center">
              <div className="col-span-12 md:col-span-4">
                <SectionLabel index="02" label={traceContent.label} variant="slate" />
                <p className="text-display-3 mt-4 max-w-[16ch] text-slate-ink">{caption}</p>
              </div>
            </Grid>
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="relative h-[70vh] w-full md:h-[85vh]">
          <StaticTraceFrame />
          <Grid className="pointer-events-none absolute inset-0 h-full items-end pb-12">
            <div className="col-span-12 md:col-span-5">
              <SectionLabel index="02" label={traceContent.label} variant="slate" />
              <p className="text-display-3 mt-4 text-slate-ink">{traceContent.staticCaption}</p>
            </div>
          </Grid>
        </div>
      )}
    </section>
  );
}
