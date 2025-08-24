import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Caldera Agency',
  description: 'Contact Caldera Agency. We’ll get back to you within 24 hours about your project.',
  alternates: {
    canonical: 'https://caldera.agency/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}


