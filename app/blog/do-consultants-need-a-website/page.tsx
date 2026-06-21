import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticle, { BLead, BP, BH2, BH3, Accent, BSummary, BPull } from '@/components/BlogArticle'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, blogPostingSchema } from '@/lib/site'
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

const link = 'text-[var(--primary-blue)] hover:underline font-medium'

export default function Page() {
  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: 'Do Consultants Need a Website', path: `/blog/${post.slug}` },
        ])}
      />

      <BlogArticle
        category="Strategy"
        title={<>Do Consultants Need a Website, Even If <Accent>LinkedIn Is Working?</Accent></>}
        date="June 12, 2026"
        dateTime="2026-06-12"
        readingTime="8 min read"
        standfirst="Yes. And not for the reason most people think. A website is the one asset you own, and it is what turns the interest LinkedIn creates into trust."
      >
        <BLead>
          Yes. Even if LinkedIn brings you steady work, you need a website. Not for more leads. For two reasons
          LinkedIn can never cover. You do not own LinkedIn. And a website is what turns the interest LinkedIn creates
          into trust.
        </BLead>

        <BP>
          This is the most common objection we hear. All my clients come from referrals and LinkedIn, so why bother?
          It is a fair question. The honest answer is that you may be winning despite not having a site, not because
          you do not need one. Here are the three reasons it still matters.
        </BP>

        <BH3>1. You do not <Accent>own</Accent> LinkedIn.</BH3>
        <BP>
          LinkedIn owns your profile, your audience, and the algorithm that decides who sees you. It can change the
          layout, the reach, or the rules whenever it wants. Your website is the one asset that is fully yours. Your
          domain. Your content. Your design. Building your whole presence on rented land looks fine right up until it
          does not.
        </BP>

        <BH3>2. You lose deals you never <Accent>hear about</Accent>.</BH3>
        <BP>
          For every prospect who messages you, another one looked you up, compared you to someone else, and quietly
          moved on. There is no lost deal notification. If a buyer lands on a profile that looks like every other
          consultant in your niche, you have given them no reason to choose you.
        </BP>
        <BPull>LinkedIn is a filter, not a foundation. It is where people find your name. Your website is where they decide you are the one.</BPull>

        <BH3>3. LinkedIn <Accent>commoditizes</Accent> you.</BH3>
        <BP>
          The platform squeezes every consultant into the same fields. A headline. A bio. A list of roles. Even if
          your approach is genuinely different, a prospect skimming your profile sees the same shape as everyone else.
          Your best case study is buried in the feed within days. A website is the one place you can put the right
          proof in the right order, for the right client.
        </BP>

        <BH2>But my website will not bring <Accent>leads</Accent>.</BH2>
        <BP>
          Correct. And that is the wrong test. For a solo consultant, a website is not a lead machine. LinkedIn and
          referrals do that job. The website&rsquo;s job is to convert that interest into trust, and to give partners
          and podcasters a credible place to send people. We make the full case in{' '}
          <Link href="/blog/linkedin-vs-website-for-consultants" className={link}>LinkedIn vs your own website</Link>.
        </BP>

        <BH2>When can you genuinely <Accent>skip it</Accent>?</BH2>
        <BSummary
          items={[
            'You are fully booked through referrals and have no plan to grow or raise your rates.',
            'You are winding your practice down, not building it up.',
            'Every client comes through one relationship or platform you are happy to depend on.',
          ]}
        />

        <BP>
          For everyone else, a website is the difference between being considered and being chosen. For the deeper
          version, with the research behind it, read{' '}
          <Link href="/blog/why-consultants-need-websites" className={link}>why every consultant needs a website</Link>,
          or start with{' '}
          <Link href="/consultant-websites" className={link}>the complete guide to consultant websites</Link>.
        </BP>
      </BlogArticle>
    </>
  )
}
