import type { Metadata } from "next"
import Link from "next/link"
import Menu from "@/components/Menu"
import Footer from "@/components/Footer"
import BlogClient from "@/components/BlogClient"

export const metadata: Metadata = {
  title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
  description: "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
  keywords: [
    "consultant authority",
    "premium consulting clients", 
    "consultant positioning",
    "consulting expertise",
    "authority building",
    "consultant credibility",
    "high-value clients",
    "consulting business development"
  ],
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://caldera.agency/blog/sample-post",
    title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
    description: "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/blog-og-sample.jpg",
        width: 1200,
        height: 630,
        alt: "The Authority Paradox - Caldera Agency Blog Post",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
    description: "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
    images: ["/blog-og-sample.jpg"],
  },
  alternates: {
    canonical: "https://caldera.agency/blog/sample-post",
  },
}

export default function BlogPostPage() {
  return <BlogClient />
}