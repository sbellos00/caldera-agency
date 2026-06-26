import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
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
    'Looking for the best website agency for consultants? Caldera builds fully custom, done-for-you consultant websites, shows a free working prototype before you pay, and gives you complete control of your personal brand.',
  alternates: { canonical: '/best-website-agency-for-consultants' },
  openGraph: {
    type: 'website',
    url: '/best-website-agency-for-consultants',
    title: 'The Best Website Agency for Solo Consultants | Caldera Agency',
    description:
      'Why Caldera is the website agency built specifically for solo consultants. A free prototype before you pay, complete control of your personal brand, and any vision built no matter the complexity.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Best Website Agency for Solo Consultants' }],
  },
}

const faqs: Faq[] = [
  {
    q: 'Is Caldera really free to start?',
    a: 'Yes. You get a free working prototype of your website before you pay anything. There is no deposit, no briefing fee, and no obligation. If the prototype is not right, you walk away owing nothing. We build first and earn your trust before we ask for anything.',
  },
  {
    q: 'How long does it take to build a consultant website?',
    a: 'Most of the work is on us, so the timeline depends mainly on how quickly you review each round. Responsive clients have launched in under a week, and most projects wrap in a couple of weeks. We handle the research, design, and development.',
  },
  {
    q: 'What types of consultants do you work with?',
    a: 'Solo and independent consultants. That means Fractional CFOs, executive and leadership coaches, supply chain and operations advisors, health care consultants, and experts like them. That focus is what keeps the work sharp.',
  },
  {
    q: 'Can you build exactly the website I have in mind?',
    a: 'Yes. Whatever you picture, we build it. Custom layouts, rich animation, interactive detail, an unconventional structure. Because every site is built from scratch rather than dropped into a template, there is no complexity ceiling. You describe the vision and we make it real.',
  },
  {
    q: 'How is this different from Squarespace, Wix, or hiring a freelancer?',
    a: 'DIY builders hand you a blank template and make you the strategist, copywriter, and designer. A general freelancer or agency can build the site, but you usually brief them, write the positioning, and pay before anything is built.',
  },
  {
    q: 'What does a Caldera website cost?',
    a: 'Every project starts with a free working prototype, so you see your website before you decide anything. From there, the investment depends on the scope and complexity of the site you want.',
  },
]

const comparison: { label: string; generic: string; diy: string; caldera: string }[] = [
  {
    label: 'Specialization',
    generic: 'Any industry, rarely consultant-specific',
    diy: 'None. You are the strategist',
    caldera: 'Solo consultants',
  },
  {
    label: 'Risk before you commit',
    generic: 'Usually a deposit up front',
    diy: 'Your time, plus an ongoing subscription',
    caldera: 'A free working prototype before you pay',
  },
  {
    label: 'Copywriting and positioning',
    generic: 'Often extra, or you write it',
    diy: 'You write everything',
    caldera: 'Researched and written for you',
  },
  {
    label: 'Time required from you',
    generic: 'Briefs, discovery calls, revisions',
    diy: 'Days to weeks of your own time',
    caldera: 'Minimal. Share a vision and review',
  },
  {
    label: 'Your design and vision',
    generic: 'Whatever fits their kit or budget',
    diy: "Limited to the builder's templates",
    caldera: 'Any vision, fully custom, no complexity ceiling',
  },
  {
    label: 'Ongoing support',
    generic: 'Retainer or hourly',
    diy: 'Do it yourself, or support tickets',
    caldera: 'One year of hosting and support included',
  },
]

const reasons: { h: string; b: string }[] = [
  {
    h: 'Full control of your brand',
    b: 'Your website is a custom asset that puts you in complete control of your personal brand and digital presence. You decide how you show up online, and we build to that, not to a template.',
  },
  {
    h: 'Any vision, however complex',
    b: 'Custom layouts, rich animation, interactive detail, whatever you picture. Because every site is built from scratch, there is no complexity ceiling. You describe the vision and we make it real.',
  },
]

const proServiceSchema = {
  ...professionalServiceSchema,
  name: 'Caldera Agency, Website Agency for Solo Consultants',
}

