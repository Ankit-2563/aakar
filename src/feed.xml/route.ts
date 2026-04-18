import { FIRM, NEXT_PUBLIC_SITE_URL } from "@/lib/seo";

// ─── RSS Feed ──────────────────────────────────────────────────
// Helps with: feed readers, content aggregators, and some AI
// crawlers that index RSS for content discovery.
// Accessible at: /feed.xml
// ──────────────────────────────────────────────────────────────

export const dynamic = "force-static";
export const revalidate = 86400; // Regenerate once per day

export async function GET() {
  // TODO: Replace stub with real project data fetched from DB/CMS
  const projects: Array<{
    slug: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
  }> = [
    // {
    //   slug: "project-alpha",
    //   title: "Project Alpha",
    //   description: "A modern residential project in Mumbai.",
    //   date: "2024-12-01",
    //   imageUrl: `${NEXT_PUBLIC_SITE_URL}/assets/projects/alpha.jpg`,
    // },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://www.rssboard.org/media-rss">
  <channel>
    <title>${FIRM.name} | Architecture &amp; Interior Design</title>
    <link>${NEXT_PUBLIC_SITE_URL}</link>
    <description>${FIRM.description}</description>
    <language>en-in</language>
    <managingEditor>${FIRM.email} (${FIRM.name})</managingEditor>
    <webMaster>${FIRM.email} (${FIRM.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${NEXT_PUBLIC_SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${NEXT_PUBLIC_SITE_URL}/assets/icon.svg</url>
      <title>${FIRM.name}</title>
      <link>${NEXT_PUBLIC_SITE_URL}</link>
    </image>
    ${projects
      .map(
        (p) => `
    <item>
      <title>${p.title}</title>
      <link>${NEXT_PUBLIC_SITE_URL}/projects/${p.slug}</link>
      <description>${p.description}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${NEXT_PUBLIC_SITE_URL}/projects/${p.slug}</guid>
      <dc:creator>${FIRM.founders[1].name}</dc:creator>
      ${p.imageUrl ? `<media:content url="${p.imageUrl}" medium="image" />` : ""}
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
