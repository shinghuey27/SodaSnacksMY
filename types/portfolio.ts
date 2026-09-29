export interface ProjectData {
  id: string
  title: {
    en: string
    zh: string
  }
  subtitle?: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  highlights: {
    en: string[]
    zh: string[]
  }
  tech: string[]
  role?: {
    en: string
    zh: string
  }
  status?: {
    en: string
    zh: string
  }
  cta: {
    en: string
    zh: string
  }
  image: string
  link?: string
  accentColor: "red" | "yellow" | "green" | "blue"
  featured?: boolean
  /** pixel HUD status chip on the card */
  badge?: "live" | "paused"
  /** optional handheld-style screenshot showcase, grouped by sub-app */
  showcase?: ShowcaseGroup[]
}

export interface ShowcaseShot {
  image: string
  feature: {
    en: string
    zh: string
  }
  caption: {
    en: string
    zh: string
  }
}

export interface ShowcaseGroup {
  id: string
  label: {
    en: string
    zh: string
  }
  accentColor: "red" | "yellow" | "green" | "blue"
  shots: ShowcaseShot[]
}

export interface ServiceData {
  icon: "code" | "dashboard" | "cog" | "phone" | "mail" | "check" | "star"
  title: {
    en: string
    zh: string
  }
  color: string
  items: {
    en: string[]
    zh: string[]
  }
}

export type Language = "en" | "zh"
