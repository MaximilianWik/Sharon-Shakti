/** Pointed-diamond chain — repeating separator row. Stroke colour via `color`. */
export default function DiamondChain({
  className = "",
  color = "#7d7d7d",
}: {
  className?: string;
  color?: string;
}) {
  const c = encodeURIComponent(color);
  const tile = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='14' viewBox='0 0 28 14'%3E%3Cpath d='M0 7H28' stroke='${c}' stroke-width='0.75' opacity='0.5'/%3E%3Cpath d='M14 2 L19 7 L14 12 L9 7 Z' fill='none' stroke='${c}' stroke-width='1'/%3E%3C/svg%3E`;
  return (
    <div
      aria-hidden
      className={`h-3.5 w-full ${className}`}
      style={{
        backgroundImage: `url("${tile}")`,
        backgroundSize: "28px 14px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
      }}
    />
  );
}
