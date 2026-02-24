import type { Metadata } from "next"
import { Bebas_Neue, Playfair_Display } from "next/font/google"

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
})

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Caldera Turbo | Turn Your LinkedIn Into a Website",
  description:
    "We'll turn your LinkedIn profile into a full website, no effort from your side. Stand out from the LinkedIn crowd.",
  alternates: {
    canonical: "https://caldera.agency/archive",
  },
}

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${bebasNeue.variable} ${playfairDisplay.variable}`}>
      {children}
    </div>
  )
}
