"use client";

import Image from "next/image";
import { Language } from "@/types/portfolio";
import { PixelButton } from "./pixel-button";
import { FloatingSnacks } from "./floating-snacks";
import { Mascots } from "./mascots";

const content = {
  en: {
    tagline: "Fresh Ideas. Tasty Solutions.",
    subtitle: "Creative like Soda, Sharp like Snacks.",
    description:
      "Custom web apps, admin systems, and business tools—precision in every pixel, tailored for your business.",
    cta: "Contact Us",
  },
  zh: {
    tagline: "新鲜创意，美味方案。",
    subtitle: "趣味如汽水，锋利似零食",
    description:
      "打造专属网页应用、后台系统和商业工具——每一像素精心雕琢，为你的业务量身定制。",
    cta: "联系我们",
  },
};


interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const t = content[lang];

  const pixelFontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  return (
    <section className="relative py-16 md:py-24 lg:py-32 pb-24 md:pb-32 lg:pb-36 overflow-hidden">
      {/* Floating soda & snacks */}
      <FloatingSnacks variant="hero" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background pixel dots */}
        <div className="absolute top-20 left-[15%] w-2 h-2 bg-pixel-yellow opacity-40" />
        <div className="absolute top-32 right-[25%] w-2 h-2 bg-pixel-green opacity-30" />
        <div className="absolute bottom-24 left-[20%] w-2 h-2 bg-pixel-red opacity-35" />
        <div className="absolute bottom-16 right-[20%] w-2 h-2 bg-pixel-blue opacity-30" />
      </div>

      {/* S & K mascots walking along the bottom */}
      <Mascots lang={lang} />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* START */}
            <div className="relative flex justify-center lg:justify-start mb-8 px-step-in">
              <div className="relative group">
                <img
                  src="/pixel-logo.png"
                  alt="Pixel logo"
                  className="w-20 h-20 md:w-28 md:h-28 
                 drop-shadow-[0_0_15px_#7EB8FF] 
                 drop-shadow-[0_0_25px_#4D96FF]
                 transition-all duration-700 
                 group-hover:scale-110 
                 group-hover:drop-shadow-[0_0_40px_#7EB8FF]
                 animate-neon-pulse"
                />
              </div>
            </div>
            {/* END */}
            <h1
              className={`${pixelFontClass} text-lg md:text-2xl lg:text-3xl text-foreground mb-3 leading-relaxed text-balance px-step-in`}
              style={{ animationDelay: "120ms" }}
            >
              {t.tagline}
            </h1>
            <h2
              className={`${pixelFontClass} text-base md:text-xl lg:text-2xl text-pixel-red mb-6 px-step-in`}
              style={{ animationDelay: "240ms" }}
            >
              {t.subtitle}
            </h2>

            <p
              className="max-w-lg text-base md:text-lg text-muted-foreground mb-8 leading-relaxed mx-auto lg:mx-0 px-step-in"
              style={{ animationDelay: "360ms" }}
            >
              {t.description}
            </p>

            <div className="px-step-in" style={{ animationDelay: "480ms" }}>
              <PixelButton href="#contact" size="lg">
                {t.cta}
              </PixelButton>
            </div>
          </div>

          {/* Right: Hero image with pixel frame */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative px-scan-in" style={{ animationDelay: "250ms" }}>
              {/* Pixel frame decoration */}
              <div className="absolute -inset-3 md:-inset-4">
                {/* Corner pixels */}
                <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-pixel-red" />
                <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-pixel-yellow" />
                <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 bg-pixel-green" />
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-pixel-blue" />
                {/* Edge pixels */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-pixel-yellow" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-pixel-red" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-pixel-blue" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-pixel-green" />
              </div>

              {/* Image container with pixel-style border */}
              <div
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-card overflow-hidden"
                style={{
                  clipPath: `polygon(
                    8px 0, calc(100% - 8px) 0,
                    calc(100% - 8px) 8px, 100% 8px,
                    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px),
                    calc(100% - 8px) 100%, 8px 100%,
                    8px calc(100% - 8px), 0 calc(100% - 8px),
                    0 8px, 8px 8px
                  )`,
                  boxShadow: "6px 6px 0 var(--pixel-yellow)",
                }}
              >
                <Image
                  src="/retro-pixel.png"
                  alt="Pixel art of couple coding with snacks"
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                  style={{ imageRendering: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
