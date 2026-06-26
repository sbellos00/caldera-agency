import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'How Caldera builds a consultant website: we research your background, write the copy around it, then design and build the site around your expertise, with a free prototype before you pay. Most consultants launch within a couple of weeks.',
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


