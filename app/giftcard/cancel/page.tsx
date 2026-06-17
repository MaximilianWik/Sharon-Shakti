import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Purchase Cancelled",
  description: "Your gift card purchase was cancelled. No charge was made.",
};

export default function GiftCardCancelPage() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="label text-ash/60">Cancelled</p>

        <h1 className="mt-6 font-display text-[clamp(1.75rem,9vw,5rem)] font-light leading-none tracking-display text-bone">
          No charge made.
        </h1>

        <p className="mt-8 leading-relaxed text-bone/70">
          Your purchase was cancelled. Nothing was charged to your card.
          Return to the gift card page whenever you&rsquo;re ready.
        </p>

        <Link
          href="/giftcard"
          className="group mt-10 inline-flex items-center gap-3 text-bone"
        >
          <span className="label">Back to gift cards</span>
          <span className="inline-block h-px w-12 bg-oxblood-bright transition-all duration-500 ease-out-expo group-hover:w-20" />
        </Link>
      </div>
    </section>
  );
}
