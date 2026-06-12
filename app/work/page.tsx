import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import WorkPlate from "@/components/WorkPlate";
import TraceryCorner from "@/components/ornaments/TraceryCorner";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A gallery of horror-realism, blackwork and dark-art tattoos by Sharon.",
};

export default function WorkPage() {
  return (
    <div className="pt-32 md:pt-40">
      {/* Header */}
      <header className="relative mx-auto max-w-[1600px] px-6 pb-16 md:px-12 md:pb-24">
        <TraceryCorner corner="tl" className="pointer-events-none absolute left-6 top-0 h-16 w-16 text-ash/30 md:left-12 md:h-24 md:w-24" strokeWidth={1.4} />
        <Reveal as="p" className="label text-oxblood-bright">
          The Gallery
        </Reveal>
        <Reveal
          as="h1"
          y={56}
          className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-light leading-[0.9] tracking-display text-bone"
        >
          Hung in black
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 max-w-measure leading-relaxed text-bone/70"
        >
          Healed and fresh work across horror realism, blackwork and dark art.
          Every piece is bespoke — designed for one body and never repeated.
          Imagery shown is representative placeholder while the archive is
          digitised.
        </Reveal>
      </header>

      {/* Gallery grid */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="relative p-3 md:p-4">
          <TraceryCorner corner="tl" className="pointer-events-none absolute left-0 top-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <TraceryCorner corner="tr" className="pointer-events-none absolute right-0 top-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <TraceryCorner corner="bl" className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <TraceryCorner corner="br" className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 text-ash/30 md:h-24 md:w-24" strokeWidth={1.4} />
          <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {works.map((w) => (
              <WorkPlate key={w.slug} work={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Tail CTA */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
        <Reveal className="relative flex flex-col items-start gap-8 border-t border-ash-dim/40 pt-16">
          <TraceryCorner corner="tl" className="pointer-events-none absolute left-0 top-12 h-14 w-14 text-ash/25" strokeWidth={1.4} />
          <h2 className="max-w-2xl font-heading text-3xl uppercase leading-[1.15] tracking-heading text-bone md:text-4xl">
            Something here speak to you?
          </h2>
          <Button href="/book">Begin a commission</Button>
        </Reveal>
      </section>
    </div>
  );
}
