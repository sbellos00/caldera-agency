import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
import JsonLd from '@/components/JsonLd'
import { getAllPosts } from '@/lib/posts'
import { breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog: Websites & Positioning for Consultants',
  description:
    'Plain-English guides on consultant websites, positioning, and LinkedIn, written for independent consultants deciding how to show up online.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Caldera Blog: Websites & Positioning for Consultants',
    description:
      'Plain-English guides on consultant websites, positioning, and LinkedIn, written for independent consultants.',
    siteName: 'Caldera Agency',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Caldera Agency Blog' }],
  },
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description:
      'Guides on consultant websites, positioning, and LinkedIn for independent consultants.',
    url: `${SITE_URL}/blog`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: { '@type': 'Person', name: 'Stefanos Bellos' },
    })),
  }

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />

      <PageFX />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative bg-[var(--cream)] overflow-hidden pt-36 md:pt-44 pb-16 md:pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-8 md:px-16 text-center">
            <p className="scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">The Caldera Blog</p>
            <h1 className="scroll-fade text-[clamp(2.2rem,4.5vw,4.5rem)] font-light tracking-tight leading-[0.95] mb-6 text-[var(--black)]">
              Websites &amp; positioning, <span className="font-serif italic font-normal text-[var(--primary-blue)]">for consultants</span>
            </h1>
            <p className="scroll-fade text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mx-auto">
              Honest, practical writing on how independent consultants show up online. Websites, positioning, and how a
              site fits alongside LinkedIn. No fluff, no jargon.
            </p>
          </div>
        </section>

        {/* Post list */}
        <section className="py-16 md:py-24 px-8 md:px-16 bg-white">
          <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="scroll-fade group block bg-[var(--cream)] rounded-2xl p-7 md:p-9 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 no-underline"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--gray-medium)] mb-3">
                  <span className="text-[var(--primary-blue)] font-medium tracking-widest uppercase">{post.category}</span>
                  <span aria-hidden="true">•</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-[var(--black)] mb-3 leading-snug group-hover:text-[var(--primary-blue)] transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--gray-medium)] mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-blue)]">
                  Read article
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Pillar / flagship cross-links */}
        <section className="py-16 md:py-20 px-8 md:px-16 bg-[var(--black)] text-white relative overflow-hidden noise-overlay">
          <div className="relative z-10 max-w-screen-lg mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Want the whole picture in one place?
            </h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              Start with our complete guide to consultant websites, or see why consultants pick a specialist agency over
              a generic web shop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultant-websites"
                className="inline-flex items-center justify-center gap-2 bg-white text-[var(--black)] px-7 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:scale-105"
              >
                The complete guide &rarr;
              </Link>
              <Link
                href="/best-website-agency-for-consultants"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-4 text-[15px] font-medium tracking-tight rounded-lg no-underline transition-all duration-300 hover:bg-white/10"
              >
                Best website agency for consultants
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
