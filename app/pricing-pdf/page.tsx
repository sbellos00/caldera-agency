'use client'

export default function PricingPdfPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] p-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase text-[var(--gray-medium)] mb-6">
            50% Off Launch Special
          </p>
          <h1 className="section-title mb-6 text-[var(--black)]">
            Caldera Agency Pricing
          </h1>
          <p className="text-xl leading-relaxed text-[var(--gray-dark)] font-light max-w-2xl mx-auto">
            Bespoke <span className="font-serif italic font-normal text-[var(--primary-blue)]">Authority-Building</span> Websites for Solo Consultants
          </p>
        </div>

        {/* Bonuses Section */}
        <div className="mb-20">
          <div className="bg-[var(--black)] rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-4xl font-light text-white mb-12 tracking-tight">
              Bonuses
            </h2>
            
            {/* Main Bonus */}
            <div className="flex items-start gap-6 bg-white/10 rounded-2xl p-8 mb-8 border border-white/20">
              <div className="bg-[var(--primary-blue)] text-white rounded-xl w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-normal tracking-tight text-white mb-4">
                  12 Months Free Hosting & Management
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  Fully managed hosting, domain support, and up to 2 hours of monthly development 
                  support (4 in your first month) for post launch tweaks, completely free for your first year.
                </p>
              </div>
            </div>

            {/* Secondary Bonuses */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="bg-[var(--primary-blue)] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-normal tracking-tight text-white mb-3">
                    LinkedIn Launch Toolkit
                  </h3>
                  <p className="text-base leading-relaxed text-white/80">
                    Custom banner + ready-to-post website announcement templates for your LinkedIn.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="bg-[var(--primary-blue)] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-normal tracking-tight text-white mb-3">
                    Authority Bio Polish
                  </h3>
                  <p className="text-base leading-relaxed text-white/80">
                    We&apos;ll sharpen your LinkedIn About copy for credibility to match your site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="mb-20">
          <h2 className="section-title mb-12 text-[var(--black)] text-center max-w-4xl mx-auto">
            What&apos;s Included
          </h2>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-[var(--gray-light)]">
            {/* Table Header */}
            <div className="bg-[var(--gray-dark)] text-white">
              <div className="grid grid-cols-4 gap-4 p-8">
                <div className="font-normal text-xl tracking-tight">Feature</div>
                <div className="font-normal text-xl tracking-tight text-center">Starter</div>
                <div className="font-normal text-xl tracking-tight text-center">Core</div>
                <div className="font-normal text-xl tracking-tight text-center">Advanced</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[var(--gray-light)]">
              {/* Pages */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Pages</div>
                <div className="text-center text-[var(--gray-medium)] text-base">1 (Homepage)</div>
                <div className="text-center text-[var(--gray-medium)] text-base">Up to 5</div>
                <div className="text-center text-[var(--gray-medium)] text-base">Up to 8</div>
              </div>

              {/* Blog/Content Hub */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Blog/Content Hub</div>
                <div className="text-center text-[var(--gray-medium)] text-base"> - </div>
                <div className="text-center text-[var(--gray-medium)] text-base"> - </div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Included</div>
              </div>

              {/* Case Studies */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Case Studies</div>
                <div className="text-center text-[var(--gray-medium)] text-base"> - </div>
                <div className="text-center text-[var(--gray-medium)] text-base"> - </div>
                <div className="text-center text-[var(--gray-medium)] text-base">2 ghostwritten</div>
              </div>

              {/* Copywriting */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Copywriting</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ All pages</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ All pages</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ All pages</div>
              </div>

              {/* Revision Rounds */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Revision Rounds</div>
                <div className="text-center text-[var(--gray-medium)] text-base">2</div>
                <div className="text-center text-[var(--gray-medium)] text-base">3</div>
                <div className="text-center text-[var(--gray-medium)] text-base">3</div>
              </div>

              {/* SEO & Analytics Setup */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">SEO & Analytics Setup</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓</div>
              </div>

              {/* Legal Pages */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Legal Pages</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Templates</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Templates</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Templates</div>
              </div>

              {/* Domain Setup */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Domain Setup</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓</div>
              </div>

              {/* First Year Hosting */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">First Year Hosting</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Free</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Free</div>
                <div className="text-center font-normal text-[var(--primary-blue)] text-base">✓ Free</div>
              </div>

              {/* Monthly Support */}
              <div className="grid grid-cols-4 gap-4 p-6 items-center">
                <div className="font-normal tracking-tight text-[var(--black)] text-lg">Monthly Support</div>
                <div className="text-center text-[var(--gray-medium)] text-base">2h/mo (4h first mo)</div>
                <div className="text-center text-[var(--gray-medium)] text-base">2h/mo (4h first mo)</div>
                <div className="text-center text-[var(--gray-medium)] text-base">2h/mo (4h first mo)</div>
              </div>
            </div>

            {/* Pricing Row */}
            <div className="bg-[var(--primary-blue)] text-white">
              <div className="grid grid-cols-4 gap-4 p-8">
                <div className="font-normal text-xl tracking-tight">Pricing</div>
                <div className="text-center">
                  <div className="text-4xl font-light mb-3 tracking-tight">$2,500</div>
                  <div className="text-lg line-through opacity-70 font-light">$5,000</div>
                  <div className="text-sm font-normal bg-white/20 rounded-full px-4 py-2 inline-block mt-3 tracking-tight">
                    50% OFF
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light mb-3 tracking-tight">$3,750</div>
                  <div className="text-lg line-through opacity-70 font-light">$7,500</div>
                  <div className="text-sm font-normal bg-white/20 rounded-full px-4 py-2 inline-block mt-3 tracking-tight">
                    50% OFF
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light mb-3 tracking-tight">$5,000</div>
                  <div className="text-lg line-through opacity-70 font-light">$10,000</div>
                  <div className="text-sm font-normal bg-white/20 rounded-full px-4 py-2 inline-block mt-3 tracking-tight">
                    50% OFF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-[var(--gray-medium)] text-lg">
          <p className="mb-3 font-light leading-relaxed">All packages include our comprehensive research phase and strategic positioning.</p>
          <p className="font-light leading-relaxed">Launch offer pricing valid for new clients only.</p>
        </div>
      </div>
    </div>
  )
}