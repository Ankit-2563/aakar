import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ─── Dynamic OpenGraph Image ───────────────────────────────────
// This route generates a crisp 1200×630 OG image at /opengraph-image
// Next.js automatically wires it up to <meta property="og:image">.
// You can pass searchParams to generate per-page variants:
//   /opengraph-image?title=Project+Alpha
// ──────────────────────────────────────────────────────────────

export default async function Image(props: {
  searchParams?: { title?: string; subtitle?: string };
}) {
  const searchParams = props.searchParams || {};
  const title = searchParams.title ?? "Premium Architecture & Interior Design";
  const subtitle = searchParams.subtitle ?? "India";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#201413",
        position: "relative",
        padding: "80px",
      }}
    >
      {/* Background texture stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          backgroundColor: "#452D2E",
        }}
      />

      {/* Wordmark */}
      <div
        style={{
          fontSize: "96px",
          fontWeight: "400",
          color: "#E9E4DC",
          letterSpacing: "0.05em",
          marginBottom: "24px",
          fontFamily: "serif",
        }}
      >
        Aakar
      </div>

      {/* Page Title */}
      <div
        style={{
          fontSize: "36px",
          color: "#705F53",
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: 1.4,
          fontFamily: "sans-serif",
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "24px",
          color: "#E9E4DC",
          marginTop: "16px",
          opacity: 0.6,
          fontFamily: "sans-serif",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8px",
          backgroundColor: "#452D2E",
        }}
      />
    </div>,
    { ...size },
  );
}
