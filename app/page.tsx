import type { Metadata } from "next"
import HomeClientV2 from "@/components/HomeClientV2"
import JsonLd from "@/components/JsonLd"
import { professionalServiceSchema, faqSchema, homepageFaqs, testimonials, SITE_URL, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: "Caldera | The Website Agency for Solo Consultants",
  description: "Caldera is a done-for-you website agency for solo consultants. Share your LinkedIn and we handle the research, copy, design, and build. Then you see a free prototype before you pay anything.",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Caldera | The Website Agency for Solo Consultants",
    description: "Caldera is a done-for-you website agency for solo consultants. Share your LinkedIn and we handle the research, copy, design, and build. Then you see a free prototype before you pay anything.",
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
    title: "Caldera | The Website Agency for Solo Consultants",
    description: "Caldera is a done-for-you website agency for solo consultants. Share your LinkedIn and we handle the research, copy, design, and build. Then you see a free prototype before you pay anything.",
    images: ["/og-image.jpg"],
  },
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '3', // {{STEF: keep in sync with the number of real testimonials shown on the site}}
  },
  review: (['piazza', 'scott', 'paul'] as const).map((k) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: testimonials[k].name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: testimonials[k].body,
  })),
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={professionalServiceSchema} />
      <JsonLd data={faqSchema(homepageFaqs)} />
      <JsonLd data={reviewSchema} />
      <HomeClientV2 />
    </>
  )
}
