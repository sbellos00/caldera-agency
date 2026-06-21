import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
import JsonLd from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema, SITE_URL, SITE_NAME, type Faq } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Consultant Websites: The Complete Guide',
  description:
    'The complete guide to consultant websites. Whether you need one, what it should do, what pages to include, what it should cost, and how to get one built without the busywork.',
  alternates: { canonical: '/consultant-websites' },
  openGraph: {
    type: 'article',
    url: '/consultant-websites',
    title: 'Consultant Websites: The Complete Guide | Caldera Agency',
    description:
      'Whether you need a website, what it should do, what pages to include, what it should cost, and how to turn a LinkedIn profile into a credible consulting site.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Consultant Websites: The Complete Guide' }],
  },
}

const faqs: Faq[] = [
  {
    q: 'Do consultants really need a website in 2026?',
    a: 'If you want to win premium, considered work, yes. Most buyers research you online before they reply, and a website is the only place you fully control how that research goes. LinkedIn gets you found. A website is what makes you credible once you are found.',
  },
  {
    q: 'Can a consultant website be a single page?',
    a: 'Yes. Many solo consultants do very well with a focused one-page site that covers who you help, the proof, and how to contact you. A one-page site is faster to launch and easier to maintain, and you can always expand it as you add case studies or services.',
  },
  {
    q: 'How much should a consultant website cost?',
    a: 'DIY builders run roughly $12 to $50 a month, capable freelancers commonly charge a few thousand dollars, and agencies range from about $5,000 to $30,000 or more. The bigger cost driver, though, is positioning and ongoing content, not the build itself.',
  },
  {
    q: 'What is the fastest way to get a consultant website without doing the work yourself?',
    a: 'Use a done-for-you service that researches your background and writes the copy for you, so your only job is to share your vision and review. Caldera, for example, builds a working prototype from your LinkedIn before you pay anything, then builds the full custom site around what you picture.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Consultant Websites: The Complete Guide',
  description:
    'The complete guide to consultant websites. Whether you need one, what it should do, what pages to include, what it should cost, and how to get one built.',
  author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
  },
  mainEntityOfPage: `${SITE_URL}/consultant-websites`,
  image: `${SITE_URL}/og-image.jpg`,
}

const link = 'text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]'

function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="scroll-fade text-[clamp(24px,3.2vw,40px)] font-light tracking-tight leading-tight text-[var(--black)] mt-14 mb-5 scroll-mt-28">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="scroll-fade text-[16px] md:text-[17px] leading-relaxed text-[var(--gray-dark)] mb-5">{children}</p>
}

