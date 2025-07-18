'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    const hoverElements = document.querySelectorAll('a, button, input, textarea')

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

    // Intersection Observer for scroll-fade animations
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
      observer.disconnect()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
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
        setFormData({ 
          name: '', 
          email: '', 
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor md:block hidden" ref={cursorRef}></div>
      <div className="cursor-dot md:block hidden" ref={cursorDotRef}></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 py-6 ${!isMenuOpen ? 'mix-blend-difference' : ''}`}>
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <Link href="/" className="text-3xl font-medium tracking-tight text-white caldera-logo hover:text-[var(--primary-blue)] transition-colors duration-300">
            caldera.agency
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="hidden md:block group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-tight transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Back to Home
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Main Contact Section */}
      <section className="min-h-screen bg-gradient-to-b from-[var(--cream)] to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl"></div>
        </div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 px-8 md:px-16 py-32 max-w-screen-2xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 scroll-fade">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
                <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Get In Touch</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              </div>
              <h1 className="hero-title mb-8">
                Let&apos;s <span className="font-serif italic font-normal text-[var(--primary-blue)]">talk</span>
              </h1>
              <p className="text-xl text-[var(--gray-dark)] max-w-2xl mx-auto font-light">
                Have questions about our services or want to discuss a project? Send us a message and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="invitation-card-container scroll-fade">
                <div className="invitation-card-bg"></div>
                <div className="invitation-card">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-serif italic font-normal mb-6 text-[var(--black)]">Thank you!</h2>
                    <p className="text-xl text-[var(--gray-dark)] mb-8 max-w-2xl mx-auto">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitStatus('idle')
                        setFormData({ name: '', email: '', message: '' })
                      }}
                      className="inline-flex items-center justify-center gap-3 bg-[var(--black)] text-white px-8 py-3 text-[15px] tracking-tight rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
                    >
                      <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                      <span className="relative z-10">Send Another Message</span>
                      <span className="relative z-10">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="invitation-card-container scroll-fade">
                <div className="invitation-card-bg"></div>
                <div className="invitation-card">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[var(--black)] text-sm font-medium mb-3">
                          Your Name <span className="text-[var(--primary-blue)]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label className="block text-[var(--black)] text-sm font-medium mb-3">
                          Email Address <span className="text-[var(--primary-blue)]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[var(--black)] text-sm font-medium mb-3">
                        Your Message <span className="text-[var(--primary-blue)]">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300 resize-none"
                        placeholder="Tell us about your project or question..."
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <p className="text-red-600">
                          Something went wrong. Please try again or email us directly at contact@caldera.agency
                        </p>
                      </div>
                    )}

                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-3 bg-[var(--black)] text-white px-12 py-4 text-[15px] tracking-tight rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                        <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        <span className="relative z-10">→</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="text-center mt-12 scroll-fade">
              <p className="text-[var(--gray-medium)] mb-4">
                Or email us directly at
              </p>
              <a 
                href="mailto:contact@caldera.agency" 
                className="text-[var(--primary-blue)] hover:text-[var(--blue-dark)] font-medium text-lg"
              >
                contact@caldera.agency
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}