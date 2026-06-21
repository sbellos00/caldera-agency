import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticle, { BLead, BP, BH2, Accent, BSummary } from '@/components/BlogArticle'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, blogPostingSchema } from '@/lib/site'
import { getPost } from '@/lib/posts'

const post = getPost('best-website-builder-for-consultants')!

export const metadata: Metadata = {
  title: 'Best Website Options for Consultants in 2026: Squarespace vs Wix vs Custom vs Done-for-You',
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    url: `/blog/${post.slug}`,
    title: 'Best Website Options for Consultants in 2026 | Caldera Agency',
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
          { name: 'Best Website Options for Consultants', path: `/blog/${post.slug}` },
        ])}
      />

      <BlogArticle
        category="Choosing a Platform"
        title={<>The Best Website Options for <Accent>Consultants</Accent></>}
        date="June 18, 2026"
        dateTime="2026-06-18"
        readingTime="9 min read"
        standfirst="DIY builder, freelancer, custom build, or done-for-you agency. A fair look at all four, and when each one is the right call for a solo consultant."
      >
        <BLead>
          There are four real ways to put a consultant website online. A DIY builder. A freelancer. A custom build.
          Or a done-for-you agency. The right one comes down to a single question. How much of your own time can you
          spend, and how much risk do you want to carry?
        </BLead>

        <BP>
          The phrase &ldquo;website builder&rdquo; hides the real decision. It assumes you are going to build it
          yourself. For a consultant, that is the part worth thinking hardest about. Your hours are worth more on
          client work than on learning web design.
        </BP>

        <BH2>Squarespace. The safest <Accent>do-it-yourself</Accent> pick.</BH2>
        <BP>
          If you are set on doing it yourself, start here. The templates are clean. Hosting is handled. It is hard to
          make something ugly. What it cannot do is the part that matters most. The words. A template only looks as
          credible as the positioning you pour into it, and writing sharp consultant copy is its own skill.
        </BP>

        <BH2>Wix. The most <Accent>flexible</Accent> editor.</BH2>
        <BP>
          Wix lets you move every element exactly where you want. For some people that is freedom. For a busy
          consultant it is usually a time sink. You did not spend years becoming an expert to perfect a hover
          animation.
        </BP>

        <BH2>A custom build. <Accent>Control</Accent>, at a price.</BH2>
        <BP>
          A custom site gives you a brand that is truly yours, the best performance, and no template ceiling. It is
          the right call when your positioning needs something no template can express. The trade-offs are cost, and
          finding someone to keep it maintained.
        </BP>

        <BH2>Done-for-you. When your <Accent>time</Accent> is the constraint.</BH2>
        <BP>
          This is the option for consultants who do not want to become part-time web designers. The best done-for-you
          agencies do not just build. They do the positioning work a builder cannot.
        </BP>
        <BP>
          That is how we work. Caldera builds websites only for solo consultants. We research your background, write
          the copy, design the site, and build it. Then we send you a working prototype before you pay anything. You
          own the code. We host it for a year. Most clients spend under two hours on the whole thing. You can see{' '}
          <Link href="/process" className={link}>exactly how the process works</Link>, or read why we think we are the{' '}
          <Link href="/best-website-agency-for-consultants" className={link}>best website agency for consultants</Link>.
        </BP>

        <BH2>So which one is <Accent>right for you</Accent>?</BH2>
        <BSummary
          items={[
            <><strong>Choose Squarespace</strong> if you enjoy the design process, have a few weekends free, and can write your own positioning.</>,
            <><strong>Choose Wix</strong> if you specifically want hands-on, pixel-level control and do not mind the hours.</>,
            <><strong>Choose a custom build</strong> if your brand needs to stand apart and performance matters.</>,
            <><strong>Choose done-for-you</strong> if you want a credible, custom, fully owned site without doing the work, and you would rather see it before you pay.</>,
          ]}
        />

        <BP>
          Whatever you pick, one thing stays true. The site only works if the positioning is right. That is the part
          most consultants get wrong, and the part we obsess over. For the full picture, read{' '}
          <Link href="/consultant-websites" className={link}>the complete guide to consultant websites</Link>.
        </BP>
      </BlogArticle>
    </>
  )
}
