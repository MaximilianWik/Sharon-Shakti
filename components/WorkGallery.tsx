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

  return (
    <>
      <div className={className}>
        {works.map((w, i) => (
          <WorkPlate key={w.slug} work={w} onOpen={() => setIndex(i)} />
        ))}
      </div>

      <Lightbox
        works={works}
        index={index}
        setIndex={setIndex}
        onClose={() => setIndex(null)}
      />
    </>
  );
}
