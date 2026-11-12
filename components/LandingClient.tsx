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
import { caseMedia, vanaiCase } from '@/lib/landingMedia'
import CaseVideo from '@/components/CaseVideo'

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
  email: string; company: string; linkedin: string; trap: string; status: FormStatus; error: string
  setEmail: (v: string) => void; setCompany: (v: string) => void; setLinkedin: (v: string) => void
  setTrap: (v: string) => void; setStatus: (s: FormStatus) => void; setError: (e: string) => void
}
const FormContext = createContext<FormCtx | null>(null)
const useForm = () => { const c = useContext(FormContext); if (!c) throw new Error('useForm must be inside FormProvider'); return c }

function FormProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [linkedin, setLinkedin] = useState('')
  // Honeypot — hidden from real users, filled in by bots.
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  return (
    <FormContext.Provider value={{ email, company, linkedin, trap, status, error, setEmail, setCompany, setLinkedin, setTrap, setStatus, setError }}>
      {children}
    </FormContext.Provider>
  )
}

/* ─── Prototype Form ─── */
/* Email + company name or website, with LinkedIn optional. Both required fields
   are easy to type on a phone, and together they are enough to find the right
   person: a business email's domain leads to the company, and with a Gmail
   address the company name does the same job. */
const PROCESSING_MESSAGES = ['Looking up your practice...', 'Preparing your prototype request...']

function PrototypeForm({ id, layout }: { id: string; layout: 'row' | 'grid' }) {
  const { email, company, linkedin, trap, status, error, setEmail, setCompany, setLinkedin, setTrap, setStatus, setError } = useForm()
  const [processingIdx, setProcessingIdx] = useState(0)

  const fieldClass = 'w-full px-5 py-3.5 md:py-4 rounded-lg bg-white border border-black/10 text-[16px] text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 transition-all'
  const row = layout === 'row'

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email address.'); return }
    if (!company.trim()) { setError('Please enter your company name or website.'); return }
    setError(''); setStatus('submitting')
    // The API has no honeypot handling, so a filled trap short-circuits here:
    // the bot sees a success and nothing is sent.
    if (trap) { setStatus('processing'); return }
    try {
      const res = await fetch('/api/prototype', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), company: company.trim(), linkedin: linkedin.trim() }),
      })
      if (res.ok) { setStatus('processing'); return }
      // Surface the API's own reason so a misconfigured mailer isn't invisible.
      const data = await res.json().catch(() => null)
      setStatus('error')
      setError(data?.error || 'Something went wrong. Please email us at contact@caldera.agency.')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please email us at contact@caldera.agency.')
    }
  }, [email, company, linkedin, trap, status, setError, setStatus])

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

  // 'row' puts all four on one line; 'grid' is two by two: email and company
  // on top, LinkedIn and the button underneath. Both stack on phones.
  // The placeholders double as the labels (kept for screen readers) so the
  // whole form stays short enough to sit inside one screen.
  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={`w-full ${row ? 'max-w-5xl mx-auto' : 'max-w-xl'}`}>
      <div className={row ? 'grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto] gap-2.5 md:gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3'}>
        <div>
          <label htmlFor={`${id}-email`} className="sr-only">Email</label>
          <input id={`${id}-email`} type="email" inputMode="email" autoComplete="email" value={email}
            onChange={e => { setEmail(e.target.value); setError('') }} placeholder="Email" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-company`} className="sr-only">Company name or website</label>
          <input id={`${id}-company`} type="text" autoComplete="organization" value={company}
            onChange={e => { setCompany(e.target.value); setError('') }} placeholder="Company name or website" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`${id}-linkedin`} className="sr-only">LinkedIn (optional)</label>
          <input id={`${id}-linkedin`} type="text" inputMode="url" autoComplete="off" value={linkedin}
            onChange={e => { setLinkedin(e.target.value); setError('') }} placeholder="LinkedIn (optional)" className={fieldClass} />
        </div>
        <button type="submit" disabled={status === 'submitting'}
          className="group relative overflow-hidden w-full px-8 py-3.5 md:py-4 text-[16px] font-medium bg-[var(--black)] text-white tracking-tight rounded-lg whitespace-nowrap transition-all duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100">
          <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {status === 'submitting' ? 'Sending...' : <>Get My Free Prototype <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span></>}
          </span>
        </button>
      </div>

      {/* Honeypot — hidden from people and assistive tech, catnip for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-fax`}>Fax</label>
        <input id={`${id}-fax`} name="fax" type="text" tabIndex={-1} autoComplete="off"
          value={trap} onChange={e => setTrap(e.target.value)} />
      </div>

      {error && <p role="alert" className={`text-red-500 text-sm mt-3 ${row ? 'text-center' : ''}`}>{error}</p>}
    </form>
  )
}

