"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-reveal wrapper. Content is fully visible without JS; the effect only
 * adds an entrance. Set `stagger` to animate direct children individually.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 40,
  delay = 0,
  stagger,
  duration = 1,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets =
      stagger != null ? Array.from(el.children) : [el];

    const anim = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [y, delay, stagger, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
