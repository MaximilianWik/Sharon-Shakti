import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="label text-oxblood-bright">404</p>
      <h1 className="mt-6 font-display text-[clamp(3rem,10vw,6.5rem)] font-light leading-none tracking-display text-bone">
        Lost in the dark
      </h1>
      <p className="mt-6 max-w-sm text-bone/70">
        This page was never inked. Find your way back to the gallery.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-3 text-bone"
      >
        <span className="label">Return home</span>
        <span className="inline-block h-px w-12 bg-oxblood-bright transition-all duration-500 ease-out-expo group-hover:w-20" />
      </Link>
    </section>
  );
}
