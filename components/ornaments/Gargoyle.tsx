/**
 * Gargoyle — a perched grotesque silhouette. Used as a faint focus watermark
 * behind gothic text fields. Stylised; meant to sit at low opacity.
 */
export default function Gargoyle({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {/* ledge */}
      <rect x="14" y="86" width="72" height="6" />
      {/* hunched body */}
      <path d="M42 86 C30 70 33 52 49 48 C41 58 45 74 54 80 C60 84 62 86 62 86 Z" />
      {/* head: brow, horns, snout (facing left) */}
      <path d="M49 48 C44 40 49 31 60 31 C57 26 62 23 64 28 C66 22 71 25 68 32 C77 34 78 45 71 51 C66 55 55 55 49 48 Z" />
      <path d="M45 44 L33 42 L46 49 Z" />
      {/* folded wing */}
      <path d="M62 50 C78 45 90 55 87 73 C82 64 73 60 65 64 C72 57 65 55 61 59 Z" />
    </svg>
  );
}
