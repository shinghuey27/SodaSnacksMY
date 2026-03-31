"use client";

import { useState, useCallback } from "react";
import { Language } from "@/types/portfolio";
import { PixelMarquee } from "./pixel-marquee";
import { PixelCharacterDuo } from "./pixel-character";
import { PixelAchievementToast } from "./pixel-achievement-toast";

/* ── types ── */
interface ToastData {
  icon: string;
  title: string;
  body: string;
}

/* ── content ── */
const content = {
  en: {
    title: "CONTACT",
    blink: "US_",
    formTitle: "SEND A MESSAGE",
    infoTitle: "CONTACT INFO",
    nameLbl: "► Name",
    emailLbl: "► Email Address",
    topicLbl: "► Quest Type",
    msgLbl: "► Your Message",
    namePH: "Enter your name...",
    emailPH: "hero@example.com",
    msgPH: "Type your request here...",
    topics: [
      "— SELECT MISSION —",
      "⚔ General Inquiry",
      "🛡 Support Request",
      "💰 Pricing / Plans",
      "🗺 Partnership",
      "🐛 Bug Report",
    ],
    send: "SEND MESSAGE",
    sending: "SENDING...",
    successMsg:
      "✅ MESSAGE SENT!\nYOUR QUEST HAS BEEN RECEIVED.\nRESPONSE IN 1–2 BUSINESS DAYS.",
    emailVal: "iwantsodasnacks@gmail.com",
    phone: "+60 11-3765 2814",
    whatsapp: "+60 11-3765 2814",
    address: "Kuala Lumpur",
    hours: "Mon–Fri  09:00–18:00",
    rateLabel: "RESPONSE RATE",
    rateVal: "82 / 100",
    marqueeItems: [
      "OPEN FOR PROJECTS",
      "WEB APPS",
      "ADMIN SYSTEMS",
      "CUSTOM BUILDS",
      "FAST DELIVERY",
      "PIXEL PERFECT",
    ],
    characterMessages: [
      "HI THERE!\nDROP US\nA MESSAGE ✦",
      "WE BUILD\nCOOL STUFF\nTOGETHER!",
      "LET'S START\nYOUR PROJECT\nTODAY!",
    ],
  },
  zh: {
    title: "联系",
    blink: "我们_",
    formTitle: "发送消息",
    infoTitle: "联系方式",
    nameLbl: "► 您的姓名",
    emailLbl: "► 邮箱地址",
    topicLbl: "► 任务类型",
    msgLbl: "► 您的留言",
    namePH: "输入您的姓名...",
    emailPH: "hero@example.com",
    msgPH: "在这里输入您的需求...",
    topics: [
      "— 选择任务 —",
      "⚔ 一般咨询",
      "🛡 技术支持",
      "💰 价格方案",
      "🗺 合作洽谈",
      "🐛 错误报告",
    ],
    send: "发送消息",
    sending: "发送中...",
    successMsg: "✅ 消息已发送！\n您的任务已收到。\n1–2个工作日内回复。",
    emailVal: "iwantsodasnacks@gmail.com",
    phone: "+60 11-3765 2814",
    whatsapp: "+60 11-3765 2814",
    address: "Kuala Lumpur",
    hours: "周一至周五 09:00–18:00",
    rateLabel: "响应率",
    rateVal: "82 / 100",
    marqueeItems: [
      "接受项目",
      "网页应用",
      "管理系统",
      "定制开发",
      "快速交付",
      "像素完美",
    ],
    characterMessages: [
      "你好！\n给我们发\n消息吧 ✦",
      "我们一起\n创造\n酷东西！",
      "今天就开始\n您的项目！",
    ],
  },
};

/* ── WhatsApp SVG icon (pixel-art style) ── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Pixel-art WhatsApp logo built from rects */}
      <rect x="4" y="2" width="16" height="2" />
      <rect x="2" y="4" width="2" height="16" />
      <rect x="20" y="4" width="2" height="16" />
      <rect x="4" y="20" width="10" height="2" />
      <rect x="2" y="18" width="4" height="2" />
      <rect x="14" y="20" width="2" height="2" />
      <rect x="16" y="18" width="2" height="4" />
      <rect x="18" y="16" width="4" height="2" />
      {/* phone handset inside */}
      <rect x="8" y="7" width="2" height="4" />
      <rect x="10" y="9" width="4" height="2" />
      <rect x="14" y="7" width="2" height="4" />
      <rect x="8" y="13" width="8" height="2" />
    </svg>
  );
}

