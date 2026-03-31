"use client"

import { useEffect, useState } from "react"

interface ToastData {
  icon: string
  title: string
  body: string
}

interface PixelAchievementToastProps {
  toast: ToastData | null
}

export function PixelAchievementToast({ toast }: PixelAchievementToastProps) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState<ToastData | null>(null)

  useEffect(() => {
    if (!toast) return
    setCurrent(toast)
    setVisible(true)
    const id = setTimeout(() => setVisible(false), 3200)
    return () => clearTimeout(id)
  }, [toast])

  if (!current) return null

  return (
    <div
      className="fixed bottom-8 right-6 z-[999] flex items-center gap-3 bg-foreground border-[3px] border-pixel-yellow shadow-[4px_4px_0_0_var(--pixel-yellow)] px-4 py-3 max-w-[280px]"
      style={{
        animation: visible
          ? "toast-in 0.4s ease forwards"
          : "toast-out 0.3s ease forwards",
      }}
    >
      <span className="text-2xl flex-shrink-0">{current.icon}</span>
      <div>
        <p className="font-[family-name:var(--font-pixel)] text-[8px] text-pixel-yellow mb-1 leading-relaxed">
          {current.title}
        </p>
        <p className="font-[family-name:var(--font-pixel)] text-[7px] text-white leading-relaxed">
          {current.body}
        </p>
      </div>
      <style>{`
        @keyframes toast-in  { from{transform:translateX(120%)} to{transform:translateX(0)} }
        @keyframes toast-out { to{opacity:0;transform:translateX(120%)} }
      `}</style>
    </div>
  )
}
