"use client";

import { useState } from "react";

export type Faq = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ash-dim/30 border-y border-ash-dim/30">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
            >
              <span className="flex items-center gap-4">
                <span
                  aria-hidden
                  className={`inline-block h-2 w-2 rotate-45 border border-oxblood-bright transition-all duration-300 ${
                    isOpen ? "bg-oxblood-bright shadow-[0_0_10px_rgba(154,22,32,0.6)]" : "bg-transparent"
                  }`}
                />
                <span className="font-heading text-lg uppercase tracking-heading text-bone transition-colors group-hover:text-oxblood-bright md:text-xl">
                  {it.q}
                </span>
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-2xl font-light leading-none text-ash transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-oxblood-bright" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out-expo ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-measure pb-7 pl-8 leading-relaxed text-bone/70">{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
