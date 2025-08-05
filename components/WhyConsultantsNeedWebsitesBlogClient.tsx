'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function WhyConsultantsNeedWebsitesBlogClient() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
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
    const hoverElements = document.querySelectorAll('a, button, .blog-card, .blog-content blockquote, .blog-highlight')

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

    // Intersection Observer for scroll animations
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
      <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 py-6 ${!isMenuOpen ? 'mix-blend-difference' : ''}`}>
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <Link href="/" className="text-3xl font-medium tracking-tight text-white caldera-logo hover:text-[var(--primary-blue)] transition-colors duration-300">
            caldera.agency
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/#contact"
              className="hidden md:block group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-tight transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
            <Menu onMenuToggle={setIsMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 bg-gradient-to-b from-[var(--cream)] to-white overflow-hidden pt-32 md:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">

          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-4 mb-6 scroll-fade animate-fade-in-up">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
              <span className="text-sm tracking-widest uppercase text-[var(--primary-blue)] font-medium">Consultant Positioning</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
            </div>

            <h1 className="hero-title mb-8 max-w-5xl animate-fade-in-up animate-delay-100">
              Why Every Consultant Needs a <span className="font-serif italic font-normal text-[var(--primary-blue)]">Website</span><br />
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-[var(--gray-medium)] mb-10 animate-fade-in-up animate-delay-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--primary-blue)] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">CA</span>
                </div>
                <span>Caldera Agency</span>
              </div>
              <span className="hidden md:inline">•</span>
              <time dateTime="2025-08-05">August 5, 2025</time>
              <span className="hidden md:inline">•</span>
              <span>8 min read</span>
            </div>

            <p className="text-xl leading-relaxed text-[var(--gray-dark)] max-w-3xl mx-auto mb-12 font-light animate-fade-in-up animate-delay-300">
              Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-gradient-to-b from-white to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-[var(--primary-blue)]/8 to-[var(--blue-light)]/12 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-tl from-[var(--blue-light)]/10 to-[var(--primary-blue)]/6 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-[var(--primary-blue)]/5 to-transparent rounded-full blur-xl"></div>
        </div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary-blue) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 pt-8 pb-20 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Core Summary */}
            <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-16 scroll-fade shadow-sm">
              <h3 className="text-xl font-medium text-[var(--black)] mb-4">
                Core Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                  <p className="text-[var(--gray-dark)] leading-relaxed">
                    <strong>Clients are looking for specialized expertise, clarity, and proof.</strong> LinkedIn's rigid templates and fleeting updates make it hard for prospects to see exactly why you're different and better.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                  <p className="text-[var(--gray-dark)] leading-relaxed">
                    <strong>LinkedIn makes you visible, but your website makes you credible.</strong> Consultants relying solely on LinkedIn risk blending in, underselling their expertise, and losing deals without ever knowing.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                  <p className="text-[var(--gray-dark)] leading-relaxed">
                    <strong>Your website is your only chance to control the narrative:</strong> clearly showcasing your unique approach, detailed results, and depth of expertise—exactly what high-value clients need to see to trust you and say "yes."
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                  <p className="text-[var(--gray-dark)] leading-relaxed">
                    <strong>A professional website isn't about generating leads, it's about converting them.</strong> It complements LinkedIn by communicating your value clearly and reinforcing your authority, helping you turn interested prospects into paying clients.
                  </p>
                </div>
              </div>
            </div>

            <article className="blog-content prose prose-lg max-w-none">

              {/* Opening */}
                <div className="scroll-fade mb-12">
                  <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                    You're getting steady referrals through LinkedIn. Your DMs are active. So why would you need a website?
                  </p>
                  <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                    Here's what you might not realize: For every client who reaches out, there's another who researched you, compared you to competitors, and quietly chose someone else.
                  </p>
                  <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                    You'll never hear about these lost opportunities.
                  </p>
                </div>
              
              {/* Key Question */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  As a consultant, your business lives and dies by your perceived credibility. When a potential client researches you (and they always do), they're asking themselves one thing:
                </p>
              </div>

              {/* Highlighted Quote */}
              <div className="scroll-fade mb-12">
                <div className="max-w-2xl mx-auto text-center relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary-blue)]/20 font-serif leading-none">"</div>
                  <p className="text-2xl font-light text-[var(--gray-dark)] leading-relaxed italic px-8">
                    Can I trust this person to solve my problem?
                  </p>
                  <div className="absolute -bottom-8 -right-4 text-6xl text-[var(--primary-blue)]/20 font-serif leading-none rotate-180">"</div>
                </div>
              </div>

              {/* Value Communication */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  The more effectively you can communicate that you meet the project's requirements and deliver the value your client seeks, the better opportunities you'll secure and the higher fees you can command.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  <strong>This is where positioning becomes everything.</strong>
                </p>
              </div>

              {/* Research Section */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Research confirms this:
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  The 2023 Consulting Fees Study by Consulting Success, surveying nearly 1,000 consultants globally, found that:
                </p>
              </div>

              {/* Research Stats */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Specialists consistently charge more:</strong> 52% of specialists reported charging at least $10,000 per project, versus just 18% for non-specialists.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>81% of consultants charging $20,000–$50,000 per project were specialists</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Consultants with value-driven branding and clear positioning command 40–60% higher fees</strong> than those who rely on generalist profiles or have weak digital presence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  The key insight here isn't about websites—it's about positioning. Specialists who can clearly communicate their expertise command premium rates.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  The question then becomes: <strong>are you doing your best to prove to clients that you're the person they are looking for?</strong>
                </p>
              </div>

              {/* Section 1: Digital is Table Stakes */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  Digital is now <span className="italic font-serif text-[var(--primary-blue)]">table stakes</span> in consulting.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Market reports confirm the <em>majority</em> of selection and trust-building now happens online. <strong>80%+</strong> of client-consultant relationships now start with digital research, not offline referrals.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  LinkedIn is phenomenal at what it does. It's undeniably the strongest lead generation tool for consultants.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  The question is no longer <em>whether</em> you need LinkedIn. You absolutely do. The real question is whether LinkedIn is <em>enough</em>.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Clients go online to find prospects, and if you aren't visible, you're invisible. LinkedIn is non-negotiable.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  But when clients do find you, what do they see? You might be the perfect fit, but is that immediately clear to the person doing the research?
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  For the vast majority of consultants who rely solely on LinkedIn, the answer is no.
                </p>
              </div>

              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  <strong>Here's why:</strong>
                </p>
              </div>

              {/* Problem 1 */}
              <div className="scroll-fade mb-12">
                <h3 className="text-2xl font-light text-[var(--black)] tracking-tight mb-6">
                  1. Positioning demands differentiation.
                </h3>

                <div className="scroll-fade mb-8">
                  <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 py-4 bg-gradient-to-r from-[var(--blue-light)]/30 to-transparent">
                    <p className="text-lg font-light text-[var(--gray-dark)] italic leading-relaxed">
                      LinkedIn forces you into a standardized template. Your unique approach becomes a generic headline.
                    </p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  On LinkedIn, you have to fit your expertise into fixed fields: headline, bio, and job titles. Even if your work is truly different, the platform compresses you into the same template as everyone else. Prospects scanning your profile see the same roles, labels, and claims as your competitors. This makes it almost impossible to stand out, no matter how strong your actual value proposition is.
                </p>

                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-4">
                  <strong>Why It Matters:</strong>
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  A prospect can't tell the difference between a specialist with a unique approach and another consultant who does the bare minimum. Everyone looks like a "Consultant helping X achieve Y".
                </p>
              </div>

              {/* Problem 2 */}
              <div className="scroll-fade mb-12">
                <h3 className="text-2xl font-light text-[var(--black)] tracking-tight mb-6">
                  2. Positioning relies on clear proof.
                </h3>

                <div className="scroll-fade mb-8">
                  <div className="border-l-2 border-[var(--primary-blue)]/30 pl-6 py-4 bg-gradient-to-r from-[var(--blue-light)]/30 to-transparent">
                    <p className="text-lg font-light text-[var(--gray-dark)] italic leading-relaxed">
                      LinkedIn scatters your best evidence. Case studies and methods get lost or buried in feeds.
                    </p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Clients want to see how you solve problems and deliver value, but LinkedIn is built for short updates, not deep insights. Your case studies are buried in your activity or hidden in obscure 'Featured' sections. Posts disappear in the feed within days. There's no way for a prospect to get a clear, organized view of your methodology, results, or expertise.
                </p>

                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-4">
                  <strong>Why It Matters:</strong>
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  You end up under-selling your value. Prospects get a surface-level impression, never the depth, structure, or proof that makes you stand out or justifies a premium. Even with a decade of standout results, LinkedIn reduces you to a resume with scattered highlights.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  That transformative case study you posted last month? Already buried. Your proprietary framework? Hidden in a PDF nobody downloads. The sophisticated thinking that justifies your rates? Never seen.
                </p>
              </div>

              {/* Solution */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  <strong>So what's the solution?</strong>
                </p>
              </div>

              {/* Core Summary */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <h3 className="text-xl font-medium text-[var(--black)] mb-4">
                  Core Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Clients are looking for specialized expertise, clarity, and proof.</strong> LinkedIn's rigid templates and fleeting updates make it hard for prospects to see exactly why you're different and better.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>LinkedIn makes you visible, but your website makes you credible.</strong> Consultants relying solely on LinkedIn risk blending in, underselling their expertise, and losing deals without ever knowing.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Your website is your only chance to control the narrative:</strong> clearly showcasing your unique approach, detailed results, and depth of expertise—exactly what high-value clients need to see to trust you and say "yes."
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>A professional website isn't about generating leads, it's about converting them.</strong> It complements LinkedIn by communicating your value clearly and reinforcing your authority, helping you turn interested prospects into paying clients.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Website Solution */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  A Website Is Your Only Shot at <span className="italic font-serif text-[var(--primary-blue)]">Controlling</span> the Narrative
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  A website is the only place you control the story. You can:
                </p>
              </div>

              {/* Website Benefits */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Publish deep case studies and frameworks, not just buzzwords and claims.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Highlight your process, methodologies, and intellectual property.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Show real client results, with space for detail and nuance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Sequence the narrative: the right proof, in the right order, for the right clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  By making your expertise and authority clear, you're getting bigger deals, getting included in more RFPs, and securing partnerships you might have otherwise lost.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  <strong>This is the shift from being found to being chosen.</strong>
                </p>
              </div>

              {/* Section 3: LinkedIn + Website */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  LinkedIn Brings Leads. Your Website <span className="italic font-serif text-[var(--primary-blue)]">Closes</span> the Deal.
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  I know what you're thinking: <em>"All my clients come from LinkedIn, so I don't need a site."</em>
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  It's a fair point, and you're probably right that most of your visible leads come through LinkedIn.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  But that's only half the story. Just because leads find you there doesn't mean LinkedIn is doing the heavy lifting, or that you're not quietly losing out.
                </p>
              </div>

              {/* Three Points */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">1</span>
                    </div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>You never hear about the deals you lose.</strong> Prospects research you, just as they research your competition. If another candidate appears more credible, they quietly move on. There's no "lost deal" notification on LinkedIn.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">2</span>
                    </div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>LinkedIn is a filter, not a foundation.</strong> It's where people find your name, but it undersells your expertise and makes it difficult to stand out to high-value clients who are making important decisions about trust, expertise, and value.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">3</span>
                    </div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Your current success might be despite, not because of, your LinkedIn-only presence.</strong> How many more premium opportunities would you capture with both visibility AND demonstrated credibility?
                    </p>
                  </div>
                </div>
              </div>

              {/* Website Purpose */}
              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  But here's what most consultants, and even agencies pitching websites, miss:
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  <strong>A website's job isn't lead generation.</strong>
                </p>
              </div>

              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  LinkedIn is undeniably the strongest lead generation tool for the consulting industry. Anyone who claims otherwise is either trying to sell you something or doesn't know what they're talking about.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  For a consultant, a professional website is a credibility tool.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Its purpose is to prove your expertise, showcase your track record, and signal that you are a serious professional ready for serious clients.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  It's job isn't to generate new leads. It's to stop you from losing them.
                </p>
              </div>

              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Your leads may come through referrals or LinkedIn.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  Your website doesn't replace these methods. It complements them by turning your experience and results into compelling proof that wins trust and helps you convert more of the "already interested" high value opportunities.
                </p>
              </div>

              {/* Key Message */}
              <div className="scroll-fade mb-12">
                <div className="max-w-3xl mx-auto text-center relative py-8">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
                  <p className="text-xl font-light text-[var(--gray-dark)] leading-relaxed italic px-4">
                    LinkedIn makes you visible. Your website makes you credible.
                  </p>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent"></div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  What's More: The Additional Benefits a Website <span className="italic font-serif text-[var(--primary-blue)]">Delivers</span> (That LinkedIn Never Will)
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  Everything above is about credibility and positioning, and, make no mistake, this is the <em>core</em> reason your website exists. But here&apos;s what else happens when you build your own platform:
                </p>
              </div>

              {/* Benefits List */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-[var(--black)] mb-2">A Central Reference Point:</h4>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Your website becomes the single, definitive link you can send to clients, partners, event organizers, and referrers. No confusion, no profile-hunting, no algorithm deciding what they see. Think of it as your professional home base.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[var(--black)] mb-2">Professional Depth and Seriousness:</h4>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Having a professional website sends a clear message that you take your work seriously, demonstrating depth beyond a resume and showing that you understand how to communicate value clearly. This is particularly important for independent consultants, where professionalism affects your ability to attract and retain top clients.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[var(--black)] mb-2">Personal Brand Building:</h4>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Your site gives you complete creative freedom. Design, messaging, content, and proof all reflect your unique approach. You shape the narrative, the visual style, and the tone. LinkedIn simply can&apos;t offer this level of customization.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[var(--black)] mb-2">Full Ownership and Control:</h4>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      Consider this: LinkedIn owns your profile, your posts, your data, and can change the rules anytime. Your website on the other hand is a fully owned asset, immune to algorithm changes, paywalls, or sudden platform shifts.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[var(--black)] mb-2">A Linkable Asset for Media and Referrers:</h4>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      When podcasters, journalists, or referral partners want to feature you, they need somewhere to send their audience. A website gives them (and you) a professional destination to link to, complete with your bio, credentials, and best work. LinkedIn profiles just don&apos;t carry the same weight in show notes or article bylines.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[var(--black)] mb-2">Ready for Scale When You Need It:</h4>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      While your website&apos;s primary job is credibility, not lead generation, it keeps you ready for growth. Unlike LinkedIn, a website opens up your entire digital marketing toolkit when you&apos;re ready, SEO for the specific problems you solve, targeted campaigns that land on pages you control, and inbound funnels for scaling beyond referrals. You may not need these today, but having the infrastructure means you can scale on your terms, not LinkedIn&apos;s.
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  And yes, sometimes your site does attract opportunities beyond conversion. Inbound clients, speaking invites, partnerships, and media requests naturally flow to those who look established and credible on their own terms.
                </p>
              </div>

              {/* Path Forward */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  The <span className="italic font-serif text-[var(--primary-blue)]">Path</span> Forward
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  In a market where every consultant has a LinkedIn profile, standing out isn&apos;t about abandoning what works, it&apos;s about amplifying it. A professional website that clearly communicates your expertise isn&apos;t a nice-to-have. It&apos;s the difference between being considered and being chosen.
                </p>
              </div>

              {/* Caldera Section */}
              <div className="scroll-fade mb-12">
                <h2 className="text-3xl font-light text-[var(--black)] tracking-tight mb-6">
                  How <span className="italic font-serif text-[var(--primary-blue)]">Caldera</span> Can Help
                </h2>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  If you&apos;re ready to move beyond LinkedIn and want a website that actually proves your expertise, Caldera specializes in building professional, research-driven consultant websites.
                </p>
              </div>

              {/* Caldera Features */}
              <div className="invitation-card bg-white border border-[var(--gray-light)] rounded-2xl p-8 mb-12 scroll-fade shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>End-to-end execution:</strong> We handle research, copywriting, design, and setup.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Minimal time required:</strong> Our process is designed so you spend under 2 hours on input and review.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full flex-shrink-0 mt-3"></div>
                    <p className="text-[var(--gray-dark)] leading-relaxed">
                      <strong>Proof and positioning:</strong> We focus on clear case studies, methodologies, and structured proof, not marketing fluff.
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-fade mb-12">
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light mb-6">
                  You don&apos;t need to start from scratch, and you don&apos;t need another digital marketing pitch. If your priority is clear positioning and professional credibility, this is what we do.
                </p>
                <p className="text-lg leading-relaxed text-[var(--gray-dark)] font-light">
                  <Link href="/" className="text-[var(--primary-blue)] hover:underline font-medium">Learn more about Caldera</Link> or <Link href="/#contact" className="text-[var(--primary-blue)] hover:underline font-medium">book a short call</Link> if you want to see exactly how the process works.
                </p>
              </div>

            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative z-10 py-20 px-8 md:px-16 max-w-screen-2xl mx-auto text-center">
          <div className="max-w-4xl mx-auto scroll-fade">
            <h2 className="section-title mb-8 text-white">
              Ready to Build Your <span className="font-serif italic">Authority?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed font-light">
              Don&apos;t let your expertise go unrecognized. We specialize in building credibility websites for consultants who are ready to command premium rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 bg-white text-[var(--primary-blue)] px-8 py-4 text-[15px] tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group font-medium"
              >
                <div className="absolute inset-0 bg-[var(--black)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Website</span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}