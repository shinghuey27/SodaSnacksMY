"use client"

import { ProjectData, Language } from "@/types/portfolio"
import { PixelCard, PixelCardHeader, PixelCardBody, PixelBadge } from "./pixel-card"
import { PixelIcon } from "./pixel-icon"

interface ProjectCardProps {
  project: ProjectData
  lang: Language
  featured?: boolean
}

export function ProjectCard({ project, lang, featured = false }: ProjectCardProps) {
  const title = project.title[lang]
  const client = project.client[lang]
  const description = project.description[lang]
  const features = project.features[lang]

  if (featured) {
    return (
      <PixelCard variant="featured" accentColor={project.accentColor} className="overflow-hidden">
        <PixelCardHeader subtitle={client} />
        
        <PixelCardBody className="space-y-6">
          {/* Title with pixel decoration */}
          <div className="flex items-start gap-4">
            <div className={`w-3 h-3 mt-2 bg-pixel-${project.accentColor} flex-shrink-0`} />
            <h3 className="font-[family-name:var(--font-pixel)] text-sm md:text-base text-foreground leading-relaxed">
              {title}
            </h3>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Features grid with enhanced styling */}
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-3 bg-secondary/50 border-2 border-border hover:border-foreground transition-colors"
              >
                <PixelIcon type="check" className="w-4 h-4 text-pixel-green flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Tech stack with pixel badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech, i) => (
              <PixelBadge key={i} variant="filled" color={project.accentColor}>
                {tech}
              </PixelBadge>
            ))}
          </div>
        </PixelCardBody>
      </PixelCard>
    )
  }

  // Compact card for grid layout
  return (
    <PixelCard variant="compact" accentColor={project.accentColor} className="h-full">
      {/* Pixel window controls */}
      <div className="flex gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 bg-pixel-red" />
        <div className="w-2.5 h-2.5 bg-pixel-yellow" />
        <div className="w-2.5 h-2.5 bg-pixel-green" />
      </div>

      {/* Client tag */}
      <span className="font-[family-name:var(--font-pixel)] text-[10px] text-muted-foreground block mb-2">
        {client}
      </span>

      {/* Title */}
      <h3 className="font-[family-name:var(--font-pixel)] text-xs text-foreground mb-4 leading-relaxed">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Features list */}
      <div className="space-y-2 mb-4">
        {features.slice(0, 3).map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 bg-pixel-${project.accentColor} flex-shrink-0`} />
            <span className="text-xs text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="px-2 py-1 text-[10px] bg-secondary text-secondary-foreground border border-border"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-2 py-1 text-[10px] text-muted-foreground">
            +{project.tech.length - 3}
          </span>
        )}
      </div>
    </PixelCard>
  )
}
