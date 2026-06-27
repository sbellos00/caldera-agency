import { NextResponse } from 'next/server'

const SITE = 'https://www.caldera.agency'

export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${SITE}/api/contact`,
        'service-desc': [
          {
            href: `${SITE}/llms.txt`,
            type: 'text/plain',
          },
        ],
        'service-doc': [
          {
            href: `${SITE}/contact`,
            type: 'text/html',
          },
        ],
      },
      {
        anchor: `${SITE}/api/prototype`,
        'service-desc': [
          {
            href: `${SITE}/llms.txt`,
            type: 'text/plain',
          },
        ],
        'service-doc': [
          {
            href: `${SITE}/contact`,
            type: 'text/html',
          },
        ],
      },
    ],
  }

  return NextResponse.json(catalog, {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
