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
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Web Engineering", href: "/services/web-development" },
    { label: "Mobile Apps (iOS & Android)", href: "/services/app-development" },
    { label: "UI/UX & Product Design", href: "/services/ui-ux-design" },
    { label: "Cloud & DevOps Solutions", href: "/services" },
    { label: "AI & Custom Automation", href: "/services" },
  ],
  courses: [
    { label: "All Career Courses", href: "/courses" },
    { label: "Live Interactive Bootcamps", href: "/live-classes" },
    { label: "Structured Learning Paths", href: "/learning-paths" },
    { label: "Student Community Forum", href: "/discussions" },
    { label: "Free Lecture Previews", href: "/courses" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team & Mentors", href: "/team" },
    { label: "Portfolio & Case Studies", href: "/portfolio" },
    { label: "Careers & Internships", href: "/careers" },
    { label: "Contact & Helpdesk", href: "/contact" },
  ],
  resources: [
    { label: "Engineering Blog", href: "/blog" },
    { label: "Project Cost Estimator", href: "/services#cost-calculator" },
    { label: "Pricing & Plans", href: "/pricing" },
    { label: "Frequently Asked Questions", href: "/faq" },
    { label: "System Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cookies Policy", href: "/cookies-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Community Guidelines", href: "/community-guidelines" },
  ],
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/kkitbd",
  twitter: "https://twitter.com/kkitbd",
  linkedin: "https://linkedin.com/company/kkitbd",
  instagram: "https://instagram.com/kkitbd",
  youtube: "https://youtube.com/@kkitbd",
};

export const AUTH_COOKIE_NAME = "accessToken";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
