import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Mark } from "@/components/brand/mark";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Brand assets",
  robots: { index: false, follow: false },
  alternates: { canonical: "/brand" },
};

const PALETTE = [
  { name: "paper", hex: "#F2F0EB", note: "Page base. The default surface." },
  { name: "paper-raised", hex: "#FEFDFA", note: "Cards, inputs, raised surfaces on paper." },
  { name: "rule", hex: "#DAD6CE", note: "Hairlines on paper." },
  { name: "ink", hex: "#16181C", note: "Primary text on paper." },
  { name: "ink-2", hex: "#5A5E66", note: "Secondary text on paper." },
  { name: "ink-3", hex: "#64686F", note: "Metadata on paper." },
  { name: "slate", hex: "#101216", note: "The two dark full-bleed bands: the provenance trace, the closing CTA." },
  { name: "slate-rule", hex: "#2A2E36", note: "Hairlines on slate." },
  { name: "slate-ink", hex: "#EDEDEA", note: "Primary text on slate." },
  { name: "slate-ink-2", hex: "#9AA0AA", note: "Secondary text on slate." },
  { name: "trace", hex: "#4B3BD8", note: "The accent, on paper. Citations, provenance, interaction: a pen mark, never a glow." },
  { name: "trace-light", hex: "#9B8EFF", note: "Trace, lightened for text and UI on the slate bands." },
  { name: "verified", hex: "#1F7A5C", note: "Reserved exclusively for a confirmed, cited value." },
  { name: "unverified", hex: "#8F5F0A", note: "Reserved exclusively for a flagged, unconfirmed value." },
  { name: "critical", hex: "#B3261E", note: "Genuine warnings only, on paper." },
  { name: "critical-light", hex: "#E2726B", note: "Critical, lightened for text on slate." },
] as const;

const DOWNLOADS = [
  { file: "mark.svg", label: "Mark · Two-tone" },
  { file: "mark-monochrome.svg", label: "Mark · Monochrome" },
  { file: "logo-full.svg", label: "Logo, full lockup · Two-tone" },
  { file: "logo-full-monochrome.svg", label: "Logo, full lockup · Monochrome" },
  { file: "logo-stacked.svg", label: "Logo, stacked · Two-tone" },
  { file: "logo-stacked-monochrome.svg", label: "Logo, stacked · Monochrome" },
];

export default function BrandPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-meta text-trace">Brand assets, not indexed</p>
        <h1 className="text-display-2 mt-3 text-ink">The mark, and how to use it</h1>
        <p className="text-body-lg mt-4 max-w-[60ch] text-ink-2">
          Three source documents converging on one verified answer. Several
          approved protocols, one answer you can trust. It&rsquo;s a
          drawing of the product&rsquo;s core mechanic, not a cross, a
          caduceus, a heartbeat, or a human figure.
        </p>

        <div className="mt-16 flex flex-wrap items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-28 w-28 items-center justify-center border border-rule bg-paper-raised">
              <Mark className="h-12 w-12" />
            </div>
            <p className="text-micro text-ink-3">Mark · two-tone, on paper</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-28 w-28 items-center justify-center border border-slate-rule bg-slate text-slate-ink">
              <Mark className="h-12 w-12" monochrome />
            </div>
            <p className="text-micro text-ink-3">Mark · monochrome, on slate</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-28 w-56 items-center justify-center border border-rule bg-paper-raised">
              <Logo variant="full" />
            </div>
            <p className="text-micro text-ink-3">Full lockup</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-28 w-40 items-center justify-center border border-rule bg-paper-raised">
              <Logo variant="stacked" />
            </div>
            <p className="text-micro text-ink-3">Stacked lockup</p>
          </div>
        </div>

        <h2 className="text-display-3 mt-16 text-ink">Palette</h2>
        <p className="text-small mt-2 max-w-[60ch] text-ink-2">
          Paper and ink, with two dark full-bleed bands for contrast. The
          usage rule carries the identity more than the hexes do:{" "}
          <code>verified</code>, <code>unverified</code>, and{" "}
          <code>critical</code> appear only on an actual verification
          state, never as decoration.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {PALETTE.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div
                className="h-16 border border-rule"
                style={{ background: c.hex }}
              />
              <div>
                <p className="text-meta text-ink">
                  {c.name} <span className="text-ink-3">{c.hex}</span>
                </p>
                <p className="text-micro mt-1 text-ink-3">{c.note}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-display-3 mt-16 text-ink">Type</h2>
        <dl className="text-small mt-4 space-y-2 text-ink-2">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-3">Display</dt>
            <dd className="text-display-3 !font-normal font-serif text-ink">Newsreader</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-3">Body / UI</dt>
            <dd className="text-display-3 !font-normal text-ink">Geist</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 text-ink-3">Utility</dt>
            <dd className="text-meta normal-case tracking-normal text-ink">
              Geist Mono
            </dd>
          </div>
        </dl>

        <h2 className="text-display-3 mt-16 text-ink">Downloads</h2>
        <p className="text-small mt-2 max-w-[60ch] text-ink-2">Vector, no license fee.</p>
        <ul className="text-small mt-4 space-y-1">
          {DOWNLOADS.map((d) => (
            <li key={d.file}>
              <a
                href={`/brand/${d.file}`}
                download
                className="text-trace underline underline-offset-2 hover:opacity-70"
              >
                {d.label}
              </a>
            </li>
          ))}
        </ul>

        <h2 className="text-display-3 mt-16 text-ink">Exclusions</h2>
        <p className="text-small mt-2 max-w-[60ch] text-ink-2">
          No gradient on the mark itself. No medical cross, caduceus,
          heartbeat, or human figure. No third colourway. Two-tone or
          monochrome only.
        </p>
      </Container>
    </Section>
  );
}
