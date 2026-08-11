'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CrowdCanvasSpotlightProps {
  /** Black & white sprite sheet — the crowd. */
  src: string
  /** Colorized sheet, drawn at 2x so it stays sharp on retina. Its own grid, unrelated to `src`. */
  colorSrc: string
  /** Horizontal cell count of `src` */
  rows?: number
  /** Vertical cell count of `src` */
  cols?: number
  /** Horizontal cell count of `colorSrc` */
  colorCols?: number
  /** Vertical cell count of `colorSrc` */
  colorRows?: number
  /** How many cells of `colorSrc` actually hold a character. */
  colorCount?: number
  /** How many peeps walk in color at any one time. */
  coloredCount?: number
}

type Peep = {
  rect: number[]
  baseWidth: number
  baseHeight: number
  width: number
  height: number
  x: number
  y: number
  anchorY: number
  scaleX: number
  walk: gsap.core.Timeline | null
  /** Both fixed for the whole crossing — only ever set off-screen, on spawn. */
  color: boolean
  colorIndex: number
  setRect: (rect: number[]) => void
  render: (ctx: CanvasRenderingContext2D) => void
}

export default function CrowdCanvasSpotlight({
  src,
  colorSrc,
  rows = 15,
  cols = 7,
  colorCols = 8,
  colorRows = 5,
  colorCount = 40,
  coloredCount = 2,
}: CrowdCanvasSpotlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min)
    const randomIndex = (array: unknown[]) => randomRange(0, array.length) | 0
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0]
    const removeRandomFromArray = <T,>(array: T[]) => removeFromArray(array, randomIndex(array))
    const getRandomFromArray = <T,>(array: T[]) => array[randomIndex(array) | 0]

    const stage = { width: 0, height: 0 }
    const allPeeps: Peep[] = []
    const availablePeeps: Peep[] = []
    const crowd: Peep[] = []

    let bwSheet: HTMLImageElement | null = null
    let colorSheet: HTMLImageElement | null = null
    const colorCell = { w: 0, h: 0 }

    // Shuffled bag, so every colorized character is used once before any repeats.
    let colorBag: number[] = []
    const nextColorIndex = () => {
      if (!colorBag.length) {
        colorBag = Array.from({ length: colorCount }, (_, i) => i)
        for (let i = colorBag.length - 1; i > 0; i--) {
          const j = (Math.random() * (i + 1)) | 0
          ;[colorBag[i], colorBag[j]] = [colorBag[j], colorBag[i]]
        }
      }
      return colorBag.pop() as number
    }

    const createPeep = ({ rect }: { rect: number[] }): Peep => {
      const peep: Peep = {
        rect: [], baseWidth: 0, baseHeight: 0, width: 0, height: 0, x: 0, y: 0, anchorY: 0, scaleX: 1, walk: null,
        color: false, colorIndex: 0,
        setRect: (r: number[]) => {
          peep.rect = r
          peep.baseWidth = r[2]
          peep.baseHeight = r[3]
          peep.width = r[2]
          peep.height = r[3]
        },
        render: (ctx: CanvasRenderingContext2D) => {
          const useColor = peep.color && colorSheet && colorCell.w > 0
          const sheet = useColor ? colorSheet! : bwSheet
          if (!sheet) return
          const r = useColor
            ? [(peep.colorIndex % colorCols) * colorCell.w, ((peep.colorIndex / colorCols) | 0) * colorCell.h, colorCell.w, colorCell.h]
            : peep.rect
          ctx.save()
          ctx.translate(peep.x, peep.y)
          ctx.scale(peep.scaleX, 1)
          ctx.drawImage(sheet, r[0], r[1], r[2], r[3], 0, 0, peep.width, peep.height)
          ctx.restore()
        },
      }
      peep.setRect(rect)
      return peep
    }

    // Always runs while the peep is parked off-stage, so a swap is never visible.
    const resetPeep = (peep: Peep) => {
      peep.color = crowd.filter(p => p.color).length < coloredCount
      if (peep.color) peep.colorIndex = nextColorIndex()
      const direction = Math.random() > 0.5 ? 1 : -1
      // Keep the mobile crowd inside a tighter vertical band. The desktop range
      // puts the nearest row mostly below the viewport and the back row too high
      // once the sprites are scaled down, leaving heads at one edge and cropped
      // characters at the other.
      const depth = gsap.parseEase('power2.in')(Math.random())
      const offsetY = stage.width < 640 ? 25 - 110 * depth : 100 - 250 * depth
      const startY = stage.height - peep.height + offsetY
      let startX: number, endX: number
      if (direction === 1) { startX = -peep.width; endX = stage.width; peep.scaleX = 1 }
      else { startX = stage.width + peep.width; endX = 0; peep.scaleX = -1 }
      peep.x = startX; peep.y = startY; peep.anchorY = startY
      return { startY, endX }
    }

    const normalWalk = (peep: Peep, props: { startY: number; endX: number }) => {
      const xDuration = 10, yDuration = 0.25
      const tl = gsap.timeline()
      tl.timeScale(randomRange(0.5, 1.5))
      tl.to(peep, { duration: xDuration, x: props.endX, ease: 'none' }, 0)
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: props.startY - 10 }, 0)
      return tl
    }

    const walks = [normalWalk]

    const removePeepFromCrowd = (peep: Peep) => {
      const index = crowd.indexOf(peep)
      if (index > -1) crowd.splice(index, 1)
      peep.color = false
      availablePeeps.push(peep)
    }

    const addPeepToCrowd = (): Peep => {
      const peep = removeRandomFromArray(availablePeeps)
      const props = resetPeep(peep)
      const walkFn = getRandomFromArray(walks)
      const walk = walkFn(peep, props).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep)
        addPeepToCrowd()
      })
      peep.walk = walk
      crowd.push(peep)
      crowd.sort((a, b) => a.anchorY - b.anchorY)
      return peep
    }

    // Seed the walk positions as an even spread rather than pure random. 105 random
    // values clump, which can leave a visible hole in the crowd on the first frame;
    // one peep per equal slice (jittered inside it) fills the stage every time.
    const initCrowd = () => {
      const total = availablePeeps.length
      for (let i = 0; total > 0 && availablePeeps.length; i++) {
        const progress = Math.min(0.999, (i + Math.random()) / total)
        addPeepToCrowd().walk?.progress(progress)
      }
    }

    const render = () => {
      if (!canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(devicePixelRatio, devicePixelRatio)
      crowd.forEach(p => p.render(ctx))
      ctx.restore()
    }

    const resize = () => {
      if (!canvas || !allPeeps.length) return
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return                                // not laid out yet — the observer will call back
      if (w === stage.width && h === stage.height) return // ignore no-op resizes (mobile URL bar) so the crowd isn't reset
      stage.width = w
      stage.height = h
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio

      // A full desktop-sized cast overwhelms a narrow screen. Scale the sprites
      // and reduce the active cast together, keeping the hero lively without
      // obscuring the headline or turning the lower half into a solid wall.
      const scale = Math.min(1, Math.max(0.42, w / 900))
      const activeCount = w < 640 ? Math.min(48, allPeeps.length) : allPeeps.length
      allPeeps.forEach(p => {
        p.width = p.baseWidth * scale
        p.height = p.baseHeight * scale
      })
      crowd.forEach(p => { p.walk?.kill(); p.color = false })
      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps.slice(0, activeCount))
      initCrowd()
    }

    const img = document.createElement('img')
    img.onload = () => {
      bwSheet = img
      const { naturalWidth: w, naturalHeight: h } = img
      const rw = w / rows, rh = h / cols
      for (let i = 0; i < rows * cols; i++) {
        allPeeps.push(createPeep({ rect: [(i % rows) * rw, ((i / rows) | 0) * rh, rw, rh] }))
      }
      resize()
      gsap.ticker.add(render)
    }
    img.src = src

    // The crowd can start walking before this lands; peeps just fall back to black & white.
    const colorImg = document.createElement('img')
    colorImg.onload = () => {
      colorSheet = colorImg
      colorCell.w = colorImg.naturalWidth / colorCols
      colorCell.h = colorImg.naturalHeight / colorRows
    }
    colorImg.src = colorSrc

    // Observing the canvas (rather than window) also covers the case where the sheet
    // decodes before the element has been laid out, which would otherwise seed the
    // crowd against a zero-width stage and pile everyone at the edge.
    const observer = new ResizeObserver(() => resize())
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      gsap.ticker.remove(render)
      crowd.forEach(p => p.walk?.kill())
    }
  }, [src, colorSrc, rows, cols, colorCols, colorRows, colorCount, coloredCount])

  return <canvas ref={canvasRef} className="absolute left-0 top-0 h-[calc(100%+10rem)] w-full -translate-y-40" />
}
