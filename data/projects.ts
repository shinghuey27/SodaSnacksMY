import { ProjectData } from "@/types/portfolio"

export const projects: ProjectData[] = [
  {
    id: "dinoo-island",
    title: {
      en: "Dinoo Island",
      zh: "恐龙岛",
    },
    subtitle: {
      en: "Interactive Web Experience",
      zh: "互动网页体验",
    },
    description: {
      en: "An interactive, pixel-inspired web experience crafted to showcase playful UI, smooth animations, and engaging user interactions.",
      zh: "一个以像素风格为灵感的互动网页体验，展示有趣的UI、流畅的动画和引人入胜的用户互动。",
    },
    highlights: {
      en: [
        "Interactive UI with micro-animations",
        "Distinct pixel-style visual identity",
        "Designed for user engagement and delight",
      ],
      zh: [
        "带有微动画的互动UI",
        "独特的像素风格视觉标识",
        "专为用户参与和愉悦设计",
      ],
    },
    tech: ["React", "Next.js", "Tailwind CSS"],
    cta: {
      en: "Explore Project",
      zh: "探索项目",
    },
    image: "/images/project-dinoo.png",
    accentColor: "green",
    featured: true,
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
  },
  {
    id: "grocery-app",
    title: {
      en: "Grocery Mobile App",
      zh: "杂货移动应用",
    },
    subtitle: {
      en: "Mobile Application",
      zh: "移动应用程序",
    },
    description: {
      en: "A mobile application focused on grocery management and expense tracking, designed with simplicity and daily usability in mind.",
      zh: "一款专注于杂货管理和费用追踪的移动应用，设计简洁，注重日常实用性。",
    },
    highlights: {
      en: [
        "Mobile-first user experience",
        "Clean and intuitive interface",
        "Designed for practical everyday use",
      ],
      zh: [
        "移动优先的用户体验",
        "简洁直观的界面",
        "专为日常实用设计",
      ],
    },
    tech: ["React Native"],
    status: {
      en: "Currently paused, open for further development",
      zh: "目前暂停，可继续开发",
    },
    cta: {
      en: "Preview available",
      zh: "可预览",
    },
    image: "/images/project-grocery.png",
    accentColor: "yellow",
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
  },
]
