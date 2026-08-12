import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal asset-download page, not indexable content — matches
      // the noindex robots meta already set in app/brand/page.tsx.
      disallow: "/brand",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
