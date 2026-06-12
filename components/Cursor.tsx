"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a bone ring that swells and bleeds oxblood over interactive
 * targets. Pure transform/opacity animation via rAF — no layout thrash.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setHidden(false);
      const t = e.target as HTMLElement;
      setActive(!!t.closest("a, button, [data-cursor='hover']"));
    };
    const onLeave = () => setHidden(true);

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1 w-1 rounded-full bg-bone"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out-expo"
        style={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          borderColor: active ? "#9a1620" : "#7d7d7d",
          backgroundColor: active ? "rgba(110,16,20,0.15)" : "transparent",
        }}
      />
    </div>
  );
}
