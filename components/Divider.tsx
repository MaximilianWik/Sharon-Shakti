import Quatrefoil from "@/components/ornaments/Quatrefoil";

/** Ornamental gothic divider — hairlines flanking a quatrefoil rosette. */
export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-6 ${className}`}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-ash-dim md:w-28" />
      <Quatrefoil className="h-5 w-5 shrink-0 text-oxblood-bright" strokeWidth={5} />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-ash-dim md:w-28" />
    </div>
  );
}
