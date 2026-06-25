import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'See Caldera Agency’s step-by-step, research-led website process for solo consultants  -  from intake to launch in 20 days or less.',
  alternates: {
    canonical: '/process',
  },
}

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Process', path: '/process' }])} />
      {children}
    </>
  )
}


