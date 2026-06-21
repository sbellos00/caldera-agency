import type { ReactNode } from 'react'

// Shared design primitives that reproduce the homepage's visual language:
// alternating background "bands" (cream / white / dark / blue), the signature
// feature card with a blue-to-blue-dark hover gradient, and glass cards for use
// on dark and blue bands. All server-rendered; pair with <PageFX /> for the
// custom cursor and the scroll-fade reveal.

export type Tone = 'cream' | 'white' | 'dark' | 'blue'

function GridPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(var(--primary-blue) 1px, transparent 1px), linear-gradient(90deg, var(--primary-blue) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

function DotPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '60px 60px' }}
    />
  )
}

/** A full-width section with one of the homepage background treatments. */
export function Band({
  tone,
  children,
  className = 'py-16 md:py-24',
  innerClassName = 'max-w-screen-lg mx-auto',
}: {
  tone: Tone
  children: ReactNode
  className?: string
  innerClassName?: string
}) {
  const toneClass =
    tone === 'cream'
      ? 'bg-[var(--cream)] text-[var(--black)]'
      : tone === 'white'
        ? 'bg-white text-[var(--black)]'
        : tone === 'dark'
          ? 'bg-[var(--black)] text-white noise-overlay'
          : 'bg-[var(--primary-blue)] text-white'

  return (
    <section className={`relative overflow-hidden px-8 md:px-16 ${toneClass} ${className}`}>
      {tone === 'cream' && <GridPattern />}
      {(tone === 'dark' || tone === 'blue') && <DotPattern />}
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </section>
  )
}

/** Small uppercase eyebrow label. */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`scroll-fade text-[var(--primary-blue)] text-sm font-medium tracking-widest uppercase mb-4 ${center ? 'text-center' : ''}`}>
      {children}
    </p>
  )
}

/** Homepage feature card: cream, with a blue-to-blue-dark hover gradient, the blue
 *  icon square that turns white, and text that inverts to white on hover. */
export function FeatureCard({ title, body }: { title: ReactNode; body: ReactNode }) {
  return (
    <div className="feature-card scroll-fade group relative overflow-hidden rounded-2xl bg-[var(--cream)] p-7 md:p-8 transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--blue-dark)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="relative z-10 mb-6 h-10 w-10 rounded-xl bg-[var(--primary-blue)] transition-all duration-300 group-hover:bg-white" />
      <h3 className="relative z-10 mb-3 text-xl font-medium tracking-tight text-[var(--black)] group-hover:text-white">{title}</h3>
      <p className="relative z-10 text-[15px] leading-relaxed text-[var(--gray-medium)] group-hover:text-white">{body}</p>
    </div>
  )
}

/** Glass card for use on dark or blue bands (mirrors the homepage FAQ/work cards). */
export function GlassCard({ title, body }: { title: ReactNode; body: ReactNode }) {
  return (
    <div className="scroll-fade rounded-2xl border border-white/15 bg-white/10 p-7 md:p-8 backdrop-blur-sm">
      <div className="mb-6 h-10 w-10 rounded-xl bg-white/90" />
      <h3 className="mb-3 text-xl font-medium tracking-tight text-white">{title}</h3>
      <p className="text-[15px] leading-relaxed text-white/70">{body}</p>
    </div>
  )
}

/** Serif-italic blue accent, for use inside headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="font-serif italic font-normal text-[var(--primary-blue)]">{children}</span>
}

/* ─── Article prose primitives (for use on light cream/white bands) ─── */

export function ALead({ children }: { children: ReactNode }) {
  return <p className="scroll-fade text-xl md:text-2xl leading-relaxed text-[var(--gray-dark)] font-light mb-6">{children}</p>
}

export function AP({ children }: { children: ReactNode }) {
  return <p className="scroll-fade text-[17px] md:text-[18px] leading-relaxed text-[var(--gray-dark)] font-light mb-6">{children}</p>
}

export function AH2({ children }: { children: ReactNode }) {
  return <h2 className="scroll-fade text-[clamp(26px,3.6vw,40px)] font-light tracking-tight leading-tight text-[var(--black)] mb-6 mt-2">{children}</h2>
}

export function ABullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="scroll-fade mb-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[10px] h-2 w-2 flex-shrink-0 rounded-full bg-[var(--primary-blue)]" />
          <span className="text-[17px] md:text-[18px] leading-relaxed text-[var(--gray-dark)] font-light">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** White card with dot-bullet items. Best placed on a cream band so it pops. */
export function CalloutCard({ title, items }: { title?: ReactNode; items: ReactNode[] }) {
  return (
    <div className="scroll-fade rounded-2xl border border-[var(--gray-light)] bg-white p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
      {title && <h3 className="mb-5 text-xl font-medium text-[var(--black)]">{title}</h3>}
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-[10px] h-2 w-2 flex-shrink-0 rounded-full bg-[var(--primary-blue)]" />
            <span className="text-[16px] md:text-[17px] leading-relaxed text-[var(--gray-dark)]">{it}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** White card with numbered circles. */
export function NumberedCard({ items }: { items: ReactNode[] }) {
  return (
    <div className="scroll-fade rounded-2xl border border-[var(--gray-light)] bg-white p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary-blue)]">
              <span className="text-sm text-white">{i + 1}</span>
            </div>
            <span className="text-[16px] md:text-[17px] leading-relaxed text-[var(--gray-dark)]">{it}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** White card with heading + body per item (for benefit/definition lists). */
export function DefinitionCard({ items }: { items: { h: ReactNode; b: ReactNode }[] }) {
  return (
    <div className="scroll-fade rounded-2xl border border-[var(--gray-light)] bg-white p-7 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
      <div className="space-y-6">
        {items.map((it, i) => (
          <div key={i}>
            <h4 className="mb-2 text-lg font-medium text-[var(--black)]">{it.h}</h4>
            <p className="text-[16px] leading-relaxed text-[var(--gray-dark)]">{it.b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Left-accented italic pull quote, for use inside white/cream bands. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-fade my-8 border-l-2 border-[var(--primary-blue)]/40 bg-gradient-to-r from-[var(--blue-light)]/30 to-transparent py-3 pl-6">
      <p className="text-lg md:text-xl font-light italic leading-relaxed text-[var(--gray-dark)]">{children}</p>
    </div>
  )
}

/** Native, JS-free accordion item styled for the blue FAQ band (homepage style). */
export function GlassFaq({ q, a }: { q: string; a: string }) {
  return (
    <details className="scroll-fade group rounded-2xl border border-white/20 bg-white/10 p-5 md:p-6 backdrop-blur-sm [&_summary]:cursor-pointer">
      <summary className="flex list-none items-center justify-between gap-4">
        <h3 className="text-base md:text-lg font-normal text-white">{q}</h3>
        <span className="text-2xl font-light leading-none text-white transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <p className="mt-4 text-[15px] leading-relaxed text-white/85">{a}</p>
    </details>
  )
}
