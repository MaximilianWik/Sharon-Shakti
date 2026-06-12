import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Request a consultation with Sharon. Live availability, synced to the studio calendar.",
};

export default function BookPage() {
  return (
    <div className="pt-32 md:pt-40">
      <header className="mx-auto max-w-[1600px] px-6 pb-16 md:px-12 md:pb-20">
        <Reveal as="p" className="label text-oxblood-bright">
          Booking
        </Reveal>
        <Reveal
          as="h1"
          y={56}
          className="mt-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-light leading-[0.9] tracking-display text-bone"
        >
          Reserve a session
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 max-w-measure leading-relaxed text-bone/70"
        >
          Pick a day and time below. Availability is read live from the studio
          calendar — open slots are real. Every request is a consultation first;
          nothing touches skin before we&rsquo;ve spoken.
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12 md:pb-44">
        <div className="gothic-corners gothic-corners--all gothic-corners--booking border border-ash-dim/35 bg-ink/35 p-5 md:p-8">
          <span className="gothic-corner-extra" aria-hidden />
          <BookingFlow />
        </div>
      </section>
    </div>
  );
}
