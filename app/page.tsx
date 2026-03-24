"use client"

import { useState } from "react"
import { Language } from "@/types/portfolio"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Services } from "@/components/services"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { PixelDivider } from "@/components/pixel-divider"

export default function Home() {
  const [lang, setLang] = useState<Language>("en")

  return (
    <main className="min-h-screen bg-background">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <PixelDivider />
      <Portfolio lang={lang} />
      <PixelDivider variant="alt" />
      <Services lang={lang} />
      <PixelDivider />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
