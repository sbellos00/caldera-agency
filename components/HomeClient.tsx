'use client'

import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Test key fallback

// ─── Two-step prototype form ────────────────────────────────────────────────
function PrototypeForm({ id, inputBg = 'bg-white' }: { id: string; inputBg?: string }) {
  const [step, setStep] = useState<'linkedin' | 'email' | 'success'>('linkedin')
  const [animating, setAnimating] = useState(false)
  const [linkedin, setLinkedin] = useState('')
  const [email, setEmail] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [error, setError] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [hp, setHp] = useState('')

  const goToStep = (next: 'linkedin' | 'email' | 'success') => {
    setAnimating(true)
    // Brief fade out, then switch step and fade in
    setTimeout(() => {
      setStep(next)
      // Focus email input after transition
      if (next === 'email') {
        setTimeout(() => emailInputRef.current?.focus(), 100)
      }
      // Small delay before removing animating to trigger fade-in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(false))
      })
    }, 250)
  }

  const handleLinkedinSubmit = () => {
    setError('')
    if (!linkedin.trim()) {
      setError('Please enter your LinkedIn URL.')
      return
    }
    goToStep('email')
  }

  const handleFinalSubmit = () => {
    setError('')
    if (hp) { goToStep('success'); return }
    if (!email.trim()) { setError('Please enter your email.'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { setError('Please enter a valid email address.'); return }
    if (!captchaToken) { setError('Please complete the captcha.'); return }

    // TODO: Wire up to /api/prototype endpoint
    console.log('Prototype request:', { linkedin, email, captchaToken })
    goToStep('success')
  }

  return (
    <div
      className="transition-all duration-300 ease-out"
      style={{
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(8px)' : 'translateY(0)',
      }}
    >
      {/* ── Success ── */}
      {step === 'success' && (
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="w-14 h-14 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">We&apos;re on it.</h3>
          <p className="text-[var(--gray-medium)]">
            We&apos;ll send your website preview and a full report of our design choices and strategy to your inbox within 24 hours.
          </p>
        </div>
      )}

      {/* ── Step 2: Email + Captcha ── */}
      {step === 'email' && (
        <div className="space-y-4">
          {/* Locked-in LinkedIn */}
          <div className={`flex items-center gap-3 px-5 py-3 ${inputBg} border border-[var(--gray-light)] rounded-xl transition-all duration-300`}>
            <svg className="w-5 h-5 text-[var(--primary-blue)] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-[var(--gray-dark)] text-sm truncate">{linkedin}</span>
            <button
              onClick={() => { goToStep('linkedin'); setError('') }}
              className="ml-auto text-[var(--primary-blue)] text-xs font-medium hover:underline flex-shrink-0"
            >
              Edit
            </button>
          </div>

          <p className="text-base text-[var(--gray-dark)] text-center font-light">
            Where should we send your website preview and our full design strategy report?
          </p>

          <input
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFinalSubmit() }}
            className={`w-full px-5 py-4 ${inputBg} border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition-all duration-300 text-base`}
            placeholder="Your email address"
          />

          {/* Honeypot */}
          <input
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>

          <button
            onClick={handleFinalSubmit}
            className="w-full inline-flex items-center justify-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight rounded-xl relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
          >
            <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
            <span className="relative z-10">Send My Free Prototype</span>
            <span className="relative z-10">&rarr;</span>
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <p className="text-xs text-[var(--gray-medium)] text-center">You&apos;ll hear from us within 24 hours.</p>
        </div>
      )}

      {/* ── Step 1: LinkedIn only ── */}
      {step === 'linkedin' && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              id={id}
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLinkedinSubmit() }}
              className={`flex-1 px-5 py-4 ${inputBg} border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition-all duration-300 text-base`}
              placeholder="Paste your LinkedIn URL"
            />
            <button
              onClick={handleLinkedinSubmit}
              className="inline-flex items-center justify-center gap-2 bg-[var(--black)] text-white px-6 md:px-8 py-4 text-[15px] tracking-tight rounded-xl relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10">Get Your Free Prototype</span>
              <span className="relative z-10">&rarr;</span>
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      )}
    </div>
  )
}

// ─── Main page component ────────────────────────────────────────────────────
export type CopyVariant = 'v1' | 'v2' | 'v3'

