import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://caldera.agency'

  const now = new Date().toISOString().split('T')[0]

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/pricing-pdf`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog/sample-post`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog/why-consultants-need-websites`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  return routes
}