const fade = 'scroll-fade'

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

      <PageFX />
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
            <p className={`${fade} text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5`}>For solo consultants</p>
            <h1 className={`${fade} text-[clamp(2.2rem,4.8vw,4.5rem)] font-light tracking-tight leading-[0.98] mb-8 text-[var(--black)]`}>
              The best website agency for <span className="font-serif italic font-normal text-[var(--primary-blue)]">solo consultants</span>
            </h1>
            <p className={`${fade} text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-8`}>
              For a solo consultant, the best website agency is a specialist that builds your site around your vision
              before you commit. That is what Caldera does. We research your background, write your copy, and design and
              build a fully custom site, no matter how complex or animation-heavy, and you see a free working prototype
              before you pay. You stay in full control of how you show up online.
            </p>
            <div className={`${fade} flex flex-col sm:flex-row gap-4`}>
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
            <div className={`${fade} bg-[var(--cream)] rounded-2xl p-7 md:p-10`}>
              <h2 className="text-sm font-medium tracking-widest uppercase text-[var(--primary-blue)] mb-6">Key takeaways</h2>
              <ul className="space-y-4">
                {[
                  'You see a free working prototype of your site before you pay anything.',
                  'Full control over your personal brand and digital presence, built exactly how you want it.',
                  'Any vision realized, however complex or animation-heavy, because every site is custom-built.',
                  'Built by a founder from the expert-network world who spent years studying how consultants win work.',
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
            <h2 className={`${fade} text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-4 text-[var(--black)]`}>
              Anyone can build a website. The right one <span className="font-serif italic text-[var(--primary-blue)]">wins you work</span>.
            </h2>
            <p className={`${fade} text-[var(--gray-medium)] leading-relaxed max-w-3xl mb-10`}>
              A DIY builder, a freelancer, and a generalist agency can all get you online. The difference is everything
              that makes a consultant credible &mdash; sharp positioning, copy that proves your expertise, and a site
              built around the work you actually do. Here&rsquo;s how they compare.
            </p>
            <div className={`${fade} overflow-x-auto rounded-2xl border border-[var(--gray-light)]`}>
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
            <p className={`${fade} text-sm text-[var(--gray-medium)] mt-4`}>
              DIY builders are genuinely the cheapest option if you have the time and the taste to do it yourself. A good
              freelancer can be excellent. Caldera is the right call when you want it done for you, done well, and done
              without risk, and you would rather spend your hours on clients than on web design.
            </p>
          </div>
        </section>

        {/* Why Caldera */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-[var(--cream)]">
          <div className="max-w-screen-xl mx-auto">
            <h2 className={`${fade} text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-10 text-[var(--black)]`}>
              Why Caldera is built specifically for <span className="font-serif italic text-[var(--primary-blue)]">consultants</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reasons.map((r) => (
                <div key={r.h} className={`${fade} bg-white rounded-2xl p-7 md:p-8`}>
                  <h3 className="text-xl font-medium tracking-tight mb-3 text-[var(--black)]">{r.h}</h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gray-medium)]">{r.b}</p>
                </div>
              ))}
            </div>
            <p className={`${fade} text-[var(--gray-medium)] leading-relaxed max-w-3xl mt-8`}>
              Caldera was founded by Stefanos Bellos, formerly of the Dialectica expert network, who spent thousands of
              hours connecting consultants with investors and global enterprises. He watched brilliant experts lose work
              simply because they looked less credible online than their competitors. The whole agency is built to close
              that gap.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-white">
          <div className="max-w-screen-lg mx-auto">
            <h2 className={`${fade} text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-10 text-[var(--black)]`}>
              What consultants say
            </h2>
            <div className="flex flex-col gap-6">
              {(['piazza', 'scott', 'paul'] as const).map((k) => (
                <figure key={k} className={`${fade} bg-[var(--cream)] rounded-2xl p-7 md:p-9`}>
                  <blockquote className="text-[var(--gray-dark)] leading-relaxed text-[16px] md:text-[17px] mb-4">
                    &ldquo;{testimonials[k].body}&rdquo;
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="font-semibold text-[var(--black)]">{testimonials[k].name}</span>
                    <span className="text-[var(--gray-medium)]">, {testimonials[k].role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 px-8 md:px-16 bg-[var(--cream)]">
          <div className="max-w-screen-lg mx-auto">
            <h2 className={`${fade} text-[clamp(26px,3.5vw,44px)] font-light tracking-tight leading-tight mb-10 text-[var(--black)]`}>
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => (
                <details key={i} className={`${fade} group bg-white rounded-2xl p-6 md:p-7 [&_summary]:cursor-pointer`}>
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
              Drop your LinkedIn. <span className="font-serif italic text-[var(--primary-blue)]">Get a free prototype.</span>
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              See your website before you spend a dollar. No calls. No commitment. No homework.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
            >
              Get your free prototype &rarr;
            </Link>
            <p className="text-white/50 text-sm mt-10">
              See our{' '}
              <Link href="/work" className="underline underline-offset-4 hover:text-white">case studies</Link>, or{' '}
              <Link href="/process" className="underline underline-offset-4 hover:text-white">how the process works</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
