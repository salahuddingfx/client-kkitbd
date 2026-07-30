import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiAngular,
  SiVuedotjs,
  SiSvelte,
  SiAstro,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiFastapi,
  SiLaravel,
  SiPhp,
  SiGraphql,
  SiSpringboot,
  SiDotnet,
  SiRust,
  SiGo,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiRedis,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiApachekafka,
  SiRabbitmq,
  SiGit,
  SiVite,
  SiWebpack,
  SiNpm,
  SiYarn,
  SiTerraform,
  SiGooglecloud,
  SiNetlify,
  SiVercel,
  SiCloudflare,
  SiCypress,
  SiJest,
  SiVitest,
  SiPostman,
  SiFigma,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiRedux,
  SiStrapi,
  SiWordpress,
  SiExpress,
  SiSocketdotio,
  SiJsonwebtokens,
  SiAxios,
  SiCloudinary,
  SiGooglemaps,
  SiBlender,
  SiMeta,
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiBehance,
  SiDribbble,
  SiYoutube,
  SiX,
  SiTiktok,
} from "react-icons/si";
import { FaAws, FaJava, FaBrain } from "react-icons/fa";
import { BsCameraVideo, BsBrush, BsLinkedin, BsPalette, BsFilm, BsPen, BsGrid } from "react-icons/bs";
import type { IconType } from "react-icons";

export interface TechInfo {
  icon: IconType;
  color: string;
  label: string;
}