/* ─── Lead Magnet ─── */
/* Two layouts of the same offer, each sized to fit inside one screen:
   - LeadMagnetTop (section 3): centered headline, a fan of three site stills,
     and the form on one line.
   - LeadMagnetSplit (section 5): two columns, the offer and form on the left
     and site recordings playing on the right. */
const TOP_HEADLINE = 'Get your free custom website prototype before you invest.'
const TOP_SUBLINE = 'Tell us who you are and where to send it. We\u2019ll research your practice, write the copy and design a working first version of your site in just a few days. You only move forward if you love it.'
const SPLIT_HEADLINE = 'See What Your Website Could Look Like.'
const SPLIT_SUBLINE = 'Leave your details and we\u2019ll start working on your prototype.'

function mediaFor(names: string[]) {
  return names.flatMap(name => {
    const c = caseStudies.find(s => s.name === name && !s.hidden)
    const m = caseMedia[name]
    return c && m ? [{ name: c.name, url: c.url, ...m }] : []
  })
}
// Order is left, centre, right.
const FAN_SHOTS = mediaFor(['Mark S. Piazza', 'Spencer McGuire-Mitchem', 'David Zurita'])
// Front recording first, then the one tucked behind it.
const SPLIT_VIDEOS = mediaFor(['Dr. Ron Paul', 'Francis Dumont'])

function ScreenshotFan({ shots }: { shots: { name: string; still: string }[] }) {
  if (shots.length < 3) return null
  const [left, centre, right] = shots
  const frame = 'absolute overflow-hidden rounded-md md:rounded-xl border border-black/10 bg-white aspect-[16/9]'
  // The width follows the screen height, so the fan shrinks on short screens
  // instead of pushing the form below the fold.
  return (
    <div className="scroll-fade relative mx-auto aspect-[10/3]" style={{ width: 'min(100%, 104svh, 1040px)', perspective: '1400px' }}>
      <div className={`${frame} left-0 top-1/2 w-[38%] shadow-[0_10px_40px_rgba(0,0,0,0.10)]`}
        style={{ transform: 'translateY(-50%) rotateY(30deg)', transformOrigin: 'right center' }}>
        <Image src={left.still} alt={`${left.name} website`} fill className="object-cover object-top" sizes="(max-width: 768px) 40vw, 400px" />
      </div>
      <div className={`${frame} right-0 top-1/2 w-[38%] shadow-[0_10px_40px_rgba(0,0,0,0.10)]`}
        style={{ transform: 'translateY(-50%) rotateY(-30deg)', transformOrigin: 'left center' }}>
        <Image src={right.still} alt={`${right.name} website`} fill className="object-cover object-top" sizes="(max-width: 768px) 40vw, 400px" />
      </div>
      <div className={`${frame} left-1/2 top-1/2 w-[53.33%] z-10 shadow-[0_20px_60px_rgba(0,0,0,0.22)]`}
        style={{ transform: 'translate(-50%, -50%)' }}>
        <Image src={centre.still} alt={`${centre.name} website`} fill className="object-cover object-top" sizes="(max-width: 768px) 56vw, 560px" />
      </div>
    </div>
  )
}

