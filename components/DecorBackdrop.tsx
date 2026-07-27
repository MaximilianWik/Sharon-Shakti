import Image from "next/image";

/**
 * Decorative full-bleed backdrop. Renders decoration.png faint and vignetted so
 * its edges dissolve into the ink gallery wall — a piece bleeding through the
 * black, never wallpaper. Purely decorative: aria-hidden, pointer-events-none.
 *
 * Sits at z-0 inside a relative parent; keep foreground content at z-10.
 */
export default function DecorBackdrop({
  className = "",
  opacity = 0.28,
  objectPosition = "center",
}: {
  className?: string;
  opacity?: number;
  objectPosition?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <Image
        src="/decoration.png"
        alt=""
        fill
        sizes="100vw"
        style={{ opacity, objectPosition }}
        className="object-cover"
      />
      {/* Dissolve edges into ink so the piece emerges from the dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,#0a0a0a_80%)]" />
    </div>
  );
}
