import Link from "next/link";
import Arcade from "@/components/ornaments/Arcade";
import RoseWindow from "@/components/ornaments/RoseWindow";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ash-dim/40 bg-ink">
      {/* Blind arcade crowning the footer */}
      <Arcade
        bays={14}
        className="absolute inset-x-0 top-0 h-8 w-full text-ash-dim/70 md:h-10"
      />
      {/* Faint rose window bleeding off the right edge */}
      <RoseWindow className="pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-ash-dim/25" />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-20 pt-24 md:px-12 md:pt-28">
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
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

          <nav aria-label="Footer" className="flex gap-16">
            <ul className="flex flex-col gap-3">
              <li className="label mb-2 text-ash">Pages</li>
              <li>
                <Link href="/work" className="text-bone/70 transition-colors hover:text-bone">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-bone/70 transition-colors hover:text-bone">
                  About
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-bone/70 transition-colors hover:text-bone">
                  Book
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col gap-3">
              <li className="label mb-2 text-ash">Elsewhere</li>
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
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-ash-dim/30 pt-8 text-ash md:flex-row md:items-center md:justify-between">
          <p className="label">© {year} Sharon</p>
          <p className="label">Horror Realism · Blackwork · Dark Art</p>
        </div>
      </div>
    </footer>
  );
}