/* ── card corner accents ── */
function CardCorners() {
  return (
    <>
      <div className="absolute -top-px -left-px w-[10px] h-[10px] border-t-[4px] border-l-[4px] border-pixel-blue pointer-events-none" />
      <div className="absolute -top-px -right-px w-[10px] h-[10px] border-t-[4px] border-r-[4px] border-pixel-red pointer-events-none" />
      <div className="absolute -bottom-px -left-px w-[10px] h-[10px] border-b-[4px] border-l-[4px] border-pixel-green pointer-events-none" />
      <div className="absolute -bottom-px -right-px w-[10px] h-[10px] border-b-[4px] border-r-[4px] border-pixel-yellow pointer-events-none" />
    </>
  );
}

/* ── floating background sprites ── */
const SPRITES = ["★", "♥", "◆", "▲", "●", "✦"];
const SPRITE_COLORS = [
  "#f4c430",
  "#e63946",
  "#3a86ff",
  "#4caf50",
  "#9b5de5",
  "#ff6b35",
];

function FloatingSprites() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    emoji: SPRITES[i % SPRITES.length],
    color: SPRITE_COLORS[i % SPRITE_COLORS.length],
    left: `${(i * 5.5) % 100}%`,
    top: `${(i * 7.3) % 100}%`,
    size: 10 + (i % 5) * 2.5,
    dur: 3 + (i % 4) * 1.5,
    delay: -(i % 5) * 1.2,
    opacity: 0.25 + (i % 4) * 0.08,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((s, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{
            left: s.left,
            top: s.top,
            color: s.color,
            fontSize: s.size,
            opacity: s.opacity,
            animation: `px-float ${s.dur}s linear ${s.delay}s infinite`,
          }}
        >
          {s.emoji}
        </div>
      ))}
    </div>
  );
}

/* ── helper: strip non-digits for wa.me link ── */
function toWaLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
interface ContactProps {
  lang: Language;
}

