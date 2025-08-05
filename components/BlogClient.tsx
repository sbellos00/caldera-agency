'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function BlogClient() {
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
    const hoverElements = document.querySelectorAll('a, button, .blog-card, .blog-content blockquote, .blog-highlight')

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

    // Intersection Observer for scroll animations
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
      <section className="min-h-screen relative flex items-center px-8 bg-gradient-to-b from-[var(--cream)] to-white overflow-hidden pt-32 md:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">

          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-4 mb-6 scroll-fade animate-fade-in-up">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Authority Building</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>

            <h1 className="hero-title mb-8 max-w-5xl animate-fade-in-up animate-delay-100">
              The Authority <span className="font-serif italic font-normal text-[var(--primary-blue)]">Paradox</span>:<br />
              Why Technical Expertise Alone Won't Win Premium Clients
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-[var(--gray-medium)] mb-10 animate-fade-in-up animate-delay-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">CA</span>
                </div>
                <span>Caldera Agency</span>
              </div>
              <span className="hidden md:inline">•</span>
              <time dateTime="2024-01-15">January 15, 2024</time>
              <span className="hidden md:inline">•</span>
              <span>8 min read</span>
            </div>

            <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mx-auto mb-12 font-light animate-fade-in-up animate-delay-300">
              Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-gradient-to-b from-white to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-[var(--primary-blue)]/5 to-transparent rounded-full blur-xl"></div>
        </div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        <div className="relative z-10 pt-8 pb-20 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            <article className="blog-content prose prose-lg max-w-none">
              
              {/* Opening */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Last week, I had coffee with a brilliant consultant who'd been struggling to land the premium clients he deserved. He had two decades of experience, multiple certifications, and could solve problems that stumped entire teams.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Yet he was competing on price with consultants half his age and charging a fraction of what his expertise was worth.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  His story isn't unique. It's the authority paradox that plagues thousands of exceptional consultants worldwide.
                </p>
              </div>

              {/* Highlighted Quote */}
              <blockquote className="blog-highlight bg-[var(--blue-light)] border-l-4 border-[var(--primary-blue)] p-8 rounded-r-2xl mb-12 scroll-fade relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-blue)]/5 to-transparent"></div>
                <div className="relative z-10">
                  <p className="text-xl font-light text-[var(--black)] mb-4 italic">
                    "Being the smartest person in the room means nothing if the room doesn't know you're there."
                  </p>
                  <cite className="text-sm text-[var(--gray-medium)] not-italic">— The Authority Paradox</cite>
                </div>
              </blockquote>

              {/* Section 1 */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  The Expertise <span className="italic font-serif text-[var(--primary-blue)]">Trap</span>
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Here's what most consultants believe: if you're really good at what you do, clients will naturally find you and pay premium rates for your expertise.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  This belief is not just wrong—it's backwards.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  The marketplace doesn't reward the most knowledgeable consultant. It rewards the consultant who best communicates their knowledge, builds trust before the first meeting, and positions themselves as the obvious choice for high-stakes projects.
                </p>
              </div>

              {/* Insights Box */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <h3 className="text-xl font-medium text-[var(--black)] mb-4">
                  Three Truths About Premium Consulting
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">1</span>
                    </div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Perception precedes capability.</strong> Clients decide if you're qualified before they understand what you actually do.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">2</span>
                    </div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Authority is borrowed, not earned.</strong> You build credibility by association, positioning, and social proof—not just results.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">3</span>
                    </div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Premium clients buy confidence, not competence.</strong> They want to know you've solved their exact problem before, for companies like theirs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  The <span className="italic font-serif text-[var(--primary-blue)]">Real</span> Authority Formula
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Authority isn't about being the smartest person in the room. It's about being the most <em>obvious</em> choice when that room needs to solve a specific problem.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  The consultants who command premium rates understand this distinction. They don't just have expertise—they have <strong>positioned expertise</strong>.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  This means three things: clarity about who they serve, proof that they've solved similar problems before, and a professional presence that signals premium quality before a word is spoken.
                </p>
              </div>

              {/* Section 3 */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  Why Your Website <span className="italic font-serif text-[var(--primary-blue)]">Matters</span> More Than You Think
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Your website isn't a digital business card. It's your credibility filter.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Every potential client will visit your website before they decide to take your call. They're not just looking for information—they're making a snap judgment about whether you operate at their level.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  A poorly designed website signals that you don't understand the importance of first impressions. A generic website suggests you serve everyone (which means you specialize in nothing). A professional, tailored website communicates that you operate at the same level as your premium clients.
                </p>
              </div>

            </article>
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
              Ready to Build Your <span className="font-serif italic">Authority?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed font-light">
              Don't let your expertise go unrecognized. We specialize in building authority websites for consultants who are ready to command premium rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group font-medium"
              >
                <div className="absolute inset-0 bg-[var(--black)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Authority Website</span>
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