export default function ConsultantWebsitesGuide() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Consultant Websites: The Complete Guide', path: '/consultant-websites' },
        ])}
      />

      <PageFX />
      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Hero */}
        <section className="relative bg-[var(--cream)] overflow-hidden pt-36 md:pt-44 pb-14 md:pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10 max-w-screen-lg mx-auto px-8 md:px-16">
            <p className="scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">The complete guide</p>
            <h1 className="scroll-fade text-[clamp(2.2rem,4.8vw,4.5rem)] font-light tracking-tight leading-[0.98] mb-8 text-[var(--black)]">
              Consultant websites: <span className="font-serif italic font-normal text-[var(--primary-blue)]">the complete guide</span>
            </h1>
            <p className="scroll-fade text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl">
              A consultant website is a credibility asset. It is a single page or small site you fully own that proves
              you can solve a specific client&rsquo;s problem. It should establish authority, turn referrals and inbound
              into conversations, and give media and partners somewhere to link. Here is everything you need to plan it,
              budget for it, and build it.
            </p>
          </div>
        </section>

        {/* Body */}
        <article className="py-12 md:py-16 px-8 md:px-16 bg-white">
          <div className="max-w-screen-md mx-auto">
            {/* Key takeaways */}
            <div className="scroll-fade bg-[var(--cream)] rounded-2xl p-7 md:p-9 mb-10">
              <h2 className="text-sm font-medium tracking-widest uppercase text-[var(--primary-blue)] mb-5">Key takeaways</h2>
              <ul className="space-y-3">
                {[
                  'A consultant website is for credibility and conversion, not lead generation. LinkedIn brings the leads.',
                  'You do not own LinkedIn. A website is the one asset you control end to end.',
                  'Most solo consultants need only five things. Who you help, proof, services, about, and contact.',
                  'A focused one-page site beats a sprawling multi-page site for most solo consultants.',
                  'The real cost is positioning and upkeep. The build is the cheap part.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] w-2 h-2 rounded-full bg-[var(--primary-blue)] flex-shrink-0" />
                    <span className="text-[var(--gray-dark)] leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <H2 id="do-you-need-one">Do consultants really need a website if LinkedIn is working?</H2>
            <P>
              Yes. And the reason is ownership and control, not lead volume. LinkedIn is the strongest discovery channel
              in consulting, and you should keep using it. But you do not own it. The platform decides your layout,
              compresses your expertise into the same template as every other consultant, and can change the rules
              overnight. Your case studies sink in the feed within days.
            </P>
            <P>
              A website is the one place where you set the narrative. When a referral arrives or a buyer researches you,
              and they always do, the website is what turns &ldquo;sounds interesting&rdquo; into &ldquo;let&rsquo;s
              talk.&rdquo; The deals you lose this way are silent. Nobody tells you they picked a competitor who simply
              looked more credible online. For the full argument, see{' '}
              <Link href="/blog/do-consultants-need-a-website" className={link}>do consultants need a website</Link> and{' '}
              <Link href="/blog/linkedin-vs-website-for-consultants" className={link}>LinkedIn vs your own website</Link>.
            </P>

            <H2 id="what-it-should-do">What should a consultant&rsquo;s website actually do?</H2>
            <P>Three jobs, in priority order:</P>
            <ul className="scroll-fade mb-6 space-y-3">
              {[
                ['Establish authority.', 'Make it obvious, within seconds, that you solve a specific problem for a specific kind of client, and that you have done it before.'],
                ['Convert referrals and inbound.', 'Give a warm lead everything they need to say yes. Clear positioning, proof, and an easy next step.'],
                ['Be a linkable home base.', 'A single professional destination that podcasters, journalists, event organizers, and partners can point to.'],
              ].map(([h, b]) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-[7px] w-2 h-2 rounded-full bg-[var(--primary-blue)] flex-shrink-0" />
                  <span className="text-[var(--gray-dark)] leading-relaxed"><strong className="font-medium text-[var(--black)]">{h}</strong> {b}</span>
                </li>
              ))}
            </ul>
            <P>
              Notice what is not on that list. Being a lead-generation machine. For most solo consultants the
              site&rsquo;s job is to stop you losing the leads you already get, not to replace LinkedIn or referrals.
            </P>

            <H2 id="pages">What pages does a consultant website need?</H2>
            <P>Keep it lean. Almost every effective solo-consultant site is some mix of these:</P>
            <ul className="scroll-fade mb-6 space-y-3">
              {[
                ['Home, or hero.', 'Who you help, the outcome you create, and your single most compelling proof point, above the fold.'],
                ['About, or credibility.', 'Your story and track record framed around the client, not a résumé. This is where trust is built.'],
                ['Services, or how you help.', 'The specific engagements you offer, in plain language, with the kind of client each is for.'],
                ['Proof.', 'Case studies, results, named testimonials, logos, frameworks. The evidence that you have done this before.'],
                ['Contact.', 'One frictionless way to start a conversation. No ten-field forms.'],
              ].map(([h, b]) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-[7px] w-2 h-2 rounded-full bg-[var(--primary-blue)] flex-shrink-0" />
                  <span className="text-[var(--gray-dark)] leading-relaxed"><strong className="font-medium text-[var(--black)]">{h}</strong> {b}</span>
                </li>
              ))}
            </ul>

            <H2 id="one-page-or-multi">One page or multi-page?</H2>
            <P>
              For most solo consultants, one well-structured page wins. It is faster to build, easier to keep current,
              and it tells your story in the exact order a buyer needs to read it. Who you help, the proof, the offer,
              the next step, with nowhere to get lost. A multi-page site earns its keep once you have several distinct
              services, a real body of case studies, or you are publishing regularly and want the extra surface area for
              search. Start focused. Expand when you have something specific to expand into.
            </P>

            <H2 id="cost">How much should a consultant website cost?</H2>
            <P>Honest 2026 ranges, before we tell you what actually matters:</P>
            <div className="scroll-fade overflow-x-auto rounded-2xl border border-[var(--gray-light)] mb-6">
              <table className="w-full border-collapse text-left text-[14px] md:text-[15px] min-w-[520px]">
                <thead>
                  <tr className="bg-[var(--cream)]">
                    <th className="p-4 font-medium text-[var(--black)]">Route</th>
                    <th className="p-4 font-medium text-[var(--black)]">Typical 2026 cost</th>
                    <th className="p-4 font-medium text-[var(--black)]">Best when</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">DIY builder</th>
                    <td className="p-4 text-[var(--gray-medium)] align-top">$12 to $50 a month</td>
                    <td className="p-4 text-[var(--gray-medium)] align-top">You have the time and taste to do it yourself</td>
                  </tr>
                  <tr className="bg-[var(--cream)]/40">
                    <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Freelancer</th>
                    <td className="p-4 text-[var(--gray-medium)] align-top">$1,500 to $6,000 one-off</td>
                    <td className="p-4 text-[var(--gray-medium)] align-top">You can write your own positioning and manage the project</td>
                  </tr>
                  <tr className="bg-white">
                    <th scope="row" className="p-4 font-medium text-[var(--black)] align-top">Agency</th>
                    <td className="p-4 text-[var(--gray-medium)] align-top">$5,000 to $30,000 or more</td>
                    <td className="p-4 text-[var(--gray-medium)] align-top">You want it done for you, end to end</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              Here is the part most people miss. The real cost of a consultant website is positioning and ongoing
              content, not the build. A beautiful site that says the wrong thing is worthless. A plain site with
              razor-sharp positioning wins work. Budget for the thinking, not just the pixels.
            </P>

            <H2 id="diy-freelancer-agency">Should you DIY, hire a freelancer, or use an agency?</H2>
            <P>
              It comes down to how you value your time and how much risk you want to carry. DIY is cheapest, but you
              become the strategist, copywriter, designer, and developer. A freelancer can be excellent if you can hand
              them clear positioning and steer the project. An agency does it for you, but you usually brief them and pay
              before you see real work. The compare-everything version, including when a done-for-you agency is the right
              call, is in{' '}
              <Link href="/blog/best-website-builder-for-consultants" className={link}>best website options for consultants</Link>, and the
              consultant-specific case is on{' '}
              <Link href="/best-website-agency-for-consultants" className={link}>the best website agency for consultants</Link>.
            </P>

            <H2 id="linkedin-to-website">How do you turn a LinkedIn profile into a website?</H2>
            <P>
              The hard part is not the building. It is the translation. A LinkedIn profile is a chronological résumé. A
              website is an argument. Turning one into the other means finding the through-line of your career, naming
              the specific problem you are known for solving, gathering the proof that backs it up, and ordering it so a
              buyer reaches &ldquo;this is the person I need&rdquo; as fast as possible.
            </P>
            <P>
              This is exactly the work Caldera does. We research your background, your positioning, and your market from
              your LinkedIn alone, then build a working prototype of your actual website before you pay anything. Your
              only real job is sharing your vision and reviewing what we build. See{' '}
              <Link href="/process" className={link}>exactly how the process works</Link>.
            </P>

            {/* FAQ */}
            <H2 id="faq">Frequently asked questions</H2>
            <div className="flex flex-col gap-3 mt-6">
              {faqs.map((f, i) => (
                <details key={i} className="scroll-fade group bg-[var(--cream)] rounded-2xl p-6 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none">
                    <h3 className="text-base md:text-lg font-medium text-[var(--black)]">{f.q}</h3>
                    <span className="text-2xl font-light leading-none text-[var(--primary-blue)] transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--gray-medium)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </article>

        {/* Built for your niche + CTA */}
        <section className="py-16 md:py-24 px-8 md:px-16 bg-[var(--black)] text-white relative overflow-hidden noise-overlay">
          <div className="relative z-10 max-w-screen-lg mx-auto text-center">
            <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5">
              Built for <span className="font-serif italic text-[var(--blue-light)]">your kind of consulting</span>
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              See how Caldera approaches websites for specific niches, or get a free working prototype of your own site.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <Link href="/for/fractional-cfo" className="border border-white/30 text-white px-5 py-3 text-sm rounded-lg no-underline transition-all duration-300 hover:bg-white/10">Fractional CFOs</Link>
              <Link href="/for/coaches" className="border border-white/30 text-white px-5 py-3 text-sm rounded-lg no-underline transition-all duration-300 hover:bg-white/10">Coaches</Link>
              <Link href="/for/advisors" className="border border-white/30 text-white px-5 py-3 text-sm rounded-lg no-underline transition-all duration-300 hover:bg-white/10">Advisors</Link>
              <Link href="/work" className="border border-white/30 text-white px-5 py-3 text-sm rounded-lg no-underline transition-all duration-300 hover:bg-white/10">Case studies</Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
            >
              Drop your LinkedIn, get a free prototype &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
