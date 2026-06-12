import Link from "next/link";
import RoseWindow from "@/components/ornaments/RoseWindow";
import CathedralFacade from "@/components/ornaments/CathedralFacade";
import RibbedColumn from "@/components/ornaments/RibbedColumn";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ash-dim/40 bg-ink">
      {/* Cathedral facade silhouette crowning the footer */}
      <CathedralFacade className="absolute inset-x-0 top-0 h-14 w-full text-ash-dim/60 md:h-20" />
      {/* Faint rose window bleeding off the right edge */}
      <RoseWindow className="pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-ash-dim/25" />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-8 pt-28 md:px-12 md:pt-36">
        <div className="flex flex-col gap-12 md:flex-row md:items-stretch md:gap-0">
          {/* Column 1 — CTA */}
          <div className="max-w-xl md:flex-1 md:pr-12">
            <p className="label text-ash">The Black Gallery</p>
            <h2 className="mt-6 font-heading text-3xl uppercase leading-[1.15] tracking-heading text-bone md:text-5xl">
              Commit it
              <br />
              <span className="text-oxblood-bright">to skin.</span>
            </h2>
            <Link
              href="/book"
              data-cursor="hover"
              className="group mt-10 inline-flex items-center gap-3 text-bone"
            >
              <span className="label">Request a session</span>
              <span className="inline-block h-px w-12 bg-oxblood-bright transition-all duration-500 ease-out-expo group-hover:w-20" />
            </Link>
          </div>

          <RibbedColumn className="hidden self-stretch md:flex" />

          {/* Column 2 — Pages */}
          <nav aria-label="Footer pages" className="md:flex-1 md:px-12">
            <p className="label mb-4 text-ash">Pages</p>
            <ul className="flex flex-col gap-3">
              <li><Link href="/work" className="text-bone/70 transition-colors hover:text-bone">Work</Link></li>
              <li><Link href="/about" className="text-bone/70 transition-colors hover:text-bone">About</Link></li>
              <li><Link href="/book" className="text-bone/70 transition-colors hover:text-bone">Book</Link></li>
            </ul>
          </nav>

          <RibbedColumn className="hidden self-stretch md:flex" />

          {/* Column 3 — Elsewhere */}
          <div className="md:flex-1 md:pl-12">
            <p className="label mb-4 text-ash">Elsewhere</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://www.instagram.com/sharonnshakti/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone/70 transition-colors hover:text-bone"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ash-dim/30 pt-8 text-ash md:flex-row md:items-center md:justify-between">
          <p className="label">© {year} Sharon</p>
          <p className="label">Horror Realism · Blackwork · Dark Art</p>
        </div>
      </div>

      {/* Cross-tile base row */}
      <div className="cross-tiles relative w-full" />
    </footer>
  );
}
