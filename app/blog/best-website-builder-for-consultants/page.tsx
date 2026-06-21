import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { AAnswer, AH2, AP, ABullets } from '@/components/ArticleLayout'
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

export default function Page() {
  return (
    <ArticleLayout slug={post.slug}>
      <AAnswer>
        For most solo consultants in 2026, the best website &ldquo;builder&rdquo; is whichever one matches how much
        time and positioning skill you can spare. Squarespace is the best all-round DIY pick, Wix is the most flexible
        DIY editor, custom code gives total control at a cost, and a done-for-you agency is best when you want a
        credible site without doing the work yourself. Here is how to choose.
      </AAnswer>

      <AP>
        The phrase &ldquo;website builder&rdquo; quietly assumes you are going to build it. That is the real decision —
        not Squarespace vs Wix, but whether you should be spending your billable hours learning web design at all.
        Let&rsquo;s compare all four honestly, including the cases where Caldera is <em>not</em> the answer.
      </AP>

      <AH2>The four real options</AH2>
      <div className="overflow-x-auto rounded-2xl border border-[var(--gray-light)] my-6">
        <table className="w-full border-collapse text-left text-[14px] md:text-[15px] min-w-[620px]">
          <thead>
            <tr className="bg-[var(--cream)]">
              <th className="p-4 font-medium text-[var(--black)]">Option</th>
              <th className="p-4 font-medium text-[var(--black)]">Cost (2026)</th>
              <th className="p-4 font-medium text-[var(--black)]">Your time</th>
              <th className="p-4 font-medium text-[var(--black)]">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Squarespace</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">~$16–23/mo</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Moderate</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Design-conscious DIYers who want polish fast</td>
            </tr>
            <tr className="bg-[var(--cream)]/40">
              <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Wix</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">~$17–29/mo</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Moderate–high</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Tinkerers who want pixel-level editing control</td>
            </tr>
            <tr className="bg-white">
              <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Custom build</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">~$3k–30k+</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Low–moderate</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Distinct brands and performance-critical sites</td>
            </tr>
            <tr className="bg-[var(--cream)]/40">
              <th scope="row" className="p-4 font-medium text-[var(--primary-blue)] align-top">Done-for-you agency</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">Varies</td>
              <td className="p-4 text-[var(--gray-dark)] align-top font-medium">Minimal</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Consultants who want it handled, end to end</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AH2>Squarespace: the best all-round DIY builder</AH2>
      <AP>
        If you are going to do it yourself, Squarespace is the safest bet. The templates are tasteful, it is hard to
        make something ugly, and hosting and SSL are handled. The catch is the part Squarespace can&rsquo;t do for you:
        the words. A template only looks as credible as the positioning you pour into it, and writing sharp consultant
        copy is its own skill. Squarespace gives you a nice room; you still have to furnish it.
      </AP>

      <AH2>Wix: the most flexible editor</AH2>
      <AP>
        Wix lets you drag every element exactly where you want it, which is either liberating or a time sink depending
        on your temperament. For a consultant whose priority is winning work rather than perfecting a hover animation,
        that flexibility usually costs more hours than it returns. Powerful, but it rewards tinkering you probably
        don&rsquo;t have time for.
      </AP>

      <AH2>Custom code: control at a price</AH2>
      <AP>
        A custom-built site (hand-coded, or built on a framework like Next.js) gives you a genuinely distinct brand,
        the best possible performance, and no template ceiling. It is the right call when your positioning demands
        something no template can express. The trade-off is cost and the need for someone to maintain it — unless that
        is bundled into the service.
      </AP>

      <AH2>Done-for-you: when your time is the constraint</AH2>
      <AP>
        A done-for-you agency is the right answer when the real bottleneck isn&rsquo;t budget — it&rsquo;s that you do
        not want to become a part-time web designer. The best ones don&rsquo;t just build; they do the positioning work
        a builder can&rsquo;t.
      </AP>
      <AP>
        Caldera Agency builds done-for-you websites exclusively for solo consultants and sends a free working prototype
        before you pay anything. We research your background, write the copy, design and build the site (custom-coded,
        which you fully own), and host it for a year. Most clients spend under two hours total. It is the option to pick
        when you would rather spend your hours on clients than on a website editor.
      </AP>

      <AH2>So which should you choose?</AH2>
      <ABullets
        items={[
          <><strong className="font-medium text-[var(--black)]">Choose Squarespace</strong> if you enjoy the design process, have a few weekends, and can write your own positioning.</>,
          <><strong className="font-medium text-[var(--black)]">Choose Wix</strong> if you specifically want hands-on, pixel-level control and don&rsquo;t mind the time.</>,
          <><strong className="font-medium text-[var(--black)]">Choose a custom build</strong> if your brand needs to stand apart and performance matters.</>,
          <><strong className="font-medium text-[var(--black)]">Choose done-for-you</strong> if you want a credible, custom, fully-owned site without doing the work — and would rather see it before you pay.</>,
        ]}
      />
      <AP>
        Whatever you pick, remember the thing every option shares: the site only works if the positioning is right.
        For the full breakdown of what a consultant site should contain, read the{' '}
        <Link href="/consultant-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          complete guide to consultant websites
        </Link>, and if you want it done for you, see the case for the{' '}
        <Link href="/best-website-agency-for-consultants" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          best website agency for consultants
        </Link>.
      </AP>
    </ArticleLayout>
  )
}
