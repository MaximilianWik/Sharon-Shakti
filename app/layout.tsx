import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cinzel, EB_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// H1 / hero — the decorative horror display face.
const display = localFont({
  src: "./fonts/SingleGhost.ttf",
  variable: "--font-display",
  display: "swap",
});

// H2 / section titles / labels — engraved, monumental, gothic.
const heading = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body & expressive headings — literary old-style serif.
const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sharon.ink"),
  title: {
    default: "SHARON — Horror Realism · Blackwork · Dark Art",
    template: "%s — SHARON",
  },
  description:
    "The black gallery of Sharon — horror realism, blackwork and dark-art tattooing. View the work and book a session.",
  openGraph: {
    title: "SHARON — Horror Realism · Blackwork · Dark Art",
    description:
      "The black gallery of Sharon — horror realism, blackwork and dark-art tattooing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${heading.variable} ${body.variable}`}
    >
      <body className="grain">
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
