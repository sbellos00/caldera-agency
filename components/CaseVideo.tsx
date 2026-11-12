'use client'

import { useEffect, useRef } from 'react'

/** A silent, looping site recording. It only loads and plays while it is on
 *  screen, so a page with several of them does not download or decode them all
 *  at once. The poster shows until then, and stays if motion is reduced.
 *
 *  `startAt` begins the first play that many seconds in, and `rate` changes
 *  the playback speed, so several recordings side by side do not move in step. */
export default function CaseVideo({ src, poster, label, className = '', startAt = 0, rate = 1 }: { src: string; poster: string; label: string; className?: string; startAt?: number; rate?: number }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.defaultPlaybackRate = rate
    video.playbackRate = rate
    // The file only loads on first play, so the offset is applied once its length is known.
    const seek = () => { if (startAt > 0 && startAt < video.duration) video.currentTime = startAt }
    video.addEventListener('loadedmetadata', seek, { once: true })
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => { /* autoplay refused: the poster stays */ })
      else video.pause()
    }, { threshold: 0.25 })
    observer.observe(video)
    return () => { observer.disconnect(); video.removeEventListener('loadedmetadata', seek) }
  }, [startAt, rate])

  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none"
      aria-label={label} className={`block h-full w-full object-cover object-top ${className}`} />
  )
}
