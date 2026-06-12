/** Portcullis gate icon — replaces the mobile hamburger. */
export default function Portcullis({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M3 9 Q3 3 12 3 Q21 3 21 9" />
      <path d="M7 9 V20 M12 6 V21.5 M17 9 V20" />
      <path d="M4 12 H20 M4 16 H20" />
      <path d="M7 20 V22 M12 21.5 V23.5 M17 20 V22" />
    </svg>
  );
}