export default function Home({ variant = 'v1' }: { variant?: CopyVariant }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
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

    // Handle hash anchors on page load
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    }

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .deliverable-card, .invitation-card, .invitation-list-item')

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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' })

    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))

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
          <div className="text-3xl font-medium tracking-tight text-white caldera-logo">caldera.agency</div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                document.getElementById('get-prototype')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="hidden md:block group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-tight transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Your Free Prototype
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </button>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="min-h-screen relative flex items-center px-8 bg-[var(--cream)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center flex flex-col items-center">
          <h1 className="hero-title mb-6 max-w-5xl animate-fade-in-up">
            The Website Agency<br />
            Designed For <span className="font-serif italic font-normal text-[var(--primary-blue)]">Solo Consultants.</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-[var(--black)] mb-16 animate-fade-in-up animate-delay-100">
            You Do <span className="font-serif italic font-normal text-[var(--primary-blue)]">Nothing.</span>{' '}We Build <span className="font-serif italic font-normal text-[var(--primary-blue)]">Everything.</span>
          </p>

          {/* Testimonial Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl animate-fade-in-up animate-delay-200">
            <div className="bg-white/60 backdrop-blur-sm border border-[var(--gray-light)] rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--gray-light)]"></div>
                <div>
                  <div className="h-3 w-24 bg-[var(--gray-light)] rounded-full"></div>
                  <div className="h-2 w-16 bg-[var(--gray-light)] rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-[var(--gray-light)] rounded-full"></div>
                <div className="h-2 w-4/5 bg-[var(--gray-light)] rounded-full"></div>
                <div className="h-2 w-3/5 bg-[var(--gray-light)] rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-[var(--gray-light)] rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--gray-light)]"></div>
                <div>
                  <div className="h-3 w-24 bg-[var(--gray-light)] rounded-full"></div>
                  <div className="h-2 w-16 bg-[var(--gray-light)] rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-[var(--gray-light)] rounded-full"></div>
                <div className="h-2 w-4/5 bg-[var(--gray-light)] rounded-full"></div>
                <div className="h-2 w-3/5 bg-[var(--gray-light)] rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-[var(--gray-light)] rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--gray-light)]"></div>
                <div>
                  <div className="h-3 w-24 bg-[var(--gray-light)] rounded-full"></div>
                  <div className="h-2 w-16 bg-[var(--gray-light)] rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-[var(--gray-light)] rounded-full"></div>
                <div className="h-2 w-4/5 bg-[var(--gray-light)] rounded-full"></div>
                <div className="h-2 w-3/5 bg-[var(--gray-light)] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="bg-[var(--black)] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>

        <div className="relative z-10 pt-20 pb-24 md:pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="mb-16 md:mb-24 scroll-fade">
            <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">How It Works</span>
            <h2 className="section-title mt-4 text-white">
              Three steps. That&apos;s it.
            </h2>
          </div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center mb-16 md:mb-24 scroll-fade">
            <div className="md:col-span-1">
              <span className="text-[80px] md:text-[120px] font-extralight leading-none text-white/10">1</span>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-4">Drop your LinkedIn URL</h3>
              <p className="text-white/60 leading-relaxed text-base">
                That&apos;s all we need to start. We research your expertise, positioning, and market.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4">
                  <svg className="w-5 h-5 text-[var(--primary-blue)] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-white/40 text-sm">linkedin.com/in/yourprofile</span>
                  <div className="ml-auto w-3 h-3 rounded-full bg-[var(--primary-blue)] animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Connector line */}
          <div className="hidden md:flex justify-start pl-[4.5%] mb-16 md:mb-24">
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center mb-16 md:mb-24 scroll-fade">
            <div className="md:col-span-1">
              <span className="text-[80px] md:text-[120px] font-extralight leading-none text-white/10">2</span>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-4">Review your free prototype</h3>
              <p className="text-white/60 leading-relaxed text-base">
                We send you a working prototype of your website. No commitment. If you like what you see, we move forward.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                {/* Mini browser mockup */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-md px-3 py-1 mx-4">
                    <span className="text-white/30 text-xs">yourname.com</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                  <div className="h-3 bg-white/5 rounded w-full"></div>
                  <div className="h-3 bg-white/5 rounded w-5/6"></div>
                  <div className="h-8 bg-[var(--primary-blue)]/20 rounded-lg w-1/3 mt-4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Connector line */}
          <div className="hidden md:flex justify-start pl-[4.5%] mb-16 md:mb-24">
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center scroll-fade">
            <div className="md:col-span-1">
              <span className="text-[80px] md:text-[120px] font-extralight leading-none text-white/10">3</span>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-4">Launch your site</h3>
              <p className="text-white/60 leading-relaxed text-base">
                We refine based on your feedback, write all copy, and launch your site. Minimal time investment from you.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-lg">Your site is live</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Design</div>
                    <div className="text-white text-sm font-medium">Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Copy</div>
                    <div className="text-white text-sm font-medium">Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Hosting</div>
                    <div className="text-white text-sm font-medium">Live</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CASE STUDIES ==================== */}
      <section className="bg-[var(--cream)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 pt-16 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-3 md:gap-6 mb-6 md:mb-8 scroll-fade">
              <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-xs md:text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Work</span>
              <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>
            <h2 className="section-title mb-6 scroll-fade">
              Real consultants.<br />
              <span className="italic font-serif text-[var(--primary-blue)]">Real results.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden scroll-fade group hover:shadow-2xl transition-all duration-400">
              <div className="aspect-video bg-[var(--gray-light)] flex items-center justify-center">
                <span className="text-[var(--gray-medium)] text-sm tracking-widest uppercase">Client site screenshot</span>
              </div>
              <div className="p-8">
                <p className="text-sm text-[var(--primary-blue)] font-medium mb-2">Before: No website</p>
                <h3 className="text-xl font-medium mb-3 text-[var(--black)]">[Client Name], [Field]</h3>
                <p className="text-[var(--gray-medium)] italic leading-relaxed">
                  &ldquo;Testimonial placeholder - client feedback will go here.&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden scroll-fade group hover:shadow-2xl transition-all duration-400">
              <div className="aspect-video bg-[var(--gray-light)] flex items-center justify-center">
                <span className="text-[var(--gray-medium)] text-sm tracking-widest uppercase">Client site screenshot</span>
              </div>
              <div className="p-8">
                <p className="text-sm text-[var(--primary-blue)] font-medium mb-2">Before: No website</p>
                <h3 className="text-xl font-medium mb-3 text-[var(--black)]">[Client Name], [Field]</h3>
                <p className="text-[var(--gray-medium)] italic leading-relaxed">
                  &ldquo;Testimonial placeholder - client feedback will go here.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3 FEATURE BLOCKS ==================== */}
      <section className="bg-white relative">
        <div className="pt-16 pb-12 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <h2 className="section-title mb-8 max-w-4xl scroll-fade">
            Everything handled.<br />
            Zero hassle for you.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Feature 1: Research */}
            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-4 relative z-10 group-hover:text-white">
                We do the research so you don&apos;t have to.
              </h3>
              <p className="text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
                We study your LinkedIn, your positioning, your competitors, and your market. You don&apos;t fill out
                discovery forms. You don&apos;t sit through briefing calls. We come to you with a prototype, not a questionnaire.
              </p>
            </div>

            {/* Feature 2: Speed */}
            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-4 relative z-10 group-hover:text-white">
                Fast turnaround. Minimal time from you.
              </h3>
              <p className="text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
                From prototype to launch, the entire process takes less time than most agency discovery calls. We handle
                copywriting, design, development, domain setup, analytics - everything. You just give feedback.
              </p>
            </div>

            {/* Feature 3: Ownership */}
            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-4 relative z-10 group-hover:text-white">
                You own everything. No lock-in.
              </h3>
              <p className="text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
                Your code. Your domain. Your site. We host it for a year for free and handle maintenance, but you can
                take the full codebase and leave anytime. No proprietary platforms. No hostage situations.
              </p>
            </div>
          </div>

          {/* Objection Handling Callout */}
          <div className="bg-[var(--gray-light)] rounded-3xl p-8 md:p-12 text-center scroll-fade">
            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 text-[var(--black)]">
              &ldquo;What if I don&apos;t like what you build?&rdquo;
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-3xl mx-auto">
              You see a free prototype before you pay anything. After that, you approve each phase before we move on.
              You only pay for work you&apos;ve reviewed and approved. Final payment is due only when you&apos;re ready to launch.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="bg-gradient-to-b from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1 opacity-10"></div>
          <div className="floating-shape shape-2 opacity-10"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 pt-16 md:pt-20 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-3 md:gap-4 mb-4 md:mb-6 scroll-fade">
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <span className="text-xs md:text-sm tracking-widest uppercase text-white/80 font-medium">Common Questions</span>
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
            <h2 className="section-title mb-4 md:mb-6 scroll-fade text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
            {[
              {
                q: "What if I already have a website?",
                a: "We'll still send you a free prototype. If what we build is better, great. If not, you've lost nothing."
              },
              {
                q: "What do I need to provide?",
                a: "Your LinkedIn URL. That's it. We handle all research, writing, and design. You just review and give feedback."
              },
              {
                q: "What if I'm not happy with the result?",
                a: "You approve every phase before we move forward. Final payment is only due when you're confident enough to launch. If at any point you're not satisfied, you stop and only pay for what's been completed."
              },
              {
                q: "Who owns the site?",
                a: "You do. Fully. No lock-in, no proprietary platforms. We provide hosting and support, but you can take your code and self-host anytime."
              },
              {
                q: "Do you only build for consultants?",
                a: "Yes. That's why our sites work. Everything we do - research, copy, design - is built around how consultants win clients."
              },
              {
                q: "How long does the whole process take?",
                a: "We move fast. From prototype approval to launch, we handle everything so the process is as quick and painless as possible for you."
              }
            ].map((item, i) => (
              <div key={i} className="scroll-fade">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                      {item.q}
                    </h3>
                    <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === i ? 'rotate-45' : ''}`}>
                      <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                    </div>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOUNDER'S NOTE ==================== */}
      <section className="bg-white relative overflow-hidden">
        <div className="relative z-10 pt-16 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-4 mb-8 scroll-fade">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">From the Founder</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[var(--gray-light)] flex-shrink-0 flex items-center justify-center scroll-fade">
                <span className="text-[var(--gray-medium)] text-xs tracking-widest uppercase">Photo</span>
              </div>

              <div className="scroll-fade">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] mb-6">
                  I spent years at Dialectica connecting consultants with investors and Fortune 500 companies. I talked to hundreds of experts - brilliant people who shaped decisions worth millions.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] mb-6">
                  Most of them had no website. Or worse, they had one that looked like it was built in 2012.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] mb-6">
                  They&apos;d lose RFPs to competitors who simply looked more credible online. They&apos;d get passed over for speaking gigs because there was nowhere to send a link. They&apos;d rely entirely on LinkedIn and hope the algorithm was kind.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] mb-6">
                  That&apos;s why I started Caldera. Because consultants shouldn&apos;t have to become web designers, copywriters, or project managers just to look professional online.
                </p>
                {variant === 'v1' ? (
                  <p className="text-lg leading-relaxed text-[var(--gray-dark)] mb-8">
                    You drop your LinkedIn URL. We do everything else. And we send you a prototype before you spend a cent, because we&apos;d rather earn your trust than ask for it.
                  </p>
                ) : (
                  <p className="text-lg leading-relaxed text-[var(--gray-dark)] mb-8">
                    We&apos;re so confident in what we build that we take all the risk upfront. We do the work first. You pay nothing until you&apos;ve seen your site and love it. That&apos;s not a marketing gimmick - it&apos;s how we think every agency should operate.
                  </p>
                )}
                <p className="text-[var(--black)] font-medium">
                  - Stef, Founder of Caldera Agency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECOND CTA ==================== */}
      <section id="get-prototype" className="bg-[var(--cream)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 pt-16 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          <div className="invitation-card-container">
            <div className="invitation-card-bg"></div>
            <div className="invitation-card">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--black)] mb-6 md:mb-8 tracking-tight">
                  {variant === 'v1'
                    ? 'Ready to see what your website could look like?'
                    : 'We bet on ourselves so you don\'t have to.'
                  }
                </h3>
                <p className="text-[var(--gray-dark)] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light">
                  {variant === 'v1'
                    ? "Drop your LinkedIn URL and we'll send you a free prototype. No calls. No commitment. No homework."
                    : "We'll research, write, design, and build your website prototype - completely free. If you love it, we move forward. If not, you've lost nothing. Drop your LinkedIn URL and see for yourself."
                  }
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <PrototypeForm id="bottom-linkedin" inputBg="bg-[var(--gray-light)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}
