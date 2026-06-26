'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import { caseStudies, workTestimonials } from '@/lib/work'

gsap.registerPlugin(ScrollTrigger)

/** Domain label shown in the browser chrome and used as a card-title fallback. */
function hostLabel(url?: string) {
  return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
}

export default function WorkClient() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const themedSectionRefs = useRef<(HTMLElement | null)[]>([])
  const lenisRef = useRef<Lenis | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navDark, setNavDark] = useState(false)

  const scrollToCaseStudies = useCallback(() => {
    const el = document.getElementById('case-studies')
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el)
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Background theming. The scroll container is BLACK (the case-studies backdrop), and
  // the testimonials + CTA sections paint their own white background,so the white
  // begins right at the top edge of the testimonials section, the moment it scrolls in,
  // while the case-studies section stays black and untouched. The nav logo flips to
  // match whatever section currently sits behind it.

  // Custom cursor (matches the rest of the site)
  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    if (window.innerWidth <= 768) {
      cursor.style.display = 'none'
      dot.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0, dotX = 0, dotY = 0

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    document.addEventListener('mousemove', handleMouseMove)

    const update = () => {
      curX += (mouseX - curX) * 0.15
      curY += (mouseY - curY) * 0.15
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      cursor.style.left = curX - 20 + 'px'
      cursor.style.top = curY - 20 + 'px'
      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'
    }
    gsap.ticker.add(update)

    const magnetics = document.querySelectorAll('a, button')
    const magnetEnter = () => {
      cursor.style.width = '60px'; cursor.style.height = '60px'; cursor.style.marginLeft = '-10px'; cursor.style.marginTop = '-10px'
      cursor.style.borderColor = 'var(--primary-blue)'; cursor.style.opacity = '0.5'
    }
    const magnetLeave = () => {
      cursor.style.width = '40px'; cursor.style.height = '40px'; cursor.style.marginLeft = '0'; cursor.style.marginTop = '0'
      cursor.style.opacity = '1'
    }
    magnetics.forEach(el => { el.addEventListener('mouseenter', magnetEnter); el.addEventListener('mouseleave', magnetLeave) })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(update)
      magnetics.forEach(el => { el.removeEventListener('mouseenter', magnetEnter); el.removeEventListener('mouseleave', magnetLeave) })
    }
  }, [])

  // Scroll-fade reveal
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Background theme switching,mirrors the homepage exactly, including the Lenis
  // smooth scroll that makes the background-colour transitions feel slow and
  // deliberate rather than snapping on native scroll.
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const caseEl = themedSectionRefs.current[0]
    const testiEl = themedSectionRefs.current[1]

    const ctx = gsap.context(() => {
      // These triggers only flip the nav logo to match whatever section is behind it.
      // Hero (cream) → case studies (black): logo turns white once the black section
      // sits behind the nav.
      if (caseEl) {
        ScrollTrigger.create({
          trigger: caseEl,
          start: 'top top',
          onEnter: () => setNavDark(true),
          onLeaveBack: () => setNavDark(false),
        })
      }
      // Case studies (black) → testimonials/CTA (white): logo turns dark once the white
      // section sits behind the nav. The white background itself is painted by the
      // sections, so it appears the moment the testimonials scrolls into view.
      if (testiEl) {
        ScrollTrigger.create({
          trigger: testiEl,
          start: 'top top',
          onEnter: () => setNavDark(false),
          onLeaveBack: () => setNavDark(true),
        })
      }
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef} />
      <div className="cursor-dot md:block hidden" ref={cursorDotRef} />

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-5 transition-all duration-500">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <Link href="/" className={`text-3xl font-medium tracking-tight caldera-logo transition-colors duration-500 no-underline ${navDark ? 'text-white' : 'text-[var(--black)]'}`}>
            caldera.agency
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/contact"
              className={`hidden md:block group relative overflow-hidden px-6 py-3 rounded-lg text-sm tracking-tight transition-all duration-500 hover:scale-105 no-underline ${navDark ? 'bg-white text-[var(--black)]' : 'bg-[var(--black)] text-white'}`}>
              <div className={`absolute inset-0 ${navDark ? 'bg-[var(--black)]' : 'bg-[var(--primary-blue)]'} transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0`} />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                Get your free prototype
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} dark={navDark} />
          </div>
        </div>
      </nav>

      {/* ─── Hero (homepage-style: cream, grid pattern, centered) ─── */}
      <section className="min-h-screen flex items-center relative bg-[var(--cream)] overflow-hidden pt-20 md:pt-0">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full px-8 md:px-16 text-center flex flex-col items-center">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-6 scroll-fade">Case studies</p>

          <h1 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-light tracking-tight leading-[0.95] mb-6 text-[var(--black)] scroll-fade">
            A Portfolio of <span className="font-serif italic font-normal text-[var(--primary-blue)]">Consultant Websites</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mb-10 scroll-fade">
            A selection of projects where we shaped the strategy, wrote the copy, designed the experience, and built the site around the consultant&rsquo;s expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 scroll-fade">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10 group-hover:text-white">Get your free prototype</span>
              <span className="relative z-10 group-hover:text-white">&rarr;</span>
            </Link>
            <button
              onClick={scrollToCaseStudies}
              className="inline-flex items-center gap-2 text-[var(--black)] text-[15px] no-underline relative group"
            >
              <span>See the work</span>
              <span className="transition-transform duration-300 group-hover:translate-y-1">&darr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Scrollable content with homepage-style background change ─── */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 theme-container"
        style={{ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)', transition: 'background-color 400ms ease-out' }}
      >
        {/* Case studies,browser-frame cards (homepage "Highlighted Work" style) */}
        <section ref={el => { themedSectionRefs.current[0] = el }} id="case-studies" className="py-24 md:py-32 px-8 md:px-16">
          <div className="max-w-screen-2xl mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Selected work</p>
            <h2 className="section-title text-center mb-14 md:mb-16 scroll-fade">What it looks like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {caseStudies.filter((c) => !c.hidden).map((c, i) => {
                const title = c.name || hostLabel(c.url)
                const Card = (
                  <>
                    {/* Browser frame */}
                    <div className="relative rounded-2xl bg-white/10 border border-white/10 overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        </div>
                        {c.url && (
                          <div className="flex-1 ml-3">
                            <div className="bg-white/10 rounded-md px-3 py-1 text-xs text-white/50 max-w-[200px] truncate">{hostLabel(c.url)}</div>
                          </div>
                        )}
                      </div>
                      {/* Screenshot,natural aspect ratio, no crop */}
                      {c.image && (
                        <Image src={c.image} alt={`${title} website`} width={1200} height={800} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 50vw" />
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex items-start justify-between">
                      <div>
                        {title && <h3 className="text-xl font-medium tracking-tight mb-1 text-white">{title}</h3>}
                        {c.role && <p className="text-sm text-[var(--blue-light)] font-medium mb-2">{c.role}</p>}
                        {c.summary && <p className="text-white/50 text-sm leading-relaxed">{c.summary}</p>}
                      </div>
                      {c.url && (
                        <span className="text-white/30 group-hover:text-[var(--blue-light)] transition-all duration-300 group-hover:translate-x-1 mt-1 flex-shrink-0 ml-4">&rarr;</span>
                      )}
                    </div>
                  </>
                )
                return c.url ? (
                  <a key={c.url || i} href={c.url} target="_blank" rel="noopener noreferrer" className="scroll-fade group block no-underline" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    {Card}
                  </a>
                ) : (
                  <div key={c.url || i} className="scroll-fade group block">
                    {Card}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials,white section with cream cards (paints its own background) */}
        <section ref={el => { themedSectionRefs.current[1] = el }} className="bg-white py-24 md:py-32 px-8 md:px-16">
          <div className="max-w-screen-lg mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Testimonials</p>
            <h2 className="section-title text-center mb-12 md:mb-16 scroll-fade text-[var(--black)]">What clients say</h2>
            <div className="flex flex-col gap-6">
              {workTestimonials.map((t) => (
                <figure key={t.name} className="scroll-fade bg-[var(--cream)] rounded-2xl p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
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
          </div>
        </section>

        {/* Closing CTA,light section (paints its own background) */}
        <section ref={el => { themedSectionRefs.current[2] = el }} className="relative bg-white py-24 md:py-32 px-8 md:px-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="relative z-10 max-w-screen-lg mx-auto text-center">
            <h2 className="text-[clamp(28px,4vw,52px)] font-light tracking-tight leading-tight mb-5 text-[var(--black)]">
              Want to see <span className="font-serif italic text-[var(--primary-blue)]">yours</span>?
            </h2>
            <p className="text-[var(--gray-medium)] leading-relaxed max-w-2xl mx-auto mb-8">
              Drop your LinkedIn and we will build a free working prototype of your website. No calls. No commitment. No homework.
            </p>
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10 group-hover:text-white">Get your free prototype</span>
              <span className="relative z-10 group-hover:text-white">&rarr;</span>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
