/**
 * Procedural distressed-grunge overlay (vector, via SVG turbulence filters).
 * Stands in for a stock grunge-texture pack — fully self-contained and
 * monochrome. To use real artwork later, set `src` to a PNG/SVG in /public.
 *
 * Each instance needs a unique `id` (filter IDs must not collide).
 */
type Variant = "streak" | "blotch" | "speckle";

const VARIANTS: Record<
  Variant,
  { type: "fractalNoise" | "turbulence"; baseFrequency: string; octaves: number; matrix: string }
> = {
  streak: {
    type: "fractalNoise",
    baseFrequency: "0.012 0.4",
    octaves: 4,
    matrix: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.5 0.96",
  },
  blotch: {
    type: "fractalNoise",
    baseFrequency: "0.03 0.05",
    octaves: 3,
    matrix: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.2 0.72",
  },
  speckle: {
    type: "turbulence",
    baseFrequency: "0.9",
    octaves: 2,
    matrix: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.4 1.3",
  },
};

export default function Grunge({
  id,
  variant = "streak",
  className = "",
  color = "#d2d2d2",
  opacity = 0.12,
  blend = "screen",
  seed = 7,
}: {
  id: string;
  variant?: Variant;
  className?: string;
  color?: string;
  opacity?: number;
  blend?: React.CSSProperties["mixBlendMode"];
  seed?: number;
}) {
  const v = VARIANTS[variant];
  const fid = `grunge-${id}`;

  return (
    <svg
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ mixBlendMode: blend, opacity }}
    >
      <filter id={fid} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type={v.type}
          baseFrequency={v.baseFrequency}
          numOctaves={v.octaves}
          seed={seed}
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix in="noise" type="matrix" values={v.matrix} result="alpha" />
        <feFlood floodColor={color} result="col" />
        <feComposite in="col" in2="alpha" operator="in" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${fid})`} />
    </svg>
  );
}
