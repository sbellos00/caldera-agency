// Central registry of blog posts.
// The /blog index and the sitemap both map over this list, so adding a post
// here (and creating its route folder under app/blog/<slug>) is all it takes
// to wire it into navigation, internal linking, and search/AI discovery.

export interface Post {
  slug: string
  title: string
  /** Short, answer-first summary used on the index, in <meta> and in BlogPosting schema. */
  excerpt: string
  /** ISO date (YYYY-MM-DD) the post was published. */
  date: string
  /** ISO date the post was last meaningfully updated. Falls back to `date`. */
  updated?: string
  readingTime: string
  category: string
}

// Newest-first intent is handled by getAllPosts(); order here is for readability.
export const posts: Post[] = [
  {
    slug: 'best-website-builder-for-consultants',
    title: 'Best Website Options for Consultants in 2026: Squarespace vs Wix vs Custom vs Done-for-You',
    excerpt:
      'A fair look at how solo consultants can build a website in 2026. DIY builders, freelancers, custom development, and done-for-you agencies, and when each one is the right call.',
    date: '2026-06-18',
    readingTime: '11 min read',
    category: 'Comparisons',
  },
  {
    slug: 'do-consultants-need-a-website',
    title: 'Do Consultants Need a Website (Even If LinkedIn Is Already Working)?',
    excerpt:
      'Yes, and not for the reason most people think. A consultant website is a credibility and ownership asset that stops you from quietly losing the deals LinkedIn brings you.',
    date: '2026-06-12',
    readingTime: '8 min read',
    category: 'Strategy',
  },
  {
    slug: 'linkedin-vs-website-for-consultants',
    title: 'LinkedIn vs Your Own Website: What Every Consultant Should Know',
    excerpt:
      'LinkedIn makes you visible. Your website makes you credible. Here is how the two actually work together for an independent consultant, and where relying on LinkedIn alone costs you.',
    date: '2026-05-28',
    readingTime: '9 min read',
    category: 'Strategy',
  },
  {
    slug: 'the-authority-paradox',
    title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
    excerpt:
      "Why being the smartest person in the room isn't enough to attract high-value consulting clients, and the counterintuitive approach that actually works.",
    date: '2024-01-15',
    readingTime: '8 min read',
    category: 'Authority Building',
  },
]

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
