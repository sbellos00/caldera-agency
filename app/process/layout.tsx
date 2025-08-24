import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process | Caldera Agency',
  description:
    'See Caldera Agency’s step-by-step, research-led website process for solo consultants — from intake to launch in 20 days or less.',
  alternates: {
    canonical: 'https://caldera.agency/process',
  },
}

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children
}


