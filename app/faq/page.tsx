import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
import JsonLd from '@/components/JsonLd'
import { Band, Eyebrow, LightFaq } from '@/components/blocks'
import { homepageFaqs, extraFaqs, faqSchema, breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about Caldera: how the free prototype works, what is included, timelines, who we work with, and how we build a fully custom site around your vision.',
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    url: '/faq',
    title: 'Frequently Asked Questions | Caldera Agency',
    description:
      'Common questions about working with Caldera, the free prototype, what is included, timelines, and building a fully custom consultant website around your vision.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Caldera Agency FAQ' }],
  },
}

// Group A: the high-value homepage questions. Group B: getting-started / scope / after-launch.
const allFaqs = [...homepageFaqs, ...extraFaqs]

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />

      <PageFX />
      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Hero, cream */}
        <Band tone="cream" className="pt-36 md:pt-44 pb-14 md:pb-20" innerClassName="max-w-screen-lg mx-auto">
          <p className="scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">FAQ</p>
          <h1 className="scroll-fade text-[clamp(2.2rem,4.6vw,4.2rem)] font-light tracking-tight leading-[1.0] mb-6 text-[var(--black)]">
            Questions consultants <span className="font-serif italic font-normal text-[var(--primary-blue)]">ask us</span>
          </h1>
          <p className="scroll-fade text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl">
            Everything about how Caldera works, from the free prototype to what is included and how we build a fully
            custom site around your vision. If your question is not here, just reach out.
          </p>
        </Band>

        {/* Group A, cream band with white accordions */}
        <Band tone="cream" innerClassName="max-w-screen-md mx-auto">
          <Eyebrow>The essentials</Eyebrow>
          <h2 className="scroll-fade text-[clamp(24px,3.2vw,38px)] font-light tracking-tight leading-tight mb-8 text-[var(--black)]">
            About the websites and working with us
          </h2>
          <div className="flex flex-col gap-3">
            {homepageFaqs.map((f, i) => (
              <LightFaq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Band>

        {/* Group B, white band */}
        <Band tone="white" innerClassName="max-w-screen-md mx-auto">
          <Eyebrow>Getting started, scope and after launch</Eyebrow>
          <h2 className="scroll-fade text-[clamp(24px,3.2vw,38px)] font-light tracking-tight leading-tight mb-8 text-[var(--black)]">
            The process, the details, and what comes next
          </h2>
          <div className="flex flex-col gap-3">
            {extraFaqs.map((f, i) => (
              <LightFaq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Band>

        {/* CTA, dark */}
        <Band tone="dark" className="py-16 md:py-24" innerClassName="max-w-screen-lg mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5">
            Still have a <span className="font-serif italic text-[var(--blue-light)]">question</span>?
          </h2>
          <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            Drop your LinkedIn and we will build a free working prototype, or just get in touch. No calls, no
            commitment, no homework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
            >
              Get your free prototype &rarr;
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </Band>
      </main>

      <Footer />
    </>
  )
}
