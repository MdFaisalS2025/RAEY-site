import type { ReactNode } from "react";

/**
 * Horizontal measure control, kept only for the three prose pages
 * (/research, /privacy, /brand) where a centered reading column is
 * correct. Every landing-page section uses Grid instead — see its doc
 * comment for why a 12-column full-bleed grid replaced this as the
 * default.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
