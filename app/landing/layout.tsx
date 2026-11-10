import type { Metadata } from 'next'

// The /landing pages duplicate the homepage, /work and /contact for a separate
// funnel. Keep them out of search results so they don't compete with the
// originals; links are still followed.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return children
}
