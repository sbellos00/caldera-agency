import { testimonials, type Testimonial } from '@/lib/site'

export interface CaseStudy {
  name: string
  role: string
  /** Live site URL (omit if not public yet). */
  url?: string
  /** Screenshot in /public (e.g. /WorkScreenshots/...). */
  image?: string
  summary: string
}

// Live case studies. The two flagship builds (Polaris, Piazza) lead with local
// screenshots; the newer client sites follow, each pairing a Cloudinary screenshot
// with the live site.
export const caseStudies: CaseStudy[] = [
  {
    name: 'Dr. Ron Paul',
    role: 'Founder, Polaris Leadership Institute',
    url: 'https://polarisinstitute.io',
    image: '/WorkScreenshots/Screenshot 2026-03-02 081608.png',
    summary:
      'A full website build for a leadership and culture-transformation practice. Brand development, strategy, design, development, and copywriting, built so his depth of work is obvious within seconds.',
  },
  {
    name: 'Mark S. Piazza',
    role: 'Fractional CFO & Financial Advisor',
    url: 'https://markspiazza.com',
    image: '/WorkScreenshots/Screenshot 2026-03-02 081828.png',
    summary:
      'A compact one-page site: strategy, copy, design, and development, laid out to minimise scrolling and put financial credibility first for founders and boards.',
  },
  {
    name: 'Marcella Schoner',
    role: 'Founder, Boutique HR',
    url: 'https://boutiquehr.agency',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384519/Screenshot_2026-06-25_at_1.45.27_PM_fxxu6e.png',
    summary:
      'A full website build for an HR consultant. Working from the palette and moodboard her brand designer supplied, we implemented the full vision across strategy, design, and development, built so her depth of work and her personality come through instantly.',
  },
  {
    name: 'Tim Scott',
    role: 'Founder, True North Supply Chain Advisory',
    url: 'https://www.truenorthsupplychainadvisory.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384510/Screenshot_2026-06-25_at_1.48.14_PM_yttpvr.png',
    summary:
      'A one-page site for a supply-chain advisory practice: strategy, design, and development.',
  },
  {
    name: 'Ekaterina Semenyuk',
    role: 'Biosafety & Research Safety Consultant',
    url: 'https://esemenyuk.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384441/Screenshot_2026-06-25_at_1.46.18_PM_u5ptyt.png',
    summary:
      'A one-page site: strategy, copy, design, and development, built to present her healthcare expertise, with the branding drawn from Azelia Labs, the lab she works with.',
  },
  {
    name: 'Spencer McGuire-Mitchem',
    role: 'Founder, NextSpan Consulting',
    url: 'https://www.nextspanconsulting.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384441/Screenshot_2026-06-25_at_1.46.45_PM_ase0fu.png',
    summary:
      'A one-page site for his solo consulting company: strategy, copy, design, branding, and development.',
  },
  {
    name: 'Sarah Ziegler',
    role: 'Biosafety & Research Safety Consultant',
    url: 'https://sarahziegler.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384441/Screenshot_2026-06-25_at_1.45.41_PM_jkmplp.png',
    summary:
      'A one-page site: strategy, copy, design, and development, built to present her healthcare expertise, with the branding drawn from Azelia Labs, the lab she works with.',
  },
]

// Real testimonials shown on the page. Matched to their niche where possible.
// More will be added as the additional client testimonials come in.
// {{STEF: add the testimonials for the 4 new websites here once received.}}
export const workTestimonials: Testimonial[] = [testimonials.piazza, testimonials.scott, testimonials.paul]
