import { ProjectData } from "@/types/portfolio"

export const projects: ProjectData[] = [
  {
    id: "inventory-membership",
    title: {
      en: "Custom Inventory & Membership System",
      zh: "定制库存与会员系统",
    },
    client: {
      en: "Local Retail Business",
      zh: "本地零售企业",
    },
    description: {
      en: "A comprehensive solution built from the ground up to manage inventory tracking, member subscriptions, and point-of-sale operations. The system includes real-time stock updates, automated reorder alerts, and a member rewards program.",
      zh: "从零开始构建的综合解决方案，用于管理库存跟踪、会员订阅和销售点运营。该系统包括实时库存更新、自动补货提醒和会员奖励计划。",
    },
    features: {
      en: [
        "Real-time inventory tracking",
        "Member subscription management",
        "Automated reporting dashboard",
        "Mobile-friendly admin panel",
      ],
      zh: [
        "实时库存跟踪",
        "会员订阅管理",
        "自动化报告仪表板",
        "移动端友好管理面板",
      ],
    },
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
    accentColor: "blue",
  },
  {
    id: "restaurant-ordering",
    title: {
      en: "Restaurant Online Ordering Platform",
      zh: "餐厅在线点餐平台",
    },
    client: {
      en: "F&B Chain Group",
      zh: "餐饮连锁集团",
    },
    description: {
      en: "A modern online ordering system with real-time order tracking, kitchen display integration, and multi-location management. Features include QR code menu scanning, payment gateway integration, and customer loyalty rewards.",
      zh: "现代化在线点餐系统，具有实时订单追踪、厨房显示集成和多门店管理功能。包括二维码菜单扫描、支付网关集成和客户忠诚度奖励。",
    },
    features: {
      en: [
        "QR code menu scanning",
        "Real-time order tracking",
        "Kitchen display system",
        "Multi-location support",
      ],
      zh: [
        "二维码菜单扫描",
        "实时订单追踪",
        "厨房显示系统",
        "多门店支持",
      ],
    },
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    accentColor: "green",
  },
  {
    id: "booking-system",
    title: {
      en: "Service Booking Management",
      zh: "服务预约管理系统",
    },
    client: {
      en: "Beauty & Wellness Spa",
      zh: "美容养生会所",
    },
    description: {
      en: "An all-in-one booking and management system for service-based businesses. Includes online appointment scheduling, staff management, automated reminders, and integrated payment processing.",
      zh: "适用于服务型企业的一站式预约管理系统。包括在线预约调度、员工管理、自动提醒和集成支付处理。",
    },
    features: {
      en: [
        "Online appointment booking",
        "Staff schedule management",
        "Automated SMS reminders",
        "Customer history tracking",
      ],
      zh: [
        "在线预约",
        "员工排班管理",
        "自动短信提醒",
        "客户历史追踪",
      ],
    },
    tech: ["Next.js", "Supabase", "Twilio", "Tailwind CSS"],
    accentColor: "red",
  },
]
