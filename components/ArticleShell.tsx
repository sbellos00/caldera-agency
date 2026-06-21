import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import PageFX from '@/components/PageFX'
import JsonLd from '@/components/JsonLd'
import { Band } from '@/components/blocks'
import { getPost } from '@/lib/posts'
import { blogPostingSchema, breadcrumbSchema } from '@/lib/site'

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Shared article layout for blog posts. Matches the /consultant-websites design:
// solid header, cream hero with a grid pattern, a body of alternating background
// bands, and a dark CTA. Pair the body with the prose primitives and bands from
// components/blocks so each post reads like the pillar and changes background as
// the homepage does.
export default function ArticleShell({
  slug,
  titleNode,
  standfirst,
  children,
}: {
  slug: string
  titleNode: React.ReactNode
  standfirst: string
  children: React.ReactNode
}) {
  const post = getPost(slug)
  if (!post) return null

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <PageFX />
      <SiteHeader cta="Get your free prototype" />

      <main>
        {/* Hero, cream */}
        <Band tone="cream" className="pt-36 md:pt-44 pb-14 md:pb-20" innerClassName="max-w-screen-md mx-auto">
          <p className="scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">{post.category}</p>
          <h1 className="scroll-fade text-[clamp(2rem,4.3vw,3.8rem)] font-light tracking-tight leading-[1.04] mb-6 text-[var(--black)]">
            {titleNode}
          </h1>
          <div className="scroll-fade flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--gray-medium)] mb-6">
            <span>Caldera Agency</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>
          <p className="scroll-fade text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] font-light max-w-2xl">{standfirst}</p>
        </Band>

        {children}

        {/* CTA, dark */}
        <Band tone="dark" className="py-16 md:py-24" innerClassName="max-w-screen-lg mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5">
            Drop your LinkedIn. <span className="font-serif italic text-[var(--blue-light)]">Get a website.</span>
          </h2>
          <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            We build your site before you spend a dollar. No calls. No commitment. No homework.
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
