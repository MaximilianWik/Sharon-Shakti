/** Gothic rose window — concentric rings, radiating mullions, and foils. */
export default function RoseWindow({
  className = "",
  spokes = 12,
}: {
  className?: string;
  spokes?: number;
}) {
  const c = 100;
  const rInner = 34;
  const rOuter = 78;
  const rFoil = 56;

  const mullions = Array.from({ length: spokes }, (_, i) => {
    const a = (i / spokes) * Math.PI * 2;
    return {
      x1: c + rInner * Math.cos(a),
      y1: c + rInner * Math.sin(a),
      x2: c + rOuter * Math.cos(a),
      y2: c + rOuter * Math.sin(a),
    };
  });

  const foils = Array.from({ length: spokes }, (_, i) => {
    const a = ((i + 0.5) / spokes) * Math.PI * 2;
    return { cx: c + rFoil * Math.cos(a), cy: c + rFoil * Math.sin(a) };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      <circle cx={c} cy={c} r="96" />
      <circle cx={c} cy={c} r={rOuter} />
      <circle cx={c} cy={c} r={rInner} />
      {mullions.map((m, i) => (
        <line key={`m${i}`} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} />
      ))}
      {foils.map((f, i) => (
        <circle key={`f${i}`} cx={f.cx} cy={f.cy} r="9" />
      ))}
      <circle cx={c} cy={c} r="12" />
      <circle cx={c} cy={c} r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
