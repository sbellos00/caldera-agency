'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)
import VerticalCutReveal from '@/components/fancy/text/VerticalCutReveal'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import { caseStudies } from '@/lib/work'
import { homeFaqs } from '@/lib/site'

const CrowdCanvasSpotlight = dynamic(() => import('@/components/CrowdCanvasSpotlight'), { ssr: false })

/* ─── Preloader (Nitro stair-wipe) ─── */
function Preloader() {
  const text = 'caldera.agency'
  const words = text.split(' ')
  return (
    <motion.div className="fixed inset-0 z-[200]">
      <div className="absolute z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <motion.h1
          className="caldera-logo text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 4 } }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 * i }}
              className="mr-2 inline-block md:mr-3"
            >{word}</motion.span>
          ))}
        </motion.h1>
      </div>
      {/* Top stairs */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[2] flex h-[50vh]">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} initial={{ height: '100%' }} animate={{ height: '100%' }}
            exit={{ height: 0 }} transition={{ duration: 0.5, delay: 0.4 + 0.05 * i, ease: [0.455, 0.03, 0.515, 0.955] }}
            className="h-full w-[10vw]" style={{ backgroundColor: 'var(--primary-blue)' }} />
        ))}
      </motion.div>
      {/* Bottom stairs */}
      <motion.div className="pointer-events-none fixed bottom-0 left-0 z-[2] flex h-[50vh] items-end">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} initial={{ height: '100%' }} animate={{ height: '100%' }}
            exit={{ height: 0 }} transition={{ duration: 0.5, delay: 0.4 + 0.05 * i, ease: [0.455, 0.03, 0.515, 0.955] }}
            className="h-full w-[10vw]" style={{ backgroundColor: 'var(--primary-blue)' }} />
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ─── Prototype Form ─── */
/* The two-step /api/prototype flow, kept quiet: no free/no-commitment framing. */
const PROCESSING_MESSAGES = ['Analyzing your LinkedIn profile...', 'Preparing your prototype request...']

function PrototypeForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [linkedin, setLinkedin] = useState('')
  const [email, setEmail] = useState('')
  // Honeypot — hidden from real users, filled in by bots.
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'processing' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [transitioning, setTransitioning] = useState(false)
  const [processingIdx, setProcessingIdx] = useState(0)

  const inputClass = 'min-w-0 flex-[3] px-6 py-4 rounded-lg rounded-r-none bg-[var(--cream)] border-0 text-[15px] placeholder:text-[var(--gray-medium)] focus:outline-none transition-all'

  const handleStep1 = useCallback(() => {
    if (!linkedin.trim()) { setError('Please enter your LinkedIn URL.'); return }
    setError(''); setTransitioning(true)
    setTimeout(() => { setStep(2); setTransitioning(false) }, 200)
  }, [linkedin])

  const handleStep2 = useCallback(async () => {
    if (status === 'submitting') return
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return }
    setError(''); setStatus('submitting')
    // The API has no honeypot handling, so a filled trap short-circuits here:
    // the bot sees a success and nothing is sent.
    if (company) { setStatus('processing'); setProcessingIdx(0); return }
    try {
      const res = await fetch('/api/prototype', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ linkedin, email }) })
      if (res.ok) { setStatus('processing'); setProcessingIdx(0); return }
      // Surface the API's own reason so a misconfigured mailer isn't invisible.
      const data = await res.json().catch(() => null)
      setStatus('error')
      setError(data?.error || 'Something went wrong. Please email us at contact@caldera.agency.')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please email us at contact@caldera.agency.')
    }
  }, [email, linkedin, company, status])

  useEffect(() => {
    if (status !== 'processing') return
    if (processingIdx < PROCESSING_MESSAGES.length - 1) {
      const t = setTimeout(() => setProcessingIdx(i => i + 1), 1500); return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStatus('success'), 1500); return () => clearTimeout(t)
  }, [status, processingIdx])

  if (status === 'processing') {
    return (
      <div id="prototype-form" className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-[var(--blue-light)]">
          <svg className="w-6 h-6 animate-spin text-[var(--primary-blue)]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <p className="text-[15px] font-medium tracking-tight transition-opacity duration-300 text-[var(--gray-dark)]">
          {PROCESSING_MESSAGES[processingIdx]}
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div id="prototype-form" className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-[var(--primary-blue)]">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium tracking-tight mb-3">We&apos;re on it.</h3>
        <p className="max-w-md mx-auto leading-relaxed mb-6 text-[var(--gray-medium)]">
          We&apos;ll send your website preview and a full report of our design choices and strategy to your inbox within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-[var(--gray-medium)]">
          <span>What happens next?</span>
          <Link href="/process" className="underline underline-offset-4 transition-colors text-[var(--primary-blue)] hover:text-[var(--blue-dark)]">
            See our full process
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div id="prototype-form" className="w-full max-w-lg mx-auto">
      <div className={`transition-all duration-200 ${transitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {step === 1 ? (
          <div className="flex flex-col gap-3">
            {/* Unified input group — input and button as one connected element */}
            <div className="flex flex-col sm:flex-row bg-[var(--cream)] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <input id="prototype-linkedin" type="url" value={linkedin} onChange={e => { setLinkedin(e.target.value); setError('') }}
                placeholder="Paste your LinkedIn URL" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep1()} />
              <button onClick={handleStep1}
                className="group relative overflow-hidden flex-shrink-0 px-6 py-4 text-[14px] font-medium bg-[var(--black)] text-white tracking-tight transition-all duration-300 hover:scale-105 whitespace-nowrap rounded-lg sm:rounded-l-none">
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white">Request Your Prototype <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span></span>
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <p className="text-[var(--gray-medium)] text-sm text-center mt-1">We use your profile to research your practice before we design anything.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-[var(--gray-dark)] text-center">Where should we send your prototype?</p>
            <div className="flex flex-col sm:flex-row bg-[var(--cream)] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <input id="prototype-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep2()} />
              <button onClick={handleStep2} disabled={status === 'submitting'}
                className="group relative overflow-hidden flex-shrink-0 px-6 py-4 text-[14px] font-medium bg-[var(--black)] text-white tracking-tight transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 whitespace-nowrap rounded-lg sm:rounded-l-none">
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">{status === 'submitting' ? 'Sending...' : 'Send My Prototype'}</span>
              </button>
            </div>
            {/* Honeypot — hidden from people and assistive tech, catnip for bots. */}
            <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
              <label htmlFor="prototype-company">Company</label>
              <input id="prototype-company" name="company" type="text" tabIndex={-1} autoComplete="off"
                value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => { setTransitioning(true); setTimeout(() => { setStep(1); setTransitioning(false) }, 200) }}
                className="text-sm underline underline-offset-4 transition-colors text-[var(--gray-medium)] hover:text-[var(--gray-dark)]">
                &larr; Edit LinkedIn URL
              </button>
              <p className="text-sm text-[var(--gray-medium)]">You&apos;ll hear from us within 24 hours.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Data ─── */
// The FAQ lives in lib/site so app/page.tsx can emit FAQPage schema that matches
// what visitors actually see here.
const faqData = homeFaqs

const testimonials = [
  { highlight: 'It has elevated how I position myself in every client conversation.', quote: 'Caldera Agency didn\'t just build me a website, they helped me formally launch my entrepreneurial practice with clarity and credibility. In a matter of days, Stefanos and his team translated my experience into a polished, enterprise-level site, delivered with remarkable speed and zero red tape. It has elevated how I position myself in every client conversation.', name: 'Mark S. Piazza', role: 'Fractional CFO & Financial Advisor', image: 'https://res.cloudinary.com/dawyrpt2m/image/upload/v1766602121/Piazza_Headshot_1_daetif.jpg', imgPos: 'center 30%' },
  { highlight: 'They work very efficiently, often turning around edits and new concepts in hours, with a sharp eye on every detail.', quote: 'My experience with the Caldera team has been great. They are very responsive, creative and were able to take my desired content and feedback to create an end product that far exceeded my expectations. They work very efficiently, often turning around edits and new concepts in hours, with a sharp eye on every detail. I highly recommend the team at Caldera.', name: 'Tim Scott', role: 'Founder, True North Supply Chain Advisory', image: 'https://res.cloudinary.com/dawyrpt2m/image/upload/v1767130093/unnamed_1_l4haxs.jpg', imgPos: 'center' },
  { highlight: 'The experience felt like a true partnership, and the value of the service far exceeded the cost.', quote: 'I was initially drawn to Caldera Agency because, unlike most vendors who send generic outreach, they had clearly taken the time to understand my business. That attention to detail and spirit of customization carried through the entire engagement. The team was incredibly responsive and committed to getting every element right. We truly built the website together, collaborating on everything from the core structure to the smallest design adjustments and animations. Caldera met every specification I had and was always willing to refine details until the site reflected exactly what I envisioned. The experience felt like a true partnership, and the value of the service far exceeded the cost.', name: 'Dr. Ron Paul', role: 'Founder, Polaris Leadership Institute', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1772528728/polaris-blog-media-migrated/6400c361-9c59-41ac-9875-14d9039a750e_d6zwwx.jpg', imgPos: 'center 20%' },
  { highlight: 'It looks clean, professional, and truly reflects my work and vision.', quote: 'I just wanted to say thank you for the fantastic work on my website! I\'m very happy with how it turned out. It looks clean, professional, and truly reflects my work and vision. It was a pleasure working with you, and I would gladly recommend your services to others. Thank you again!', name: 'Ekaterina Semenyuk', role: 'Biosafety & Research Safety Consultant', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1784895183/Esemenyuk_tju264.jpg', imgPos: 'center' },
]

const team = [
  { name: 'Giannis Zwrzos', role: 'Founder · Design & Development', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1786388161/giannis_l4rftj.jpg' },
  { name: 'Stefanos T. Bellos', role: 'Founder · Design & Development', image: '/images/team/stefanos-t-bellos.png' },
  { name: 'Stefanos A. Bellos', role: 'Founder · Marketing', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1786388161/stefapng_xzighx.jpg' },
]

// Case studies come from the shared /work data so the homepage stays in sync.
// `hidden` entries are excluded there too. The two Azelia Labs branded sites are
// kept on /work but left off the homepage.
const HOMEPAGE_EXCLUDED = ['Ekaterina Semenyuk', 'Sarah Ziegler']
const portfolioItems = caseStudies
  .filter(c => !c.hidden && c.url && c.image && !HOMEPAGE_EXCLUDED.includes(c.name))
  .map(c => ({ name: c.name, role: c.role, url: c.url as string, description: c.summary, image: c.image as string }))

/* ─── Main Component ─── */
export default function HomeV6() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showAllFAQ, setShowAllFAQ] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const themedSectionRefs = useRef<(HTMLElement | null)[]>([])

  // Preloader timeout + unlock scroll after hero animations
  useEffect(() => {
    window.scrollTo(0, 0)
    // Hide preloader after 2.8s
    const preloaderTimer = setTimeout(() => setShowPreloader(false), 2800)
    // Start Lenis after hero animations finish (~2.8s preloader + 3.5s hero anims)
    const scrollTimer = setTimeout(() => lenisRef.current?.start(), 6300)
    return () => {
      clearTimeout(preloaderTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  // Nav scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Upgraded cursor with GSAP lerp + magnetic pull + text mode
  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const textEl = cursorTextRef.current
    if (!cursor || !dot || !textEl) return

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0, dotX = 0, dotY = 0

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (hasFinePointer) document.addEventListener('mousemove', handleMouseMove)

    // GSAP ticker for smooth trailing
    const update = () => {
      curX += (mouseX - curX) * 0.15
      curY += (mouseY - curY) * 0.15
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      cursor.style.left = curX - 20 + 'px'
      cursor.style.top = curY - 20 + 'px'
      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'
      textEl.style.left = dotX + 'px'
      textEl.style.top = dotY - 24 + 'px'
    }
    if (hasFinePointer) gsap.ticker.add(update)

    // Magnetic pull for interactive elements
    const magnetics = document.querySelectorAll('a, button, .feature-card, .portfolio-card')
    const magnetEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      cursor.style.width = '60px'; cursor.style.height = '60px'; cursor.style.marginLeft = '-10px'; cursor.style.marginTop = '-10px'
      cursor.style.borderColor = 'var(--primary-blue)'; cursor.style.opacity = '0.5'
      // Show text cursor for portfolio cards
      if (el.classList.contains('portfolio-card')) { textEl.textContent = 'View'; textEl.classList.add('active') }
    }
    const magnetLeave = () => {
      cursor.style.width = '40px'; cursor.style.height = '40px'; cursor.style.marginLeft = '0'; cursor.style.marginTop = '0'
      cursor.style.opacity = '1'
      textEl.classList.remove('active')
    }
    if (hasFinePointer) magnetics.forEach(el => { el.addEventListener('mouseenter', magnetEnter); el.addEventListener('mouseleave', magnetLeave) })

    // Scroll-fade observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))

    return () => {
      if (hasFinePointer) {
        document.removeEventListener('mousemove', handleMouseMove)
        gsap.ticker.remove(update)
        magnetics.forEach(el => { el.removeEventListener('mouseenter', magnetEnter); el.removeEventListener('mouseleave', magnetLeave) })
      }
      observer.disconnect()
    }
  }, [])

  const [navDark, setNavDark] = useState(false)

  // Scroll-based theme switching (sections 4-8)
  const scrollThemes = useRef([
    { bg: 'rgb(0, 0, 0)', text: 'rgb(255, 255, 255)' },         // 4. Highlighted Work — dark
    { bg: 'rgb(255, 255, 255)', text: 'rgb(0, 0, 0)' },         // 5. Features — light
    { bg: 'rgb(0, 0, 0)', text: 'rgb(255, 255, 255)' },         // 6. Founder — dark
    { bg: 'rgb(255, 255, 255)', text: 'rgb(0, 0, 0)' },         // 7. Testimonials — light
    { bg: 'rgb(0, 25, 255)', text: 'rgb(255, 255, 255)' },      // 8. FAQ — blue
    { bg: 'rgb(255, 255, 255)', text: 'rgb(0, 0, 0)' },         // 9. Transition back to white before CTA
  ])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.stop()
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      themedSectionRefs.current.forEach((el, i) => {
        if (!el) return
        const theme = scrollThemes.current[i]
        // For the first themed section, the "previous" is the drawer section (cream/light)
        const prevTheme = i === 0
          ? { bg: 'rgb(250, 248, 245)', text: 'rgb(0, 0, 0)' }
          : scrollThemes.current[i - 1]

        ScrollTrigger.create({
          trigger: el,
          start: i === scrollThemes.current.length - 1 ? 'top bottom' : 'top center',
          onEnter: () => {
            container.style.backgroundColor = theme.bg
            container.style.color = theme.text
            setNavDark(theme.text === 'rgb(255, 255, 255)')
          },
          onLeaveBack: () => {
            container.style.backgroundColor = prevTheme.bg
            container.style.color = prevTheme.text
            setNavDark(prevTheme.text === 'rgb(255, 255, 255)')
          },
        })
      })
    })

    return () => { ctx.revert(); lenis.destroy() }
  }, [])

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">{showPreloader && <Preloader key="preloader" />}</AnimatePresence>

      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef} />
      <div className="cursor-dot md:block hidden" ref={cursorDotRef} />
      <div className="cursor-text md:block hidden" ref={cursorTextRef} />

      {/* ─── 1. Navbar ─── */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-5 transition-all duration-500">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className={`text-3xl font-medium tracking-tight caldera-logo ${navDark ? 'text-white' : 'text-[var(--black)]'}`}>
            caldera.agency
          </div>
          <div className="flex items-center gap-8">
            <Link href="/contact"
              className={`hidden md:block group relative overflow-hidden px-6 py-3 rounded-lg text-sm tracking-tight transition-all duration-500 hover:scale-105 no-underline ${navDark ? 'bg-white text-[var(--black)]' : 'bg-[var(--black)] text-white'}`}>
              <div className={`absolute inset-0 ${navDark ? 'bg-[var(--black)]' : 'bg-[var(--primary-blue)]'} transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0`} />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                Get In Touch
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} dark={navDark} />
          </div>
        </div>
      </nav>

      {/* ─── 2. Hero (fixed) — grid pattern ─── */}
      <section className="fixed inset-0 h-screen flex flex-col z-0 bg-[var(--cream)]">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-[5vh]">
          <div className="text-center flex flex-col items-center w-full max-w-screen-2xl">
            {/* Title — one line, revealed left to right */}
            {/* Wait for preloader to finish before animating */}
            {!showPreloader && (
              <>
                <div className="mb-6 flex flex-wrap items-baseline justify-center gap-x-[0.2em]" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 0.95, fontWeight: 300, letterSpacing: '-0.04em', wordSpacing: '-0.04em' }}>
                  <VerticalCutReveal
                    splitBy="words"
                    staggerDuration={0.08}
                    staggerFrom="first"
                    transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.7 }}
                    containerClassName=""
                    wordLevelClassName="py-[0.1em] pr-[0.02em]"
                    elementLevelClassName={'text-[var(--black)]'}
                  >
                    The website agency
                  </VerticalCutReveal>
                  <VerticalCutReveal
                    splitBy="words"
                    staggerDuration={0.08}
                    staggerFrom="first"
                    transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.05 }}
                    containerClassName=""
                    wordLevelClassName="py-[0.1em] pr-[0.02em]"
                    elementLevelClassName={'text-[var(--black)]'}
                  >
                    built for
                  </VerticalCutReveal>
                  <VerticalCutReveal
                    splitBy="words"
                    staggerDuration={0.08}
                    staggerFrom="first"
                    transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.3 }}
                    containerClassName="font-serif italic"
                    wordLevelClassName="py-[0.1em] pr-[0.02em]"
                    elementLevelClassName="text-[var(--primary-blue)] font-normal"
                  >
                    consultants
                  </VerticalCutReveal>
                </div>

                <motion.p
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)' }}
                  className="font-medium tracking-tight text-[var(--gray-medium)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                >
                  Consulting{' '}
                  <span className={`relative inline-block ${'text-[var(--black)]'}`}>
                    websites
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-blue)]"
                      style={{ transformOrigin: 'left center' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>{' '}
                  designed to{' '}
                  <span className={`relative inline-block ${'text-[var(--black)]'}`}>
                    stand out
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-blue)]"
                      style={{ transformOrigin: 'left center' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </motion.p>
              </>
            )}
          </div>
        </div>

        {/* Crowd — black & white peeps, a couple walking in color.
            No reveal animation: it starts mid-walk behind the preloader, so the
            hero opens on a crowd that is already there rather than one arriving. */}
        <div className="relative z-10 h-[34vh] w-full shrink-0 sm:h-[38vh] md:h-[42vh]">
          <CrowdCanvasSpotlight
            src="/images/peeps/open-peeps-sheet.png"
            colorSrc="/images/peeps/peeps-color-pool.webp"
            rows={15}
            cols={7}
            colorCols={8}
            colorRows={5}
            colorCount={40}
            coloredCount={2}
          />
        </div>

      </section>

      {/* Spacer */}
      <div className="h-screen" aria-hidden="true" />

      {/* ─── All scrollable content ─── */}
      <div ref={scrollContainerRef} className="relative z-10 theme-container" style={{ backgroundColor: 'rgb(250, 248, 245)', color: 'rgb(0, 0, 0)', transition: 'background-color 400ms ease-out' }}>

        {/* ─── 3. Positioning statement + testimonials ─── */}
        <section className="relative overflow-hidden">

          <div className="relative z-10 px-4 md:px-8 lg:px-12 py-20 md:py-28 lg:py-32">
            <div className="max-w-screen-2xl mx-auto">

              {/* Statement */}
              <p className="scroll-fade mx-auto max-w-4xl text-center text-[clamp(20px,2.6vw,34px)] font-light leading-[1.35] tracking-tight text-[var(--black)] mb-16 md:mb-24">
                Caldera is the website agency built for consultants. We lead creative direction, design,
                and web development for ambitious brands shaping the future of their industry.
              </p>

              {/* Testimonials — one straight line. The full set lives in the testimonials section below. */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
                {testimonials.slice(0, 3).map((t, i) => (
                  <div
                    key={i}
                    className="scroll-fade flex-1 backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl p-5 md:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.04)] flex flex-col"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <p className="text-[15px] md:text-[16px] font-medium leading-snug tracking-tight mb-5 text-[var(--black)]">
                      &ldquo;{t.highlight}&rdquo;
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden relative">
                        <Image src={t.image} alt={t.name} fill className="object-cover" style={{ objectPosition: t.imgPos }} sizes="44px" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-[var(--black)] truncate">{t.name}</p>
                        <p className="text-[11px] text-[var(--gray-medium)]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ─── 4. Highlighted Work — 2 case studies ─── */}
        <section ref={el => { themedSectionRefs.current[0] = el }} className="py-24 md:py-32 px-8">
          <div className="max-w-screen-2xl mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Highlighted Work</p>
            <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">What It Looks Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {portfolioItems.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="portfolio-card group scroll-fade block" style={{ transitionDelay: `${i * 100}ms` }}>
                  {/* Browser frame */}
                  <div className="relative rounded-2xl bg-white/10 border border-white/10 overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </div>
                      <div className="flex-1 ml-3">
                        <div className="bg-white/10 rounded-md px-3 py-1 text-xs text-white/50 max-w-[200px]">{item.url.replace('https://', '')}</div>
                      </div>
                    </div>
                    {/* Screenshot — natural aspect ratio, no crop */}
                    <Image src={item.image} alt={`${item.name} website`} width={1200} height={800} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  {/* Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-medium tracking-tight mb-1 text-white">{item.name}</h3>
                      <p className="text-sm text-[var(--primary-blue)] font-medium mb-2">{item.role}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <span className="text-white/30 group-hover:text-[var(--primary-blue)] transition-all duration-300 group-hover:translate-x-1 mt-1 flex-shrink-0 ml-4">&rarr;</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* ─── 5. Feature Cards ─── */}
        <section ref={el => { themedSectionRefs.current[1] = el }} id="features" className="relative">
          <div className="pt-8 pb-16 px-8 md:px-16 max-w-screen-xl mx-auto">
            <h2 className="section-title mb-12 md:mb-16 scroll-fade">
              We help consulting businesses<br className="hidden md:block" /> build market-leading brands.
            </h2>

            {/* 3 equal cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              {[
                { h: 'Full creative direction and branding', b: 'We dive deep into your business to uncover what makes your brand distinct, then translate it into a clear visual identity that keeps you consistent, recognizable, and unmistakably yours across every touchpoint.' },
                { h: 'Design that isn\u2019t boring', b: 'We borrow from the industries that take design seriously, bringing ideas from fashion, editorial, architecture, and culture into a space that too often plays it safe. We believe great branding is a moat in any industry, and as \u201cgood enough\u201d design becomes increasingly accessible through AI, the opportunity for brands that truly stand out only gets bigger.' },
                { h: 'A partnership beyond just a site', b: 'We work with ambitious businesses that want to reach the highest level and become leaders in their industry. Instead of working with every business that needs a website, we invest deeply in the few relationships we can handle at our highest standard, with the goal of growing alongside them over time.' },
              ].map((card, i) => (
                <div key={i} className="feature-card bg-[var(--cream)] rounded-2xl p-7 md:p-8 relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white" />
                  <h3 className="text-xl font-medium tracking-tight mb-3 relative z-10 group-hover:text-white">{card.h}</h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">{card.b}</p>
                </div>
              ))}
            </div>

            {/* Objection card — full width, centered */}
            <div className="feature-card bg-[var(--cream)] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3 relative z-10 group-hover:text-white">&ldquo;What if I don&apos;t like what you build?&rdquo;</h3>
              <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] max-w-2xl mx-auto relative z-10 group-hover:text-white">
                Every project starts with a prototype, so you can see the direction before we build the full site. From there, you approve the work at every milestone, and we keep iterating until it feels right. Nothing launches until you&apos;re proud of it.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. The Team ─── */}
        <section ref={el => { themedSectionRefs.current[2] = el }} className="py-24 md:py-32 px-8 relative overflow-hidden noise-overlay">
          <div className="max-w-screen-xl mx-auto relative z-10">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">The Team</p>
            <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">The people behind the work</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <div key={member.name} className="text-center scroll-fade" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-white/5">
                    <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 300px" />
                  </div>
                  <p className="text-lg font-medium tracking-tight text-white">{member.name}</p>
                  <p className="text-sm text-white/50 mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. What Our Clients Say — full testimonials ─── */}
        <section ref={el => { themedSectionRefs.current[3] = el }} className="py-24 md:py-32 px-8">
          <div className="max-w-screen-xl mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Testimonials</p>
            <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">What Our Clients Say</h2>

            <div className="flex flex-col gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-[var(--cream)] rounded-2xl p-6 md:p-8 scroll-fade" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6 md:gap-8">
                    {/* Left: quotes + attribution */}
                    <div className="flex flex-col">
                      {/* Pull quote */}
                      <p className="text-[clamp(22px,3vw,32px)] font-light leading-snug tracking-tight text-[var(--black)] mb-4">
                        &ldquo;...{t.highlight}&rdquo;
                      </p>
                      {/* Full quote with left accent */}
                      <div className="border-l-[3px] border-[var(--gray-medium)]/20 pl-5 mb-5">
                        <p className="text-[15px] leading-relaxed text-[var(--gray-medium)]">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>
                      {/* Attribution — moved here from the right column */}
                      <div>
                        <p className="text-sm text-[var(--gray-medium)]">{t.name}</p>
                        <p className="text-sm font-semibold tracking-tight">{t.role}</p>
                      </div>
                    </div>
                    {/* Right: photo only */}
                    <div className="w-40 h-48 md:w-full md:h-full rounded-xl overflow-hidden relative">
                      <Image src={t.image} alt={t.name} fill className="object-cover" style={{ objectPosition: t.imgPos }} sizes="180px" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ — Dark gradient, 9 questions ─── */}
        <section ref={el => { themedSectionRefs.current[4] = el }} id="faq" className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10 pt-16 md:pt-20 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-3 md:gap-4 mb-4 md:mb-6 scroll-fade">
                <div className="w-8 md:w-12 h-px bg-current opacity-20" />
                <span className="text-xs md:text-sm tracking-widest uppercase opacity-90 font-medium">Common Questions</span>
                <div className="w-8 md:w-12 h-px bg-current opacity-20" />
              </div>
              <h2 className="section-title mb-4 md:mb-6 scroll-fade">Frequently Asked Questions</h2>
              <p className="text-lg md:text-xl leading-relaxed opacity-80 max-w-3xl mx-auto font-light scroll-fade px-4">
                Clear answers to the questions most consultants ask before booking.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
              {(showAllFAQ ? faqData : faqData.slice(0, 5)).map((item, i) => (
                <div key={i} className={i < 5 ? 'scroll-fade' : ''}>
                  <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base md:text-lg lg:text-xl font-normal pr-6 group-hover:text-white">{item.q}</h3>
                      <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === i ? 'rotate-45' : ''}`}>
                        <span className="text-xl font-light leading-none group-hover:text-white">+</span>
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                      <p className="opacity-85 leading-relaxed text-sm md:text-base">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
              {!showAllFAQ && faqData.length > 5 && (
                <button onClick={() => setShowAllFAQ(true)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl md:rounded-2xl p-4 md:p-5 text-center opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-300 text-sm md:text-base">
                  Show {faqData.length - 5} more questions
                </button>
              )}
            </div>

            <div className="text-center mt-12 md:mt-20 scroll-fade">
              <p className="opacity-75 text-base md:text-lg mb-4 md:mb-6">Have a different question?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-base md:text-lg relative pb-1 group no-underline">
                <span>Get in touch</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-[width] duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 9. Prototype ─── */}
        {/* Takes the theme slot the old CTA held, so the page returns to white after the blue FAQ. */}
        <section ref={el => { themedSectionRefs.current[5] = el }} id="contact" className="relative overflow-hidden py-24 md:py-32 px-4">
          {/* Grid pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10 max-w-screen-xl mx-auto text-center">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-4 scroll-fade">The Prototype</p>
            <h2 className="section-title mb-5 scroll-fade">Start with a prototype</h2>
            <p className="text-[var(--gray-medium)] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-14 scroll-fade">
              Share your LinkedIn and we&apos;ll come back with a working first version of your site, along with the thinking behind it.
            </p>
            <div className="scroll-fade">
              <PrototypeForm />
            </div>
          </div>
        </section>

        <Footer />
      </div>

    </>
  )
}
