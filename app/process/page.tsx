'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'We find you',
    body: 'We research your LinkedIn, study your positioning, and build a full working prototype of your website before making any contact. No questionnaires. No discovery calls. Just a real website, built around you.',
  },
  {
    num: '02',
    title: 'You receive it',
    body: 'You get a link to a working prototype with no commitment attached. No calls required. No dollar spent. Review it on your own time and decide if you want to move forward.',
  },
  {
    num: '03',
    title: 'We talk',
    body: 'One call. We walk through the prototype together, understand what you want to keep, what you want to change, and what your launch looks like. Send us whatever you have, organized or not. We figure it out.',
  },
  {
    num: '04',
    title: 'We refine',
    body: 'We take your feedback and build the next version. Copy, design, structure\u2014all of it. Most clients are ready to launch after one round of revisions. Some need two. Either way, you approve every change before we move on.',
  },
  {
    num: '05',
    title: 'Launch',
    body: 'Your site goes live at your domain. Hosting, domain management, and support are included for free for the first year. You own the full codebase. No lock-in, ever.',
  },
]

const stats = [
  {
    value: '10 days',
    description:
      'The average time from first call to launch. Responsive clients have launched in under a week.',
  },
  {
    value: '2 hours',
    description:
      'The average time a client spends during the entire process.',
  },
  {
    value: '$0 upfront',
    description:
      'You see your prototype before paying a single dollar. We move forward only if you love it.',
  },
]

export default function ProcessPage() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navDark, setNavDark] = useState(false)

  const scrollToNearestForm = useCallback(() => {
    const target = document.getElementById('prototype-form') || document.getElementById('prototype-form-bottom')
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  // Cursor
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

  // Scroll-fade observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Nav dark state based on stats section visibility
  useEffect(() => {
    const statsEl = document.getElementById('stats-section')
    if (!statsEl) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statsEl,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setNavDark(true),
        onLeave: () => setNavDark(false),
        onEnterBack: () => setNavDark(true),
        onLeaveBack: () => setNavDark(false),
      })
    })

    return () => ctx.revert()
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
            <button onClick={scrollToNearestForm}
              className={`hidden md:block group relative overflow-hidden px-6 py-3 rounded-lg text-sm tracking-tight transition-all duration-500 hover:scale-105 ${navDark ? 'bg-white text-[var(--black)]' : 'bg-[var(--black)] text-white'}`}>
              <div className={`absolute inset-0 ${navDark ? 'bg-[var(--black)]' : 'bg-[var(--primary-blue)]'} transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0`} />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                Get Your Free Prototype
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </button>
            <Menu onMenuToggle={setIsMenuOpen} dark={navDark} />
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center relative bg-[var(--cream)] overflow-hidden pt-20 md:pt-0">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full px-8 md:px-16 text-center flex flex-col items-center">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-6 scroll-fade">Our Process</p>

          <h1 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-light tracking-tight leading-[0.95] mb-6 text-[var(--black)] scroll-fade">
            We&apos;ll build your site before you<br className="hidden md:block" /> spend <span className="font-serif italic font-normal text-[var(--primary-blue)]">a dollar</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mb-10 scroll-fade">
            No forms. No briefing calls. No homework. We research your background, build a working prototype, and send it to you before you&apos;ve spent a cent. You only move forward if you love it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 scroll-fade">
            <Link
              href="/#contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10 group-hover:text-white">Get Your Free Prototype</span>
              <span className="relative z-10 group-hover:text-white">&rarr;</span>
            </Link>
            <button
              onClick={() => {
                document.getElementById('process-timeline')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
              className="inline-flex items-center gap-2 text-[var(--black)] text-[15px] no-underline relative group"
            >
              <span>See how it works</span>
              <span className="transition-transform duration-300 group-hover:translate-y-1">&darr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── All scrollable content ─── */}
      <div className="relative z-10">

        {/* ─── Timeline Steps ─── */}
        <section id="process-timeline" className="py-24 md:py-32 px-8 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Step by step</p>
            <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">How It Works</h2>

            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div key={step.num}>
                  {/* Step card */}
                  <div
                    className="bg-[var(--cream)] rounded-2xl p-7 md:p-10 scroll-fade"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-8 items-start">
                      {/* Number */}
                      <div className="flex items-center gap-4 md:block">
                        <span className="text-[var(--primary-blue)]/40 font-[family-name:var(--font-bebas)] text-4xl md:text-5xl leading-none">{step.num}</span>
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[var(--black)] md:hidden">{step.title}</h3>
                      </div>
                      {/* Content */}
                      <div>
                        <h3 className="hidden md:block text-xl md:text-2xl font-medium tracking-tight text-[var(--black)] mb-3">{step.title}</h3>
                        <p className="text-[15px] md:text-base leading-relaxed text-[var(--gray-medium)]">{step.body}</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector between cards */}
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-4 scroll-fade" style={{ transitionDelay: `${i * 80 + 40}ms` }}>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-6 bg-gradient-to-b from-[var(--primary-blue)]/30 to-[var(--primary-blue)]" />
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="text-[var(--primary-blue)] animate-[process-arrow-bounce_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.3}s` }}>
                          <path d="M1 1L7 8L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section id="stats-section" className="py-24 md:py-32 px-8 relative overflow-hidden bg-[var(--black)] noise-overlay">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={stat.value} className="text-center scroll-fade" style={{ transitionDelay: `${i * 100}ms` }}>
                  <p className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4 font-serif italic">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-[15px] leading-relaxed max-w-xs mx-auto">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Closing CTA ─── */}
        <section className="relative overflow-hidden bg-white">
          {/* Grid pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-xl mx-auto text-center">
            <h2 className="section-title mb-6 scroll-fade">
              Ready to see what we can build <span className="font-serif italic text-[var(--primary-blue)]">for you?</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mx-auto mb-10 scroll-fade">
              Drop your LinkedIn URL and we&apos;ll send you a free prototype. No calls. No commitment. No homework.
            </p>
            <div className="scroll-fade">
              <Link
                href="/#contact"
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
              >
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                <span className="relative z-10 group-hover:text-white">Get Your Free Prototype</span>
                <span className="relative z-10 group-hover:text-white">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
