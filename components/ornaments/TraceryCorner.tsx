/**
 * Gothic tracery corner — wrought-iron filigree, bone/ash stroke, transparent.
 * Size via className (w-/h-). `corner` rotates it to the right corner.
 */
const ROT: Record<string, string> = {
  tl: "rotate(0)",
  tr: "rotate(90)",
  br: "rotate(180)",
  bl: "rotate(270)",
};

export default function TraceryCorner({
  corner = "tl",
  className = "",
  strokeWidth = 2,
}: {
  corner?: "tl" | "tr" | "bl" | "br";
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g transform={ROT[corner]} style={{ transformOrigin: "40px 40px" }}>
        {/* corner bracket */}
        <path d="M5 66 L5 5 L66 5" opacity="0.4" />
        {/* sweeping ribs */}
        <path d="M5 66 Q5 5 66 5" />
        <path d="M5 42 Q5 5 42 5" />
        {/* trefoil at the corner */}
        <circle cx="17" cy="17" r="6" />
        <circle cx="31" cy="11" r="3.6" />
        <circle cx="11" cy="31" r="3.6" />
        {/* foil tips */}
        <circle cx="5" cy="66" r="3" />
        <circle cx="66" cy="5" r="3" />
        <circle cx="5" cy="5" r="1.8" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
