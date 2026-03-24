export interface ProjectData {
  id: string
  title: {
    en: string
    zh: string
  }
  client: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  features: {
    en: string[]
    zh: string[]
  }
  tech: string[]
  image?: string
  link?: string
  accentColor: "red" | "yellow" | "green" | "blue"
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
