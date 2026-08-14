import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AmbientField } from "@/components/ambient/ambient-field";
import { siteConfig } from "@/content/site";
import "./globals.css";

// Self-hosted via next/font — downloaded at build time, served from our own
// origin, zero runtime request to Google and zero licensing cost. Geist
// carries UI and body text; Source Serif 4 is the upright editorial serif
// for large statements — restrained and text-book, not the swooping
// italic register a consumer AI-startup site would reach for.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
});

// TODO(client:domain) — set NEXT_PUBLIC_SITE_URL once the real domain is
// live; until then this resolves OG/canonical URLs against localhost in dev,
// which is harmless there. In a production build it's a real problem — every
// OG image and canonical URL would silently point at localhost — so that
// case warns loudly in the build log instead of failing silently.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "[raey] NEXT_PUBLIC_SITE_URL is not set. This production build's " +
      "OG images, Twitter cards, and canonical URLs will resolve against " +
      "http://localhost:3000. Set NEXT_PUBLIC_SITE_URL before this deploy goes live."
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2f0eb",
};

// Organization + WebSite only, deliberately — no SoftwareApplication
// schema, which would imply a shipped, priced, installable product.
// This is a pre-launch site; the structured data should claim exactly
// as much as the page copy does.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteUrl,
      description: siteConfig.tagline,
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteUrl,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AmbientField />
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-trace focus-visible:px-4 focus-visible:py-2 focus-visible:text-paper focus-visible:text-small focus-visible:font-medium"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 scroll-mt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
