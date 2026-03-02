# Scroll-Based Theme Switching

A technique for changing the entire page's background color and text color as the user scrolls between sections. Each section declares a theme (e.g. dark or light), and the page smoothly transitions between them using a CSS transition driven by GSAP ScrollTrigger callbacks.

**Demo:** `/scroll-bg-demo` (source: `app/scroll-bg-demo/page.tsx`)
**Production examples:** `/story`, `/story-aurora`, `/story-prism`, `/story-particles`

---

## Dependencies

```bash
pnpm add gsap lenis
```

| Package | Purpose |
|---------|---------|
| `gsap` + `gsap/ScrollTrigger` | Detects when a section enters/leaves the viewport and fires callbacks |
| `lenis` | Smooth scrolling — makes the scroll feel fluid and syncs with GSAP's ticker |

---

## How It Works

The technique has three parts:

### 1. CSS transition on the container

The outermost wrapper div gets a CSS `transition-colors` class. This means any change to `backgroundColor` or `color` via JavaScript will animate smoothly over the specified duration — the browser handles all the interpolation.

```tsx
<div
  ref={containerRef}
  className="transition-colors duration-[900ms] ease-out"
  style={{ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)' }}
>
  {/* all page content */}
</div>
```

Key points:
- `duration-[900ms]` controls how long the fade takes (adjustable)
- `ease-out` makes the transition decelerate naturally
- All child elements inherit `color` automatically unless overridden

### 2. ScrollTrigger callbacks (not scrub)

Instead of tracking continuous scroll progress (which creates gradient-like interpolation), this technique uses **discrete callbacks** that fire once when a section crosses a threshold:

```tsx
ScrollTrigger.create({
  trigger: sectionElement,    // the section to watch
  start: 'top center',       // fires when section's top hits viewport center
  onEnter: () => {
    // scrolling DOWN — section enters viewport
    container.style.backgroundColor = nextTheme.bg
    container.style.color = nextTheme.text
  },
  onLeaveBack: () => {
    // scrolling UP — section leaves viewport (going back)
    container.style.backgroundColor = previousTheme.bg
    container.style.color = previousTheme.text
  },
})
```

- `onEnter` fires once when scrolling down past the trigger point
- `onLeaveBack` fires once when scrolling back up past the trigger point
- No `scrub` parameter — these are event-based, not progress-based
- The CSS transition handles the smooth animation between states

### 3. Lenis smooth scrolling

Lenis replaces native scroll behavior with smoothed, lerp-based scrolling. It's wired into GSAP's ticker so ScrollTrigger stays perfectly in sync:

```tsx
const lenis = new Lenis({
  lerp: 0.1,        // interpolation factor (lower = smoother, higher = snappier)
  smoothWheel: true, // smooth mouse wheel scrolling
})

// Sync Lenis scroll position with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Run Lenis on every GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

---

## The Pattern (Minimal)

This is the smallest possible implementation:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

const themes = {
  dark: { bg: 'rgb(0, 0, 0)', text: 'rgb(255, 255, 255)' },
  light: { bg: 'rgb(250, 253, 238)', text: 'rgb(0, 0, 0)' },
}

// Each section declares which theme it uses
const sections = [
  { theme: 'dark' },   // initial
  { theme: 'light' },  // switches to light when this enters
  { theme: 'dark' },   // switches back to dark
]

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el, i) => {
        if (!el || i === 0) return

        const theme = themes[sections[i].theme]
        const prevTheme = themes[sections[i - 1].theme]

        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          onEnter: () => {
            containerRef.current!.style.backgroundColor = theme.bg
            containerRef.current!.style.color = theme.text
          },
          onLeaveBack: () => {
            containerRef.current!.style.backgroundColor = prevTheme.bg
            containerRef.current!.style.color = prevTheme.text
          },
        })
      })
    })

    return () => { ctx.revert(); lenis.destroy() }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-colors duration-[900ms] ease-out"
      style={{ backgroundColor: themes[sections[0].theme].bg, color: themes[sections[0].theme].text }}
    >
      {sections.map((section, i) => (
        <section
          key={i}
          ref={(el) => { sectionRefs.current[i] = el }}
          className="min-h-screen flex items-center justify-center"
        >
          <h2 className="text-6xl font-light">Section {i + 1}</h2>
        </section>
      ))}
    </div>
  )
}
```

---

## Configuration Options

### Transition duration

Change `duration-[900ms]` on the container to control fade speed:

| Value | Effect |
|-------|--------|
| `duration-[400ms]` | Quick, snappy switch |
| `duration-[900ms]` | Smooth, cinematic fade (default in our demos) |
| `duration-[1500ms]` | Very slow, dramatic |

### Trigger point

Change `start: 'top center'` to control when the switch happens:

| Value | Meaning |
|-------|---------|
| `'top center'` | Section's top hits viewport center (default — feels natural) |
| `'top 75%'` | Section's top hits 75% down the viewport (earlier trigger) |
| `'top top'` | Section's top hits viewport top (late trigger) |
| `'center center'` | Section's center hits viewport center |

### Lenis smoothness

Adjust `lerp` to control scroll feel:

| Value | Effect |
|-------|--------|
| `0.05` | Very smooth, floaty |
| `0.1` | Balanced (default) |
| `0.2` | Responsive, close to native |
| `1.0` | No smoothing (effectively native scroll) |

### Adding more themes

Just add to the themes object — any valid CSS color works:

```tsx
const themes = {
  dark:  { bg: 'rgb(0, 0, 0)', text: 'rgb(255, 255, 255)' },
  light: { bg: 'rgb(250, 253, 238)', text: 'rgb(0, 0, 0)' },
  blue:  { bg: 'rgb(30, 64, 175)', text: 'rgb(255, 255, 255)' },
  warm:  { bg: 'rgb(120, 53, 15)', text: 'rgb(255, 237, 213)' },
}
```

---

## Why This Approach (vs Alternatives)

| Approach | Pros | Cons |
|----------|------|------|
| **ScrollTrigger callbacks + CSS transition** (this one) | Clean code, smooth transitions, no React re-renders, works with any number of themes | Transition is time-based not scroll-based |
| ScrollTrigger `scrub` + progress interpolation | Transition tied exactly to scroll position | Looks gradient-y, requires manual color math, causes React re-renders on every frame |
| Framer Motion `useScroll` + `useTransform` | Declarative, no GSAP needed | Same gradient problem, more suited for per-element animations |
| IntersectionObserver + CSS transition | No GSAP dependency | Less precise trigger control, no smooth scroll integration |

The callback approach wins because:
1. **Zero React re-renders** — it mutates `style` directly on the DOM node
2. **CSS handles the animation** — hardware accelerated, 60fps, no JS on every frame
3. **Simple mental model** — "when this section enters, switch to this theme"

---

## Cleanup Checklist

The `useEffect` cleanup is critical to avoid memory leaks:

```tsx
return () => {
  ctx.revert()      // kills all ScrollTriggers created in this context
  lenis.destroy()   // stops Lenis and removes its event listeners
}
```

`gsap.context()` automatically tracks all ScrollTriggers created inside it, so `ctx.revert()` cleans everything up in one call.

---

## File Reference

| File | Role |
|------|------|
| `app/scroll-bg-demo/page.tsx` | Standalone demo with 6 alternating sections |
| `app/story/page.tsx` | Production example: blue ↔ off-white |
| `app/story-aurora/page.tsx` | Production example: black ↔ off-white with Aurora background |
| `app/story-prism/page.tsx` | Production example: black ↔ off-white with Prism background |
| `app/story-particles/page.tsx` | Production example: black ↔ off-white with Particles background |
