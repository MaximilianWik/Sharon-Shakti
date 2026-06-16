import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BookingFlow from "@/components/booking/BookingFlow";
import TraceryCorner from "@/components/ornaments/TraceryCorner";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Request a consultation with Sharon. Live availability, synced to the studio calendar.",
};

export default function BookPage() {
  return (
    <div className="pt-32 md:pt-40">
      <header className="mx-auto max-w-[1600px] px-6 pb-16 md:px-12 md:pb-20">
        <Reveal
          as="h1"
          y={56}
          className="mt-6 font-display text-[clamp(1.75rem,8vw,6rem)] font-light leading-[1.1] tracking-display text-bone"
        >
          Reserve a session
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 max-w-measure leading-relaxed text-bone/70"
        >
          Choose a day and time. Every slot shown is live availability from my calendar. Each booking starts as a consultation, confirmed by me personally before anything is final.
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1600px] px-4 pb-32 sm:px-6 md:px-12 md:pb-44">
        <div className="relative border border-ash-dim/35 bg-ink/35 p-4 sm:p-8 md:p-[5.5rem]">
          <TraceryCorner corner="tl" className="pointer-events-none absolute left-2 top-2 h-12 w-12 text-ash/45 md:h-20 md:w-20" strokeWidth={1.5} />
          <TraceryCorner corner="tr" className="pointer-events-none absolute right-2 top-2 h-12 w-12 text-ash/45 md:h-20 md:w-20" strokeWidth={1.5} />
          <TraceryCorner corner="bl" className="pointer-events-none absolute bottom-2 left-2 h-12 w-12 text-ash/45 md:h-20 md:w-20" strokeWidth={1.5} />
          <TraceryCorner corner="br" className="pointer-events-none absolute bottom-2 right-2 h-12 w-12 text-ash/45 md:h-20 md:w-20" strokeWidth={1.5} />
          <BookingFlow />
        </div>
      </section>
    </div>
  );
}
