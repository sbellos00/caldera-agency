// Screen recordings and hero stills of the case-study sites, used on the
// /landing pages. Keyed by the case study's `name` in lib/work.
//
// {{STEF: the videos live in /public/landing/videos for now because the
// Cloudinary upload was not possible. To serve them from Cloudinary instead,
// replace each `video` path with its Cloudinary URL; nothing else changes.}}
export interface CaseMedia {
  /** Page-tour recording (mp4, 1280×720, silent). */
  video: string
  /** Hero frame of the same site, used as the video poster and as a still. */
  still: string
}

const media = (slug: string): CaseMedia => ({
  video: `/landing/videos/${slug}.mp4`,
  still: `/landing/shots/${slug}.webp`,
})

export const caseMedia: Record<string, CaseMedia> = {
  'Dr. Ron Paul': media('polaris-leadership-institute'),
  'Mark S. Piazza': media('mark-piazza'),
  'Michael D. Costello III': media('drone1-consulting'),
  'Spencer McGuire-Mitchem': media('nextspan-consulting'),
  'Ekaterina Semenyuk': media('ekaterina-semenyuk'),
  'Sarah Ziegler': media('sarah-ziegler'),
  'David Zurita': media('dkz-consulting'),
  'Francis Dumont': media('fran-dumont-advisory'),
  'Tim Scott': media('true-north-supply-chain'),
}

// Recorded as well, not a published case study yet.
export const vanaiMedia = media('vanai-consulting')
