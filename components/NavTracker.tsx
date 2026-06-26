'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { markHydrated, LAST_PATH_KEY } from '@/lib/navState'

/**
 * Renders nothing. Marks the app as hydrated after the first client render and
 * records the current path so the next page can tell where the user came from.
 * The homepage uses this to play its intro preloader only on a fresh load or when
 * arriving from the flagship "best website agency" page.
 */
export default function NavTracker() {
  const pathname = usePathname()

  useEffect(() => {
    markHydrated()
    try {
      sessionStorage.setItem(LAST_PATH_KEY, pathname)
    } catch {
      /* sessionStorage unavailable (e.g. privacy mode); ignore */
    }
  }, [pathname])

  return null
}
