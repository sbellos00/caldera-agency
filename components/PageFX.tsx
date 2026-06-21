'use client'

import { useEffect, useRef } from 'react'

// Client island that adds the two signature Caldera interactions used across the
// site: the custom trailing cursor and the scroll-fade reveal. Drop <PageFX /> into
// an otherwise server-rendered page and add `scroll-fade` to elements you want to
// reveal on scroll. All page text stays in the server HTML; this only animates it.
export default function PageFX() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateCursor = () => {
      cursor.style.left = mouseX - 20 + 'px'
      cursor.style.top = mouseY - 20 + 'px'
      cursorDot.style.left = mouseX + 'px'
      cursorDot.style.top = mouseY + 'px'
      animationId = requestAnimationFrame(updateCursor)
    }

    document.addEventListener('mousemove', handleMouseMove)
    updateCursor()

    const hoverElements = document.querySelectorAll('a, button')
    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)'
      cursor.style.borderColor = 'var(--primary-blue)'
    }
    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)'
      cursor.style.borderColor = 'var(--primary-blue)'
    }
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Reveal anything already in view immediately so above-the-fold is never hidden.
    document.querySelectorAll('.scroll-fade').forEach((el) => {
      const r = (el as HTMLElement).getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' },
    )
    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el))

    if (window.innerWidth <= 768) {
      cursor.style.display = 'none'
      cursorDot.style.display = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor md:block hidden" ref={cursorRef} />
      <div className="cursor-dot md:block hidden" ref={cursorDotRef} />
    </>
  )
}
