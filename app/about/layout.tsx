import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Caldera Agency',
  description:
    'Learn about Caldera Agency  -  we build bespoke authority-building websites for solo consultants with a hands-off, research-led process.',
  alternates: {
    canonical: 'https://caldera.agency/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}


