'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface MenuProps {
  onMenuToggle?: (isOpen: boolean) => void
  dark?: boolean
}

export default function Menu({ onMenuToggle, dark = false }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Notify parent component about menu state
    onMenuToggle?.(isOpen)

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onMenuToggle])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className={`group relative z-[110] backdrop-blur-sm p-3 rounded-full transition-all duration-500 hover:bg-[var(--primary-blue)] hover:border-[var(--primary-blue)] focus:outline-none ${dark ? 'bg-white/10 border border-white/20' : 'bg-black/5 border border-black/10'}`}
        aria-label="Toggle navigation menu"
      >
        <div className="relative w-5 h-4 flex flex-col justify-center items-center">
          {/* Top line */}
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-300 transform origin-center group-hover:bg-white ${
              isOpen ? 'rotate-45 translate-y-[3px] bg-white' : (dark ? 'bg-white' : 'bg-[var(--black)]')
            }`}
          />
          {/* Bottom line */}
          <span
            className={`block h-0.5 w-5 rounded-full transition-all duration-300 transform origin-center mt-1.5 group-hover:bg-white ${
              isOpen ? '-rotate-45 -translate-y-[3px] bg-white' : (dark ? 'bg-white' : 'bg-[var(--black)]')
            }`}
          />
        </div>
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isOpen ? 'opacity-98' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />
        
        {/* Content */}
        <div className={`relative h-full flex items-center justify-center transition-transform duration-500 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-8'
        }`}>
          <nav className="text-center py-16 md:py-20">
            {/* Navigation Links */}
            <div className="space-y-6 md:space-y-8">
              <Link
                href="/"
                onClick={closeMenu}
                className="block text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight no-underline relative group transition-all duration-300 hover:text-[var(--blue-light)]"
              >
                <span className="relative">
                  Home
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-500 group-hover:w-full" />
                </span>
              </Link>
              
              <Link
                href="/about"
                onClick={closeMenu}
                className="block text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight no-underline relative group transition-all duration-300 hover:text-[var(--blue-light)]"
              >
                <span className="relative">
                  About Us
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-500 group-hover:w-full" />
                </span>
              </Link>
              
              <Link
                href="/process"
                onClick={closeMenu}
                className="block text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight no-underline relative group transition-all duration-300 hover:text-[var(--blue-light)]"
              >
                <span className="relative">
                  Process
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-500 group-hover:w-full" />
                </span>
              </Link>
              
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight no-underline relative group transition-all duration-300 hover:text-[var(--blue-light)]"
              >
                <span className="relative">
                  Contact
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-500 group-hover:w-full" />
                </span>
              </Link>
            </div>
            
            {/* Contact Section */}
            <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/20">
              <button
                onClick={() => {
                  closeMenu()
                  setTimeout(() => {
                    const target = document.getElementById('prototype-form-bottom') || document.getElementById('prototype-form') || document.getElementById('contact')
                    target?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center'
                    })
                  }, 300)
                }}
                className="inline-flex items-center gap-3 bg-[var(--primary-blue)] text-white px-8 py-4 text-lg font-medium tracking-tight no-underline rounded-full relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                <span className="relative z-10 group-hover:text-[var(--primary-blue)] transition-colors duration-300">Start Your Project</span>
                <span className="relative z-10 group-hover:text-[var(--primary-blue)] transition-colors duration-300">→</span>
              </button>
            </div>
            
            {/* Studio branding */}
            <div className="mt-8 md:mt-12 mb-8">
              <div className="text-white/40 tracking-widest caldera-logo text-2xl">
                caldera.agency
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}