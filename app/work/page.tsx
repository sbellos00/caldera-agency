import type { Metadata } from 'next'
import WorkClient from '@/components/WorkClient'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/site'
import { caseStudies, workTestimonials } from '@/lib/work'

export const metadata: Metadata = {
  title: 'Consultant Website Case Studies',
  description:
    'Examples of consultant websites Caldera has built, the websites and what clients say. Done-for-you sites for various Consulting industries, such as, Fractional CFOs, Coaches, HR, and Healthcare, each one built around the consultant’s expertise.',
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    url: '/work',
    title: 'Consultant Website Case Studies',
    description:
      'Examples of consultant websites Caldera has built, the websites and what clients say. Done-for-you sites for various Consulting industries, such as, Fractional CFOs, Coaches, HR, and Healthcare, each one built around the consultant’s expertise.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Caldera Agency consultant website case studies' }],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Consultant website case studies by Caldera Agency',
  itemListElement: caseStudies.map((c, i) => {
    const label = c.name || (c.url ? c.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Consultant')
    return {
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: `${label} website`,
        ...(c.url ? { url: c.url } : {}),
        creator: { '@id': `${SITE_URL}/#organization` },
        ...(c.role ? { about: c.role } : {}),
      },
    }
  }),
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
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
