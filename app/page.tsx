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
    const hoverElements = document.querySelectorAll('a, button, .feature-card')
    
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
      <style jsx global>{`
        :root {
          --primary-blue: #0019ff;
          --blue-light: #E6E9FF;
          --blue-dark: #000D66;
          --cream: #FAF8F3;
          --black: #000000;
          --gray-dark: #1A1A1A;
          --gray-medium: #6B6B6B;
          --gray-light: #F0F0F2;
          --white: #FFFFFF;
        }

        ::selection {
          background: var(--primary-blue);
          color: var(--white);
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
          color: var(--black);
          background: var(--cream);
          overflow-x: hidden;
          cursor: default;
        }

        /* Custom Cursor */
        .cursor {
          width: 40px;
          height: 40px;
          border: 2px solid var(--primary-blue);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: all 0.1s ease;
          mix-blend-mode: difference;
        }

        .cursor-dot {
          width: 4px;
          height: 4px;
          background: var(--primary-blue);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }

        /* Navigation */
        nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          padding: 24px 48px;
          mix-blend-mode: difference;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--white);
        }

        .nav-link {
          color: var(--white);
          text-decoration: none;
          font-size: 16px;
          letter-spacing: -0.01em;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 32px;
          background: var(--cream);
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.6;
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 600px;
          height: 600px;
          background: var(--blue-light);
          top: -20%;
          right: -10%;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: var(--primary-blue);
          bottom: -10%;
          left: -5%;
          animation-delay: -5s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .eyebrow {
          font-size: 14px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gray-medium);
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        h1 {
          font-size: clamp(32px, 6vw, 72px);
          line-height: 0.9;
          font-weight: 300;
          letter-spacing: -0.04em;
          margin-bottom: 32px;
          max-width: 900px;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.1s forwards;
        }

        h1 .serif {
          font-family: Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--primary-blue);
        }

        .hero-description {
          font-size: 18px;
          line-height: 1.6;
          color: var(--gray-dark);
          max-width: 600px;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .cta-wrapper {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--black);
          color: var(--white);
          padding: 16px 32px;
          font-size: 15px;
          letter-spacing: -0.01em;
          text-decoration: none;
          border-radius: 100px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0, 1);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--primary-blue);
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0, 1);
        }

        .cta-button span {
          position: relative;
          z-index: 1;
        }

        .cta-button:hover::before {
          transform: translateX(0);
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        /* Stats Marquee */
        .stats-section {
          background: var(--black);
          color: var(--white);
          padding: 24px 0;
          position: relative;
          overflow: hidden;
          margin-top: 80px;
        }

        .marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        .marquee-content {
          display: flex;
          gap: 80px;
          padding-right: 80px;
          white-space: nowrap;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .stat-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-size: 16px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 500;
          color: var(--white);
        }

        .stat-label {
          color: var(--gray-medium);
        }

        /* Main Content */
        .main-content {
          background: var(--white);
          position: relative;
        }

        .content-section {
          padding: 120px 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        h2 {
          font-size: clamp(36px, 5.5vw, 68px);
          line-height: 1;
          font-weight: 300;
          letter-spacing: -0.03em;
          margin-bottom: 32px;
          max-width: 900px;
        }

        .section-intro {
          font-size: 20px;
          line-height: 1.5;
          color: var(--gray-dark);
          max-width: 640px;
          margin-bottom: 80px;
          font-weight: 300;
        }

        /* Features Bento Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
          margin-bottom: 120px;
        }

        .feature-card {
          background: var(--gray-light);
          padding: 32px;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
          cursor: pointer;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--primary-blue), var(--blue-dark));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover * {
          color: var(--white) !important;
        }

        .feature-card:nth-child(1) {
          grid-column: span 3;
          grid-row: span 2;
        }

        .feature-card:nth-child(2) {
          grid-column: span 3;
        }

        .feature-card:nth-child(3) {
          grid-column: span 3;
        }

        .feature-card:nth-child(4) {
          grid-column: span 6;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: var(--primary-blue);
          border-radius: 12px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          background: var(--white);
        }

        .feature-title {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .feature-description {
          font-size: 16px;
          line-height: 1.6;
          color: var(--gray-medium);
          position: relative;
          z-index: 1;
        }

        .feature-list {
          margin-top: 24px;
          display: grid;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .feature-list-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.5;
          color: var(--gray-medium);
        }

        .feature-list-item::before {
          content: '→';
          color: var(--primary-blue);
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Process Link */
        .process-link {
          text-align: center;
        }

        .process-link a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--black);
          font-size: 18px;
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
        }

        .process-link a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-blue);
          transition: width 0.3s ease;
        }

        .process-link a:hover::after {
          width: 100%;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .process-link a:hover .arrow {
          transform: translateX(4px);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero, .content-section {
            padding: 60px 20px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            grid-column: span 1 !important;
          }

          .cursor, .cursor-dot {
            display: none;
          }
        }

        /* Scroll animations */
        .scroll-fade {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0, 1);
        }

        .scroll-fade.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-fade:nth-child(1) { transition-delay: 0s; }
        .scroll-fade:nth-child(2) { transition-delay: 0.1s; }
        .scroll-fade:nth-child(3) { transition-delay: 0.2s; }
        .scroll-fade:nth-child(4) { transition-delay: 0.3s; }
      `}</style>

      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* Navigation */}
      <nav>
        <div className="nav-content">
          <div className="logo">Studio</div>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
        </div>
        
        <div className="hero-content">
          <p className="eyebrow">50% Off Launch Special</p>
          
          <h1>
            Bespoke, <span className="serif">Authority-Building</span><br/>
            Websites for Solo Consultants
          </h1>
          
          <p className="hero-description">
            We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise, communicate credibility, and convert higher-value clients—with zero admin headache.
          </p>
          
          <div className="cta-wrapper">
            <a href="#contact" className="cta-button">
              <span>CTA Button</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="stats-section">
        <div className="marquee">
          <div className="marquee-content">
            <div className="stat-item">
              <span className="stat-value">20</span>
              <span className="stat-label">days or less</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">hours of your involvement</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1</span>
              <span className="stat-label">year of free hosting</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">tailored to you</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0%</span>
              <span className="stat-label">platform lock in</span>
            </div>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <div className="stat-item">
              <span className="stat-value">20</span>
              <span className="stat-label">days or less</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">hours of your involvement</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1</span>
              <span className="stat-label">year of free hosting</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">tailored to you</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0%</span>
              <span className="stat-label">platform lock in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="content-section">
          <h2 className="scroll-fade">
            We handle everything,<br/>
            you focus on your business.
          </h2>
          
          <p className="section-intro scroll-fade">
            Most consultants will never prioritize "project managing" their own website. Our process is built so they never have to:
          </p>

          {/* Features Bento Grid */}
          <div className="features-grid">
            <div className="feature-card scroll-fade">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Fully Managed</h3>
              <p className="feature-description">
                We take care of all the technical and admin work so that you never have to worry about things that don’t move your business forward.
              </p>
              <ul className="feature-list">
                <li className="feature-list-item">Domain Management</li>
                <li className="feature-list-item">Analytics Integration</li>
                <li className="feature-list-item">Web Hosting and Performance</li>
                <li className="feature-list-item">Post Launch Tweaks</li>
              </ul>
            </div>

            <div className="feature-card scroll-fade">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Guaranteed Speed</h3>
              <p className="feature-description">
                Launched in 20 days or less, guaranteed. If we're late, you get a 20% refund for every day missed.
              </p>
            </div>

            <div className="feature-card scroll-fade">
              <div className="feature-icon"></div>
              <h3 className="feature-title">Minimal Time Investment</h3>
              <p className="feature-description">
              Most clients spend less than 2 hours total from start to launch. See the full process.
              </p>
            </div>

            <div className="feature-card scroll-fade">
              <h3 className="feature-title">No Homework, No Endless Meetings, No Agency Runaround</h3>
              <div className="feature-list">
                <p className="feature-list-item">You never fill out a long, generic form or get asked for things we can research.</p>
                <p className="feature-list-item">You see concrete options, not abstract requests.</p>
                <p className="feature-list-item">Every question/request is targeted and explained ("We need this for your credibility").</p>
                <p className="feature-list-item">You spend less than 2 hours total on throughout the whole project cycle.</p>
              </div>
            </div>
          </div>

          {/* Process Link */}
          <div className="process-link scroll-fade">
            <Link href="/process">
              See the full step by step process?
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}