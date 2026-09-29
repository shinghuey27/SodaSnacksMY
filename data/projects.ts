import { ProjectData } from "@/types/portfolio"

export const projects: ProjectData[] = [
  {
    id: "claw-warehouse-crm",
    title: {
      en: "Inventory Management CRM",
      zh: "娃娃仓库 & 客户管理系统",
    },
    subtitle: {
      en: "Web App for Stock, Points & Customer Management",
      zh: "库存、积分与客户管理网页应用",
    },
    description: {
      en: "A web application for managing a real-life claw machine store, including stock tracking, customer management, and points system, with an interactive, user-friendly interface.",
      zh: "为真实娃娃机店打造的网页应用，涵盖库存管理、客户关系管理及积分系统，界面互动且易于使用。",
    },
    highlights: {
      en: [
        "Real-time inventory stock tracking",
        "Integrated CRM for managing customer data",
        "Points system for tracking customer scores",
        "Interactive and user-friendly web interface",
      ],
      zh: [
        "多台娃娃机的实时库存追踪",
        "整合客户关系管理功能",
        "客户积分系统，方便管理存分",
        "互动且易用的网页界面",
      ],
    },
    tech: ["React", "Next.js", "Tailwind CSS"],
    cta: {
      en: "Reach out for details",
      zh: "探索项目",
    },
    image: "/images/project-dinoo.png",
    accentColor: "green",
    featured: true,
    badge: "live",
  },
  {
    id: "insurance-admin",
    title: {
      en: "Insurance Admin System",
      zh: "保险管理系统",
    },
    subtitle: {
      en: "Internal Business Tool",
      zh: "内部业务工具",
    },
    description: {
      en: "A real-world internal system designed to manage insurance workflows, streamline administrative processes, and handle structured data efficiently.",
      zh: "一个真实的内部系统，用于管理保险工作流程、简化行政流程并高效处理结构化数据。",
    },
    highlights: {
      en: [
        "Complex form handling and validation",
        "Workflow-based system structure",
        "Organized data management for business operations",
      ],
      zh: [
        "复杂的表单处理和验证",
        "基于工作流的系统结构",
        "为业务运营组织数据管理",
      ],
    },
    tech: ["React", "REST API", "Admin UI"],
    role: {
      en: "Frontend development and UI implementation",
      zh: "前端开发和UI实现",
    },
    cta: {
      en: "Details available upon request",
      zh: "详情可应要求提供",
    },
    image: "/images/project-insurance.jpg",
    accentColor: "blue",
    badge: "live",
  },
  {
    id: "eatwhat-paywhat",
    title: {
      en: "EatWhat & PayWhat",
      zh: "吃什么 & 花什么",
    },
    subtitle: {
      en: "Self-Hosted PWA Suite for Couples",
      zh: "情侣生活自建 PWA 套件",
    },
    description: {
      en: "A pair of self-hosted PWAs sharing one backend: EatWhat is a couples' recipe app with room-based real-time sync and Google login, while PayWhat tracks shared expenses, recurring bills, and receipt-based splits on the same account.",
      zh: "一对共用后端的自建 PWA：EatWhat 是情侣共享食谱与决定今天吃什么的应用，支持房间实时同步与 Google 登录；PayWhat 则在同一账号下管理共同开销、固定账单与收据拆分。",
    },
    highlights: {
      en: [
        "Room-based real-time sync across devices",
        "Google login shared across both apps",
        "AI-assisted recipe parsing (Gemini) and receipt OCR",
        "Installable offline-first PWA with Web Push",
        "Self-hosted Express + PostgreSQL backend",
      ],
      zh: [
        "跨设备的房间级实时同步",
        "两个应用共用 Google 登录",
        "AI 辅助食谱解析（Gemini）与收据 OCR 识别",
        "可安装、离线优先的 PWA，支持 Web Push",
        "自建 Express + PostgreSQL 后端",
      ],
    },
    tech: ["React", "TypeScript", "Vite", "Express", "PostgreSQL", "Firebase Auth", "Gemini API"],
    status: {
      en: "Live, in daily use",
      zh: "已上线，日常使用中",
    },
    cta: {
      en: "View screenshots",
      zh: "查看截图",
    },
    image: "/images/project-eatwhat.png",
    accentColor: "yellow",
    badge: "live",
    showcase: [
      {
        id: "eat",
        label: { en: "EatWhat", zh: "EatWhat" },
        accentColor: "red",
        shots: [
          {
            image: "/images/eatwhat-shots/eat-1-login.jpg",
            feature: { en: "GOOGLE LOGIN", zh: "GOOGLE 登录" },
            caption: {
              en: "One tap in. You're already home.",
              zh: "一键登录，秒入你们的专属空间。",
            },
          },
          {
            image: "/images/eatwhat-shots/eat-2-recipes.jpg",
            feature: { en: "RECIPE LIBRARY", zh: "食谱库" },
            caption: {
              en: "Every recipe you both love, in one place.",
              zh: "你俩喜欢的菜谱，都在这一个库里。",
            },
          },
          {
            image: "/images/eatwhat-shots/eat-3-ai-parse.jpg",
            feature: { en: "AI RECIPE IMPORT", zh: "AI 食谱导入" },
            caption: {
              en: "Paste a recipe or video link to start importing.",
              zh: "粘贴食谱文字或视频链接，开始导入。",
            },
          },
          {
            image: "/images/eatwhat-shots/eat-4-whattoeat.jpg",
            feature: { en: "WHAT TO EAT", zh: "今天吃什么" },
            caption: {
              en: "Can't decide? Let the app pick.",
              zh: "今天吃什么？不用吵了，交给它。",
            },
          },
          {
            image: "/images/eatwhat-shots/eat-5-orders.jpg",
            feature: { en: "TODAY'S ORDERS", zh: "今日点单" },
            caption: {
              en: "See tonight's dishes and who ordered them.",
              zh: "看看今晚点了什么、是谁点的。",
            },
          },
          {
            image: "/images/eatwhat-shots/eat-6-messages.jpg",
            feature: { en: "SHARED MESSAGES", zh: "共享留言" },
            caption: {
              en: "Leave a note while planning dinner together.",
              zh: "一起安排晚餐时，随手留句话。",
            },
          },
        ],
      },
      {
        id: "pay",
        label: { en: "PayWhat", zh: "PayWhat" },
        accentColor: "green",
        shots: [
          {
            image: "/images/eatwhat-shots/pay-1-login.jpg",
            feature: { en: "SHARED LOGIN", zh: "共用登录" },
            caption: {
              en: "Same login. Zero extra setup.",
              zh: "同一个账号，不用重新注册。",
            },
          },
          {
            image: "/images/eatwhat-shots/pay-2-expenses.jpg",
            feature: { en: "EXPENSE LIST", zh: "支出列表" },
            caption: {
              en: "See where every dollar went.",
              zh: "钱花哪了，一眼就清楚。",
            },
          },
          {
            image: "/images/eatwhat-shots/pay-3-overview.jpg",
            feature: { en: "MONTHLY OVERVIEW", zh: "每月概览" },
            caption: {
              en: "See spending, bills and remaining budget together.",
              zh: "支出、账单与剩余预算，一页看清。",
            },
          },
          {
            image: "/images/eatwhat-shots/pay-4-bills.jpg",
            feature: { en: "RECURRING BILLS", zh: "固定账单" },
            caption: {
              en: "Never forget a bill again.",
              zh: "账单再也不会漏掉。",
            },
          },
          {
            image: "/images/eatwhat-shots/pay-5-split.jpg",
            feature: { en: "SHARED EXPENSES", zh: "共同开销" },
            caption: {
              en: "Track who paid and each person's share.",
              zh: "谁付了钱、各自分担多少，一目了然。",
            },
          },
          {
            image: "/images/eatwhat-shots/pay-6-report.jpg",
            feature: { en: "SPLIT REPORT", zh: "分账报告" },
            caption: {
              en: "Explore group spending by category.",
              zh: "按类别查看群组的消费。",
            },
          },
          {
            image: "/images/eatwhat-shots/pay-7-notifications.jpg",
            feature: { en: "IN-APP UPDATES", zh: "应用内通知" },
            caption: {
              en: "Review expense and bill updates in one inbox.",
              zh: "在通知列表查看开销与账单动态。",
            },
          },
        ],
      },
    ],
  },
  {
    id: "erpnext-custom",
    title: {
      en: "ERPNext Customization",
      zh: "ERPNext定制",
    },
    subtitle: {
      en: "ERP System Implementation",
      zh: "ERP系统实施",
    },
    description: {
      en: "Experience working with ERPNext systems, including customization and adapting business workflows such as inventory and operational processes.",
      zh: "具有ERPNext系统工作经验，包括定制和调整库存及运营流程等业务工作流程。",
    },
    highlights: {
      en: [
        "ERP system customization",
        "ERP system configuration",
        "Understanding of business workflows",
        "Inventory and operations flow handling",
      ],
      zh: [
        "ERP系统定制和配置",
        "了解业务工作流程",
        "库存和运营流程处理",
      ],
    },
    tech: ["ERPNext", "Python", "Frappe"],
    role: {
      en: "System customization and implementation support",
      zh: "系统定制和实施支持",
    },
    cta: {
      en: "Experience overview",
      zh: "经验概述",
    },
    image: "/images/project-erpnext.jpg",
    accentColor: "red",
    badge: "live",
  },
]
