import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"

export const metadata: Metadata = {
  title: "Caldera Agency - Bespoke Authority-Building Websites for Solo Consultants",
  description: "Custom website development for solo consultants. We combine deep research, strategic positioning, and hands-off delivery to create websites that demonstrate expertise and convert higher-value clients.",
  alternates: {
    canonical: "https://caldera.agency/archive",
  },
}

export default function ArchiveHomePage() {
  return <HomeClient />
}
