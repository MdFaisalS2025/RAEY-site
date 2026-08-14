"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ActionLink } from "@/components/ui/action-link";

/**
 * Next's error boundary contract requires a client component here —
 * error.tsx can't export metadata or run on the server. Replaces the
 * framework's default crash screen with something that reads as the
 * rest of the site and gives a visitor two real ways forward.
 */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No analytics/error-reporting wired up on this site yet (see the
    // technical audit) — logging to the console is honest about that
    // rather than pretending an error-tracking call happened.
    console.error("[raey] unhandled error boundary triggered");
  }, []);

  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="text-meta text-critical">Error</p>
        <h1 className="text-display-2 mt-3 text-ink">Something went wrong.</h1>
        <p className="text-body-lg mt-4 max-w-[46ch] text-ink-2">
          That&rsquo;s on us, not you. Try again, or head back to the homepage.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={reset}
            className="text-small inline-flex items-center justify-center border border-ink px-5 py-2.5 font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Try again
          </button>
          <ActionLink href="/" variant="text">
            Back to home
          </ActionLink>
        </div>
      </Container>
    </Section>
  );
}
