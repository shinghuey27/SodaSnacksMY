"use client"

import { Language } from "@/types/portfolio"
import { PixelLogo } from "./pixel-logo"
import { PixelButton } from "./pixel-button"

const content = {
  en: {
    tagline: "We Build Digital Solutions",
    subtitle: "That Actually Work",
    description: "A small digital studio crafting custom web apps, admin systems, and business tools with a playful pixel twist.",
    cta: "Contact Us",
  },
  zh: {
    tagline: "我们构建数字解决方案",
    subtitle: "真正有效的方案",
    description: "一个小型数字工作室，以俏皮的像素风格打造定制网页应用、管理系统和商业工具。",
    cta: "联系我们",
  },
}

interface HeroProps {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  const t = content[lang]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background pixel decoration - animated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-pixel-yellow opacity-60 animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-pixel-green opacity-50 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pixel-red opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pixel-blue opacity-50 animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-pixel-yellow opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-16 left-1/3 w-2 h-2 bg-pixel-blue opacity-40 animate-pulse" style={{ animationDelay: "0.7s" }} />
        <div className="absolute bottom-40 right-1/4 w-3 h-3 bg-pixel-red opacity-50 animate-pulse" style={{ animationDelay: "1.2s" }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <PixelLogo className="w-24 h-24 md:w-32 md:h-32 animate-bounce-slow" />
        </div>

        <h1 className="font-[family-name:var(--font-pixel)] text-xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-relaxed">
          {t.tagline}
        </h1>
        <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-2xl lg:text-3xl text-pixel-red mb-8">
          {t.subtitle}
        </h2>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
          {t.description}
        </p>

        <PixelButton href="#contact" size="lg">
          {t.cta}
        </PixelButton>
      </div>
    </section>
  )
}
