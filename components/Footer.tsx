import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ash-dim/40 bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label text-ash">The Black Gallery</p>
            <h2 className="mt-6 font-serif text-4xl italic leading-[1.1] tracking-display text-bone md:text-6xl">
              Commit it
              <br />
              <span className="italic text-oxblood-bright">to skin.</span>
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
