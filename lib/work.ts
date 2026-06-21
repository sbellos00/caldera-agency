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

// Confirmed, live case studies. To add one of the additional client websites,
// drop its screenshot in /public/WorkScreenshots and append an entry here:
//   { name: '...', role: '...', url: 'https://...', image: '/WorkScreenshots/....png', summary: '...' }
// {{STEF: add the 4 additional client websites here as their details come in.}}
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
]

// Real testimonials shown on the page. Matched to their niche where possible.
// More will be added as the additional client testimonials come in.
// {{STEF: add the testimonials for the 4 new websites here once received.}}
export const workTestimonials: Testimonial[] = [testimonials.piazza, testimonials.scott, testimonials.paul]
