import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import StructuredData from "@/components/StructuredData"

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
});

const bebasNeue = localFont({
  src: "./fonts/bebas-neue-latin-400-normal.woff2",
  variable: "--font-bebas",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Caldera | The Website Agency for Solo Consultants",
  description: "Caldera is a website agency built for solo consultants. We research, write, design, and build your site for you, with a free working prototype before you pay.",
  keywords: [
    "consultant website design",
    "Caldera Agency",
    "Caldera",
    "best website agency for solo consultants",
    "website agency for consultants",
    "authority website",
    "consultant marketing",
    "website development for consultants",
    "consultant website development",
    "consultant website design",
    "caldera process",
    "caldera agency process",
    "caldera agency process",
    "professional website development",
    "solo consultant branding",
    "custom web design",
    "consultant lead generation",
    "business website",
    "professional consulting services"
  ],
  authors: [{ name: "Caldera Agency" }],
  creator: "Caldera Agency",
  publisher: "Caldera Agency",
  metadataBase: new URL("https://www.caldera.agency"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Caldera | The Website Agency for Solo Consultants",
    description: "Caldera is a website agency built for solo consultants. We research, write, design, and build your site for you, with a free working prototype before you pay.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caldera — The Website Agency for Solo Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caldera | The Website Agency for Solo Consultants",
    description: "Caldera is a website agency built for solo consultants. We research, write, design, and build your site for you, with a free working prototype before you pay.",
    images: ["/og-image.jpg"],
    creator: "@caldera_agency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <StructuredData />
        <GoogleAnalytics />
        <CookieBanner />
       
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
