"use client"

import { Language } from "@/types/portfolio"
import { projects } from "@/data/projects"
import { ProjectCard } from "./project-card"

const content = {
  en: {
    title: "Featured Work",
    subtitle: "Recent projects we're proud of",
    viewAll: "View All Projects",
  },
  zh: {
    title: "精选项目",
    subtitle: "我们引以为豪的近期项目",
    viewAll: "查看所有项目",
  },
}

interface PortfolioProps {
  lang: Language
}

export function Portfolio({ lang }: PortfolioProps) {
  const t = content[lang]
  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <section id="portfolio" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header with pixel decoration */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-pixel-red" />
              <div className="w-2 h-2 bg-pixel-yellow" />
              <div className="w-2 h-2 bg-pixel-green" />
            </div>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-foreground">
              {t.title}
            </h2>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-pixel-green" />
              <div className="w-2 h-2 bg-pixel-yellow" />
              <div className="w-2 h-2 bg-pixel-red" />
            </div>
          </div>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Featured project */}
        <div className="max-w-4xl mx-auto mb-12">
          <ProjectCard project={featuredProject} lang={lang} featured />
        </div>

        {/* Other projects grid */}
        {otherProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
