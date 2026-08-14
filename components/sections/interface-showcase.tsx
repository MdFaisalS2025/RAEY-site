"use client";

import { useEffect, useRef, useState } from "react";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/layout/section-label";
import { Reveal } from "@/components/motion/reveal";
import { interfaceContent as c } from "@/content/interface";
import { prefersReducedMotion } from "@/lib/motion";

/** A short tick + mono label — the technical-annotation convention this
 * section uses instead of drawn leader lines: a footnote marker, not a
 * floating callout that would need measured DOM positions to connect. */
function Annotate({ children }: { children: string }) {
  return (
    <span className="mt-1.5 flex items-center gap-1.5 text-micro text-ink-3">
      <span className="h-px w-3 bg-rule" aria-hidden="true" />
      {children}
    </span>
  );
}

/**
 * What using RAEY actually looks like: a protocol library, a
 * question, an answer with inline citations, and the exact source
 * passage those citations point to. Real DOM, not a screenshot and
 * not a generic chat window: a reference tool, not a bot.
 *
 * Two interactions, both wired to the same `hoveredLine` state so they
 * work in either direction: hovering or focusing a citation highlights
 * the source line it points to, and hovering or focusing that source
 * line highlights the citation back. This is the product's entire
 * mechanic made physical — nothing else on the site demonstrates it
 * better, and it costs one piece of state.
 *
 * The library rail is fully functional: every item swaps the whole
 * panel to that document. There is no decorative library entry that
 * looks clickable and does nothing.
 */
export function InterfaceShowcase() {
  const [activeDoc, setActiveDoc] = useState(0);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const doc = c.documents[activeDoc];

  function selectDoc(i: number) {
    setActiveDoc(i);
    setHoveredLine(null);
  }

  // Once the panel scrolls into view, briefly demonstrate the
  // citation/source-line pairing unprompted — the same interaction a
  // hover triggers, just shown once so a visitor who never hovers
  // still sees the product's core mechanic in motion.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = panelRef.current;
    if (!el) return;
    const firstCitedLine = c.documents[0].answer.find((a) => a.sourceLine !== null)?.sourceLine;
    if (firstCitedLine == null) return;

    let onTimer: ReturnType<typeof setTimeout> | undefined;
    let offTimer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        onTimer = setTimeout(() => setHoveredLine(firstCitedLine), 500);
        offTimer = setTimeout(() => setHoveredLine(null), 1700);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(onTimer);
      clearTimeout(offTimer);
    };
  }, []);

  return (
    <Section id="interface" className="border-b border-rule">
      <Grid>
        <Reveal className="col-span-12 md:col-span-6">
          <SectionLabel index="03" label={c.label} />
          <h2 className="text-display-2 mt-4 text-ink">{c.heading}</h2>
        </Reveal>

        <Reveal
          variant="fade"
          delay={40}
          className="col-span-12 mt-4 self-end md:col-span-3 md:col-start-10 md:mt-0 md:text-right"
        >
          <p className="text-micro text-ink-3">
            {c.documents.length} approved protocols, each fully interactive
          </p>
        </Reveal>

        <Reveal delay={80} className="col-span-12 mt-10">
          <p className="sr-only">
            An interactive preview. Select a protocol from the library to see its
            question and answer; each citation names the source line it came from.
          </p>
          <div ref={panelRef} className="border border-rule bg-paper-raised">
            <div className="flex items-center justify-between border-b border-rule px-5 py-3">
              <p className="text-meta text-ink-3">{doc.source.name}</p>
              <p className="text-micro text-ink-3">{c.previewNote}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* library rail */}
              <div className="border-b border-rule p-5 md:col-span-3 md:border-b-0 md:border-r">
                <p className="text-meta text-ink-3">{c.libraryHeading}</p>
                <ul className="mt-4 space-y-1">
                  {c.documents.map((item, i) => {
                    const active = i === activeDoc;
                    return (
                      <li key={item.libraryLabel}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => selectDoc(i)}
                          className={`w-full border-l-2 py-1 pl-3 text-left text-small transition-colors focus-visible:outline-none ${
                            active
                              ? "border-trace font-medium text-ink"
                              : "border-transparent text-ink-3 hover:border-rule hover:text-ink"
                          }`}
                        >
                          {item.libraryLabel}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* question + answer */}
              <div
                aria-live="polite"
                className="border-b border-rule p-5 md:col-span-5 md:border-b-0 md:border-r"
              >
                <p className="text-meta text-ink-3">Question</p>
                <p className="text-body-lg mt-2 text-ink">{doc.question}</p>

                <div className="mt-6 border-t border-rule pt-6">
                  <p className="text-meta text-ink-3">Answer</p>
                  <div className="mt-3 space-y-4">
                    {doc.answer.map((sentence, i) => (
                      <div key={i}>
                        {sentence.state === "flagged" ? (
                          <p className="text-body text-ink">
                            {sentence.text}{" "}
                            <span className="text-[color:var(--color-unverified)]">
                              [{sentence.redacted}]
                            </span>
                          </p>
                        ) : (
                          <p className="text-body text-ink">
                            {sentence.text}
                            <button
                              type="button"
                              onMouseEnter={() => setHoveredLine(sentence.sourceLine)}
                              onMouseLeave={() => setHoveredLine(null)}
                              onFocus={() => setHoveredLine(sentence.sourceLine)}
                              onBlur={() => setHoveredLine(null)}
                              aria-label={`Show source line for citation ${sentence.citation}`}
                              className={`ml-0.5 rounded-sm px-0.5 text-micro font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-trace focus-visible:outline-offset-1 ${
                                hoveredLine === sentence.sourceLine
                                  ? "bg-trace text-paper"
                                  : "text-trace hover:bg-trace/15"
                              }`}
                            >
                              {sentence.citation}
                            </button>
                          </p>
                        )}
                        {i === 0 && <Annotate>{c.annotations.citation}</Annotate>}
                        {sentence.state === "flagged" && (
                          <Annotate>{c.annotations.flagged}</Annotate>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* source */}
              <div className="p-5 md:col-span-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-meta text-ink-3">Source</p>
                  <p className="text-micro text-ink-3">{doc.source.version}</p>
                </div>
                <p className="text-small mt-2 text-ink">{doc.source.name}</p>
                <Annotate>{c.annotations.version}</Annotate>
                <Annotate>{c.annotations.approved}</Annotate>

                <div className="mt-5 space-y-2 border-t border-rule pt-5 font-mono">
                  {doc.source.lines.map((line, i) => {
                    const cited = doc.answer.some((a) => a.sourceLine === i);
                    const active = hoveredLine === i;
                    const toneClassName = active
                      ? "bg-trace text-paper"
                      : cited
                        ? "bg-[color:var(--color-trace-dim)] text-ink"
                        : "text-ink-3";

                    if (!cited) {
                      return (
                        <p
                          key={i}
                          className={`block w-full text-micro leading-relaxed ${toneClassName}`}
                        >
                          {line}
                        </p>
                      );
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setHoveredLine(i)}
                        onMouseLeave={() => setHoveredLine(null)}
                        onFocus={() => setHoveredLine(i)}
                        onBlur={() => setHoveredLine(null)}
                        className={`block w-full rounded-sm text-left text-micro leading-relaxed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-trace focus-visible:outline-offset-1 ${toneClassName}`}
                      >
                        {line}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Grid>
    </Section>
  );
}
