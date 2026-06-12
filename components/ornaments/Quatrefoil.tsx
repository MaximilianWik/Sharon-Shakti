/** Gothic quatrefoil — four overlapping foils forming a tracery rosette. */
export default function Quatrefoil({
  className = "",
  strokeWidth = 4,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <circle cx="50" cy="30" r="20" />
      <circle cx="50" cy="70" r="20" />
      <circle cx="30" cy="50" r="20" />
      <circle cx="70" cy="50" r="20" />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
