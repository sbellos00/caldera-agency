import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'Caldera builds a consultant website, starting from researching your background, writing the copy around it, and then designing and building the site, around your expertise. And we show a free prototype before you pay. Most consultants launch within a couple of weeks.',
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


