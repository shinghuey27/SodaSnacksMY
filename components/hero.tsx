"use client";

import Image from "next/image";
import { Language } from "@/types/portfolio";
import { PixelButton } from "./pixel-button";
import { PixelIcon, PixelIconType } from "./pixel-icon";

const content = {
  en: {
    tagline: "We Build Digital Solutions",
    subtitle: "That Actually Work",
    description:
      "A small digital studio crafting custom web apps, admin systems, and business tools with a playful pixel twist.",
    cta: "Contact Us",
  },
  zh: {
    tagline: "我们构建数字解决方案",
    subtitle: "真正有效的方案",
    description:
      "一个小型数字工作室，以俏皮的像素风格打造定制网页应用、管理系统和商业工具。",
    cta: "联系我们",
  },
};

// Floating pixel icons configuration
const floatingIcons: {
  type: PixelIconType;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  delay: string;
  size: string;
}[] = [
  // Left side - balanced
  {
    type: "monitor",
    color: "#C8E0FF",
    top: "12%",
    left: "7%",
    delay: "0s",
    size: "w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12",
  },
  {
    type: "code",
    color: "#FFCCCC",
    top: "26%",
    left: "6%",
    delay: "0.4s",
    size: "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10",
  },
  {
    type: "keyboard",
    color: "#FFF9C8",
    top: "48%",
    left: "9%",
    delay: "1.1s",
    size: "w-7 h-7 sm:w-8 sm:h-8 md:w-11 md:h-11",
  },
  {
    type: "laptop",
    color: "#C8F0D0",
    top: "68%",
    left: "8%",
    delay: "2.0s",
    size: "w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11",
  },

  // Center area (carefully placed to avoid text)
  {
    type: "terminal",
    color: "#C8F0D0",
    top: "18%",
    left: "38%",
    delay: "0.3s",
    size: "w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9",
  },
  {
    type: "cpu",
    color: "#FFCCCC",
    top: "42%",
    left: "55%",
    delay: "0.8s",
    size: "w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9",
  },
  {
    type: "rocket",
    color: "#FFF9C8",
    top: "58%",
    left: "45%",
    delay: "1.5s",
    size: "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10",
  },

  // Right side
  {
    type: "wifi",
    color: "#C8F0D0",
    top: "14%",
    right: "10%",
    delay: "0.6s",
    size: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
  },
  {
    type: "coffee",
    color: "#FFCCCC",
    top: "33%",
    right: "14%",
    delay: "1.3s",
    size: "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9",
  },
  {
    type: "pizza",
    color: "#FFF9C8",
    top: "72%",
    right: "12%",
    delay: "2.4s",
    size: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
  },
  {
    type: "mouse",
    color: "#C8E0FF",
    top: "80%",
    right: "9%",
    delay: "2.9s",
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
  },

  // Smaller scattered ones (less crowded on mobile)
  {
    type: "bug",
    color: "#C8E0FF",
    top: "52%",
    right: "22%",
    delay: "1.7s",
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8",
  },
  {
    type: "soda",
    color: "#C8E0FF",
    top: "24%",
    left: "68%",
    delay: "1.0s",
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
  },
  {
    type: "snack",
    color: "#C8F0D0",
    top: "65%",
    left: "72%",
    delay: "2.2s",
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
  },
  {
    type: "star",
    color: "#FFF9C8",
    top: "78%",
    left: "20%",
    delay: "3.1s",
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7",
  },
  {
    type: "folder",
    color: "#C8E0FF",
    top: "38%",
    left: "78%",
    delay: "2.6s",
    size: "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8",
  },
];

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
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Floating pixel coding icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <div
            key={index}
            className="absolute animate-bounce-slow opacity-50 sm:opacity-60 md:opacity-70 hover:opacity-100 transition-all duration-300"
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              animationDelay: icon.delay,
              animationDuration: "4.2s", // slower & calmer
            }}
          >
            <PixelIcon
              type={icon.type}
              className={icon.size}
              color={icon.color}
            />
          </div>
        ))}

        {/* Background pixel dots */}
        <div className="absolute top-20 left-[15%] w-2 h-2 bg-pixel-yellow opacity-40" />
        <div className="absolute top-32 right-[25%] w-2 h-2 bg-pixel-green opacity-30" />
        <div className="absolute bottom-24 left-[20%] w-2 h-2 bg-pixel-red opacity-35" />
        <div className="absolute bottom-16 right-[20%] w-2 h-2 bg-pixel-blue opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* START */}
            <div className="relative flex justify-center lg:justify-start mb-8">
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
              className={`${pixelFontClass} text-lg md:text-2xl lg:text-3xl text-foreground mb-3 leading-relaxed text-balance`}
            >
              {t.tagline}
            </h1>
            <h2
              className={`${pixelFontClass} text-base md:text-xl lg:text-2xl text-pixel-red mb-6`}
            >
              {t.subtitle}
            </h2>

            <p className="max-w-lg text-base md:text-lg text-muted-foreground mb-8 leading-relaxed mx-auto lg:mx-0">
              {t.description}
            </p>

            <PixelButton href="#contact" size="lg">
              {t.cta}
            </PixelButton>
          </div>

          {/* Right: Hero image with pixel frame */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
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
