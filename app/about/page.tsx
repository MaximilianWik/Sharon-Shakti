import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Divider from "@/components/Divider";
import Arch from "@/components/ornaments/Arch";
import Placeholder from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sharon — horror-realism, blackwork and dark-art tattoo artist, blues & soul musician, burlesque performer.",
};

const facets = [
  { k: "Ink", v: "Horror realism, blackwork & dark art" },
  { k: "Stage", v: "Blues & soul vocalist" },
  { k: "Performance", v: "Burlesque artist" },
];

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40">
      {/* Intro: portrait + name */}
      <header className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-12 md:px-12">
        <Reveal className="md:col-span-5" y={56}>
          <Arch className="text-oxblood-bright/50">
            <div className="relative aspect-[3/4] bg-ink-raised">
              <Placeholder seed={88} label="Portrait of Sharon" />
            </div>
          </Arch>
        </Reveal>

        <div className="flex flex-col justify-end md:col-span-7">
          <Reveal as="p" className="label text-oxblood-bright">
            The Artist
          </Reveal>
          <Reveal
            as="h1"
            y={56}
            className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-light leading-[0.88] tracking-display text-bone"
          >
            Sharon
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="mt-8 max-w-measure text-lg leading-relaxed text-bone/75"
          >
            A dark artist working permanently in skin. Sharon renders horror
            realism and blackwork with the patience of a painter and the nerve
            of a performer — beauty pulled out of dread, never shock for its
            own sake.
          </Reveal>
        </div>
      </header>

      {/* Facets */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal
          className="grid grid-cols-1 gap-px overflow-hidden border border-ash-dim/40 bg-ash-dim/40 md:grid-cols-3"
          stagger={0.1}
        >
          {facets.map((f) => (
            <div key={f.k} className="bg-ink p-8 md:p-10">
              <p className="label text-oxblood-bright">{f.k}</p>
              <p className="mt-4 font-heading text-lg uppercase leading-tight tracking-heading text-bone md:text-xl">
                {f.v}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <Divider className="mx-auto mt-24 max-w-[1600px] px-6 md:px-12" />

      {/* Long-form */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal as="h2" className="md:col-span-4">
            <span className="font-heading text-2xl uppercase leading-tight tracking-heading text-bone md:text-3xl">
              One hand,
              <br />
              many dark forms.
            </span>
          </Reveal>

          <Reveal
            className="flex max-w-measure flex-col gap-6 text-lg leading-relaxed text-bone/75 md:col-span-8"
            stagger={0.08}
          >
            <p className="dropcap">
              The same instinct that holds a room from a stage guides the
              machine: timing, restraint, and the willingness to sit inside
              discomfort until it becomes beautiful. Sharon&rsquo;s tattooing
              carries the cadence of a blues set and the theatre of burlesque —
              an art of slow reveal.
            </p>
            <p>
              Work is exclusively horror realism, blackwork and dark art. No
              flash, no trends — each design is built from a single
              conversation and drawn for one body only. Sessions are long,
              deliberate, and treated as collaboration.
            </p>
            <p>
              Consultations precede every booking. Bring references, scars,
              stories, fears. What leaves the studio is meant to outlast
              everything around it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-ash-dim/40 bg-void">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-6 py-28 md:px-12 md:py-40">
          <Reveal as="h2" className="font-heading text-[clamp(2rem,6vw,4.25rem)] uppercase leading-[1.08] tracking-heading text-bone">
            Bring me your <span className="text-oxblood-bright">dread.</span>
          </Reveal>
          <Reveal>
            <Link
              href="/book"
              data-cursor="hover"
              className="group inline-flex items-center gap-4 bg-oxblood px-10 py-5 text-bone transition-colors duration-300 hover:bg-oxblood-bright"
            >
              <span className="label">Request a consultation</span>
              <span className="inline-block h-px w-10 bg-bone transition-all duration-500 ease-out-expo group-hover:w-16" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
