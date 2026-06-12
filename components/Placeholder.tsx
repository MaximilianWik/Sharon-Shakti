"use client";

/**
 * Deterministic grayscale "plate" placeholder. Stands in for a real tattoo
 * photograph until imagery is supplied. Each seed yields a distinct moody
 * composition: a spotlit subject mass, fractal grain, and a vignette — so the
 * gallery reads as hung work, not empty boxes. Swap for <Image> + real photos.
 */
export default function Placeholder({
  seed = 0,
  label,
  className = "",
}: {
  seed?: number;
  label?: string;
  className?: string;
}) {
  // Pseudo-random but stable per seed.
  const r = (n: number) => {
    const x = Math.sin(seed * 999 + n * 37.13) * 43758.5453;
    return x - Math.floor(x);
  };

  const cx = 28 + r(1) * 44; // 28–72%
  const cy = 24 + r(2) * 40; // 24–64%
  const baseFreq = (0.6 + r(3) * 0.5).toFixed(3);
  const rot = (r(4) * 20 - 10).toFixed(2);
  const glow = (0.18 + r(5) * 0.22).toFixed(3);
  const id = `pl${seed}`;

  return (
    <svg
      role="img"
      aria-label={label ? `${label} — placeholder` : "Artwork placeholder"}
      viewBox="0 0 600 750"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
    >
      <defs>
        <radialGradient id={`${id}g`} cx={`${cx}%`} cy={`${cy}%`} r="65%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="45%" stopColor="#161616" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <filter id={`${id}n`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFreq}
            numOctaves={2}
            seed={seed * 7 + 3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.10" />
          </feComponentTransfer>
        </filter>
        <radialGradient id={`${id}v`} cx="50%" cy="50%" r="75%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      <rect width="600" height="750" fill={`url(#${id}g)`} />

      {/* Suggested subject mass — an abstract spotlit form */}
      <g
        transform={`rotate(${rot} ${cx * 6} ${cy * 7.5})`}
        opacity={glow}
        fill="#e8e8e8"
      >
        <ellipse cx={cx * 6} cy={cy * 7.5} rx="150" ry="210" />
        <ellipse cx={cx * 6 + 40} cy={cy * 7.5 + 60} rx="90" ry="130" fill="#bdbdbd" />
      </g>

      <rect width="600" height="750" filter={`url(#${id}n)`} fill="#fff" />
      <rect width="600" height="750" fill={`url(#${id}v)`} />
    </svg>
  );
}
