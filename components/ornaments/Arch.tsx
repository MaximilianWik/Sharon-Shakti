import type { ReactNode } from "react";

/**
 * Pointed-arch (gothic) frame. Masks its children into a cathedral-window
 * silhouette and overlays a hairline outline (inherits `currentColor`).
 */
export default function Arch({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const d = "M0,130 L0,55 Q0,3 50,3 Q100,3 100,55 L100,130 Z";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 130' preserveAspectRatio='none'><path d='${d}' fill='black'/></svg>`;
  const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  return (
    <div className={`relative ${className}`}>
      <div
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
      <svg
        viewBox="0 0 100 130"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        aria-hidden
      >
        <path d={d} />
      </svg>
    </div>
  );
}
