import { IconType } from "react-icons";

// Simple Icons (si)
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiTensorflow,
  SiFigma,
  SiGraphql,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiSwift,
  SiKotlin,
  SiFlutter,
  SiDjango,
  SiFastapi,
  SiVuedotjs,
  SiSvelte,
  SiAngular,
  SiLaravel,
  SiPhp,
  SiGo,
  SiRust,
  SiTailwindcss,
  SiKubernetes,
} from "react-icons/si";

// Bootstrap Icons (bs)
import {
  BsGraphUp,
  BsLightbulb,
  BsSearch,
  BsBarChartLine,
  BsPeople,
  BsChatDots,
  BsPalette,
  BsLaptop,
  BsPen,
  BsBullseye,
  BsEye,
  BsMegaphone,
  BsCloud,
  BsCloudLightning,
  BsGrid,
  BsGithub,
  BsLinkedin,
  BsTwitter,
  BsGlobe,
} from "react-icons/bs";

export interface SkillIcon {
  name: string;
  icon: IconType;
  color: string;
}

// Tech skill icons map
export const techSkillIcons: Record<string, SkillIcon> = {
  // Frontend
  "React": { name: "React", icon: SiReact, color: "#61DAFB" },
  "Next.js": { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  "TypeScript": { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  "Vue.js": { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  "Svelte": { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
  "Angular": { name: "Angular", icon: SiAngular, color: "#DD0031" },
  "Tailwind": { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  "Tailwind CSS": { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },

  // Backend
  "Node.js": { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  "Python": { name: "Python", icon: SiPython, color: "#3776AB" },
  "Django": { name: "Django", icon: SiDjango, color: "#092E20" },
  "FastAPI": { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  "PHP": { name: "PHP", icon: SiPhp, color: "#777BB4" },
  "Laravel": { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  "Go": { name: "Go", icon: SiGo, color: "#00ADD8" },
  "Rust": { name: "Rust", icon: SiRust, color: "#000000" },
  "GraphQL": { name: "GraphQL", icon: SiGraphql, color: "#E10098" },

  // Database
  "PostgreSQL": { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  "MySQL": { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  "MongoDB": { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  "Redis": { name: "Redis", icon: SiRedis, color: "#DC382D" },
  "Firebase": { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },

  // DevOps
  "Docker": { name: "Docker", icon: SiDocker, color: "#2496ED" },
  "Kubernetes": { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  "AWS": { name: "AWS", icon: BsCloudLightning, color: "#FF9900" },
  "Git": { name: "Git", icon: SiGit, color: "#F05032" },

  // Mobile
  "Flutter": { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  "Swift": { name: "Swift", icon: SiSwift, color: "#FA7343" },
  "Kotlin": { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },

  // ML/AI
  "TensorFlow": { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  "Machine Learning": { name: "Machine Learning", icon: BsCloudLightning, color: "#8B5CF6" },
  "Data Science": { name: "Data Science", icon: BsBarChartLine, color: "#3B82F6" },
  "Data Analysis": { name: "Data Analysis", icon: BsBarChartLine, color: "#3B82F6" },
  "NLP": { name: "NLP", icon: BsChatDots, color: "#14B8A6" },
  "Computer Vision": { name: "Computer Vision", icon: BsEye, color: "#EC4899" },

  // Design
  "Figma": { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  "UI/UX Design": { name: "UI/UX Design", icon: BsPalette, color: "#EC4899" },
  "Design Systems": { name: "Design Systems", icon: BsGrid, color: "#8B5CF6" },
  "Prototyping": { name: "Prototyping", icon: BsLaptop, color: "#06B6D4" },
  "User Research": { name: "User Research", icon: BsSearch, color: "#10B981" },
  "Accessibility": { name: "Accessibility", icon: BsEye, color: "#F59E0B" },

  // Soft / Business
  "Leadership": { name: "Leadership", icon: BsPeople, color: "#6366F1" },
  "Business Strategy": { name: "Business Strategy", icon: BsGraphUp, color: "#10B981" },
  "Product Management": { name: "Product Management", icon: BsLightbulb, color: "#F59E0B" },
  "Cloud": { name: "Cloud", icon: BsCloud, color: "#FF9900" },
  "Curriculum Design": { name: "Curriculum Design", icon: BsLaptop, color: "#8B5CF6" },
  "E-Learning": { name: "E-Learning", icon: BsPen, color: "#EC4899" },
  "Pedagogy": { name: "Pedagogy", icon: BsPeople, color: "#14B8A6" },
  "Digital Marketing": { name: "Digital Marketing", icon: BsMegaphone, color: "#EF4444" },
  "Content Strategy": { name: "Content Strategy", icon: BsPen, color: "#8B5CF6" },
  "SEO": { name: "SEO", icon: BsSearch, color: "#10B981" },
  "Social Media": { name: "Social Media", icon: BsMegaphone, color: "#3B82F6" },
  "Brand Management": { name: "Brand Management", icon: BsBullseye, color: "#F59E0B" },
  "Analytics": { name: "Analytics", icon: BsBarChartLine, color: "#06B6D4" },
};

// Social icons with brand colors
export const socialIcons = {
  github: { icon: BsGithub, label: "GitHub", color: "#333333" },
  linkedin: { icon: BsLinkedin, label: "LinkedIn", color: "#0A66C2" },
  twitter: { icon: BsTwitter, label: "Twitter", color: "#1DA1F2" },
  globe: { icon: BsGlobe, label: "Website", color: "#10B981" },
};

// Helper to get skill icon by name
export function getSkillIcon(skillName: string): SkillIcon | null {
  return techSkillIcons[skillName] || null;
}
