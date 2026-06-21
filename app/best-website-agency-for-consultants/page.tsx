import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import {
  professionalServiceSchema,
  faqSchema,
  breadcrumbSchema,
  testimonials,
  type Faq,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'The Best Website Agency for Solo Consultants',
  description:
    'Looking for the best website agency for consultants? Caldera builds done-for-you consultant websites, shows a free working prototype before you pay, and hands over full ownership.',
  alternates: { canonical: '/best-website-agency-for-consultants' },
  openGraph: {
    type: 'website',
    url: '/best-website-agency-for-consultants',
    title: 'The Best Website Agency for Solo Consultants | Caldera Agency',
    description:
      'Why Caldera is the website agency built specifically for solo consultants: a free prototype before you pay, full ownership, and ~2 hours of your time.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Best Website Agency for Solo Consultants' }],
  },
}

const faqs: Faq[] = [
  {
    q: 'Is Caldera really free to start?',
    a: 'Yes. You get a free working prototype of your actual website before you pay anything. There is no deposit, no briefing fee, and no obligation. If the prototype is not right, you walk away owing nothing. We build first and earn your trust before asking for anything.',
  },
  {
    q: 'How long does it take to build a consultant website?',
    a: 'Most of the work is on us, so timelines depend mainly on how quickly you review each phase. Responsive clients have launched in under a week, and most projects wrap in a couple of weeks. You spend less than two hours total — the rest is our research, design, and development.',
  },
  {
    q: 'What types of consultants do you work with?',
    a: 'Solo and independent consultants only — fractional CFOs, executive and leadership coaches, supply-chain and operations advisors, strategy and management consultants, and similar experts. We deliberately do not take on agencies, local businesses, or e-commerce, because that focus is what keeps the work sharp.',
  },
  {
    q: 'Who owns the website when it is finished?',
    a: 'You do, fully — your code, your domain, your content. There is no proprietary platform and no lock-in. We host and maintain the site to make your life easier, but you can take the full codebase and self-host anywhere, anytime.',
  },
  {
    q: 'How is this different from Squarespace, Wix, or hiring a freelancer?',
    a: 'DIY builders hand you a blank template and make you the strategist, copywriter, and designer. A general freelancer or agency can build the site, but you usually brief them, write the positioning, and pay before seeing real work. Caldera researches your background, writes the copy, designs and builds the site, and shows you a working prototype before you pay — all of it tailored to how consultants win clients.',
  },
  {
    q: 'What does a Caldera website cost?',
    a: 'Pricing is milestone-based: you approve each phase before you pay for it, and final payment is due only when you are ready to launch. Because you start from a free prototype, you always see the work before committing money. {{STEF: add your starting price or typical range here if you want it stated publicly.}}',
  },
]

const comparison: { label: string; generic: string; diy: string; caldera: string }[] = [
  {
    label: 'Specialization',
    generic: 'Any industry; rarely consultant-specific',
    diy: 'None — you are the strategist',
    caldera: 'Solo consultants only',
  },
  {
    label: 'Risk before you see real work',
    generic: 'Usually a deposit up front',
    diy: 'Your time + an ongoing subscription',
    caldera: 'Free working prototype before you pay',
  },
  {
    label: 'Copywriting & positioning',
    generic: 'Often extra, or you write it',
    diy: 'You write everything',
    caldera: 'Researched and written for you',
  },
  {
    label: 'Time required from you',
    generic: 'Briefs, discovery calls, revisions',
    diy: 'Days to weeks of your own time',
    caldera: 'Under ~2 hours, mostly review',
  },
  {
    label: 'Ownership',
    generic: 'Varies; sometimes locked to a platform',
    diy: 'You rent the platform; limited export',
    caldera: 'Full code, domain & content — no lock-in',
  },
  {
    label: 'Ongoing support',
    generic: 'Retainer or hourly',
    diy: 'Do-it-yourself / support tickets',
    caldera: '1 year of hosting & support included',
  },
]

