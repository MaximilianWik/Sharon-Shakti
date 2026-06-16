"use client";

import Image from "next/image";
import EmberField from "./EmberField";
import TraceryCorner from "./ornaments/TraceryCorner";

const HANDLE = "sharonnshakti";
const PROFILE = `https://www.instagram.com/${HANDLE}/`;

// Dark feed teaser. A true auto-updating IG feed needs the Graph API or a
// third-party widget (and IG's own embed cards are light-themed, clashing with
// the gallery). This dark grid links out to the profile; swap tiles for real
// post thumbnails or drop in /p/<shortcode>/embed iframes when desired.
const TILES = [
  "/placeholder/placeholder11.png",
  "/placeholder/placeholder12.png",
  "/placeholder/placeholder13.png",
  "/placeholder/placeholder14.png",
  "/placeholder/placeholder15.png",
  "/placeholder/placeholder7.png",
];

function IgGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section className="relative overflow-hidden border-y border-ash-dim/40 bg-void">
      <EmberField density={20} />
      <TraceryCorner corner="tl" className="pointer-events-none absolute left-4 top-4 h-16 w-16 text-ash/25 md:h-24 md:w-24" strokeWidth={1.4} />
      <TraceryCorner corner="br" className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 text-ash/25 md:h-24 md:w-24" strokeWidth={1.4} />

      <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="flex flex-col items-start gap-4">
          <span className="label text-oxblood-bright">Elsewhere</span>
          <a
            href={PROFILE}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 font-heading text-3xl uppercase tracking-heading text-bone transition-colors hover:text-oxblood-bright md:text-5xl"
          >
            <IgGlyph className="h-8 w-8 md:h-11 md:w-11" />
            @{HANDLE}
          </a>
          <p className="max-w-measure leading-relaxed text-bone/60">
            Latest work, process and fragments — follow along on Instagram.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-16 md:gap-3">
          {TILES.map((src, i) => (
            <a
              key={src}
              href={PROFILE}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden border border-ash-dim/20 bg-ink-raised"
              aria-label={`View @${HANDLE} on Instagram`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-void/30 transition-colors duration-500 group-hover:bg-void/10" />
              <IgGlyph className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
              {i === TILES.length - 1 && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-void/55 font-heading text-sm uppercase tracking-heading text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View all
                </span>
              )}
            </a>
          ))}
        </div>

        <a
          href={PROFILE}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 border border-ash-dim/50 px-7 py-4 font-heading text-xs uppercase tracking-heading text-bone transition-colors hover:border-oxblood-bright hover:text-oxblood-bright"
        >
          <IgGlyph className="h-4 w-4" />
          Follow @{HANDLE}
        </a>
      </div>
    </section>
  );
}
