'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import VerticalCutReveal, { type VerticalCutRevealRef } from '@/components/fancy/text/VerticalCutReveal'
import ScrambleIn, { type ScrambleInHandle } from '@/components/fancy/text/ScrambleIn'
import ImageTrail, { ImageTrailItem } from '@/components/ImageTrail'

const PixelTrail = dynamic(() => import('@/components/fancy/background/PixelTrail'), { ssr: false })

/* ─── Data ─── */
const screenshots = [
  '/WorkScreenshots/Screenshot 2026-03-02 081608.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081712.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081742.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081805.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081828.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081854.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081910.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081946.png',
  '/WorkScreenshots/Screenshot 2026-03-02 082115.png',
  '/WorkScreenshots/Screenshot 2026-03-02 082135.png',
]

const steps = [
  { n: '01', title: 'Drop your LinkedIn', body: 'That\u2019s all we need. We research your expertise, positioning, and market.' },
  { n: '02', title: 'Review your prototype', body: 'We send you a working prototype. No commitment. Like it? We move forward.' },
  { n: '03', title: 'Launch your site', body: 'We refine, write all copy, and launch. Minimal time from you.' },
]

const navItems = [
  { id: 'hero-a', label: 'Pixel Trail' },
  { id: 'hero-b', label: 'Image Trail' },
  { id: 'hero-c', label: 'Parallax Split' },
  { id: 'cta-a', label: 'Magnetic Steps' },
  { id: 'cta-b', label: 'Scroll Reveal' },
  { id: 'portfolio-a', label: 'Parallax Work' },
]

/* ─── Utility: Magnetic button ─── */
function MagneticWrap({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * strength)
        y.set((e.clientY - cy) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Utility: Staggered entrance on scroll ─── */
function StaggerReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Utility: Parallax wrapper ─── */
function Parallax({ children, speed = 0.5, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: springY }}>{children}</motion.div>
    </div>
  )
}

/* ─── Utility: Character-level hover scramble ─── */
function HoverScrambleText({ text, className }: { text: string; className?: string }) {
  const [hovered, setHovered] = useState(false)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scramble = () => {
    let iteration = 0
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < iteration) return text[i]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      iteration += 1 / 2
      if (iteration >= text.length && intervalRef.current) clearInterval(intervalRef.current)
    }, 25)
  }

  return (
    <span
      className={className}
      onMouseEnter={() => { setHovered(true); scramble() }}
      onMouseLeave={() => { setHovered(false); setDisplay(text) }}
      style={{ cursor: 'default' }}
    >
      {display}
    </span>
  )
}

