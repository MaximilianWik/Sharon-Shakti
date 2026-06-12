/**
 * Cathedral facade silhouette — twin towers, central gable, rose, pinnacles.
 * Used as a crowning top border (e.g. footer). Fills with currentColor.
 * Stretches to width via preserveAspectRatio="none".
 */
export default function CathedralFacade({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {/* base wall */}
      <rect x="0" y="78" width="1200" height="12" />
      {/* left tower + spire */}
      <path d="M150 90 L150 40 L175 40 L175 30 L210 30 L210 40 L235 40 L235 90 Z" />
      <path d="M168 30 L192.5 4 L217 30 Z" />
      {/* right tower + spire (mirror) */}
      <path d="M965 90 L965 40 L990 40 L990 30 L1025 30 L1025 40 L1050 40 L1050 90 Z" />
      <path d="M983 30 L1007.5 4 L1032 30 Z" />
      {/* central gable with rose opening */}
      <path d="M455 90 L455 46 L600 14 L745 46 L745 90 Z" />
      {/* small pinnacles across the wall */}
      <path d="M330 78 L340 60 L350 78 Z" />
      <path d="M850 78 L860 60 L870 78 Z" />
      <path d="M600 90 L600 64" stroke="none" />
    </svg>
  );
}
