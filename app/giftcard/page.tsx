import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Divider from "@/components/Divider";
import EmberField from "@/components/EmberField";
import TraceryCorner from "@/components/ornaments/TraceryCorner";
import GiftCardFlip from "@/components/GiftCardFlip";
import GiftCardPurchase from "@/components/GiftCardPurchase";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give someone a session with Sharon. Gift cards for horror realism and blackwork tattoos — redeemable against any booking.",
};

const features = [
  "Redeemable against any session",
  "No expiry date",
  "Sent by email as a printable certificate",
  "Personal message included",
];

const steps = [
  {
    k: "Choose a value",
    v: "Select a preset amount or enter a custom sum. Minimum 500 kr.",
  },
  {
    k: "Personalise",
    v: "Add a recipient name and a short message. The certificate is yours to print or forward.",
  },
  {
    k: "Redeem",
    v: "The recipient presents the code at booking. The value is deducted from their session total.",
  },
];

export default function GiftCardsPage() {
  return (
    <div className="pt-32 md:pt-40">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden">
        <EmberField density={20} />
        <div className="relative mx-auto max-w-[1600px] px-6 pb-16 md:px-12 md:pb-24">
          <Reveal>
            <p className="label text-oxblood-bright">Studio gift cards</p>
          </Reveal>
          <Reveal
            as="h1"
            y={56}
            delay={0.04}
            className="mt-4 font-display text-[clamp(1.75rem,8vw,6rem)] font-light leading-[1.1] tracking-display text-bone"
          >
            Mark the moment.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-measure leading-relaxed text-bone/70">
            Give someone a piece of permanent art. Gift cards are redeemable
            against any session — consultation, sitting, or both. No expiry.
            No conditions beyond showing up.
          </Reveal>
        </div>
      </header>

      {/* ── Card showcase + features ───────────────────────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 md:items-center">

          {/* Flip card */}
          <Reveal y={48}>
            <div className="mx-auto max-w-md md:max-w-none">
              <GiftCardFlip />
            </div>
          </Reveal>

          {/* Features */}
          <div>
            <Reveal>
              <h2 className="font-heading text-2xl uppercase tracking-heading text-bone md:text-3xl">
                What you get
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="mt-8 space-y-4">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-[0.32rem] h-2 w-2 shrink-0 rotate-45 border border-oxblood-bright/80 bg-oxblood/30"
                  />
                  <p className="leading-relaxed text-bone/75">{f}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.14} className="mt-12">
              <blockquote className="relative border-l border-oxblood-bright/60 pl-6">
                <p className="italic leading-relaxed text-bone/60">
                  "The best gift is one that outlasts the occasion.
                  A tattoo does exactly that."
                </p>
                <cite className="label mt-3 block text-ash/60 not-italic">Sharon Shakti</cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider variant="fleur" className="mx-auto max-w-[1600px] px-6 md:px-12" />

      {/* ── Purchase panel ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <Reveal className="mb-10">
          <h2 className="font-heading text-2xl uppercase tracking-heading text-bone md:text-3xl">
            Purchase
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative border border-ash-dim/35 bg-ink/35 p-8 md:p-14">
            <TraceryCorner corner="tl" className="pointer-events-none absolute left-2 top-2 h-12 w-12 text-ash/40 md:h-16 md:w-16" strokeWidth={1.5} />
            <TraceryCorner corner="tr" className="pointer-events-none absolute right-2 top-2 h-12 w-12 text-ash/40 md:h-16 md:w-16" strokeWidth={1.5} />
            <TraceryCorner corner="bl" className="pointer-events-none absolute bottom-2 left-2 h-12 w-12 text-ash/40 md:h-16 md:w-16" strokeWidth={1.5} />
            <TraceryCorner corner="br" className="pointer-events-none absolute bottom-2 right-2 h-12 w-12 text-ash/40 md:h-16 md:w-16" strokeWidth={1.5} />
            <GiftCardPurchase />
          </div>
        </Reveal>
      </section>

      <Divider variant="diamond" className="mx-auto max-w-[1600px] px-6 md:px-12" />

      {/* ── How it works ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <Reveal className="mb-12">
          <h2 className="font-heading text-2xl uppercase tracking-heading text-bone md:text-3xl">
            How it works
          </h2>
        </Reveal>

        <Reveal
          className="grid grid-cols-1 gap-px overflow-hidden border border-ash-dim/40 bg-ash-dim/40 md:grid-cols-3"
          stagger={0.1}
        >
          {steps.map((s, i) => (
            <div key={s.k} className="relative bg-ink p-8 md:p-10">
              <TraceryCorner corner="tl" className="pointer-events-none absolute left-2 top-2 h-9 w-9 text-ash/35" strokeWidth={1.5} />
              <TraceryCorner corner="br" className="pointer-events-none absolute bottom-2 right-2 h-9 w-9 text-ash/35" strokeWidth={1.5} />
              <p className="label text-oxblood-bright">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-heading text-lg uppercase leading-tight tracking-heading text-bone md:text-xl">
                {s.k}
              </p>
              <p className="mt-4 leading-relaxed text-bone/65">{s.v}</p>
            </div>
          ))}
        </Reveal>
      </section>

    </div>
  );
}
