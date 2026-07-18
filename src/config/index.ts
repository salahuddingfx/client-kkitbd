export const SITE_CONFIG = {
  name: "KKIT",
  title: "KKIT | Enterprise Tech & Training Platform",
  description:
    "Accelerate your career and business with enterprise-grade tech training, professional development courses, and world-class development services.",
  url: "https://kkitbd.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/kkitbd",
    facebook: "https://facebook.com/kkitbd",
    github: "https://github.com/kkitbd",
    linkedin: "https://linkedin.com/company/kkitbd",
  },
  contact: {
    email: "info@kkitbd.com",
    phone: "+880 1XXX-XXXXXX",
    address: "Dhaka, Bangladesh",
  },
} as const;

export const DASHBOARD_CONFIG = {
  sidebarWidth: "w-64",
  collapsedSidebarWidth: "w-20",
  headerHeight: "h-16",
  maxAvatarSize: "5MB",
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  },
} as const;

export const COURSE_CONFIG = {
  levels: ["Beginner", "Intermediate", "Advanced"] as const,
  categories: [] as const,
  maxProgress: 100,
  certificateThreshold: 100,
} as const;
