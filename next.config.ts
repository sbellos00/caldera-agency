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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</llms.txt>; rel="service-doc"; type="text/plain"',
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
              '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
            ].join(', '),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The blog has been retired. Redirect every old blog URL to the flagship page.
      { source: '/blog', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/sample-post', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/the-authority-paradox', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/linkedin-vs-website-for-consultants', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/why-consultants-need-websites', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/do-consultants-need-a-website', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/blog/best-website-builder-for-consultants', destination: '/best-website-agency-for-consultants', permanent: true },
      // Retired standalone pages.
      { source: '/consultant-websites', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/for/fractional-cfo', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/for/coaches', destination: '/best-website-agency-for-consultants', permanent: true },
      { source: '/for/advisors', destination: '/best-website-agency-for-consultants', permanent: true },
    ];
  },
};

export default nextConfig;
