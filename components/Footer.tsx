'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--black)] text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape shape-1 opacity-10"></div>
        <div className="floating-shape shape-2 opacity-10"></div>
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 pt-16 md:pt-20 pb-8 md:pb-12 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link 
              href="/"
              className="inline-block text-3xl md:text-4xl font-medium tracking-tight text-white mb-6 hover:text-[var(--primary-blue)] transition-colors duration-300"
            >
              Studio
            </Link>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mb-8">
              Bespoke, authority-building websites for solo consultants. We handle everything so you can focus on your business.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                </div>
                <span className="text-sm md:text-base">stefanos.bellos@caldera.agency</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 border border-[var(--primary-blue)] rounded-sm"></div>
                </div>
                <span className="text-sm md:text-base">Based in London, UK</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg md:text-xl font-medium text-white mb-6 tracking-tight">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#services"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Custom Website Development
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#services"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Custom Copywriting
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#services"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Analytics Integration
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#services"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Domain Management
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg md:text-xl font-medium text-white mb-6 tracking-tight">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#process"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Our Process
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#faq"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    FAQ
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Contact
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy"
                  className="text-white/70 hover:text-white text-sm md:text-base transition-colors duration-300 group"
                >
                  <span className="relative">
                    Privacy Policy
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-blue)] transition-[width] duration-300 group-hover:w-full"></div>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Elegant Separator */}
        <div className="relative mb-8 md:mb-12">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-white/40"></div>
            <div className="relative mx-8">
              <div className="w-8 h-8 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/20 to-white/40"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-white/60 text-sm">
            <p>© {currentYear} Studio. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full"></div>
            <p>Designed & built with care in London</p>
          </div>

          {/* Social Links or Additional Actions */}
          <div className="flex items-center space-x-4">
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[var(--primary-blue)] text-sm transition-colors duration-300 group"
            >
              <span>Get Started</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Mobile-specific bottom spacing */}
        <div className="md:hidden h-6"></div>
      </div>
    </footer>
  )
}