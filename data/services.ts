import { ServiceData } from "@/types/portfolio"

export const services: ServiceData[] = [
  {
    icon: "code",
    title: {
      en: "Web Development",
      zh: "网页开发",
    },
    color: "bg-pixel-blue",
    items: {
      en: [
        "React / Next.js web apps",
        "Responsive UI & UX design",
        "Progressive Web Apps (PWAs)",
        "REST API & GraphQL integration",
        "Performance & SEO optimisation",
        "Authentication & user management",
      ],
      zh: [
        "React / Next.js 网页应用",
        "响应式 UI & UX 设计",
        "渐进网页 (PWAs)",
        "REST API & GraphQL 集成",
        "性能与 SEO 优化",
        "认证与用户管理",
      ],
    },
  },
  {
    icon: "phone",
    title: {
      en: "Mobile App Development",
      zh: "移动应用开发",
    },
    color: "bg-pixel-green",
    items: {
      en: [
        "React Native cross-platform apps",
        "Offline-first architecture",
        "Push notifications",
        "App Store & Play Store deployment",
      ],
      zh: [
        "React Native 跨平台应用",
        "iOS & Android 原生构建",
        "离线优先架构",
        "推送通知与深度链接",
        "App Store & 应用商店上架",
      ],
    },
  },
  {
    icon: "cog",
    title: {
      en: "Custom Software Solutions",
      zh: "定制软件解决方案",
    },
    color: "bg-pixel-yellow",
    items: {
      en: [
        "Admin dashboards & CRM systems",
        "Inventory & workflow automation",
        "ERP customisation (ERPNext)",
        "Data analytics & reporting tools",
        "Third-party system integrations",
      ],
      zh: [
        "管理后台与 CRM 系统",
        "库存与工作流自动化",
        "ERP 定制（ERPNext）",
        "数据分析与报表工具",
        "第三方系统集成",
      ],
    },
  },
]