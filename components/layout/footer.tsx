import Link from "next/link";
import { Mark } from "@/components/brand/mark";
import { siteConfig, isPlaceholder } from "@/content/site";

export function Footer() {
  const hasEmail = !isPlaceholder(siteConfig.contactEmail);
  const hasLinkedIn = !isPlaceholder(siteConfig.linkedIn);

  return (
    <footer className="mt-auto border-t border-rule bg-paper">
      <div className="mx-auto flex w-full max-w-[var(--grid-max)] flex-col gap-4 px-[var(--grid-gutter)] py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-ink-3">
          <Mark className="h-4 w-4" monochrome />
          <p className="text-meta">{siteConfig.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-ink-3">
          {hasEmail ? (
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="transition-colors hover:text-ink"
            >
              {siteConfig.contactEmail}
            </a>
          ) : hasLinkedIn ? (
            <a href={siteConfig.linkedIn} className="transition-colors hover:text-ink">
              Reach us on LinkedIn
            </a>
          ) : (
            <span>Contact details coming soon</span>
          )}
          <Link href="/product" className="transition-colors hover:text-ink">
            Product
          </Link>
          <Link href="/research" className="transition-colors hover:text-ink">
            Research
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-ink">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
