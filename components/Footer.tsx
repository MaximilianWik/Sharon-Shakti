import Link from "next/link";
import Button from "@/components/Button";
import RibbedColumn from "@/components/ornaments/RibbedColumn";
import TraceryCorner from "@/components/ornaments/TraceryCorner";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ash-dim/40 bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/30 to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-6 pt-10 md:px-12 md:pb-8 md:pt-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_auto_0.7fr_auto_0.7fr] md:gap-10">
          <div className="relative max-w-xl">
            <TraceryCorner corner="tl" className="pointer-events-none absolute -left-4 -top-4 h-10 w-10 text-ash/35" strokeWidth={1.5} />
            <h2 className="mt-5 font-heading text-2xl uppercase leading-[1.15] tracking-heading text-bone md:text-4xl">
              Commit it
              <br />
              <span className="text-oxblood-bright">to skin.</span>
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-bone/60">
              Horror realism, blackwork and dark art. I work by appointment only. Every piece begins with a conversation.
            </p>
            <Button href="/book" className="mt-7">
              Request a session
            </Button>
          </div>

          <RibbedColumn className="hidden self-stretch md:flex" />

          <nav aria-label="Footer pages">
            <p className="label mb-4 text-ash">Pages</p>
            <ul className="flex flex-col gap-3">
              <li><Link href="/work" className="footer-crypt-link">Work</Link></li>
              <li><Link href="/book" className="footer-crypt-link">Book</Link></li>
              <li><Link href="/about" className="footer-crypt-link">About</Link></li>
              <li><Link href="/care" className="footer-crypt-link">Care</Link></li>
              <li><Link href="/giftcard" className="footer-crypt-link">Gift Cards</Link></li>
            </ul>
          </nav>

          <RibbedColumn className="hidden self-stretch md:flex" />

          <div>
            <p className="label mb-4 text-ash">Elsewhere</p>
            <ul className="flex flex-col gap-3">
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

        <div className="mt-10 flex flex-col gap-2 border-t border-ash-dim/30 pt-5 text-ash md:mt-12 md:flex-row md:items-center md:justify-between">
          <p className="label">© {year} Sharon</p>
          <p className="label hidden sm:block">Horror Realism · Blackwork · Dark Art</p>
        </div>
      </div>

      <div className="cross-tiles relative w-full opacity-35" />
    </footer>
  );
}
