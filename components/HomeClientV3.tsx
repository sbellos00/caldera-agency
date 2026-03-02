'use client'

import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import ImageTrail, { ImageTrailItem } from '@/components/ImageTrail'

const PrismaticBurst = dynamic(() => import('@/components/PrismaticBurst'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-[var(--blue-light)] to-[var(--cream)]" />,
})

type HeroOption = 'A' | 'B' | 'C' | 'D'

const options: { key: HeroOption; label: string; desc: string }[] = [
  { key: 'A', label: 'Dark Matte + Bebas', desc: 'Matte dark, Bebas Neue display, grid pattern' },
  { key: 'B', label: 'Gradient Mesh', desc: 'Soft gradient, light weight, animated underline' },
  { key: 'C', label: 'Prismatic + Bold', desc: 'Prismatic bg, bold condensed overlay' },
  { key: 'D', label: 'Image Trail', desc: 'White bg, image trail on mouse, brutalist type' },
]

const trailImages = [
  '/WorkScreenshots/Screenshot 2026-03-02 081608.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081712.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081742.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081805.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081828.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081854.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081910.png',
  '/WorkScreenshots/Screenshot 2026-03-02 081946.png',
  '/WorkScreenshots/Screenshot 2026-03-02 082115.png',
  '/WorkScreenshots/Screenshot 2026-03-02 082135.png',
]

const heroTitle = (
  <>
    <span className="block">The Website Agency</span>
    <span className="block">Built for <span className="text-[var(--primary-blue)]">Solo Consultants</span></span>
  </>
)

const subtitle = 'You do nothing. We build everything.'

export default function HomeV3() {
  const [active, setActive] = useState<HeroOption>('A')

  return (
    <div className="relative">
      {/* Option A: Dark matte + Bebas Neue */}
      {active === 'A' && (
        <section className="h-screen flex items-center justify-center relative bg-[var(--gray-dark)] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          <div className="relative z-10 text-center px-6 w-full max-w-screen-2xl">
            <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tight text-white">
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/40 font-light tracking-tight mt-8">{subtitle}</p>
          </div>
        </section>
      )}

      {/* Option B: Gradient mesh */}
      {active === 'B' && (
        <section className="h-screen flex items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f1efe7 0%, #E6E9FF 30%, #f1efe7 60%, #E6E9FF 100%)' }}>
          <div className="absolute inset-0">
            <div className="absolute w-[800px] h-[800px] rounded-full bg-[var(--primary-blue)]/8 blur-[180px] top-1/4 left-1/3 animate-float-slow" />
            <div className="absolute w-[500px] h-[500px] rounded-full bg-[var(--blue-light)]/30 blur-[150px] bottom-1/3 right-1/4 animate-float-slower" />
          </div>
          <div className="relative z-10 text-center px-6 w-full max-w-screen-2xl">
            <h1 className="hero-title text-[var(--black)]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              <span className="block">The Website Agency</span>
              <span className="block">
                Built for{' '}
                <span className="relative inline-block font-serif italic">
                  <span className="text-[var(--primary-blue)]">Solo Consultants</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--primary-blue)] rounded-full" />
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--gray-medium)] font-light tracking-tight mt-8">{subtitle}</p>
          </div>
        </section>
      )}

      {/* Option C: Prismatic + bold */}
      {active === 'C' && (
        <section className="h-screen flex items-center justify-center relative bg-black overflow-hidden">
          <div className="absolute inset-0">
            <PrismaticBurst intensity={1.5} speed={0.2} animationType="rotate3d"
              colors={['#0019ff', '#e6e9ff', '#f1efe7', '#ffffff', '#000d66']} distort={0} hoverDampness={0} rayCount={0} />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center px-6 w-full max-w-screen-2xl">
            <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tight text-white">
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light tracking-tight mt-8">{subtitle}</p>
          </div>
        </section>
      )}

      {/* Option D: Image Trail + brutalist type */}
      {active === 'D' && (
        <section className="h-screen relative bg-white overflow-hidden">
          <ImageTrail
            threshold={80}
            intensity={0.3}
            keyframes={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9] }}
            keyframesOptions={{
              opacity: { duration: 2, times: [0, 0.01, 0.85, 1] },
              scale: { duration: 2, times: [0, 0.1, 0.85, 1] },
            }}
            repeatChildren={2}
            className="h-full w-full"
          >
            {trailImages.map((src, i) => (
              <ImageTrailItem key={i}>
                <div className="w-48 sm:w-64 relative overflow-hidden shadow-2xl">
                  <Image src={src} alt="Our work" width={640} height={400} className="w-full h-auto" sizes="256px" />
                </div>
              </ImageTrailItem>
            ))}
          </ImageTrail>
          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
            <div className="text-center px-6 w-full max-w-screen-2xl">
              <h1 className="hero-title text-[var(--black)]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
                <span className="block">The Website Agency</span>
                <span className="block">
                  Built for <span className="font-serif italic text-[var(--primary-blue)]">Solo Consultants</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[var(--gray-medium)] font-light tracking-tight mt-8">{subtitle}</p>
            </div>
          </div>
        </section>
      )}

      {/* Floating switcher */}
      <div className="fixed bottom-6 left-6 z-[200]">
        <div className="bg-black/90 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col gap-1.5 min-w-[220px]">
          <p className="text-white/40 text-[10px] uppercase tracking-widest text-center px-2 pb-1">Hero Exploration</p>
          {options.map(({ key, label, desc }) => (
            <button key={key} onClick={() => setActive(key)}
              className={`px-4 py-2.5 rounded-xl text-left transition-all duration-200 ${active === key ? 'bg-[var(--primary-blue)] text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
              <span className="text-xs font-medium block">{label}</span>
              <span className="text-[10px] opacity-60 block mt-0.5">{desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
