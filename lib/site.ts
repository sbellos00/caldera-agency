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

// Homepage FAQ. Rewritten answer-first and prompt-shaped for AI answer engines:
// each question mirrors how people actually ask, and each answer opens with a
// direct, quotable statement. Rendered on the homepage AND emitted as FAQPage
// schema from app/page.tsx, so this is the single source of truth for both.
export const homepageFaqs: Faq[] = [
  {
    q: 'What is Caldera Agency?',
    a: 'Caldera Agency is a website agency that works exclusively with solo and independent consultants. We research your background, write your copy, design and build your site, and host it. You see a free working prototype of your actual website before you pay anything.',
  },
  {
    q: 'Do consultants really need a website if they have LinkedIn?',
    a: 'Yes. LinkedIn makes you visible, but your website makes you credible. LinkedIn shows you in the same template as every other consultant, and you do not own it. A website is the one place you control your story, prove your expertise, and turn referrals into clients.',
  },
  {
    q: "What if I don't like what you build?",
    a: 'You see a free prototype before you pay anything. After that, you approve each phase before we move on, so you only pay for work you have reviewed. Final payment is due only when you are ready to launch. There is no risk of paying for something you cannot use.',
  },
  {
    q: 'Who owns the website?',
    a: 'You do, fully. Your code, your domain, your content. There is no proprietary platform and no lock-in. We host and maintain the site to make your life easier, but you can take the full codebase and self-host anytime.',
  },
  {
    q: 'How long does it take to build a consultant website?',
    a: 'Most clients launch within days to a couple of weeks. The pace depends on how quickly you review each phase, since we handle the rest. Clients who stay responsive have launched in under a week, and most spend less than two hours on the entire project.',
  },
  {
    q: 'How much does a consultant website from Caldera cost?',
    a: 'Pricing is milestone-based, so you approve and pay for each phase as we go, and final payment is due only when you are ready to launch. Because you start from a free working prototype, you always see the real work before any money changes hands.',
  },
  {
    q: 'What kind of consultants do you work with?',
    a: 'Solo and independent consultants only. Fractional CFOs, executive and leadership coaches, supply chain and operations advisors, and strategy and management consultants. We do not take on agencies, local businesses, or e-commerce, because that focus is what makes our sites work.',
  },
  {
    q: 'Do I have to write the copy or fill out long forms?',
    a: 'No. We study your LinkedIn, your positioning, and your market, then come back with a finished website. You do not fill out discovery forms or sit through briefing calls. Most clients spend under two hours, and your only real job is reviewing what we build.',
  },
  {
    q: 'What is included in a Caldera website?',
    a: 'Everything. Research, copywriting, design, development, domain setup, analytics, and one year of hosting and support. After launch, up to four development hours are included free in the first month, then two hours a month.',
  },
  {
    q: 'Will a website actually bring me more clients?',
    a: "A consultant website's job is credibility and conversion, not lead generation. No site guarantees leads, but without credibility you lose deals you never hear about. A strong site opens doors to RFPs, partnerships, and high-value referrals that would otherwise pass you by.",
  },
  {
    q: "Isn't this just another template site?",
    a: 'No. Every site is researched and built from scratch around your positioning. The copy and design are consultant-specific and built for consulting credibility. Never generic, and never a theme with your name dropped into it.',
  },
]

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