export function Contact({ lang }: ContactProps) {
  const t = content[lang];
  const pxFont =
    lang === "zh"
      ? "font-[family-name:var(--font-chinese)]"
      : "font-[family-name:var(--font-pixel)]";
  const vtFont = "font-[family-name:var(--font-chinese)]";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [toast, setToast] = useState<{ data: ToastData; key: number } | null>(
    null,
  );

  const showToast = useCallback((icon: string, title: string, body: string) => {
    setToast({ data: { icon, title, body }, key: Date.now() });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) return;

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        showToast("🏆", "QUEST ACCEPTED!", "Message sent!");
      } else {
        throw new Error();
      }
    } catch (err) {
      showToast("❌", "FAILED", "Try again");
    }

    setSending(false);
  };

  /* shared hover/press style helpers */
  const infoHover = (e: React.MouseEvent<HTMLDivElement>) =>
    (e.currentTarget.style.boxShadow = "5px 5px 0 rgba(58,58,56,0.8)");
  const infoLeave = (e: React.MouseEvent<HTMLDivElement>) =>
    (e.currentTarget.style.boxShadow = "3px 3px 0 rgba(58,58,56,0.8)");
  const infoDown = (e: React.MouseEvent<HTMLDivElement>) =>
    (e.currentTarget.style.boxShadow = "1px 1px 0 rgba(58,58,56,0.8)");
  const infoUp = (e: React.MouseEvent<HTMLDivElement>) =>
    (e.currentTarget.style.boxShadow = "3px 3px 0 rgba(58,58,56,0.8)");

  const infoItems = [
    {
      icon: "✉",
      colorCls: "bg-pixel-red",
      label: "EMAIL",
      value: t.emailVal,
      href: `mailto:${t.emailVal}`,
      onClick: () => {
        navigator.clipboard?.writeText(t.emailVal).catch(() => {});
        showToast("📋", "COPIED!", t.emailVal);
      },
    },
    {
      icon: "☎",
      colorCls: "bg-pixel-yellow",
      label: "PHONE",
      value: t.phone,
      href: `tel:${t.phone}`,
      onClick: () => {
        navigator.clipboard?.writeText(t.phone).catch(() => {});
        showToast("📋", "COPIED!", t.phone);
      },
    },
    // {
    //   // WhatsApp — green icon box, opens wa.me on click
    //   iconEl: <WhatsAppIcon className="w-5 h-5 text-white" />,
    //   colorCls: "bg-pixel-green",
    //   label: "WHATSAPP",
    //   value: t.whatsapp,
    //   href: toWaLink(t.whatsapp),
    //   badge: lang === "en" ? "TAP TO CHAT ▶" : "点击聊天 ▶",
    //   onClick: undefined, // handled by href
    // },
    {
      icon: "⌂",
      colorCls: "bg-pixel-blue",
      label: "LOCATION",
      value: t.address,
      href: undefined,
      onClick: undefined,
    },
  ];

  return (
    <section id="contact" className="relative py-10 px-5 overflow-hidden">
      {/* keyframes */}
      <style>{`
        @keyframes px-float {
          0%   { transform:translateY(0px)   rotate(0deg); }
          25%  { transform:translateY(-14px) rotate(90deg); }
          50%  { transform:translateY(0px)   rotate(180deg); }
          75%  { transform:translateY(14px)  rotate(270deg); }
          100% { transform:translateY(0px)   rotate(360deg); }
        }
        @keyframes px-block-bounce { from{transform:translateY(0)} to{transform:translateY(-8px)} }
        @keyframes px-blink        { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes px-bar-pulse    { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.15)} }
        @keyframes px-pop-in       { 0%{transform:scale(.8) rotate(-2deg)} 60%{transform:scale(1.05)} 100%{transform:scale(1)} }
        @keyframes px-shake {
          0%  { transform:translate(0,0); }
          20% { transform:translate(4px,0); }
          40% { transform:translate(-4px,0); }
          60% { transform:translate(2px,0); }
          80% { transform:translate(-2px,0); }
          100%{ transform:translate(0,0); }
        }
        @keyframes px-wa-pulse {
          0%,100% { box-shadow: 3px 3px 0 rgba(58,58,56,0.8), 0 0 0 0 rgba(76,175,80,0.4); }
          50%     { box-shadow: 3px 3px 0 rgba(58,58,56,0.8), 0 0 0 6px rgba(76,175,80,0); }
        }
      `}</style>

      <FloatingSprites />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />

      {/* ── Header ── */}
      <div className="text-center mb-10 relative z-10">
        <h2
          className={`${pxFont} text-xl md:text-2xl leading-relaxed text-foreground`}
        >
          {t.title}{" "}
          <span
            className="text-pixel-red inline-block"
            style={{ animation: "px-blink 1.2s step-end infinite" }}
          >
            {t.blink}
          </span>
        </h2>
      </div>

      {/* ── Marquee ── */}
      <div className="max-w-4xl mx-auto mb-10 relative z-10">
        <PixelMarquee items={t.marqueeItems} />
      </div>

      {/* ── Grid ── */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        {/* ══ FORM CARD ══ */}
        <div
          className="relative bg-card border-[3px] border-foreground p-7 transition-[transform,box-shadow] duration-150"
          style={{
            boxShadow: "6px 6px 0 rgba(58,58,56,0.8)",
            outline: "2px dashed rgba(58,58,56,.12)",
            outlineOffset: "-4px",
            animation: shaking ? "px-shake 0.4s ease" : "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "8px 8px 0 rgba(58,58,56,0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "6px 6px 0 rgba(58,58,56,0.8)")
          }
        >
          <CardCorners />

          <div className="flex justify-center mb-5">
            <PixelCharacterDuo
              messages={t.characterMessages}
              screenColor={sent ? "#f4c430" : "#4caf50"}
            />
          </div>

          <h3 className={`${pxFont} mb-5`}>{t.formTitle}</h3>

          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={`${pxFont} text-xs`}>{t.nameLbl}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePH}
                  autoComplete="off"
                  className={`w-full px-3 py-2.5 ${vtFont} text-lg bg-secondary border-[3px] border-foreground text-foreground placeholder:text-muted-foreground outline-none transition-all`}
                  style={{ boxShadow: "3px 3px 0 rgba(58,58,56,0.8)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--pixel-blue)";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 var(--pixel-blue)";
                    e.currentTarget.style.background = "#eef5ff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 rgba(58,58,56,0.8)";
                    e.currentTarget.style.background = "";
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`${pxFont} text-xs`}>{t.emailLbl}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPH}
                  autoComplete="off"
                  className={`w-full px-3 py-2.5 ${vtFont} text-lg bg-secondary border-[3px] border-foreground text-foreground placeholder:text-muted-foreground outline-none transition-all`}
                  style={{ boxShadow: "3px 3px 0 rgba(58,58,56,0.8)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--pixel-blue)";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 var(--pixel-blue)";
                    e.currentTarget.style.background = "#eef5ff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 rgba(58,58,56,0.8)";
                    e.currentTarget.style.background = "";
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`${pxFont} text-xs`}>{t.msgLbl}</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.msgPH}
                  className={`w-full px-3 py-2.5 ${vtFont} text-lg bg-secondary border-[3px] border-foreground text-foreground placeholder:text-muted-foreground outline-none transition-all resize-none`}
                  style={{ boxShadow: "3px 3px 0 rgba(58,58,56,0.8)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--pixel-blue)";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 var(--pixel-blue)";
                    e.currentTarget.style.background = "#eef5ff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow =
                      "3px 3px 0 rgba(58,58,56,0.8)";
                    e.currentTarget.style.background = "";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`${pxFont} relative text-base w-full flex items-center justify-center gap-2.5 py-3.5 px-5 text-white border-[3px] border-foreground overflow-hidden transition-all
                  ${sending ? "bg-pixel-green/80 cursor-wait" : "bg-pixel-green cursor-pointer"}`}
                style={{ boxShadow: "4px 4px 0 rgba(58,58,56,0.8)" }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    e.currentTarget.style.transform = "translate(-2px,-2px)";
                    e.currentTarget.style.boxShadow =
                      "6px 6px 0 rgba(58,58,56,0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "4px 4px 0 rgba(58,58,56,0.8)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(2px,2px)";
                  e.currentTarget.style.boxShadow =
                    "1px 1px 0 rgba(58,58,56,0.8)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "4px 4px 0 rgba(58,58,56,0.8)";
                }}
              >
                {sending && (
                  <span className="absolute left-0 top-0 h-full w-full bg-white/20 transition-all duration-700" />
                )}
                <span className="text-base relative z-10">▶</span>
                <span className="relative z-10">
                  {sending ? t.sending : t.send}
                </span>
              </button>
            </form>
          ) : (
            <div
              className={`${pxFont} text-[9px] p-4 bg-pixel-green text-white border-[3px] border-foreground text-center leading-[1.9]`}
              style={{
                boxShadow: "3px 3px 0 rgba(58,58,56,0.8)",
                animation: "px-pop-in .3s cubic-bezier(.36,.07,.19,.97)",
              }}
            >
              {t.successMsg.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < 2 && <br />}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ══ INFO CARD ══ */}
        <div
          className="relative bg-card border-[3px] border-foreground p-7 transition-[transform,box-shadow] duration-150"
          style={{
            boxShadow: "6px 6px 0 rgba(58,58,56,0.8)",
            outline: "2px dashed rgba(58,58,56,.12)",
            outlineOffset: "-4px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "8px 8px 0 rgba(58,58,56,0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "6px 6px 0 rgba(58,58,56,0.8)")
          }
        >
          <CardCorners />
          <h3 className={`${pxFont} mb-5`}>{t.infoTitle}</h3>

          <div className="flex flex-col gap-4">
            {infoItems.map((item, i) => {
              const isWhatsApp = item.label === "WHATSAPP";
              const inner = (
                <div
                  key={i}
                  onClick={item.onClick}
                  className={`flex items-center gap-3.5 p-3.5 bg-secondary border-2 border-foreground transition-all hover:bg-card active:translate-x-px active:translate-y-px
                    ${item.href ? "cursor-pointer" : "cursor-default"}`}
                  style={{
                    boxShadow: isWhatsApp
                      ? "3px 3px 0 rgba(58,58,56,0.8), 0 0 0 0 rgba(76,175,80,0.4)"
                      : "3px 3px 0 rgba(58,58,56,0.8)",
                    animation: isWhatsApp
                      ? "px-wa-pulse 2.4s ease-in-out infinite"
                      : "none",
                  }}
                  onMouseEnter={infoHover}
                  onMouseLeave={infoLeave}
                  onMouseDown={infoDown}
                  onMouseUp={infoUp}
                >
                  {/* icon box */}
                  <div
                    className={`w-9 h-9 shrink-0 ${item.colorCls} border-2 border-foreground flex items-center justify-center text-lg text-white`}
                  >
                    {/* {item.iconEl ?? item.icon} */}
                    {item.icon}
                  </div>

                  {/* text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-pixel text-[7px] text-muted-foreground mb-1`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`${vtFont} text-base text-foreground truncate`}
                    >
                      {item.value}
                    </p>
                  </div>

                  {/* WhatsApp badge */}
                  {/* {isWhatsApp && (
                    <span
                      className={`${pxFont} text-[7px] text-white bg-pixel-green border border-foreground px-1.5 py-0.5 shrink-0`}
                    >
                      {item.badge}
                    </span>
                  )} */}
                </div>
              );

              // WhatsApp and other href items wrap in <a>
              return item.href ? (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline block"
                >
                  {inner}
                </a>
              ) : (
                inner
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievement toast */}
      <PixelAchievementToast toast={toast?.data ?? null} />
    </section>
  );
}
