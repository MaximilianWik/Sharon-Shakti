/** Fleur-de-lis — heraldic gothic lily. Bone/ash stroke + fill, transparent bg. */
export default function FleurDeLis({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {/* central petal */}
      <path d="M32 2 C26 16 26 28 32 40 C38 28 38 16 32 2 Z" />
      {/* side petals curling out */}
      <path d="M32 30 C20 20 8 24 10 38 C12 48 24 46 32 40 Z" />
      <path d="M32 30 C44 20 56 24 54 38 C52 48 40 46 32 40 Z" />
      {/* binding band */}
      <rect x="20" y="40" width="24" height="6" rx="1" />
      {/* lower flares */}
      <path d="M32 46 C28 58 20 64 24 74 C26 68 30 66 32 70 C34 66 38 68 40 74 C44 64 36 58 32 46 Z" />
    </svg>
  );
}
