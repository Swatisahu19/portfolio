import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import { Analytics } from "@vercel/analytics/react";

/** Editorial serif for display, Inter for body and labels */
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Swati Sahu" },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: site.portrait.src, width: site.portrait.width, height: site.portrait.height, alt: site.portrait.alt }],
  },
  twitter: { card: "summary", title: site.title, description: site.description, images: [site.portrait.src] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F6F4EE", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <MotionProvider>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        {/* Cookieless page-view counts (Vercel Web Analytics). Also counts /honeytrap and /hr-buddy, which load the same script. */}
        <Analytics />
      </body>
    </html>
  );
}
