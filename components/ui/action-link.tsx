import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "button" | "text";

/**
 * Replaces the old glow-filled pill CTA. Two variants, neither one a
 * gradient: `button` is a bordered ghost button (hairline border,
 * fills solid on hover) for header/nav/form actions; `text` is an
 * inline action with an underline rule, for the hero and other
 * editorial contexts where a boxed button would be too loud.
 *
 * Paper-toned only — every current caller sits on a paper background.
 * If a slate-background caller shows up, reintroduce a tone prop then
 * rather than carrying an unused branch for it now (see
 * components/sections/demo-form.tsx's SubmitButton for how the slate
 * equivalent looks).
 */
export function ActionLink({
  href,
  children,
  variant = "button",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  if (variant === "text") {
    return (
      <Link
        href={href}
        className={`text-body inline-flex items-center gap-1.5 border-b border-current pb-0.5 font-medium text-ink transition-opacity hover:opacity-70 ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`text-small inline-flex items-center justify-center border border-ink px-5 py-2.5 font-medium text-ink transition-colors hover:bg-ink hover:text-paper ${className}`}
    >
      {children}
    </Link>
  );
}
