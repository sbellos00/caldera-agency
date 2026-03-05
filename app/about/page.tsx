'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToNearestForm = useCallback(() => {
    const target = document.getElementById('prototype-form') || document.getElementById('prototype-form-bottom')
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  // GSAP ticker cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    if (window.innerWidth <= 768) {
      cursor.style.display = 'none'
      dot.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0, dotX = 0, dotY = 0

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    document.addEventListener('mousemove', handleMouseMove)

    const update = () => {
      curX += (mouseX - curX) * 0.15
      curY += (mouseY - curY) * 0.15
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      cursor.style.left = curX - 20 + 'px'
      cursor.style.top = curY - 20 + 'px'
      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'
    }
    gsap.ticker.add(update)

    const magnetics = document.querySelectorAll('a, button')
    const magnetEnter = () => {
      cursor.style.width = '60px'; cursor.style.height = '60px'; cursor.style.marginLeft = '-10px'; cursor.style.marginTop = '-10px'
      cursor.style.borderColor = 'var(--primary-blue)'; cursor.style.opacity = '0.5'
    }
    const magnetLeave = () => {
      cursor.style.width = '40px'; cursor.style.height = '40px'; cursor.style.marginLeft = '0'; cursor.style.marginTop = '0'
      cursor.style.opacity = '1'
    }
    magnetics.forEach(el => { el.addEventListener('mouseenter', magnetEnter); el.addEventListener('mouseleave', magnetLeave) })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(update)
      magnetics.forEach(el => { el.removeEventListener('mouseenter', magnetEnter); el.removeEventListener('mouseleave', magnetLeave) })
    }
  }, [])

  // Scroll-fade observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef} />
      <div className="cursor-dot md:block hidden" ref={cursorDotRef} />

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-5 transition-all duration-500">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <Link href="/" className="text-3xl font-medium tracking-tight caldera-logo text-[var(--black)] transition-colors duration-500 no-underline">
            caldera.agency
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/contact"
              className="hidden md:block group relative overflow-hidden px-6 py-3 rounded-lg text-sm tracking-tight transition-all duration-500 hover:scale-105 bg-[var(--black)] text-white">
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center relative bg-[var(--cream)] overflow-hidden pt-20 md:pt-0">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full px-8 md:px-16 text-center flex flex-col items-center">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-6 scroll-fade">About Us</p>

          <h1 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-light tracking-tight leading-[0.95] mb-6 text-[var(--black)] scroll-fade">
            We close the gap between what consultants have built and how they <span className="font-serif italic font-normal text-[var(--primary-blue)]">show up online</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mb-10 scroll-fade">
            We only work with consultants. We build your site before you spend a dollar. And we handle everything so you can stay focused on your work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 scroll-fade">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10 group-hover:text-white">Start Your Project</span>
              <span className="relative z-10 group-hover:text-white">&rarr;</span>
            </Link>
            <button
              onClick={() => {
                document.getElementById('our-story')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
              className="inline-flex items-center gap-2 text-[var(--black)] text-[15px] no-underline relative group"
            >
              <span>Read Our Story</span>
              <span className="transition-transform duration-300 group-hover:translate-y-1">&darr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Origin Story ─── */}
      <section id="our-story" className="py-24 md:py-32 px-8 md:px-16 relative overflow-hidden bg-[var(--black)] noise-overlay">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-screen-lg mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-12 scroll-fade">Our Story</p>

          {/* Pull quote */}
          <blockquote className="text-center mb-16 scroll-fade">
            <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight font-serif italic text-white/90 max-w-3xl mx-auto">
              &ldquo;Brilliant people were getting commoditized because they had no platform to call their own.&rdquo;
            </p>
          </blockquote>

          <div className="space-y-5 text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            <p className="scroll-fade">
              Before starting Caldera, we spent thousands of hours connecting independent consultants with investors and global enterprises. We talked to hundreds of experts. Brilliant people who had shaped entire industries, built operating models from scratch, and turned around struggling businesses.
            </p>
            <p className="scroll-fade">
              Most of them had no website. Or one that looked like it was built in 2012 and never touched again.
            </p>
            <p className="scroll-fade">
              They were losing RFPs to competitors who were simply more polished online. They were getting warm referrals with nowhere to send them. They were relying entirely on LinkedIn and hoping the algorithm stayed kind.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The LinkedIn Problem ─── */}
      <section className="py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">The Problem</p>
          <h2 className="section-title text-center mb-16 md:mb-20 scroll-fade">
            LinkedIn gives you a profile, not a <span className="font-serif italic text-[var(--primary-blue)]">platform</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                h: 'A great place to get found. A terrible place to market yourself.',
                b: 'LinkedIn controls your layout, your format, and your reach. You get compared to every other consultant in your niche on the same page, with the same template.',
              },
              {
                h: 'Every serious business has a website.',
                b: 'Independent consulting is a serious business. The gap between what consultants have built and how they present it online is one of the biggest missed opportunities in professional services.',
              },
              {
                h: 'The problem was never awareness.',
                b: 'It\'s that doing it right takes time, expertise, and guidance that most consultants do not have and should not need to develop. That gap isn\'t closing on its own.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-[var(--cream)] rounded-2xl p-7 md:p-8 relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white" />
                <h3 className="text-xl font-medium tracking-tight mb-3 text-[var(--black)] relative z-10 group-hover:text-white">{card.h}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">{card.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What We Built ─── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-[var(--cream)]">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-screen-xl mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">The Solution</p>
          <h2 className="section-title text-center mb-6 scroll-fade">
            So we built <span className="font-serif italic text-[var(--primary-blue)]">Caldera</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mx-auto text-center mb-16 md:mb-20 scroll-fade">
            We find consultants who are underrepresented online, we build their site before we ever reach out, and we let the work make the case.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — what we do */}
            <div className="lg:col-span-7 scroll-fade">
              <h3 className="text-[clamp(28px,3.5vw,52px)] font-light tracking-tight leading-[0.95] mb-5 text-[var(--black)]">
                You send us whatever you have.<br /><span className="font-medium">We figure out the rest.</span>
              </h3>
              <div className="space-y-4 text-[15px] md:text-[16px] leading-relaxed text-[var(--gray-medium)]">
                <p>
                  We do the research, write the copy, design the site, and handle the launch. We only work with consultants because that focus is what makes the work sharp. And we keep the entry point accessible because we would rather build a long-term relationship with the best of the best than extract maximum revenue from the first few who find us.
                </p>
              </div>
            </div>

            {/* Right — prototype philosophy */}
            <div className="lg:col-span-5 scroll-fade lg:pt-2">
              <p className="text-[var(--gray-medium)] text-[11px] font-medium tracking-widest uppercase mb-5">Why We Build First</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '01', h: 'Not a sales tactic', b: 'We build your prototype as a filter. We only reach out when we have something worth showing.' },
                  { icon: '02', h: 'Standards stay high', b: 'It keeps our quality bar self-enforcing. If we can\'t build something great, we don\'t reach out.' },
                  { icon: '03', h: 'Real work, not promises', b: 'You decide based on an actual website, not a pitch deck or vague case studies.' },
                  { icon: '04', h: 'Accessible entry point', b: 'We\'d rather earn trust upfront than extract maximum revenue from the first interaction.' },
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
      </section>

      {/* ─── What Makes Us Different ─── */}
      <section className="relative">
        <div className="pt-24 md:pt-32 pb-16 px-8 md:px-16 max-w-screen-xl mx-auto">
          <p className="text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase text-center mb-4 scroll-fade">How We Work</p>
          <h2 className="section-title text-center mb-12 md:mb-16 scroll-fade">
            What Makes Our Process <span className="font-serif italic text-[var(--primary-blue)]">Different</span>
          </h2>

          {/* 3 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              { h: 'Consultants only. No distractions, no dilution.', b: 'We don\'t take on projects for agencies, local businesses, or e-commerce. Everything is built around establishing credibility, driving high-value inbound, and freeing you from project headaches.' },
              { h: 'No busywork, ever.', b: 'We research your background and consulting market before you see a single question. No generic forms or open-ended guesswork. You just review what we build.' },
              { h: 'Clear, structured feedback.', b: 'Each review round is focused, with our guidance on what to check and how to comment. No open-ended homework.' },
            ].map((card, i) => (
              <div key={i} className="bg-[var(--cream)] rounded-2xl p-7 md:p-8 relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white" />
                <h3 className="text-xl font-medium tracking-tight mb-3 text-[var(--black)] relative z-10 group-hover:text-white">{card.h}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">{card.b}</p>
              </div>
            ))}
          </div>

          {/* 3 more cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { h: 'Milestone payments, always in your control.', b: 'You approve each phase before paying. You never risk being left with a half-finished website.' },
              { h: 'We handle everything after.', b: 'Launch, domain, analytics, hosting, tech support, and post-launch tweaks are all managed by us so you can stay focused on your work.' },
              { h: 'Full ownership, zero lock-in.', b: 'You own your website, domain, and content 100%. Move, host, or upgrade anytime. No proprietary platforms. No hostage situations.' },
            ].map((card, i) => (
              <div key={i} className="bg-[var(--cream)] rounded-2xl p-7 md:p-8 relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white" />
                <h3 className="text-xl font-medium tracking-tight mb-3 text-[var(--black)] relative z-10 group-hover:text-white">{card.h}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">{card.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Goal ─── */}
      <section className="py-24 md:py-32 px-8 relative overflow-hidden bg-[var(--black)] noise-overlay">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                value: 'Seamless process',
                description: 'Every step is designed so that consultants get a site that wins higher-value clients with zero wasted time.',
              },
              {
                value: 'Network over margins',
                description: 'We focus on building a strong network of the best independent consultants instead of squeezing maximum revenue.',
              },
              {
                value: 'Value upfront',
                description: 'When a consultant is ready to invest in how they show up online, we want to be the only conversation that matters.',
              },
            ].map((stat, i) => (
              <div key={stat.value} className="text-center scroll-fade" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4 font-serif italic">
                  {stat.value}
                </p>
                <p className="text-white/60 text-[15px] leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="relative overflow-hidden bg-white">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 py-24 md:py-32 px-8 md:px-16 max-w-screen-xl mx-auto text-center">
          <h2 className="section-title mb-6 scroll-fade">
            Ready to see what we can build <span className="font-serif italic text-[var(--primary-blue)]">for you?</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[var(--gray-medium)] max-w-2xl mx-auto mb-10 scroll-fade">
            Drop your LinkedIn URL and we&apos;ll send you a free prototype. No calls. No commitment. No homework.
          </p>
          <div className="scroll-fade">
            <Link
              href="/#contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-lg transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10 group-hover:text-white">Get Your Free Prototype</span>
              <span className="relative z-10 group-hover:text-white">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
