"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "./Placeholder";
import TraceryCorner from "./ornaments/TraceryCorner";
import type { Work } from "@/lib/works";

const spanClass: Record<NonNullable<Work["span"]>, string> = {
  tall: "md:row-span-2 aspect-[3/4]",
  wide: "md:col-span-2 aspect-[4/3] md:aspect-[16/9]",
  normal: "aspect-[3/4]",
};

export default function WorkPlate({
  work,
}: {
  work: Work;
}) {
  const ref = useRef<HTMLElement>(null);
  const span = work.span ?? "normal";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y: 56, clipPath: "inset(8% 0 0 0)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <figure
      ref={ref}
      data-cursor="hover"
      className={`group relative overflow-hidden border border-ash-dim/20 bg-ink-raised transition-colors duration-700 hover:border-bone/25 ${spanClass[span]}`}
    >
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">
        <Placeholder seed={work.seed} label={work.title} />
      </div>

      {/* Leaded / stained-glass tint */}
      <div className="leaded-glass pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60" />

      {/* Tracery corners */}
      <TraceryCorner corner="tl" className="pointer-events-none absolute left-2 top-2 h-7 w-7 text-ash/40 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-bone/80" />
      <TraceryCorner corner="tr" className="pointer-events-none absolute right-2 top-2 h-7 w-7 text-ash/40 transition-all duration-500 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:text-bone/80" />
      <TraceryCorner corner="bl" className="pointer-events-none absolute bottom-2 left-2 h-7 w-7 text-ash/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone/80" />
      <TraceryCorner corner="br" className="pointer-events-none absolute bottom-2 right-2 h-7 w-7 text-ash/40 transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-bone/80" />

      <span className="absolute left-3 right-3 top-3 h-px scale-x-0 bg-oxblood-bright/80 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
      <span className="absolute bottom-3 left-3 right-3 h-px scale-x-0 bg-oxblood-bright/80 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
      <span className="absolute bottom-3 left-3 top-3 w-px scale-y-0 bg-oxblood-bright/80 transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
      <span className="absolute bottom-3 right-3 top-3 w-px scale-y-0 bg-oxblood-bright/80 transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-5 md:p-6">
        <div className="translate-y-1 opacity-90 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-heading text-lg uppercase leading-none tracking-heading text-bone md:text-xl">
            {work.title}
          </h3>
          <p className="label mt-2 text-ash">
            {work.style} · {work.placement}
          </p>
        </div>
        <span className="label shrink-0 text-bone/50">{work.year}</span>
      </figcaption>
    </figure>
  );
}
