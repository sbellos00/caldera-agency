import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Caldera | Built Only for Consultants',
  description:
    'Caldera is a website agency that works only with solo consultants. Our mission is to be the best website agency for consultants, and to give them the best service experience they can get.',
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


