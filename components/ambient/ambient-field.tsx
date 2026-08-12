"use client";

import { useEffect, useRef } from "react";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./ambient-shader";
import { prefersReducedMotion } from "@/lib/motion";

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * A single full-screen triangle running one fragment shader: layered
 * 3D simplex noise mixed between the paper and slate palettes based on
 * how much dark (slate) content is currently in view, with scroll
 * velocity lifting the amplitude slightly. One draw call, GPU-
 * parallel — negligible per-frame cost, which is why this is raw
 * WebGL2 rather than three.js: it's a procedural field, not geometry.
 *
 * Calibrated to be barely perceptible on the paper sections and only
 * really read as motion while scrolling past it, never while staring
 * at it. Sections that should pull the field toward the slate tone
 * carry `data-ambient="slate"` (the provenance trace, transparency,
 * and the closing CTA).
 *
 * prefers-reduced-motion and <768px both render exactly one static
 * frame and never start the animation loop. A failed WebGL2 context
 * simply never populates the canvas — this is a background layer with
 * no content of its own, so silence is the correct fallback.
 */
export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uScroll = gl.getUniformLocation(program, "u_scroll");
    const uVelocity = gl.getUniformLocation(program, "u_velocity");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      const width = Math.round(window.innerWidth * dpr);
      const height = Math.round(window.innerHeight * dpr);
      canvas!.width = width;
      canvas!.height = height;
      gl!.viewport(0, 0, width, height);
      gl!.uniform2f(uResolution, width, height);
    }
    resize();
    window.addEventListener("resize", resize);

    // Which sections currently pull the field toward the slate tone,
    // weighted by how much of each is actually in the viewport —
    // simpler and more robust than trying to derive this from a
    // global scroll percentage, since section heights vary.
    const darkEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-ambient="slate"]')
    );

    function computeScrollBlend() {
      const vh = window.innerHeight;
      let blend = 0;
      for (const el of darkEls) {
        const rect = el.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        blend += overlap / vh;
      }
      return Math.min(1, blend);
    }

    const canAnimate = !prefersReducedMotion() && window.innerWidth >= 768;

    let raf = 0;
    let cancelled = false;
    let lastScrollY = window.scrollY;
    let lastFrameTime = performance.now();
    let velocity = 0;
    const start = performance.now();

    function draw(time: number) {
      const scrollY = window.scrollY;
      const dt = Math.max(1, time - lastFrameTime);
      const rawVelocity = Math.abs(scrollY - lastScrollY) / dt;
      velocity = velocity * 0.9 + Math.min(1, rawVelocity * 4) * 0.1;
      lastScrollY = scrollY;
      lastFrameTime = time;

      gl!.uniform1f(uTime, (time - start) / 1000);
      gl!.uniform1f(uScroll, computeScrollBlend());
      gl!.uniform1f(uVelocity, velocity);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    if (canAnimate) {
      const tick = (time: number) => {
        if (cancelled) return;
        draw(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else {
      draw(performance.now());
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
