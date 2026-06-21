import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleShell from '@/components/ArticleShell'
import { Band, Accent, ALead, AP, AH2, ABullets, FeatureCard } from '@/components/blocks'
import { getPost } from '@/lib/posts'

const post = getPost('best-website-builder-for-consultants')!
const link = 'text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)] font-medium'

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

const options = [
  {
    h: 'Squarespace',
    b: 'The safest do-it-yourself pick. The templates are clean, hosting is handled, and it is hard to make something ugly. What it cannot do is the part that matters most: the words. A template only looks as credible as the positioning you pour into it.',
  },
  {
    h: 'Wix',
    b: 'The most flexible editor. It lets you move every element exactly where you want. For some people that is freedom. For a busy consultant it is usually a time sink. You did not spend years becoming an expert to perfect a hover animation.',
  },
  {
    h: 'A custom build',
    b: 'Control, at a price. A custom site gives you a brand that is truly yours, the best performance, and no template ceiling. The trade-offs are cost, and finding someone to keep it maintained.',
  },
  {
    h: 'Done-for-you',
    b: 'For consultants who do not want to become part-time web designers. The best done-for-you agencies do not just build the site. They do the positioning work a builder cannot.',
  },
]

export default function Page() {
  return (
    <ArticleShell
      slug={post.slug}
      titleNode={<>The best website options for <Accent>consultants</Accent></>}
      standfirst="DIY builder, freelancer, custom build, or done-for-you agency. A fair look at all four, and when each one is the right call for a solo consultant."
    >
      {/* Intro, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <ALead>
          There are four real ways to put a consultant website online. A DIY builder. A freelancer. A custom build. Or
          a done-for-you agency. The right one comes down to a single question. How much of your own time can you spend,
          and how much risk do you want to carry?
        </ALead>
        <AP>
          The phrase &ldquo;website builder&rdquo; hides the real decision. It assumes you are going to build it
          yourself. For a consultant, that is the part worth thinking hardest about. Your hours are worth more on client
          work than on learning web design.
        </AP>
      </Band>

      {/* Four options, cream feature cards */}
      <Band tone="cream" innerClassName="max-w-screen-xl mx-auto">
        <AH2>The four real <Accent>options</Accent></AH2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {options.map((o) => (
            <FeatureCard key={o.h} title={o.h} body={o.b} />
          ))}
        </div>
      </Band>

      {/* Which to choose, white */}
      <Band tone="white" innerClassName="max-w-screen-md mx-auto">
        <AH2>So which one is <Accent>right for you</Accent>?</AH2>
        <ABullets
          items={[
            <><strong className="font-medium text-[var(--black)]">Choose Squarespace</strong> if you enjoy the design process, have a few weekends free, and can write your own positioning.</>,
            <><strong className="font-medium text-[var(--black)]">Choose Wix</strong> if you specifically want hands-on, pixel-level control and do not mind the hours.</>,
            <><strong className="font-medium text-[var(--black)]">Choose a custom build</strong> if your brand needs to stand apart and performance matters.</>,
            <><strong className="font-medium text-[var(--black)]">Choose done-for-you</strong> if you want a credible, custom, fully owned site without doing the work, and you would rather see it before you pay.</>,
          ]}
        />
        <AP>
          That last option is how we work. Caldera builds websites only for solo consultants. We research your
          background, write the copy, and design and build a fully custom site around your vision, then send you a
          working prototype before you pay anything. However complex or animation-heavy what you picture is, we build
          it. You can see <Link href="/process" className={link}>how the process works</Link> or read why we are the{' '}
          <Link href="/best-website-agency-for-consultants" className={link}>best website agency for consultants</Link>.
        </AP>
      </Band>

      {/* Key message, blue */}
      <Band tone="blue" className="py-16 md:py-20" innerClassName="max-w-screen-md mx-auto text-center">
        <p className="text-[clamp(22px,3vw,34px)] font-light leading-snug tracking-tight text-white">
          Whatever you pick, the site only works if the <span className="font-serif italic">positioning</span> is right.
        </p>
        <p className="text-white/70 mt-5 leading-relaxed">
          That is the part most consultants get wrong, and the part we obsess over. For the full picture, read{' '}
          <Link href="/consultant-websites" className="text-white underline underline-offset-4">the complete guide to consultant websites</Link>.
        </p>
      </Band>
    </ArticleShell>
  )
}
