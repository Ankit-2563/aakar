import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image Optimisation ─────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add Cloudinary when you integrate it:
      // { protocol: "https", hostname: "res.cloudinary.com", pathname: "/your-cloud/**" },
    ],
    minimumCacheTTL: 86400, // 24 hours
  },

  // ── HTTP Headers ───────────────────────────────────────────
  // Security headers also improve Google's Trust Score.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Enable XSS protection in older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Control referrer for privacy + analytics accuracy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Force HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Permissions policy (no unnecessary features)
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // Content Security Policy (tune as you add third-party scripts)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com",
              "connect-src 'self' https://vitals.vercel-insights.com",
              "frame-src 'none'",
            ].join("; "),
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Make llms.txt easily discoverable
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  // ── Redirects ──────────────────────────────────────────────
  async redirects() {
    return [
      // Enforce trailing-slash-free canonical URLs
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ── Compression ────────────────────────────────────────────
  compress: true,

  // ── Powered-by header removal (minor security hardening) ───
  poweredByHeader: false,

  // ── Trailing slash (set to false for canonical consistency) ─
  trailingSlash: false,
};

export default nextConfig;
