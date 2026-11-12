'use client'

// The landing funnel's lead magnet: the prototype form, its shared state, and
// the centered "hero" layout (headline, subtext, three site stills, 2×2 form).
// Used as the opening section of /landing and the contact section of /landing/work.
import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

export function FormProvider({ children }: { children: ReactNode }) {
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

export function PrototypeForm({ id, layout }: { id: string; layout: 'grid' | 'stack' }) {
  const { email, company, linkedin, trap, status, error, setEmail, setCompany, setLinkedin, setTrap, setStatus, setError } = useForm()
  const [processingIdx, setProcessingIdx] = useState(0)

  // Fields and button are the same height, so the grid reads as four equal cells.
  const fieldClass = 'w-full h-14 px-5 rounded-lg bg-white border border-black/10 text-[16px] md:text-[15px] tracking-tight text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 transition-all'
  const grid = layout === 'grid'

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

  // 'grid' is two by two: email and company on top, LinkedIn and the button
  // underneath. 'stack' is one per row. Both stack on phones.
  // The placeholders double as the labels (kept for screen readers) so the
  // whole form stays short enough to sit inside one screen.
  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={`w-full ${grid ? 'max-w-2xl mx-auto' : 'max-w-xl mx-auto lg:mx-0'}`}>
      <div className={grid ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3' : 'grid grid-cols-1 gap-2.5 md:gap-3'}>
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
          className="group relative overflow-hidden w-full h-14 px-8 text-[15px] bg-[var(--black)] text-white tracking-tight rounded-lg whitespace-nowrap transition-all duration-300 ease-out hover:scale-105 disabled:opacity-60 disabled:hover:scale-100">
          <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
          <span className="relative z-10 inline-flex items-center justify-center gap-3">
            {status === 'submitting' ? 'Sending...' : <>Get My Free Prototype <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span></>}
          </span>
        </button>
      </div>

      {/* Honeypot — hidden from people and assistive tech, catnip for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${id}-fax`}>Fax</label>
        <input id={`${id}-fax`} name="fax" type="text" tabIndex={-1} autoComplete="off"
          value={trap} onChange={e => setTrap(e.target.value)} />
      </div>

      {error && <p role="alert" className={`text-red-500 text-sm mt-3 ${grid ? 'text-center' : ''}`}>{error}</p>}
    </form>
  )
}

/* ─── Hero layout ─── */
// Headlines follow the homepage hero: light weight, tight tracking, and one
// phrase in the blue serif italic.
export const Accent = ({ children }: { children: ReactNode }) => (
  <span className="font-serif italic font-normal text-[var(--primary-blue)] whitespace-nowrap">{children}</span>
)
const TOP_HEADLINE = <>Get your free custom website <Accent>prototype</Accent> before you invest.</>
const TOP_SUBLINE = 'Tell us who you are and where to send it. We\u2019ll research your practice, write the copy and design a working first version of your site in just a few days. You only move forward if you love it.'
// Hero stills: left, centre, right. Each keeps its own proportions, so nothing
// is cropped. `ratio` is width / height of the file.
const FAN_SHOTS = [
  { name: 'Polaris Leadership Institute', src: '/landing/shots/hero-polaris.webp', ratio: 1600 / 729 },
  { name: 'Vanai Consulting', src: '/landing/shots/hero-vanai.webp', ratio: 1600 / 922 },
  { name: 'NextSpan Consulting', src: '/landing/shots/hero-nextspan.webp', ratio: 1600 / 924 },
]
function ScreenshotFan() {
  const [left, centre, right] = FAN_SHOTS
  const frame = 'absolute overflow-hidden rounded-md md:rounded-xl border border-black/10 bg-white'
  return (
    <div className="relative mx-auto aspect-[10/3]" style={{ width: 'min(100%, 104svh, 1080px)', perspective: '1400px' }}>
      <div className={`${frame} left-0 top-1/2 w-[42%] shadow-[0_10px_40px_rgba(0,0,0,0.12)]`}
        style={{ aspectRatio: left.ratio, transform: 'translateY(-50%) rotateY(30deg)', transformOrigin: 'right center' }}>
        <Image src={left.src} alt={`${left.name} website`} fill className="object-cover" sizes="(max-width: 1024px) 44vw, 360px" />
      </div>
      <div className={`${frame} right-0 top-1/2 w-[42%] shadow-[0_10px_40px_rgba(0,0,0,0.12)]`}
        style={{ aspectRatio: right.ratio, transform: 'translateY(-50%) rotateY(-30deg)', transformOrigin: 'left center' }}>
        <Image src={right.src} alt={`${right.name} website`} fill className="object-cover" sizes="(max-width: 1024px) 44vw, 360px" />
      </div>
      <div className={`${frame} left-1/2 top-1/2 w-[50%] z-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]`}
        style={{ aspectRatio: centre.ratio, transform: 'translate(-50%, -50%)' }}>
        <Image src={centre.src} alt={`${centre.name} website`} fill priority className="object-cover" sizes="(max-width: 1024px) 66vw, 520px" />
      </div>
    </div>
  )
}

/* The page's opening section, everything centered and one under the other:
   headline, subtext, the three site stills, then the two-by-two form. */
export function LeadMagnetHero({ formId, heading: Heading = 'h1' }: { formId: string; heading?: 'h1' | 'h2' }) {
  return (
    <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-5 md:px-12 lg:px-16 pt-[76px] md:pt-24 pb-6 md:pb-10">
      <div className="w-full max-w-screen-xl mx-auto text-center flex flex-col gap-5 md:gap-[clamp(16px,3.2svh,36px)]">
        <div>
          <Heading className="scroll-fade mx-auto max-w-5xl text-[clamp(29px,min(4.9vw,7.4svh),68px)] font-light tracking-[-0.035em] leading-[1.02] text-[var(--black)] mb-3 md:mb-4">
            {TOP_HEADLINE}
          </Heading>
          <p className="scroll-fade mx-auto max-w-4xl text-[var(--gray-medium)] text-[14px] md:text-[17px] leading-relaxed">
            {TOP_SUBLINE}
          </p>
        </div>

        <div className="scroll-fade">
          <ScreenshotFan />
        </div>

        <div className="scroll-fade">
          <PrototypeForm id={formId} layout="grid" />
        </div>
      </div>
    </div>
  )
}
