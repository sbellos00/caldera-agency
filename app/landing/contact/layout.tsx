import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact To Get a Free Prototype',
  description: 'Get a free website prototype from Caldera, the website agency for solo consultants. Share your LinkedIn and we’ll send a working preview within 48 hours.',
  alternates: { canonical: '/landing/contact' },
}

export default function LandingContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
