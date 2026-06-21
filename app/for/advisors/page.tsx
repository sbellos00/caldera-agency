import type { Metadata } from 'next'
import NicheLayout, { type NicheContent } from '@/components/NicheLayout'
import { testimonials } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Websites for Independent Advisors & Consultants',
  description:
    'A done-for-you website for independent advisors and specialist consultants that proves deep domain expertise to enterprise buyers. Free prototype before you pay, full ownership.',
  alternates: { canonical: '/for/advisors' },
  openGraph: {
    type: 'website',
    url: '/for/advisors',
    title: 'Websites for Independent Advisors & Consultants | Caldera Agency',
    description:
      'A domain-deep, RFP-ready website for independent advisors. Free prototype before you pay, full ownership, done for you.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Websites for Independent Advisors and Consultants' }],
  },
}

const content: NicheContent = {
  slug: 'advisors',
  breadcrumbName: 'Websites for Advisors',
  eyebrow: 'For independent advisors & specialist consultants',
  h1Lead: 'Websites for independent',
  h1Accent: 'advisors & consultants',
  answer: (
    <>
      An independent advisor’s website has to prove deep, specific domain expertise to a buyer who is often an
      enterprise team or a procurement function. The best one names your niche precisely, shows the depth of your
      experience, and reads as the credible specialist a serious organization would shortlist. Caldera builds that site
      for you and shows you a free working prototype before you pay.
    </>
  ),
  serviceName: 'Caldera Agency, Websites for Independent Advisors & Consultants',
  serviceDescription:
    'Done-for-you website design and development for independent advisors and specialist consultants in operations, supply chain, strategy, and similar fields. Free prototype before payment, full ownership.',
  audienceType: 'Independent advisors and specialist consultants',
  whyTitle: 'Why specialist advisors get judged on depth',
  whyIntro: (
    <>
      When a company brings in an independent advisor, in supply chain, operations, strategy, or any specialist field,
      they are buying judgment honed over a career. The buyer is frequently a team rather than one person, sometimes
      running a formal RFP, and they are screening for genuine depth, not surface familiarity. A generic or shallow
      website reads as a generalist, and generalists get filtered out of high-value, specialist engagements first.
    </>
  ),
  painPoints: [
    {
      h: 'You compete against firms, not just people',
      b: 'As a solo advisor you are often up against boutique and large consulting firms. Your site has to project the same seriousness and depth, so being independent reads as focused rather than small.',
    },
    {
      h: 'Buyers screen for true expertise',
      b: 'Enterprise and RFP buyers are scanning for evidence you have genuinely solved their class of problem. Vague “trusted advisor” language fails. Specific domain depth wins.',
    },
    {
      h: 'Your niche needs naming, precisely',
      b: 'The narrower and clearer your specialty on the page, the more often you are the obvious shortlist choice. Ambiguity about what you actually do costs you the engagements you are best suited for.',
    },
  ],
  buildTitle: 'What Caldera builds for an advisor',
  buildIntro: (
    <>
      We research your field, your track record, and the organizations you serve, then build a site that demonstrates
      specialist depth and reads as RFP-ready. It is custom, serious, and fully owned by you.
    </>
  ),
  buildPoints: [
    { h: 'A precisely-named specialty.', b: 'Positioning that states your exact domain so the right buyers immediately recognize you as their specialist.' },
    { h: 'Depth on display.', b: 'Your methodology, the types of engagements you run, and the scope of your experience, structured to satisfy a scrutinizing buyer.' },
    { h: 'Enterprise-grade credibility.', b: 'A composed, professional presence that holds its own next to boutique and large advisory firms.' },
    { h: 'RFP-ready proof.', b: 'Clear case framing and named testimonials that a procurement team or executive sponsor can rely on.' },
  ],
  proofIntro: (
    <>
      We have done exactly this for an independent advisor. Tim Scott of True North Supply Chain Advisory came to us
      with his content and feedback, and we turned it into an end product that exceeded his expectations.
    </>
  ),
  proof: {
    quote: testimonials.scott.body,
    name: testimonials.scott.name,
    role: testimonials.scott.role,
    // {{STEF: add the True North Supply Chain Advisory site URL here if it is live}}
  },
  faqs: [
    {
      q: 'How do you make a solo advisor look as credible as a consulting firm?',
      a: 'Through positioning and depth, not volume. We present your specialty, methodology, and track record with the same rigor a buyer expects from a boutique firm, so being independent reads as focused expertise rather than limited capacity.',
    },
    {
      q: 'My work is very niche. Is that a problem for a website?',
      a: 'It is an advantage. The narrower and clearer your specialty on the page, the more often you become the obvious shortlist choice for exactly the engagements you want. We name your niche precisely instead of broadening it into vagueness.',
    },
    {
      q: 'Can the site support RFP and procurement processes?',
      a: 'Yes. We structure your expertise, engagement types, and proof so an enterprise buyer or procurement team can quickly verify you fit their requirements, which is often what gets you onto the shortlist.',
    },
    {
      q: 'How much of my time will this take?',
      a: 'Under two hours, typically. We do the research and start from a free working prototype, so your role is mainly review. You keep advising clients while we build the site.',
    },
  ],
  ctaHeading: (
    <>
      See your advisory site <span className="font-serif italic text-[var(--blue-light)]">before you pay</span>
    </>
  ),
  ctaSub: 'Drop your LinkedIn and we’ll send a free working prototype built around your specialty and your track record. No calls, no commitment.',
}

export default function Page() {
  return <NicheLayout {...content} />
}
