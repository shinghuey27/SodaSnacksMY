import type { Metadata } from "next"
import { HomeClient } from "@/components/home-client"
import type { Language } from "@/types/portfolio"

type PageProps = { searchParams: Promise<{ lang?: string }> }

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const lang = (await searchParams).lang === "zh" ? "zh" : "en"
  return lang === "zh"
    ? {
        title: "SodaSnacks - 数字工作室",
        description: "为你的业务打造网页应用、后台系统和定制软件。",
        alternates: { canonical: "/?lang=zh", languages: { en: "/", "zh-Hans": "/?lang=zh" } },
        openGraph: { title: "SodaSnacks - 数字工作室", description: "为你的业务打造网页应用、后台系统和定制软件。", locale: "zh_MY" },
        twitter: { title: "SodaSnacks - 数字工作室", description: "为你的业务打造网页应用、后台系统和定制软件。" },
      }
    : { title: "SodaSnacks - Digital Studio", alternates: { canonical: "/", languages: { en: "/", "zh-Hans": "/?lang=zh" } } }
}

export default async function Home({ searchParams }: PageProps) {
  const initialLang: Language = (await searchParams).lang === "zh" ? "zh" : "en"
  return <HomeClient initialLang={initialLang} />
}
