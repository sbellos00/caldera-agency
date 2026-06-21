import type { Metadata } from 'next'

export const metadata: Metadata = {
  // Internal print/PDF layout, not a public landing page — keep it out of the index.
  robots: { index: false, follow: false },
  title: 'Pricing',
  description: 'Caldera Agency pricing and what’s included in each package for solo consultants.',
  alternates: {
    canonical: '/pricing-pdf',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}


