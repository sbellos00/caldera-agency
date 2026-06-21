import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticle, { BLead, BP, BH2, Accent, BKeyMessage } from '@/components/BlogArticle'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, blogPostingSchema } from '@/lib/site'
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

const link = 'text-[var(--primary-blue)] hover:underline font-medium'

export default function Page() {
  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: 'LinkedIn vs Your Own Website', path: `/blog/${post.slug}` },
        ])}
      />

      <BlogArticle
        category="Strategy"
        title={<>LinkedIn vs Your Own Website. What Every Consultant Should <Accent>Know.</Accent></>}
        date="May 28, 2026"
        dateTime="2026-05-28"
        readingTime="9 min read"
        standfirst="LinkedIn makes you visible. Your website makes you credible. Here is how the two actually work together for an independent consultant."
      >
        <BLead>
          LinkedIn and a website are not rivals. They are two halves of one system. LinkedIn is where buyers find your
          name. Your website is where they decide you are worth hiring. You need both. Use one without the other and
          you leave money on the table.
        </BLead>

        <BP>
          Consultants often treat this as a choice. Should I invest in LinkedIn, or build a site? That framing is the
          mistake. They do different jobs. The strongest practices run them together.
        </BP>

        <BH2>What LinkedIn does <Accent>better</Accent> than any website.</BH2>
        <BP>
          Distribution. LinkedIn puts you in front of people who were not looking for you. It keeps you top of mind.
          It makes warm outreach normal. No website matches its reach for a solo consultant. If leads and referrals
          come through LinkedIn, that is the system working. Keep doing it.
        </BP>

        <BH2>What a website does that LinkedIn <Accent>never will</Accent>.</BH2>
        <BP>
          Control and credibility. On your own site you choose the layout, the order of the story, and the proof. You
          can publish a real case study instead of a post that vanishes in two days. You own it outright, so no
          algorithm change can erase it. And you give partners, journalists, and event hosts a professional place to
          link. A LinkedIn URL rarely carries the same weight in a byline.
        </BP>

        <BKeyMessage>LinkedIn makes you visible. Your website makes you credible.</BKeyMessage>

        <BH2>How they <Accent>work together</Accent>.</BH2>
        <BP>
          Picture the buyer&rsquo;s path. They see your name in a feed, a comment, or a referral. That is LinkedIn
          doing discovery. Then, almost every time, they check you out before they reply. If that check lands on a thin
          profile, the momentum dies. If it lands on a site that says who you help and proves you have done it, the
          conversation starts. LinkedIn opens the door. Your website is what makes them walk through it.
        </BP>

        <BH2>What to <Accent>do about it</Accent>.</BH2>
        <BP>
          Keep investing in LinkedIn for reach. Build a focused website to convert that reach into trust. Then link
          the two. A clear site URL on your profile, and your best proof living on the site instead of buried in old
          posts. That is the whole system. Neither half is optional if you compete for serious, considered work.
        </BP>

        <BP>
          For the longer argument, read{' '}
          <Link href="/blog/why-consultants-need-websites" className={link}>why every consultant needs a website</Link>.
          If you are still deciding whether it is worth it, see{' '}
          <Link href="/blog/do-consultants-need-a-website" className={link}>do consultants need a website</Link>. To
          plan the site itself, use{' '}
          <Link href="/consultant-websites" className={link}>the complete guide to consultant websites</Link>.
        </BP>
      </BlogArticle>
    </>
  )
}
