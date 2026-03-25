"use client";

import { Language } from "@/types/portfolio";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

const content = {
  en: {
    title: "Featured Work",
    subtitle: "Projects we've crafted with passion",
    viewAll: "View All Projects",
  },
  zh: {
    title: "精选项目",
    subtitle: "我们用心打造的项目",
    viewAll: "查看所有项目",
  },
};

interface PortfolioProps {
  lang: Language;
}

export function Portfolio({ lang }: PortfolioProps) {
  const t = content[lang];
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featuredProject.id);

  // Use Chinese pixel font for Chinese text
  const pixelFontClass =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";

  return (
    <section
      id="portfolio"
      className="py-20 bg-background relative overflow-hidden"
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
        {/* Section header with pixel decoration */}
        <div className="text-center mb-16">
          {/* Pixel art decoration - game controller style */}
          {/* <div className="flex justify-center items-center gap-3 mb-6">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div
                  className="w-3 h-3 bg-pixel-red"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
                <div
                  className="w-3 h-3 bg-pixel-yellow"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
              </div>
              <div className="flex gap-1">
                <div
                  className="w-3 h-3 bg-pixel-green"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
                <div
                  className="w-3 h-3 bg-pixel-blue"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-foreground/30" />
              <div className="w-8 h-1 bg-foreground/20" />
              <div className="w-2 h-2 bg-foreground/30" />
            </div>
            <div
              className="w-4 h-4 bg-pixel-red rotate-45"
              style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}
            />
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-foreground/30" />
              <div className="w-8 h-1 bg-foreground/20" />
              <div className="w-2 h-2 bg-foreground/30" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div
                  className="w-3 h-3 bg-pixel-yellow"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
                <div
                  className="w-3 h-3 bg-pixel-red"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
              </div>
              <div className="flex gap-1">
                <div
                  className="w-3 h-3 bg-pixel-blue"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
                <div
                  className="w-3 h-3 bg-pixel-green"
                  style={{ boxShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
                />
              </div>
            </div>
          </div> */}

          <h2
            className={`${pixelFontClass} text-lg md:text-2xl text-foreground mb-4`}
          >
            {t.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Featured project */}
        <div className="max-w-5xl mx-auto mb-16">
          <ProjectCard project={featuredProject} lang={lang} featured />
        </div>

        {/* Other projects grid */}
        {otherProjects.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        )}

        {/* Bottom decoration - pixel game bar */}
        {/* <div className="flex justify-center mt-16 gap-1">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="w-4 h-4"
              style={{ 
                backgroundColor: i % 4 === 0 ? "var(--pixel-red)" 
                  : i % 4 === 1 ? "var(--pixel-yellow)"
                  : i % 4 === 2 ? "var(--pixel-green)"
                  : "var(--pixel-blue)",
                opacity: 0.3 + (Math.sin(i * 0.5) * 0.3),
                boxShadow: "1px 1px 0 rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div> */}
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
