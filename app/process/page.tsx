'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

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

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .process-card, .timeline-step')

    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)'
      cursor.style.borderColor = 'var(--primary-blue)'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)'
      cursor.style.borderColor = 'var(--primary-blue)'
    }

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Immediately reveal elements already in the viewport
    document.querySelectorAll('.scroll-fade').forEach(el => {
      const r = (el as HTMLElement).getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
    })

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' }
    )

    document.querySelectorAll('.scroll-fade').forEach(el => {
      observer.observe(el)
    })

    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
      cursor.style.display = 'none'
      cursorDot.style.display = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef}></div>
      <div className="cursor-dot md:block hidden" ref={cursorDotRef}></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 py-6 ${!isMenuOpen ? 'md:mix-blend-difference' : ''}`}>
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <Link href="/" className="text-3xl font-medium tracking-tight text-white caldera-logo hover:text-[var(--primary-blue)] transition-colors duration-300">
            caldera.agency
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/#contact"
              className="hidden md:block group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-tight transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 bg-gradient-to-b from-[var(--cream)] to-white overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="process-hero-shape process-shape-1"></div>
          <div className="process-hero-shape process-shape-2"></div>
          <div className="process-hero-shape process-shape-3"></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-4 mb-6 animate-fade-in-up">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Process</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
          </div>

          <h1 className="hero-title mb-8 max-w-5xl animate-fade-in-up animate-delay-100">
            We&apos;ll build your site before you spend <span className="font-serif italic font-normal text-[var(--primary-blue)]">a dollar.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-12 font-light animate-fade-in-up animate-delay-200">
            No forms. No briefing calls. No homework. We research your background, build a working prototype, and send it to you before you&apos;ve spent a cent. You only move forward if you love it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10">Get Your Free Prototype</span>
              <span className="relative z-10">&rarr;</span>
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

      {/* Timeline Section */}
      <section className="bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Separator */}
        <div className="py-5 relative">
          <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gray-light)] to-[var(--primary-blue)]/30"></div>
              <div className="relative mx-8">
                <div className="w-12 h-12 border border-[var(--gray-light)] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rotate-45 rounded-sm"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--gray-light)] to-[var(--primary-blue)]/30"></div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div id="process-timeline" className="relative">
          <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/60 to-[var(--primary-blue)]/30 hidden lg:block"></div>

              <div className="space-y-16 lg:space-y-32">
                {steps.map((step, i) => {
                  const isEven = i % 2 === 1

                  return (
                    <div key={step.num} className="timeline-step relative scroll-fade">
                      {/* Mobile Layout */}
                      <div className="lg:hidden">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                            {step.num}
                          </div>
                          <h3 className="text-2xl font-light text-[var(--black)] tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                        <div className="process-card invitation-card-container">
                          <div className="invitation-card-bg"></div>
                          <div className="invitation-card">
                            <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        {/* Card side */}
                        <div className={`lg:col-span-5 ${isEven ? 'lg:pr-8 order-2 lg:order-1' : 'lg:pr-8'}`}>
                          {isEven ? (
                            <div className="text-center lg:text-right">
                              <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4 tracking-tight">
                                {step.title}
                              </div>
                            </div>
                          ) : (
                            <div className="process-card invitation-card-container">
                              <div className="invitation-card-bg"></div>
                              <div className="invitation-card">
                                <div className="mb-4">
                                  <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                                    <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">
                                      Step {step.num}
                                    </span>
                                  </div>
                                  <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                                    {step.title}
                                  </h3>
                                </div>
                                <p className="text-base text-[var(--gray-dark)] leading-relaxed font-light">
                                  {step.body}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Center number */}
                        <div className={`lg:col-span-2 flex justify-center my-8 lg:my-0 ${isEven ? 'order-1 lg:order-2' : ''}`}>
                          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                            {step.num}
                          </div>
                        </div>

                        {/* Label side */}
                        <div className={`lg:col-span-5 ${isEven ? 'lg:pl-8 order-3' : 'lg:pl-8'}`}>
                          {isEven ? (
                            <div className="process-card invitation-card-container">
                              <div className="invitation-card-bg"></div>
                              <div className="invitation-card">
                                <div className="mb-4">
                                  <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                                    <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">
                                      Step {step.num}
                                    </span>
                                  </div>
                                  <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                                    {step.title}
                                  </h3>
                                </div>
                                <p className="text-base text-[var(--gray-dark)] leading-relaxed font-light">
                                  {step.body}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center lg:text-left">
                              <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4 tracking-tight">
                                {step.title}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Stats Block */}
          <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
            <div className="max-w-5xl mx-auto scroll-fade">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {stats.map((stat) => (
                  <div key={stat.value} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full border border-[var(--primary-blue)]/20 flex items-center justify-center">
                        <span className="text-3xl font-serif italic text-[var(--primary-blue)]">
                          {stat.value}
                        </span>
                      </div>
                    </div>
                    <p className="text-[var(--gray-medium)] text-sm leading-relaxed max-w-xs mx-auto">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto text-center">
          <div className="max-w-4xl mx-auto scroll-fade">
            <h2 className="section-title mb-8 text-white">
              Ready to see what we build <span className="font-serif italic">for you?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed font-light">
              Drop your LinkedIn URL and we&apos;ll send you a free prototype. No calls. No commitment. No homework.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group font-medium"
            >
              <div className="absolute inset-0 bg-[var(--black)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Your Free Prototype</span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
