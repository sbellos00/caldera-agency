import { SITE_URL, SITE_NAME, organizationSchema } from '@/lib/site'

// Site-wide structured data, rendered once in the root layout. Page-specific
// schema (ProfessionalService, FAQPage, Review, Article, BreadcrumbList) is added
// on the individual pages so it only appears where the matching content does.
export default function StructuredData() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}
