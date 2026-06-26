import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact To Get a Free Prototype',
  description: 'Get a free website prototype from Caldera, the website agency for solo consultants. Share your LinkedIn and we’ll send a working preview within 48 hours.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      {children}
    </>
  )
}


