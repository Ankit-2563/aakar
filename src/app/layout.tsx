import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import {
  SEO_CONFIG,
  FIRM,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateWebPageSchema,
  generateFAQSchema,
  HOME_PAGE_FAQS,
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const italiana = localFont({
  src: "../../public/fonts/Italiana-Regular.ttf",
  variable: "--font-italiana",
  display: "swap",
});

// ─── Root Metadata ─────────────────────────────────────────────
// Next.js Metadata API automatically handles <title>, <meta>,
// Open Graph, Twitter Cards, and canonical links.
export const metadata: Metadata = {
  // Title
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,

  // Canonical
  metadataBase: new URL(SEO_CONFIG.url),
  alternates: {
    canonical: SEO_CONFIG.url,
    languages: { "en-IN": SEO_CONFIG.url },
    types: {
      "application/rss+xml": `${SEO_CONFIG.url}/feed.xml`,
    },
  },

  // Authorship / attribution
  authors: FIRM.founders.map((f) => ({ name: f.name })),
  creator: FIRM.name,
  publisher: FIRM.name,

  // Open Graph
  openGraph: {
    title: SEO_CONFIG.title.default,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.url,
    siteName: FIRM.name,
    locale: SEO_CONFIG.locale,
    type: SEO_CONFIG.type,
    images: [SEO_CONFIG.ogImage],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.title.default,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.ogImage.url],
    creator: "@aakar_in",
    site: "@aakar_in",
  },

  // Icons
  icons: {
    icon: [
      { url: "/assets/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/assets/icon.svg", color: "#452D2E" }],
  },

  // PWA / Web App Manifest
  manifest: "/manifest.json",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification — fill in after submitting to each platform
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },

  // App / category signals
  category: "architecture, interior design",
};

// ─── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // All schemas generated server-side — no client JS cost
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const homePageSchema = generateWebPageSchema({
    name: SEO_CONFIG.title.default,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.url,
    breadcrumb: [{ name: "Home", url: SEO_CONFIG.url }],
  });
  const faqSchema = generateFAQSchema(HOME_PAGE_FAQS);

  return (
    <html
      lang="en-IN"
      className={`${italiana.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* ── Preconnects for performance ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ── Structured Data / JSON-LD ───────────────────────────
            Multiple schemas in separate <script> tags so parsers
            don't have to unwrap arrays — best practice per Google. */}

        {/* Entity: Who we are (GEO critical) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {/* Website: Enables Sitelinks SearchBox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* WebPage: Precise page context */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />

        {/* FAQ: Drives "People Also Ask" rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* ── GEO: LLM / AI engine discovery hints ────────────────
            These meta tags help ChatGPT, Claude, Perplexity,
            Gemini, and other AI crawlers correctly attribute
            information to Aakar. */}
        <meta name="description" content={SEO_CONFIG.description} />
        <meta name="author" content="Pratham Mewada, Tripti Singh" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* ── llms.txt discovery link (AI crawlers) ──────────────── */}
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLMs.txt — AI-readable site summary"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
