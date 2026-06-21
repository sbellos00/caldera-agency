import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Caldera Agency  -  we build bespoke authority-building websites for solo consultants with a hands-off, research-led process.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      {children}
    </>
  )
}


