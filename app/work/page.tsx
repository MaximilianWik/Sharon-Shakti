import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkGallery from "@/components/WorkGallery";
import TraceryCorner from "@/components/ornaments/TraceryCorner";
import { getGalleryWorks } from "@/lib/works.server";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A gallery of horror-realism, blackwork and dark-art tattoos by Sharon.",
};

export default function WorkPage() {
  return (
    <div className="pt-32 md:pt-40">
      {/* Header */}
      <header className="mx-auto max-w-[1600px] px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-20">
        <Reveal
          as="h1"
          y={56}
          className="mt-6 font-display text-[clamp(1.75rem,8vw,6rem)] font-light leading-[0.9] tracking-display text-bone"
        >
          Hung in black
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 max-w-measure leading-relaxed text-bone/70"
        >
          Healed and fresh work across horror realism, blackwork and dark art.
          Every piece is bespoke, designed for one body and never repeated.
        </Reveal>
      </header>

      {/* Gallery grid */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="relative p-3 sm:p-6 md:p-14">
          <TraceryCorner corner="tl" className="pointer-events-none absolute left-0 top-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <TraceryCorner corner="tr" className="pointer-events-none absolute right-0 top-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <TraceryCorner corner="bl" className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <TraceryCorner corner="br" className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <WorkGallery works={getGalleryWorks()} />
        </div>
      </section>

    </div>
  );
}
