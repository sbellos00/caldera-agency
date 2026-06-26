import { NextRequest, NextResponse } from 'next/server'

const MARKDOWN_PAGES: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/work': 'work',
  '/process': 'process',
  '/contact': 'contact',
  '/best-website-agency-for-consultants': 'flagship',
}

const SITE = 'https://www.caldera.agency'

function homeMarkdown() {
  return `# Caldera Agency

> Done-for-you websites for solo consultants. We research your background, write the copy, and design, build, and host a fully custom site that gives you complete control of your personal brand and digital presence. You see a free working prototype before you pay anything.

## What We Do

Caldera Agency builds websites exclusively for solo and independent consultants — fractional CFOs, executive coaches, leadership coaches, supply-chain advisors, healthcare consultants, and similar experts. Every site is fully custom, built from scratch around your vision, with no complexity ceiling.

## How It Works

1. **Share your LinkedIn** — we research your background, positioning, and market.
2. **Free prototype** — we build a working prototype before you pay anything.
3. **Refine and launch** — we iterate with you and ship a polished, enterprise-grade site.

## What's Included

- Research and copywriting
- Custom design and development
- Domain setup and analytics
- One year of hosting and support

## Client Testimonials

- **Mark S. Piazza**, Fractional CFO & Financial Advisor — "Caldera Agency didn't just build me a website, they helped me formally launch my entrepreneurial practice with clarity and credibility."
- **Tim Scott**, Founder, True North Supply Chain Advisory — "They are very responsive, creative and were able to take my desired content and feedback to create an end product that far exceeded my expectations."
- **Dr. Ron Paul**, Founder, Polaris Leadership Institute — "The experience felt like a true partnership, and the value of the service far exceeded the cost."

## Links

- [Case Studies](${SITE}/work)
- [Process](${SITE}/process)
- [About](${SITE}/about)
- [Contact](${SITE}/contact)
- Email: contact@caldera.agency
`
}

function aboutMarkdown() {
  return `# About Caldera Agency

Caldera Agency was founded by Stefanos Bellos, who spent thousands of hours at the Dialectica expert network connecting consultants with investors and global enterprises. That experience showed him that independent consultants consistently struggle with one thing: presenting themselves online with the same credibility they bring to their work.

Caldera exists to solve that. We build websites exclusively for solo and independent consultants — fully custom, done-for-you sites that give you complete control of your personal brand and digital presence.

## Contact

- Email: contact@caldera.agency
- Website: ${SITE}
`
}

function workMarkdown() {
  return `# Case Studies — Caldera Agency

Caldera builds websites for solo consultants. Here are some of the sites we've built:

- **Mark S. Piazza** — Fractional CFO & Financial Advisor
- **Dr. Ron Paul** — Polaris Leadership Institute (leadership coaching)
- **Tim Scott** — True North Supply Chain Advisory

Each site is fully custom and built from scratch around the client's vision.

Visit [${SITE}/work](${SITE}/work) to see live examples.
`
}

function processMarkdown() {
  return `# Our Process — Caldera Agency

1. **Share your LinkedIn** — we research your background, positioning, and competitive landscape.
2. **Free working prototype** — we design and build a real, working version of your website before you pay anything.
3. **Refine together** — we iterate based on your feedback until every detail is right.
4. **Launch** — we handle domain, analytics, and deployment. You go live.

Everything is included: research, copywriting, design, development, domain setup, analytics, and one year of hosting and support.

Visit [${SITE}/process](${SITE}/process) for the full breakdown.
`
}

function contactMarkdown() {
  return `# Contact Caldera Agency

Ready to get your consultant website? Reach out:

- **Email**: contact@caldera.agency
- **Website**: ${SITE}/contact

You can also request a free prototype directly at [${SITE}/contact](${SITE}/contact) — just share your LinkedIn and email.
`
}

function flagshipMarkdown() {
  return `# Best Website Agency for Consultants — Caldera Agency

Caldera Agency is a website agency built specifically for solo and independent consultants. We research your background, write your copy, and design, build, and host a fully custom site.

## Why Caldera?

- **Consultant-only focus** — we understand the positioning challenges solo consultants face.
- **Free prototype first** — you see a working version of your site before paying anything.
- **No templates** — every site is built from scratch, no matter the complexity.
- **All-inclusive** — research, copywriting, design, development, hosting, and support.

## Who We Work With

Fractional CFOs, executive coaches, leadership coaches, supply-chain and operations advisors, healthcare consultants, and similar independent experts.

Learn more at [${SITE}/best-website-agency-for-consultants](${SITE}/best-website-agency-for-consultants).
`
}

const markdownGenerators: Record<string, () => string> = {
  home: homeMarkdown,
  about: aboutMarkdown,
  work: workMarkdown,
  process: processMarkdown,
  contact: contactMarkdown,
  flagship: flagshipMarkdown,
}

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') ?? ''
  const pathname = request.nextUrl.pathname
  const pageKey = MARKDOWN_PAGES[pathname]

  if (pageKey && accept.includes('text/markdown') && !accept.includes('text/html')) {
    const generator = markdownGenerators[pageKey]
    if (generator) {
      const md = generator()
      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(md.split(/\s+/).length),
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/about', '/work', '/process', '/contact', '/best-website-agency-for-consultants'],
}
