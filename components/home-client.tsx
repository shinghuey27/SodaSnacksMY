"use client"

import { useEffect, useState } from "react"
import { Language } from "@/types/portfolio"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"
import { PixelDivider } from "@/components/pixel-divider"
import { Contact } from "@/components/contact"

export function HomeClient({ initialLang }: { initialLang: Language }) {
  const [lang, setLang] = useState<Language>(initialLang)

  useEffect(() => {
    const syncLanguage = () => {
      const next: Language = new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en"
      setLang(next)
      document.documentElement.lang = next === "zh" ? "zh-Hans" : "en"
      document.title = next === "zh" ? "SodaSnacks - 数字工作室" : "SodaSnacks - Digital Studio"
    }
    syncLanguage()
    window.addEventListener("popstate", syncLanguage)
    return () => window.removeEventListener("popstate", syncLanguage)
  }, [])

  const changeLanguage = (next: Language) => {
    const url = new URL(window.location.href)
    if (next === "zh") url.searchParams.set("lang", "zh")
    else url.searchParams.delete("lang")
    window.history.pushState(null, "", url)
    setLang(next)
    document.documentElement.lang = next === "zh" ? "zh-Hans" : "en"
    document.title = next === "zh" ? "SodaSnacks - 数字工作室" : "SodaSnacks - Digital Studio"
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header lang={lang} setLang={changeLanguage} />
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
