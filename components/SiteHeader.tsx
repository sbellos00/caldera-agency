import Link from 'next/link'
import Menu from '@/components/Menu'

// Server-rendered header for the content/marketing pages (flagship, pillar, niche,
// blog). Mirrors the navbar used across the site. Menu is a client component but
// renders fine inside this server component; all link text stays in the SSR HTML.
export default function SiteHeader({ cta = 'Get Started', ctaHref = '/contact' }: { cta?: string; ctaHref?: string }) {
  return (
    <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-5 transition-all duration-500">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-3xl font-medium tracking-tight caldera-logo text-[var(--black)] transition-colors duration-300 no-underline"
        >
          caldera.agency
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href={ctaHref}
            className="hidden md:block group relative overflow-hidden px-6 py-3 rounded-lg text-sm tracking-tight transition-all duration-500 hover:scale-105 bg-[var(--black)] text-white no-underline"
          >
            <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
              {cta}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </Link>
          <Menu dark={false} />
        </div>
      </div>
    </nav>
  )
}
