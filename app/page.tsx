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
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .deliverable-hero, .deliverable-card, .premium-deliverable')
    
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
        
        <div className="relative z-10 pt-16 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
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
          {/* Launch Offer Section */}
          <div className="relative mb-24 scroll-fade">
            {/* Sophisticated background with layered effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--black)] via-[var(--black)] to-[var(--primary-blue)]/15 rounded-[2.5rem] overflow-hidden">
              <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-br from-[var(--primary-blue)]/15 to-transparent rounded-full blur-[4rem]"></div>
              <div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] bg-gradient-to-tr from-[var(--blue-light)]/8 to-transparent rounded-full blur-[3rem]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] border border-white/3 rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-white/8 rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/5 w-24 h-24 bg-white/3 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10 p-12 lg:p-20">
              {/* Header with refined typography */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-8 mb-10">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-white to-[var(--cream)] rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-3xl font-bold text-[var(--primary-blue)]">50%</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--primary-blue)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">OFF</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">
                      Exclusive Founding Client <span className="italic font-serif text-[var(--primary-blue)]">Offer</span>
                    </h3>
                    <p className="text-white/70 text-xl font-light">First 5 spots only: Launch discount in exchange for real feedback</p>
                  </div>
                </div>
                
                <div className="max-w-4xl mx-auto mb-8">
                  <p className="text-white/90 text-xl font-light leading-relaxed mb-6">
                    For our official launch, we're offering our full website development services at <span className="font-medium text-white">half the price</span> for the first five solo consultants who join, <span className="font-medium text-white">in exchange for three things:</span>
                  </p>
                </div>
                
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white/8 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-2xl">
                    <p className="text-white text-lg font-light mb-4">
                      This is the only time Caldera will be offered at this rate.
                    </p>
                    <p className="text-white/80 text-base leading-relaxed">
                      Once these spots are filled, all new projects will return to full price.
                    </p>
                    <p className="text-white/90 text-base font-medium mt-4">
                      If you want priority access (and a premium site at half the investment), <span className="text-[var(--primary-blue)]">apply now.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Two-column layout with refined design */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Requirements */}
                <div>
                  <h4 className="text-white font-medium text-2xl mb-8 tracking-tight">
                    What we need in exchange:
                  </h4>
                  <div className="space-y-6">
                    <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-8 border border-white/15 hover:bg-white/12 transition-all duration-300">
                      <div className="flex items-start gap-6">
                        <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <h5 className="text-white font-medium text-lg mb-3">Make your Caldera website your primary web presence within 30 days of delivery</h5>
                          <p className="text-white/75 leading-relaxed">Use this as your official link in communications, proposals, or your LinkedIn profile</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-8 border border-white/15 hover:bg-white/12 transition-all duration-300">
                      <div className="flex items-start gap-6">
                        <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <h5 className="text-white font-medium text-lg mb-3">Give us honest, actionable feedback on the process and results</h5>
                          <p className="text-white/75 leading-relaxed">Help us refine the process for future clients</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-8 border border-white/15 hover:bg-white/12 transition-all duration-300">
                      <div className="flex items-start gap-6">
                        <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <h5 className="text-white font-medium text-lg mb-3">Leave a testimonial if (and only if) you believe the outcome deserves it</h5>
                          <p className="text-white/75 leading-relaxed">Only if you believe it deserves it</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exclusive Bonuses */}
                <div>
                  <h4 className="text-white font-medium text-2xl mb-8 tracking-tight">
                    Exclusive Launch Bonuses
                  </h4>
                  <p className="text-white/80 text-base mb-8 italic">Included for all new projects booked this month:</p>
                  <div className="space-y-5">
                    <div className="bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:from-white/12 hover:to-white/8 transition-all duration-300">
                      <h5 className="text-white font-medium text-lg mb-3">LinkedIn Launch Toolkit</h5>
                      <p className="text-white/75 leading-relaxed">Custom LinkedIn banner and ready-to-use social post templates, so you can announce your new website with authority and confidence.</p>
                    </div>
                    <div className="bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:from-white/12 hover:to-white/8 transition-all duration-300">
                      <h5 className="text-white font-medium text-lg mb-3">Done-For-You Testimonial Kit</h5>
                      <p className="text-white/75 leading-relaxed">Plug-and-play testimonial outreach scripts and forms. Collect credible client endorsements quickly, so your site launches with real social proof, not empty sections.</p>
                    </div>
                    <div className="bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:from-white/12 hover:to-white/8 transition-all duration-300">
                      <h5 className="text-white font-medium text-lg mb-3">Authority Bio & About Copy Polish</h5>
                      <p className="text-white/75 leading-relaxed">We'll review, edit, and sharpen your LinkedIn bio or About page copy to ensure every profile signals trust and credibility—on your website <em>and</em> beyond.</p>
                    </div>
                    <div className="bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:from-white/12 hover:to-white/8 transition-all duration-300">
                      <h5 className="text-white font-medium text-lg mb-3">Free First Year Hosting + Development Support</h5>
                      <p className="text-white/75 leading-relaxed">12 months of managed hosting, domain support, and up to 2 free development hours per month (4 for your first month) for updates and improvements.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guarantees Section */}
      <section className="bg-[var(--cream)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-[35rem] h-[35rem] bg-gradient-to-br from-[var(--primary-blue)]/4 to-transparent rounded-full blur-[5rem]"></div>
          <div className="absolute bottom-20 left-20 w-[25rem] h-[25rem] bg-gradient-to-tr from-[var(--blue-light)]/6 to-transparent rounded-full blur-[4rem]"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[45rem] h-[45rem] border border-[var(--primary-blue)]/3 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[var(--primary-blue)]/3 rounded-full blur-[2rem]"></div>
        </div>
        
        <div className="relative z-10 pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-8 mb-12 scroll-fade">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Commitment</span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>
            <h2 className="section-title mb-10 scroll-fade">
              Uncompromising Standards,<br/>
              <span className="italic font-serif text-[var(--primary-blue)]">Guaranteed</span>
            </h2>
            <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-4xl mx-auto font-light scroll-fade mb-8">
              We believe you should only pay for work you're genuinely proud to launch, delivered exactly when promised. No exceptions, no fine print, no games.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Quality Commitment Guarantee */}
            <div className="relative group scroll-fade">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/4 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-12 rounded-[2rem] border border-[var(--primary-blue)]/15 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:border-[var(--primary-blue)]/25">
                <div className="flex items-start gap-8 mb-10">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl flex items-center justify-center shadow-2xl">
                      <div className="w-10 h-10 border-2 border-white rounded-full"></div>
                      <div className="w-5 h-5 bg-white rounded-full absolute"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <div className="w-4 h-4 bg-[var(--primary-blue)] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 tracking-tight">Our Quality Commitment Guarantee</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed text-lg">
                      We believe you should only pay for work you're genuinely proud to launch. Here's how our process puts you in control:
                    </p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-5 p-6 bg-[var(--gray-light)]/40 rounded-xl hover:bg-[var(--gray-light)]/60 transition-colors duration-300">
                    <div className="w-7 h-7 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-[var(--gray-dark)] font-medium text-lg mb-2">Pay only for delivered work</h4>
                      <p className="text-[var(--gray-medium)] leading-relaxed">You pay for each phase as it's completed, never for empty promises, never for work you haven't seen and approved.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 bg-[var(--gray-light)]/40 rounded-xl hover:bg-[var(--gray-light)]/60 transition-colors duration-300">
                    <div className="w-7 h-7 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-[var(--gray-dark)] font-medium text-lg mb-2">Full transparency at every stage</h4>
                      <p className="text-[var(--gray-medium)] leading-relaxed">You review and sign off before moving to the next phase. If you're not satisfied at any stage (after homepage, or before launch), you can pause the project with no further obligation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 bg-[var(--gray-light)]/40 rounded-xl hover:bg-[var(--gray-light)]/60 transition-colors duration-300">
                    <div className="w-7 h-7 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-[var(--gray-dark)] font-medium text-lg mb-2">Final payment, only if you're proud to launch</h4>
                      <p className="text-[var(--gray-medium)] leading-relaxed">The last invoice is due only when your website is fully delivered and you're confident putting it in front of your best clients and prospects.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 bg-[var(--gray-light)]/40 rounded-xl hover:bg-[var(--gray-light)]/60 transition-colors duration-300">
                    <div className="w-7 h-7 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-[var(--gray-dark)] font-medium text-lg mb-2">No fine print, no loopholes, no games</h4>
                      <p className="text-[var(--gray-medium)] leading-relaxed">Our guarantee is built into our process: total clarity, milestone payments, and real, reviewable results—every step of the way.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 20-Day Launch Guarantee */}
            <div className="relative group scroll-fade">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/4 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-12 rounded-[2rem] border border-[var(--primary-blue)]/15 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:border-[var(--primary-blue)]/25">
                <div className="flex items-start gap-8 mb-10">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl flex items-center justify-center shadow-2xl">
                      <div className="text-white font-bold text-2xl">20</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-[var(--primary-blue)] text-xs font-bold">D</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 tracking-tight">20-Day Launch Guarantee</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed text-lg">
                      You choose us because you want speed and certainty, not agency delays or excuses. If you provide everything we request on time, we guarantee your site goes live in 20 days or less.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[var(--blue-light)]/15 to-[var(--primary-blue)]/8 rounded-2xl p-8 mb-8 border border-[var(--primary-blue)]/20">
                  <p className="text-[var(--gray-dark)] font-medium mb-4 text-xl">
                    If we miss the deadline for reasons on our end, we'll pay you back <strong className="text-[var(--primary-blue)]">20% of your project fee for every business day we're late.</strong>
                  </p>
                  <p className="text-[var(--gray-medium)] leading-relaxed text-lg">
                    No hassle, no excuses.
                  </p>
                  <p className="text-[var(--gray-dark)] font-medium mt-4 text-lg">
                    <strong>You can plan your launch with total confidence. If we slip, you get paid for the delay.</strong>
                  </p>
                </div>
                
                <div className="bg-[var(--gray-light)]/30 rounded-xl p-6 border border-[var(--gray-light)]">
                  <p className="text-[var(--gray-medium)] leading-relaxed">
                    The 20-day guarantee assumes prompt client responses, timely feedback, and on-time asset delivery. Full details provided in your onboarding pack.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom message */}
          <div className="text-center mt-20 scroll-fade">
            <div className="max-w-3xl mx-auto">
              <p className="text-[var(--gray-dark)] text-lg leading-relaxed">
                We're obsessed with building the best, most effective website service for solo consultants in the world, so we're starting with five founding clients who want to help validate the process and set the standard.
              </p>
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