/**
 * A full-bleed hairline — the Swiss-editorial baseline that lets
 * asymmetric composition read as intentional rather than accidental.
 * Deliberately a plain full-width element, not nested inside Grid's
 * padded track, so it always runs edge to edge regardless of what
 * contains it.
 */
export function Rule({
  variant = "paper",
  className = "",
}: {
  variant?: "paper" | "slate";
  className?: string;
}) {
  const border = variant === "slate" ? "border-slate-rule" : "border-rule";
  return <div className={`w-full border-t ${border} ${className}`} />;
}
