'use client'

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
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

/* ─── Form state ─── */
/* The lead magnet appears twice on this page (sections 3 and 5). Both forms share
   one state, so whatever someone types in one is already there in the other, and a
   submission from either shows the confirmation in both. */
type FormStatus = 'idle' | 'submitting' | 'processing' | 'success' | 'error'
interface FormCtx {
  step: 1 | 2; linkedin: string; email: string; company: string; status: FormStatus; error: string
  setStep: (s: 1 | 2) => void; setLinkedin: (v: string) => void; setEmail: (v: string) => void
  setCompany: (v: string) => void; setStatus: (s: FormStatus) => void; setError: (e: string) => void
}
const FormContext = createContext<FormCtx | null>(null)
const useForm = () => { const c = useContext(FormContext); if (!c) throw new Error('useForm must be inside FormProvider'); return c }

function FormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [linkedin, setLinkedin] = useState('')
  const [email, setEmail] = useState('')
  // Honeypot — hidden from real users, filled in by bots.
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  return (
    <FormContext.Provider value={{ step, linkedin, email, company, status, error, setStep, setLinkedin, setEmail, setCompany, setStatus, setError }}>
      {children}
    </FormContext.Provider>
  )
}

/* ─── Prototype Form ─── */
/* Copy taken from the earlier production build's lead magnet (the "free prototype"
   framing), wired to the current /api/prototype handling and honeypot. */
const PROCESSING_MESSAGES = ['Analyzing your LinkedIn profile...', 'Preparing your prototype request...']

