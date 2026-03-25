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
