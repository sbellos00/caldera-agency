import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"
import EditMode from "@/components/EditMode"

export const metadata: Metadata = {
  title: "V1 - A Professional Website from Just Your LinkedIn | Caldera Agency",
  robots: { index: false, follow: false },
}

export default function V1Page() {
  return (
    <>
      <HomeClient variant="v1" />
      <EditMode />
    </>
  )
}
