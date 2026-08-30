import type { Metadata } from "next";
import {
  ArrowLeft,
  Database,
  ExternalLink,
  Mail,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactEmail = "iwantsodasnacks@gmail.com";

export const metadata: Metadata = {
  title: "Privacy Policy | SodaSnacks",
  description:
    "How SodaSnacks, EatWhat and PayWhat collect, use and protect personal information.",
  alternates: { canonical: "/privacy" },
};

const sharedSections = [
  {
    icon: ShieldCheck,
    title: "Shared Google sign-in",
    body:
      "EatWhat and PayWhat use the same SodaSnacks Google Firebase project. When you sign in with Google, we process your Firebase user ID and the name, email address and profile photo supplied by Google. The shared Firebase UID lets you use the same identity across both products; access to each product's data remains separate.",
  },
  {
    icon: Database,
    title: "Product data",
    body:
      "EatWhat processes content you choose to add, such as household membership, recipes, ingredients, orders, lists, meal records, messages, photos and preferences. PayWhat currently processes only sign-in information and product-preview activity; it does not yet store expenses, amounts, notes, receipts, OCR content or sharing-group data.",
  },
  {
    icon: Sparkles,
    title: "Optional features",
    body:
      "Only when you choose an AI or recognition feature may selected text, links, ingredient data or uploaded images be sent to a processing provider such as Google Gemini. EatWhat may also process notification subscriptions and public meal-diary shares when you explicitly enable those features.",
  },
  {
    icon: ServerCog,
    title: "Storage and providers",
    body:
      "We use Google Firebase for authentication, together with hosting, database, notification and browser-storage services needed to run our products. Technical logs may include request time, browser type and network address. SodaSnacks does not sell personal information or use advertising trackers in these products.",
  },
  {
    icon: RefreshCw,
    title: "Retention and updates",
    body:
      "We retain information only while needed to provide the service, meet legal or security requirements, or until you delete it or ask us to delete it. PayWhat is still evolving; this policy and its product-specific policy will be updated before new financial-data features begin processing personal information.",
  },
  {
    icon: ShieldCheck,
    title: "Your choices and security",
    body:
      "You may sign out, remove content through the relevant product, or contact us to request access, correction or deletion. We use reasonable safeguards, but no internet transmission or storage system can be guaranteed completely secure.",
  },
];

const zhSections = [
  {
    title: "共用 Google 登录",
    body:
      "EatWhat 与 PayWhat 使用同一个 SodaSnacks Google Firebase 项目。使用 Google 登录时，我们会处理 Firebase 用户识别码，以及 Google 提供的姓名、电邮地址和头像。同一个 Firebase UID 让你在两个产品使用同一身份，但各产品的资料权限仍然分开管理。",
  },
  {
    title: "产品资料",
    body:
      "EatWhat 会处理你主动加入的家庭成员关系、食谱、食材、点单、清单、用餐记录、留言、照片和偏好等内容。PayWhat 目前只处理登录资料与产品预览，尚未储存开销、金额、备注、收据、OCR 内容或共享群组资料。",
  },
  {
    title: "服务、保留与选择",
    body:
      "我们使用 Google Firebase，以及提供托管、数据库、通知、浏览器储存和可选 AI 功能所需的供应商。SodaSnacks 不出售个人资料，也不在这些产品使用广告追踪器。资料只会在提供服务、符合法律或安全需要的期间保留；你可以在产品内删除内容，或联系我们查询、更正及要求删除资料。",
  },
  {
    title: "政策更新",
    body:
      "PayWhat 的功能仍会继续开发。任何新增个人或财务资料处理的功能，都会在上线前更新本政策及产品专属政策。重大改变会以适当方式通知用户。",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fbf9f0] text-[#3a3a38]">
      <div className="border-b-4 border-[#3a3a38] bg-[#f4c430]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase hover:underline"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to SodaSnacks
          </a>
          <span className="border-2 border-[#3a3a38] bg-[#fbf9f0] px-3 py-1 font-[family-name:var(--font-pixel)] text-[9px]">
            PRIVACY v1.0
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <header className="grid items-center gap-8 border-4 border-[#3a3a38] bg-white p-6 shadow-[8px_8px_0_#3a3a38] sm:grid-cols-[1fr_auto] sm:p-10">
          <div>
            <p className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] text-[#e63946]">
              SODASNACKS / EATWHAT / PAYWHAT
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#666]">
              This policy explains how SodaSnacks handles information across
              our shared Google sign-in and our EatWhat and PayWhat products.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#777]">
              Effective date: 30 August 2026
            </p>
          </div>
          <img
            src="/pixel-logo.png"
            alt="SodaSnacks"
            className="mx-auto h-28 w-28 object-contain sm:h-36 sm:w-36"
          />
        </header>

        <section className="mt-14" aria-labelledby="shared-policy">
          <div className="mb-6 flex items-end justify-between gap-4 border-b-4 border-[#3a3a38] pb-3">
            <h2 id="shared-policy" className="text-2xl font-black sm:text-3xl">
              Shared SodaSnacks policy
            </h2>
            <span className="hidden font-[family-name:var(--font-pixel)] text-[9px] text-[#777] sm:block">
              ENGLISH
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {sharedSections.map(({ icon: Icon, title, body }, index) => (
              <article
                key={title}
                className="border-3 border-[#3a3a38] bg-white p-5 shadow-[4px_4px_0_#3a3a38]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center border-2 border-[#3a3a38] ${
                      ["bg-[#e63946] text-white", "bg-[#f4c430]", "bg-[#4caf50] text-white", "bg-[#3a86ff] text-white"][index % 4]
                    }`}
                  >
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <h3 className="font-black">{title}</h3>
                </div>
                <p className="text-sm leading-7 text-[#5f5f5b]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" lang="zh-Hans" aria-labelledby="zh-policy">
          <div className="mb-6 flex items-end justify-between gap-4 border-b-4 border-[#3a3a38] pb-3">
            <h2 id="zh-policy" className="font-chinese text-2xl font-black sm:text-3xl">
              中文说明
            </h2>
            <span className="hidden font-[family-name:var(--font-pixel)] text-[9px] text-[#777] sm:block">
              中文
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {zhSections.map(({ title, body }) => (
              <article key={title} className="border-3 border-[#3a3a38] bg-[#fffdf4] p-5">
                <h3 className="font-chinese text-lg font-black">{title}</h3>
                <p className="mt-3 font-chinese text-sm leading-7 text-[#5f5f5b]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 border-4 border-[#3a3a38] bg-[#3a3a38] p-6 text-[#fbf9f0] sm:p-8">
          <h2 className="text-2xl font-black">Product-specific details</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#ddd]">
            Each product also publishes details about its own features. If a
            product-specific policy differs from this shared overview, the more
            specific explanation applies to that product.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://eatwhat.sodasnacks.my/privacy"
              className="inline-flex items-center justify-between gap-4 border-2 border-[#fbf9f0] bg-[#f4c430] px-4 py-3 font-bold text-[#3a3a38] hover:bg-white"
            >
              EatWhat Privacy <ExternalLink size={16} aria-hidden="true" />
            </a>
            <a
              href="https://paywhat.sodasnacks.my/privacy"
              className="inline-flex items-center justify-between gap-4 border-2 border-[#fbf9f0] bg-[#3a86ff] px-4 py-3 font-bold text-white hover:bg-white hover:text-[#3a3a38]"
            >
              PayWhat Privacy <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mt-8 border-4 border-[#3a3a38] bg-white p-6 text-center shadow-[6px_6px_0_#e63946] sm:p-8">
          <Mail className="mx-auto" size={28} aria-hidden="true" />
          <h2 className="mt-3 text-xl font-black">Questions or data requests?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#666]">
            Contact us to ask about your information or request access,
            correction or deletion. We may need to verify your identity before
            completing a request.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-5 inline-flex border-3 border-[#3a3a38] bg-[#e63946] px-5 py-3 font-bold text-white shadow-[4px_4px_0_#3a3a38] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            {contactEmail}
          </a>
        </section>
      </div>
    </main>
  );
}
