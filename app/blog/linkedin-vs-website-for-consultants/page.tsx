import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { AAnswer, AH2, AP, ACallout } from '@/components/ArticleLayout'
import { getPost } from '@/lib/posts'

const post = getPost('linkedin-vs-website-for-consultants')!

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
    <ArticleLayout slug={post.slug}>
      <AAnswer>
        LinkedIn and a website are not competitors — they are two halves of one system. LinkedIn is the best discovery
        channel in consulting: it is where buyers find your name. Your website is where they decide you are credible
        enough to hire. You need both, and using one without the other leaves money on the table. Here is exactly how
        they divide the work.
      </AAnswer>

      <AP>
        Consultants often frame this as an either/or — &ldquo;should I invest in LinkedIn or build a site?&rdquo; That
        framing is the mistake. They do different jobs, and the strongest practices run them together. Let&rsquo;s look
        at what each is genuinely good at, and where each one fails you alone.
      </AP>

      <AH2>What LinkedIn does better than any website</AH2>
      <AP>
        Distribution. LinkedIn puts you in front of people who were not looking for you, lets you stay top-of-mind with
        your network, and makes warm outreach normal. No website matches its reach for a solo consultant. If you are
        getting leads and referrals through LinkedIn, that is the system working exactly as it should — keep doing it.
      </AP>

      <AH2>What a website does that LinkedIn never will</AH2>
      <AP>
        Control and credibility. On your own site you choose the layout, the narrative order, and the proof. You can
        publish a real case study instead of a post that vanishes in two days. You own the asset outright, so no
        algorithm change can erase it. And you give partners, journalists, and event organizers a professional place to
        link — a LinkedIn URL rarely carries the same weight in a byline or show notes.
      </AP>
      <ACallout>
        LinkedIn makes you visible. Your website makes you credible. Visibility without credibility is just traffic
        that doesn&rsquo;t convert.
      </ACallout>

      <AH2>The handoff: how they work together</AH2>
      <AP>
        Picture the buyer&rsquo;s path. They see your name in a feed, a comment, or a referral message — that&rsquo;s
        LinkedIn doing discovery. Then, almost every time, they check you out properly before replying. If that check
        lands on a thin profile identical to your competitors&rsquo;, the momentum dies. If it lands on a site that
        clearly states who you help and proves you have done it, the conversation starts. LinkedIn opens the door; the
        website is what makes them walk through it.
      </AP>

      <AH2>What this means in practice</AH2>
      <AP>
        Keep investing in LinkedIn for reach — it is your engine for being found. Build a focused website to convert
        that reach into trust, and link the two: a clear site URL in your LinkedIn profile, and your best proof living
        on the site rather than buried in old posts. That is the whole system. Neither half is optional if you are
        competing for considered, premium work.
      </AP>
      <AP>
        For the deeper version of this argument, with the research behind it, read{' '}
        <Link href="/blog/why-consultants-need-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          why every consultant needs a website
        </Link>. If you are weighing whether it is worth it at all, see{' '}
        <Link href="/blog/do-consultants-need-a-website" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          do consultants need a website
        </Link>, and to plan the site itself, the{' '}
        <Link href="/consultant-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          complete guide to consultant websites
        </Link>.
      </AP>
    </ArticleLayout>
  )
}
