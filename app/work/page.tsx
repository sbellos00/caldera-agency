import type { Metadata } from 'next'
import WorkClient from '@/components/WorkClient'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/site'
import { caseStudies, workTestimonials } from '@/lib/work'

export const metadata: Metadata = {
  title: 'Consultant Website Case Studies | Caldera Agency',
  description:
    'Consultant websites built by Caldera Agency: fractional CFOs, leadership coaches, HR, healthcare and biosafety consultants, rail advisory, and supply chain strategy for pharmaceutical companies. See the live sites and what clients say.',
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    url: '/work',
    title: 'Consultant Website Case Studies | Caldera Agency',
    description:
      'Consultant websites built by Caldera Agency: fractional CFOs, leadership coaches, HR, healthcare and biosafety consultants, rail advisory, and supply chain strategy for pharmaceutical companies. See the live sites and what clients say.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Caldera Agency consultant website case studies' }],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Consultant website case studies by Caldera Agency',
  itemListElement: caseStudies.filter((c) => !c.hidden).map((c, i) => {
    const label = c.name || (c.url ? c.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Consultant')
    return {
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: `${label} website`,
        description: c.summary,
        ...(c.url ? { url: c.url } : {}),
        ...(c.image ? { image: c.image.startsWith('http') ? c.image : `${SITE_URL}${encodeURI(c.image)}` } : {}),
        creator: { '@id': `${SITE_URL}/#organization` },
        genre: 'Consultant website',
        keywords: `website for ${c.niche}, ${c.niche} website design, consultant website agency`,
        about: c.niche,
      },
    }
  }),
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    ratingCount: String(workTestimonials.length),
  },
  review: workTestimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: t.body,
  })),
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={reviewSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/work' },
        ])}
      />

      <WorkClient />
    </>
  )
}
