// Shared site constants and schema builders. Centralised so every page emits the
// exact same canonical host and the same brand "facts" , consistency is what ties
// the Caldera entity together for search engines and AI answer engines.

export const SITE_URL = 'https://www.caldera.agency'
export const SITE_NAME = 'Caldera Agency'
export const CONTACT_EMAIL = 'contact@caldera.agency'

/** One-line description reused across schema and metadata. Keep wording identical
 *  on-site and off-site (LinkedIn, directories) so the association is unambiguous. */
export const BRAND_DESCRIPTION =
  'Done-for-you websites for solo consultants. Caldera researches your background, writes the copy, and designs, builds, and hosts a fully custom site that gives you complete control of your personal brand and digital presence. You see a free working prototype before you pay anything.'

export interface Testimonial {
  name: string
  role: string
  body: string
}

// The named, real testimonials shown on the site. Matched to niches where relevant:
// Piazza → fractional CFO, Ron Paul → coaching, Tim Scott → advisory,
// Esemenyuk → biosafety / research safety.
export const testimonials: Record<'piazza' | 'scott' | 'paul' | 'esemenyuk', Testimonial> = {
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
  esemenyuk: {
    name: 'Ekaterina Semenyuk',
    role: 'Biosafety & Research Safety Consultant',
    body: 'I just wanted to say thank you for the fantastic work on my website! I’m very happy with how it turned out. It looks clean, professional, and truly reflects my work and vision. It was a pleasure working with you, and I would gladly recommend your services to others. Thank you again!',
  },
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  // {{STEF: replace with a real square (≥112×112) logo at /logo.png , currently reusing the OG image}}
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
    // {{STEF: add every real off-site profile as it goes live , Clutch, G2, DesignRush, The Manifest, Trustpilot, X/Twitter, Instagram}}
  ],
}

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description:
    'Website design and development agency exclusively for solo and independent consultants. Fully custom, done-for-you sites that give you complete control of your personal brand and digital presence, with any vision realized no matter the complexity. A free working prototype before you pay.',
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

// Homepage FAQ. Rendered by components/HomeClientV6 AND emitted as FAQPage
// schema from app/page.tsx, so this is the single source of truth for both —
// FAQ markup has to match what a visitor actually sees on the page.
export const homeFaqs: Faq[] = [
  { q: 'What if I don\'t have time for a big project?', a: 'We\'ve designed our process to be incredibly efficient. We handle all the technical and creative work, requiring less than two hours of your time to get everything launched.' },
  { q: 'What if I\'m not happy at launch?', a: 'You review and approve the work at every milestone, and we keep iterating until you\'re proud to launch. Nothing goes live without your sign-off.' },
  { q: 'Isn\'t this just another template site?', a: 'No. Every step is research-based and guides us towards designing the perfect website for you from scratch. All design and copy is consultant-specific and tailored to your positioning, built for consulting credibility—never generic.' },
  { q: 'Do you build for other industries?', a: 'No. Consultants only. That\'s why our sites work.' },
  { q: 'Will this bring leads?', a: 'No site guarantees leads. But without credibility, you lose by default. This site is built to open doors to RFPs, partnerships, and high-value deals.' },
  { q: 'Who owns the site?', a: 'You own it, fully. No platform risk, no lock-in. We provide hosting, support, and maintenance to make your life easier, but you can take the full code and self-host anytime you wish.' },
  { q: 'What if I need updates later?', a: 'Up to 4 post-launch development hours are included for free during the first month with your hosting plan, then 2 hours per month thereafter. Anything more is handled quickly by us at our standard rate.' },
  { q: 'I was burned by agencies/freelancers before.', a: 'We understand your hesitation. That\'s why we operate with complete transparency. Our process is broken down into clear milestones, and you review and approve the work at every stage.' },
]

// The previous homepage's FAQ set. Answer-first and prompt-shaped for AI answer
// engines. Still rendered by the retired components/HomeClientV2, which no longer
// has a route — kept so the old page stays intact if we ever want it back.
export const homepageFaqs: Faq[] = [
  {
    q: 'Do consultants need a website if they already have LinkedIn?',
    a: 'Yes. On LinkedIn you sit in the same template as every other consultant, and the algorithm decides who sees you. A website is the one place you control your personal brand and digital presence completely. It is where you prove your expertise on your own terms and turn referrals and inbound interest into clients.',
  },
  {
    q: 'How much does a consultant website cost?',
    a: 'Every project starts with a free working prototype, so you see your website before you decide anything. From there, the investment depends on the scope and complexity of the site you want.',
  },
  {
    q: 'How long does it take to build a consultant website?',
    a: 'Most clients launch within days to a couple of weeks. We handle the research, writing, design, and development, so the main variable is how quickly you review each round. Clients who respond quickly have gone from first prototype to live site in under a week.',
  },
  {
    q: 'What kind of consultants do you work with?',
    a: 'Solo and independent consultants. That means Fractional CFOs, executive and leadership coaches, supply chain and operations advisors, health care consultants, and experts like them. That focus is what keeps the work sharp.',
  },
  {
    q: 'Can you build exactly what I have in mind?',
    a: 'Yes. Whatever you picture, we build it. Custom layouts, rich animation, interactive detail, an unconventional structure. Because every site is built from scratch rather than dropped into a template, there is no complexity ceiling. You describe the vision and we make it real.',
  },
]

// Additional questions for the dedicated /faq page (the authoritative FAQ hub).
// Kept distinct from the homepage set so /faq adds depth rather than repeating.
export const extraFaqs: Faq[] = [
  {
    q: 'What is Caldera Agency?',
    a: 'Caldera Agency is a website agency that works exclusively with solo and independent consultants. We research your background, write your copy, and design, build, and host a fully custom site that gives you complete control of your personal brand and digital presence. You see a free working prototype before you pay anything.',
  },
  {
    q: 'How does the free prototype work?',
    a: 'You share your LinkedIn. We research your background, positioning, and market, then build a working prototype of your website before you pay anything. If you love it, we refine it with you and launch. If it is not right, you walk away owing nothing.',
  },
  {
    q: 'What is included when you build my website?',
    a: 'Everything needed to get you live and looking credible. Research, copywriting, design, development, domain setup, analytics, and a year of hosting and support. You bring the vision and the raw material, and we handle the rest.',
  },
  {
    q: 'How involved do I need to be?',
    a: 'Very little. We do the research, the writing, the design, and the build. Your job is to share your vision and react to what we create. There are no discovery forms to fill out and no homework.',
  },
  {
    q: 'What happens after my website launches?',
    a: 'Your first year of hosting and support is included, and we handle the technical side so you can stay focused on your work. When you want changes or additions later, we are there to make them.',
  },
  {
    q: 'Who owns the website?',
    a: 'It is yours. Your site, your domain, your content. We host and maintain it to make your life easier, and you are never locked in.',
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
