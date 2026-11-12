import type { Metadata } from 'next'
import LandingWorkClient from '@/components/LandingWorkClient'

export const metadata: Metadata = {
  title: 'Consultant Website Case Studies | Caldera Agency',
  description:
    'Consultant websites built by Caldera Agency: fractional CFOs, leadership coaches, HR, healthcare and biosafety consultants, rail advisory, drone consulting, and supply chain strategy for pharmaceutical companies.',
  alternates: { canonical: '/landing/work' },
}

export default function LandingWorkPage() {
  return <LandingWorkClient />
}
