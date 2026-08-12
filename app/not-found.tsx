import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ActionLink } from "@/components/ui/action-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Replaces Next's default unstyled 404 with something that reads as
 * the rest of the site instead of a framework fallback.
 */
export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <p className="text-meta text-trace">404</p>
        <h1 className="text-display-2 mt-3 text-ink">This page doesn&rsquo;t exist.</h1>
        <p className="text-body-lg mt-4 max-w-[46ch] text-ink-2">
          The link may be old, or the address was mistyped. The rest of the site is
          still where it should be.
        </p>
        <div className="mt-9">
          <ActionLink href="/">Back to home</ActionLink>
        </div>
      </Container>
    </Section>
  );
}
