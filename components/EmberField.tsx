"use client";

import { useEffect, useRef } from "react";

/**
 * Low-density oxblood ember field. Canvas2D, DPR-aware, drifts upward with a
 * soft glow. Respects prefers-reduced-motion (renders a few static embers).
 * Purely decorative — pointer-events-none, aria-hidden.
 */
export default function EmberField({
  density = 26,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type Ember = { x: number; y: number; r: number; vy: number; vx: number; a: number; life: number; max: number };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const make = (seed = false): Ember => {
      const max = rnd(260, 620);
      return {
        x: rnd(0, w),
        y: seed ? rnd(0, h) : h + rnd(0, 40),
        r: rnd(0.6, 2.1),
        vy: rnd(0.12, 0.42),
        vx: rnd(-0.18, 0.18),
        a: 0,
        life: seed ? rnd(0, max) : 0,
        max,
      };
    };

    const embers: Ember[] = Array.from({ length: density }, () => make(true));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const e of embers) {
        const t = e.life / e.max;
        // fade in then out across lifetime
        e.a = Math.sin(Math.min(1, t) * Math.PI) * 0.55;
        const grd = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 6);
        grd.addColorStop(0, `rgba(154,22,32,${e.a})`);
        grd.addColorStop(0.5, `rgba(110,16,20,${e.a * 0.5})`);
        grd.addColorStop(1, "rgba(110,16,20,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.vy;
        e.x += e.vx;
        e.life += 1;
        if (e.life >= e.max || e.y < -20) embers[i] = make(false);
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    if (reduced) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