/* ─── Main ─── */
export default function HomeV4() {
  const [active, setActive] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { const v = entries.find(e => e.isIntersecting); if (v) setActive(v.target.id) },
      { threshold: 0.35 }
    )
    navItems.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="bg-white text-[var(--black)]">
      {/* ─── Fixed nav ─── */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-2 items-end">
        {navItems.map((s) => (
          <MagneticWrap key={s.id} strength={0.4}>
            <button
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <motion.span
                className="text-[10px] font-medium tracking-tight origin-right"
                animate={{ opacity: active === s.id ? 1 : 0, scale: active === s.id ? 1 : 0.8, x: active === s.id ? 0 : 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {s.label}
              </motion.span>
              <motion.div
                className="rounded-full bg-[var(--primary-blue)]"
                animate={{ width: active === s.id ? 12 : 6, height: active === s.id ? 12 : 6, opacity: active === s.id ? 1 : 0.25 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </button>
          </MagneticWrap>
        ))}
      </nav>

      {/* ═══════════════════════════════════════
          HERO A — Pixel Trail + Vertical Cut Reveal
          ═══════════════════════════════════════ */}
      <section id="hero-a" className="h-screen relative overflow-hidden bg-[var(--black)] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <PixelTrail pixelSize={32} fadeDuration={800} pixelClassName="bg-[var(--primary-blue)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-screen-2xl w-full">
          <VerticalCutReveal
            splitBy="characters"
            staggerDuration={0.018}
            staggerFrom="first"
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            containerClassName="justify-center"
            elementLevelClassName="font-[family-name:var(--font-bebas)] text-[clamp(3.5rem,12vw,12rem)] leading-[0.85] tracking-tight text-white"
          >
            The Website Agency
          </VerticalCutReveal>
          <VerticalCutReveal
            splitBy="characters"
            staggerDuration={0.018}
            staggerFrom="last"
            reverse
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.5 }}
            containerClassName="justify-center"
            elementLevelClassName="font-[family-name:var(--font-bebas)] text-[clamp(3.5rem,12vw,12rem)] leading-[0.85] tracking-tight text-[var(--primary-blue)]"
          >
            Built for Solo Consultants
          </VerticalCutReveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <ScrambleIn
              text="You do nothing. We build everything."
              scrambleSpeed={25}
              scrambledLetterCount={5}
              className="text-white/40 text-lg md:text-2xl tracking-tight font-light"
              scrambledClassName="text-[var(--primary-blue)]/30 text-lg md:text-2xl tracking-tight font-light"
            />
          </motion.div>

          {/* Magnetic CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14"
          >
            <MagneticWrap strength={0.15}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 rounded-full bg-white text-black text-base font-medium overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-[var(--primary-blue)]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Get Your Free Prototype
                  <motion.span whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>&rarr;</motion.span>
                </span>
              </motion.button>
            </MagneticWrap>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
            <motion.div className="w-1 h-1.5 rounded-full bg-white/60" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          HERO B — Image Trail + Times New Roman editorial
          ═══════════════════════════════════════ */}
      <section id="hero-b" className="h-screen relative overflow-hidden bg-white">
        <ImageTrail
          threshold={60}
          intensity={0.15}
          keyframes={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1.05, 0.9], rotate: [0, 0, 0, -3] }}
          keyframesOptions={{
            opacity: { duration: 3, times: [0, 0.02, 0.75, 1] },
            scale: { duration: 3, times: [0, 0.15, 0.75, 1] },
            rotate: { duration: 3, times: [0, 0.02, 0.75, 1] },
          }}
          repeatChildren={2}
          className="h-full w-full"
        >
          {screenshots.map((src, i) => (
            <ImageTrailItem key={i}>
              <div className="w-52 sm:w-72 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <Image src={src} alt="Work" width={640} height={400} className="w-full h-auto" sizes="288px" />
              </div>
            </ImageTrailItem>
          ))}
        </ImageTrail>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[50]">
          <div className="text-center px-6 max-w-screen-xl">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="caldera-logo text-[clamp(3.5rem,10vw,10rem)] leading-[0.82] tracking-[-0.04em] text-[var(--black)]"
            >
              The Website Agency<br />
              <span className="text-[var(--primary-blue)]">Built for Solo Consultants</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[var(--gray-medium)] text-lg md:text-xl mt-8 font-light"
            >
              <HoverScrambleText text="YOU DO NOTHING. WE BUILD EVERYTHING." className="tracking-[0.15em] text-sm md:text-base" />
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HERO C — Parallax split with floating screenshots
          ═══════════════════════════════════════ */}
      <section id="hero-c" className="h-screen relative overflow-hidden bg-[var(--gray-light)]">
        {/* Floating parallax screenshots */}
        {screenshots.slice(0, 5).map((src, i) => {
          const positions = [
            { top: '8%', right: '5%', rotate: 3, speed: -0.3, size: 'w-48 md:w-64' },
            { top: '25%', right: '15%', rotate: -5, speed: 0.2, size: 'w-36 md:w-52' },
            { top: '55%', right: '3%', rotate: 2, speed: -0.15, size: 'w-40 md:w-56' },
            { top: '10%', right: '35%', rotate: -3, speed: 0.35, size: 'w-32 md:w-44' },
            { top: '65%', right: '25%', rotate: 4, speed: -0.25, size: 'w-36 md:w-48' },
          ][i]
          return (
            <Parallax key={i} speed={positions.speed} className={`absolute ${positions.size} hidden md:block`} >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: positions.rotate * 2 }}
                whileInView={{ opacity: 0.7, scale: 1, rotate: positions.rotate }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ top: positions.top, right: positions.right, position: 'absolute' }}
                className="shadow-2xl"
              >
                <Image src={src} alt="" width={400} height={300} className="w-full h-auto rounded-lg" sizes="256px" />
              </motion.div>
            </Parallax>
          )
        })}

        {/* Text — left aligned */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-3xl">
          <StaggerReveal>
            <span className="text-[var(--primary-blue)] text-xs font-medium tracking-[0.3em] uppercase block mb-6">Caldera Agency</span>
          </StaggerReveal>
          <StaggerReveal delay={0.15}>
            <h1 className="text-[clamp(2.5rem,6vw,6rem)] leading-[0.88] font-extralight tracking-[-0.04em] text-[var(--black)]">
              The Website Agency Built for{' '}
              <motion.span
                className="font-serif italic text-[var(--primary-blue)] inline-block"
                whileHover={{ rotate: -2, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Solo Consultants
              </motion.span>
            </h1>
          </StaggerReveal>
          <StaggerReveal delay={0.3}>
            <div className="flex items-center gap-5 mt-10">
              <motion.div className="h-px bg-[var(--primary-blue)]" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }} />
              <HoverScrambleText text="YOU DO NOTHING. WE BUILD EVERYTHING." className="text-[var(--gray-medium)] text-sm tracking-[0.1em]" />
            </div>
          </StaggerReveal>
          <StaggerReveal delay={0.5}>
            <div className="mt-12">
              <MagneticWrap strength={0.12}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full bg-[var(--black)] text-white text-sm font-medium group overflow-hidden relative"
                >
                  <motion.div className="absolute inset-0 bg-[var(--primary-blue)]" initial={{ y: '100%' }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }} />
                  <span className="relative z-10">Get Your Free Prototype &rarr;</span>
                </motion.button>
              </MagneticWrap>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA A — Magnetic step cards + orchestrated entrance
          ═══════════════════════════════════════ */}
      <section id="cta-a" className="min-h-screen bg-white py-28 md:py-36 px-8 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <StaggerReveal>
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,8vw,8rem)] leading-[0.85] tracking-tight text-center">
              Three Steps. <span className="text-[var(--primary-blue)]">That&apos;s It.</span>
            </h2>
          </StaggerReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {steps.map((step, i) => (
              <StaggerReveal key={step.n} delay={0.15 * i} className="h-full">
                <MagneticWrap strength={0.06}>
                  <motion.div
                    whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                    className="relative h-full border border-[var(--gray-light)] rounded-2xl p-8 md:p-10 group overflow-hidden"
                  >
                    {/* Hover bg sweep */}
                    <motion.div
                      className="absolute inset-0 bg-[var(--primary-blue)]"
                      initial={{ y: '100%' }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <div className="relative z-10">
                      <span className="font-[family-name:var(--font-bebas)] text-7xl text-[var(--primary-blue)]/15 group-hover:text-white/20 transition-colors duration-500 block leading-none">{step.n}</span>
                      <h3 className="text-xl font-medium tracking-tight mt-4 mb-3 group-hover:text-white transition-colors duration-500">{step.title}</h3>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-500">{step.body}</p>
                    </div>

                    {/* Corner arrow that animates in on hover */}
                    <motion.div
                      className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-[var(--gray-light)] group-hover:border-white/30 flex items-center justify-center transition-colors duration-500"
                      whileHover={{ scale: 1.2, rotate: -45 }}
                    >
                      <span className="text-[var(--gray-medium)] group-hover:text-white transition-colors duration-500 text-sm">&rarr;</span>
                    </motion.div>
                  </motion.div>
                </MagneticWrap>
              </StaggerReveal>
            ))}
          </div>

          <StaggerReveal delay={0.6} className="mt-16 text-center">
            <MagneticWrap strength={0.15}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-12 py-5 rounded-full bg-[var(--black)] text-white text-base font-medium overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-[var(--primary-blue)]"
                  initial={{ scale: 0, borderRadius: '100%' }}
                  whileHover={{ scale: 2, borderRadius: '0%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'center' }}
                />
                <span className="relative z-10">Get Your Free Prototype &rarr;</span>
              </motion.button>
            </MagneticWrap>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA B — Scroll-driven counter reveal + stagger
          ═══════════════════════════════════════ */}
      <section id="cta-b" className="min-h-screen bg-[var(--black)] text-white py-28 md:py-36 px-8 relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <StaggerReveal>
            <span className="text-[var(--primary-blue)] text-xs font-medium tracking-[0.3em] uppercase">How It Works</span>
          </StaggerReveal>
          <StaggerReveal delay={0.1}>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-extralight tracking-[-0.03em] leading-[0.92] mt-4 mb-20 max-w-2xl">
              From LinkedIn URL to launched website.
            </h2>
          </StaggerReveal>

          {steps.map((step, i) => (
            <StaggerReveal key={step.n} delay={0.15 + i * 0.15}>
              <motion.div
                className={`group grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6 md:gap-12 py-10 ${i < steps.length - 1 ? 'border-b border-white/10' : ''}`}
                whileHover={{ x: 12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <motion.span
                  className="font-[family-name:var(--font-bebas)] text-6xl text-white/10 group-hover:text-[var(--primary-blue)] transition-colors duration-500"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.n}
                </motion.span>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-[var(--primary-blue)] transition-colors duration-500 self-center">{step.title}</h3>
                <p className="text-white/40 text-base leading-relaxed self-center group-hover:text-white/60 transition-colors duration-500">{step.body}</p>
              </motion.div>
            </StaggerReveal>
          ))}

          <StaggerReveal delay={0.8} className="mt-16 flex flex-col sm:flex-row gap-5 items-center justify-center">
            <MagneticWrap strength={0.15}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-5 rounded-full bg-white text-black text-base font-medium group relative overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-[var(--primary-blue)]" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.4 }} />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Your Free Prototype &rarr;</span>
              </motion.button>
            </MagneticWrap>
            <span className="text-white/20 text-sm">No calls. No commitment. No homework.</span>
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PORTFOLIO A — Scroll-driven parallax showcase
          ═══════════════════════════════════════ */}
      <section id="portfolio-a" className="bg-white py-28 md:py-36">
        <div className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-20">
          <StaggerReveal>
            <span className="text-[var(--primary-blue)] text-xs font-medium tracking-[0.3em] uppercase">Our Work</span>
          </StaggerReveal>
          <StaggerReveal delay={0.1}>
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,6vw,6rem)] tracking-tight mt-4">
              Highlighted <span className="text-[var(--primary-blue)]">Work</span>
            </h2>
          </StaggerReveal>
        </div>

        {/* Full-width parallax cards */}
        {[
          { name: 'Polaris Leadership Institute', sub: 'Dr. Ron Paul \u2014 Leadership Coach', img: screenshots[0] },
          { name: 'Mark S. Piazza', sub: 'Fractional CFO & Financial Advisor', img: screenshots[1] },
        ].map((item, i) => {
          return (
            <ParallaxProjectCard key={i} item={item} index={i} />
          )
        })}
      </section>

      {/* End */}
      <div className="h-32 bg-white" />
    </div>
  )
}

/* ─── Parallax project card (needs its own scroll ref) ─── */
function ParallaxProjectCard({ item, index }: { item: { name: string; sub: string; img: string }; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative h-[70vh] overflow-hidden cursor-pointer group mb-4"
    >
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <Image src={item.img} alt={item.name} fill className="object-cover object-top" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between">
          <div>
            <motion.p
              className="text-white/50 text-sm mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {item.sub}
            </motion.p>
            <motion.h3
              className="text-3xl md:text-6xl font-light tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.name}
            </motion.h3>
          </div>
          <MagneticWrap strength={0.3}>
            <motion.div
              className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500"
              whileHover={{ scale: 1.2 }}
            >
              <span className="text-white group-hover:text-black transition-colors duration-500 text-lg">&rarr;</span>
            </motion.div>
          </MagneticWrap>
        </div>
      </div>
    </motion.div>
  )
}
