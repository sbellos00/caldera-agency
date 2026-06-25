import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '@/components/ArticleShell'
import { Band, Accent, ALead, AP, AH2, FeatureCard } from '@/components/blocks'
import { getPost } from '@/lib/posts'

const post = getPost('linkedin-vs-website-for-consultants')!
const link = 'text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)] font-medium'

export const metadata: Metadata = {
  title: 'LinkedIn vs Your Own Website: What Every Consultant Should Know',
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    url: `/blog/${post.slug}`,
    title: 'LinkedIn vs Your Own Website for Consultants | Caldera Agency',
    description: post.excerpt,
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
  },
}

export default function Page() {
  return (
    <ArticleShell
      slug={post.slug}
      titleNode={<>LinkedIn vs your own website. What every consultant should <Accent>know.</Accent></>}
      standfirst="LinkedIn makes you visible. Your website makes you credible. Here is how the two actually work together for an independent consultant."
    >
      {/* Intro, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <ALead>
          LinkedIn and a website are not rivals. They are two halves of one system. LinkedIn is where buyers find your
          name. Your website is where they decide you are worth hiring. You need both. Use one without the other and you
          leave money on the table.
        </ALead>
        <AP>
          Consultants often treat this as a choice. Should I invest in LinkedIn, or build a site? That framing is the
          mistake. They do different jobs. The strongest practices run them together.
        </AP>
      </Band>

      {/* Two roles, cream feature cards */}
      <Band tone="cream" innerClassName="max-w-screen-xl mx-auto">
        <AH2>Two jobs, <Accent>one system</Accent></AH2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <FeatureCard
            title="What LinkedIn does best"
            body="Distribution. LinkedIn puts you in front of people who were not looking for you. It keeps you top of mind and makes warm outreach normal. No website matches its reach for a solo consultant. If leads come through LinkedIn, that is the system working. Keep doing it."
          />
          <FeatureCard
            title="What a website does that LinkedIn never will"
            body="Control and credibility. You choose the layout, the order of the story, and the proof. You can publish a real case study instead of a post that vanishes in two days. You control it completely, and you give partners and journalists a professional place to link."
          />
        </div>
      </Band>

      {/* Key message, blue */}
      <Band tone="blue" className="py-16 md:py-20" innerClassName="max-w-screen-md mx-auto text-center">
        <p className="text-[clamp(22px,3vw,34px)] font-light leading-snug tracking-tight text-white">
          LinkedIn makes you <span className="font-serif italic">visible</span>. Your website makes you{' '}
          <span className="font-serif italic">credible</span>.
        </p>
      </Band>

      {/* How they work together, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>How they <Accent>work together</Accent></AH2>
        <AP>
          Picture the buyer&rsquo;s path. They see your name in a feed, a comment, or a referral. That is LinkedIn doing
          discovery. Then, almost every time, they check you out before they reply. If that check lands on a thin
          profile, the momentum dies. If it lands on a site that says who you help and proves you have done it, the
          conversation starts. LinkedIn opens the door. Your website is what makes them walk through it.
        </AP>
        <AH2>What to <Accent>do about it</Accent></AH2>
        <AP>
          Keep investing in LinkedIn for reach. Build a focused website to convert that reach into trust. Then link the
          two. A clear site URL on your profile, and your best proof living on the site instead of buried in old posts.
          That is the whole system. Neither half is optional if you compete for serious, considered work.
        </AP>
        <AP>
          When you are ready, see the{' '}
          <Link href="/work" className={link}>case studies</Link>, or read why we are the{' '}
          <Link href="/best-website-agency-for-consultants" className={link}>best website agency for consultants</Link>.
        </AP>
      </Band>
    </ArticleShell>
  )
}
