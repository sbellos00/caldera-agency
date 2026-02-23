import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Caldera Agency',
  description: 'Caldera Agency pricing and what\u2019s included in each package for solo consultants.',
  alternates: {
    canonical: 'https://caldera.agency/archive/pricing-pdf',
  },
}

export default function ArchivePricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
