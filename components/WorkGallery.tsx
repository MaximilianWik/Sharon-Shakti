"use client";

import { useState } from "react";
import WorkPlate from "./WorkPlate";
import Lightbox from "./Lightbox";
import type { Work } from "@/lib/works";

const DEFAULT_GRID =
  "grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 md:grid-cols-3 md:gap-4";

export default function WorkGallery({
  works,
  className = DEFAULT_GRID,
}: {
  works: Work[];
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);

  // Extract unique styles — filter UI only shows when metadata is populated.
  const styles = Array.from(
    new Set(works.map((w) => w.style).filter((s): s is string => Boolean(s)))
  ).sort();

  const filtered = activeStyle
    ? works.filter((w) => w.style === activeStyle)
    : works;

  // Keep lightbox indices relative to filtered list.
  const openLightbox = (filteredIndex: number) => setIndex(filteredIndex);

  return (
    <>
      {/* Style filter — only shown when works have style metadata */}
      {styles.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveStyle(null)}
            className={`label border px-4 py-2 text-[0.65rem] transition-colors duration-200 ${
              activeStyle === null
                ? "border-oxblood-bright bg-oxblood/20 text-bone"
                : "border-ash-dim/50 text-bone/60 hover:border-bone/40 hover:text-bone/80"
            }`}
          >
            All
          </button>
          {styles.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveStyle(s === activeStyle ? null : s)}
              className={`label border px-4 py-2 text-[0.65rem] transition-colors duration-200 ${
                activeStyle === s
                  ? "border-oxblood-bright bg-oxblood/20 text-bone"
                  : "border-ash-dim/50 text-bone/60 hover:border-bone/40 hover:text-bone/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className={className}>
        {filtered.map((w, i) => (
          <WorkPlate key={w.slug} work={w} onOpen={() => openLightbox(i)} />
        ))}
      </div>

      <Lightbox
        works={filtered}
        index={index}
        setIndex={setIndex}
        onClose={() => setIndex(null)}
      />
    </>
  );
}
