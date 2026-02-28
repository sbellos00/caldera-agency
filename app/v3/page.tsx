import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"
import EditMode from "@/components/EditMode"

export const metadata: Metadata = {
  title: "V3 - We Build Your Website Before You Pay a Cent | Caldera Agency",
  description: "Confidence-first hook. Bold hero with risk-reversal positioning.",
  robots: { index: false, follow: false },
}

export default function V3Page() {
  return (
    <>
      <HomeClient variant="v3" />
      <EditMode />
    </>
  )
}
