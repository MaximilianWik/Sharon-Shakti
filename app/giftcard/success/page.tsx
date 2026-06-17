import type { Metadata } from "next";
import Link from "next/link";
import EmberField from "@/components/EmberField";

export const metadata: Metadata = {
  title: "Gift Card Purchased",
  description: "Your Sharon Shakti Tattoo gift card is on its way.",
};

export default function GiftCardSuccessPage() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <EmberField density={14} />

      <div className="relative z-10 max-w-md">
        <p className="label text-oxblood-bright">Order confirmed</p>

        <h1 className="mt-6 font-display text-[clamp(1.75rem,9vw,5rem)] font-light leading-none tracking-display text-bone">
          Purchase confirmed.
        </h1>

        <p className="mt-8 leading-relaxed text-bone/70">
          Check your inbox — your unique gift card code is on its way.
          Bring the code to the studio and Sharon will hand over the physical card.
          Didn&rsquo;t receive it? Check your spam folder or contact Sharon directly.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-bone"
          >
            <span className="label">Return home</span>
            <span className="inline-block h-px w-12 bg-oxblood-bright transition-all duration-500 ease-out-expo group-hover:w-20" />
          </Link>

          <Link
            href="/giftcard"
            className="group inline-flex items-center gap-3 text-bone/50 hover:text-bone transition-colors duration-300"
          >
            <span className="label">Buy another</span>
            <span className="inline-block h-px w-8 bg-ash/40 transition-all duration-500 ease-out-expo group-hover:w-14 group-hover:bg-oxblood-bright/60" />
          </Link>
        </div>
      </div>
    </section>
  );
}
