"use client";

import Image from "next/image";
import { ProjectData, Language } from "@/types/portfolio";
import { PixelIcon } from "./pixel-icon";

interface ProjectCardProps {
  project: ProjectData;
  lang: Language;
  featured?: boolean;
}

// Enhanced pixel border with stepped corners and shadow
function PixelBorder({
  color,
  children,
  className = "",
  shadow = true,
}: {
  color: string;
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
}) {
  const colorMap: Record<string, string> = {
    red: "var(--pixel-red)",
    yellow: "var(--pixel-yellow)",
    green: "var(--pixel-green)",
    blue: "var(--pixel-blue)",
  };
  const borderColor = colorMap[color] || colorMap.blue;

  return (
    <div className={`relative ${className}`}>
      {/* Shadow layer - offset for pixel depth effect */}
      {shadow && (
        <div
          className="absolute inset-0 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            clipPath: `polygon(
              8px 0%, calc(100% - 8px) 0%,
              calc(100% - 8px) 4px, calc(100% - 4px) 4px,
              calc(100% - 4px) 8px, 100% 8px,
              100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px),
              calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px),
              calc(100% - 8px) 100%, 8px 100%,
              8px calc(100% - 4px), 4px calc(100% - 4px),
              4px calc(100% - 8px), 0% calc(100% - 8px),
              0% 8px, 4px 8px,
              4px 4px, 8px 4px
            )`,
          }}
        />
      )}

      {/* Outer pixel border with stepped corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: borderColor,
          clipPath: `polygon(
            8px 0%, calc(100% - 8px) 0%,
            calc(100% - 8px) 4px, calc(100% - 4px) 4px,
            calc(100% - 4px) 8px, 100% 8px,
            100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px),
            calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px),
            calc(100% - 8px) 100%, 8px 100%,
            8px calc(100% - 4px), 4px calc(100% - 4px),
            4px calc(100% - 8px), 0% calc(100% - 8px),
            0% 8px, 4px 8px,
            4px 4px, 8px 4px
          )`,
        }}
      />

      {/* Inner content area with inset */}
      <div
        className="relative bg-card"
        style={{
          margin: "4px",
          clipPath: `polygon(
            6px 0%, calc(100% - 6px) 0%,
            calc(100% - 6px) 3px, calc(100% - 3px) 3px,
            calc(100% - 3px) 6px, 100% 6px,
            100% calc(100% - 6px), calc(100% - 3px) calc(100% - 6px),
            calc(100% - 3px) calc(100% - 3px), calc(100% - 6px) calc(100% - 3px),
            calc(100% - 6px) 100%, 6px 100%,
            6px calc(100% - 3px), 3px calc(100% - 3px),
            3px calc(100% - 6px), 0% calc(100% - 6px),
            0% 6px, 3px 6px,
            3px 3px, 6px 3px
          )`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  lang,
  featured = false,
}: ProjectCardProps) {
  const title = project.title[lang];
  const subtitle = project.subtitle?.[lang];
  const description = project.description[lang];
  const highlights = project.highlights[lang];
  const role = project.role?.[lang];
  const status = project.status?.[lang];
  const cta = project.cta[lang];

  // Use Chinese pixel font for Chinese text
  const pixelFontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  if (featured || project.featured) {
    return (
      <PixelBorder color={project.accentColor} className="overflow-visible">
        <div className="p-0">
          {/* Game-style header bar - LARGER TEXT */}
          <div
            className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3"
            style={{ backgroundColor: `var(--pixel-${project.accentColor})` }}
          >
            {/* Window controls */}
            <div className="flex gap-1 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white/90 border-2 border-white/50" />
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white/70 border-2 border-white/40" />
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white/50 border-2 border-white/30" />
            </div>
            <div className="w-px h-4 md:h-5 bg-white/30" />
            <span
              className={`${pixelFontClass} text-xs md:text-sm lg:text-base text-white tracking-wider drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]`}
            >
              {lang === "zh" ? "精选项目" : "FEATURED PROJECT"}
            </span>
            {/* Pixel decoration on right */}
            <div className="ml-auto flex gap-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/80" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40" />
            </div>
          </div>

          {/* Mobile: stack vertically, Desktop: side by side */}
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-0">
            {/* Image section - SMALLER: 2 cols on desktop */}
            <div className="relative lg:col-span-2 bg-secondary/50 p-3 md:p-4">
              {/* Fixed aspect ratio container for consistent mobile sizing */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  paddingBottom:"75%",
                  border: "3px solid var(--foreground)",
                  boxShadow:
                    "inset 3px 3px 0 rgba(0,0,0,0.1), 3px 3px 0 rgba(0,0,0,0.15)",
                }}
              >
                <Image
                  src={project.image}
                  alt={title}
                  fill
                  className="object-cover"
                  style={{ imageRendering: "auto" }}
                  priority
                />
                {/* Scanline overlay for retro feel */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                  }}
                />
              </div>

              {/* Pixel corner decorations - smaller on mobile */}
              <div className="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col gap-0.5 md:gap-1">
                <div className="flex gap-0.5 md:gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-red" />
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-yellow" />
                </div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-green" />
              </div>
              <div className="absolute top-1 right-1 md:top-2 md:right-2 flex flex-col gap-0.5 md:gap-1 items-end">
                <div className="flex gap-0.5 md:gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-yellow" />
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-red" />
                </div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-blue" />
              </div>
              <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 flex flex-col gap-0.5 md:gap-1">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-blue" />
                <div className="flex gap-0.5 md:gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-green" />
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-red" />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 flex flex-col gap-0.5 md:gap-1 items-end">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-green" />
                <div className="flex gap-0.5 md:gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-blue" />
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-pixel-yellow" />
                </div>
              </div>
            </div>

            {/* Content section - LARGER: 3 cols on desktop */}
            <div className="lg:col-span-3 p-4 md:p-6 flex flex-col bg-card">
              {subtitle && (
                <span
                  className={`${pixelFontClass} text-xs md:text-sm text-muted-foreground mb-2 tracking-wide`}
                >
                  {subtitle}
                </span>
              )}

              {/* LARGER title text */}
              <h3
                className={`${pixelFontClass} text-base md:text-lg lg:text-xl text-foreground mb-3 md:mb-4 leading-relaxed`}
              >
                {title}
              </h3>

              {/* LARGER description text */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-5">
                {description}
              </p>

              {/* Highlights with pixel bullets - LARGER text */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
                {highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2 md:gap-3">
                    <PixelIcon
                      type="check"
                      className="w-4 h-4 md:w-5 md:h-5 text-pixel-green flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm md:text-base text-foreground">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {role && (
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  <span className="font-semibold">
                    {lang === "zh" ? "角色: " : "Role: "}
                  </span>
                  {role}
                </p>
              )}

              {/* Tech stack with pixel badges */}
              <div className="flex flex-wrap gap-2 md:gap-2.5 mt-auto pt-4 md:pt-5 border-t-4 border-dashed border-border">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm bg-secondary text-secondary-foreground border-2 border-foreground/30"
                    style={{
                      boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA Button - LARGER */}
              <div className="mt-4 md:mt-5">
                <button
                  className={`${pixelFontClass} text-sm md:text-base px-4 md:px-5 py-2 cursor-pointer transition-all hover:translate-x-1`}
                  style={{
                    color: `var(--pixel-${project.accentColor})`,
                    textShadow: "1px 1px 0 rgba(0,0,0,0.1)",
                  }}
                >
                  {">>>"} {cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </PixelBorder>
    );
  }

  // Compact card for grid layout with pixel styling
  return (
    <PixelBorder
      color={project.accentColor}
      className="h-full overflow-visible"
    >
      <div className="p-0 flex flex-col h-full">
        {/* Game-style header bar */}
        <div
          className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2"
          style={{ backgroundColor: `var(--pixel-${project.accentColor})` }}
        >
          <div className="flex gap-1 md:gap-1.5">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-white/90 border border-white/50" />
            <div className="w-2 h-2 md:w-3 md:h-3 bg-white/70 border border-white/40" />
            <div className="w-2 h-2 md:w-3 md:h-3 bg-white/50 border border-white/30" />
          </div>
          {subtitle && (
            <span
              className={`${pixelFontClass} text-[10px] md:text-xs text-white ml-1 truncate tracking-wide drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)]`}
            >
            {subtitle}
            </span>
          )}
        </div>

        {/* Image with pixel frame - using padding-bottom for Safari compatibility */}
        <div
          className="relative m-2 md:m-3 mb-0 overflow-hidden"
          style={{
            paddingBottom: "56.25%" /* 16:9 aspect ratio */,
            border: "2px solid var(--foreground)",
            boxShadow:
              "inset 2px 2px 0 rgba(0,0,0,0.1), 2px 2px 0 rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover absolute inset-0"
            style={{ imageRendering: "auto" }}
          />
          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
            }}
          />
        </div>

        {/* Content - LARGER text */}
        <div className="p-3 md:p-4 flex flex-col flex-1 bg-card">
          <h3
            className={`${pixelFontClass} text-base md:text-sm text-foreground mb-2 md:mb-3 leading-relaxed`}
          >
            {title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4 line-clamp-2">
            {description}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
            {highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-2.5">
                <div
                  className="w-2 h-2 md:w-2.5 md:h-2.5 flex-shrink-0"
                  style={{
                    backgroundColor: `var(--pixel-${project.accentColor})`,
                    boxShadow: "1px 1px 0 rgba(0,0,0,0.2)",
                  }}
                />
                <span className="text-sm text-muted-foreground line-clamp-1">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          {status && (
            <p className="text-[10px] md:text-xs text-muted-foreground mb-2 italic">
              {status}
            </p>
          )}

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto pt-3 md:pt-4 border-t-2 border-dashed border-border">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 md:px-2.5 py-1 md:py-1.5 text-[10px] md:text-xs bg-secondary text-secondary-foreground border border-foreground/20"
                style={{
                  boxShadow: "1px 1px 0 rgba(0,0,0,0.1)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-3 md:mt-4">
            <span
              className={`${pixelFontClass} text-[10px] md:text-xs cursor-pointer hover:translate-x-0.5 inline-block transition-transform`}
              style={{ color: `var(--pixel-${project.accentColor})` }}
            >
              {">"} {cta}
            </span>
          </div>
        </div>
      </div>
    </PixelBorder>
  );
}
