'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function AboutPage() {
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
    const hoverElements = document.querySelectorAll('a, button, .about-card')

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
    const observerOptions = {
      threshold: 0.01,
      rootMargin: '0px 0px -10% 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

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

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 bg-gradient-to-b from-[var(--cream)] to-white overflow-hidden pt-22 md:pt-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-4 mb-6 animate-fade-in-up">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">About Us</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
          </div>

          <h1 className="hero-title mb-8 max-w-5xl animate-fade-in-up animate-delay-100">
            We exist for one reason: <span className="font-serif italic font-normal text-[var(--primary-blue)]">to close the gap between what consultants have built and how they show up online.</span>
          </h1>

          <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-12 font-light animate-fade-in-up animate-delay-200">
            Every part of our process is designed so that consultants get a site that wins higher-value clients with zero wasted time, zero busywork, and zero generic agency playbook.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10">Start Your Project</span>
              <span className="relative z-10">→</span>
            </Link>
            <button
              onClick={() => {
                document.getElementById('why-we-exist')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
              className="inline-flex items-center gap-2 text-[var(--black)] text-[15px] no-underline relative group"
            >
              <span>Read Our Story</span>
              <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section id="why-we-exist" className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="text-center mb-16 scroll-fade">
            <h2 className="section-title mb-8">
              Why <span className="font-serif italic text-[var(--primary-blue)]">Caldera</span> Exists
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-20">
            {/* The Problem We Saw */}
            <div className="scroll-fade">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">01</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight">
                  The problem we kept seeing
                </h3>
              </div>
              <div className="pl-16 space-y-5">
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  Before starting Caldera, we spent thousands of hours connecting independent consultants with investors and global enterprises. We talked to hundreds of experts. Brilliant people who had shaped entire industries, built operating models from scratch, and turned around struggling businesses.
                </p>
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  Most of them had no website. Or one that looked like it was built in 2012 and never touched again.
                </p>
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  They were losing RFPs to competitors who were simply more polished online. They were getting warm referrals with nowhere to send them. They were relying entirely on LinkedIn and hoping the algorithm stayed kind.
                </p>
              </div>
            </div>

            {/* The LinkedIn Trap */}
            <div className="scroll-fade">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">02</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight">
                  LinkedIn is not a platform
                </h3>
              </div>
              <div className="pl-16 space-y-5">
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  LinkedIn is a great place to get found. It is a terrible place to market yourself. It gives you a profile, not a platform. It controls your layout, your format, and your reach.
                </p>
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  You get compared to every other consultant in your niche on the same page, with the same template. That is how brilliant people get commoditized.
                </p>
              </div>
            </div>

            {/* The Real Gap */}
            <div className="scroll-fade">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">03</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight">
                  The gap that is not closing on its own
                </h3>
              </div>
              <div className="pl-16 space-y-5">
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  Every serious business has a website. Independent consulting is a serious business. The gap between what consultants have built and how they present it online is one of the biggest missed opportunities in professional services.
                </p>
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  And it is not closing on its own, because the problem was never awareness. The problem is that doing it right takes time, expertise, and guidance that most consultants do not have and should not need to develop.
                </p>
              </div>
            </div>

            {/* What We Built */}
            <div className="scroll-fade">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">04</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight">
                  So we built Caldera to close it
                </h3>
              </div>
              <div className="pl-16 space-y-5">
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  We find consultants who are underrepresented online, we build their site before we ever reach out, and we let the work make the case.
                </p>
                <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                  We do the research, write the copy, design the site, and handle the launch. You send us whatever you have and we figure out the rest. We only work with consultants because that focus is what makes the work sharp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype-First Philosophy */}
      <section className="bg-gradient-to-b from-[var(--cream)] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="max-w-4xl mx-auto scroll-fade">
            <div className="invitation-card-container">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="text-center mb-8">
                  <h2 className="section-title-secondary mb-6">
                    Why we build your prototype <span className="font-serif italic text-[var(--primary-blue)]">before you spend a dollar</span>
                  </h2>
                </div>
                <div className="max-w-2xl mx-auto space-y-5">
                  <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                    Not as a sales tactic, but as a filter. We only reach out when we have something worth showing. It keeps our standards high, makes the value self-evident, and lets you decide based on real work instead of vague promises.
                  </p>
                  <p className="text-base md:text-lg text-[var(--gray-dark)] leading-relaxed font-light">
                    We keep the entry point accessible because we would rather build a long-term relationship with the best of the best than extract maximum revenue from the first few who find us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="text-center mb-16 scroll-fade">
            <h2 className="section-title mb-8">
              What Makes Our Process <span className="font-serif italic text-[var(--primary-blue)]">Different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Consultants Only */}
            <div className="about-card invitation-card-container scroll-fade">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">01</span>
                  </div>
                  <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                    Consultants only. No distractions, no dilution.
                  </h3>
                </div>
                <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                  We don&apos;t take on projects for agencies, local businesses, or e-commerce. Everything we do is built around what matters most for solo consultants: establishing credibility, driving high-value inbound, and freeing you from project headaches and admin bloat.
                </p>
              </div>
            </div>

            {/* No Busywork */}
            <div className="about-card invitation-card-container scroll-fade">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">02</span>
                  </div>
                  <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                    No busywork, ever.
                  </h3>
                </div>
                <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                  We research your background and consulting market before you see a single question. No generic forms or open-ended guesswork.
                </p>
              </div>
            </div>

            {/* Clear Feedback */}
            <div className="about-card invitation-card-container scroll-fade">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">03</span>
                  </div>
                  <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                    Clear, structured feedback.
                  </h3>
                </div>
                <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                  Each review round is focused, with our guidance on what to check and how to comment.
                </p>
              </div>
            </div>

            {/* Milestone Payments */}
            <div className="about-card invitation-card-container scroll-fade">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">04</span>
                  </div>
                  <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                    Milestone payments, always in your control.
                  </h3>
                </div>
                <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                  You approve each phase before paying. You never risk being left with a half-finished website.
                </p>
              </div>
            </div>

            {/* We Handle Everything */}
            <div className="about-card invitation-card-container scroll-fade">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">05</span>
                  </div>
                  <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                    We handle everything after.
                  </h3>
                </div>
                <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                  Launch, domain, analytics, hosting, tech support, and post-launch tweaks are all managed by us so you can stay focused on your work.
                </p>
              </div>
            </div>

            {/* Full Ownership */}
            <div className="about-card invitation-card-container scroll-fade">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">06</span>
                  </div>
                  <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                    Full ownership, zero lock-in.
                  </h3>
                </div>
                <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                  You own your website, domain, and content 100%. Move, host, or upgrade anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Goal */}
      <section className="bg-[var(--gray-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-2xl mx-auto text-center">
          <div className="max-w-3xl mx-auto scroll-fade">
            <h2 className="section-title-secondary mb-8 text-white">
              The <span className="font-serif italic">goal</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-6">
              We make our process as seamless as possible. We focus on building a strong network instead of squeezing margins. We deliver all the value upfront.
            </p>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
              When a consultant is ready to invest in how they show up online, we want to be the only conversation that matters.
            </p>
          </div>
        </div>
      </section>

      {/* What Every Site Must Deliver */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-[var(--primary-blue)]/5 to-transparent rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="text-center mb-16 scroll-fade">
            <h2 className="section-title mb-8">
              What Every Caldera Site Must <span className="font-serif italic text-[var(--primary-blue)]">Deliver</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto scroll-fade">
            <div className="invitation-card-container">
              <div className="invitation-card-bg"></div>
              <div className="invitation-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-medium text-[var(--black)] mb-2">Instant Clarity</h3>
                        <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                          In 5 seconds, any visitor knows who you help, what you do, and why you&apos;re legit.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-medium text-[var(--black)] mb-2">Authority on Display</h3>
                        <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                          Results, track record, methods, and credentials are front and center and expertise is communicated clearly.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-medium text-[var(--black)] mb-2">Professional Impression</h3>
                        <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                          Modern, tasteful, and credible. Not forced, not bland.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-medium text-[var(--black)] mb-2">Referral Ready</h3>
                        <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                          Every client should be proud to link it, and every referrer confident to send someone there.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-lg font-medium text-[var(--black)] mb-2">No Admin Headache</h3>
                        <p className="text-sm text-[var(--gray-dark)] leading-relaxed font-light">
                          Consultants only do what they must. Everything else is handled.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto text-center">
          <div className="max-w-4xl mx-auto scroll-fade">
            <h2 className="section-title mb-8 text-white">
              Ready to Get <span className="font-serif italic">Started?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed font-light">
              Let&apos;s discuss your project and show you exactly how our process works for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group font-medium"
              >
                <div className="absolute inset-0 bg-[var(--black)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Project</span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
