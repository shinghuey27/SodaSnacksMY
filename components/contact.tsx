"use client"

import { useState } from "react"
import { Language } from "@/types/portfolio"
import { PixelButton } from "./pixel-button"
import { PixelIcon } from "./pixel-icon"

const content = {
  en: {
    title: "Get In Touch",
    subtitle: "Ready to start your project? Let's talk!",
    whatsapp: "WhatsApp",
    email: "Email",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send Message",
      success: "Message sent! We'll get back to you soon.",
    },
  },
  zh: {
    title: "联系我们",
    subtitle: "准备好开始您的项目了吗？让我们聊聊！",
    whatsapp: "WhatsApp",
    email: "邮箱",
    form: {
      name: "姓名",
      email: "邮箱",
      message: "留言",
      submit: "发送消息",
      success: "消息已发送！我们会尽快回复您。",
    },
  },
}

interface ContactProps {
  lang: Language
}

export function Contact({ lang }: ContactProps) {
  const t = content[lang]
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header with pixel decoration */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-pixel-yellow" />
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-foreground">
              {t.title}
            </h2>
            <div className="w-3 h-3 bg-pixel-yellow" />
          </div>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact info with pixel cards */}
          <div className="space-y-6">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-card border-4 border-foreground hover:border-pixel-green hover:-translate-y-1 transition-all group shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0_0_var(--pixel-green)]"
            >
              <div className="w-12 h-12 bg-pixel-green flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]">
                <PixelIcon type="phone" className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-[family-name:var(--font-pixel)] text-xs text-foreground block">
                  {t.whatsapp}
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-pixel-green transition-colors">
                  +1 (234) 567-890
                </span>
              </div>
            </a>

            <a
              href="mailto:hello@sodasnacks.studio"
              className="flex items-center gap-4 p-4 bg-card border-4 border-foreground hover:border-pixel-blue hover:-translate-y-1 transition-all group shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0_0_var(--pixel-blue)]"
            >
              <div className="w-12 h-12 bg-pixel-blue flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]">
                <PixelIcon type="mail" className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-[family-name:var(--font-pixel)] text-xs text-foreground block">
                  {t.email}
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-pixel-blue transition-colors">
                  hello@sodasnacks.studio
                </span>
              </div>
            </a>

            {/* Decorative pixel art - enhanced */}
            <div className="hidden md:flex justify-center pt-8">
              <div className="relative w-40 h-32">
                {/* Pixel pattern with animation */}
                <div className="absolute top-0 left-8 w-4 h-4 bg-pixel-red animate-pulse" />
                <div className="absolute top-4 left-4 w-4 h-4 bg-pixel-yellow animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="absolute top-4 left-12 w-4 h-4 bg-pixel-blue animate-pulse" style={{ animationDelay: "0.4s" }} />
                <div className="absolute top-8 left-8 w-4 h-4 bg-pixel-green animate-pulse" style={{ animationDelay: "0.6s" }} />
                <div className="absolute top-8 left-16 w-4 h-4 bg-pixel-red animate-pulse" style={{ animationDelay: "0.8s" }} />
                <div className="absolute top-12 left-12 w-4 h-4 bg-pixel-yellow animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-16 left-20 w-4 h-4 bg-pixel-blue animate-pulse" style={{ animationDelay: "1.2s" }} />
                <div className="absolute top-20 left-16 w-4 h-4 bg-pixel-green animate-pulse" style={{ animationDelay: "1.4s" }} />
                <div className="absolute top-12 left-24 w-3 h-3 bg-pixel-red animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="absolute top-20 left-24 w-3 h-3 bg-pixel-yellow animate-pulse" style={{ animationDelay: "0.9s" }} />
              </div>
            </div>
          </div>

          {/* Contact form with pixel styling */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                {t.form.name}
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-card border-4 border-foreground text-foreground placeholder:text-muted-foreground focus:border-pixel-blue focus:outline-none transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0_0_var(--pixel-blue)]"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                {t.form.email}
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-card border-4 border-foreground text-foreground placeholder:text-muted-foreground focus:border-pixel-blue focus:outline-none transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0_0_var(--pixel-blue)]"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                {t.form.message}
              </label>
              <textarea
                rows={5}
                required
                className="w-full px-4 py-3 bg-card border-4 border-foreground text-foreground placeholder:text-muted-foreground focus:border-pixel-blue focus:outline-none transition-colors resize-none shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0_0_var(--pixel-blue)]"
              />
            </div>

            {submitted ? (
              <div className="p-4 bg-pixel-green/20 border-4 border-pixel-green text-center shadow-[4px_4px_0_0_var(--pixel-green)]">
                <span className="font-[family-name:var(--font-pixel)] text-xs text-pixel-green">
                  {t.form.success}
                </span>
              </div>
            ) : (
              <PixelButton type="submit" className="w-full text-center">
                {t.form.submit}
              </PixelButton>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