function PrototypeForm({ id }: { id: string }) {
  const { step, linkedin, email, company, status, error, setStep, setLinkedin, setEmail, setCompany, setStatus, setError } = useForm()
  const [transitioning, setTransitioning] = useState(false)
  const [processingIdx, setProcessingIdx] = useState(0)

  const inputClass = 'min-w-0 flex-[3] px-6 py-4 rounded-lg rounded-r-none bg-[var(--cream)] border-0 text-[15px] placeholder:text-[var(--gray-medium)] focus:outline-none transition-all'

  const handleStep1 = useCallback(() => {
    if (!linkedin.trim()) { setError('Please enter your LinkedIn URL.'); return }
    setError(''); setTransitioning(true)
    setTimeout(() => { setStep(2); setTransitioning(false) }, 200)
  }, [linkedin, setError, setStep])

  const handleStep2 = useCallback(async () => {
    if (status === 'submitting') return
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return }
    setError(''); setStatus('submitting')
    // The API has no honeypot handling, so a filled trap short-circuits here:
    // the bot sees a success and nothing is sent.
    if (company) { setStatus('processing'); return }
    try {
      const res = await fetch('/api/prototype', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ linkedin, email }) })
      if (res.ok) { setStatus('processing'); return }
      // Surface the API's own reason so a misconfigured mailer isn't invisible.
      const data = await res.json().catch(() => null)
      setStatus('error')
      setError(data?.error || 'Something went wrong. Please email us at contact@caldera.agency.')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please email us at contact@caldera.agency.')
    }
  }, [email, linkedin, company, status, setError, setStatus])

  // Both form instances run this timer; only the first one to fire moves the
  // shared status on, the other then sees 'success' and stops.
  useEffect(() => {
    if (status !== 'processing') { setProcessingIdx(0); return }
    if (processingIdx < PROCESSING_MESSAGES.length - 1) {
      const t = setTimeout(() => setProcessingIdx(i => i + 1), 1500); return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStatus('success'), 1500); return () => clearTimeout(t)
  }, [status, processingIdx, setStatus])

  if (status === 'processing') {
    return (
      <div id={id} className="text-center py-8">
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
      <div id={id} className="text-center py-8">
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
    <div id={id} className="w-full max-w-lg mx-auto">
      <div className={`transition-all duration-200 ${transitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {step === 1 ? (
          <div className="flex flex-col gap-3">
            {/* Unified input group — input and button as one connected element */}
            <div className="flex flex-col sm:flex-row bg-[var(--cream)] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <input id={`${id}-linkedin`} type="url" value={linkedin} onChange={e => { setLinkedin(e.target.value); setError('') }}
                aria-label="Your LinkedIn URL"
                placeholder="Paste your LinkedIn URL" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep1()} />
              <button onClick={handleStep1}
                className="group relative overflow-hidden flex-shrink-0 px-6 py-4 text-[14px] font-medium bg-[var(--black)] text-white tracking-tight transition-all duration-300 hover:scale-105 whitespace-nowrap rounded-lg sm:rounded-l-none">
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white">Get Your Free Prototype <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span></span>
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <p className="text-[var(--gray-medium)] text-sm text-center mt-1">Free prototype. No calls. No commitment.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-[var(--gray-dark)] text-center">Where should we send your prototype?</p>
            <div className="flex flex-col sm:flex-row bg-[var(--cream)] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <input id={`${id}-email`} type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                aria-label="Your email"
                placeholder="your@email.com" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep2()} />
              <button onClick={handleStep2} disabled={status === 'submitting'}
                className="group relative overflow-hidden flex-shrink-0 px-6 py-4 text-[14px] font-medium bg-[var(--black)] text-white tracking-tight transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 whitespace-nowrap rounded-lg sm:rounded-l-none">
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">{status === 'submitting' ? 'Sending...' : 'Send My Free Prototype'}</span>
              </button>
            </div>
            {/* Honeypot — hidden from people and assistive tech, catnip for bots. */}
            <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
              <label htmlFor={`${id}-company`}>Company</label>
              <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off"
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

/* ─── Lead Magnet ─── */
/* Starting point: the second section of the earlier production build
   ("Drop your LinkedIn. Get a website." + How It Works). Used for both section 3
   and section 5 for now; the copy is expected to change. */
const howItWorks = [
  { icon: '01', h: 'We build first', b: 'We study your LinkedIn, positioning, and market, then build a working prototype before we ever talk.' },
  { icon: '02', h: 'The prototype does the talking', b: 'Instead of briefs and questionnaires, we start with a working prototype. It proves what we can do and gives us both a concrete starting point.' },
  { icon: '03', h: 'You review, we refine', b: 'Some clients take it nearly as-is. Others want big changes. We jump on a quick call to understand what you need and tailor our offer accordingly. Either way, there’s no homework for you, just send us whatever you have, we figure it out and come back with the next version.' },
  { icon: '04', h: 'Launch', b: 'Your site goes live with 1 year of free hosting and support.' },
]

function LeadMagnet({ formId }: { formId: string }) {
  return (
    <div className="relative z-10 px-8 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32">
      <div className="max-w-screen-xl mx-auto">

        {/* Two-column layout — left sells, right supports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: CTA (dominant, 7 cols) */}
          <div className="lg:col-span-7 scroll-fade">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-5">Zero risk, zero commitment</p>
            <h2 className="text-[clamp(28px,3.5vw,52px)] font-light tracking-tight leading-[0.95] mb-5 text-[var(--black)]">
              Drop your LinkedIn.<br /><span className="font-medium">Get a website.</span>
            </h2>
            <p className="relative inline-block text-[var(--primary-blue)] md:text-[var(--black)] font-medium text-[16px] md:text-[17px] leading-relaxed mb-4">
              We&apos;ll build your site before you spend a dollar.<span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-blue)] hidden md:block" />
            </p>
            <p className="text-[var(--gray-medium)] text-[15px] md:text-[16px] leading-relaxed mb-8">
              Paste your LinkedIn URL, let us handle the rest. Give us 5 days to research your background, study your expertise, and write copy around it. We&apos;ll come back with a full one-page website tailored specifically to your positioning. No commitment, no calls. <span className="relative inline-block text-[var(--black)] font-medium">We move forward only if you love it<span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary-blue)]" /></span>.
            </p>
            <PrototypeForm id={formId} />
          </div>

          {/* Right: How It Works (subordinate, 5 cols, smaller text, lighter) */}
          <div className="lg:col-span-5 scroll-fade lg:pt-8">
            <p className="text-[var(--gray-medium)] text-[11px] font-medium tracking-widest uppercase mb-5">How It Works</p>
            <div className="flex flex-col gap-3">
              {howItWorks.map((step, i) => (
                <div key={step.icon} className="scroll-fade" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-start gap-4 text-[var(--black)]">
                    <span className="text-[var(--primary-blue)]/40 font-[family-name:var(--font-bebas)] text-2xl leading-none flex-shrink-0 pt-0.5">{step.icon}</span>
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-medium tracking-tight text-[var(--black)] mb-0.5">{step.h}</h3>
                      <p className="text-[var(--gray-medium)] text-[13px] leading-relaxed">{step.b}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── Data ─── */
// All five testimonials, each cut down to a couple of the client's own sentences
// (verbatim, nothing reworded). The full versions live in lib/site.
const testimonials = [
  { quote: 'In a matter of days, Stefanos and his team translated my experience into a polished, enterprise-level site, delivered with remarkable speed and zero red tape. It has elevated how I position myself in every client conversation.', name: 'Mark S. Piazza', role: 'Fractional CFO & Financial Advisor', image: 'https://res.cloudinary.com/dawyrpt2m/image/upload/v1766602121/Piazza_Headshot_1_daetif.jpg' },
  { quote: 'They are very responsive, creative and were able to take my desired content and feedback to create an end product that far exceeded my expectations. They work very efficiently, often turning around edits and new concepts in hours, with a sharp eye on every detail.', name: 'Tim Scott', role: 'Founder, True North Supply Chain Advisory', image: 'https://res.cloudinary.com/dawyrpt2m/image/upload/v1767130093/unnamed_1_l4haxs.jpg' },
  { quote: 'Unlike most vendors who send generic outreach, they had clearly taken the time to understand my business. The experience felt like a true partnership, and the value of the service far exceeded the cost.', name: 'Dr. Ron Paul', role: 'Founder, Polaris Leadership Institute', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1772528728/polaris-blog-media-migrated/6400c361-9c59-41ac-9875-14d9039a750e_d6zwwx.jpg' },
  { quote: 'I’m very happy with how it turned out. It looks clean, professional, and truly reflects my work and vision.', name: 'Ekaterina Semenyuk', role: 'Biosafety & Research Safety Consultant', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1784895183/Esemenyuk_tju264.jpg' },
  { quote: 'What impressed me most was their communication, attention to detail, and genuine commitment to understanding my vision. The result is a modern, visually impressive, and highly professional website that I’m proud to have representing Drone 1 Consulting.', name: 'Michael D. Costello III', role: 'Founder, Drone1 Consulting', image: 'https://res.cloudinary.com/dhduqssyx/image/upload/v1791912037/michael-costello_zwh0ao.avif' },
]

// Four case studies, shown as screen-recorded videos instead of screenshots.
// Names, links, descriptions and posters come from the shared /work data.
// {{STEF: drop each site's screen recording URL (mp4/webm, e.g. Cloudinary) into
// `video`. Until one is set, that card shows the screenshot as a still.}}
const LANDING_CASE_VIDEOS: { name: string; video?: string }[] = [
  { name: 'Dr. Ron Paul', video: undefined },
  { name: 'Mark S. Piazza', video: undefined },
  { name: 'Michael D. Costello III', video: undefined },
  { name: 'Spencer McGuire-Mitchem', video: undefined },
]
const caseVideos = LANDING_CASE_VIDEOS.flatMap(({ name, video }) => {
  const c = caseStudies.find(s => s.name === name && !s.hidden && s.url && s.image)
  return c ? [{ name: c.name, role: c.role, url: c.url as string, description: c.summary, poster: c.image as string, video }] : []
})

/* ─── Main Component ─── */
export default function LandingClient() {
  return (
    <FormProvider>
      <Landing />
    </FormProvider>
  )
}

function Landing() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)
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

  // Scroll-based theme switching (sections 5-6)
  const scrollThemes = useRef([
    { bg: 'rgb(0, 0, 0)', text: 'rgb(255, 255, 255)' },         // 5. Case study videos — dark
    { bg: 'rgb(250, 248, 245)', text: 'rgb(0, 0, 0)' },         // 6. Lead magnet — back to cream
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
          start: 'top center',
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
            <Link href="/landing/contact"
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


        {/* ─── 3. Positioning statement + all five testimonials ─── */}
        <section className="relative overflow-hidden">

          <div className="relative z-10 px-4 md:px-8 lg:px-12 py-20 md:py-28 lg:py-32">
            <div className="max-w-screen-2xl mx-auto">

              {/* Statement */}
              <p className="scroll-fade mx-auto max-w-4xl text-center text-[clamp(20px,2.6vw,34px)] font-light leading-[1.35] tracking-tight text-[var(--black)] mb-16 md:mb-24">
                Caldera is the website agency built for consultants. We lead creative direction, design,
                and web development for ambitious brands shaping the future of their industry.
              </p>

              {/* Testimonials — three across, then two across, on a 6-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-5">
                {testimonials.map((t, i) => (
                  <div
                    key={t.name}
                    className={`scroll-fade ${i < 3 ? 'md:col-span-2' : 'md:col-span-3'} backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl p-5 md:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.04)] flex flex-col`}
                    style={{ transitionDelay: `${(i % 3) * 100}ms` }}
                  >
                    <p className="text-[15px] md:text-[16px] font-medium leading-snug tracking-tight mb-5 text-[var(--black)]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden relative">
                        <Image src={t.image} alt={t.name} fill className="object-cover" style={{ objectPosition: 'top' }} sizes="44px" />
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

        {/* ─── 4. Lead magnet (same as section 6 for now) ─── */}
        <section className="relative overflow-hidden">
          <LeadMagnet formId="prototype-form" />
        </section>

        {/* ─── 5. Case studies — 4 videos ─── */}
        <section ref={el => { themedSectionRefs.current[0] = el }} className="py-24 md:py-32 px-8">
          <div className="max-w-screen-2xl mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Highlighted Work</p>
            <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">What It Looks Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {caseVideos.map((item, i) => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="portfolio-card group scroll-fade block" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
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
                    {/* Screen recording — fixed 16:10 frame so all four cards line up.
                        Falls back to the screenshot until a video is supplied. */}
                    <div className="relative aspect-[16/10] bg-black">
                      {item.video ? (
                        <video
                          src={item.video}
                          poster={item.poster}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={`${item.name} website walkthrough`}
                        />
                      ) : (
                        <Image src={item.poster} alt={`${item.name} website`} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
                      )}
                    </div>
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

            {/* This section's theme is always dark, so the button inverts the
                standard black CTA: white plate, blue slide-in on hover. */}
            <div className="text-center mt-16 md:mt-20 scroll-fade">
              <Link
                href="/landing/work"
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-white text-[var(--black)] px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
              >
                <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">See all our work</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">&rarr;</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ─── 6. Lead magnet ─── */}
        {/* Back to cream after the dark case studies, matching section 4. */}
        <section ref={el => { themedSectionRefs.current[1] = el }} id="contact" className="relative overflow-hidden">
          <LeadMagnet formId="prototype-form-bottom" />
        </section>

        <Footer basePath="/landing" />
      </div>

    </>
  )
}
