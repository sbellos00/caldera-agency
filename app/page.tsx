'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
        <div className="pt-16 pb-12 px-8 md:px-16 max-w-screen-2xl mx-auto">
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
        
        <div className="relative z-10 pt-8 pb-0 px-8 md:px-16 max-w-screen-2xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {/* Custom Website */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-lg"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">A fully custom, authority-building website</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                Built from scratch to match your positioning, highlight your expertise and help you win high-value clients
              </p>
            </div>

            {/* Custom Copywriting */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-6 border-2 border-white rounded-sm"></div>
                <div className="w-6 h-1 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Custom copywriting for your website</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                We write every word for you utilizing consultant-specific copywriting principles to ensure your expertise and positioning come across clearly to potential clients
              </p>
            </div>

            {/* Analytics Integration */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-6 border-2 border-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-2 left-2"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute bottom-2 right-2"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Analytics integration</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                We set up Google Analytics and Search Console for you, so you always know who's visiting and how your site is performing from day one.
              </p>
            </div>

            {/* Domain Integration */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-8 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Domain integration</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                We handle all technical steps to connect your domain (whether you already own it or need a new one), so your site is live at your address, stress-free.
              </p>
            </div>

            {/* Mobile & Accessibility */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-6 h-10 border-2 border-white rounded-lg"></div>
                <div className="w-4 h-6 border-2 border-white rounded-sm absolute"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Mobile friendly, accessibility</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                Your website works flawlessly on every device and meets modern accessibility standards, so you never miss a client due to technical or usability issues.
              </p>
            </div>

            {/* Modern Design */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="w-4 h-4 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Modern design and styling that fits your positioning and aesthetic</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                Every visual element is chosen to reflect your field and brand (not recycled themes or ancient WordPress templates) so you stand out for the right reasons.
              </p>
            </div>

            {/* NextJS Performance */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="w-4 h-1 bg-white rounded-full absolute"></div>
                <div className="w-1 h-4 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Elite website performance with NextJS</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                Fast load times, rock-solid security, and future-proof infrastructure ensure your website works perfectly, every time.
              </p>
            </div>

            {/* Free Hosting */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-6 bg-white rounded-xl"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Free hosting and domain management for first year</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                Your site is fully managed for the first 12 months. No surprise fees, no technical maintenance, and zero admin for you.
              </p>
            </div>

            {/* Development Support */}
            <div className="deliverable-card bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--primary-blue)] rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-lg"></div>
                <div className="w-3 h-3 bg-white rounded-full absolute top-2 left-2"></div>
                <div className="w-3 h-3 bg-white rounded-full absolute bottom-2 right-2"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--black)]">Up to 2 development support hours per month (4 for the first month)</h3>
              <p className="text-sm md:text-base text-[var(--gray-medium)] leading-relaxed">
                Quick edits, updates, or small changes handled fast and included in your plan—so your website always stays current without extra cost or waiting weeks.
              </p>
            </div>
          </div>

          {/* Extra Services Note */}
          <div className="text-center mb-16 md:mb-20 scroll-fade">
            <p className="text-sm text-[var(--gray-medium)] leading-relaxed max-w-xl mx-auto px-4">
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-16 scroll-fade">
          <div className="invitation-card-container">
            <div className="invitation-card-bg"></div>
            <div className="invitation-card">
              {/* Header */}
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-block bg-white border border-[var(--blue-light)] rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8">
                  <span className="text-xs md:text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Exclusive Launch Offer</span>
                        </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--black)] mb-3 md:mb-4 tracking-tight">
                          Founding Client <span className="italic font-serif text-[var(--primary-blue)]">Invitation</span>
                        </h3>
                <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                  <span className="text-4xl md:text-6xl lg:text-7xl font-light text-[var(--primary-blue)]">50% Off</span>
                        </div>
                <p className="text-[var(--gray-dark)] text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light px-4">
                  Full website development at <span className="font-medium">half price</span> for the first 5 consultants, in exchange for feedback and a testimonial.
                        </p>
                      </div>

              {/* Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                {/* Left Column: Requirements */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg text-[var(--black)] text-center lg:text-left tracking-tight font-light mb-4 md:mb-6">What we ask in return:</h4>
                  <div className="space-y-4 md:space-y-5">
                    {/* Mobile: Clearer, more readable bullets */}
                    <div className="md:hidden space-y-3">
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            Use this as your <span className="relative inline-block">
                              <span className="relative z-10">primary website</span>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)]/20 to-[var(--blue-light)]/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </span> in communications and proposals
                          </span>
                        </div>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            Provide <span className="relative inline-block">
                              <span className="relative z-10">honest feedback</span>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)]/20 to-[var(--blue-light)]/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </span> to help refine our process
                          </span>
                        </div>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            Leave a <span className="relative inline-block">
                              <span className="relative z-10">testimonial</span>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)]/20 to-[var(--blue-light)]/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </span> <span className="italic">if you believe it deserves one</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Keep original layout with subtext */}
                    <div className="hidden md:block space-y-5">
                      <div className="group">
                        <div className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            Make this your <span className="relative inline-block">
                              <span className="relative z-10">primary website</span>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)]/20 to-[var(--blue-light)]/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-medium)] leading-relaxed ml-6 mt-2">Use this as your official link in your communications, proposals, and social media profiles.</p>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            Provide <span className="relative inline-block">
                              <span className="relative z-10">honest feedback</span>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)]/20 to-[var(--blue-light)]/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-medium)] leading-relaxed ml-6 mt-2">Help us refine our process and results for future clients.</p>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            Leave a <span className="relative inline-block">
                              <span className="relative z-10">testimonial</span>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)]/20 to-[var(--blue-light)]/40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-medium)] leading-relaxed ml-6 mt-2">
                          <span className="italic">If, and only if,</span> you believe the final result has earned it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Bonuses */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg text-[var(--black)] text-center lg:text-left tracking-tight font-light mb-4 md:mb-6">
                    <span className="relative inline-block">
                      Exclusive Launch Bonuses
                      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--primary-blue)] via-[var(--blue-light)] to-transparent rounded-full"></div>
                    </span>
                  </h4>
                  <div className="space-y-4 md:space-y-5">
                    {/* Mobile: Simplified bullets, Desktop: Keep original with subtext */}
                    <div className="md:hidden space-y-3">
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              Custom LinkedIn banner
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              Social media post templates
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              Testimonial outreach scripts
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-sm leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              LinkedIn bio optimization
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Keep original layout with subtext */}
                    <div className="hidden md:block space-y-5">
                      <div className="group">
                        <div className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              LinkedIn Launch Toolkit
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-medium)] leading-relaxed ml-6 mt-2">
                          Custom <span className="font-medium text-[var(--black)]">LinkedIn banner</span> and ready-to-use social post templates.
                        </p>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              Done-For-You Testimonial Kit
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-medium)] leading-relaxed ml-6 mt-2">
                          <span className="font-medium text-[var(--black)]">Plug-and-play</span> testimonial outreach scripts and forms.
                        </p>
                      </div>
                      
                      <div className="group">
                        <div className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item">
                          <span className="font-medium text-[var(--black)] relative">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[var(--primary-blue)] rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                              Authority Bio & About Copy Polish
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-medium)] leading-relaxed ml-6 mt-2">
                          LinkedIn bio review and optimization for <span className="font-medium text-[var(--black)]">credibility</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                    </div>
                    
                    {/* Footer */}
              <div className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[var(--gray-light)]">
                <p className="text-[var(--black)] text-sm md:text-base font-medium mb-2 tracking-tight px-4">
                  This is the only time our service will be offered at this rate.
                        </p>
                <p className="text-[var(--gray-medium)] text-xs md:text-sm leading-relaxed font-light px-4">
                          Once these spots are filled, all new projects return to full price.
                        </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Transition */}
      <section className="relative overflow-hidden">
        <div className="h-32 bg-gradient-to-b from-white via-white/95 to-[var(--cream)] relative">
          {/* Subtle geometric accent */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-8 opacity-30">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/20 to-transparent"></div>
              <div className="w-3 h-3 border border-[var(--primary-blue)]/20 rounded-full bg-white/50"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/20 to-transparent"></div>
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
        <div className="relative z-10 pt-6 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-3 md:gap-6 mb-6 md:mb-8 scroll-fade">
              <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-xs md:text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Our Commitment</span>
              <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>
            <h2 className="section-title mb-6 md:mb-8 scroll-fade">
              Uncompromising Standards,<br/>
              <span className="italic font-serif text-[var(--primary-blue)]">Guaranteed</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--gray-dark)] max-w-4xl mx-auto font-light scroll-fade px-4">
              We believe you should only pay for work you're genuinely proud to launch, delivered exactly when promised. No exceptions, no fine print, no games.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Quality Commitment Guarantee */}
            <div className="guarantee-card bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[var(--primary-blue)] rounded-lg md:rounded-xl mb-4 md:mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-xl md:text-2xl font-normal tracking-tight mb-3 relative z-10 group-hover:text-white">Quality Commitment</h3>
              <p className="text-sm md:text-base leading-relaxed text-[var(--gray-medium)] mb-4 md:mb-6 relative z-10 group-hover:text-white">
                You are in control at every stage. We proceed only when you give the green light.
              </p>
              <ul className="grid gap-2 md:gap-3 relative z-10">
                <li className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Pay only for delivered work you've seen and approved</li>
                <li className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Review and sign off before we move to the next phase</li>
                <li className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-[var(--gray-medium)] feature-list-item group-hover:text-white">Final payment only due when you're 100% confident to launch</li>
              </ul>
            </div>

            {/* 20-Day Launch Guarantee */}
            <div className="guarantee-card bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all duration-400 cursor-pointer hover:scale-[1.02] hover:shadow-2xl scroll-fade group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[var(--primary-blue)] rounded-lg md:rounded-xl mb-4 md:mb-6 relative z-10 transition-all duration-300 group-hover:bg-white"></div>
              <h3 className="text-xl md:text-2xl font-normal tracking-tight mb-3 relative z-10 group-hover:text-white">Launch Guarantee</h3>
              <p className="text-sm md:text-base leading-relaxed text-[var(--gray-medium)] mb-4 md:mb-6 relative z-10 group-hover:text-white">
                Speed and certainty, not agency delays. Your site goes live in 20 business days or less.
              </p>
              
                             {/* Clean guarantee detail */}
               <div className="relative z-10 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[var(--gray-light)] group-hover:border-white/20 transition-colors duration-300">
                 <div className="flex items-baseline gap-3 mb-2">
                   <span className="text-2xl md:text-3xl font-light text-[var(--primary-blue)] group-hover:text-white transition-colors duration-300">20%</span>
                   <span className="text-sm md:text-base font-medium text-[var(--gray-dark)] group-hover:text-white transition-colors duration-300">refund for every business day we're late</span>
                 </div>
                 <p className="text-xs md:text-sm text-[var(--gray-medium)] font-light group-hover:text-white/70 transition-colors duration-300">
                   Assumes prompt client feedback. Full details in your onboarding pack.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1 opacity-10"></div>
          <div className="floating-shape shape-2 opacity-10"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        <div className="relative z-10 pt-16 md:pt-20 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-3 md:gap-4 mb-4 md:mb-6 scroll-fade">
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <span className="text-xs md:text-sm tracking-widest uppercase text-white/80 font-medium">Common Questions</span>
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
            <h2 className="section-title mb-4 md:mb-6 scroll-fade text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/80 max-w-3xl mx-auto font-light scroll-fade px-4">
              Clear answers to the questions most consultants ask before booking.
            </p>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
            {/* FAQ Item 1 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    What if I don't have time for a big project?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 1 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    We've designed our process to be incredibly efficient. We handle all the technical and creative work, requiring less than two hours of your time to get everything launched.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    What if you're late?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 2 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    If your site isn't live in 20 days (assuming you provide what's needed), we pay you back 20% per business day late. Guaranteed.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    What if I'm not happy at launch?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 3 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    You only pay for each phase after you approve it. Final payment is only due if you're proud to launch—no risk of paying for something you can't use.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    Isn't this just another template site?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 4 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 4 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    No. Every step is research-based and guides us towards designing the perfect website for you from scratch. All design and copy is consultant-specific and tailored to your positioning, built for consulting credibility—never generic.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    Why not just do it myself?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 5 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 5 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    We do all the heavy lifting so you don't waste weeks of your time. One new client covers your investment.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    Do you build for other industries?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 6 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 6 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    No. Consultants only. That's why our sites work.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 7 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    Will this bring leads?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 7 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 7 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    No site guarantees leads. But without credibility, you lose by default. This site is built to open doors to RFPs, partnerships, and high-value deals.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 8 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 8 ? null : 8)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    LinkedIn works for me now.
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 8 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 8 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    LinkedIn is just one platform. A professional website gives you full control over your digital presence, establishes deeper credibility, and positions you at a higher tier than competitors who rely solely on social media. Don't risk being at the mercy of algorithms and sudden policy changes.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 9 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 9 ? null : 9)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    Who owns the site?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 9 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 9 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    You own it, fully. No platform risk, no lock-in. We provide hosting, support, and maintenance to make your life easier, but you can take the full code and self-host anytime you wish.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 10 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 10 ? null : 10)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    What if I need updates later?
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 10 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 10 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    Up to 4 post-launch development hours are included for free during the first month with your hosting plan, then 2 hours per month thereafter. Anything more is handled quickly by us at our standard rate.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 11 */}
            <div className="scroll-fade">
              <button 
                onClick={() => setOpenFAQ(openFAQ === 11 ? null : 11)}
                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-6 text-left transition-all duration-300 hover:shadow-2xl group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg lg:text-xl font-normal text-white group-hover:text-[var(--black)] transition-colors duration-300 pr-6">
                    I was burned by agencies/freelancers before.
                  </h3>
                  <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${openFAQ === 11 ? 'rotate-45' : ''}`}>
                    <span className="text-white group-hover:text-[var(--black)] text-xl font-light leading-none transition-colors duration-300">+</span>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${openFAQ === 11 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    We understand your hesitation. That's why we operate with complete transparency. Our process is broken down into clear milestones, and you only pay for each stage after you have reviewed and approved the work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 md:mt-20 scroll-fade">
            <p className="text-white/70 text-base md:text-lg mb-4 md:mb-6 px-4">
              Have a different question? 
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-white text-base md:text-lg no-underline relative pb-1 group"
            >
              <span>Ask us directly</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-[width] duration-300 group-hover:w-full"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-gradient-to-br from-[var(--black)] via-[var(--gray-dark)] to-[var(--black)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Sophisticated geometric background elements */}
          <div className="absolute top-20 left-20 w-72 h-72 border border-[var(--primary-blue)]/20 rounded-full animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-48 h-48 border border-[var(--blue-light)]/30 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-[var(--primary-blue)]/10 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[var(--blue-light)]/15 rounded-lg rotate-12"></div>
          
          {/* Premium grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Subtle light rays */}
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-radial from-[var(--primary-blue)]/5 to-transparent transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-radial from-[var(--blue-light)]/8 to-transparent"></div>
        </div>
        
        <div className="relative z-10 pt-20 md:pt-32 pb-20 md:pb-32 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-4 mb-6 scroll-fade">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-[0.2em] uppercase text-[var(--primary-blue)] font-medium">Let's Begin</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>
            <h2 className="section-title mb-6 md:mb-8 scroll-fade text-white">
              Ready to <span className="italic font-serif text-[var(--primary-blue)]">Dominate</span><br className="hidden md:block"/> Your Market?
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/80 max-w-3xl mx-auto font-light scroll-fade px-4">
              Join the consultants who've transformed their online presence and attracted premium clients.
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 scroll-fade relative overflow-hidden">
              {/* Premium card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/98 to-white/92"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-blue)] via-[var(--blue-light)] to-[var(--primary-blue)]"></div>
              
              {/* Sophisticated pattern overlay */}
              <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary-blue) 1px, transparent 0)`,
                backgroundSize: '60px 60px'
              }}></div>
              
              <div className="relative z-10">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-[var(--black)]">Perfect! We'll be in touch soon.</h3>
                  <p className="text-base text-[var(--gray-medium)] leading-relaxed mb-6">
                    Expect your personalized project details and pricing within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitStatus('idle')
                      setFormData({ name: '', email: '', linkedin: '' })
                    }}
                    className="text-[var(--primary-blue)] hover:underline font-medium"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsSubmitting(true)
                    
                    try {
                      const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                      })
                      
                      if (response.ok) {
                        setSubmitStatus('success')
                      } else {
                        setSubmitStatus('error')
                      }
                    } catch (error) {
                      setSubmitStatus('error')
                    } finally {
                      setIsSubmitting(false)
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-4 border border-[var(--gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-300 placeholder:text-[var(--gray-medium)] bg-white/50 hover:bg-white/80 focus:bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-4 border border-[var(--gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-300 placeholder:text-[var(--gray-medium)] bg-white/50 hover:bg-white/80 focus:bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-4 py-4 border border-[var(--gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-300 placeholder:text-[var(--gray-medium)] bg-white/50 hover:bg-white/80 focus:bg-white"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-800 text-sm">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[var(--primary-blue)] to-[var(--blue-dark)] hover:from-[var(--black)] hover:to-[var(--gray-dark)] text-white px-8 py-5 rounded-xl font-medium text-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)] to-[var(--gray-dark)] transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Claim Your Authority Website
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  
                  <p className="text-sm text-[var(--gray-medium)] text-center leading-relaxed">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
              </div>
            </div>
          </div>
          
          {/* Alternative Contact Methods */}
          <div className="text-center mt-12 md:mt-16 scroll-fade">
            <p className="text-white/60 mb-6 text-base">Prefer to reach out directly?</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:hello@calderaagency.com" className="text-white hover:text-[var(--primary-blue)] transition-colors duration-300 flex items-center gap-2 text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@calderaagency.com
              </a>
              <div className="w-px h-6 bg-white/20 hidden sm:block"></div>
              <a href="tel:+1234567890" className="text-white hover:text-[var(--primary-blue)] transition-colors duration-300 flex items-center gap-2 text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (234) 567-8890
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}