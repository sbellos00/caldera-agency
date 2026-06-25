import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '@/components/ArticleShell'
import { Band, Accent, ALead, AP, AH2, ABullets, FeatureCard } from '@/components/blocks'
import { getPost } from '@/lib/posts'

const post = getPost('do-consultants-need-a-website')!
const link = 'text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)] font-medium'

export const metadata: Metadata = {
  title: 'Do Consultants Need a Website (Even If LinkedIn Is Already Working)?',
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    url: `/blog/${post.slug}`,
    title: 'Do Consultants Need a Website (Even If LinkedIn Is Working)? | Caldera Agency',
    description: post.excerpt,
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
  },
}

const reasons = [
  {
    h: 'You do not own LinkedIn',
    b: 'LinkedIn owns your profile, your audience, and the algorithm that decides who sees you. It can change the layout, the reach, or the rules whenever it wants. Your website is the one asset that is fully yours.',
  },
  {
    h: 'You lose deals silently',
    b: 'For every prospect who messages you, another looked you up, compared you to someone else, and quietly moved on. There is no lost-deal notification. A thin profile gives them no reason to choose you.',
  },
  {
    h: 'LinkedIn commoditizes you',
    b: 'The platform squeezes every consultant into the same fields. A headline, a bio, a list of roles. A website is the one place you can put the right proof, in the right order, for the right client.',
  },
]

export default function Page() {
  return (
    <ArticleShell
      slug={post.slug}
      titleNode={<>Do consultants need a website, even if <Accent>LinkedIn is working?</Accent></>}
      standfirst="Yes. And not for the reason most people think. A website is the one asset you own, and it is what turns the interest LinkedIn creates into trust."
    >
      {/* Intro, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <ALead>
          Yes. Even if LinkedIn brings you steady work, you need a website. Not for more leads. For two reasons LinkedIn
          can never cover. You do not own LinkedIn. And a website is what turns the interest LinkedIn creates into trust.
        </ALead>
        <AP>
          This is the most common objection we hear. All my clients come from referrals and LinkedIn, so why bother? It
          is a fair question. The honest answer is that you may be winning despite not having a site, not because you do
          not need one. Here are the three reasons it still matters.
        </AP>
      </Band>

      {/* Three reasons, cream feature cards */}
      <Band tone="cream" innerClassName="max-w-screen-xl mx-auto">
        <AH2>Three reasons it still <Accent>matters</Accent></AH2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {reasons.map((r) => (
            <FeatureCard key={r.h} title={r.h} body={r.b} />
          ))}
        </div>
      </Band>

      {/* Objection + skip, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>But my website will not bring <Accent>leads</Accent></AH2>
        <AP>
          Correct. And that is the wrong test. For a solo consultant, a website is not a lead machine. LinkedIn and
          referrals do that job. The website&rsquo;s job is to convert that interest into trust, and to give partners and
          podcasters a credible place to send people. We make the full case in{' '}
          <Link href="/blog/linkedin-vs-website-for-consultants" className={link}>LinkedIn vs your own website</Link>.
        </AP>
        <AH2>When can you genuinely <Accent>skip it</Accent>?</AH2>
        <ABullets
          items={[
            'You are fully booked through referrals and have no plan to grow or raise your rates.',
            'You are winding your practice down, not building it up.',
            'Every client comes through one relationship or platform you are happy to depend on.',
          ]}
        />
        <AP>
          For everyone else, a website is the difference between being considered and being chosen. To plan the site
          itself, start with{' '}
          <Link href="/consultant-websites" className={link}>the complete guide to consultant websites</Link>.
        </AP>
      </Band>

      {/* Key message, blue */}
      <Band tone="blue" className="py-16 md:py-20" innerClassName="max-w-screen-md mx-auto text-center">
        <p className="text-[clamp(22px,3vw,34px)] font-light leading-snug tracking-tight text-white">
          LinkedIn is a filter, not a foundation. It is where people find your name. Your website is where they decide
          you are <span className="font-serif italic">the one</span>.
        </p>
      </Band>
    </ArticleShell>
  )
}
