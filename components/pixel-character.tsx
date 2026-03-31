"use client"

import { useEffect, useState } from "react"

interface PixelCharacterDuoProps {
  messages?: string[]
  screenColor?: string
}

const defaultMessages = [
  "HI THERE!\nDROP US\nA MESSAGE ✦",
  "WE BUILD\nCOOL STUFF\nTOGETHER!",
  "FAST REPLIES\nGUARANTEED ⚡",
  "LET'S START\nYOUR PROJECT\nTODAY!",
]

export function PixelCharacterDuo({
  messages = defaultMessages,
  screenColor = "#4caf50",
}: PixelCharacterDuoProps) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [blinkBoy, setBlinkBoy] = useState(false)
  const [blinkGirl, setBlinkGirl] = useState(false)

  useEffect(() => {
    const msgId = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length)
    }, 3000)
    return () => clearInterval(msgId)
  }, [messages.length])

  // Staggered blinks
  useEffect(() => {
    const boyId = setInterval(() => {
      setBlinkBoy(true)
      setTimeout(() => setBlinkBoy(false), 130)
    }, 3200)
    const girlId = setInterval(() => {
      setBlinkGirl(true)
      setTimeout(() => setBlinkGirl(false), 130)
    }, 4100)
    return () => { clearInterval(boyId); clearInterval(girlId) }
  }, [])

  const lines = messages[msgIndex].split("\n")
  const eyeColorBoy  = blinkBoy  ? "#f4c430" : "#3a3a38"
  const eyeColorGirl = blinkGirl ? "#f9a8c9" : "#3a3a38"

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Speech bubble */}
      <div
        className="relative bg-card border-2 border-foreground shadow-[2px_2px_0_0_rgba(58,58,56,0.8)] px-4 py-2.5 text-center"
        style={{ animation: "duo-bob 2.4s ease-in-out infinite" }}
      >
        <p className="font-[family-name:var(--font-pixel)] text-[7px] leading-[1.9] text-foreground whitespace-pre-line">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
        {/* Tail */}
        <div
          className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-card border-r-2 border-b-2 border-foreground"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
      </div>

      {/* Characters side by side */}
      <div className="flex items-end gap-4 mt-1">
        {/* ── BOY (coder, blue hoodie, dark hair) ── */}
        <svg
          width="52" height="72"
          viewBox="0 0 13 18"
          style={{ imageRendering: "pixelated", animation: "duo-idle 1s steps(1) infinite" }}
        >
          {/* hair */}
          <rect x="3" y="0" width="7" height="1" fill="#3a3a38"/>
          <rect x="2" y="1" width="9" height="1" fill="#3a3a38"/>
          {/* head */}
          <rect x="3" y="1" width="7" height="5" fill="#f4c430"/>
          {/* eyes */}
          <rect x="4" y="3" width="1" height="1" fill={eyeColorBoy}/>
          <rect x="8" y="3" width="1" height="1" fill={eyeColorBoy}/>
          {/* smile */}
          <rect x="5" y="5" width="3" height="1" fill="#c0703a"/>
          {/* neck */}
          <rect x="5" y="6" width="3" height="1" fill="#f4c430"/>
          {/* body – blue hoodie */}
          <rect x="2" y="7" width="9" height="5" fill="#3a86ff"/>
          {/* pocket */}
          <rect x="5" y="9" width="3" height="2" fill="#2a70e8"/>
          {/* arms */}
          <rect x="0" y="7" width="2" height="4" fill="#3a86ff"/>
          <rect x="11" y="7" width="2" height="4" fill="#3a86ff"/>
          {/* hands */}
          <rect x="0" y="11" width="2" height="1" fill="#f4c430"/>
          <rect x="11" y="11" width="2" height="1" fill="#f4c430"/>
          {/* pants */}
          <rect x="3" y="12" width="3" height="3" fill="#3a3a38"/>
          <rect x="7" y="12" width="3" height="3" fill="#3a3a38"/>
          {/* shoes */}
          <rect x="2" y="15" width="4" height="2" fill="#222"/>
          <rect x="7" y="15" width="4" height="2" fill="#222"/>
        </svg>

        {/* ── GIRL (pink outfit, ponytail) ── */}
        <svg
          width="52" height="72"
          viewBox="0 0 13 18"
          style={{ imageRendering: "pixelated", animation: "duo-idle 1s steps(1) infinite 0.5s" }}
        >
          {/* ponytail */}
          <rect x="9" y="0" width="2" height="4" fill="#9b5de5"/>
          <rect x="10" y="4" width="2" height="2" fill="#9b5de5"/>
          {/* hair top */}
          <rect x="2" y="0" width="9" height="2" fill="#9b5de5"/>
          <rect x="2" y="2" width="2" height="2" fill="#9b5de5"/>
          {/* head */}
          <rect x="3" y="1" width="7" height="5" fill="#f9c97e"/>
          {/* eyes */}
          <rect x="4" y="3" width="1" height="1" fill={eyeColorGirl}/>
          <rect x="8" y="3" width="1" height="1" fill={eyeColorGirl}/>
          {/* lashes */}
          <rect x="4" y="2" width="2" height="1" fill="#3a3a38"/>
          <rect x="8" y="2" width="2" height="1" fill="#3a3a38"/>
          {/* smile */}
          <rect x="5" y="5" width="1" height="1" fill="#c0703a"/>
          <rect x="7" y="5" width="1" height="1" fill="#c0703a"/>
          {/* neck */}
          <rect x="5" y="6" width="3" height="1" fill="#f9c97e"/>
          {/* dress – pink */}
          <rect x="3" y="7" width="7" height="5" fill="#e63946"/>
          {/* dress collar */}
          <rect x="5" y="7" width="3" height="1" fill="#fff"/>
          {/* arms */}
          <rect x="1" y="7" width="2" height="4" fill="#f9c97e"/>
          <rect x="10" y="7" width="2" height="4" fill="#f9c97e"/>
          {/* skirt flare */}
          <rect x="2" y="12" width="9" height="2" fill="#e63946"/>
          {/* legs */}
          <rect x="4" y="14" width="2" height="2" fill="#f9c97e"/>
          <rect x="7" y="14" width="2" height="2" fill="#f9c97e"/>
          {/* shoes */}
          <rect x="3" y="16" width="3" height="2" fill="#9b5de5"/>
          <rect x="7" y="16" width="3" height="2" fill="#9b5de5"/>
        </svg>
      </div>

      {/* Bouncing dots */}
      <div className="flex gap-1.5 mt-1">
        {(["#e63946","#f4c430","#4caf50","#3a86ff"] as const).map((color, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{
              background: color,
              animation: `duo-blink 1.2s step-end infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes duo-bob  { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-5px); } }
        @keyframes duo-idle { 0%{ opacity:1; } 50%{ opacity:0.93; } }
        @keyframes duo-blink{ 0%,100%{ opacity:1; } 50%{ opacity:0.15; } }
      `}</style>
    </div>
  )
}