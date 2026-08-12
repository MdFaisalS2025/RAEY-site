"use client";

import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/content/site";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Disclosure nav for <640px, where the header's `sm:flex` nav links are
 * hidden entirely. Without this, three of the site's nav targets are
 * unreachable on a phone except by scrolling.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;

    // Move focus into the panel on open, back to the trigger on close —
    // without this a keyboard user opening the menu stays focused on a
    // button that's still there but no longer does what it visually
    // announces, and closing it strands focus on an unmounted element.
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      // Trapping the tab order inside the panel — otherwise Tab walks
      // straight past it into header/page content that's still in the
      // DOM behind the open menu, even though it's visually covered.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 items-center justify-center rounded-sm text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6H17M3 10H17M3 14H17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          className="fixed inset-x-0 top-16 z-30 flex flex-col gap-1 border-t border-rule bg-paper p-4"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-body rounded-sm px-2 py-3 text-ink transition-colors hover:bg-paper-raised"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.cta.href}
            onClick={() => setOpen(false)}
            className="text-body mt-1 border border-ink px-2 py-3 text-center font-medium text-ink"
          >
            {siteConfig.cta.label}
          </a>
        </div>
      )}
    </div>
  );
}
