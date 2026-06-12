import Quatrefoil from "@/components/ornaments/Quatrefoil";
import RoseWindow from "@/components/ornaments/RoseWindow";
import FleurDeLis from "@/components/ornaments/FleurDeLis";
import DiamondChain from "@/components/ornaments/DiamondChain";

type Variant = "quatrefoil" | "rose" | "fleur" | "diamond";

const rule = "h-px w-16 md:w-28";

/** Ornamental gothic divider. Variants: quatrefoil · rose · fleur · diamond. */
export default function Divider({
  className = "",
  variant = "quatrefoil",
}: {
  className?: string;
  variant?: Variant;
}) {
  if (variant === "diamond") {
    return (
      <div aria-hidden className={`flex items-center gap-4 ${className}`}>
        <Quatrefoil className="h-3.5 w-3.5 shrink-0 text-oxblood-bright" strokeWidth={5} />
        <DiamondChain className="flex-1" color="#7d7d7d" />
        <Quatrefoil className="h-3.5 w-3.5 shrink-0 text-oxblood-bright" strokeWidth={5} />
      </div>
    );
  }

  if (variant === "fleur") {
    return (
      <div aria-hidden className={`flex items-center justify-center gap-6 ${className}`}>
        <span className={`${rule} bg-gradient-to-r from-transparent to-ash-dim`} />
        <FleurDeLis className="h-7 w-6 shrink-0 -scale-x-100 text-ash" />
        <span className="h-1.5 w-1.5 rotate-45 bg-oxblood-bright" />
        <FleurDeLis className="h-7 w-6 shrink-0 text-ash" />
        <span className={`${rule} bg-gradient-to-l from-transparent to-ash-dim`} />
      </div>
    );
  }

  if (variant === "rose") {
    return (
      <div aria-hidden className={`flex items-center justify-center gap-6 ${className}`}>
        <span className={`${rule} bg-gradient-to-r from-transparent to-ash-dim`} />
        <RoseWindow className="h-10 w-10 shrink-0 text-ash" spokes={10} />
        <span className={`${rule} bg-gradient-to-l from-transparent to-ash-dim`} />
      </div>
    );
  }

  // quatrefoil (default)
  return (
    <div aria-hidden className={`flex items-center justify-center gap-6 ${className}`}>
      <span className={`${rule} bg-gradient-to-r from-transparent to-ash-dim`} />
      <Quatrefoil className="h-5 w-5 shrink-0 text-oxblood-bright" strokeWidth={5} />
      <span className={`${rule} bg-gradient-to-l from-transparent to-ash-dim`} />
    </div>
  );
}
