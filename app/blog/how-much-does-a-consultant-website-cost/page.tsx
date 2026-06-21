import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { AAnswer, AH2, AP, ABullets, ACallout } from '@/components/ArticleLayout'
import { getPost } from '@/lib/posts'

const post = getPost('how-much-does-a-consultant-website-cost')!

export const metadata: Metadata = {
  title: 'How Much Does a Consultant Website Cost in 2026? An Honest Breakdown',
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    url: `/blog/${post.slug}`,
    title: 'How Much Does a Consultant Website Cost in 2026? | Caldera Agency',
    description: post.excerpt,
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
  },
}

export default function Page() {
  return (
    <ArticleLayout slug={post.slug}>
      <AAnswer>
        In 2026, a consultant website costs roughly $12–50/month if you build it yourself on a platform, $1,500–6,000
        for a capable freelancer, and $5,000–30,000+ for an agency. But the price tag of the build is the smallest part
        of the real cost — the expensive, valuable part is the positioning and the upkeep. Here is the honest breakdown.
      </AAnswer>

      <AP>
        Pricing for consultant websites looks chaotic because people quote wildly different numbers for what sounds
        like the same thing. The numbers differ because what you are actually buying differs. Let&rsquo;s separate the
        three cost layers no one explains.
      </AP>

      <AH2>Layer 1: the build (the part people quote)</AH2>
      <div className="overflow-x-auto rounded-2xl border border-[var(--gray-light)] my-6">
        <table className="w-full border-collapse text-left text-[14px] md:text-[15px] min-w-[540px]">
          <thead>
            <tr className="bg-[var(--cream)]">
              <th className="p-4 font-medium text-[var(--black)]">Route</th>
              <th className="p-4 font-medium text-[var(--black)]">Typical 2026 cost</th>
              <th className="p-4 font-medium text-[var(--black)]">What you&rsquo;re really paying for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">DIY builder</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">~$12–50 / month</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Software. Your time is the real cost.</td>
            </tr>
            <tr className="bg-[var(--cream)]/40">
              <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Freelancer</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">~$1,500–6,000 one-off</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Execution — usually not strategy or copy.</td>
            </tr>
            <tr className="bg-white">
              <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Agency</th>
              <td className="p-4 text-[var(--gray-medium)] align-top">~$5,000–30,000+</td>
              <td className="p-4 text-[var(--gray-medium)] align-top">Strategy, copy, design, build, support.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <AP>
        These are real, current ranges. Note how much they overlap with effort rather than quality: a $20/month
        builder can produce a great site if you are a great writer with time, and a $20,000 agency site can flop if the
        positioning is wrong.
      </AP>

      <AH2>Layer 2: positioning (the part that actually matters)</AH2>
      <ACallout>
        A beautiful website that says the wrong thing is worthless. A plain website with razor-sharp positioning wins
        work. The positioning is the product.
      </ACallout>
      <AP>
        This is the cost almost no one budgets for, because it doesn&rsquo;t show up on an invoice. Figuring out the
        single problem you are known for solving, the specific client you serve, and the proof that backs it up is hard,
        and it is the difference between a site that converts and a digital business card. When you compare quotes, ask
        what is included here — not how many pages you get.
      </AP>

      <AH2>Layer 3: upkeep (the part people forget)</AH2>
      <ABullets
        items={[
          'Hosting, domain, and SSL — small but ongoing.',
          'Maintenance and the occasional content update as your services or proof change.',
          'Your own time managing all of the above, which is the cost DIY hides.',
        ]}
      />
      <AP>
        A site that goes stale stops working. Whoever builds it, plan for who keeps it current.
      </AP>

      <AH2>How to buy a consultant website without taking on risk</AH2>
      <AP>
        The biggest hidden cost in any of these routes is paying before you know whether the result will be any good.
        The way to remove that risk is to see real work before money changes hands and to pay in stages you control.
      </AP>
      <AP>
        That is how Caldera is structured: you start from a free working prototype of your actual site — built from
        your LinkedIn, before you pay anything — and payment is milestone-based, so you approve each phase and the final
        payment is due only when you are ready to launch. You also get full code ownership and a year of hosting
        included, which folds Layer 3 into the deal.
      </AP>
      <AP>
        For the wider decision of which route fits you, see{' '}
        <Link href="/blog/best-website-builder-for-consultants" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          best website options for consultants
        </Link>{' '}
        and the{' '}
        <Link href="/consultant-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
          complete guide to consultant websites
        </Link>.
      </AP>
    </ArticleLayout>
  )
}
