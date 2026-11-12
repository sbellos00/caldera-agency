'use client'

import { useEffect, useRef } from 'react'

/** A silent, looping site recording. It only loads and plays while it is on
 *  screen, so a page with several of them does not download or decode them all
 *  at once. The poster shows until then, and stays if motion is reduced. */
export default function CaseVideo({ src, poster, label, className = '' }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => { /* autoplay refused: the poster stays */ })
      else video.pause()
    }, { threshold: 0.25 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none"
      aria-label={label} className={`block h-full w-full object-cover object-top ${className}`} />
  )
}
