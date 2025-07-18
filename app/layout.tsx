import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Caldera Agency - Bespoke Authority-Building Websites for Solo Consultants",
    template: "%s | Caldera Agency"
  },
  description: "Custom website development for solo consultants. We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise and convert higher-value clients.",
  keywords: [
    "consultant website design",
    "authority website",
    "consultant marketing",
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
  metadataBase: new URL("https://caldera.agency"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://caldera.agency",
    title: "Caldera Agency - Bespoke Authority-Building Websites for Solo Consultants",
    description: "Custom website development for solo consultants. We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise and convert higher-value clients.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caldera Agency - Authority-Building Websites for Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caldera Agency - Bespoke Authority-Building Websites for Solo Consultants",
    description: "Custom website development for solo consultants. We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise and convert higher-value clients.",
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
  verification: {
    google: "your-google-site-verification-code",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <CookieBanner />
       
        {children}
        <Analytics />
        <SpeedInsights />
        <StagewiseToolbar 
          config={{
            plugins: [ReactPlugin]
          }}
        />
      </body>
    </html>
  );
}
