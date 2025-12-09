import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swati Sahu | Product Manager & Digital Transformation Leader",
  description: "Certified Product Manager (CPM) & CSPO® with 10+ years experience in digital transformation, product strategy, and AI-powered innovation. Explore my portfolio.",
  keywords: "Product Manager, Digital Transformation, CSPO, CPM, Product Strategy, AI, Agile, UX Design",
  authors: [{ name: "Swati Sahu" }],
  openGraph: {
    title: "Swati Sahu | Product Manager Portfolio",
    description: "Certified Product Manager with 10+ years driving digital transformation and product innovation across media, fintech, and consulting.",
    type: "website",
    url: "https://swati-sahu.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swati Sahu | Product Manager",
    description: "10+ years driving digital transformation and product innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfairDisplay.variable} ${dmSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
