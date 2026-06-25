import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
import JsonLd from '@/components/JsonLd'
import { Band, Accent, Eyebrow } from '@/components/blocks'
import { breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/site'
import { caseStudies, workTestimonials } from '@/lib/work'

export const metadata: Metadata = {
  title: 'Consultant Website Case Studies & Examples',
  description:
    'Real consultant websites built by Caldera, with the live sites and what clients say. See examples of done-for-you websites for fractional CFOs, coaches, and advisors.',
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    url: '/work',
    title: 'Consultant Website Case Studies & Examples | Caldera Agency',
    description:
      'Real consultant websites built by Caldera, with the live sites and what clients say.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Caldera Agency consultant website case studies' }],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Consultant website case studies by Caldera Agency',
  itemListElement: caseStudies.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: `${c.name} website`,
      ...(c.url ? { url: c.url } : {}),
      creator: { '@id': `${SITE_URL}/#organization` },
      about: c.role,
    },
  })),
}

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  review: workTestimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: t.body,
  })),
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={reviewSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/work' },
        ])}
      />

      <PageFX />
      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Hero, cream */}
        <Band tone="cream" className="pt-36 md:pt-44 pb-14 md:pb-20" innerClassName="max-w-screen-lg mx-auto">
          <p className="scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">Case studies</p>
          <h1 className="scroll-fade text-[clamp(2.2rem,4.6vw,4.2rem)] font-light tracking-tight leading-[1.0] mb-6 text-[var(--black)]">
            Consultant websites <Accent>we have built</Accent>
          </h1>
          <p className="scroll-fade text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl">
            Live websites for independent consultants. Every one was researched, written, designed, and built by
            Caldera, with a free working prototype before the client paid anything. Here is a look at the work and what
            clients say about it.
          </p>
        </Band>

        {/* Case studies, dark with browser-frame cards (homepage "Highlighted Work" style) */}
        <Band tone="dark" innerClassName="max-w-screen-2xl mx-auto">
          <Eyebrow center>Selected work</Eyebrow>
          <h2 className="scroll-fade section-title text-center mb-14 md:mb-16 text-white">What it looks like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {caseStudies.map((c) => {
              const Card = (
                <>
                  <div className="relative rounded-2xl bg-white/10 border border-white/10 overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </div>
                      {c.url && (
                        <div className="flex-1 ml-3">
                          <div className="bg-white/10 rounded-md px-3 py-1 text-xs text-white/50 max-w-[200px]">{c.url.replace('https://', '')}</div>
                        </div>
                      )}
                    </div>
                    {c.image && (
                      <Image src={c.image} alt={`${c.name} website`} width={1200} height={800} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 50vw" />
                    )}
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-medium tracking-tight mb-1 text-white">{c.name}</h3>
                      <p className="text-sm text-[var(--blue-light)] font-medium mb-2">{c.role}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{c.summary}</p>
                    </div>
                    {c.url && (
                      <span className="text-white/30 group-hover:text-[var(--blue-light)] transition-all duration-300 group-hover:translate-x-1 mt-1 flex-shrink-0 ml-4">&rarr;</span>
                    )}
                  </div>
                </>
              )
              return c.url ? (
                <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="scroll-fade group block no-underline">
                  {Card}
                </a>
              ) : (
                <div key={c.name} className="scroll-fade group block">
                  {Card}
                </div>
              )
            })}
          </div>
        </Band>

        {/* Testimonials, cream */}
        <Band tone="cream" innerClassName="max-w-screen-lg mx-auto">
          <Eyebrow center>Testimonials</Eyebrow>
          <h2 className="scroll-fade section-title text-center mb-12 md:mb-16">What clients say</h2>
          <div className="flex flex-col gap-6">
            {workTestimonials.map((t) => (
              <figure key={t.name} className="scroll-fade bg-white rounded-2xl p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
                <blockquote className="text-[var(--gray-dark)] leading-relaxed text-[16px] md:text-[17px] mb-4">
                  &ldquo;{t.body}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold text-[var(--black)]">{t.name}</span>
                  <span className="text-[var(--gray-medium)]">, {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Band>

        {/* CTA, dark */}
        <Band tone="dark" className="py-16 md:py-24" innerClassName="max-w-screen-lg mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5">
            Want to see <span className="font-serif italic text-[var(--blue-light)]">yours</span>?
          </h2>
          <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            Drop your LinkedIn and we will build a free working prototype of your website. No calls. No commitment. No
            homework.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
          >
            Get your free prototype &rarr;
          </Link>
        </Band>
      </main>

      <Footer />
    </>
  )
}
