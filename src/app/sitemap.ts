import { MetadataRoute } from "next";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/seo";

// ─── Sitemap ───────────────────────────────────────────────────
// Priorities and change frequencies are signals, not guarantees.
// Use accurate values — Google ignores inflated priorities.
//
// Scale:
//   1.0  →  Home (most important)
//   0.9  →  Key conversion pages (Projects, Contact)
//   0.8  →  Category pages
//   0.7  →  Individual project pages (dynamic)
//   0.5  →  Supporting pages (About in-page anchor)
// ──────────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: NEXT_PUBLIC_SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${NEXT_PUBLIC_SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${NEXT_PUBLIC_SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ── Dynamic project routes ────────────────────────────────────
  // TODO: Replace the stub array below with a real data fetch.
  //       Example:
  //         const projects = await fetch(`${API_URL}/projects`).then(r => r.json());
  //         const dynamicRoutes = projects.map(p => ({ url: ..., lastModified: ... }));
  //
  const projectStubs: Array<{ slug: string; updatedAt: Date }> = [
    // { slug: "project-alpha", updatedAt: new Date("2024-12-01") },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = projectStubs.map((p) => ({
    url: `${NEXT_PUBLIC_SITE_URL}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
