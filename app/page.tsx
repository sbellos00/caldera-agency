import type { Metadata } from "next"
import HomeClientV2 from "@/components/HomeClientV2"
import JsonLd from "@/components/JsonLd"
import { professionalServiceSchema, faqSchema, testimonials, SITE_URL, SITE_NAME } from "@/lib/site"

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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
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
}

// Mirrors the FAQ that renders in the homepage (faqData in HomeClientV2), verbatim,
// so the structured data matches what a human sees on the page.
const homepageFaqs = [
  { q: "What if I don't have time for a big project?", a: 'Send us whatever you have, organized or not. We figure out the rest and come back with a full working website. Most clients spend less than 2 hours during the entire process. Your job is reviewing what we build.' },
  { q: 'I was burned by agencies/freelancers before.', a: 'Before you spend a dollar, you see a working prototype of your actual website. No briefs, no mood boards, no promises. We build first and earn your trust before asking for anything. From there, you approve each phase before we move forward.' },
  { q: "What if you're late?", a: 'We are the fastest in the market. Clients who stay responsive have launched in under a week. Speed is not something we need to guarantee. It is just how we work.' },
  { q: "What if I'm not happy at launch?", a: "You only pay for each phase after you approve it. Final payment is only due if you're proud to launch. No risk of paying for something you can't use." },
  { q: 'Who owns the site?', a: 'You own it, fully. No platform risk, no lock-in. We provide hosting, support, and maintenance to make your life easier, but you can take the full code and self-host anytime you wish.' },
  { q: 'What if I need updates later?', a: 'Up to 4 post-launch development hours are included for free during the first month with your hosting plan, then 2 hours per month thereafter. Anything more is handled quickly by us at our standard rate.' },
  { q: 'Do you build for other industries?', a: "No. Consultants only. That's why our sites work." },
  { q: "Isn't this just another template site?", a: 'No. Every step is research-based and guides us towards designing the perfect website for you from scratch. All design and copy is consultant-specific and tailored to your positioning, built for consulting credibility. Never generic.' },
  { q: 'Why not just do it myself?', a: 'Weeks of your time versus a few hours of reviewing. We handle the research, strategy, copy, design, and development. You show up, give feedback, and launch.' },
  { q: 'Will this bring leads?', a: 'No site guarantees leads. But without credibility, you lose by default. This site is built to open doors to RFPs, partnerships, and high-value deals.' },
  { q: 'LinkedIn works for me now.', a: "LinkedIn is just one platform. A professional website gives you full control over your digital presence, establishes deeper credibility, and positions you at a higher tier than competitors who rely solely on social media. Don't risk being at the mercy of algorithms and sudden policy changes." },
]

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
