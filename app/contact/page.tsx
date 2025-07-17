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
    company: '', 
    message: '', 
    projectType: '',
    budget: '',
    timeline: ''
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
    const hoverElements = document.querySelectorAll('a, button, .contact-card, input, textarea, select')

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
          company: '', 
          message: '', 
          projectType: '',
          budget: '',
          timeline: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
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

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 bg-[var(--cream)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full">
          <div className="max-w-4xl">
            <p className="text-sm tracking-widest uppercase text-[var(--gray-medium)] mb-6 animate-fade-in-up">
              Get In Touch
            </p>

            <h1 className="hero-title mb-8 animate-fade-in-up animate-delay-100">
              Let's discuss your <span className="font-serif italic font-normal text-[var(--primary-blue)]">project</span>
            </h1>

            <p className="text-lg leading-relaxed text-[var(--gray-dark)] max-w-2xl mb-12 animate-fade-in-up animate-delay-200">
              Ready to build an authority website that demonstrates your expertise and attracts premium clients? We'd love to hear about your vision and show you how we can bring it to life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-20 animate-fade-in-up animate-delay-300">
              <div className="text-center group">
                <h3 className="text-xl font-light tracking-tight mb-4 text-[var(--black)] group-hover:text-[var(--primary-blue)] transition-colors duration-300">Email Response</h3>
                <p className="text-[var(--gray-medium)] mb-6 leading-relaxed">Get a detailed response within 24 hours</p>
                <a href="mailto:contact@caldera.agency" className="text-[var(--primary-blue)] hover:text-[var(--blue-dark)] font-light text-lg relative group-hover:scale-105 transition-all duration-300">
                  <span className="relative">
                    contact@caldera.agency
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </a>
              </div>

              <div className="text-center group">
                <h3 className="text-xl font-light tracking-tight mb-4 text-[var(--black)] group-hover:text-[var(--primary-blue)] transition-colors duration-300">Discovery Call</h3>
                <p className="text-[var(--gray-medium)] mb-6 leading-relaxed">15-minute project discussion</p>
                <button className="text-[var(--primary-blue)] hover:text-[var(--blue-dark)] font-light text-lg relative group-hover:scale-105 transition-all duration-300">
                  <span className="relative">
                    Schedule time →
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </button>
              </div>

              <div className="text-center group">
                <h3 className="text-xl font-light tracking-tight mb-4 text-[var(--black)] group-hover:text-[var(--primary-blue)] transition-colors duration-300">Global Reach</h3>
                <p className="text-[var(--gray-medium)] mb-6 leading-relaxed">Based in Athens, Greece</p>
                <p className="text-[var(--gray-dark)] font-light">Working with clients worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {submitStatus === 'success' ? (
              <div className="text-center py-16 scroll-fade">
                <div className="w-20 h-20 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="section-title mb-6">Thank you!</h2>
                <p className="text-xl text-[var(--gray-dark)] mb-8 max-w-2xl mx-auto">
                  We've received your inquiry and will get back to you within 24 hours with next steps.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-[var(--primary-blue)] hover:text-[var(--blue-dark)] font-medium"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-16 scroll-fade">
                  <h2 className="section-title mb-6">Tell us about your project</h2>
                  <p className="text-xl text-[var(--gray-dark)] max-w-3xl mx-auto">
                    The more details you share, the better we can tailor our approach to your specific needs and goals.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 scroll-fade">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[var(--black)] text-sm font-medium mb-3">
                        Company/Practice Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300"
                        placeholder="Your consulting practice"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--black)] text-sm font-medium mb-3">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                        className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300"
                      >
                        <option value="">Select project type</option>
                        <option value="new-website">New Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="consultation">Design Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[var(--black)] text-sm font-medium mb-3">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-20k">$10,000 - $20,000</option>
                        <option value="20k-plus">$20,000+</option>
                        <option value="discuss">Let's discuss</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[var(--black)] text-sm font-medium mb-3">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                        className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-2-months">1-2 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--black)] text-sm font-medium mb-3">
                      Project Details <span className="text-[var(--primary-blue)]">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-6 py-4 bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-xl text-[var(--black)] placeholder:text-[var(--gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)] transition-all duration-300 resize-none"
                      placeholder="Tell us about your current situation, goals for the new website, target audience, and any specific requirements or features you have in mind..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <p className="text-red-600">
                        Something went wrong. Please try again or email us directly at stefanos.bellos@caldera.agency
                      </p>
                    </div>
                  )}

                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[var(--black)] text-white px-12 py-4 text-[15px] tracking-tight rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="absolute inset-0 bg-[var(--primary-blue)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                      <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Your Inquiry'}</span>
                      <span className="relative z-10">→</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="bg-[var(--cream)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="scroll-fade">
              <h2 className="section-title mb-8">
                What happens next?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--black)]">Initial Response</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed">
                      We'll review your inquiry and respond within 24 hours with our initial thoughts and next steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--black)]">Discovery Call</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed">
                      We'll schedule a 15-30 minute call to dive deeper into your goals, timeline, and requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--black)]">Custom Proposal</h3>
                    <p className="text-[var(--gray-medium)] leading-relaxed">
                      You'll receive a detailed proposal with timeline, deliverables, and investment tailored to your project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-fade">
              <h3 className="text-3xl font-light mb-12 text-[var(--black)] tracking-tight">Why work with us?</h3>
              <div className="space-y-8">
                <div className="border-l border-[var(--primary-blue)]/30 pl-8">
                  <h4 className="text-lg font-light mb-3 text-[var(--black)]">Consultant-specific expertise</h4>
                  <p className="text-[var(--gray-dark)] leading-relaxed font-light">
                    We understand your industry and build websites that speak directly to your target clients.
                  </p>
                </div>
                <div className="border-l border-[var(--primary-blue)]/30 pl-8">
                  <h4 className="text-lg font-light mb-3 text-[var(--black)]">Minimal time investment</h4>
                  <p className="text-[var(--gray-dark)] leading-relaxed font-light">
                    Less than 2 hours of your time from start to launch.
                  </p>
                </div>
                <div className="border-l border-[var(--primary-blue)]/30 pl-8">
                  <h4 className="text-lg font-light mb-3 text-[var(--black)]">Guaranteed timeline</h4>
                  <p className="text-[var(--gray-dark)] leading-relaxed font-light">
                    Your site launches in 20 days or we pay you back.
                  </p>
                </div>
                <div className="border-l border-[var(--primary-blue)]/30 pl-8">
                  <h4 className="text-lg font-light mb-3 text-[var(--black)]">Complete ownership</h4>
                  <p className="text-[var(--gray-dark)] leading-relaxed font-light">
                    No platform lock-in, you own everything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}