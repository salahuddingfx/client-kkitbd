export const SITE_CONFIG = {
  name: "KKIT",
  title: "KKIT - Premium Digital Solutions & Learning Platform",
  description:
    "Transform your career with expert-led courses, innovative digital solutions, and cutting-edge technology services.",
  url: "https://kkitbd.com",
  ogImage: "/og-image.png",
  twitterHandle: "@kkitbd",
  keywords: [
    "education",
    "online courses",
    "digital solutions",
    "web development",
    "app development",
    "UI/UX design",
    "technology training",
  ],
};

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "App Development", href: "/services/app-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
  ],
  courses: [
    { label: "Web Development", href: "/courses/web-development" },
    { label: "Mobile App Development", href: "/courses/mobile-app-development" },
    { label: "UI/UX Design", href: "/courses/ui-ux-design" },
    { label: "Data Science", href: "/courses/data-science" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Technologies", href: "/technologies" },
    { label: "Team", href: "/team" },
    { label: "Developers", href: "/developers" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cookies Policy", href: "/cookies-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Community Guidelines", href: "/community-guidelines" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/kkitbd",
  twitter: "https://twitter.com/kkitbd",
  linkedin: "https://linkedin.com/company/kkitbd",
  instagram: "https://instagram.com/kkitbd",
  youtube: "https://youtube.com/@kkitbd",
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};
