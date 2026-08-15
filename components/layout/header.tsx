"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { Logo } from "@/components/brand/logo";
import { ActionLink } from "@/components/ui/action-link";
import { siteConfig } from "@/content/site";

// Past this many px of scroll the header reads as "scrolled": border
// appears and the bar compacts slightly.
const SCROLL_THRESHOLD = 8;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which nav section is currently under the vertical center of the
  // viewport — the header previously never told a visitor where they
  // were. rootMargin shrinks the observed viewport to a thin band
  // around its center, so "active" tracks whichever section's heading
  // has actually scrolled past that point, not just whichever is
  // technically on screen.
  useEffect(() => {
    // Only in-page anchors (hash hrefs) participate in scroll-spy — a
    // full route like /product isn't a CSS selector and has no section
    // to observe; its active state is derived from pathname instead.
    const targets = siteConfig.nav
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-rule bg-paper/90" : "border-transparent bg-paper/60"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[var(--grid-max)] items-center justify-between px-[var(--grid-gutter)] transition-[height] duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link href="/" className="flex items-center rounded-sm" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-8">
          <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
            {siteConfig.nav.map((item) => {
              const isHash = item.href.startsWith("#");
              const active = isHash ? item.href === activeHref : pathname === item.href;
              const linkClassName = `text-meta transition-colors ${
                active ? "text-ink" : "text-ink-3 hover:text-ink"
              }`;
              if (isHash) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    className={linkClassName}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  className={linkClassName}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ActionLink
            href={siteConfig.cta.href}
            className="hidden !px-4 !py-2 text-[13px] sm:inline-flex"
          >
            {siteConfig.cta.label}
          </ActionLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
