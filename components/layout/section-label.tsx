/**
 * A mono section number/label in the spec-sheet register — "01 /
 * Problem" set in Geist Mono, uppercase, tracked out. Positioning
 * (which grid column it sits in) is the caller's job via className;
 * this component only owns the typography.
 */
export function SectionLabel({
  index,
  label,
  variant = "paper",
  className = "",
}: {
  index: string;
  label: string;
  variant?: "paper" | "slate";
  className?: string;
}) {
  const color = variant === "slate" ? "text-slate-ink-2" : "text-ink-3";
  return (
    <p className={`text-meta ${color} ${className}`}>
      {index} <span className="opacity-50">/</span> {label}
    </p>
  );
}
