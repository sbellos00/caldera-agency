import type { Metadata } from "next"
import HomeClientV3 from "@/components/HomeClientV3"

export const metadata: Metadata = {
  title: "Caldera Agency - Hero Exploration (V3)",
  robots: { index: false, follow: false },
}

export default function HomeV3Page() {
  return <HomeClientV3 />
}
