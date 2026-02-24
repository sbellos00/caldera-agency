import type { Metadata } from "next"
import BlogClient from "@/components/BlogClient"

export const metadata: Metadata = {
  title: "The Authority Paradox: Why Technical Expertise Alone Won't Win Premium Clients",
  description: "Discover why being the smartest person in the room isn't enough to attract high-value consulting clients, and learn the counterintuitive approach that actually works.",
  alternates: {
    canonical: "https://caldera.agency/archive/blog/sample-post",
  },
}

export default function ArchiveBlogPostPage() {
  return <BlogClient />
}
