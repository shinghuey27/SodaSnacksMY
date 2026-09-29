"use client";

import { useEffect, useState } from "react";
import { PixelSprite } from "./pixel-sprite";
import { MASCOT_S, MASCOT_K } from "./sprites/mascot-data";

interface PixelCharacterDuoProps {
  messages?: string[];
  screenColor?: string;
}

const defaultMessages = [
  "HI THERE!\nDROP US\nA MESSAGE ✦",
  "WE BUILD\nCOOL STUFF\nTOGETHER!",
  "FAST REPLIES\nGUARANTEED ⚡",
  "LET'S START\nYOUR PROJECT\nTODAY!",
];

export function PixelCharacterDuo({
  messages = defaultMessages,
  screenColor = "#4caf50",
}: PixelCharacterDuoProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative bg-card border-2 border-foreground shadow-[2px_2px_0_0_rgba(58,58,56,0.8)] px-4 py-2.5 text-center"
        style={{ animation: "duo-bob 2.4s ease-in-out infinite" }}
      >
        <p className="font-chinese text-xs leading-[1.9] text-foreground whitespace-pre-line">
          {messages[msgIndex]}
        </p>
        <div
          className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-card border-r-2 border-b-2 border-foreground"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
      </div>

      <div className="flex items-end gap-3 mt-1" aria-label="S 和 K 像素吉祥物">
        <PixelSprite sprite={MASCOT_S} anim="greet" fps={2} className="w-[62px] h-auto" />
        <PixelSprite sprite={MASCOT_K} anim="greet" fps={1.7} className="w-[62px] h-auto" />
      </div>

      <div className="flex gap-1.5 mt-1" aria-hidden="true">
        {[screenColor, "#f4c430", "#4caf50", "#3a86ff"].map((color, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{
              background: color,
              animation: "duo-blink 1.2s step-end infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes duo-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes duo-blink { 0%,100% { opacity: 1; } 50% { opacity: .15; } }
      `}</style>
    </div>
  );
}
