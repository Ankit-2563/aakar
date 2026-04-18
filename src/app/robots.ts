import { MetadataRoute } from "next";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/seo";

// ─── Robots ────────────────────────────────────────────────────
// Allows all crawlers (including AI bots like GPTBot, ClaudeBot,
// PerplexityBot, and Googlebot-Image) to index public content,
// while blocking private or non-public routes.
// ──────────────────────────────────────────────────────────────

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all reputable bots
      {
        userAgent: "*",
        allow: ["/", "/projects", "/projects/"],
        disallow: ["/api/", "/private/", "/_next/", "/admin/"],
      },
      // Explicitly welcome AI crawlers (GEO signal)
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    host: NEXT_PUBLIC_SITE_URL,
  };
}
