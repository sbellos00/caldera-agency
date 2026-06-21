import type { Metadata } from "next"
import WhyConsultantsNeedWebsitesBlogClient from "@/components/WhyConsultantsNeedWebsitesBlogClient"
import JsonLd from "@/components/JsonLd"
import { breadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/site"
import { getPost } from "@/lib/posts"

const post = getPost("why-consultants-need-websites")!

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
  alternates: {
    canonical: `/blog/${post.slug}`,
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `/blog/${post.slug}`,
    title: "Why Every Consultant Needs a Website (Even When LinkedIn Is Working)",
    description: "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
    siteName: "Caldera Agency",
    images: [
      {
        url: "/og-image.jpg",
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
          { name: "Why Every Consultant Needs a Website", path: `/blog/${post.slug}` },
        ])}
      />
      <WhyConsultantsNeedWebsitesBlogClient />
    </>
  )
}
