import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Divider from "@/components/Divider";
import EmberField from "@/components/EmberField";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import TraceryCorner from "@/components/ornaments/TraceryCorner";

export const metadata: Metadata = {
  title: "FAQ & Aftercare",
  description:
    "Frequently asked questions and tattoo aftercare guidance for clients of Sharon Shakti.",
};

// NOTE: generic placeholder copy — to be replaced with Sharon's own words.
const faqs: Faq[] = [
  {
    q: "How do I book?",
    a: "Every piece begins with a consultation request through the Book page. Once we've talked through your idea, placement and size, I'll confirm a session date personally.",
  },
  {
    q: "Do you take walk-ins?",
    a: "No — I work by appointment only so each design gets the time it deserves. Use the Book page to request a consultation.",
  },
  {
    q: "Does it hurt?",
    a: "Tattooing is uncomfortable, and longer sessions test your endurance. Eat well beforehand, stay hydrated, and tell me if you need a break — we go at a pace you can sit with.",
  },
  {
    q: "How should I prepare for my session?",
    a: "Sleep well, eat a proper meal, hydrate, and wear comfortable clothing that gives easy access to the area. Avoid alcohol for 24 hours before and don't get sunburnt on the placement.",
  },
  {
    q: "How long does a piece take?",
    a: "It depends on size, detail and placement. Larger work is split across multiple sessions. I'll give you a realistic estimate during the consultation.",
  },
  {
    q: "Do you offer touch-ups?",
    a: "A complimentary touch-up is available within a reasonable window after healing if the piece needs it — provided aftercare was followed.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Life happens — let me know as early as you can to reschedule. Deposits and notice periods will be confirmed when you book.",
  },
];

const aftercare: { k: string; v: string }[] = [
  {
    k: "First hours",
    v: "Leave the covering on for the time I tell you — usually 2–4 hours (or as advised for a second-skin wrap). It protects the fresh wound from bacteria.",
  },
  {
    k: "First wash",
    v: "Remove the wrap with clean hands, gently wash with lukewarm water and a fragrance-free soap, and pat dry with a clean paper towel. Never rub.",
  },
  {
    k: "Moisturise",
    v: "Apply a thin layer of a fragrance-free aftercare balm 2–3 times a day. Thin is key — the skin must breathe, not suffocate.",
  },
  {
    k: "Days 1–14",
    v: "It will scab and flake — this is normal. Do not pick, scratch or peel. Let everything fall away on its own to protect the colour and linework.",
  },
  {
    k: "Avoid",
    v: "No swimming pools, baths, saunas or soaking for 2–3 weeks. Keep it out of direct sun and don't work out to the point of heavy sweating over the area.",
  },
  {
    k: "Long term",
    v: "Once healed, sunscreen is the single best thing for keeping the work crisp and dark for life. Protect it whenever it sees the sun.",
  },
];

export default function CarePage() {
  return (
    <div className="pt-32 md:pt-40">
      {/* Header with embers */}
      <header className="relative overflow-hidden">
        <EmberField density={24} />
        <div className="relative mx-auto max-w-[1600px] px-6 pb-16 md:px-12 md:pb-24">
          <Reveal as="p" className="label text-oxblood-bright">
            Care
          </Reveal>
          <Reveal
            as="h1"
            y={56}
            className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-light leading-[0.9] tracking-display text-bone"
          >
            FAQ &amp; Aftercare
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-measure leading-relaxed text-bone/70">
            What to expect, how to prepare, and how to heal your tattoo so it
            outlasts everything around it.
          </Reveal>
        </div>
      </header>

      {/* FAQ */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <Reveal as="h2" className="mb-10 font-heading text-2xl uppercase tracking-heading text-bone md:text-3xl">
          Questions
        </Reveal>
        <Reveal>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      <Divider variant="fleur" className="mx-auto max-w-[1600px] px-6 md:px-12" />

      {/* Aftercare */}
      <section className="relative overflow-hidden">
        <EmberField density={16} />
        <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
          <Reveal as="h2" className="mb-12 font-heading text-2xl uppercase tracking-heading text-bone md:text-3xl">
            Aftercare
          </Reveal>
          <Reveal
            className="grid grid-cols-1 gap-px overflow-hidden border border-ash-dim/40 bg-ash-dim/40 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {aftercare.map((step, i) => (
              <div key={step.k} className="relative bg-ink p-8 md:p-10">
                <TraceryCorner corner="tl" className="pointer-events-none absolute left-2 top-2 h-8 w-8 text-ash/30" strokeWidth={1.5} />
                <span className="label text-ash">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-heading text-lg uppercase leading-tight tracking-heading text-oxblood-bright">
                  {step.k}
                </p>
                <p className="mt-4 leading-relaxed text-bone/70">{step.v}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-10 max-w-measure text-sm leading-relaxed text-ash">
            These are general guidelines. If anything looks or feels wrong —
            spreading redness, heat, or discharge — see a doctor. When in doubt,
            message me.
          </p>
        </div>
      </section>
    </div>
  );
}
