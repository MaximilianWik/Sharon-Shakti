"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-ink/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          aria-label="Sharon — home"
          className="font-display text-xl font-semibold tracking-display text-bone transition-opacity hover:opacity-70"
        >
          SHARON
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="label group relative inline-block py-1 text-bone/80 transition-colors hover:text-bone"
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-oxblood-bright transition-all duration-500 ease-out-expo ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          data-cursor="hover"
        >
          <span
            className={`block h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ash-dim/40 bg-ink/95 backdrop-blur-md transition-[max-height] duration-500 ease-out-expo md:hidden ${
          open ? "max-h-72" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block border-b border-ash-dim/30 py-4 font-display text-2xl text-bone last:border-0"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
