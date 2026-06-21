import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { getPost, getAllPosts } from '@/lib/posts'
import { breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/site'

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Reusable prose primitives (server-rendered, all text in the SSR HTML) ───
export function AP({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] md:text-[17px] leading-relaxed text-[var(--gray-dark)] mb-5">{children}</p>
}

export function AH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(24px,3.2vw,38px)] font-light tracking-tight leading-tight text-[var(--black)] mt-12 mb-5">
      {children}
    </h2>
  )
}

export function AH3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[var(--black)] mt-8 mb-3">{children}</h3>
}

export function ABullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[7px] w-2 h-2 rounded-full bg-[var(--primary-blue)] flex-shrink-0" />
          <span className="text-[var(--gray-dark)] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ACallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-[3px] border-[var(--primary-blue)] bg-[var(--blue-light)]/40 rounded-r-2xl p-6 my-8">
      <p className="text-lg font-light italic leading-relaxed text-[var(--black)]">{children}</p>
    </div>
  )
}

export function AAnswer({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] mb-6">{children}</p>
  )
}

export default function ArticleLayout({ slug, children }: { slug: string; children: React.ReactNode }) {
  const post = getPost(slug)
  if (!post) return null

  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Stefanos Bellos',
      url: `${SITE_URL}/about`,
      jobTitle: 'Founder, Caldera Agency',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
    },
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/og-image.jpg`,
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Article header */}
        <section className="relative bg-[var(--cream)] overflow-hidden pt-36 md:pt-44 pb-12 md:pb-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10 max-w-screen-md mx-auto px-8 md:px-12">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">{post.category}</p>
            <h1 className="text-[clamp(2rem,4.3vw,3.8rem)] font-light tracking-tight leading-[1.02] mb-6 text-[var(--black)]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--gray-medium)]">
              <span>Caldera Agency</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <article className="py-12 md:py-16 px-8 md:px-12 bg-white">
          <div className="max-w-screen-md mx-auto">{children}</div>
        </article>

        {/* Related reading */}
        <section className="py-14 md:py-20 px-8 md:px-12 bg-[var(--cream)]">
          <div className="max-w-screen-md mx-auto">
            <h2 className="text-sm font-medium tracking-widest uppercase text-[var(--primary-blue)] mb-6">Related reading</h2>
            <div className="flex flex-col gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block bg-white rounded-xl p-5 md:p-6 no-underline transition-all duration-300 hover:shadow-lg"
                >
                  <h3 className="text-base md:text-lg font-medium text-[var(--black)] group-hover:text-[var(--primary-blue)] transition-colors duration-300 mb-1">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[var(--gray-medium)] leading-relaxed">{r.excerpt}</p>
                </Link>
              ))}
            </div>
            <p className="text-[var(--gray-medium)] mt-8 text-[15px] leading-relaxed">
              New here? Start with the{' '}
              <Link href="/consultant-websites" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
                complete guide to consultant websites
              </Link>{' '}
              or see why consultants choose the{' '}
              <Link href="/best-website-agency-for-consultants" className="text-[var(--primary-blue)] underline underline-offset-4 hover:text-[var(--blue-dark)]">
                best website agency for consultants
              </Link>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }}
          />
          <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 max-w-screen-lg mx-auto text-center">
            <h2 className="text-[clamp(26px,3.6vw,44px)] font-light tracking-tight text-white mb-5">
              Want a website that proves your <span className="font-serif italic">expertise</span>?
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Drop your LinkedIn and we&rsquo;ll send you a free working prototype. No calls, no commitment, no homework.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-[15px] font-medium tracking-tight no-underline rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get your free prototype &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
