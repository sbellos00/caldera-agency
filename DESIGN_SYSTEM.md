# Caldera Agency — Design System

A complete reference for reproducing the Caldera visual identity across any medium: websites, social posts, pitch decks, print, and more.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing & Border Radius](#4-spacing--border-radius)
5. [Shadows & Elevation](#5-shadows--elevation)
6. [Gradients](#6-gradients)
7. [Visual Effects & Textures](#7-visual-effects--textures)
8. [Motion & Animation](#8-motion--animation)
9. [Component Patterns](#9-component-patterns)
10. [Layout & Grid](#10-layout--grid)
11. [Responsive Breakpoints](#11-responsive-breakpoints)
12. [Dark Mode](#12-dark-mode)
13. [Iconography](#13-iconography)
14. [Quick-Reference Cheat Sheet](#14-quick-reference-cheat-sheet)

---

## 1. Design Philosophy

### Core Principles

**Minimalist Authority** — Every element earns its place. White space is the dominant visual element, letting content breathe and conveying confidence. Less is more; restraint signals sophistication.

**Blue as a Precision Tool** — The brand blue (`#0019ff`) is used sparingly and intentionally — as an accent, a call-to-action highlight, or a subtle hover state. It never overwhelms. It punctuates.

**Light Weight, Heavy Impact** — Headlines use `font-weight: 300` (light). The design conveys power through scale and spacing, not through boldness. Large type at light weight feels editorial and premium.

**Fluid, Not Static** — Typography and spacing scale fluidly with the viewport using `clamp()`. Nothing snaps awkwardly between breakpoints. The experience feels continuously adaptive.

**Subtle Motion Everywhere** — Floating blurred shapes, scroll-triggered reveals, smooth cursor trails, parallax — animation is ambient and organic, never jarring. It creates a sense of a living, breathing interface.

**Texture over Flatness** — Subtle grain overlays, glassmorphism (`backdrop-filter: blur`), and gradient orbs add depth without weight. The aesthetic is modern but tactile.

### Design DNA Summary

| Trait | Expression |
|-------|-----------|
| Personality | Confident, refined, editorial |
| Mood | Calm precision, quiet luxury |
| Dominant color | White / off-white (#FAF8F5) |
| Accent | Electric blue (#0019ff) |
| Typography feel | Light, spacious, serif logo |
| Motion | Slow, organic, ambient |
| Texture | Grain overlays, blurred orbs, glassmorphism |

---

## 2. Color Palette

### Brand Colors (Primary Palette)

| Name | Variable | Hex | RGB | Usage |
|------|----------|-----|-----|-------|
| **Primary Blue** | `--primary-blue` | `#0019FF` | 0, 25, 255 | CTAs, links, accents, hover states, cursor |
| **Blue Light** | `--blue-light` | `#E6E9FF` | 230, 233, 255 | Backgrounds, bonus items, icon borders, floating shapes |
| **Blue Dark** | `--blue-dark` | `#000D66` | 0, 13, 102 | Gradient endpoints, deep blue accent |

### Neutral Colors

| Name | Variable | Hex | RGB | Usage |
|------|----------|-----|-----|-------|
| **Black** | `--black` | `#000000` | 0, 0, 0 | Primary text color, dark backgrounds |
| **Gray Dark** | `--gray-dark` | `#111111` | 17, 17, 17 | Footer background, near-black surfaces |
| **Gray Medium** | `--gray-medium` | `#5C5C5C` | 92, 92, 92 | Secondary/muted text, placeholders |
| **Gray Light** | `--gray-light` | `#F5F5F7` | 245, 245, 247 | Card borders, light surface backgrounds |
| **Cream** | `--cream` | `#FAF8F5` | 250, 248, 245 | Warm off-white sections, input backgrounds |
| **White** | `--white` | `#FFFFFF` | 255, 255, 255 | Primary background, card surfaces |

### Semantic Colors (shadcn/ui theme — OKLCh)

These use the perceptually uniform OKLCh color space for consistent contrast ratios.

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| **Background** | `#FFFFFF` | `oklch(0.129 0.042 264.695)` |
| **Foreground** | `oklch(0.129 0.042 264.695)` | `oklch(0.984 0.003 247.858)` |
| **Primary** | `oklch(0.208 0.042 265.755)` | `oklch(0.929 0.013 255.508)` |
| **Primary Foreground** | `oklch(0.984 0.003 247.858)` | `oklch(0.208 0.042 265.755)` |
| **Secondary** | `oklch(0.968 0.007 247.896)` | `oklch(0.279 0.041 260.031)` |
| **Muted** | `oklch(0.968 0.007 247.896)` | `oklch(0.279 0.041 260.031)` |
| **Muted Foreground** | `oklch(0.554 0.046 257.417)` | `oklch(0.704 0.04 256.788)` |
| **Destructive** | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| **Border** | `oklch(0.929 0.013 255.508)` | `oklch(1 0 0 / 10%)` |
| **Input** | `oklch(0.929 0.013 255.508)` | `oklch(1 0 0 / 15%)` |
| **Ring** | `oklch(0.704 0.04 256.788)` | `oklch(0.551 0.027 264.364)` |

### Chart Colors

| Name | Light Mode | Dark Mode |
|------|-----------|-----------|
| Chart 1 | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` |
| Chart 2 | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` |
| Chart 3 | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` |
| Chart 4 | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` |
| Chart 5 | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` |

### Opacity Conventions

Blue is frequently used at reduced opacity for atmospheric effects:

| Pattern | Value |
|---------|-------|
| Blue shadow (resting) | `rgba(0, 25, 255, 0.08)` to `rgba(0, 25, 255, 0.1)` |
| Blue shadow (hover) | `rgba(0, 25, 255, 0.12)` to `rgba(0, 25, 255, 0.2)` |
| Blue shimmer on cards | `rgba(0, 25, 255, 0.08)` |
| White glass border | `rgba(255, 255, 255, 0.2)` |
| Dark overlay (menu) | `opacity: 0.98` on black |
| Dot grid pattern | `opacity: 0.02` on white |
| Footer text (muted) | `text-white/40` |
| Footer text (readable) | `text-white/70` |

### Text Selection

```css
::selection {
  background: var(--primary-blue);  /* #0019FF */
  color: var(--white);              /* #FFFFFF */
}
```

---

## 3. Typography

### Font Stack

| Role | Font | Variable | Fallback Stack |
|------|------|----------|---------------|
| **Body** | System fonts | — | `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif` |
| **Sans** | Geist Sans | `--font-geist-sans` | System sans-serif |
| **Mono** | Geist Mono | `--font-geist-mono` | System monospace |
| **Display** | Bebas Neue | `--font-bebas` | — (weight 400) |
| **Logo** | Times New Roman | `.caldera-logo` class | `Times, serif` |

### Logo Typography

```css
.caldera-logo {
  font-family: "Times New Roman", Times, serif;
  font-stretch: condensed;
  letter-spacing: -0.05em;
  font-weight: 400;
}
```

The logo is always set in **Times New Roman**, condensed, with tight tracking. It reads "caldera.agency" in all lowercase. It's never bold. At large sizes (footer), it's set at `17.5vw` for a massive brand statement.

### Type Scale — Headlines

All headlines use `font-weight: 300` (light) with negative letter-spacing.

| Class | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|---------------|-------|
| `.hero-title` | `clamp(40px, 6vw, 72px)` | `0.95` (mobile) / `1` (desktop) | `-0.04em` | Primary hero headlines |
| `.section-title` | `clamp(36px, 5.5vw, 68px)` | `0.95` | `-0.03em` | Primary section headlines |
| `.section-title-secondary` | `clamp(28px, 4vw, 48px)` | `1.1` | `-0.02em` | Secondary/supporting section headlines |

### Type Scale — Body & UI

| Context | Size | Weight | Tracking |
|---------|------|--------|----------|
| Body text | `text-base` (16px) | 400 | Normal |
| Body large | `text-lg` / `md:text-xl` (18-20px) | 300-400 | Normal |
| Muted captions | `text-sm` (14px) | 400 | Normal |
| Menu nav links | `text-4xl` / `md:text-6xl` / `lg:text-7xl` | 300 (light) | `tracking-tight` |
| Preloader text | `text-3xl` / `sm:text-4xl` / `md:text-5xl` | Serif italic | `tracking-tight` |
| CTA buttons | `text-lg` (18px) | 500 (medium) | `tracking-tight` |
| Cursor label | `11px` | 500 | `0.05em`, uppercase |
| Footer copyright | `text-sm` (14px) | 400 | Normal |

### Key Typography Conventions

- **Headlines are always light weight** (`font-weight: 300`), never bold
- **Letter-spacing is always negative** on headlines (`-0.02em` to `-0.05em`)
- **Line-height is tight** on headlines (`0.85` to `1.1`)
- **Serif is reserved exclusively for the logo** (Times New Roman)
- **Italic serif** appears only in the preloader ("You do nothing. We build everything.")
- **Uppercase** is used only for the cursor label and small UI markers
- Feature list items use `→` as a prefix in `var(--primary-blue)`

---

## 4. Spacing & Border Radius

### Border Radius System

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--radius` (base) | `0.625rem` | 10px | Base unit |
| `--radius-sm` | `calc(var(--radius) - 4px)` | 6px | Small elements |
| `--radius-md` | `calc(var(--radius) - 2px)` | 8px | Medium elements |
| `--radius-lg` | `var(--radius)` | 10px | Default cards |
| `--radius-xl` | `calc(var(--radius) + 4px)` | 14px | Large cards |

### Custom Radius Values Used in Components

| Value | Pixels | Usage |
|-------|--------|-------|
| `0.75rem` | 12px | FAQ items (mobile), small cards |
| `0.875rem` | 14px | List items (invitation, bonus) |
| `1.5rem` | 24px | Invitation card |
| `1.75rem` | 28px | Card background glow |
| `rounded-full` | 9999px | Buttons, icons, cursor |

### Layout Spacing Patterns

| Pattern | Value |
|---------|-------|
| Page horizontal padding | `px-6 md:px-8 lg:px-16` |
| Max content width | `max-w-screen-2xl mx-auto` |
| Section vertical padding | `pt-16 md:pt-20 pb-12 md:pb-16` |
| Section spacing (mobile) | `padding-bottom: 3rem` |
| Card inner padding | `1.25rem` (mobile) → `1.5rem` → `2rem` (tablet) → `3rem` (desktop) |
| List item padding | `1.25rem` |
| List item gap | `1rem` |
| Menu link spacing | `space-y-6 md:space-y-8` |
| Marquee gap | `80px` |

---

## 5. Shadows & Elevation

### Shadow Scale

All shadows are blue-tinted to reinforce brand cohesion.

| State | Value | Usage |
|-------|-------|-------|
| **Card resting** | `0 8px 32px rgba(0, 25, 255, 0.1)` | Deliverable cards |
| **Card hover** | `0 12px 48px rgba(0, 25, 255, 0.2)` | Deliverable cards on hover |
| **Invitation resting** | `0 20px 60px -20px rgba(0, 25, 255, 0.08)` | Invitation card |
| **Invitation hover** | `0 20px 50px -15px rgba(0, 25, 255, 0.15)` | Invitation card on hover |
| **Invitation (mobile)** | `0 10px 30px -10px rgba(0, 25, 255, 0.08)` | Compact mobile shadow |
| **List item hover** | `0 4px 12px rgba(0, 25, 255, 0.08)` | List items |
| **Bonus item hover** | `0 6px 16px rgba(0, 25, 255, 0.12)` | Bonus list items |
| **Premium badge** | `0 4px 12px rgba(0, 25, 255, 0.3)` | Badge/label elements |

### Key Shadow Principles

- **Never use gray/black shadows** — always use blue-tinted `rgba(0, 25, 255, ...)`
- **Negative spread** on large shadows (`-20px`, `-15px`) keeps them tight
- **Hover increases blur AND opacity** for a "lifting" effect
- Cards physically lift on hover (`transform: translateY(-6px)`)

---

## 6. Gradients

### Primary Gradients

| Name | CSS | Usage |
|------|-----|-------|
| **Hero card** | `linear-gradient(135deg, var(--primary-blue) 0%, var(--blue-dark) 100%)` | Deliverable hero card |
| **Card glow BG** | `linear-gradient(135deg, var(--blue-light), transparent, var(--blue-light))` | Invitation card outer glow |
| **Offer shape 1** | `linear-gradient(135deg, var(--blue-light) 0%, var(--primary-blue)/30 100%)` | Decorative floating shape |
| **Offer shape 2** | `linear-gradient(225deg, var(--primary-blue)/20 0%, var(--blue-light)/40 100%)` | Decorative floating shape |
| **Shimmer** | `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)` | Card hover sweep effect |
| **Blue shimmer** | `linear-gradient(90deg, transparent, rgba(0, 25, 255, 0.08), transparent)` | Card hover sweep (light cards) |

### Radial Gradients

| Name | CSS | Usage |
|------|-----|-------|
| **Deliverable shape 1** | `radial-gradient(circle, var(--blue-light) 0%, var(--primary-blue)/20 40%, transparent 70%)` | Large decorative orb |
| **Deliverable shape 2** | `radial-gradient(circle, var(--primary-blue) 0%, var(--blue-light)/30 50%, transparent 70%)` | Secondary orb |
| **Deliverable shape 3** | `radial-gradient(circle, var(--primary-blue)/40 0%, var(--blue-light)/20 60%, transparent 80%)` | Tertiary orb |
| **Offer shape 3** | `radial-gradient(circle, var(--primary-blue)/15 0%, transparent 70%)` | Subtle atmospheric orb |
| **Footer dot pattern** | `radial-gradient(circle at 1px 1px, white 1px, transparent 0)` at `60px 60px` | Subtle dot grid |
| **Generic radial** | `.bg-gradient-radial` — `radial-gradient(circle, var(--tw-gradient-stops))` | Utility class |

### Gradient Principles

- **135° diagonal** is the default gradient direction (top-left to bottom-right)
- Gradients always go from **blue-light to blue-dark** or **blue to transparent**
- Radial gradients fade to `transparent` at the edges for soft, organic shapes
- Shimmer effects use a horizontal sweep (`90°`) that slides from `-100%` to `100%`

---

## 7. Visual Effects & Textures

### Grain/Noise Overlay

Applied via the `.noise-overlay` class using an inline SVG fractal noise filter:

```css
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* fractalNoise, baseFrequency: 0.9, 4 octaves */
  background-size: 128px 128px;
  opacity: 0.04;  /* Very subtle */
  pointer-events: none;
  z-index: 1;
}
```

Use on dark sections to add analog texture. Keep opacity at `0.04` — it should be felt, not seen.

### Glassmorphism (Backdrop Blur)

Used on cards and UI elements for depth:

| Element | Blur | Border | Background |
|---------|------|--------|-----------|
| Deliverable cards | `backdrop-filter: blur(10px)` | `1px solid rgba(255, 255, 255, 0.2)` | Semi-transparent |
| Premium deliverables | `backdrop-filter: blur(10px)` | — | Semi-transparent |
| Premium badge | `backdrop-filter: blur(10px)` | — | With blue shadow |
| Menu button | `backdrop-blur-sm` (Tailwind) | `1px solid white/20` or `black/10` | `white/10` or `black/5` |
| Card glow | `filter: blur(12px)` | — | Gradient background |

### Floating Shapes (Decorative Blurred Orbs)

Large, blurred, circular shapes that float slowly across sections. Core visual identity element.

```css
.floating-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);     /* Very soft edges */
  opacity: 0.6;            /* Semi-transparent */
  animation: float 20s infinite ease-in-out;
}
```

| Shape | Size | Blur | Color | Position |
|-------|------|------|-------|----------|
| Shape 1 | 600×600px | 120px | `var(--blue-light)` | top-right |
| Shape 2 | 400×400px | 100px | `var(--primary-blue)` | bottom-left |
| Deliverable 1 | 900×900px | 100px | Radial gradient (blue-light → blue) | top-right |
| Deliverable 2 | 700×700px | 100px | Radial gradient (blue → blue-light) | bottom-left |
| Deliverable 3 | 500×500px | 100px | Radial gradient (blue → blue-light) | center |
| Process 1 | 700×700px | 100px | `var(--blue-light)` | top-left |
| Process 2 | 600×600px | 100px | `var(--primary-blue)` at 0.3 opacity | top-right |
| Process 3 | 500×500px | 100px | `var(--blue-light)` at 0.5 opacity | center |

### Dot Grid Pattern (Footer)

```css
background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
background-size: 60px 60px;
opacity: 0.02;
```

### Custom Cursor

A branded cursor system with three layers:

1. **Outer ring** — 40×40px circle, 2px `var(--primary-blue)` border
2. **Inner dot** — 6×6px solid `var(--primary-blue)` circle
3. **Text label** — 11px uppercase, white with `mix-blend-mode: difference`

The cursor follows the mouse with GSAP-smoothed trailing for the outer ring.

---

## 8. Motion & Animation

### Animation Library

The project uses three animation engines:
- **Framer Motion** — Component enter/exit animations, layout transitions
- **GSAP + ScrollTrigger** — Scroll-driven animations, cursor smoothing, parallax
- **Lenis** — Smooth scrolling (replaces native scroll)

### Keyframe Animations

| Name | Duration | Timing | Description |
|------|----------|--------|-------------|
| `float` | 20s | ease-in-out, infinite | Slow wandering with rotation (floating shapes) |
| `deliverableFloat` | 25s | ease-in-out, infinite | Wandering + rotation + scale pulse |
| `fadeInUp` | 0.8s | ease-out, forwards | Fade in from 40px below |
| `heroLineReveal` | 1s | `cubic-bezier(0.16, 1, 0.3, 1)`, forwards | Dramatic slide-up from 100% offset |
| `marquee` | 30s (desktop) / 10s (mobile) | linear, infinite | Horizontal scroll loop |
| `floatSlow` | 4s | ease-in-out, infinite | Gentle up/right drift |
| `floatSlower` | 6s | ease-in-out, infinite | Slower left/up drift |
| `floatFast` | 3s | ease-in-out, infinite | Quick small drift |
| `process-arrow-bounce` | — | — | Subtle vertical bounce + opacity pulse |
| `spin` (slow) | 20s | linear, infinite | Full rotation |
| `background-gradient` | — | — | Multi-point translation with CSS custom properties |

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| **Preloader ease** | `[0.22, 1, 0.36, 1]` | Framer Motion preloader |
| **Stair wipe** | `[0.455, 0.03, 0.515, 0.955]` | Preloader stair exit |
| **Smooth decelerate** | `cubic-bezier(0.4, 0, 0, 1)` | Scroll fade, card hover, invitation transitions |
| **Spring-like** | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero line reveal |
| **Standard ease** | `ease` / `ease-out` / `ease-in-out` | General transitions |

### Scroll Animations

```css
.scroll-fade {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s cubic-bezier(0.4, 0, 0, 1);
}

.scroll-fade.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children: +0.1s per child */
.scroll-fade:nth-child(1) { transition-delay: 0s; }
.scroll-fade:nth-child(2) { transition-delay: 0.1s; }
.scroll-fade:nth-child(3) { transition-delay: 0.2s; }
.scroll-fade:nth-child(4) { transition-delay: 0.3s; }
```

### Hero Line Reveal (Staggered)

Three lines reveal sequentially with increasing delays:

```css
.hero-line-reveal   { animation-delay: 0.3s; }
.hero-line-reveal-2 { animation-delay: 0.6s; }
.hero-line-reveal-3 { animation-delay: 1.0s; }
```

### Preloader

A "stair wipe" exit: 10 vertical columns (`10vw` each) in `var(--primary-blue)` slide away in sequence with 0.05s stagger. Text appears word-by-word with 0.2s stagger.

### Transition Durations

| Duration | Usage |
|----------|-------|
| `0.2s` | Cursor text opacity, quick toggles |
| `0.3s` | List item hover, icon transitions, link colors |
| `0.5s` | Menu overlay, stair wipe columns |
| `0.6s` | Card shimmer sweep, word reveal |
| `0.7s` | Scroll fade, premium card shimmer |
| `0.8s` | Card hover, invitation glow, hero card shimmer, fade-in-up |
| `1.0s` | Hero line reveal |

### Motion Principles

- **Ambient motion is slow** (20-30s cycles) — shapes float like clouds
- **Interactive motion is fast** (0.3-0.8s) — responds quickly to user action
- **Everything decelerates** — `cubic-bezier(0.4, 0, 0, 1)` is the signature easing
- **Stagger reveals** at 0.1s intervals for groups of elements
- **translateY(40px)** is the standard reveal offset
- **Hover lifts** cards by `-2px` to `-6px`

---

## 9. Component Patterns

### Primary CTA Button

```html
<button class="inline-flex items-center gap-3 bg-[var(--primary-blue)] text-white
  px-8 py-4 text-lg font-medium tracking-tight rounded-full relative overflow-hidden
  transition-all duration-300 ease-out hover:scale-105 group">
  <div class="absolute inset-0 bg-white transform -translate-x-full
    transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
  <span class="relative z-10 group-hover:text-[var(--primary-blue)]
    transition-colors duration-300">Start Your Project</span>
  <span class="relative z-10 group-hover:text-[var(--primary-blue)]
    transition-colors duration-300">→</span>
</button>
```

**Behavior:** Blue pill button. On hover, a white fill sweeps in from the left, text inverts to blue, button scales up 5%.

### Menu Button (Hamburger)

- Circular, `rounded-full`, with `backdrop-blur-sm`
- Light mode: `bg-black/5`, `border border-black/10`
- Dark mode: `bg-white/10`, `border border-white/20`
- Two lines (top/bottom), 0.5px height, 20px wide
- On hover: fills `var(--primary-blue)`, lines turn white
- On open: lines rotate ±45° to form an X

### Navigation Links (Full-screen Menu)

```
text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight
```

- Underline grows from left on hover (`width: 0 → 100%` in `var(--primary-blue)`)
- Text color shifts to `var(--blue-light)` on hover
- `transition-all duration-300`

### Cards

**Deliverable Card (Glass):**
- `backdrop-filter: blur(10px)`
- `border: 1px solid rgba(255, 255, 255, 0.2)`
- `box-shadow: 0 8px 32px rgba(0, 25, 255, 0.1)`
- Shimmer sweep on hover (blue-tinted gradient slides left-to-right)
- Border intensifies, shadow deepens on hover

**Invitation Card:**
- Outer glow wrapper with 2px padding
- Gradient glow behind card (`blur: 12px`, `opacity: 0.6 → 1` on hover)
- White background, `border-radius: 1.5rem`
- Lifts `-6px` on hover

### List Items

**Standard Item:**
- `bg: #f8f9fb` → `#ffffff` on hover
- Border goes from `transparent` → `var(--blue-light)` on hover
- Icon: white circle with blue border → solid blue with white icon on hover
- Lifts `-2px` on hover

**Bonus Item:**
- `bg: var(--blue-light)` → `#E0E4FF` on hover
- Border goes from `transparent` → `var(--primary-blue)` on hover
- Icon: solid blue → solid black + `scale(1.1)` on hover

### Feature List Arrow

```css
.feature-list-item::before {
  content: '→';
  color: var(--primary-blue);
  font-weight: 600;
}
```

### Footer

- Background: `var(--black)` (#000000)
- Dot grid overlay at 2% opacity
- Logo at `17.5vw` — massive, edge-to-edge brand statement
- Links in `text-white/50`, hover to `text-white`
- Copyright in `text-white/40`
- Border separator: `border-white/10`

### Form Inputs

| Variant | Background | Border | Text | Focus |
|---------|-----------|--------|------|-------|
| Light | `var(--cream)` | `var(--cream)` | 15px | `ring-2 ring-[var(--primary-blue)]` |
| Dark | `white/10` | `white/20` | white, 15px | `ring-2 ring-white/40` |
| Minimal | `var(--cream)` | none | 15px | none visible |

---

## 10. Layout & Grid

### Container

```
max-w-screen-2xl mx-auto px-6 md:px-8 lg:px-16
```

- Max width: `1536px` (Tailwind's `screen-2xl`)
- Horizontal padding scales: `24px → 32px → 64px`

### Section Pattern

```html
<section class="relative overflow-hidden">
  <!-- Floating decorative shapes (absolute, z-0) -->
  <div class="floating-shape shape-1"></div>
  <div class="floating-shape shape-2"></div>

  <!-- Content (relative, z-10) -->
  <div class="relative z-10 px-6 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
    <!-- Section content -->
  </div>
</section>
```

### Marquee Pattern

```html
<div class="overflow-hidden">
  <div class="marquee">
    <div class="marquee-content">
      <!-- Items with 80px gap -->
    </div>
    <div class="marquee-content" aria-hidden="true">
      <!-- Duplicate for seamless loop -->
    </div>
  </div>
</div>
```

Desktop: 30s cycle. Mobile: 10s cycle.

---

## 11. Responsive Breakpoints

Uses Tailwind's default breakpoint system:

| Breakpoint | Min Width | Prefix |
|-----------|----------|--------|
| Mobile | 0px | (default) |
| SM | 640px | `sm:` |
| MD | 768px | `md:` |
| LG | 1024px | `lg:` |
| XL | 1280px | `xl:` |
| 2XL | 1536px | `2xl:` |

### Key Responsive Behaviors

| Element | Mobile | Tablet (md) | Desktop (lg+) |
|---------|--------|-------------|---------------|
| Page padding | `px-6` | `px-8` | `px-16` |
| Hero title | `clamp(40px, ...)`, `line-height: 0.95` | `line-height: 1` | — |
| Menu links | `text-4xl` | `text-6xl` | `text-7xl` |
| Invitation card padding | `1.25rem` | `2rem 1.5rem` | `3rem` |
| Marquee speed | 10s | 30s | 30s |
| Timeline line | Hidden | Visible | Visible |
| Section spacing | `pb-3rem` | Standard | Standard |

### Scrollbar

Hidden on all platforms:
```css
::-webkit-scrollbar { width: 0px; background: transparent; }  /* Chrome/Safari */
html { scrollbar-width: none; }  /* Firefox */
```

---

## 12. Dark Mode

Activated by adding `.dark` class to a container element. Uses `@custom-variant dark (&:is(.dark *))`.

### Key Dark Mode Shifts

| Property | Light | Dark |
|----------|-------|------|
| Background | `#FFFFFF` | Very dark blue-gray |
| Text | Near-black | Near-white |
| Cards | White | Dark blue-gray |
| Borders | Light gray | `white/10` |
| Input | Light gray | `white/15` |
| Primary | Dark | Light (inverted) |

### Theme Transition

The `.theme-container` class ensures text color changes are instant (not animated) while other properties transition smoothly:

```css
.theme-container * {
  transition-property: background-color, border-color, opacity, box-shadow,
    transform, translate, scale, rotate, filter, backdrop-filter !important;
}
```

---

## 13. Iconography

- **Icon library:** Lucide React (`lucide-react`)
- **Icon size in list items:** `1.5rem` (24px) in circular containers
- **Arrow convention:** `→` character (not an icon) for inline arrows and list prefixes
- **Menu hamburger:** Custom CSS lines (not an icon library)

---

## 14. Quick-Reference Cheat Sheet

### Use These Colors

```
Brand blue:    #0019FF
Light blue:    #E6E9FF
Dark blue:     #000D66
Cream:         #FAF8F5
Black:         #000000
Near-black:    #111111
Medium gray:   #5C5C5C
Light gray:    #F5F5F7
White:         #FFFFFF
```

### Use These Fonts

```
Body:   -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif
Logo:   "Times New Roman", Times, serif  (condensed, -0.05em tracking, weight 400)
Code:   Geist Mono
Display: Bebas Neue (weight 400)
```

### Use These Rules

- Headlines: `font-weight: 300`, negative letter-spacing, tight line-height
- Shadows: Always blue-tinted `rgba(0, 25, 255, ...)`
- Hover: Lift (`translateY(-2px to -6px)`), deepen shadow, intensify border
- Easing: `cubic-bezier(0.4, 0, 0, 1)` for most transitions
- Floating shapes: Large (400-900px), blurred (80-120px), slow (20-30s), blue palette
- Cards: Glassmorphism with blue shadows, shimmer sweep on hover
- Buttons: Pill shape (`rounded-full`), blue → white fill sweep on hover
- Grain overlay: SVG noise at 4% opacity on dark sections
- Dot grid: White dots at 2% opacity, 60px spacing
- Text selection: Blue background, white text

### Do NOT

- Use bold headlines (always `font-weight: 300`)
- Use gray/black shadows (always blue-tinted)
- Use serif fonts outside of the logo
- Use sharp corners on interactive elements (always rounded)
- Use abrupt animations (always ease-out or decelerate)
- Override the blue brand color — `#0019FF` is non-negotiable

---

## Technology Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | v4 | Utility-first CSS |
| `framer-motion` / `motion` | ^12.34.3 | Component animations |
| `gsap` | ^3.14.2 | Scroll animations, cursor |
| `lenis` | ^1.3.17 | Smooth scroll |
| `lucide-react` | ^0.525.0 | Icons |
| `clsx` | ^2.1.1 | Conditional classes |
| `tailwind-merge` | ^3.3.1 | Merge Tailwind classes |
| `class-variance-authority` | ^0.7.1 | Component variants |
| `tw-animate-css` | ^1.3.5 | Animation utilities |
| `three` / `ogl` | — | WebGL effects (Aurora, LightRays) |

---

*This document is the single source of truth for the Caldera Agency visual identity. When in doubt, refer back to the core principle: minimalist authority — let the whitespace speak.*
