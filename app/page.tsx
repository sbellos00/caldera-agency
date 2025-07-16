'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

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
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .deliverable-hero, .deliverable-card, .premium-deliverable, .invitation-card, .invitation-list-item, .invitation-bonus-item, .guarantee-card')
    
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

    // Intersection Observer
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

    // EDITED: Add Gradient Border effect for Guarantee Cards
    const guaranteeCards = document.querySelectorAll('.guarantee-card');
    const guaranteeCardHandlers: Array<{ card: Element, handler: EventListener }> = [];
    
    guaranteeCards.forEach(card => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--x', `${x}px`);
        (card as HTMLElement).style.setProperty('--y', `${y}px`);
      };
      card.addEventListener('mousemove', handleMouseMove);
      guaranteeCardHandlers.push({ card, handler: handleMouseMove });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      guaranteeCardHandlers.forEach(({ card, handler }) => {
        card.removeEventListener('mousemove', handler)
      })
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef}></div>
      <div className="cursor-dot md:block hidden" ref={cursorDotRef}></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-6 mix-blend-difference">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="text-2xl font-medium tracking-tight text-white">Studio</div>
          <a href="#contact" className="text-white no-underline text-base tracking-tight">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 bg-[var(--cream)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>
        
        <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center flex flex-col items-center">
          <p className="text-sm tracking-widest uppercase text-[var(--gray-medium)] mb-6 animate-fade-in-up">
            50% Off Launch Special
          </p>
          
          <h1 className="hero-title mb-8 max-w-4xl animate-fade-in-up animate-delay-100">
            Bespoke, <span className="font-serif italic font-normal text-[var(--primary-blue)] whitespace-nowrap">Authority-Building</span><br/>
            Websites for Solo Consultants
          </h1>
          
          <p className="text-lg leading-relaxed text-[var(--gray-dark)] max-w-2xl mb-10 animate-fade-in-up animate-delay-200">
            We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise, communicate credibility, and convert higher-value clients—with zero admin headache.
          </p>
          
          <div className="animate-fade-in-up animate-delay-300">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 bg-[var(--black)] text-white px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
            >
              <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
              <span className="relative z-10">Book Your Website</span>
              <span className="relative z-10">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="bg-[var(--black)] text-white py-6 relative overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">20</span>
              <span className="text-[var(--gray-medium)]">days or less</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">2</span>
              <span className="text-[var(--gray-medium)]">hours of your involvement</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">1</span>
              <span className="text-[var(--gray-medium)]">year of free hosting</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">100%</span>
              <span className="text-[var(--gray-medium)]">tailored to you</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">0%</span>
              <span className="text-[var(--gray-medium)]">platform lock in</span>
            </div>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">20</span>
              <span className="text-[var(--gray-medium)]">days or less</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">2</span>
              <span className="text-[var(--gray-medium)]">hours of your involvement</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">1</span>
              <span className="text-[var(--gray-medium)]">year of free hosting</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">100%</span>
              <span className="text-[var(--gray-medium)]">tailored to you</span>
            </div>
            <div className="flex items-baseline gap-2.5 text-base">
              <span className="text-7xl font-medium text-white">0%</span>
              <span className="text-[var(--gray-medium)]">platform lock in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white relative">
        <div className="pt-[7.5rem] pb-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <h2 className="section-title mb-8 max-w-4xl scroll-fade">
            We handle everything,<br/>
            you focus on your business.
          </h2>
          
          <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-2xl mb-20 font-light scroll-fade">
            Most consultants will never prioritize "project managing" their own website. Our process is built so they never have to:
          </p>

          {/* Features Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-[7.5rem]">
            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl md:col-span-3 md:row-span-2 scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-3 relative z-10 group-hover:text-white">Fully Managed</h3>
              <div className="md:block hidden">
                <p className="text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
                  We take care of all the technical and admin work so that you never have to worry about things that don't move your business forward.
                </p>
                <ul className="mt-6 grid gap-3 relative z-10">
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Domain Management</li>
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Analytics Integration</li>
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Web Hosting and Performance</li>
                  <li className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Post Launch Tweaks</li>
                </ul>
              </div>
              <p className="md:hidden block text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
                We take care of domain and analytics integration, hosting, tech support, and post-launch tweaks.
              </p>
            </div>

            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl md:col-span-3 scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-3 relative z-10 group-hover:text-white">Guaranteed Speed</h3>
              <p className="text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
                Launched in 20 days or less, guaranteed. If we're late, you get a 20% refund for every day missed.
              </p>
            </div>

            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl md:col-span-3 scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-xl mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-3 relative z-10 group-hover:text-white">Minimal Time Investment</h3>
              <p className="text-base leading-relaxed text-[var(--gray-medium)] relative z-10 group-hover:text-white">
              Most clients spend less than 2 hours total from start to launch. See the full process.
              </p>
            </div>

            <div className="feature-card bg-[var(--gray-light)] p-8 rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl md:col-span-6 scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <h3 className="text-2xl font-normal tracking-tight mb-3 relative z-10 group-hover:text-white">No Homework, No Endless Meetings, No Agency Runaround</h3>
              <div className="mt-6 grid gap-3 relative z-10">
                <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">You never fill out a long, generic form or get asked for things we can research.</p>
                <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">You see concrete options, not abstract requests.</p>
                <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Every question/request is targeted and explained ("We need this for your credibility").</p>
                <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">You spend less than 2 hours total on throughout the whole project cycle.</p>
              </div>
            </div>
          </div>

          {/* Process Link */}
          <div className="text-center scroll-fade">
            <Link 
              href="/process"
              className="inline-flex items-center gap-2 text-[var(--black)] text-lg no-underline relative pb-1 group"
            >
              <span>See the full step by step process?</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sophisticated Separator */}
      <section className="bg-white py-5 relative overflow-hidden">
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-center">
            {/* Left line with gradient */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gray-light)] to-[var(--primary-blue)]/30"></div>
            
            {/* Center geometric element */}
            <div className="relative mx-8">
              {/* Outer subtle ring */}
              <div className="w-12 h-12 border border-[var(--gray-light)] rounded-full"></div>
              
              {/* Inner diamond shape */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rotate-45 rounded-sm"></div>
              
              {/* Corner accent dots */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary-blue)]/40 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary-blue)]/40 rounded-full"></div>
            </div>
            
            {/* Right line with gradient */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--gray-light)] to-[var(--primary-blue)]/30"></div>
          </div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </section>

      {/* What's Included Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="offer-floating-shape offer-shape-1"></div>
          <div className="offer-floating-shape offer-shape-2"></div>
          <div className="offer-floating-shape offer-shape-3"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-[var(--primary-blue)]/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 border border-[var(--blue-light)]/30 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/5 w-20 h-20 bg-[var(--blue-light)]/15 rounded-lg rotate-12"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary-blue) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 pt-16 pb-0 px-8 md:px-16 max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6 scroll-fade">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Offer</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>
            <h2 className="section-title mb-6 scroll-fade">
              All-In-One Website Package
            </h2>
            <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mx-auto font-light scroll-fade">
              Everything you need to establish authority and attract premium clients, delivered as one complete package.
            </p>
          </div>

          {/* Included Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Custom Website */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">A fully custom, authority-building website</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                Built from scratch to match your positioning, highlight your expertise and help you win high-value clients
              </p>
            </div>

            {/* Custom Copywriting */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-6 border-2 border-white rounded-sm"></div>
                <div className="w-6 h-1 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Custom copywriting for your website</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                We write every word for you utilizing consultant-specific copywriting principles to ensure your expertise and positioning come across clearly to potential clients
              </p>
            </div>

            {/* Analytics Integration */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-6 border-2 border-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-2 left-2"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute bottom-2 right-2"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Analytics integration</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                We set up Google Analytics and Search Console for you, so you always know who's visiting and how your site is performing from day one.
              </p>
            </div>

            {/* Domain Integration */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-8 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Domain integration</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                We handle all technical steps to connect your domain (whether you already own it or need a new one), so your site is live at your address, stress-free.
              </p>
            </div>

            {/* Mobile & Accessibility */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-6 h-10 border-2 border-white rounded-lg"></div>
                <div className="w-4 h-6 border-2 border-white rounded-sm absolute"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Mobile friendly, accessibility</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                Your website works flawlessly on every device and meets modern accessibility standards, so you never miss a client due to technical or usability issues.
              </p>
            </div>

            {/* Modern Design */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="w-4 h-4 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Modern design and styling that fits your positioning and aesthetic</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                Every visual element is chosen to reflect your field and brand (not recycled themes or ancient WordPress templates) so you stand out for the right reasons.
              </p>
            </div>

            {/* NextJS Performance */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="w-4 h-1 bg-white rounded-full absolute"></div>
                <div className="w-1 h-4 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Elite website performance with NextJS</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                Fast load times, rock-solid security, and future-proof infrastructure ensure your website works perfectly, every time.
              </p>
            </div>

            {/* Free Hosting */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-6 bg-white rounded-xl"></div>
                <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full absolute"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Free hosting and domain management for first year</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                Your site is fully managed for the first 12 months. No surprise fees, no technical maintenance, and zero admin for you.
              </p>
            </div>

            {/* Development Support */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-lg"></div>
                <div className="w-3 h-3 bg-white rounded-full absolute top-2 left-2"></div>
                <div className="w-3 h-3 bg-white rounded-full absolute bottom-2 right-2"></div>
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Up to 2 development support hours per month (4 for the first month)</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed">
                Quick edits, updates, or small changes handled fast and included in your plan—so your website always stays current without extra cost or waiting weeks.
              </p>
            </div>
          </div>

          {/* Extra Services Note */}
          <div className="text-center mb-20 scroll-fade">
            <p className="text-sm text-[var(--gray-medium)] leading-relaxed max-w-xl mx-auto">
              <span className="font-medium text-[var(--black)]">Need something extra?</span> Just ask. We'll always be clear about what's included, and quote any add-ons transparently.
            </p>
          </div>
                    </div>
      </section>
                    
      {/* EDITED: Launch Offer Invitation Section */}
<section className="bg-white pt-0 pb-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 scroll-fade">
          <div className="invitation-card-container">
            <div className="invitation-card-bg"></div>
            <div className="invitation-card">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-block bg-white border border-[var(--blue-light)] rounded-full px-4 py-2 mb-8">
                  <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Exclusive Launch Offer</span>
                        </div>
                <h3 className="text-3xl lg:text-4xl font-light text-[var(--black)] mb-4 tracking-tight">
                          Founding Client <span className="italic font-serif text-[var(--primary-blue)]">Invitation</span>
                        </h3>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-6xl lg:text-7xl font-light text-[var(--primary-blue)]">50% Off</span>
                        </div>
                <p className="text-[var(--gray-dark)] text-lg leading-relaxed max-w-3xl mx-auto font-light">
                  Full website development at <span className="font-medium">half price</span> for the first 5 consultants, in exchange for feedback and a testimonial.
                        </p>
                      </div>

              {/* Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Requirements */}
                <div className="space-y-6">
                  <h4 className="text-lg text-[var(--black)] text-center lg:text-left tracking-tight font-light">What we ask in return:</h4>
                  <div className="invitation-list-item">
                    <div className="invitation-list-icon">✓</div>
                    <div>
                      <h5 className="font-medium text-[var(--black)] mb-1 tracking-tight">Make this your primary website</h5>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Use this as your official link in your communications, proposals, and social media profiles.</p>
                    </div>
                  </div>
                  <div className="invitation-list-item">
                    <div className="invitation-list-icon">✓</div>
                      <div>
                      <h5 className="font-medium text-[var(--black)] mb-1 tracking-tight">Provide honest feedback</h5>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Help us refine our process and results for future clients.</p>
                          </div>
                        </div>
                  <div className="invitation-list-item">
                    <div className="invitation-list-icon">✓</div>
                    <div>
                      <h5 className="font-medium text-[var(--black)] mb-1 tracking-tight">Leave a testimonial</h5>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed">If, and only if, you believe the final result has earned it.</p>
                          </div>
                        </div>
                      </div>

                {/* Right Column: Bonuses */}
                <div className="space-y-6">
                  <h4 className="text-lg text-[var(--black)] text-center lg:text-left tracking-tight font-light">Exclusive Launch Bonuses:</h4>
                  <div className="invitation-bonus-item">
                    <div className="invitation-bonus-icon">+</div>
                      <div>
                      <h5 className="font-medium text-[var(--black)] mb-1 tracking-tight">LinkedIn Launch Toolkit</h5>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Custom LinkedIn banner and ready-to-use social post templates.</p>
                            </div>
                          </div>
                  <div className="invitation-bonus-item">
                    <div className="invitation-bonus-icon">+</div>
                    <div>
                      <h5 className="font-medium text-[var(--black)] mb-1 tracking-tight">Done-For-You Testimonial Kit</h5>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Plug-and-play testimonial outreach scripts and forms.</p>
                        </div>
                          </div>
                  <div className="invitation-bonus-item">
                    <div className="invitation-bonus-icon">+</div>
                    <div>
                      <h5 className="font-medium text-[var(--black)] mb-1 tracking-tight">Authority Bio & About Copy Polish</h5>
                      <p className="text-[var(--gray-medium)] text-sm leading-relaxed">LinkedIn bio review and optimization for credibility.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer */}
              <div className="text-center mt-12 pt-8 border-t border-[var(--gray-light)]">
                <p className="text-[var(--black)] text-base font-medium mb-2 tracking-tight">
                  This is the only time our service will be offered at this rate.
                        </p>
                <p className="text-[var(--gray-medium)] text-sm leading-relaxed font-light">
                          Once these spots are filled, all new projects return to full price.
                        </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITED: Our Guarantees Section */}
      <section className="bg-[var(--cream)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>
        <div className="relative z-10 pt-20 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-6 mb-8 scroll-fade">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Commitment</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>
            <h2 className="section-title mb-8 scroll-fade">
              Uncompromising Standards,<br/>
              <span className="italic font-serif text-[var(--primary-blue)]">Guaranteed</span>
            </h2>
            <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-4xl mx-auto font-light scroll-fade">
              We believe you should only pay for work you're genuinely proud to launch, delivered exactly when promised. No exceptions, no fine print, no games.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quality Commitment Guarantee */}
            <div className="guarantee-card scroll-fade">
              <div className="guarantee-card-border"></div>
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                  <div className="guarantee-icon-wrapper">
                    <svg className="w-10 h-10 text-[var(--primary-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light mb-3 tracking-tight text-[var(--black)]">Quality Commitment</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed font-light">
                      You are in control at every stage. We proceed only when you give the green light.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-16">
                  <div className="flex items-start gap-4 text-[var(--gray-dark)]">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary-blue)]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary-blue)]"></div>
                    </div>
                    <span className="font-light">Pay only for delivered work you've seen and approved.</span>
                  </div>
                  <div className="flex items-start gap-4 text-[var(--gray-dark)]">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary-blue)]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary-blue)]"></div>
                    </div>
                    <span className="font-light">Review and sign off before we move to the next phase.</span>
                  </div>
                  <div className="flex items-start gap-4 text-[var(--gray-dark)]">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary-blue)]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary-blue)]"></div>
                    </div>
                    <span className="font-light">Final payment is only due when you're 100% confident to launch.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 20-Day Launch Guarantee */}
            <div className="guarantee-card scroll-fade">
              <div className="guarantee-card-border"></div>
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                  <div className="guarantee-icon-wrapper">
                    <svg className="w-10 h-10 text-[var(--primary-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light mb-3 tracking-tight text-[var(--black)]">Launch Guarantee</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed font-light">
                      Speed and certainty, not agency delays. Your site goes live in 20 business days or less.
                    </p>
                  </div>
                </div>
                <div className="pl-0 md:pl-16">
                  <div className="bg-gradient-to-r from-[var(--blue-light)]/20 to-transparent rounded-2xl p-8 border border-[var(--blue-light)]/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary-blue)]/10 flex items-center justify-center">
                        <span className="text-[var(--primary-blue)] font-medium text-sm">20%</span>
                      </div>
                      <p className="text-[var(--gray-dark)] font-medium">
                        Refund for every business day we're late
                      </p>
                    </div>
                    <p className="text-[var(--gray-medium)] text-sm leading-relaxed font-light">
                      *Assumes prompt client feedback. Full details are in your onboarding pack.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="relative z-10 pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-3xl p-12 text-white text-center scroll-fade">
            <h3 className="text-3xl md:text-4xl font-light mb-6">
              One complete package, zero stress
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
              Everything you need to establish online authority and win premium clients, delivered as one seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-lg font-medium tracking-tight no-underline rounded-full hover:bg-[var(--cream)] transition-all duration-300 hover:scale-105"
              >
                <span>Book Your Website</span>
                <span>→</span>
              </a>
              <a 
                href="/process" 
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 text-lg font-medium tracking-tight no-underline rounded-full hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-300"
              >
                <span>See Our Process</span>
              </a>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}