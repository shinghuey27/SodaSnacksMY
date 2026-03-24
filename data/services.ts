import { ServiceData } from "@/types/portfolio"

export const services: ServiceData[] = [
  {
    icon: "code",
    title: {
      en: "Web App Development",
      zh: "网页应用开发",
    },
    color: "bg-pixel-blue",
    items: {
      en: [
        "Custom web applications",
        "Progressive Web Apps (PWA)",
        "E-commerce solutions",
        "API development & integration",
      ],
      zh: [
        "定制网页应用",
        "渐进式网页应用 (PWA)",
        "电子商务解决方案",
        "API 开发与集成",
      ],
    },
  },
  {
    icon: "dashboard",
    title: {
      en: "Admin Systems",
      zh: "管理系统",
    },
    color: "bg-pixel-green",
    items: {
      en: [
        "Custom dashboards",
        "Content management systems",
        "Data visualization tools",
        "User management portals",
      ],
      zh: [
        "定制仪表板",
        "内容管理系统",
        "数据可视化工具",
        "用户管理门户",
      ],
    },
  },
  {
    icon: "cog",
    title: {
      en: "Custom Business Systems",
      zh: "定制商业系统",
    },
    color: "bg-pixel-yellow",
    items: {
      en: [
        "Inventory management",
        "CRM solutions",
        "Workflow automation",
        "Reporting & analytics",
      ],
      zh: [
        "库存管理",
        "客户关系管理解决方案",
        "工作流程自动化",
        "报告与分析",
      ],
    },
  },
]
