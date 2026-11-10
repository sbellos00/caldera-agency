import type { Metadata } from 'next'
import LandingClient from '@/components/LandingClient'

export const metadata: Metadata = {
  title: 'Caldera | The Website Agency for Solo Consultants',
  description: 'Caldera is a done-for-you website agency for solo consultants. Share your LinkedIn and we handle the research, copy, design, and build.',
  alternates: { canonical: '/landing' },
}

export default function LandingPage() {
  return (
    <>
      {/* Same as the homepage: start the crowd sheet downloading with the document
          so the crowd is already walking under the preloader. */}
      <link rel="preload" as="image" href="/images/peeps/open-peeps-sheet.png" fetchPriority="high" />
      <LandingClient />
    </>
  )
}
