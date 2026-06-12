/** Ornamental gothic divider — a hairline pair flanking an oxblood lozenge. */
export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-5 ${className}`}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-ash-dim md:w-28" />
      <span className="relative flex h-3 w-3 rotate-45 items-center justify-center border border-oxblood-bright">
        <span className="h-1 w-1 bg-oxblood-bright" />
      </span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-ash-dim md:w-28" />
    </div>
  );
}
