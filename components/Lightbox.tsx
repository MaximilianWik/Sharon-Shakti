"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TraceryCorner from "./ornaments/TraceryCorner";
import type { Work } from "@/lib/works";

export default function Lightbox({
  works,
  index,
  setIndex,
  onClose,
}: {
  works: Work[];
  index: number | null;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const work = open ? works[index as number] : null;

  const prev = useCallback(() => {
    if (index === null) return;
    setIndex((index - 1 + works.length) % works.length);
  }, [index, works.length, setIndex]);

  const next = useCallback(() => {
    if (index === null) return;
    setIndex((index + 1) % works.length);
  }, [index, works.length, setIndex]);

  // Keyboard nav + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open && work && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop — ink + blur + oxblood underglow */}
          <div
            className="absolute inset-0 bg-void/88 backdrop-blur-md"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 60%, rgba(110,16,20,0.18), rgba(6,6,6,0.92) 60%)",
            }}
          />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-ash-dim/50 text-bone/70 transition-colors hover:border-oxblood-bright hover:text-bone"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          {/* Prev / Next */}
          {works.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ash-dim/40 text-bone/70 transition-colors hover:border-oxblood-bright hover:text-bone md:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ash-dim/40 text-bone/70 transition-colors hover:border-oxblood-bright hover:text-bone md:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Framed image */}
          <motion.figure
            key={work.slug}
            className="relative z-[1] m-0 flex max-h-full max-w-full flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, y: 24, clipPath: "inset(6% 0 0 0)" }}
            animate={{ opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={work.src}
                alt={work.title}
                width={work.width}
                height={work.height}
                className="block h-auto w-auto"
                style={{ maxHeight: "82vh", maxWidth: "90vw" }}
                sizes="90vw"
                priority
              />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-oxblood-bright/80" />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-oxblood-bright/40" />
              <TraceryCorner corner="tl" className="pointer-events-none absolute -left-3 -top-3 h-9 w-9 text-ash/60" strokeWidth={1.4} />
              <TraceryCorner corner="tr" className="pointer-events-none absolute -right-3 -top-3 h-9 w-9 text-ash/60" strokeWidth={1.4} />
              <TraceryCorner corner="bl" className="pointer-events-none absolute -bottom-3 -left-3 h-9 w-9 text-ash/60" strokeWidth={1.4} />
              <TraceryCorner corner="br" className="pointer-events-none absolute -bottom-3 -right-3 h-9 w-9 text-ash/60" strokeWidth={1.4} />
            </div>

            <figcaption className="mt-5 flex items-baseline gap-4 text-center">
              <span className="font-heading text-base uppercase tracking-heading text-bone md:text-lg">
                {work.title}
              </span>
              {(work.style || work.placement) && (
                <span className="label text-ash">
                  {[work.style, work.placement].filter(Boolean).join(" · ")}
                </span>
              )}
              {work.year && <span className="label text-bone/40">{work.year}</span>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
