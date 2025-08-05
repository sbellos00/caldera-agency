import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"

export const metadata: Metadata = {
  title: "Caldera Agency - Bespoke Authority-Building Websites for Solo Consultants",
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
    "professional consulting services",
    "caldera agency"
  ],
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
  },
  alternates: {
    canonical: "https://caldera.agency",
  },
}

export default function HomePage() {
  return <HomeClient />
}