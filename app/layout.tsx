import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="grain">
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
