import { Mark } from "./mark";
import { Wordmark } from "./wordmark";

type LogoProps = {
  className?: string;
  /** `full` = mark beside wordmark (header/footer). `stacked` = mark above
   * wordmark, centered (title cards, /brand, print). */
  variant?: "full" | "stacked";
  monochrome?: boolean;
};

export function Logo({
  className = "",
  variant = "full",
  monochrome = false,
}: LogoProps) {
  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <Mark className="h-8 w-8" monochrome={monochrome} />
        <Wordmark monochrome={monochrome} />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-8" monochrome={monochrome} />
      <Wordmark monochrome={monochrome} />
    </span>
  );
}
