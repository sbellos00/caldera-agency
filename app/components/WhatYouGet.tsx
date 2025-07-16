'use client'

export default function WhatYouGet() {
  return (
    <section className="bg-white relative">
      <div className="pt-32 pb-32 px-8 md:px-16 max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="section-title mb-6 scroll-fade">What You Get</h2>
        </div>

        {/* Hero Package Card */}
        <div className="bg-gradient-to-br from-[var(--black)] to-[var(--gray-dark)] rounded-[2.5rem] p-8 md:p-16 mb-20 relative overflow-hidden scroll-fade">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)]/20 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
                  A complete website that positions you as the obvious choice
                </h3>
                <p className="text-xl text-white/80 font-light max-w-3xl leading-relaxed">
                  Custom-built from scratch to showcase your expertise, attract premium clients, and work flawlessly across all devices—delivered in 20 days with minimal time from you.
                </p>
              </div>
              <div className="hidden lg:block ml-8">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-light text-white mb-2">20</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Days Max</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">2</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Hours Total</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">100%</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Custom</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">1</div>
                <div className="text-sm text-white/60 uppercase tracking-widest">Year Hosting</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Left Column - Two stacked cards */}
          <div className="space-y-8">
            <div className="bg-[var(--gray-light)] p-8 rounded-2xl scroll-fade group hover:bg-[var(--primary-blue)] transition-all duration-500">
              <div className="w-14 h-14 bg-[var(--primary-blue)] rounded-xl mb-6 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <div className="w-7 h-7 border-2 border-white rounded rotate-45 group-hover:border-[var(--primary-blue)] transition-colors duration-500"></div>
              </div>
              <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors duration-500">Expert Copywriting</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                Every word crafted using consultant-specific principles to position you as the authority in your field.
              </p>
            </div>

            <div className="bg-[var(--gray-light)] p-8 rounded-2xl scroll-fade group hover:bg-[var(--primary-blue)] transition-all duration-500">
              <div className="w-14 h-14 bg-[var(--primary-blue)] rounded-xl mb-6 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <div className="w-7 h-7 border-2 border-white rounded-full group-hover:border-[var(--primary-blue)] transition-colors duration-500"></div>
                <div className="absolute w-3.5 h-3.5 bg-white rounded-full group-hover:bg-[var(--primary-blue)] transition-colors duration-500"></div>
              </div>
              <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors duration-500">Analytics & Tracking</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                Google Analytics and Search Console configured so you understand your audience from day one.
              </p>
            </div>
          </div>

          {/* Center Column - Large card */}
          <div className="bg-gradient-to-br from-[var(--blue-light)] to-white p-8 rounded-2xl border border-[var(--primary-blue)]/20 scroll-fade">
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--primary-blue)] rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white rounded-lg"></div>
                <div className="w-3 h-3 bg-white rounded-full absolute top-2 left-2"></div>
                <div className="w-3 h-3 bg-white rounded-full absolute bottom-2 right-2"></div>
              </div>
              <h3 className="text-2xl font-medium mb-6">NextJS Performance</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed mb-8">
                Lightning-fast load times, bulletproof security, and enterprise-grade infrastructure that never lets you down.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Mobile First</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SEO Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Accessible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Two stacked cards */}
          <div className="space-y-8">
            <div className="bg-[var(--gray-light)] p-8 rounded-2xl scroll-fade group hover:bg-[var(--primary-blue)] transition-all duration-500">
              <div className="w-14 h-14 bg-[var(--primary-blue)] rounded-xl mb-6 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <div className="w-7 h-1 bg-white rounded-full group-hover:bg-[var(--primary-blue)] transition-colors duration-500"></div>
                <div className="w-1 h-7 bg-white rounded-full absolute group-hover:bg-[var(--primary-blue)] transition-colors duration-500"></div>
              </div>
              <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors duration-500">Domain & Hosting</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                Complete technical setup and 12 months of premium hosting included—zero admin for you.
              </p>
            </div>

            <div className="bg-[var(--gray-light)] p-8 rounded-2xl scroll-fade group hover:bg-[var(--primary-blue)] transition-all duration-500">
              <div className="w-14 h-14 bg-[var(--primary-blue)] rounded-xl mb-6 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <div className="w-7 h-5 border-2 border-white rounded-sm group-hover:border-[var(--primary-blue)] transition-colors duration-500"></div>
                <div className="w-5 h-1 bg-white rounded-full absolute group-hover:bg-[var(--primary-blue)] transition-colors duration-500"></div>
              </div>
              <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors duration-500">Custom Design</h3>
              <p className="text-[var(--gray-medium)] leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                Tailored visual identity that reflects your expertise—never a template or theme.
              </p>
            </div>
          </div>
        </div>

        {/* Bonus Features Row */}
        <div className="bg-[var(--cream)] rounded-3xl p-8 md:p-12 mb-20 scroll-fade">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-light mb-4">Plus, ongoing support that actually supports</h3>
            <p className="text-[var(--gray-medium)] text-lg max-w-2xl mx-auto">
              Most agencies disappear after launch. We stick around to make sure you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[var(--primary-blue)] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-6 h-6 text-white font-bold text-sm">2</div>
              </div>
              <div>
                <h4 className="text-xl font-medium mb-3">Monthly Support Hours</h4>
                <p className="text-[var(--gray-medium)] leading-relaxed">
                  Quick updates, content changes, or small tweaks—handled within 48 hours, no extra billing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[var(--primary-blue)] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-6 h-6 text-white font-bold text-sm">4</div>
              </div>
              <div>
                <h4 className="text-xl font-medium mb-3">First Month Bonus</h4>
                <p className="text-[var(--gray-medium)] leading-relaxed">
                  Double support hours in your first month for any post-launch adjustments or refinements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center scroll-fade">
          <div className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--blue-dark)] rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-light mb-6">Ready to stand out from the competition?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join consultants who've transformed their online presence and attracted higher-value clients.
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
                <span>See Process</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 