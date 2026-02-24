import type { Metadata } from "next"
import WhyConsultantsNeedWebsitesBlogClient from "@/components/WhyConsultantsNeedWebsitesBlogClient"

export const metadata: Metadata = {
  title: "Why Every Consultant Needs a Website (Even When LinkedIn Is Working)",
  description: "Discover why LinkedIn alone isn't enough for consultants who want to command premium rates and win high-value clients.",
  alternates: {
    canonical: "https://caldera.agency/archive/blog/why-consultants-need-websites",
  },
}

export default function ArchiveBlogPostPage() {
  return <WhyConsultantsNeedWebsitesBlogClient />
}
