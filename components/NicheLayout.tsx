import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
import JsonLd from '@/components/JsonLd'
import { Band, Eyebrow, FeatureCard, GlassCard, GlassFaq } from '@/components/blocks'
import { professionalServiceSchema, faqSchema, breadcrumbSchema, type Faq } from '@/lib/site'

export interface NicheProof {
  quote: string
  name: string
  role: string
  href?: string
  linkLabel?: string
}

export interface NicheContent {
  slug: string
  breadcrumbName: string
  eyebrow: string
  /** H1 of the page, e.g. "Websites for Fractional CFOs". */
  h1Lead: string
  h1Accent: string
  /** 40 to 60 word direct answer paragraph. */
  answer: React.ReactNode
  serviceName: string
  serviceDescription: string
  audienceType: string
  whyTitle: string
  whyIntro: React.ReactNode
  painPoints: { h: string; b: string }[]
  buildTitle: string
  buildIntro: React.ReactNode
  buildPoints: { h: string; b: string }[]
  proofIntro: React.ReactNode
  proof: NicheProof
  faqs: Faq[]
  ctaHeading: React.ReactNode
  ctaSub: string
}

export default function NicheLayout(c: NicheContent) {
  const serviceSchema = {
    ...professionalServiceSchema,
    name: c.serviceName,
    description: c.serviceDescription,
    audience: { '@type': 'Audience', audienceType: c.audienceType },
    url: `https://www.caldera.agency/for/${c.slug}`,
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: c.breadcrumbName, path: `/for/${c.slug}` },
        ])}
      />

      <PageFX />
      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Hero, cream */}
        <Band tone="cream" className="pt-36 md:pt-44 pb-16 md:pb-24" innerClassName="max-w-screen-lg mx-auto">
          <p className="scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">{c.eyebrow}</p>
          <h1 className="scroll-fade text-[clamp(2.2rem,4.6vw,4.2rem)] font-light tracking-tight leading-[1.0] mb-8 text-[var(--black)]">
            {c.h1Lead} <span className="font-serif italic font-normal text-[var(--primary-blue)]">{c.h1Accent}</span>
          </h1>
          <p className="scroll-fade text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-8">{c.answer}</p>
          <Link
            href="/contact"
            className="scroll-fade group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] font-medium tracking-tight no-underline rounded-lg transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 group-hover:text-white">Drop your LinkedIn, get a free prototype</span>
          </Link>
        </Band>

        {/* Why credibility matters, white with feature cards */}
        <Band tone="white" innerClassName="max-w-screen-xl mx-auto">
          <h2 className="scroll-fade text-[clamp(26px,3.6vw,44px)] font-light tracking-tight leading-tight mb-5 text-[var(--black)]">{c.whyTitle}</h2>
          <div className="scroll-fade text-[16px] md:text-[17px] leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-10">{c.whyIntro}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {c.painPoints.map((p) => (
              <FeatureCard key={p.h} title={p.h} body={p.b} />
            ))}
          </div>
        </Band>

        {/* What Caldera builds, dark with glass cards */}
        <Band tone="dark" innerClassName="max-w-screen-xl mx-auto">
          <h2 className="scroll-fade text-[clamp(26px,3.6vw,44px)] font-light tracking-tight leading-tight mb-5 text-white">{c.buildTitle}</h2>
          <div className="scroll-fade text-[16px] md:text-[17px] leading-relaxed text-white/70 max-w-3xl mb-10">{c.buildIntro}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.buildPoints.map((p) => (
              <GlassCard key={p.h} title={p.h} body={p.b} />
            ))}
          </div>
        </Band>

        {/* Proof, cream */}
        <Band tone="cream" innerClassName="max-w-screen-lg mx-auto">
          <Eyebrow>Client story</Eyebrow>
          <div className="scroll-fade text-[16px] md:text-[17px] leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-8">{c.proofIntro}</div>
          <figure className="scroll-fade bg-white rounded-2xl p-7 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
            <blockquote className="text-[clamp(18px,2.4vw,26px)] font-light leading-snug tracking-tight text-[var(--black)] mb-5">
              &ldquo;{c.proof.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-semibold text-[var(--black)]">{c.proof.name}</span>
              <span className="text-[var(--gray-medium)]">, {c.proof.role}</span>
              {c.proof.href && (
                <>
                  {' '}
                  <a href={c.proof.href} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-blue)] underline underline-offset-4">
                    {c.proof.linkLabel ?? 'View the site'}
                  </a>
                </>
              )}
            </figcaption>
          </figure>
        </Band>

        {/* FAQ, blue band */}
        <Band tone="blue" innerClassName="max-w-screen-lg mx-auto">
          <h2 className="scroll-fade text-[clamp(26px,3.6vw,44px)] font-light tracking-tight leading-tight mb-10 text-white">Frequently asked questions</h2>
          <div className="flex flex-col gap-3">
            {c.faqs.map((f, i) => (
              <GlassFaq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Band>

        {/* CTA, dark */}
        <Band tone="dark" className="py-16 md:py-24" innerClassName="max-w-screen-lg mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5">{c.ctaHeading}</h2>
          <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">{c.ctaSub}</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
          >
            Get your free prototype &rarr;
          </Link>
          <p className="text-white/50 text-sm mt-10">
            More:{' '}
            <Link href="/consultant-websites" className="underline underline-offset-4 hover:text-white">the complete guide to consultant websites</Link>
            {' · '}
            <Link href="/work" className="underline underline-offset-4 hover:text-white">consultant website case studies</Link>
          </p>
        </Band>
      </main>

      <Footer />
    </>
  )
}
