"use client"

import { useState, useRef } from "react"
import { Language } from "@/types/portfolio"
import { PixelButton } from "./pixel-button"

const content = {
  en: {
    windowTitle: "NEW_MESSAGE.EXE",
    name: "NAME",
    email: "EMAIL",
    message: "MESSAGE",
    namePlaceholder: "Your name...",
    emailPlaceholder: "your@email.com",
    msgPlaceholder: "Tell us about your project...",
    submit: "SEND MESSAGE",
    fields: "FIELDS",
    successTitle: "MESSAGE SENT!",
    successBody: "WE'LL GET BACK\nTO YOU SOON ✦",
  },
  zh: {
    windowTitle: "发送消息.EXE",
    name: "姓名",
    email: "邮箱",
    message: "留言",
    namePlaceholder: "您的姓名...",
    emailPlaceholder: "your@email.com",
    msgPlaceholder: "请告诉我们您的项目需求...",
    submit: "发送消息",
    fields: "个字段",
    successTitle: "消息已发送！",
    successBody: "我们会尽快\n回复您 ✦",
  },
}

interface PixelContactFormProps {
  lang: Language
  onSuccess?: () => void
}

export function PixelContactForm({ lang, onSuccess }: PixelContactFormProps) {
  const t = content[lang]
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [shaking, setShaking] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  const filledCount = [name, email, message].filter((v) => v.trim()).length
  const progressPct = Math.round((filledCount / 3) * 100)

  const pixelFont = lang === "zh"
    ? "font-[family-name:var(--font-chinese)]"
    : "font-[family-name:var(--font-pixel)]"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      // Shake the window
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
      return
    }
    setSubmitted(true)
    onSuccess?.()
  }

  return (
    <div
      ref={windowRef}
      className="border-[3px] border-foreground bg-card shadow-[5px_5px_0_0_rgba(58,58,56,0.8)] transition-transform"
      style={{ animation: shaking ? "px-shake 0.4s ease" : "none" }}
    >
      {/* Window title bar */}
      <div className="bg-foreground px-3 py-2 flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-pixel-red flex-shrink-0" />
        <div className="w-2.5 h-2.5 bg-pixel-yellow flex-shrink-0" />
        <div className="w-2.5 h-2.5 bg-pixel-green flex-shrink-0" />
        <span className={`${pixelFont} text-[7px] text-background flex-1 text-center tracking-wide`}>
          {t.windowTitle}
        </span>
      </div>

      <div className="p-5">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className={`${pixelFont} text-[8px] text-foreground block`}>{t.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-3 py-2.5 bg-secondary border-2 border-foreground text-foreground text-sm placeholder:text-muted-foreground focus:border-pixel-blue focus:outline-none focus:shadow-[3px_3px_0_0_var(--pixel-blue)] shadow-[2px_2px_0_0_rgba(0,0,0,0.08)] transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className={`${pixelFont} text-[8px] text-foreground block`}>{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-3 py-2.5 bg-secondary border-2 border-foreground text-foreground text-sm placeholder:text-muted-foreground focus:border-pixel-blue focus:outline-none focus:shadow-[3px_3px_0_0_var(--pixel-blue)] shadow-[2px_2px_0_0_rgba(0,0,0,0.08)] transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className={`${pixelFont} text-[8px] text-foreground block`}>{t.message}</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.msgPlaceholder}
                className="w-full px-3 py-2.5 bg-secondary border-2 border-foreground text-foreground text-sm placeholder:text-muted-foreground focus:border-pixel-blue focus:outline-none focus:shadow-[3px_3px_0_0_var(--pixel-blue)] shadow-[2px_2px_0_0_rgba(0,0,0,0.08)] transition-all resize-none"
              />
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="h-3 bg-border border-2 border-foreground overflow-hidden">
                <div
                  className="h-full bg-pixel-green transition-all duration-300"
                  style={{
                    width: `${progressPct}%`,
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(0,0,0,0.12) 6px, rgba(0,0,0,0.12) 8px)",
                  }}
                />
              </div>
              <p className={`${pixelFont} text-[7px] text-muted-foreground text-right`}>
                {filledCount} / 3 {t.fields}
              </p>
            </div>

            {/* Submit */}
            <PixelButton type="submit" className="w-full text-center">
              {t.submit}
            </PixelButton>
          </form>
        ) : (
          // Success state
          <div className="flex flex-col items-center gap-4 py-6 bg-pixel-green/10 border-2 border-pixel-green shadow-[4px_4px_0_0_var(--pixel-green)]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 12 12"
              style={{ imageRendering: "pixelated" }}
            >
              <rect x="9" y="1" width="2" height="2" fill="#4caf50" />
              <rect x="7" y="3" width="2" height="2" fill="#4caf50" />
              <rect x="5" y="5" width="2" height="2" fill="#4caf50" />
              <rect x="3" y="7" width="2" height="2" fill="#4caf50" />
              <rect x="1" y="5" width="2" height="2" fill="#4caf50" />
            </svg>
            <div className={`${pixelFont} text-[8px] text-pixel-green text-center leading-[2]`}>
              {t.successTitle}
              <br />
              <br />
              {t.successBody.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.successBody.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes px-shake {
          0%  { transform: translate(0, 0); }
          20% { transform: translate(4px, 0); }
          40% { transform: translate(-4px, 0); }
          60% { transform: translate(2px, 0); }
          80% { transform: translate(-2px, 0); }
          100%{ transform: translate(0, 0); }
        }
      `}</style>
    </div>
  )
}
