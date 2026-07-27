import Link from "next/link";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/Reveal";
import Divider from "@/components/Divider";
import WorkGallery from "@/components/WorkGallery";
import DecorBackdrop from "@/components/DecorBackdrop";
import TraceryCorner from "@/components/ornaments/TraceryCorner";
import { getSelectedWorks } from "@/lib/works.server";

export default function Home() {
  const featured = getSelectedWorks();

  return (
    <>
      <Hero />

      {/* Statement */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48">
        <div className="relative p-14 md:p-20">
          <DecorBackdrop opacity={0.3} />
          <TraceryCorner corner="tl" className="pointer-events-none absolute left-0 top-0 h-14 w-14 text-ash/45 md:h-20 md:w-20" strokeWidth={1.5} />
          <TraceryCorner corner="br" className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 text-ash/45 md:h-20 md:w-20" strokeWidth={1.5} />
          <div className="relative z-10">
            <Reveal
              as="p"
              className="dropcap max-w-measure font-heading text-2xl leading-[1.5] tracking-heading text-bone md:text-3xl"
            >
              The skin remembers what the eye fears. Each piece I draw slowly,
              in black and blood, to outlast the body it marks.
            </Reveal>

            <Reveal
              className="mt-16 grid gap-12 border-t border-ash-dim/40 pt-12 md:grid-cols-3"
              stagger={0.12}
            >
              {[
                { k: "Discipline", v: "Horror realism, blackwork & dark art. Nothing else." },
                { k: "Cadence", v: "A handful of sessions a month. Each design is one of one." },
                { k: "Studio", v: "By appointment only. Consultations precede every booking." },
              ].map((it) => (
                <div key={it.k}>
                  <p className="label text-oxblood-bright">{it.k}</p>
                  <p className="mt-3 max-w-xs leading-relaxed text-bone/70">{it.v}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <Divider variant="diamond" className="mx-auto max-w-[1600px] px-6 md:px-12" />

      {/* Featured work */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48">
        <Reveal className="mb-12">
          <h2 className="font-heading text-3xl uppercase tracking-heading text-bone md:text-5xl">
            Selected work
          </h2>
        </Reveal>

        <WorkGallery works={featured} />
      </section>
    </>
  );
}
