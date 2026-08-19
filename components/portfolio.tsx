"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Language, ProjectData } from "@/types/portfolio";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { PixelSprite } from "./pixel-sprite";
import { MASCOT_S } from "./sprites/mascot-data";
import { PixelAssemble } from "./pixel-assemble";
import { useInView } from "@/hooks/use-in-view";

const content = {
  en: {
    title: "Featured Work",
    subtitle: "Projects we've crafted with passion",
    insert: "▲ SELECT A CARTRIDGE",
  },
  zh: {
    title: "精选项目",
    subtitle: "我们用心打造的项目",
    insert: "▲ 选择卡带切换项目",
  },
};

interface PortfolioProps {
  lang: Language;
}

export function Portfolio({ lang }: PortfolioProps) {
  const t = content[lang];
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const ordered = [
    featuredProject,
    ...projects.filter((p) => p.id !== featuredProject.id),
  ];
  const [selectedId, setSelectedId] = useState(featuredProject.id);
  const selected = ordered.find((p) => p.id === selectedId) ?? featuredProject;
  const { ref: gridRef, inView } = useInView<HTMLDivElement>();

  // Use Chinese pixel font for Chinese text
  const pixelFontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  return (
    <section
      id="portfolio"
      className="py-20 bg-background relative overflow-hidden scroll-mt-20"
    >
      {/* Subtle pixel grid background - lighter to match hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gradient fade from hero section */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2
              className={`${pixelFontClass} text-lg md:text-2xl text-foreground mb-4`}
            >
              {t.title}
            </h2>
            {/* S peeking beside the title */}
            <div className="absolute -right-10 md:-right-14 -top-3 pointer-events-none">
              <PixelSprite
                sprite={MASCOT_S}
                anim="idle"
                fps={2}
                flipX
                className="w-7 md:w-9 h-auto drop-shadow-[2px_2px_0_rgba(58,58,56,0.2)]"
              />
            </div>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* ── Desktop: featured window + cartridge selector ── */}
        <div className="hidden md:block max-w-5xl mx-auto" ref={gridRef}>
          <PixelAssemble play={inView}>
            <div
              key={selected.id}
              style={{ animation: "px-cartridge-in 0.3s ease-out" }}
            >
              <ProjectCard project={selected} lang={lang} featured />
            </div>
          </PixelAssemble>

          <p
            className={`${pixelFontClass} text-center text-muted-foreground mt-10 mb-4 ${lang === "zh" ? "text-sm" : "text-[9px]"}`}
          >
            {t.insert}
          </p>

          <div className="grid grid-cols-4 gap-4 lg:gap-6">
            {ordered.map((project, i) => (
              <div
                key={project.id}
                className={inView ? "px-step-in" : "px-hidden"}
                style={{ animationDelay: `${400 + i * 80}ms` }}
              >
                <Cartridge
                  project={project}
                  lang={lang}
                  active={project.id === selectedId}
                  onSelect={() => setSelectedId(project.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: swipeable carousel ── */}
        <MobileCarouselReveal>
          <MobileCarousel projects={ordered} lang={lang} />
        </MobileCarouselReveal>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}

/* ── one-shot reveal wrapper for the mobile carousel ── */
function MobileCarouselReveal({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`md:hidden ${inView ? "px-step-in" : "px-hidden"}`}>
      {children}
    </div>
  );
}

/* ── game-cartridge thumbnail button ── */
function Cartridge({
  project,
  lang,
  active,
  onSelect,
}: {
  project: ProjectData;
  lang: Language;
  active: boolean;
  onSelect: () => void;
}) {
  const title = project.title[lang];
  const accent = `var(--pixel-${project.accentColor})`;
  const pixelFontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)] text-sm"
      : "font-[family-name:var(--font-pixel)] text-[8px]";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group text-left cursor-pointer border-[3px] border-foreground bg-card transition-transform duration-150 ${
        active ? "-translate-y-1.5" : "hover:-translate-y-1 opacity-85 hover:opacity-100"
      }`}
      style={{
        boxShadow: active
          ? `4px 4px 0 ${accent}`
          : "3px 3px 0 rgba(58,58,56,0.5)",
      }}
    >
      {/* cartridge top strip */}
      <div
        className="h-2.5 flex items-center gap-1 px-1.5"
        style={{ backgroundColor: accent }}
      >
        <div className="w-1 h-1 bg-white/80" />
        <div className="w-1 h-1 bg-white/50" />
      </div>

      <div className="relative overflow-hidden" style={{ paddingBottom: "52%" }}>
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 25vw, 240px"
          className="object-cover"
        />
        {!active && (
          <div className="absolute inset-0 bg-foreground/15 group-hover:bg-transparent transition-colors" />
        )}
      </div>

      <div className="px-2 py-2 flex items-center gap-1.5">
        <span
          className={`${pixelFontClass} leading-snug ${active ? "text-foreground" : "text-muted-foreground"} line-clamp-2`}
        >
          {active ? "▶ " : ""}
          {title}
        </span>
      </div>
    </button>
  );
}

/* ── mobile swipe carousel ── */
function MobileCarousel({
  projects: items,
  lang,
}: {
  projects: ProjectData[];
  lang: Language;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center" });
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSlideIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="md:hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {items.map((project) => (
            <div
              key={project.id}
              className="min-w-0 flex-[0_0_86%] pl-4 first:pl-2"
            >
              <div className="h-full pb-2 pr-2">
                <ProjectCard project={project} lang={lang} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pixel dots */}
      <div className="flex justify-center gap-2.5 mt-6">
        {items.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-3 h-3 border-2 border-foreground transition-colors ${
              i === slideIdx ? "bg-pixel-red" : "bg-card"
            }`}
            style={{ boxShadow: "1px 1px 0 rgba(58,58,56,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}
