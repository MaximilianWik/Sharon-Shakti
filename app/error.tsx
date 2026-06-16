"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error boundary]", error);
  }, [error]);

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="label text-oxblood-bright">Something went wrong</p>
      <h1 className="mt-6 font-display text-[clamp(1.75rem,8vw,6rem)] font-light leading-none tracking-display text-bone">
        The ritual failed.
      </h1>
      <p className="mt-6 max-w-sm text-bone/70">
        An error occurred. Try again, or return to the gallery.
      </p>
      <div className="mt-10 flex items-center gap-6">
        <button
          type="button"
          onClick={reset}
          className="label border border-ash-dim/50 px-6 py-3 text-bone/80 transition-colors hover:border-bone/60 hover:text-bone"
        >
          Try again
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-bone"
        >
          <span className="label">Return home</span>
          <span className="inline-block h-px w-12 bg-oxblood-bright transition-all duration-500 ease-out-expo group-hover:w-20" />
        </Link>
      </div>
    </section>
  );
}
