import Link from "next/link";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/Reveal";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import RoseWindow from "@/components/ornaments/RoseWindow";
import WorkPlate from "@/components/WorkPlate";
import { works } from "@/lib/works";

export default function Home() {
  const featured = works.slice(0, 5);

  return (
    <>
      <Hero />

      {/* Statement */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48">
        <div className="gothic-corners gothic-corners--all gothic-corners--section relative px-4 py-8 md:px-10 md:py-12">
          <span className="gothic-corner-extra" aria-hidden />
          <Reveal
            as="p"
            className="dropcap max-w-measure font-heading text-2xl leading-[1.5] tracking-heading text-bone md:text-3xl"
          >
            The skin remembers what the eye fears. Each piece is drawn slowly,
            in black and blood, to outlast the body it marks.
          </Reveal>

          <Reveal
            className="mt-16 grid gap-12 border-t border-ash-dim/40 pt-12 md:grid-cols-3"
            stagger={0.12}
          >
            {[
              { k: "Discipline", v: "Horror realism, blackwork & dark art — exclusively." },
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
      </section>

      <Divider variant="diamond" className="mx-auto max-w-[1600px] px-6 md:px-12" />

      {/* Featured work */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-heading text-3xl uppercase tracking-heading text-bone md:text-5xl">
            Selected work
          </h2>
          <Link
            href="/work"
            data-cursor="hover"
            className="group hidden shrink-0 items-center gap-3 text-bone md:flex"
          >
            <span className="label">The full gallery</span>
            <span className="inline-block h-px w-12 bg-oxblood-bright transition-all duration-500 ease-out-expo group-hover:w-20" />
          </Link>
        </Reveal>

        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {featured.map((w) => (
            <WorkPlate key={w.slug} work={w} />
          ))}
        </div>

        <Link
          href="/work"
          className="mt-10 flex items-center justify-center gap-3 border border-ash-dim/50 py-5 text-bone transition-colors hover:border-oxblood-bright hover:text-oxblood-bright md:hidden"
        >
          <span className="label">The full gallery</span>
        </Link>
      </section>

      {/* Booking CTA band */}
      <section className="gothic-corners gothic-corners--section relative overflow-hidden border-y border-ash-dim/40 bg-void">
        <RoseWindow className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 text-ash-dim/20" />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start gap-10 px-6 py-32 md:px-12 md:py-44">
          <Reveal as="h2" className="font-heading text-[clamp(2rem,6vw,4.25rem)] uppercase leading-[1.08] tracking-heading text-bone">
            Sit for a piece
            <br />
            that <span className="text-oxblood-bright">stays.</span>
          </Reveal>
          <Reveal>
            <Button href="/book">Check availability</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
