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
    ];
  },
};

export default nextConfig;