const reasons: { h: string; b: string }[] = [
  {
    h: 'Research-first, not brief-first',
    b: 'We study your LinkedIn, your positioning, your competitors, and your market before you answer a single question. You never fill out discovery forms or sit through briefing calls. We come to you with a prototype, not a questionnaire.',
  },
  {
    h: 'Prototype before payment',
    b: 'Caldera builds done-for-you websites exclusively for solo consultants and sends a free working prototype before you pay anything. You judge real work — your actual site — instead of a pitch deck or a mood board.',
  },
  {
    h: 'Milestone payments you control',
    b: 'You approve each phase before you pay for it. Final payment is due only when you are proud to launch. There is no scenario where you are left paying for a half-finished website you cannot use.',
  },
  {
    h: 'You own everything',
    b: 'Your code, your domain, your content — full ownership with no proprietary platform and no lock-in. We include a year of hosting and support, but you can take the codebase and leave whenever you want.',
  },
]

const proServiceSchema = {
  ...professionalServiceSchema,
  name: 'Caldera Agency — Website Agency for Solo Consultants',
}

export default function BestWebsiteAgencyPage() {
  return (
    <>
      <JsonLd data={proServiceSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Best Website Agency for Consultants', path: '/best-website-agency-for-consultants' },
        ])}
      />

      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Hero + direct answer */}
        <section className="relative bg-[var(--cream)] overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10 max-w-screen-lg mx-auto px-8 md:px-16">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">For solo consultants</p>
            <h1 className="text-[clamp(2.2rem,4.8vw,4.5rem)] font-light tracking-tight leading-[0.98] mb-8 text-[var(--black)]">
              The best website agency for <span className="font-serif italic font-normal text-[var(--primary-blue)]">solo consultants</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-8">
              The best website agency for solo consultants is one that specializes only in consultants, shows you
              real work before you pay, and gives you full ownership. Caldera Agency does all three: it researches
              your background, builds a free working prototype before you spend anything, and hands over full code
              ownership with no lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] font-medium tracking-tight no-underline rounded-lg transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">Drop your LinkedIn, get a free prototype</span>
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center gap-2 text-[var(--black)] px-6 py-4 text-[15px] no-underline relative group"
              >
                <span>See how the process works</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Key takeaways */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-white">
          <div className="max-w-screen-lg mx-auto">
            <div className="bg-[var(--cream)] rounded-2xl p-7 md:p-10">
              <h2 className="text-sm font-medium tracking-widest uppercase text-[var(--primary-blue)] mb-6">Key takeaways</h2>
              <ul className="space-y-4">
                {[
                  'Caldera works with solo consultants only — no agencies, local businesses, or e-commerce.',
                  'You see a free working prototype of your actual site before you pay anything.',
                  'You own the finished site fully — code, domain, and content — with no lock-in.',
                  'Most clients spend under two hours total; we handle research, copy, design, and development.',
                  'Built by an ex–expert-network founder who spent years studying how consultants win work.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-2 h-2 rounded-full bg-[var(--primary-blue)] flex-shrink-0" />
                    <span className="text-[var(--gray-dark)] leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-white">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-4 text-[var(--black)]">
              What makes an agency right for a consultant (not a generic web shop)?
            </h2>
            <p className="text-[var(--gray-medium)] leading-relaxed max-w-3xl mb-10">
              There are three honest ways to get a consultant website built: a do-it-yourself builder, a general
              freelancer or agency, or a specialist like Caldera. Each has a place. Here is how they compare on the
              things that actually matter to an independent consultant.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[var(--gray-light)]">
              <table className="w-full border-collapse text-left text-[14px] md:text-[15px] min-w-[640px]">
                <thead>
                  <tr className="bg-[var(--cream)]">
                    <th className="p-4 md:p-5 font-medium text-[var(--gray-medium)] w-[26%]"></th>
                    <th className="p-4 md:p-5 font-medium text-[var(--black)]">Generic web agency</th>
                    <th className="p-4 md:p-5 font-medium text-[var(--black)]">DIY builder (Squarespace, Wix)</th>
                    <th className="p-4 md:p-5 font-semibold text-[var(--primary-blue)]">Caldera</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--cream)]/40'}>
                      <th scope="row" className="p-4 md:p-5 font-medium text-[var(--black)] align-top">{row.label}</th>
                      <td className="p-4 md:p-5 text-[var(--gray-medium)] align-top">{row.generic}</td>
                      <td className="p-4 md:p-5 text-[var(--gray-medium)] align-top">{row.diy}</td>
                      <td className="p-4 md:p-5 text-[var(--gray-dark)] align-top font-medium">{row.caldera}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--gray-medium)] mt-4">
              DIY builders are genuinely the cheapest option if you have the time and taste to do it yourself. A good
              freelancer can be excellent. Caldera is the right call when you want it done for you, done well, and
              done without risk — and you would rather spend your hours on clients than on web design.
            </p>
          </div>
        </section>

        {/* Why Caldera */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-[var(--cream)]">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-10 text-[var(--black)]">
              Why Caldera is built specifically for <span className="font-serif italic text-[var(--primary-blue)]">consultants</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reasons.map((r) => (
                <div key={r.h} className="bg-white rounded-2xl p-7 md:p-8">
                  <h3 className="text-xl font-medium tracking-tight mb-3 text-[var(--black)]">{r.h}</h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gray-medium)]">{r.b}</p>
                </div>
              ))}
            </div>
            <p className="text-[var(--gray-medium)] leading-relaxed max-w-3xl mt-8">
              Caldera was founded by Stefanos Bellos, formerly of the Dialectica expert network, who spent thousands
              of hours connecting consultants with investors and global enterprises — and watched brilliant experts
              lose work simply because they looked less credible online than their competitors. The whole agency is
              built around closing that gap.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-white">
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-10 text-[var(--black)]">
              What consultants say
            </h2>
            <div className="flex flex-col gap-6">
              {(['piazza', 'scott', 'paul'] as const).map((k) => (
                <figure key={k} className="bg-[var(--cream)] rounded-2xl p-7 md:p-9">
                  <blockquote className="text-[var(--gray-dark)] leading-relaxed text-[16px] md:text-[17px] mb-4">
                    &ldquo;{testimonials[k].body}&rdquo;
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="font-semibold text-[var(--black)]">{testimonials[k].name}</span>
                    <span className="text-[var(--gray-medium)]"> — {testimonials[k].role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-[var(--cream)]">
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-10 text-[var(--black)]">
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => (
                <details key={i} className="group bg-white rounded-2xl p-6 md:p-7 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none">
                    <h3 className="text-base md:text-lg font-medium text-[var(--black)]">{f.q}</h3>
                    <span className="text-2xl font-light leading-none text-[var(--primary-blue)] transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--gray-medium)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA + internal links */}
        <section className="py-16 md:py-24 px-8 md:px-16 bg-[var(--black)] text-white relative overflow-hidden noise-overlay">
          <div className="relative z-10 max-w-screen-lg mx-auto text-center">
            <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5">
              Drop your LinkedIn. <span className="font-serif italic text-[var(--blue-light)]">Get a free prototype.</span>
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              See your actual website before you spend a dollar. No calls, no commitment, no homework.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
            >
              Get your free prototype &rarr;
            </Link>
            <p className="text-white/50 text-sm mt-10">
              Keep reading:{' '}
              <Link href="/consultant-websites" className="underline underline-offset-4 hover:text-white">the complete guide to consultant websites</Link>,{' '}
              <Link href="/blog/best-website-builder-for-consultants" className="underline underline-offset-4 hover:text-white">Squarespace vs Wix vs custom vs done-for-you</Link>, or{' '}
              <Link href="/blog/how-much-does-a-consultant-website-cost" className="underline underline-offset-4 hover:text-white">how much a consultant website costs</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
