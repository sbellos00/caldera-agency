'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

const PrismaticBurst = dynamic(() => import('@/components/PrismaticBurst'), { ssr: false })

function PrototypeForm({ id }: { id: string }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [linkedin, setLinkedin] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleStep1 = () => {
    if (!linkedin.trim()) {
      setError('Please enter your LinkedIn URL.')
      return
    }
    setError('')
    setStep(2)
  }

  const handleStep2 = async () => {
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStatus('submitting')

    try {
      const res = await fetch('/api/prototype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin, email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div id={id} className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary-blue)] mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium tracking-tight mb-3">We&apos;re on it.</h3>
        <p className="text-[var(--gray-medium)] max-w-md mx-auto leading-relaxed">
          We&apos;ll send your website preview and a full report of our design choices and strategy to your inbox within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div id={id} className="w-full max-w-lg mx-auto">
      {step === 1 ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={linkedin}
              onChange={(e) => { setLinkedin(e.target.value); setError('') }}
              placeholder="Paste your LinkedIn URL"
              className="flex-1 px-5 py-4 rounded-full bg-white border border-[var(--gray-light)] text-[15px] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleStep1()}
            />
            <button
              onClick={handleStep1}
              className="px-6 py-4 bg-[var(--black)] text-white text-[15px] font-medium rounded-full tracking-tight transition-all duration-300 hover:bg-[var(--primary-blue)] hover:scale-105 whitespace-nowrap"
            >
              Get Your Free Prototype
            </button>
          </div>
          {error && <p className="text-red-500 text-sm pl-5">{error}</p>}
          <p className="text-[var(--gray-medium)] text-sm pl-5">Just your LinkedIn URL. Takes 30 seconds.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-[var(--gray-dark)] text-[15px] pl-1 mb-1">
            Where should we send your website preview and our full design strategy report?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="Your email address"
              className="flex-1 px-5 py-4 rounded-full bg-white border border-[var(--gray-light)] text-[15px] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleStep2()}
            />
            <button
              onClick={handleStep2}
              disabled={status === 'submitting'}
              className="px-6 py-4 bg-[var(--primary-blue)] text-white text-[15px] font-medium rounded-full tracking-tight transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 whitespace-nowrap"
            >
              {status === 'submitting' ? 'Sending...' : 'Send My Free Prototype'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm pl-5">{error}</p>}
          <p className="text-[var(--gray-medium)] text-sm pl-5">You&apos;ll hear from us within 24 hours.</p>
        </div>
      )}
    </div>
  )
}

const featureCards = [
  {
    title: 'We do the research so you don\u2019t have to.',
    body: 'We study your LinkedIn, your positioning, your competitors, and your market. You don\u2019t fill out discovery forms. You don\u2019t sit through briefing calls. We come to you with a prototype, not a questionnaire.',
  },
  {
    title: 'Fast turnaround. Minimal time from you.',
    body: 'From prototype to launch, the entire process takes less time than most agency discovery calls. We handle copywriting, design, development, domain setup, analytics \u2013 everything. You just give feedback.',
  },
  {
    title: 'You own everything. No lock-in.',
    body: 'Your code. Your domain. Your site. We host it for a year for free and handle maintenance, but you can take the full codebase and leave anytime. No proprietary platforms. No hostage situations.',
  },
]

const faqItems = [
  {
    q: 'What if I already have a website?',
    a: 'We\u2019ll still send you a free prototype. If what we build is better, great. If not, you\u2019ve lost nothing.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Your LinkedIn URL. That\u2019s it. We handle all research, writing, and design. You just review and give feedback.',
  },
  {
    q: 'What if I\u2019m not happy with the result?',
    a: 'You approve every phase before we move forward. Final payment is only due when you\u2019re confident enough to launch. If at any point you\u2019re not satisfied, you stop and only pay for what\u2019s been completed.',
  },
  {
    q: 'Who owns the site?',
    a: 'You do. Fully. No lock-in, no proprietary platforms. We provide hosting and support, but you can take your code and self-host anytime.',
  },
  {
    q: 'Do you only build for consultants?',
    a: 'Yes. That\u2019s why our sites work. Everything we do \u2013 research, copy, design \u2013 is built around how consultants win clients.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'We move fast. From prototype approval to launch, we handle everything so the process is as quick and painless as possible for you.',
  },
]

const howItWorksSteps = [
  {
    number: 1,
    heading: 'Drop your LinkedIn URL',
    body: 'That\u2019s all we need to start. We research your expertise, positioning, and market.',
    placeholder: 'linkedin.com/in/yourprofile',
  },
  {
    number: 2,
    heading: 'Review your free prototype',
    body: 'We send you a working prototype of your website. No commitment. If you like what you see, we move forward.',
    placeholder: 'yourname.com',
  },
  {
    number: 3,
    heading: 'Launch your site',
    body: 'We refine based on your feedback, write all copy, and launch your site. Minimal time investment from you.',
    statusItems: ['Design: Done', 'Copy: Done', 'Hosting: Live'],
  },
]

export default function Home() {
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

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .step-card')
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

    // Immediately reveal elements already in viewport
    document.querySelectorAll('.scroll-fade').forEach(el => {
      const r = (el as HTMLElement).getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
    })

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
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
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef}></div>
      <div className="cursor-dot md:block hidden" ref={cursorDotRef}></div>

      {/* ─── 1. Navigation ─── */}
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 py-6 ${!isMenuOpen ? 'md:mix-blend-difference' : ''}`}>
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="text-3xl font-medium tracking-tight text-white caldera-logo">caldera.agency</div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => document.getElementById('prototype-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
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

      {/* ─── 2. Hero ─── */}
      <section className="min-h-screen relative flex items-center px-8 bg-[var(--cream)] overflow-hidden">
        <div className="absolute inset-0">
          <PrismaticBurst
            intensity={1.5}
            speed={0.2}
            animationType="rotate3d"
            colors={['#0019ff', '#e6e9ff', '#f1efe7', '#ffffff', '#000d66']}
            distort={0}
            hoverDampness={0}
            rayCount={0}
          />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center flex flex-col items-center pt-24 pb-16">
          <h1 className="hero-title mb-4 max-w-5xl animate-fade-in-up">
            The Website Agency For{' '}
            <span className="font-serif italic font-normal text-[var(--primary-blue)]">Solo Consultants.</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            You do nothing. We build everything.
          </p>

          <p className="text-lg leading-relaxed text-[var(--gray-dark)] max-w-2xl mb-10 animate-fade-in-up animate-delay-200">
            Share your LinkedIn and we&apos;ll handle research, copy, design, and development. You get a free prototype before you spend a cent.
          </p>

          <div className="w-full animate-fade-in-up animate-delay-300">
            <PrototypeForm id="prototype-form" />
          </div>
        </div>
      </section>

      {/* ─── 3. Feature Cards ─── */}
      <section className="py-24 md:py-32 px-8 bg-[var(--cream)]">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">
            Everything handled. Zero hassle for you.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="feature-card scroll-fade bg-white rounded-2xl p-8 md:p-10 border border-[var(--gray-light)] transition-all duration-300 hover:shadow-lg hover:border-[var(--primary-blue)]/20 hover:-translate-y-1"
              >
                <h3 className="text-xl font-medium tracking-tight mb-4 leading-snug">{card.title}</h3>
                <p className="text-[var(--gray-medium)] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Objection Callout ─── */}
      <section className="py-20 md:py-28 px-8 bg-[var(--black)]">
        <div className="max-w-screen-md mx-auto text-center scroll-fade">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-6">Common concern</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-8 leading-snug">
            &ldquo;What if I don&apos;t like what you build?&rdquo;
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            You see a free prototype before you pay anything. After that, you approve each phase before we move on. You only pay for work you&apos;ve reviewed and approved. Final payment is due only when you&apos;re ready to launch.
          </p>
        </div>
      </section>

      {/* ─── 5. How It Works ─── */}
      <section className="py-24 md:py-32 px-8 bg-[var(--cream)]">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">How It Works</p>
          <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">
            Three steps. That&apos;s it.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {howItWorksSteps.map((step) => (
              <div key={step.number} className="step-card scroll-fade">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary-blue)] text-white text-lg font-medium">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight">{step.heading}</h3>
                </div>
                <p className="text-[var(--gray-medium)] leading-relaxed mb-6">{step.body}</p>

                {/* Visual placeholder */}
                <div className="rounded-xl bg-[var(--gray-light)] border border-[var(--gray-light)] p-6 font-mono text-sm text-[var(--gray-medium)]">
                  {step.statusItems ? (
                    <div className="flex flex-col gap-2">
                      {step.statusItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--primary-blue)]">&rarr;</span>
                      {step.placeholder}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Case Studies (placeholders) ─── */}
      <section className="py-24 md:py-32 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Our Work</p>
          <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">
            Real consultants.{' '}
            <span className="font-serif italic font-normal text-[var(--primary-blue)]">Real results.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="scroll-fade rounded-2xl border border-[var(--gray-light)] overflow-hidden bg-[var(--cream)] transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video bg-[var(--gray-light)] flex items-center justify-center">
                  <span className="text-[var(--gray-medium)] text-sm">Client site screenshot</span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--blue-light)] text-[var(--primary-blue)] text-xs font-medium mb-4">
                    Before: No website
                  </div>
                  <p className="text-[var(--gray-medium)] italic leading-relaxed">
                    &ldquo;Testimonial placeholder &ndash; client feedback will go here.&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ─── */}
      <section className="py-24 md:py-32 px-8 bg-[var(--cream)]" id="faq">
        <div className="max-w-screen-md mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Common Questions</p>
          <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="scroll-fade rounded-xl border border-[var(--gray-light)] bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium tracking-tight pr-4">{item.q}</span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--gray-light)] flex items-center justify-center transition-transform duration-300"
                    style={{ transform: openFAQ === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFAQ === i ? '300px' : '0px', opacity: openFAQ === i ? 1 : 0 }}
                >
                  <p className="px-6 pb-6 text-[var(--gray-medium)] leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Founder's Note ─── */}
      <section className="py-24 md:py-32 px-8 bg-white">
        <div className="max-w-screen-md mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">From the Founder</p>

          <div className="scroll-fade flex flex-col items-center">
            {/* Photo placeholder */}
            <div className="w-24 h-24 rounded-full bg-[var(--gray-light)] flex items-center justify-center mb-8">
              <span className="text-[var(--gray-medium)] text-xs">Photo</span>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[var(--gray-dark)]">
              <p>
                I spent years at Dialectica connecting consultants with investors and Fortune 500 companies. I talked to hundreds of experts &ndash; brilliant people who shaped decisions worth millions.
              </p>
              <p>
                Most of them had no website. Or worse, they had one that looked like it was built in 2012.
              </p>
              <p>
                They&apos;d lose RFPs to competitors who simply looked more credible online. They&apos;d get passed over for speaking gigs because there was nowhere to send a link. They&apos;d rely entirely on LinkedIn and hope the algorithm was kind.
              </p>
              <p>
                That&apos;s why I started Caldera. Because consultants shouldn&apos;t have to become web designers, copywriters, or project managers just to look professional online.
              </p>
              <p>
                You drop your LinkedIn URL. We do everything else. And we send you a prototype before you spend a cent, because we&apos;d rather earn your trust than ask for it.
              </p>
            </div>

            <p className="mt-8 text-[var(--gray-dark)] font-medium tracking-tight">&ndash; Stef, Founder of Caldera Agency</p>
          </div>
        </div>
      </section>

      {/* ─── 9. Second CTA ─── */}
      <section className="py-24 md:py-32 px-8 bg-[var(--cream)]">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="section-title mb-6 scroll-fade">
            Ready to see what your website could look like?
          </h2>
          <p className="text-lg text-[var(--gray-dark)] max-w-2xl mx-auto mb-12 leading-relaxed scroll-fade">
            Drop your LinkedIn URL and we&apos;ll send you a free prototype. No calls. No commitment. No homework.
          </p>
          <div className="scroll-fade">
            <PrototypeForm id="prototype-form-bottom" />
          </div>
        </div>
      </section>

      {/* ─── 10. Footer ─── */}
      <Footer />
    </>
  )
}
