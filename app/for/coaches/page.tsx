import type { Metadata } from 'next'
import NicheLayout, { type NicheContent } from '@/components/NicheLayout'
import { testimonials } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Websites for Executive & Leadership Coaches',
  description:
    'A done-for-you website for executive and leadership coaches that makes intangible work feel concrete and premium. Free prototype before you pay, full ownership, built by Caldera.',
  alternates: { canonical: '/for/coaches' },
  openGraph: {
    type: 'website',
    url: '/for/coaches',
    title: 'Websites for Executive & Leadership Coaches | Caldera Agency',
    description:
      'A premium, proof-driven website for coaches. Free prototype before you pay, full ownership, done for you.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Websites for Executive and Leadership Coaches' }],
  },
}

const content: NicheContent = {
  slug: 'coaches',
  breadcrumbName: 'Websites for Coaches',
  eyebrow: 'For executive & leadership coaches',
  h1Lead: 'Websites for leadership &',
  h1Accent: 'executive coaches',
  answer: (
    <>
      A coaching website has to make something intangible feel concrete. The best one names exactly who you transform
      and how, replaces vague promises with a clear method and real outcomes, and signals the premium tier you charge
      at. That is how a leader tells you apart from the thousands of generalist coaches online. Caldera builds that site
      for you and shows you a free working prototype before you pay.
    </>
  ),
  serviceName: 'Caldera Agency, Websites for Executive & Leadership Coaches',
  serviceDescription:
    'Done-for-you website design and development for executive, leadership, and culture coaches. Free prototype before payment, full ownership, milestone-based pricing.',
  audienceType: 'Executive, leadership, and culture coaches',
  whyTitle: 'Why a coach’s website has to work harder than most',
  whyIntro: (
    <>
      Coaching is the hardest consulting service to sell from a profile, because the product is a relationship and a
      transformation that has not happened yet. The market is crowded with coaches who all use the same words. Unlock
      potential. Authentic leadership. A skeptical executive or HR buyer has learned to tune them out. Your website is
      where you escape that sea of sameness and prove there is a real method and real results behind the promise.
    </>
  ),
  painPoints: [
    {
      h: 'Everyone sounds the same',
      b: 'The coaching space is saturated with identical language. Without a distinct method and point of view on the page, a buyer cannot tell a seasoned executive coach from a six-week-certified one.',
    },
    {
      h: 'The value is invisible',
      b: 'You cannot screenshot a breakthrough. The site has to make an intangible transformation tangible, through frameworks, the arc of a client journey, and credible proof.',
    },
    {
      h: 'You sell to two buyers at once',
      b: 'An individual leader and a corporate sponsor, such as HR, a CEO, or a board, often evaluate you together. The site has to speak to personal change and organizational return in the same breath.',
    },
  ],
  buildTitle: 'What Caldera builds for a coach',
  buildIntro: (
    <>
      We research your philosophy, your client outcomes, and the leaders you serve, then build a site that gives your
      work shape and gravity. It is custom, premium, and fully owned by you.
    </>
  ),
  buildPoints: [
    { h: 'A named, ownable method.', b: 'We turn your approach into a clearly articulated framework a buyer can understand and remember. It is the antidote to generic coaching language.' },
    { h: 'Transformation made visible.', b: 'The before and after of a coaching engagement, client journeys, and outcomes, presented so the intangible becomes concrete.' },
    { h: 'Dual-audience positioning.', b: 'Copy that lands with both the individual leader and the organization paying the invoice.' },
    { h: 'A premium presence.', b: 'A calm, confident, high-end design that justifies premium fees the moment the page loads.' },
  ],
  proofIntro: (
    <>
      We built exactly this for a leadership coach. Dr. Ron Paul of the Polaris Leadership Institute wanted a site that
      reflected the depth of his work, and we collaborated on everything from structure to the smallest detail.
    </>
  ),
  proof: {
    quote: testimonials.paul.body,
    name: testimonials.paul.name,
    role: testimonials.paul.role,
    href: 'https://polarisinstitute.io',
    linkLabel: 'View polarisinstitute.io',
  },
  faqs: [
    {
      q: 'How do you make coaching, which is intangible, look credible on a website?',
      a: 'By giving it structure. We articulate your method as a named framework, show the arc of a typical client transformation, and present outcomes and testimonials so a buyer can picture the result. Specificity is what turns an abstract promise into something believable.',
    },
    {
      q: 'My website needs to appeal to both individuals and companies. Can it do both?',
      a: 'Yes. We position your work so an individual leader sees the personal transformation and a corporate sponsor sees the organizational return. The two messages reinforce each other rather than competing for space.',
    },
    {
      q: 'How do you make my coaching practice stand out from every other coach?',
      a: 'We avoid the recycled coaching vocabulary entirely and build the page around your distinct point of view, your method, and your proof. Distinctiveness comes from research into what actually makes your work different, not from a prettier template.',
    },
    {
      q: 'How much of my time does this take?',
      a: 'Under two hours, usually. We do the research and start from a free working prototype, so you mostly review and react. You keep coaching while we build the site.',
    },
  ],
  ctaHeading: (
    <>
      See your coaching site <span className="font-serif italic text-[var(--blue-light)]">before you pay</span>
    </>
  ),
  ctaSub: 'Drop your LinkedIn and we’ll send a free working prototype shaped around your method and your clients. No calls, no commitment.',
}

export default function Page() {
  return <NicheLayout {...content} />
}
