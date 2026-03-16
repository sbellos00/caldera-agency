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
import Aurora from '@/components/Aurora'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

const CrowdCanvas = dynamic(() => import('@/components/CrowdCanvas'), { ssr: false })

/* ─── Preloader (Nitro stair-wipe) ─── */
const PRELOADER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function Preloader() {
  const text = 'You do nothing. We build everything.'
  const words = text.split(' ')
  return (
    <motion.div className="fixed inset-0 z-[200]">
      <div className="absolute z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <motion.h1
          className="font-serif italic text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
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

/* ─── Word-by-word reveal ─── */
function WordReveal({ text, className, delay = 0, isDark }: { text: string; className?: string; delay?: number; isDark?: boolean }) {
  const words = text.split(' ')
  return (
    <motion.p className={className} initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.3em]"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PRELOADER_EASE } } }}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

/* ─── Form Context ─── */
type FormStatus = 'idle' | 'submitting' | 'processing' | 'success' | 'error'
interface FormCtx {
  step: 1 | 2; linkedin: string; email: string; status: FormStatus; error: string
  setStep: (s: 1 | 2) => void; setLinkedin: (v: string) => void; setEmail: (v: string) => void
  setStatus: (s: FormStatus) => void; setError: (e: string) => void
}
const FormContext = createContext<FormCtx | null>(null)
const useForm = () => { const c = useContext(FormContext); if (!c) throw new Error('useForm must be inside FormProvider'); return c }

function FormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [linkedin, setLinkedin] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  return (
    <FormContext.Provider value={{ step, linkedin, email, status, error, setStep, setLinkedin, setEmail, setStatus, setError }}>
      {children}
    </FormContext.Provider>
  )
}

/* ─── PrototypeForm ─── */
const PROCESSING_MESSAGES = ['Analyzing your LinkedIn profile...', 'Preparing your prototype request...']

function PrototypeForm({ id, variant = 'light' }: { id: string; variant?: 'light' | 'dark' | 'minimal' }) {
  const { step, linkedin, email, status, error, setStep, setLinkedin, setEmail, setStatus, setError } = useForm()
  const [transitioning, setTransitioning] = useState(false)
  const [processingIdx, setProcessingIdx] = useState(0)
  const isDark = variant === 'dark'
  const isMinimal = variant === 'minimal'

  const inputClass = isDark
    ? 'flex-1 px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white text-[15px] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all'
    : isMinimal
      ? 'min-w-0 flex-[3] px-6 py-4 rounded-lg rounded-r-none bg-[var(--cream)] border-0 text-[15px] placeholder:text-[var(--gray-medium)] focus:outline-none transition-all'
      : 'flex-1 px-5 py-4 rounded-lg bg-[var(--cream)] border border-[var(--cream)] text-[15px] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all'

  const handleStep1 = useCallback(() => {
    if (!linkedin.trim()) { setError('Please enter your LinkedIn URL.'); return }
    setError(''); setTransitioning(true)
    setTimeout(() => { setStep(2); setTransitioning(false) }, 200)
  }, [linkedin, setError, setStep])

  const handleStep2 = useCallback(async () => {
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return }
    setError(''); setStatus('submitting')
    try {
      const res = await fetch('/api/prototype', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ linkedin, email }) })
      if (res.ok) { setStatus('processing'); setProcessingIdx(0) }
      else { setStatus('error'); setError('Something went wrong. Please try again.') }
    } catch { setStatus('error'); setError('Something went wrong. Please try again.') }
  }, [email, linkedin, setError, setStatus])

  useEffect(() => {
    if (status !== 'processing') return
    if (processingIdx < PROCESSING_MESSAGES.length - 1) {
      const t = setTimeout(() => setProcessingIdx(i => i + 1), 1500); return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStatus('success'), 1500); return () => clearTimeout(t)
  }, [status, processingIdx, setStatus])

  if (status === 'processing') {
    return (
      <div id={id} className="text-center py-8">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${isDark ? 'bg-white/20' : 'bg-[var(--blue-light)]'}`}>
          <svg className={`w-6 h-6 animate-spin ${isDark ? 'text-white' : 'text-[var(--primary-blue)]'}`} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <p className={`text-[15px] font-medium tracking-tight transition-opacity duration-300 ${isDark ? 'text-white' : 'text-[var(--gray-dark)]'}`}>
          {PROCESSING_MESSAGES[processingIdx]}
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div id={id} className="text-center py-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${isDark ? 'bg-white' : 'bg-[var(--primary-blue)]'}`}>
          <svg className={`w-8 h-8 ${isDark ? 'text-[var(--primary-blue)]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-2xl font-medium tracking-tight mb-3 ${isDark ? 'text-white' : ''}`}>We&apos;re on it.</h3>
        <p className={`max-w-md mx-auto leading-relaxed mb-6 ${isDark ? 'text-white/60' : 'text-[var(--gray-medium)]'}`}>
          We&apos;ll send your website preview and a full report of our design choices and strategy to your inbox within 24 hours.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 text-sm ${isDark ? 'text-white/40' : 'text-[var(--gray-medium)]'}`}>
          <span>What happens next?</span>
          <Link href="/process" className={`underline underline-offset-4 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-[var(--primary-blue)] hover:text-[var(--blue-dark)]'}`}>
            See our full process
          </Link>
        </div>
      </div>
    )
  }

  const dots = (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step === 1 ? (isDark ? 'bg-white' : 'bg-[var(--primary-blue)]') : (isDark ? 'bg-white/30' : 'bg-[var(--cream)]')}`} />
      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${step === 2 ? (isDark ? 'bg-white' : 'bg-[var(--primary-blue)]') : (isDark ? 'bg-white/30' : 'bg-[var(--cream)]')}`} />
    </div>
  )

  return (
    <div id={id} className="w-full max-w-lg mx-auto">
      {!isMinimal && dots}
      <div className={`transition-all duration-200 ${transitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {step === 1 ? (
          <div className="flex flex-col gap-3">
            {!isMinimal && <label htmlFor={`${id}-linkedin`} className={`text-sm font-medium pl-1 ${isDark ? 'text-white/70' : 'text-[var(--gray-dark)]'}`}>Your LinkedIn URL</label>}
            {isMinimal ? (
              /* Unified input group — input and button as one connected element */
              <div className="flex flex-col sm:flex-row bg-[var(--cream)] rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <input id={`${id}-linkedin`} type="url" value={linkedin} onChange={e => { setLinkedin(e.target.value); setError('') }}
                  placeholder="Paste your LinkedIn URL" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep1()} />
                <button onClick={handleStep1}
                  className="group relative overflow-hidden flex-shrink-0 px-6 py-4 text-[14px] font-medium bg-[var(--black)] text-white tracking-tight transition-all duration-300 hover:scale-105 whitespace-nowrap rounded-lg sm:rounded-l-none">
                  <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white">Get Your Free Prototype <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span></span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input id={`${id}-linkedin`} type="url" value={linkedin} onChange={e => { setLinkedin(e.target.value); setError('') }}
                  placeholder="linkedin.com/in/yourprofile" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep1()} />
                <button onClick={handleStep1}
                  className={`group relative overflow-hidden px-6 py-4 text-[15px] font-medium rounded-lg tracking-tight transition-all duration-300 hover:scale-105 whitespace-nowrap ${isDark ? 'bg-white text-black' : 'bg-[var(--black)] text-white'}`}>
                  <div className={`absolute inset-0 ${isDark ? 'bg-[var(--black)]' : 'bg-[var(--primary-blue)]'} transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0`} />
                  <span className="relative z-10 group-hover:text-white">Get Your Free Prototype</span>
                </button>
              </div>
            )}
            {error && <p className="text-red-400 text-sm pl-1">{error}</p>}
            {!isMinimal && <p className={`text-sm pl-1 ${isDark ? 'text-white/40' : 'text-[var(--gray-medium)]'}`}>Step 1 of 2. We only use this to research your site. No spam.</p>}
            {isMinimal && <p className="text-[var(--gray-medium)] text-sm text-center mt-1">Free prototype. No calls. No commitment.</p>}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {!isMinimal && (
              <label htmlFor={`${id}-email`} className={`text-sm font-medium pl-1 ${isDark ? 'text-white/70' : 'text-[var(--gray-dark)]'}`}>
                Where should we send your website preview and design strategy report?
              </label>
            )}
            {isMinimal && <p className="text-sm font-medium text-[var(--gray-dark)] text-center">Where should we send your prototype?</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <input id={`${id}-email`} type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com" className={inputClass} onKeyDown={e => e.key === 'Enter' && handleStep2()} />
              <button onClick={handleStep2} disabled={status === 'submitting'}
                className={`group relative overflow-hidden px-6 py-4 text-[15px] font-medium rounded-lg tracking-tight transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 whitespace-nowrap ${isDark ? 'bg-white text-black' : 'bg-[var(--black)] text-white'}`}>
                <div className={`absolute inset-0 ${isDark ? 'bg-[var(--black)]' : 'bg-[var(--primary-blue)]'} transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0`} />
                <span className="relative z-10 group-hover:text-white">{status === 'submitting' ? 'Sending...' : 'Send My Free Prototype'}</span>
              </button>
            </div>
            {error && <p className="text-red-400 text-sm pl-1">{error}</p>}
            <div className={`flex items-center ${isMinimal ? 'justify-center gap-4' : 'justify-between'} pl-1`}>
              <button onClick={() => { setTransitioning(true); setTimeout(() => { setStep(1); setTransitioning(false) }, 200) }}
                className={`text-sm underline underline-offset-4 transition-colors ${isDark ? 'text-white/40 hover:text-white/70' : 'text-[var(--gray-medium)] hover:text-[var(--gray-dark)]'}`}>
                &larr; Edit LinkedIn URL
              </button>
              {!isMinimal && <p className={`text-sm ${isDark ? 'text-white/40' : 'text-[var(--gray-medium)]'}`}>Last step. You&apos;ll hear from us within 24 hours.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Data ─── */
const faqData = [
  { q: 'What if I don\'t have time for a big project?', a: 'Send us whatever you have, organized or not. We figure out the rest and come back with a full working website. Most clients spend less than 2 hours during the entire process. Your job is reviewing what we build.' },
  { q: 'I was burned by agencies/freelancers before.', a: 'Before you spend a dollar, you see a working prototype of your actual website. No briefs, no mood boards, no promises. We build first and earn your trust before asking for anything. From there, you approve each phase before we move forward.' },
  { q: 'What if you\'re late?', a: 'We are the fastest in the market. Clients who stay responsive have launched in under a week. Speed is not something we need to guarantee. It is just how we work.' },
  { q: 'What if I\'m not happy at launch?', a: 'You only pay for each phase after you approve it. Final payment is only due if you\'re proud to launch. No risk of paying for something you can\'t use.' },
  { q: 'Who owns the site?', a: 'You own it, fully. No platform risk, no lock-in. We provide hosting, support, and maintenance to make your life easier, but you can take the full code and self-host anytime you wish.' },
  { q: 'What if I need updates later?', a: 'Up to 4 post-launch development hours are included for free during the first month with your hosting plan, then 2 hours per month thereafter. Anything more is handled quickly by us at our standard rate.' },
  { q: 'Do you build for other industries?', a: 'No. Consultants only. That\'s why our sites work.' },
  { q: 'Isn\'t this just another template site?', a: 'No. Every step is research-based and guides us towards designing the perfect website for you from scratch. All design and copy is consultant-specific and tailored to your positioning, built for consulting credibility. Never generic.' },
  { q: 'Why not just do it myself?', a: 'Weeks of your time versus a few hours of reviewing. We handle the research, strategy, copy, design, and development. You show up, give feedback, and launch.' },
  { q: 'Will this bring leads?', a: 'No site guarantees leads. But without credibility, you lose by default. This site is built to open doors to RFPs, partnerships, and high-value deals.' },
  { q: 'LinkedIn works for me now.', a: 'LinkedIn is just one platform. A professional website gives you full control over your digital presence, establishes deeper credibility, and positions you at a higher tier than competitors who rely solely on social media. Don\'t risk being at the mercy of algorithms and sudden policy changes.' },
]

const testimonials = [
  { highlight: 'It has elevated how I position myself in every client conversation.', quote: 'Caldera Agency didn\'t just build me a website, they helped me formally launch my entrepreneurial practice with clarity and credibility. In a matter of days, Stefanos and his team translated my experience into a polished, enterprise-level site, delivered with remarkable speed and zero red tape. It has elevated how I position myself in every client conversation.', name: 'Mark S. Piazza', role: 'Fractional CFO & Financial Advisor', image: 'https://res.cloudinary.com/dawyrpt2m/image/upload/v1766602121/Piazza_Headshot_1_daetif.jpg', imgPos: 'center 30%' },
  { highlight: 'They work very efficiently, often turning around edits and new concepts in hours, with a sharp eye on every detail.', quote: 'My experience with the Caldera team has been great. They are very responsive, creative and were able to take my desired content and feedback to create an end product that far exceeded my expectations. They work very efficiently, often turning around edits and new concepts in hours, with a sharp eye on every detail. I highly recommend the team at Caldera.', name: 'Tim Scott', role: 'Founder, True North Supply Chain Advisory', image: 'https://res.cloudinary.com/dawyrpt2m/image/upload/v1767130093/unnamed_1_l4haxs.jpg', imgPos: 'center' },
  { highlight: 'The experience felt like a true partnership, and the value of the service far exceeded the cost.', quote: 'I was initially drawn to Caldera Agency because, unlike most vendors who send generic outreach, they had clearly taken the time to understand my business. That attention to detail and spirit of customization carried through the entire engagement. The team was incredibly responsive and committed to getting every element right. We truly built the website together, collaborating on everything from the core structure to the smallest design adjustments and animations. Caldera met every specification I had and was always willing to refine details until the site reflected exactly what I envisioned. The experience felt like a true partnership, and the value of the service far exceeded the cost.', name: 'Dr. Ron Paul', role: 'Founder, Polaris Leadership Institute', image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1772528728/polaris-blog-media-migrated/6400c361-9c59-41ac-9875-14d9039a750e_d6zwwx.jpg', imgPos: 'center' },
]

const portfolioItems = [
  {
    name: 'Dr. Ron Paul',
    role: 'Leadership Coach & Culture Transformation Expert',
    url: 'https://polarisinstitute.io',
    description: 'Full website build: brand development, strategy, design, development, and copywriting.',
    image: '/WorkScreenshots/Screenshot 2026-03-02 081608.png',
  },
  {
    name: 'Mark S. Piazza',
    role: 'Fractional CFO & Financial Advisor',
    url: 'https://markspiazza.com',
    description: 'One-page website: strategy, copy, design, development. Compact layout designed to minimize scrolls.',
    image: '/WorkScreenshots/Screenshot 2026-03-02 081828.png',
  },
]

/* ─── Main Component ─── */
export default function HomeV2() {
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

  const scrollToNearestForm = useCallback(() => {
    const hero = document.getElementById('prototype-form')
    const bottom = document.getElementById('prototype-form-bottom')
    if (!hero || !bottom) { (hero || bottom)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
    const heroRect = hero.getBoundingClientRect()
    const bottomRect = bottom.getBoundingClientRect()
    const target = Math.abs(heroRect.top) < Math.abs(bottomRect.top) ? hero : bottom
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  // Upgraded cursor with GSAP lerp + magnetic pull + text mode
  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const textEl = cursorTextRef.current
    if (!cursor || !dot || !textEl) return

    if (window.innerWidth <= 768) {
      cursor.style.display = 'none'; dot.style.display = 'none'; textEl.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0, dotX = 0, dotY = 0

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    document.addEventListener('mousemove', handleMouseMove)

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
    gsap.ticker.add(update)

    // Magnetic pull for interactive elements
    const magnetics = document.querySelectorAll('a, button, .portfolio-card')
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
    magnetics.forEach(el => { el.addEventListener('mouseenter', magnetEnter); el.addEventListener('mouseleave', magnetLeave) })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(update)
      magnetics.forEach(el => { el.removeEventListener('mouseenter', magnetEnter); el.removeEventListener('mouseleave', magnetLeave) })
    }
  }, [])

  // Scroll-fade observer — standalone so it works on mobile (cursor effect early-returns on small screens)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
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
    <FormProvider>
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

      {/* ─── 2. Hero (fixed) — grid pattern ─── */}
      <section className="fixed inset-0 h-screen flex flex-col z-0 bg-[var(--cream)]">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-16 pt-[5vh]">
          <div className="text-center flex flex-col items-center w-full max-w-screen-2xl">
            {/* Title — 2 lines: line 1 from bottom, line 2 from top */}
            {/* Wait for preloader to finish before animating */}
            {!showPreloader && (
              <>
                <div className="mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', lineHeight: 0.95, fontWeight: 300, letterSpacing: '-0.04em' }}>
                  <VerticalCutReveal
                    splitBy="words"
                    staggerDuration={0.08}
                    staggerFrom="first"
                    transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.7 }}
                    containerClassName="justify-center"
                    wordLevelClassName="py-[0.1em] pr-[0.05em]"
                    elementLevelClassName={'text-[var(--black)]'}
                  >
                    The Website Agency
                  </VerticalCutReveal>
                  <div className="flex flex-wrap justify-center">
                    <VerticalCutReveal
                      splitBy="words"
                      staggerDuration={0.08}
                      staggerFrom="first"
                      reverse
                      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.1 }}
                      containerClassName=""
                      wordLevelClassName="py-[0.1em] pr-[0.05em]"
                      elementLevelClassName={'text-[var(--black)]'}
                    >
                      {'Built for '}
                    </VerticalCutReveal>
                    <VerticalCutReveal
                      splitBy="words"
                      staggerDuration={0.08}
                      staggerFrom="first"
                      reverse
                      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.3 }}
                      containerClassName="font-serif italic"
                      wordLevelClassName="py-[0.1em] pr-[0.05em]"
                      elementLevelClassName="text-[var(--primary-blue)] font-normal"
                    >
                      Solo Consultants
                    </VerticalCutReveal>
                  </div>
                </div>

                <motion.p
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)' }}
                  className="font-medium tracking-tight text-[var(--gray-medium)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                >
                  You do{' '}
                  <span className={`relative inline-block ${'text-[var(--black)]'}`}>
                    nothing
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-blue)]"
                      style={{ transformOrigin: 'left center' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  . We build{' '}
                  <span className={`relative inline-block ${'text-[var(--black)]'}`}>
                    everything
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-blue)]"
                      style={{ transformOrigin: 'left center' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  .
                </motion.p>
              </>
            )}
          </div>
        </div>

        {/* Testimonials — rich cards with pull-quote highlight */}
        <motion.div
          className="relative z-10 w-full pb-8 md:pb-12 px-6 md:px-12"
          initial={{ opacity: 0, y: 30 }}
          animate={!showPreloader ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.9 + i * 0.15 }}
                className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-2xl p-4 md:p-5 shadow-[0_4px_30px_rgba(0,0,0,0.04)] flex items-start gap-4"
              >
                {/* Photo */}
                {t.image ? (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex-shrink-0 overflow-hidden relative">
                    <Image src={t.image} alt={t.name} fill className="object-cover" style={{ objectPosition: t.imgPos }} sizes="56px" />
                  </div>
                ) : (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex-shrink-0 bg-[var(--black)]/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[var(--black)]/60">{t.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className={`text-[13px] md:text-[14px] font-medium leading-snug tracking-tight mb-2 ${'text-[var(--black)]'}`}>
                    &ldquo;{t.highlight}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[12px] font-medium ${'text-[var(--black)]'}`}>{t.name}</span>
                    <span className="text-[11px] text-[var(--gray-medium)]">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* Spacer */}
      <div className="h-screen" aria-hidden="true" />

      {/* ─── All scrollable content ─── */}
      <div ref={scrollContainerRef} className="relative z-10 theme-container" style={{ backgroundColor: 'rgb(250, 248, 245)', color: 'rgb(0, 0, 0)', transition: 'background-color 400ms ease-out' }}>

        {/* ─── 3. Drawer: Form + How It Works (2-col) ─── */}
        <section className="relative overflow-hidden">

          <div className="relative z-10 px-8 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32">
            <div className="max-w-screen-xl mx-auto">

              {/* Two-column layout — left sells, right supports */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* Left: CTA (dominant — 7 cols) */}
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
                  <PrototypeForm id="prototype-form" variant="minimal" />
                </div>

                {/* Right: How It Works (subordinate — 5 cols, smaller text, lighter) */}
                <div className="lg:col-span-5 scroll-fade lg:pt-8">
                  <p className="text-[var(--gray-medium)] text-[11px] font-medium tracking-widest uppercase mb-5">How It Works</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: '01', h: 'We build first', b: 'We study your LinkedIn, positioning, and market, then build a working prototype before we ever talk.' },
                      { icon: '02', h: 'The prototype does the talking', b: 'Instead of briefs and questionnaires, we start with something real. It proves what we can do and gives us both a concrete starting point.' },
                      { icon: '03', h: 'You review, we refine', b: 'Some clients take it nearly as-is. Others want big changes. We jump on a quick call to understand what you need and tailor our offer accordingly. Either way, there\u2019s no homework for you, just send us whatever you have, we figure it out and come back with the next version.' },
                      { icon: '04', h: 'Launch', b: 'Your site goes live with 1 year of free hosting and support.' },
                    ].map((step, i) => (
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
              We make websites for consultants<br className="hidden md:block" /> who don&apos;t have time.
            </h2>

            {/* 3 equal cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              {[
                { h: 'We do the research so you don\'t have to.', b: 'We study your LinkedIn, your positioning, your competitors, and your market. You don\'t fill out discovery forms. You don\'t sit through briefing calls. We come to you with a prototype, not a questionnaire.' },
                { h: 'Fast turnaround. Minimal time from you.', b: 'From prototype to launch, the entire process takes less time than most agency discovery calls. We handle copywriting, design, development, domain setup, analytics - everything. You just give feedback.' },
                { h: 'You own everything. No lock-in.', b: 'Your code. Your domain. Your site. We host it for a year for free and handle maintenance, but you can take the full codebase and leave anytime. No proprietary platforms. No hostage situations.' },
              ].map((card, i) => (
                <div key={i} className="feature-card bg-[var(--cream)] rounded-2xl p-7 md:p-8 relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white" />
                  <h3 className="text-xl font-medium tracking-tight mb-3 text-[var(--black)] relative z-10 group-hover:text-white">{card.h}</h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">{card.b}</p>
                </div>
              ))}
            </div>

            {/* Objection card — full width, centered */}
            <div className="feature-card bg-[var(--cream)] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3 text-[var(--black)] relative z-10 group-hover:text-white">&ldquo;What if I don&apos;t like what you build?&rdquo;</h3>
              <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] max-w-2xl mx-auto relative z-10 group-hover:text-white">
                You see a free prototype before you pay anything. After that, you approve each phase before we move on. You only pay for work you&apos;ve reviewed and approved. Final payment is due only when you&apos;re ready to launch.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Founder Section — editorial/manifesto ─── */}
        <section ref={el => { themedSectionRefs.current[2] = el }} className="py-24 md:py-32 px-8 relative overflow-hidden noise-overlay">
          <div className="max-w-screen-lg mx-auto relative z-10">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-12 scroll-fade">From the Founder</p>

            {/* Pull quote */}
            <blockquote className="text-center mb-16 scroll-fade">
              <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight font-serif italic text-white/90 max-w-3xl mx-auto">
                &ldquo;Consultants shouldn&apos;t have to become web designers just to look professional online.&rdquo;
              </p>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-start scroll-fade">
              {/* Photo + name */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-36 h-44 md:w-48 md:h-56 relative mb-4 rounded-2xl overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
                  <Image src="/images/linkedinpfp.jpg" alt="Stef, Founder of Caldera Agency" fill className="object-cover object-top" sizes="192px" />
                </div>
                <p className="font-medium tracking-tight text-lg text-white">Stefanos Bellos</p>
                <p className="text-white/40 text-sm">Founder, Caldera Agency</p>
              </div>

              {/* Letter */}
              <div className="space-y-5 text-lg leading-relaxed text-white/70">
                <p>
                  I spent thousands of hours at Dialectica connecting consultants with investors and global enterprises. I talked to hundreds of experts, brilliant people who shaped decisions worth millions.
                </p>
                <p>
                  Most of them had no website. Or worse, they had one that looked like it was built in 2012.
                </p>
                <p>
                  They&apos;d lose RFPs to competitors who simply looked more credible online. They&apos;d get a warm referral and have nowhere to send them. They&apos;d rely entirely on LinkedIn and hope the algorithm was kind.
                </p>
                <p>
                  That&apos;s why I started Caldera. Because consultants shouldn&apos;t have to become web designers, copywriters, or project managers just to look professional online.
                </p>
                <p className="text-white/90 font-medium">
                  You drop your LinkedIn URL. We do everything else. And we send you a prototype before you spend a cent, because we&apos;d rather earn your trust than ask for it.
                </p>
              </div>
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
                    {t.image ? (
                      <div className="w-40 h-48 md:w-full md:h-full rounded-xl overflow-hidden relative">
                        <Image src={t.image} alt={t.name} fill className="object-cover" style={{ objectPosition: t.imgPos }} sizes="180px" />
                      </div>
                    ) : (
                      <div className="w-40 h-48 md:w-full md:h-full rounded-xl bg-[var(--black)]/5 flex items-center justify-center">
                        <span className="text-3xl font-light text-[var(--black)]/30">{t.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    )}
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
                      <h3 className="text-base md:text-lg lg:text-xl font-normal pr-6">{item.q}</h3>
                      <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === i ? 'rotate-45' : ''}`}>
                        <span className="text-xl font-light leading-none">+</span>
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
              <Link href="/contact" className="inline-flex items-center gap-2 text-base md:text-lg relative pb-1 group">
                <span>Get in touch</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-[width] duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 9. Final CTA — Stand Out + CrowdCanvas + Form ─── */}
        <section ref={el => { themedSectionRefs.current[5] = el }} className="relative flex flex-col w-full overflow-hidden">
          {/* Grid pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-20 md:pt-28 text-center">
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="text-[clamp(40px,6vw,80px)] font-light tracking-tight leading-[0.95] text-[var(--black)] mb-4">
              <span className="block sm:inline">Stand Out From the </span>
              <span className="text-[var(--primary-blue)] font-serif italic">LinkedIn Crowd</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--gray-medium)] mb-8">
              Drop your LinkedIn URL and we&apos;ll send you a free prototype. No calls. No commitment. No homework.
            </motion.p>

            {/* Inline form — minimal variant, no card wrapper */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-xl">
              <PrototypeForm id="prototype-form-bottom" variant="minimal" />
            </motion.div>
          </div>

          {/* CrowdCanvas */}
          <div className="relative h-[45vh] w-full mt-8 sm:h-[50vh] md:h-[55vh]">
            <CrowdCanvas src="/images/peeps/open-peeps-sheet.png" rows={15} cols={7} />
          </div>
        </section>

        <Footer />
      </div>

    </FormProvider>
  )
}
