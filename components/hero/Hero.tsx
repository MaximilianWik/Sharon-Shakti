"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import Grunge from "@/components/Grunge";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line] span", { yPercent: 120 });
      gsap.set("[data-hero-fade]", { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.25 });
      tl.to("[data-hero-line] span", {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
      })
        .to(
          "[data-hero-fade]",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 },
          "-=0.7"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="Introduction"
    >
      <Hero3D />

      {/* Vignette to seat the type against the canvas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 38%, transparent 32%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      <Grunge id="hero" variant="streak" opacity={0.08} blend="screen" seed={3} />

      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-between px-6 py-28 md:px-12 md:py-32">
        <p data-hero-fade className="label text-ash">
          Horror Realism · Blackwork · Dark Art
        </p>

        <div>
          <h1 className="font-display text-[clamp(2.75rem,9vw,6rem)] font-light leading-[0.92] tracking-display text-bone">
            <span data-hero-line className="block overflow-hidden">
              <span className="block">Reverence for</span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="block italic text-oxblood-bright">
                the grotesque.
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-8 max-w-md text-balance text-base leading-relaxed text-bone/70"
          >
            Horror realism rendered like fine art — slow, deliberate, permanent.
            Step into the black gallery.
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="label text-ash">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-ash-dim">
          <span className="block h-3 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-oxblood-bright" />
        </span>
      </div>
    </section>
  );
}
