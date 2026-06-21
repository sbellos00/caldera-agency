// Shared site constants and schema builders. Centralised so every page emits the
// exact same canonical host and the same brand "facts" — consistency is what ties
// the Caldera entity together for search engines and AI answer engines.

export const SITE_URL = 'https://www.caldera.agency'
export const SITE_NAME = 'Caldera Agency'
export const CONTACT_EMAIL = 'contact@caldera.agency'

/** One-line description reused across schema and metadata. Keep wording identical
 *  on-site and off-site (LinkedIn, directories) so the association is unambiguous. */
export const BRAND_DESCRIPTION =
  'Done-for-you websites for solo consultants. Caldera researches your background, writes the copy, designs and builds the site, and hosts it. You get a free working prototype before you pay anything.'

export interface Testimonial {
  name: string
  role: string
  body: string
}

// Only the three named, real testimonials shown on the site. Matched to niches
// where relevant: Piazza → fractional CFO, Ron Paul → coaching, Tim Scott → advisory.
export const testimonials: Record<'piazza' | 'scott' | 'paul', Testimonial> = {
  piazza: {
    name: 'Mark S. Piazza',
    role: 'Fractional CFO & Financial Advisor',
    body: "Caldera Agency didn't just build me a website, they helped me formally launch my entrepreneurial practice with clarity and credibility. In a matter of days, Stefanos and his team translated my experience into a polished, enterprise-level site, delivered with remarkable speed and zero red tape. It has elevated how I position myself in every client conversation.",
  },
  scott: {
    name: 'Tim Scott',
    role: 'Founder, True North Supply Chain Advisory',
    body: 'My experience with the Caldera team has been great. They are very responsive, creative and were able to take my desired content and feedback to create an end product that far exceeded my expectations. They work very efficiently, often turning around edits and new concepts in hours, with a sharp eye on every detail. I highly recommend the team at Caldera.',
  },
  paul: {
    name: 'Dr. Ron Paul',
    role: 'Founder, Polaris Leadership Institute',
    body: 'I was initially drawn to Caldera Agency because, unlike most vendors who send generic outreach, they had clearly taken the time to understand my business. The team was incredibly responsive and committed to getting every element right. We truly built the website together. The experience felt like a true partnership, and the value of the service far exceeded the cost.',
  },
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  // {{STEF: replace with a real square (≥112×112) logo at /logo.png — currently reusing the OG image}}
  logo: `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  description: BRAND_DESCRIPTION,
  foundingDate: '2025',
  founder: { '@type': 'Person', name: 'Stefanos Bellos', jobTitle: 'Founder' },
  contactPoint: {
    '@type': 'ContactPoint',
    email: CONTACT_EMAIL,
    contactType: 'customer service',
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'consultant websites',
    'website design for consultants',
    'website development for solo consultants',
    'personal branding for consultants',
    'lead generation for independent consultants',
  ],
  sameAs: [
    'https://www.linkedin.com/company/caldera-agency',
    // {{STEF: add every real off-site profile as it goes live — Clutch, G2, DesignRush, The Manifest, Trustpilot, X/Twitter, Instagram}}
  ],
}

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description:
    'Website design and development agency exclusively for solo and independent consultants. Free working prototype before payment, milestone-based pricing, and full code ownership with no lock-in.',
  url: SITE_URL,
  serviceType: 'Website design and development for consultants',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: 'Worldwide',
  audience: { '@type': 'Audience', audienceType: 'Solo and independent consultants' },
  offers: {
    '@type': 'Offer',
    description:
      'All-in-one consultant website package: research, copywriting, design, development, analytics, domain setup, and one year of hosting. Free working prototype before you pay.',
  },
}

export interface Crumb {
  name: string
  path: string
}

/** Build a BreadcrumbList. Always pass paths relative to the site root, e.g. "/blog". */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

export function blogPostingSchema(post: {
  slug: string
  title: string
  excerpt: string
  date: string
  updated?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Stefanos Bellos',
      url: `${SITE_URL}/about`,
      jobTitle: 'Founder, Caldera Agency',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
    },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/og-image.jpg`,
  }
}

export interface Faq {
  q: string
  a: string
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
