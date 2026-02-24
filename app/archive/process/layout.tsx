import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process | Caldera Agency',
  description:
    'See Caldera Agency\u2019s step-by-step, research-led website process for solo consultants  -  from intake to launch in 20 days or less.',
  alternates: {
    canonical: 'https://caldera.agency/archive/process',
  },
}

export default function ArchiveProcessLayout({ children }: { children: React.ReactNode }) {
  return children
}
