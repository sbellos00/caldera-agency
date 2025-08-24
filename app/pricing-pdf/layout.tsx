import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Caldera Agency',
  description: 'Caldera Agency pricing and what’s included in each package for solo consultants.',
  alternates: {
    canonical: 'https://caldera.agency/pricing-pdf',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}


