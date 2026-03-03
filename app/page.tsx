import type { Metadata } from "next"
import HomeClientV2 from "@/components/HomeClientV2"

export const metadata: Metadata = {
  title: "Caldera Agency - The Website Agency For Solo Consultants",
  description: "You do nothing. We build everything. Share your LinkedIn and we handle research, copy, design, and development. Free prototype before you spend a cent.",
  keywords: [
    "consultant website design",
    "authority website",
    "consultant marketing",
    "professional website development",
    "solo consultant branding",
    "custom web design",
    "consultant lead generation",
    "free website prototype",
    "linkedin website builder",
    "caldera agency"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://caldera.agency",
    title: "Caldera Agency - The Website Agency For Solo Consultants",
    description: "You do nothing. We build everything. Share your LinkedIn and we handle research, copy, design, and development. Free prototype before you spend a cent.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caldera Agency - Professional Websites for Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caldera Agency - The Website Agency For Solo Consultants",
    description: "You do nothing. We build everything. Share your LinkedIn and we handle research, copy, design, and development. Free prototype before you spend a cent.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://caldera.agency",
  },
}

export default function HomePage() {
  return <HomeClientV2 />
}
