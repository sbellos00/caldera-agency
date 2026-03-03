'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CrowdCanvasProps {
  src: string
  rows?: number
  cols?: number
}

type Peep = {
  image: HTMLImageElement
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
  setRect: (rect: number[]) => void
  render: (ctx: CanvasRenderingContext2D) => void
}

export default function CrowdCanvas({ src, rows = 15, cols = 7 }: CrowdCanvasProps) {
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

    const createPeep = ({ image, rect }: { image: HTMLImageElement; rect: number[] }): Peep => {
      const peep: Peep = {
        image, rect: [], baseWidth: 0, baseHeight: 0, width: 0, height: 0, x: 0, y: 0, anchorY: 0, scaleX: 1, walk: null,
        setRect: (r: number[]) => { peep.rect = r; peep.baseWidth = r[2]; peep.baseHeight = r[3]; peep.width = r[2]; peep.height = r[3] },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save()
          ctx.translate(peep.x, peep.y)
          ctx.scale(peep.scaleX, 1)
          ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height)
          ctx.restore()
        },
      }
      peep.setRect(rect)
      return peep
    }

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1
      const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random())
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

    const initCrowd = () => { while (availablePeeps.length) addPeepToCrowd().walk?.progress(Math.random()) }

    const render = () => {
      if (!canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(devicePixelRatio, devicePixelRatio)
      crowd.forEach(p => p.render(ctx))
      ctx.restore()
    }

    const resize = () => {
      if (!canvas) return
      stage.width = canvas.clientWidth
      stage.height = canvas.clientHeight
      canvas.width = stage.width * devicePixelRatio
      canvas.height = stage.height * devicePixelRatio

      // Scale peeps down on narrow viewports so they don't dominate mobile screens
      const scale = Math.min(1, stage.width / 900)
      allPeeps.forEach(p => { p.width = p.baseWidth * scale; p.height = p.baseHeight * scale })

      crowd.forEach(p => p.walk?.kill())
      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps)
      initCrowd()
    }

    const img = document.createElement('img')
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img
      const rw = w / rows, rh = h / cols
      for (let i = 0; i < rows * cols; i++) {
        allPeeps.push(createPeep({ image: img, rect: [(i % rows) * rw, ((i / rows) | 0) * rh, rw, rh] }))
      }
      resize()
      gsap.ticker.add(render)
    }
    img.src = src

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(render)
      crowd.forEach(p => p.walk?.kill())
    }
  }, [src, rows, cols])

  return <canvas ref={canvasRef} className="absolute left-0 top-0 h-[calc(100%+10rem)] w-full -translate-y-40" />
}
