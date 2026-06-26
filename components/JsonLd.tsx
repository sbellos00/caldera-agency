// Reusable JSON-LD injector. Server component , the structured data lands in the
// initial server-rendered HTML, so search crawlers and AI retrieval bots that do
// not execute JavaScript can still read it.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
