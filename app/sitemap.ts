import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0]

  // Top-tier marketing/authority pages.
  const priorityPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/best-website-agency-for-consultants', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/process', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  ]

  const staticRoutes: MetadataRoute.Sitemap = priorityPages.map((p) => ({
    // Match the home canonical exactly (no trailing slash on the bare host).
    url: p.path === '/' ? SITE_URL : `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
