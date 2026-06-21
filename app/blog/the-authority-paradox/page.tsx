import type { Metadata } from "next"
import BlogClient from "@/components/BlogClient"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/site"
import { getPost } from "@/lib/posts"

const post = getPost("the-authority-paradox")!

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
  alternates: {
    canonical: `/blog/${post.slug}`,
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `/blog/${post.slug}`,
    title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
    description: "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  author: {
    "@type": "Person",
    name: "Stefanos Bellos",
    url: `${SITE_URL}/about`,
    jobTitle: "Founder, Caldera Agency",
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  },
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  image: `${SITE_URL}/og-image.jpg`,
}

export default function BlogPostPage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "The Authority Paradox", path: `/blog/${post.slug}` },
        ])}
      />
      <BlogClient />
    </>
  )
}
