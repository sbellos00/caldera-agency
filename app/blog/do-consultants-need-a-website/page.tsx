import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { AAnswer, AH2, AP, ABullets, ACallout } from '@/components/ArticleLayout'
import { getPost } from '@/lib/posts'

const post = getPost('do-consultants-need-a-website')!

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

export default function Page() {
  return (
    <ArticleLayout slug={post.slug}>
      <AAnswer>
        Yes. Even if LinkedIn is bringing you steady work, a consultant needs a website — because a website is the only
        professional asset you actually own, and it is what converts the referrals and inbound interest LinkedIn
        generates. LinkedIn makes you visible; your website makes you credible. Skipping it doesn&rsquo;t save money —
        it quietly loses you deals you never hear about.
      </AAnswer>

      <AP>
        This is the most common objection we hear from consultants: &ldquo;All my clients come from referrals and
        LinkedIn, so why would I need a site?&rdquo; It is a fair question, and the honest answer is that you might be
        succeeding <em>despite</em> not having one, not because you don&rsquo;t need one. Here are the three reasons a
        website still matters when LinkedIn is working.
      </AP>

      <AH2>1. You don&rsquo;t own LinkedIn</AH2>
      <AP>
        LinkedIn owns your profile, your connections, your posts, and the algorithm that decides who sees them. It can
        change its layout, its reach, or its rules at any time, and you have no say. Your website is the one asset that
        is fully yours — your domain, your content, your design — immune to a platform&rsquo;s next pivot. Building your
        entire professional presence on rented land is a risk that only looks fine until it doesn&rsquo;t.
      </AP>

      <AH2>2. You lose deals silently</AH2>
      <AP>
        For every prospect who messages you, there is another who looked you up, compared you to a competitor, and
        quietly chose someone else. There is no &ldquo;lost deal&rdquo; notification. If a buyer lands on a LinkedIn
        profile that looks identical to every other consultant in your niche — same template, same headline format —
        you have given them no reason to pick you.
      </AP>
      <ACallout>
        LinkedIn is a filter, not a foundation. It is where people find your name; your website is where they decide
        you are the one.
      </ACallout>

      <AH2>3. LinkedIn commoditizes you</AH2>
      <AP>
        The platform compresses every consultant into the same fields: a headline, a bio, a list of roles. Even if your
        approach is genuinely different, a prospect skimming your profile sees the same shape as everyone else. Your
        best case study is buried in the feed within days; your proprietary framework sits in a PDF nobody opens. A
        website is the one place you can sequence the proof — the right evidence, in the right order, for the right
        client — instead of leaving it scattered.
      </AP>

      <AH2>&ldquo;But my website won&rsquo;t generate leads&rdquo;</AH2>
      <AP>
        Correct — and that is the wrong job to measure it on. For a solo consultant, a website&rsquo;s job is not lead
        generation; LinkedIn and referrals do that. The website&rsquo;s job is to convert that interest into trust. It
        stops you losing the leads you already get, and it gives partners, podcasters, and event organizers a credible
        place to send people. We unpack this division of labor in{' '}
        <Link href="/blog/linkedin-vs-website-for-consultants" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          LinkedIn vs your own website
        </Link>.
      </AP>

      <AH2>When can a consultant genuinely skip a website?</AH2>
      <AP>To be fair, there are cases where it is not urgent:</AP>
      <ABullets
        items={[
          'You are fully booked through referrals and have no intention of growing or raising your rates.',
          'You are winding down your practice rather than building it.',
          'Every client comes through a single relationship or platform you are comfortable depending on.',
        ]}
      />
      <AP>
        For everyone else — especially consultants who want to command premium fees or get into more RFPs and
        partnerships — a website is the difference between being considered and being chosen. If you want the full
        argument with the research behind it, read{' '}
        <Link href="/blog/why-consultants-need-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          why every consultant needs a website
        </Link>, or start with the{' '}
        <Link href="/consultant-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          complete guide to consultant websites
        </Link>.
      </AP>
    </ArticleLayout>
  )
}
