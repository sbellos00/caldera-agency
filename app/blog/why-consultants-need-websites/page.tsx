import type { Metadata } from "next"
import Link from "next/link"
import Menu from "@/components/Menu"
import Footer from "@/components/Footer"
import WhyConsultantsNeedWebsitesBlogClient from "@/components/WhyConsultantsNeedWebsitesBlogClient"

export const metadata: Metadata = {
  title: "Why Every Consultant Needs a Website (Even When LinkedIn Is Working)",
  description: "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
  keywords: [
    "consultant website",
    "LinkedIn consulting", 
    "consultant positioning",
    "consulting credibility",
    "authority building",
    "consultant marketing",
    "premium consulting clients",
    "consulting business development"
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://caldera.agency/blog/why-consultants-need-websites",
    title: "Why Every Consultant Needs a Website (Even When LinkedIn Is Working)",
    description: "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/blog-og-consultant-website.jpg",
        width: 1200,
        height: 630,
        alt: "Why Every Consultant Needs a Website - Caldera Agency Blog Post",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Every Consultant Needs a Website (Even When LinkedIn Is Working)",
    description: "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
    images: ["/blog-og-consultant-website.jpg"],
  },
  alternates: {
    canonical: "https://caldera.agency/blog/why-consultants-need-websites",
  },
}

export default function BlogPostPage() {
  return <WhyConsultantsNeedWebsitesBlogClient />
}