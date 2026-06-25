import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'polarisinstitute.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'ron-paul-demo.vercel.app' },
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },
  async redirects() {
    return [
      // The old placeholder slug "/blog/sample-post" held a real article
      // ("The Authority Paradox"); it now lives at a descriptive, SEO-friendly slug.
      {
        source: '/blog/sample-post',
        destination: '/blog/the-authority-paradox',
        permanent: true,
      },
      // Retired pages — redirect to the flagship, the main page we keep.
      { source: '/blog/why-consultants-need-websites', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/do-consultants-need-a-website', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/best-website-builder-for-consultants', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/consultant-websites', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/for/fractional-cfo', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/for/coaches', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/for/advisors', destination: '/best-website-agency-for-consultants', permanent: true },
    ];
  },
};

export default nextConfig;
