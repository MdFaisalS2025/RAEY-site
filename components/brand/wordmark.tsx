type WordmarkProps = {
  className?: string;
  monochrome?: boolean;
};

/** The logotype half of the lockup — pairs with `Mark` via `Logo`. */
export function Wordmark({ className = "", monochrome = false }: WordmarkProps) {
  return (
    <span
      className={`text-wordmark ${monochrome ? "text-current" : "text-ink"} ${className}`}
    >
      RAEY
    </span>
  );
}
