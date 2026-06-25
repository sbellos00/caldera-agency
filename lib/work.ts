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
// screenshots and full summaries; the newer client sites follow, each pairing a
// Cloudinary screenshot with the live site. Where the consultant's name could not
// be confirmed, `name`/`role` are blank and the card falls back to showing the
// domain as its title.
// {{STEF: fill in summaries, and the missing names/roles for esemenyuk.com and
//  nextspanconsulting.com (see WorkClient card fallback).}}
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
    summary: '',
  },
  {
    name: 'Tim Scott',
    role: 'Founder, True North Supply Chain Advisory',
    url: 'https://www.truenorthsupplychainadvisory.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384510/Screenshot_2026-06-25_at_1.48.14_PM_yttpvr.png',
    summary: '',
  },
  {
    name: '',
    role: '',
    url: 'https://esemenyuk.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384441/Screenshot_2026-06-25_at_1.46.18_PM_u5ptyt.png',
    summary: '',
  },
  {
    name: '',
    role: '',
    url: 'https://www.nextspanconsulting.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384441/Screenshot_2026-06-25_at_1.46.45_PM_ase0fu.png',
    summary: '',
  },
  {
    name: 'Sarah Ziegler',
    role: '',
    url: 'https://sarahziegler.com',
    image: 'https://res.cloudinary.com/dxg4uslo6/image/upload/v1782384441/Screenshot_2026-06-25_at_1.45.41_PM_jkmplp.png',
    summary: '',
  },
]

// Real testimonials shown on the page. Matched to their niche where possible.
// More will be added as the additional client testimonials come in.
// {{STEF: add the testimonials for the 4 new websites here once received.}}
export const workTestimonials: Testimonial[] = [testimonials.piazza, testimonials.scott, testimonials.paul]