const techMap: Record<string, TechInfo> = {
  // Frontend & Mobile
  react: { icon: SiReact, color: "#61DAFB", label: "React" },
  "react.js": { icon: SiReact, color: "#61DAFB", label: "React" },
  reactjs: { icon: SiReact, color: "#61DAFB", label: "React" },
  nextjs: { icon: SiNextdotjs, color: "#000000", label: "Next.js" },
  "next.js": { icon: SiNextdotjs, color: "#000000", label: "Next.js" },
  typescript: { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  javascript: { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  html: { icon: SiHtml5, color: "#E34F26", label: "HTML5" },
  css: { icon: SiCss, color: "#1572B6", label: "CSS3" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  "tailwindcss": { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  bootstrap: { icon: SiBootstrap, color: "#7952B3", label: "Bootstrap" },
  sass: { icon: SiSass, color: "#CC6699", label: "Sass" },
  angular: { icon: SiAngular, color: "#DD0031", label: "Angular" },
  vue: { icon: SiVuedotjs, color: "#4FC08D", label: "Vue.js" },
  svelte: { icon: SiSvelte, color: "#FF3E00", label: "Svelte" },
  astro: { icon: SiAstro, color: "#FF5D01", label: "Astro" },
  redux: { icon: SiRedux, color: "#764ABC", label: "Redux" },
  flutter: { icon: SiFlutter, color: "#02569B", label: "Flutter" },
  swift: { icon: SiSwift, color: "#FA7343", label: "Swift" },
  kotlin: { icon: SiKotlin, color: "#7F52FF", label: "Kotlin" },

  // Backend & DB
  nodejs: { icon: SiNodedotjs, color: "#339933", label: "Node.js" },
  express: { icon: SiExpress, color: "#000000", label: "Express" },
  python: { icon: SiPython, color: "#3776AB", label: "Python" },
  django: { icon: SiDjango, color: "#092E20", label: "Django" },
  fastapi: { icon: SiFastapi, color: "#009688", label: "FastAPI" },
  laravel: { icon: SiLaravel, color: "#FF2D20", label: "Laravel" },
  php: { icon: SiPhp, color: "#777BB4", label: "PHP" },
  graphql: { icon: SiGraphql, color: "#E10098", label: "GraphQL" },
  rust: { icon: SiRust, color: "#CE422B", label: "Rust" },
  go: { icon: SiGo, color: "#00ADD8", label: "Go" },
  java: { icon: FaJava, color: "#ED8B00", label: "Java" },
  mongodb: { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
  postgresql: { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  mysql: { icon: SiMysql, color: "#4479A1", label: "MySQL" },
  redis: { icon: SiRedis, color: "#DC382D", label: "Redis" },
  prisma: { icon: SiPrisma, color: "#2D3748", label: "Prisma" },
  supabase: { icon: SiSupabase, color: "#3ECF8E", label: "Supabase" },
  firebase: { icon: SiFirebase, color: "#FFCA28", label: "Firebase" },

  // DevOps & Tools
  docker: { icon: SiDocker, color: "#2496ED", label: "Docker" },
  kubernetes: { icon: SiKubernetes, color: "#326CE5", label: "Kubernetes" },
  nginx: { icon: SiNginx, color: "#009639", label: "Nginx" },
  git: { icon: SiGit, color: "#F05032", label: "Git" },
  vite: { icon: SiVite, color: "#646CFF", label: "Vite" },
  webpack: { icon: SiWebpack, color: "#8DD6F9", label: "Webpack" },
  aws: { icon: FaAws, color: "#FF9900", label: "AWS" },
  vercel: { icon: SiVercel, color: "#000000", label: "Vercel" },
  postman: { icon: SiPostman, color: "#FF6C37", label: "Postman" },

  // Design Tools
  photoshop: { icon: BsPalette, color: "#31A8FF", label: "Adobe Photoshop" },
  "adobe photoshop": { icon: BsPalette, color: "#31A8FF", label: "Adobe Photoshop" },
  illustrator: { icon: BsBrush, color: "#FF9A00", label: "Adobe Illustrator" },
  "adobe illustrator": { icon: BsBrush, color: "#FF9A00", label: "Adobe Illustrator" },
  indesign: { icon: BsPen, color: "#FF3366", label: "Adobe InDesign" },
  "adobe indesign": { icon: BsPen, color: "#FF3366", label: "Adobe InDesign" },
  "creative cloud": { icon: BsGrid, color: "#DA1F26", label: "Adobe Creative Cloud" },
  "adobe creative cloud": { icon: BsGrid, color: "#DA1F26", label: "Adobe Creative Cloud" },
  canva: { icon: BsBrush, color: "#00C4CC", label: "Canva" },
  photopea: { icon: BsPalette, color: "#18A0FB", label: "Photopea" },
  figma: { icon: SiFigma, color: "#F24E1E", label: "Figma" },

  // Video Editing & Motion Graphics
  "after effects": { icon: BsFilm, color: "#9999FF", label: "Adobe After Effects" },
  "adobe after effects": { icon: BsFilm, color: "#9999FF", label: "Adobe After Effects" },
  "premiere pro": { icon: BsCameraVideo, color: "#9999FF", label: "Adobe Premiere Pro" },
  "adobe premiere pro": { icon: BsCameraVideo, color: "#9999FF", label: "Adobe Premiere Pro" },
  "davinci resolve": { icon: BsCameraVideo, color: "#E54526", label: "DaVinci Resolve" },
  davinci: { icon: BsCameraVideo, color: "#E54526", label: "DaVinci Resolve" },
  "adobe animate": { icon: BsFilm, color: "#FF0000", label: "Adobe Animate" },
  blender: { icon: SiBlender, color: "#E87D0D", label: "Blender 3D" },

  // Social Media, Marketing & Designer Portfolios
  meta: { icon: SiMeta, color: "#0081FB", label: "Meta" },
  facebook: { icon: SiFacebook, color: "#1877F2", label: "Facebook" },
  instagram: { icon: SiInstagram, color: "#E4405F", label: "Instagram" },
  linkedin: { icon: BsLinkedin, color: "#0A66C2", label: "LinkedIn" },
  pinterest: { icon: SiPinterest, color: "#BD081C", label: "Pinterest" },
  behance: { icon: SiBehance, color: "#1769FF", label: "Behance" },
  dribbble: { icon: SiDribbble, color: "#EA4C89", label: "Dribbble" },
  youtube: { icon: SiYoutube, color: "#FF0000", label: "YouTube" },
  twitter: { icon: SiX, color: "#000000", label: "Twitter / X" },
  x: { icon: SiX, color: "#000000", label: "X (Twitter)" },
  tiktok: { icon: SiTiktok, color: "#000000", label: "TikTok" },
};

/**
 * Get tech info by name (case-insensitive, fuzzy match)
 */
export function getTechInfo(name: string): TechInfo | null {
  if (!name) return null;
  const normalized = name.toLowerCase().trim();
  // Exact match
  if (techMap[normalized]) return techMap[normalized];
  // Partial match
  for (const [key, value] of Object.entries(techMap)) {
    if (normalized.includes(key) || key.includes(normalized)) return value;
  }
  return null;
}

/**
 * Get icon component for a tech name
 */
export function getTechIcon(name: string): IconType | null {
  return getTechInfo(name)?.icon || null;
}

/**
 * Get color for a tech name
 */
export function getTechColor(name: string): string | null {
  return getTechInfo(name)?.color || null;
}

export default techMap;
