import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Caldera Agency',
  description: 'Contact Caldera Agency. We\u2019ll get back to you within 24 hours about your project.',
  alternates: {
    canonical: 'https://caldera.agency/archive/contact',
  },
}

export default function ArchiveContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