function LeadMagnetTop({ formId }: { formId: string }) {
  return (
    <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-5 md:px-12 lg:px-16 pt-24 pb-10 md:pb-12">
      <div className="w-full max-w-screen-xl mx-auto text-center flex flex-col gap-6 md:gap-[clamp(20px,3.5svh,40px)]">
        <div>
          <h1 className="scroll-fade mx-auto max-w-5xl text-[clamp(28px,min(4.6vw,7.2svh),64px)] font-semibold tracking-tight leading-[1.04] text-[var(--black)] mb-3 md:mb-4">
            {TOP_HEADLINE}
          </h1>
          <p className="scroll-fade mx-auto max-w-3xl text-[var(--gray-medium)] text-[14px] md:text-[17px] leading-relaxed">
            {TOP_SUBLINE}
          </p>
        </div>

        <ScreenshotFan shots={FAN_SHOTS} />

        <div className="scroll-fade">
          <PrototypeForm id={formId} layout="row" />
        </div>
      </div>
    </div>
  )
}

function BrowserFrame({ url, children, className = '' }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl md:rounded-2xl border border-black/10 bg-[#111] ${className}`}>
      <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-[#1b1b1b] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/20" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/20" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/20" />
        </div>
        {url && <div className="ml-2 bg-white/10 rounded-md px-3 py-0.5 text-[10px] md:text-xs text-white/50 truncate">{url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</div>}
      </div>
      <div className="relative aspect-[16/9]">{children}</div>
    </div>
  )
}

function LeadMagnetSplit({ formId }: { formId: string }) {
  const [front, back] = SPLIT_VIDEOS
  return (
    <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-5 md:px-12 lg:px-16 pt-[68px] md:pt-24 pb-5 md:pb-10">
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-14 items-center">

        {/* Left: the offer and the form */}
        <div className="scroll-fade">
          <p className="hidden md:block text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-[clamp(10px,2svh,20px)]">Your free prototype</p>
          <h2 className="text-[clamp(26px,min(3.3vw,6.2svh),50px)] font-semibold tracking-tight leading-[1.05] text-[var(--black)] mb-2 md:mb-[clamp(10px,2svh,20px)]">
            {SPLIT_HEADLINE}
          </h2>
          <p className="text-[var(--gray-medium)] text-[15px] md:text-[17px] leading-relaxed mb-3 md:mb-[clamp(16px,3svh,32px)] max-w-xl">
            {SPLIT_SUBLINE}
          </p>
          <PrototypeForm id={formId} layout="grid" />
        </div>

        {/* Right: site recordings. On phones only the front one shows, above the form. */}
        {front && (
          <div className="scroll-fade relative order-first lg:order-none lg:pb-[14%] lg:pl-[10%]">
            {back && (
              <BrowserFrame url={back.url} className="hidden lg:block absolute left-0 bottom-0 w-[58%] z-10 shadow-[0_20px_60px_rgba(0,0,0,0.30)]">
                <CaseVideo src={back.video} poster={back.still} label={`${back.name} website walkthrough`} />
              </BrowserFrame>
            )}
            <BrowserFrame url={front.url} className="w-[84%] mx-auto lg:w-auto shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <CaseVideo src={front.video} poster={front.still} label={`${front.name} website walkthrough`} />
            </BrowserFrame>
          </div>
        )}

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

// Four case studies, shown as screen recordings instead of screenshots.
// Names, roles and descriptions come from the shared /work data; the recording
// and its poster come from lib/landingMedia.
const fromWork = (name: string) => {
  const c = caseStudies.find(s => s.name === name && !s.hidden && s.url)
  const m = caseMedia[name]
  return c && m ? [{ name: c.name, role: c.role, url: c.url as string | undefined, description: c.summary, ...m }] : []
}
const caseVideos = [
  ...fromWork('Dr. Ron Paul'),
  { name: vanaiCase.name, role: vanaiCase.role, url: vanaiCase.url, description: vanaiCase.summary, video: vanaiCase.video, still: vanaiCase.still },
  ...fromWork('Michael D. Costello III'),
  ...fromWork('Spencer McGuire-Mitchem'),
]

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
  const heroRef = useRef<HTMLElement | null>(null)
  const [heroSeen, setHeroSeen] = useState(false)

  // Preloader timeout, then unlock scroll
  useEffect(() => {
    window.scrollTo(0, 0)
    const preloaderTimer = setTimeout(() => setShowPreloader(false), 2800)
    const scrollTimer = setTimeout(() => lenisRef.current?.start(), 2900)
    return () => {
      clearTimeout(preloaderTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  // Start the hero's title animation the first time it is on screen.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeroSeen(true); observer.disconnect() }
    }, { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
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

  // Scroll-based theme switching
  const scrollThemes = useRef([
    { bg: 'rgb(0, 0, 0)', text: 'rgb(255, 255, 255)' },         // 4. Case study videos — dark
    { bg: 'rgb(250, 248, 245)', text: 'rgb(0, 0, 0)' },         // 5. Hero — back to cream
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

      {/* ─── All scrollable content ─── */}
      <div ref={scrollContainerRef} className="relative z-10 theme-container" style={{ backgroundColor: 'rgb(250, 248, 245)', color: 'rgb(0, 0, 0)', transition: 'background-color 400ms ease-out' }}>


        {/* ─── 2. Lead magnet — the first thing on the page ─── */}
        <section className="relative overflow-hidden">
          <LeadMagnetTop formId="prototype-form" />
        </section>


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

        {/* ─── 4. Case studies — 4 videos ─── */}
        <section ref={el => { themedSectionRefs.current[0] = el }} className="py-24 md:py-32 px-8">
          <div className="max-w-screen-2xl mx-auto">
            <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">Highlighted Work</p>
            <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">What It Looks Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {caseVideos.map((item, i) => (
                <div key={item.name} className="scroll-fade" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                  {/* Browser frame */}
                  <div className="relative rounded-2xl bg-white/10 border border-white/10 overflow-hidden mb-6">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </div>
                      {item.url && (
                        <div className="flex-1 ml-3">
                          <div className="bg-white/10 rounded-md px-3 py-1 text-xs text-white/50 max-w-[200px] truncate">{item.url.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        </div>
                      )}
                    </div>
                    {/* Screen recording of the live site */}
                    <div className="relative aspect-[16/9] bg-black">
                      <CaseVideo src={item.video} poster={item.still} label={`${item.name} website walkthrough`} />
                    </div>
                  </div>
                  {/* Info */}
                  <div>
                    <h3 className="text-xl font-medium tracking-tight mb-1 text-white">{item.name}</h3>
                    <p className="text-sm text-[var(--primary-blue)] font-medium mb-2">{item.role}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
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

        {/* ─── 5. Hero — the homepage hero, now an in-flow section ─── */}
        {/* Its title animates when it scrolls into view, not on page load. */}
        <section ref={el => { themedSectionRefs.current[1] = el; heroRef.current = el }} className="relative h-[100svh] min-h-[560px] flex flex-col overflow-hidden bg-[var(--cream)]">
          {/* Grid pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          {/* Hero content */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-[5vh]">
            <div className="text-center flex flex-col items-center w-full max-w-screen-2xl">
              {/* Title — one line, revealed left to right */}
              {/* Wait until the section is on screen before animating */}
              {heroSeen && (
                <>
                  <div className="mb-6 flex flex-wrap items-baseline justify-center gap-x-[0.2em]" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 0.95, fontWeight: 300, letterSpacing: '-0.04em', wordSpacing: '-0.04em' }}>
                    <VerticalCutReveal
                      splitBy="words"
                      staggerDuration={0.08}
                      staggerFrom="first"
                      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
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
                      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.45 }}
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
                      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.7 }}
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
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    Consulting{' '}
                    <span className={`relative inline-block ${'text-[var(--black)]'}`}>
                      websites
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-blue)]"
                        style={{ transformOrigin: 'left center' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
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
                        transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
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


        {/* ─── 6. Lead magnet, second layout ─── */}
        {/* Same offer as section 4 in a two-column layout with recordings.
            The hero above it already brought the page back to cream. */}
        <section id="contact" className="relative overflow-hidden">
          <LeadMagnetSplit formId="prototype-form-bottom" />
        </section>

        <Footer basePath="/landing" />
      </div>

    </>
  )
}
