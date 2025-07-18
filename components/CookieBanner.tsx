'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'consent',
      action: 'update',
      parameters: {
        analytics_storage: 'granted' | 'denied'
        ad_storage: 'granted' | 'denied'
      }
    ) => void
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('caldera-cookie-consent')
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('caldera-cookie-consent', 'accepted')
    localStorage.setItem('caldera-cookie-timestamp', new Date().toISOString())
    closeBanner()
    
    // Enable tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
  }

  const handleReject = () => {
    localStorage.setItem('caldera-cookie-consent', 'rejected')
    localStorage.setItem('caldera-cookie-timestamp', new Date().toISOString())
    closeBanner()
    
    // Disable tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
  }

  const closeBanner = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
    }`}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[var(--black)]/20 backdrop-blur-sm"></div>
      
      {/* Cookie banner content */}
      <div className="relative bg-[var(--white)] border-t border-[var(--gray-light)] shadow-2xl">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 lg:px-16 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-[var(--primary-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                </div>
                <h3 className="text-lg font-medium text-[var(--gray-dark)] tracking-tight">
                  Cookie Preferences
                </h3>
              </div>
              <p className="text-[var(--gray-medium)] leading-relaxed text-sm lg:text-base">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can customize your preferences or learn more in our{' '}
                <Link 
                  href="https://www.iubenda.com/privacy-policy/68538498" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-blue)] hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                {' '}and{' '}
                <Link 
                  href="https://www.iubenda.com/privacy-policy/68538498/cookie-policy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-blue)] hover:underline font-medium"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={handleReject}
                className="px-6 py-3 text-[var(--gray-dark)] border border-[var(--gray-light)] rounded-full font-medium text-sm tracking-tight hover:border-[var(--gray-medium)] hover:bg-[var(--gray-light)]/50 transition-all duration-300"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-[var(--primary-blue)] text-white rounded-full font-medium text-sm tracking-tight hover:bg-[var(--blue-dark)] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[var(--blue-dark)] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                <span className="relative z-10">Accept All</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 