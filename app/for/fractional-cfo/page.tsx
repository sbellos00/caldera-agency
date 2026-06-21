import type { Metadata } from 'next'
import NicheLayout, { type NicheContent } from '@/components/NicheLayout'
import { testimonials } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Websites for Fractional CFOs',
  description:
    'A done-for-you website for fractional CFOs that signals financial credibility to founders and boards. Free working prototype before you pay, full ownership, built by Caldera.',
  alternates: { canonical: '/for/fractional-cfo' },
  openGraph: {
    type: 'website',
    url: '/for/fractional-cfo',
    title: 'Websites for Fractional CFOs | Caldera Agency',
    description:
      'A credibility-first website for fractional CFOs. Free prototype before you pay, full ownership, done for you.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Websites for Fractional CFOs' }],
  },
}

const content: NicheContent = {
  slug: 'fractional-cfo',
  breadcrumbName: 'Websites for Fractional CFOs',
  eyebrow: 'For fractional CFOs',
  h1Lead: 'Websites for',
  h1Accent: 'fractional CFOs',
  answer: (
    <>
      A fractional CFO website has one job. To make a founder, CEO, or board trust you with their numbers before the
      first call. The best one names the kind of company you steer, the financial outcomes you have delivered, and the
      engagements you offer, clearly enough that a buyer stops comparing you to a bookkeeper. Caldera builds that site
      for you, and shows you a free working prototype before you pay.
    </>
  ),
  serviceName: 'Caldera Agency, Websites for Fractional CFOs',
  serviceDescription:
    'Done-for-you website design and development for fractional and part-time CFOs and financial advisors. Free prototype before payment, full ownership, milestone-based pricing.',
  audienceType: 'Fractional CFOs and financial advisors',
  whyTitle: 'Why credibility is everything for a fractional CFO',
  whyIntro: (
    <>
      You are asking a company to hand you visibility into, and influence over, its cash, its forecasts, and its
      fundraising. That is one of the highest-trust roles a business ever outsources. A founder vetting a fractional
      CFO is not browsing. They are de-risking a decision that affects payroll and runway. If your online presence does
      not immediately read as senior, precise, and proven, you lose to someone who looks the part, often before you
      ever speak.
    </>
  ),
  painPoints: [
    {
      h: 'You get mistaken for a bookkeeper',
      b: 'Buyers conflate fractional CFOs with accountants and bookkeepers. Your site has to draw the line fast. Strategy, fundraising, board reporting, and scaling finance, not transaction entry.',
    },
    {
      h: 'Your buyers are senior and skeptical',
      b: 'Founders, CEOs, and boards expect polish and precision in anything touching their finances. A dated or generic site signals the opposite of the rigor they are paying for.',
    },
    {
      h: 'Your proof is confidential',
      b: 'You usually cannot publish a client’s P&L. The site has to convey the scale and type of outcomes you drive without breaching confidentiality. That takes careful framing, not a case-study dump.',
    },
  ],
  buildTitle: 'What Caldera builds for a fractional CFO',
  buildIntro: (
    <>
      We research your background and the kinds of companies you serve, then build a site engineered to signal
      financial seniority and turn a referral into a conversation. Everything is custom and fully owned by you.
    </>
  ),
  buildPoints: [
    { h: 'Positioning that separates you from accounting.', b: 'Language that frames you as a strategic finance partner. Think runway, fundraising, unit economics, and board-ready reporting, not back-office support.' },
    { h: 'Confidentiality-safe proof.', b: 'Outcome framing, company stage and size, and named testimonials where you have them, without exposing sensitive financials.' },
    { h: 'A clear engagement menu.', b: 'The specific ways you work, such as interim CFO, fundraising support, or financial systems, so a buyer self-qualifies before the call.' },
    { h: 'A credibility-first design.', b: 'Restrained, precise, and senior. The visual equivalent of a clean balance sheet.' },
  ],
  proofIntro: (
    <>
      We have done exactly this for a fractional CFO. Mark Piazza came to us to formally launch his practice, and we
      translated his experience into a polished, enterprise-level site at speed.
    </>
  ),
  proof: {
    quote: testimonials.piazza.body,
    name: testimonials.piazza.name,
    role: testimonials.piazza.role,
    href: 'https://markspiazza.com',
    linkLabel: 'View markspiazza.com',
  },
  faqs: [
    {
      q: 'How is a fractional CFO website different from a generic consulting site?',
      a: 'The entire emphasis is trust around money. The positioning, proof, and tone are built to reassure founders and boards that you operate at a senior financial level, and to separate you cleanly from bookkeeping and accounting services you do not offer.',
    },
    {
      q: 'I can’t share client financials. Can you still build proof?',
      a: 'Yes. We frame outcomes by company stage, size, and type of result rather than confidential numbers, and we use named testimonials where you have them. Credibility comes from specificity and framing, not from exposing a client’s books.',
    },
    {
      q: 'Do I need a multi-page site or will one page do?',
      a: 'Most fractional CFOs do well with a focused one-page site. Who you help, the outcomes, your engagement types, and contact. We can expand it as your practice grows. The priority is clarity, not page count.',
    },
    {
      q: 'How much of my time will this take?',
      a: 'Under two hours, typically. We research your background ourselves and start from a free working prototype, so your only real job is reviewing what we build. You stay focused on clients while we handle the site.',
    },
  ],
  ctaHeading: (
    <>
      See your fractional CFO site <span className="font-serif italic text-[var(--blue-light)]">before you pay</span>
    </>
  ),
  ctaSub: 'Drop your LinkedIn and we’ll send a free working prototype tailored to your practice. No calls, no commitment.',
}

export default function Page() {
  return <NicheLayout {...content} />
}
