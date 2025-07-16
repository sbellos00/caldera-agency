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
          {/* Launch Offer Section - Premium Invitation */}
          <div className="relative mb-32 scroll-fade">
            <div className="max-w-6xl mx-auto">
              {/* Premium Invitation Card */}
              <div className="relative bg-gradient-to-br from-[var(--primary-blue)]/5 via-[var(--cream)] to-[var(--primary-blue)]/5 p-0.5 rounded-3xl shadow-2xl">
                {/* Inner card with sophisticated border */}
                <div className="bg-gradient-to-br from-[var(--cream)] to-[var(--gray-light)]/30 rounded-[calc(1.5rem-1px)] p-16 relative overflow-hidden">
                  
                  {/* Elegant corner decorations */}
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[var(--primary-blue)]/30 rounded-tl-xl"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[var(--primary-blue)]/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[var(--primary-blue)]/30 rounded-bl-xl"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[var(--primary-blue)]/30 rounded-br-xl"></div>
                  
                  {/* Watermark pattern */}
                  <div className="absolute inset-0 opacity-[0.02]">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[var(--primary-blue)] rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  
                  {/* Header with elegant typography */}
                  <div className="text-center mb-16">
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-4 mb-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
                        <div className="text-[var(--primary-blue)] text-sm font-medium tracking-[0.3em] uppercase">Exclusive</div>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
                      </div>
                      <h3 className="text-5xl md:text-6xl font-light text-[var(--black)] mb-4 tracking-tight">
                        Founding Client
                      </h3>
                      <div className="text-4xl md:text-5xl italic font-serif text-[var(--primary-blue)] mb-8 tracking-wide">
                        Invitation
                      </div>
                      
                      {/* Elegant 50% presentation */}
                      <div className="relative inline-block">
                        <div className="text-8xl md:text-9xl font-extralight text-[var(--primary-blue)]/10 absolute -top-4 -left-4">50</div>
                        <div className="relative bg-gradient-to-r from-[var(--primary-blue)] to-[var(--blue-dark)] bg-clip-text text-transparent">
                          <span className="text-3xl md:text-4xl font-light">50% Launch Discount</span>
                        </div>
                        <div className="text-[var(--gray-medium)] text-sm mt-2 font-light tracking-wide">First 5 visionary consultants only</div>
                      </div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                      <p className="text-[var(--gray-dark)] text-xl font-light leading-relaxed mb-8">
                        For our official launch, we're offering our full website development services at <span className="font-medium text-[var(--black)]">half the price</span> for the first five solo consultants who join, <span className="font-medium text-[var(--black)]">in exchange for three things:</span>
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-8 h-px bg-[var(--primary-blue)]/30"></div>
                        <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                        <div className="w-8 h-px bg-[var(--primary-blue)]/30"></div>
                      </div>
                    </div>
                  </div>

                  {/* Sophisticated two-column content */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Requirements - Elegant List */}
                    <div>
                      <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                          <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                          <h4 className="text-[var(--black)] font-medium text-xl tracking-tight">What we need in exchange</h4>
                          <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="relative group">
                          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-[var(--primary-blue)] to-transparent"></div>
                          <div className="pl-8">
                            <h5 className="text-[var(--black)] font-medium text-lg mb-3 leading-tight">Make your Caldera website your primary web presence within 30 days of delivery</h5>
                            <p className="text-[var(--gray-medium)] leading-relaxed italic">Use this as your official link in communications, proposals, or your LinkedIn profile</p>
                          </div>
                        </div>
                        
                        <div className="relative group">
                          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-[var(--primary-blue)] to-transparent"></div>
                          <div className="pl-8">
                            <h5 className="text-[var(--black)] font-medium text-lg mb-3 leading-tight">Give us honest, actionable feedback on the process and results</h5>
                            <p className="text-[var(--gray-medium)] leading-relaxed">Help us refine the process for future clients</p>
                          </div>
                        </div>
                        
                        <div className="relative group">
                          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-[var(--primary-blue)] to-transparent"></div>
                          <div className="pl-8">
                            <h5 className="text-[var(--black)] font-medium text-lg mb-3 leading-tight">Leave a testimonial if (and only if) you believe the outcome deserves it</h5>
                            <p className="text-[var(--gray-medium)] leading-relaxed">Only if you believe it deserves it</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exclusive Bonuses - Sophisticated List */}
                    <div>
                      <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                          <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                          <h4 className="text-[var(--black)] font-medium text-xl tracking-tight">Exclusive Launch Bonuses</h4>
                          <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                        </div>
                        <p className="text-[var(--gray-medium)] text-sm italic">Included for all new projects booked this month</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 hover:border-[var(--primary-blue)]/50 transition-colors">
                          <h5 className="text-[var(--black)] font-medium text-lg mb-2">LinkedIn Launch Toolkit</h5>
                          <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Custom LinkedIn banner and ready-to-use social post templates, so you can announce your new website with authority and confidence.</p>
                        </div>
                        
                        <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 hover:border-[var(--primary-blue)]/50 transition-colors">
                          <h5 className="text-[var(--black)] font-medium text-lg mb-2">Done-For-You Testimonial Kit</h5>
                          <p className="text-[var(--gray-medium)] text-sm leading-relaxed">Plug-and-play testimonial outreach scripts and forms. Collect credible client endorsements quickly, so your site launches with real social proof, not empty sections.</p>
                        </div>
                        
                        <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 hover:border-[var(--primary-blue)]/50 transition-colors">
                          <h5 className="text-[var(--black)] font-medium text-lg mb-2">Authority Bio & About Copy Polish</h5>
                          <p className="text-[var(--gray-medium)] text-sm leading-relaxed">We'll review, edit, and sharpen your LinkedIn bio or About page copy to ensure every profile signals trust and credibility—on your website <em>and</em> beyond.</p>
                        </div>
                        
                        <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 hover:border-[var(--primary-blue)]/50 transition-colors">
                          <h5 className="text-[var(--black)] font-medium text-lg mb-2">Free First Year Hosting + Development Support</h5>
                          <p className="text-[var(--gray-medium)] text-sm leading-relaxed">12 months of managed hosting, domain support, and up to 2 free development hours per month (4 for your first month) for updates and improvements.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Elegant footer with key message */}
                  <div className="text-center mt-20">
                    <div className="inline-flex items-center gap-4 mb-8">
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent"></div>
                      <div className="w-8 h-8 border border-[var(--primary-blue)]/30 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full"></div>
                      </div>
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent"></div>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                      <p className="text-[var(--black)] text-lg font-medium mb-3">
                        This is the only time Caldera will be offered at this rate.
                      </p>
                      <p className="text-[var(--gray-medium)] leading-relaxed">
                        Once these spots are filled, all new projects return to full price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guarantees Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-[var(--primary-blue)]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-tr from-[var(--blue-light)]/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 border border-[var(--primary-blue)]/5 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[var(--primary-blue)]/5 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quality Commitment Guarantee */}
            <div className="relative group scroll-fade">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)]/10 to-[var(--blue-light)]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl border border-[var(--primary-blue)]/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-[var(--primary-blue)]/30">
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                      <div className="w-4 h-4 bg-white rounded-full absolute"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-[var(--primary-blue)] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-2 tracking-tight">Quality Commitment Guarantee</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed">
                      Our process puts you in control at every stage, with milestone payments and full transparency.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[var(--gray-light)]/50 rounded-xl hover:bg-[var(--gray-light)]/80 transition-colors">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-[var(--gray-dark)] leading-relaxed">Pay only for delivered work you've seen and approved</span>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-[var(--gray-light)]/50 rounded-xl hover:bg-[var(--gray-light)]/80 transition-colors">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-[var(--gray-dark)] leading-relaxed">Review and sign off before moving to next phase</span>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-[var(--gray-light)]/50 rounded-xl hover:bg-[var(--gray-light)]/80 transition-colors">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-[var(--gray-dark)] leading-relaxed">Final payment only when you're confident to launch</span>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-[var(--gray-light)]/50 rounded-xl hover:bg-[var(--gray-light)]/80 transition-colors">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-[var(--gray-dark)] leading-relaxed">No fine print, no loopholes, no games</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 20-Day Launch Guarantee */}
            <div className="relative group scroll-fade">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)]/10 to-[var(--blue-light)]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl border border-[var(--primary-blue)]/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-[var(--primary-blue)]/30">
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="text-white font-bold text-xl">20</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-[var(--primary-blue)] text-xs font-bold">D</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-2 tracking-tight">20-Day Launch Guarantee</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed">
                      Speed and certainty, not agency delays or excuses. Your site goes live in 20 days or less.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[var(--blue-light)]/20 to-[var(--primary-blue)]/10 rounded-2xl p-6 mb-6 border border-[var(--primary-blue)]/20">
                  <p className="text-[var(--gray-dark)] font-medium mb-2 text-lg">
                    If we miss the deadline for reasons on our end, we'll pay you back <strong className="text-[var(--primary-blue)]">20% of your project fee for every business day we're late.</strong>
                  </p>
                  <p className="text-[var(--gray-medium)] leading-relaxed">
                    No hassle, no excuses. You can plan your launch with total confidence.
                  </p>
                </div>
                
                <div className="bg-[var(--gray-light)]/30 rounded-xl p-4 border border-[var(--gray-light)]">
                  <p className="text-[var(--gray-medium)] text-sm leading-relaxed">
                    <span className="font-medium text-[var(--gray-dark)]">*Conditions:</span> Assumes prompt client responses, timely feedback, and on-time asset delivery. Full details provided in your onboarding pack.
                  </p>
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