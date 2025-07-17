'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function ProcessPage() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
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

    // Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
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
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 py-6 ${!isMenuOpen ? 'mix-blend-difference' : ''}`}>
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
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 bg-gradient-to-b from-[var(--cream)] to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="process-hero-shape process-shape-1"></div>
          <div className="process-hero-shape process-shape-2"></div>
          <div className="process-hero-shape process-shape-3"></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-4 mb-6 scroll-fade animate-fade-in-up">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Process</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
          </div>

          <h1 className="hero-title mb-8 max-w-5xl animate-fade-in-up animate-delay-100">
            No homework, no chaos, no agency runaround. <span className="font-serif italic font-normal text-[var(--primary-blue)]">Approve, launch, done.</span>
          </h1>

          <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mb-12 font-light animate-fade-in-up animate-delay-200">
            Here&apos;s exactly how your custom website project unfolds, clear, predictable, and designed to deliver maximum impact with minimal effort from you.
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
                document.getElementById('process-timeline')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
              className="inline-flex items-center gap-2 text-[var(--black)] text-[15px] no-underline relative group"
            >
              <span>See the Timeline</span>
              <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Combined Cream Sections */}
      <section className="bg-gradient-to-b from-white to-white relative overflow-hidden">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary floating shapes */}
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>

          {/* Large gradient blurs */}
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-[var(--primary-blue)]/5 to-transparent rounded-full blur-xl"></div>

          {/* Ambient light spots */}
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[var(--primary-blue)]/8 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-[var(--blue-light)]/12 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/6 right-1/6 w-20 h-20 bg-[var(--primary-blue)]/6 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>

          {/* Geometric elements */}
          <div className="absolute top-1/5 left-1/12 w-40 h-40 border border-[var(--primary-blue)]/15 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/3 right-1/8 w-28 h-28 border border-[var(--blue-light)]/20 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/12 w-16 h-16 bg-[var(--primary-blue)]/8 rounded-full"></div>
          <div className="absolute bottom-1/5 left-1/8 w-20 h-20 bg-[var(--blue-light)]/10 rounded-lg rotate-12"></div>
        </div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Sophisticated Separator */}
        <div className="py-5 relative">
          <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gray-light)] to-[var(--primary-blue)]/30"></div>
              <div className="relative mx-8">
                <div className="w-12 h-12 border border-[var(--gray-light)] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rotate-45 rounded-sm"></div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary-blue)]/40 rounded-full"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary-blue)]/40 rounded-full"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--gray-light)] to-[var(--primary-blue)]/30"></div>
            </div>
          </div>
        </div>

        {/* Process Timeline Section */}
        <div id="process-timeline" className="relative">
          <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
            {/* Central Timeline */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/60 to-[var(--primary-blue)]/30 hidden lg:block"></div>

              <div className="space-y-16 lg:space-y-32">
                {/* Step 1 - Research */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        01
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Research</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Deep analysis of your existing presence
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step One</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            We do the research
                          </h3>
                          <p className="text-sm text-[var(--gray-medium)] font-light italic">Zero busywork for you</p>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          Before you see a single question, we research your LinkedIn, existing website, and published content to:
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Prefill your details, saving you time
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Craft precise, targeted questions for your unique positioning
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Ensure maximum accuracy from day one
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Intake is fast, focused, and effortless.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step One</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              We do the research
                            </h3>
                            <p className="text-sm text-[var(--gray-medium)] font-light italic">Zero busywork for you</p>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            Before you see a single question, we research your LinkedIn, existing website, and published content to:
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Prefill your details, saving you time</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Craft precise, targeted questions for your unique positioning</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Ensure maximum accuracy from day one</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Intake is fast, focused, and effortless.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        01
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8">
                      <div className="text-center lg:text-left">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Research</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Deep analysis of your existing presence, expertise, and market positioning
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Intake */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        02
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Intake</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Streamlined form completion
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Two</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Quick, targeted intake form
                          </h3>
                          <p className="text-sm text-[var(--gray-medium)] font-light italic">~10 minutes</p>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          You complete a short, custom-built form:
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Confirm pre-filled info (name, title, experience)
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Choose from tailored options about services and differentiators
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Select visual preferences from handpicked examples
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Foundation for all structure, copy, and design decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8 order-2 lg:order-1">
                      <div className="text-center lg:text-right">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Intake</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Streamlined form completion with pre-filled data and targeted choices
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0 order-1 lg:order-2">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        02
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8 order-3">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Two</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Quick, targeted intake form
                            </h3>
                            <p className="text-sm text-[var(--gray-medium)] font-light italic">~10 minutes</p>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            You complete a short, custom-built form:
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Confirm pre-filled info (name, title, experience)</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Choose from tailored options about services and differentiators</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Select visual preferences from handpicked examples</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Foundation for all structure, copy, and design decisions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Recommendations */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        03
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Choice</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Strategic options presentation
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Three</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Homepage recommendations
                          </h3>
                          <p className="text-sm text-[var(--gray-medium)] font-light italic">~5 minutes</p>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          We design a best-fit homepage structure plus two custom alternatives.
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Review quick visual options and select your favorite
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Add comments or minor adjustments
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Provide remaining branding assets (optional)
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> You retain control, we handle execution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Three</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Homepage recommendations
                            </h3>
                            <p className="text-sm text-[var(--gray-medium)] font-light italic">~5 minutes</p>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            We design a best-fit homepage structure plus two custom alternatives.
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Review quick visual options and select your favorite</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Add comments or minor adjustments</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Provide remaining branding assets (optional)</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> You retain control, we handle execution.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        03
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8">
                      <div className="text-center lg:text-left">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Choice</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Strategic options presentation with visual mockups for informed decisions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 - Homepage Demo */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        04
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Demo</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Interactive homepage review
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Four</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Homepage demo & easy review
                          </h3>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          We build your homepage with custom copy and design, then:
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Provide a live, interactive demo (never a static PDF)
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Include a clear Review Guide to simplify feedback
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Send testimonials or use professional placeholders
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Easy review, no headaches.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8 order-2 lg:order-1">
                      <div className="text-center lg:text-right">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Demo</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Interactive homepage review with clear guidance and feedback structure
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0 order-1 lg:order-2">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        04
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8 order-3">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Four</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Homepage demo & easy review
                            </h3>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            We build your homepage with custom copy and design, then:
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Provide a live, interactive demo (never a static PDF)</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Include a clear Review Guide to simplify feedback</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Send testimonials or we&apos;ll use professional placeholders</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Easy review, no headaches.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 - Complete Build */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        05
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Build</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Complete website construction
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Five</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Complete website build & final review
                          </h3>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          After your homepage approval, we quickly build out all core pages.
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • All pages built using your approved design system
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Complete website demo for final approval
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Minor tweaks and refinements as needed
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Complete website exactly as planned, edits are fast and structured.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Five</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Complete website build & final review
                            </h3>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            After your homepage approval, we quickly build out all core pages.
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">All pages built using your approved design system</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Complete website demo for final approval</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Minor tweaks and refinements as needed</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Complete website exactly as planned, edits are fast and structured.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        05
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8">
                      <div className="text-center lg:text-left">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Build</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Complete website construction with all pages following your approved design
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 - Pre-Launch */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        06
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Ready</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Technical setup and optimization
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Six</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Pre-launch final checklist
                          </h3>
                          <p className="text-sm text-[var(--gray-medium)] font-light italic">~10 minutes</p>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          We implement final refinements and handle all technical setup:
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Connect your domain and configure DNS
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Set up analytics, Search Console, and SEO optimization
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Quick call to confirm you&apos;re ready to launch
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Everything is launch-ready, optimized, and aligned with your goals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8 order-2 lg:order-1">
                      <div className="text-center lg:text-right">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Ready</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Technical setup and optimization to ensure perfect launch performance
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0 order-1 lg:order-2">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        06
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8 order-3">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Six</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Pre-launch final checklist
                            </h3>
                            <p className="text-sm text-[var(--gray-medium)] font-light italic">~10 minutes</p>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            We implement final refinements and handle all technical setup:
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Connect your domain and configure DNS</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Set up analytics, Search Console, and SEO optimization</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                    LinkedIn is just one platform. A professional website gives you full control over your digital presence, establishes deeper credibility, and positions you at a higher tier than competitors who rely solely on social media. Don&apos;t risk being at the mercy of algorithms and sudden policy changes.
                                <span className="font-medium text-[var(--black)]">Quick call to confirm you&apos;re ready to launch</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Everything is launch-ready, optimized, and aligned with your goals.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 7 - Launch */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        07
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Live</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Official launch with brand assets
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Seven</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Launch & announce
                          </h3>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          Your new, bespoke website goes live with immediate credibility assets:
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Website goes live at your domain
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Custom LinkedIn banner designed for your brand
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Social media launch assets and templates
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Immediate visibility, credibility, and authority.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Seven</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Launch & announce
                            </h3>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            Your new, bespoke website goes live with immediate credibility assets:
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Website goes live at your domain</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Custom LinkedIn banner designed for your brand</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Social media launch assets and templates</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Immediate visibility, credibility, and authority.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        07
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8">
                      <div className="text-center lg:text-left">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Live</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Official launch with comprehensive brand assets for immediate market presence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 8 - Ongoing Support */}
                <div className="timeline-step relative scroll-fade">
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-lg font-light shadow-lg">
                        08
                      </div>
                      <div>
                        <h4 className="text-3xl font-light text-[var(--primary-blue)]/60 mb-1">Support</h4>
                        <p className="text-sm text-[var(--gray-medium)] font-light">
                          Comprehensive ongoing maintenance
                        </p>
                      </div>
                    </div>
                    <div className="process-card invitation-card-container">
                      <div className="invitation-card-bg"></div>
                      <div className="invitation-card">
                        <div className="mb-6">
                          <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                            <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Eight</span>
                          </div>
                          <h3 className="text-xl font-light text-[var(--black)] tracking-tight mb-3">
                            Ongoing support
                          </h3>
                          <p className="text-sm text-[var(--gray-medium)] font-light italic">1-year included</p>
                        </div>
                        <p className="text-sm text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                          Comprehensive support package to keep your website running perfectly:
                        </p>
                        <div className="space-y-3">
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Hosting, domain management, and email support
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Up to 2 hours/month development support (4 hours first month)
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--black)] font-medium">
                            • Quick updates and improvements as needed
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                          <p className="text-sm font-light text-[var(--primary-blue)]">
                            <span className="font-serif italic">Outcome:</span> Zero technical worries, ongoing flexibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5 lg:pr-8 order-2 lg:order-1">
                      <div className="text-center lg:text-right">
                        <div className="text-6xl lg:text-8xl font-light text-[var(--primary-blue)]/20 mb-4">Support</div>
                        <p className="text-lg text-[var(--gray-medium)] font-light">
                          Comprehensive ongoing maintenance and development support included
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-2 flex justify-center my-8 lg:my-0 order-1 lg:order-2">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-light shadow-lg">
                        08
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:pl-8 order-3">
                      <div className="process-card invitation-card-container">
                        <div className="invitation-card-bg"></div>
                        <div className="invitation-card">
                          <div className="mb-6">
                            <div className="inline-block bg-[var(--blue-light)] border border-[var(--primary-blue)]/20 rounded-full px-3 py-1.5 mb-4">
                              <span className="text-xs tracking-widest uppercase text-[var(--primary-blue)] font-medium">Step Eight</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light text-[var(--black)] tracking-tight mb-3">
                              Ongoing support
                            </h3>
                            <p className="text-sm text-[var(--gray-medium)] font-light italic">1-year included</p>
                          </div>
                          <p className="text-base text-[var(--gray-dark)] mb-6 leading-relaxed font-light">
                            Comprehensive support package to keep your website running perfectly:
                          </p>
                          <div className="space-y-4">
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Hosting, domain management, and email support</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Up to 2 hours/month development support (4 hours first month)</span>
                              </div>
                            </div>
                            <div className="group">
                              <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                                <span className="font-medium text-[var(--black)]">Quick updates and improvements as needed</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[var(--gray-light)]">
                            <p className="text-sm font-light text-[var(--primary-blue)]">
                              <span className="font-serif italic">Outcome:</span> Zero technical worries, ongoing flexibility.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="relative">
            <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
              <div className="text-center mb-16 scroll-fade">
                <h2 className="section-title mb-8">
                  The <span className="font-serif italic text-[var(--primary-blue)]">Result</span>
                </h2>
                <p className="text-xl text-[var(--gray-dark)] max-w-4xl mx-auto leading-relaxed font-light">
                  You get a market-leading website, built for authority, live in 20 days or less, with almost zero admin. No homework, no tech stress, and no lock-in.
                </p>
              </div>

              {/* Elegant Results Display */}
              <div className="max-w-5xl mx-auto scroll-fade">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full border-1 border-[var(--primary-blue)]/20 flex items-center justify-center relative">
                        <span className="text-5xl font-serif italic text-[var(--primary-blue)] relative z-10">20</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-light text-[var(--black)] mb-2">Days or Less</h3>
                    <p className="text-[var(--gray-medium)] text-sm leading-relaxed">From start to live website with your custom domain</p>
                  </div>

                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full border-1 border-[var(--primary-blue)]/20 flex items-center justify-center relative">
                        <span className="text-5xl font-serif italic text-[var(--primary-blue)] relative z-10">2</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-light text-[var(--black)] mb-2">Hours of Your Time</h3>
                    <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Total time investment across the entire project</p>
                  </div>

                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full border-1 border-[var(--primary-blue)]/20 flex items-center justify-center relative">
                        <span className="text-5xl font-serif italic text-[var(--primary-blue)] relative z-10">0</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-light text-[var(--black)] mb-2">Technical Stress</h3>
                    <p className="text-[var(--gray-medium)] text-sm leading-relaxed">We handle all the technical complexity for you</p>
                  </div>
                </div>

                <div className="text-center mt-16">
                  <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/50 backdrop-blur-sm border border-[var(--primary-blue)]/20 rounded-full">
                    <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full animate-pulse"></div>
                    <span className="text-[var(--gray-dark)] font-light">Market-leading authority website, guaranteed delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra Speed Section */}
            <div className="relative">
              <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
                <div className="max-w-6xl mx-auto scroll-fade">
                  <div className="invitation-card-container">
                    <div className="invitation-card-bg"></div>
                    <div className="invitation-card text-center">
                      <div className="inline-block bg-[var(--primary-blue)] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                        Ultra Speed Option
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--black)] tracking-tight mb-6">
                        Want It Even <span className="font-serif italic text-[var(--primary-blue)]">Faster?</span>
                      </h2>
                      <p className="text-lg md:text-xl text-[var(--gray-dark)] mb-8 leading-relaxed font-light max-w-3xl mx-auto">For consultants who need results <em>yesterday</em>, we offer an <strong>Ultra Speed Process</strong> that&apos;s even more streamlined—minimizing reviews and approvals for the absolute fastest possible launch.
                      </p>
                      <p className="text-base text-[var(--gray-medium)] mb-12 leading-relaxed font-light max-w-2xl mx-auto">
                        With Ultra Speed, your website goes from onboarding to live in days, not weeks. Same custom research, hands-off setup, and authority-building design but condensed to just two quick feedback rounds.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
                      >
                        <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                        <span className="relative z-10">Ask About Ultra Speed</span>
                        <span className="relative z-10">→</span>
                      </Link>
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
              Ready to Start Your <span className="font-serif italic">Authority</span> Website?
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed font-light">Let&apos;s discuss your project and show you exactly how this process works for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
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