import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"
import EditMode from "@/components/EditMode"

export const metadata: Metadata = {
  title: "V2 - A Professional Website from Just Your LinkedIn | Caldera Agency",
  description: "Same hero as V1. Stronger second CTA and confidence-driven founder's note.",
  robots: { index: false, follow: false },
}

export default function V2Page() {
  return (
    <>
      <HomeClient variant="v2" />
      <EditMode />
    </>
  )
}
