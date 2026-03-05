'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--black)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
        {/* Top row: copyright left, description right */}
        <div className="flex flex-col md:flex-row justify-between items-start pt-16 md:pt-20 pb-12 md:pb-16 gap-8">
          <span className="text-white/40 text-sm">&copy; {currentYear} Caldera Agency</span>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg md:text-right">
            Bespoke, authority-building websites for solo consultants. We combine deep research, strategic positioning, and hands-off delivery so you can focus on your business.
          </p>
        </div>

        {/* Massive brand name */}
        <div className="pb-8 md:pb-12 -mx-1">
          <h2 className="caldera-logo text-white font-normal select-none leading-[0.85] tracking-[-0.04em] w-full" style={{ fontSize: '17.5vw' }}>
            caldera.agency
          </h2>
        </div>

        {/* Bottom row: links left, privacy right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 md:pb-12 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
            <a href="https://www.linkedin.com/company/caldera-agency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LinkedIn</a>
            <Link href="/process" className="hover:text-white transition-colors duration-300">Process</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
          </div>
          <a href="https://www.iubenda.com/privacy-policy/68538498" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
