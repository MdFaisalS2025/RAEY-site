import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { ProvenanceTrace } from "@/components/trace/provenance-trace";
import { InterfaceShowcase } from "@/components/sections/interface-showcase";
import { Comparison } from "@/components/sections/comparison";
import { UseCases } from "@/components/sections/use-cases";
import { Transparency } from "@/components/sections/transparency";
import { Demo } from "@/components/sections/demo";

// Eight sections, one narrative: hero states the idea, problem shows
// what's actually wrong, the provenance trace shows how the product
// solves it, the interface shows what using it looks like, comparison
// and use cases ground it, transparency is the honesty record, and the
// closing CTA is the ask. Two full-bleed dark bands (the trace, the
// CTA) carry the contrast against an otherwise paper-toned page.
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ProvenanceTrace />
      <InterfaceShowcase />
      <Comparison />
      <UseCases />
      <Transparency />
      <Demo />
    </>
  );
}
