/**
 * Ribbed column divider — capital + fluted shaft + base. Vertical separator
 * for split / sidebar layouts. Height flexes to its container; set via className.
 */
export default function RibbedColumn({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex w-6 flex-col items-center text-ash ${className}`}
    >
      {/* Capital */}
      <svg viewBox="0 0 24 18" className="h-4 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M2 17 L2 11 Q2 4 6 4 Q3 9 8 9 M22 17 L22 11 Q22 4 18 4 Q21 9 16 9" />
        <rect x="4" y="1" width="16" height="3" />
      </svg>
      {/* Fluted shaft */}
      <div
        className="w-3 flex-1 border-x border-ash-dim/60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 2px, rgba(125,125,125,0.35) 2px 3px, transparent 3px 5px)",
        }}
      />
      {/* Base */}
      <svg viewBox="0 0 24 16" className="h-3.5 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="3" y="2" width="18" height="3" />
        <rect x="1" y="9" width="22" height="5" />
      </svg>
    </div>
  );
}
