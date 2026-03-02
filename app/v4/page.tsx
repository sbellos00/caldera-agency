import type { Metadata } from "next"
import HomeClientV4 from "@/components/HomeClientV4"

export const metadata: Metadata = {
  title: "Caldera Agency - Component Exploration (V4)",
  robots: { index: false, follow: false },
}

export default function HomeV4Page() {
  return <HomeClientV4 />
}
