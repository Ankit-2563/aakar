import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const italiana = localFont({
  src: "../../public/fonts/Italiana-Regular.ttf",
  variable: "--font-italiana",
});

export const metadata: Metadata = {
  title: "Aakar Portfolio",
  description: "Premium architecture portfolio",
  icons: {
    icon: "/assets/icon.png",
  },
  openGraph: {
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
