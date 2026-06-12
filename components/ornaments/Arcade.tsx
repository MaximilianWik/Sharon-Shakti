/** Blind arcade — a row of pointed (gothic) arches. Stretches to its container. */
export default function Arcade({
  bays = 9,
  className = "",
}: {
  bays?: number;
  className?: string;
}) {
  const W = 100;
  const H = 20;
  const aw = W / bays;
  const base = H - 1; // baseline
  const spring = 9; // where the arch starts to curve
  const apex = 1.5;

  let d = "";
  for (let i = 0; i < bays; i++) {
    const x0 = i * aw;
    const x1 = (i + 1) * aw;
    const mid = (x0 + x1) / 2;
    d +=
      `M${x0.toFixed(2)},${base} L${x0.toFixed(2)},${spring} ` +
      `Q${x0.toFixed(2)},${apex} ${mid.toFixed(2)},${apex} ` +
      `Q${x1.toFixed(2)},${apex} ${x1.toFixed(2)},${spring} ` +
      `L${x1.toFixed(2)},${base} `;
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
