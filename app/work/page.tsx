import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkPlate from "@/components/WorkPlate";
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
      <header className="mx-auto max-w-[1600px] px-6 pb-16 md:px-12 md:pb-24">
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
        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {works.map((w) => (
            <WorkPlate key={w.slug} work={w} />
          ))}
        </div>
      </section>

      {/* Tail CTA */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
        <Reveal className="flex flex-col items-start gap-8 border-t border-ash-dim/40 pt-16">
          <h2 className="max-w-2xl font-display text-4xl font-light leading-[1.1] tracking-display text-bone md:text-6xl">
            Something here speak to you?
          </h2>
          <Link
            href="/book"
            data-cursor="hover"
            className="group inline-flex items-center gap-4 bg-oxblood px-10 py-5 text-bone transition-colors duration-300 hover:bg-oxblood-bright"
          >
            <span className="label">Begin a commission</span>
            <span className="inline-block h-px w-10 bg-bone transition-all duration-500 ease-out-expo group-hover:w-16" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
