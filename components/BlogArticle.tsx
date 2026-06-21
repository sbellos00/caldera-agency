'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

/* ─── Styled article building blocks — match the Caldera blog aesthetic ─── */

export function BP({ children }: { children: ReactNode }) {
  return <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6 scroll-fade">{children}</p>
}

export function BLead({ children }: { children: ReactNode }) {
  return <p className="text-xl leading-relaxed text-[var(--gray-dark)] font-light mb-6 scroll-fade">{children}</p>
}

export function BH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6 mt-4 scroll-fade">{children}</h2>
  )
}

export function BH3({ children }: { children: ReactNode }) {
  return <h3 className="text-2xl font-light text-[var(--black)] tracking-tight mb-5 mt-2 scroll-fade">{children}</h3>
}

/** Emphasised serif-italic accent for use inside headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="italic font-serif text-[var(--primary-blue)]">{children}</span>
}

/** The "Core Summary"-style proof card with dot bullets. */
export function BSummary({ title, items }: { title?: string; items: ReactNode[] }) {
  return (
    <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
      {title && <h3 className="text-xl font-medium text-[var(--black)] mb-4">{title}</h3>}
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3" />
            <p className="text-[var(--gray-dark)] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Numbered proof card. */
export function BNumbered({ items }: { items: ReactNode[] }) {
  return (
    <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">{i + 1}</span>
            </div>
            <p className="text-[var(--gray-dark)] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Definition-style card: heading + body per item. */
export function BDefinitions({ items }: { items: { h: string; b: ReactNode }[] }) {
  return (
    <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i}>
            <h4 className="text-lg font-medium text-[var(--black)] mb-2">{item.h}</h4>
            <p className="text-[var(--gray-dark)] leading-relaxed">{item.b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Centred italic key message with gradient hairlines, as on the existing posts. */
export function BKeyMessage({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-fade mb-12">
      <div className="max-w-3xl mx-auto text-center relative py-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent" />
        <p className="text-xl font-light text-[var(--gray-dark)] leading-relaxed italic px-4">{children}</p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent" />
      </div>
    </div>
  )
}

/** Left-accented pull quote, as used inside the existing posts. */
export function BPull({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-fade mb-8">
      <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 py-4 bg-gradient-to-r from-[var(--blue-light)]/30 to-transparent">
        <p className="text-lg font-light text-[var(--gray-dark)] italic leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

interface BlogArticleProps {
  category: string
  title: ReactNode
  date: string
  dateTime: string
  readingTime: string
  standfirst: string
  children: ReactNode
}

export default function BlogArticle({ category, title, date, dateTime, readingTime, standfirst, children }: BlogArticleProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('js')

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateCursor = () => {
      cursor.style.left = mouseX - 20 + 'px'
      cursor.style.top = mouseY - 20 + 'px'
      cursorDot.style.left = mouseX + 'px'
      cursorDot.style.top = mouseY + 'px'
      animationId = requestAnimationFrame(updateCursor)
    }

    document.addEventListener('mousemove', handleMouseMove)
    updateCursor()

    const hoverElements = document.querySelectorAll('a, button, .blog-content blockquote, .blog-highlight')
    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)'
      cursor.style.borderColor = 'var(--primary-blue)'
    }
    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)'
      cursor.style.borderColor = 'var(--primary-blue)'
    }
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Immediately reveal elements already in the viewport.
    document.querySelectorAll('.scroll-fade').forEach((el) => {
      const r = (el as HTMLElement).getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' },
    )
    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el))

    if (window.innerWidth <= 768) {
      cursor.style.display = 'none'
      cursorDot.style.display = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef} />
      <div className="cursor-dot md:block hidden" ref={cursorDotRef} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 py-6 ${!isMenuOpen ? 'md:mix-blend-difference' : ''}`}>
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <Link href="/" className="text-3xl font-medium tracking-tight text-white caldera-logo hover:text-[var(--primary-blue)] transition-colors duration-300">
            caldera.agency
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/contact"
              className="hidden md:block group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-tight transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen relative flex items-center px-8 bg-gradient-to-b from-[var(--cream)] to-white overflow-hidden pt-32 md:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1" />
          <div className="floating-shape shape-2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-4 mb-6 animate-fade-in-up">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent" />
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">{category}</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent" />
            </div>

            <h1 className="hero-title mb-8 max-w-5xl animate-fade-in-up animate-delay-100">{title}</h1>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-[var(--gray-medium)] mb-10 animate-fade-in-up animate-delay-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">CA</span>
                </div>
                <span>Caldera Agency</span>
              </div>
              <span className="hidden md:inline">•</span>
              <time dateTime={dateTime}>{date}</time>
              <span className="hidden md:inline">•</span>
              <span>{readingTime}</span>
            </div>

            <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mx-auto mb-12 font-light animate-fade-in-up animate-delay-300">
              {standfirst}
            </p>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="bg-gradient-to-b from-white to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1" />
          <div className="floating-shape shape-2" />
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl" />
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-[var(--primary-blue)]/5 to-transparent rounded-full blur-xl" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`, backgroundSize: '60px 60px' }}
        />

        <div className="relative z-10 pt-8 pb-20 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            <article className="blog-content prose prose-lg max-w-none">{children}</article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }}
        />
        <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto text-center">
          <div className="max-w-4xl mx-auto scroll-fade">
            <h2 className="section-title mb-8 text-white">
              Drop your LinkedIn. <span className="font-serif italic">Get a website.</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed font-light">
              We build your site before you spend a dollar. No calls. No commitment. No homework.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group font-medium"
              >
                <div className="absolute inset-0 bg-[var(--black)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Your Free Prototype</span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
