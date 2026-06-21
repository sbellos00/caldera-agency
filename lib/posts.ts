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
      'A fair, side-by-side look at how solo consultants can build a website in 2026 — DIY builders, freelancers, custom development, and done-for-you agencies — and when each one is the right call.',
    date: '2026-06-18',
    readingTime: '11 min read',
    category: 'Comparisons',
  },
  {
    slug: 'do-consultants-need-a-website',
    title: 'Do Consultants Need a Website (Even If LinkedIn Is Already Working)?',
    excerpt:
      'Yes — and not for the reason most people think. A consultant website is a credibility and ownership asset that stops you from quietly losing the deals LinkedIn brings you.',
    date: '2026-06-12',
    readingTime: '8 min read',
    category: 'Strategy',
  },
  {
    slug: 'how-much-does-a-consultant-website-cost',
    title: 'How Much Does a Consultant Website Cost in 2026? An Honest Breakdown',
    excerpt:
      'Real 2026 price ranges for DIY builders, freelancers, and agencies — plus the hidden cost almost no one budgets for, and how to buy a consultant website without taking on risk.',
    date: '2026-06-06',
    readingTime: '10 min read',
    category: 'Pricing',
  },
  {
    slug: 'linkedin-vs-website-for-consultants',
    title: 'LinkedIn vs Your Own Website: What Every Consultant Should Know',
    excerpt:
      'LinkedIn makes you visible; your website makes you credible. Here is how the two actually work together for an independent consultant — and where relying on LinkedIn alone costs you.',
    date: '2026-05-28',
    readingTime: '9 min read',
    category: 'Strategy',
  },
  {
    slug: 'why-consultants-need-websites',
    title: 'Why Every Consultant Needs a Website (Even When LinkedIn Is Working)',
    excerpt:
      "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
    date: '2025-08-05',
    readingTime: '8 min read',
    category: 'Consultant Positioning',
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
