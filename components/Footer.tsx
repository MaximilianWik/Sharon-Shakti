import Link from "next/link";
import Button from "@/components/Button";
import RibbedColumn from "@/components/ornaments/RibbedColumn";
import TraceryCorner from "@/components/ornaments/TraceryCorner";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ash-dim/40 bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/30 to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-8 pt-16 md:px-12 md:pb-10 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_auto_0.7fr_auto_0.7fr] md:gap-12">
          <div className="relative max-w-xl">
            <TraceryCorner corner="tl" className="pointer-events-none absolute -left-4 -top-4 h-12 w-12 text-ash/35" strokeWidth={1.5} />
            <p className="label text-ash">The Black Gallery</p>
            <h2 className="mt-6 font-heading text-3xl uppercase leading-[1.15] tracking-heading text-bone md:text-5xl">
              Commit it
              <br />
              <span className="text-oxblood-bright">to skin.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-bone/60">
              Horror realism, blackwork and dark art. I work by appointment only. Every piece begins with a conversation.
            </p>
            <Button href="/book" className="mt-10">
              Request a session
            </Button>
          </div>

          <RibbedColumn className="hidden self-stretch md:flex" />

          <nav aria-label="Footer pages">
            <p className="label mb-5 text-ash">Pages</p>
            <ul className="flex flex-col gap-4">
              <li><Link href="/work" className="footer-crypt-link">Work</Link></li>
              <li><Link href="/book" className="footer-crypt-link">Book</Link></li>
              <li><Link href="/about" className="footer-crypt-link">About</Link></li>
              <li><Link href="/care" className="footer-crypt-link">Care</Link></li>
            </ul>
          </nav>

          <RibbedColumn className="hidden self-stretch md:flex" />

          <div>
            <p className="label mb-5 text-ash">Elsewhere</p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="https://www.instagram.com/sharonnshakti/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-crypt-link"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ash-dim/30 pt-8 text-ash md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="label">© {year} Sharon</p>
          <p className="label hidden sm:block">Horror Realism · Blackwork · Dark Art</p>
        </div>
      </div>

      <div className="cross-tiles relative w-full opacity-35" />
    </footer>
  );
}
