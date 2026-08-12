"use client";

import { useEffect, useRef } from "react";
import { ARCHIVE_CARDS } from "./archive-cards";

/**
 * The Archive: a field of scattered document-page cards in real CSS
 * 3D space (perspective + preserve-3d + translateZ) — not canvas or
 * WebGL, see the design note in archive-cards.ts for why.
 *
 * Solid ink-toned cards, not wireframes — high contrast against the
 * paper background is the point, not restraint for its own sake. A
 * handful carry the trace-violet accent instead of ink. Purely
 * CSS-driven for the drift and prefers-reduced-motion handling, so it
 * degrades correctly with zero JavaScript; the two JS enhancements
 * (cursor tilt on the whole field, hover lift on individual cards)
 * are both progressive, gated to fine-pointer devices with motion
 * allowed.
 */
export function ArchiveField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      container!.style.setProperty("--mouse-x", String(x));
      container!.style.setProperty("--mouse-y", String(y));
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      style={{ perspective: "1200px" }}
    >
      <div className="archive-field-tilt h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {ARCHIVE_CARDS.map((card) => {
          const depthT = (card.z - -620) / (-40 - -620);
          const opacity = 0.5 + depthT * 0.5;
          const shadowBlur = 4 + depthT * 22;
          const shadowAlpha = 0.08 + depthT * 0.22;

          return (
            <div
              key={card.id}
              className="absolute"
              style={{
                left: `${card.leftPct}%`,
                top: `${card.topPct}%`,
                width: card.size,
                height: card.size * 1.3,
                transform: `translate3d(-50%, -50%, ${card.z}px) rotateX(${card.rotX}deg) rotateY(${card.rotY}deg) rotateZ(${card.rotZ}deg)`,
                opacity,
              }}
            >
              <div
                className="archive-card-drift h-full w-full"
                style={{
                  animationDuration: `${card.duration}s`,
                  animationDelay: `${card.delay}s`,
                }}
              >
                <div
                  className={`archive-card pointer-events-auto h-full w-full rounded-[3px] ${
                    card.accent ? "bg-trace" : "bg-ink"
                  }`}
                  style={{ boxShadow: `0 ${8 + depthT * 10}px ${shadowBlur}px rgba(22,24,28,${shadowAlpha})` }}
                >
                  <div className="flex h-full flex-col justify-center gap-1.5 px-2.5">
                    {Array.from({ length: card.lineCount }).map((_, li) => (
                      <div
                        key={li}
                        className="h-px bg-paper"
                        style={{
                          width: li === card.lineCount - 1 ? "55%" : "82%",
                          opacity: li === 0 ? 0.85 : 0.5,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
