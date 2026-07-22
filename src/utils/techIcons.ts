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
  SiTypescript as SiTs,
} from "react-icons/si";
import { FaAws, FaJava, FaBrain } from "react-icons/fa";
import type { IconType } from "react-icons";

export interface TechInfo {
  icon: IconType;
  color: string;
  label: string;
}

const techMap: Record<string, TechInfo> = {
  // Frontend
  react: { icon: SiReact, color: "#61DAFB", label: "React" },
  "react.js": { icon: SiReact, color: "#61DAFB", label: "React" },
  "reactjs": { icon: SiReact, color: "#61DAFB", label: "React" },
  nextjs: { icon: SiNextdotjs, color: "#000000", label: "Next.js" },
  "next.js": { icon: SiNextdotjs, color: "#000000", label: "Next.js" },
  next: { icon: SiNextdotjs, color: "#000000", label: "Next.js" },
  typescript: { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  ts: { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  javascript: { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  js: { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  html: { icon: SiHtml5, color: "#E34F26", label: "HTML5" },
  html5: { icon: SiHtml5, color: "#E34F26", label: "HTML5" },
  css: { icon: SiCss, color: "#1572B6", label: "CSS3" },
  css3: { icon: SiCss, color: "#1572B6", label: "CSS3" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  "tailwindcss": { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  bootstrap: { icon: SiBootstrap, color: "#7952B3", label: "Bootstrap" },
  sass: { icon: SiSass, color: "#CC6699", label: "Sass" },
  scss: { icon: SiSass, color: "#CC6699", label: "Sass" },
  angular: { icon: SiAngular, color: "#DD0031", label: "Angular" },
  vue: { icon: SiVuedotjs, color: "#4FC08D", label: "Vue.js" },
  "vue.js": { icon: SiVuedotjs, color: "#4FC08D", label: "Vue.js" },
  vuejs: { icon: SiVuedotjs, color: "#4FC08D", label: "Vue.js" },
  svelte: { icon: SiSvelte, color: "#FF3E00", label: "Svelte" },
  astro: { icon: SiAstro, color: "#FF5D01", label: "Astro" },
  redux: { icon: SiRedux, color: "#764ABC", label: "Redux" },

  // Backend
  nodejs: { icon: SiNodedotjs, color: "#339933", label: "Node.js" },
  "node.js": { icon: SiNodedotjs, color: "#339933", label: "Node.js" },
  node: { icon: SiNodedotjs, color: "#339933", label: "Node.js" },
  express: { icon: SiExpress, color: "#000000", label: "Express" },
  "express.js": { icon: SiExpress, color: "#000000", label: "Express" },
  expressjs: { icon: SiExpress, color: "#000000", label: "Express" },
  python: { icon: SiPython, color: "#3776AB", label: "Python" },
  django: { icon: SiDjango, color: "#092E20", label: "Django" },
  fastapi: { icon: SiFastapi, color: "#009688", label: "FastAPI" },
  laravel: { icon: SiLaravel, color: "#FF2D20", label: "Laravel" },
  php: { icon: SiPhp, color: "#777BB4", label: "PHP" },
  graphql: { icon: SiGraphql, color: "#E10098", label: "GraphQL" },
  "spring boot": { icon: SiSpringboot, color: "#6DB33F", label: "Spring Boot" },
  springboot: { icon: SiSpringboot, color: "#6DB33F", label: "Spring Boot" },
  ".net": { icon: SiDotnet, color: "#512BD4", label: ".NET" },
  dotnet: { icon: SiDotnet, color: "#512BD4", label: ".NET" },
  rust: { icon: SiRust, color: "#CE422B", label: "Rust" },
  go: { icon: SiGo, color: "#00ADD8", label: "Go" },
  golang: { icon: SiGo, color: "#00ADD8", label: "Go" },
  java: { icon: FaJava, color: "#ED8B00", label: "Java" },
  socketio: { icon: SiSocketdotio, color: "#010101", label: "Socket.io" },
  "socket.io": { icon: SiSocketdotio, color: "#010101", label: "Socket.io" },
  jwt: { icon: SiJsonwebtokens, color: "#000000", label: "JWT" },
  axios: { icon: SiAxios, color: "#5A29E4", label: "Axios" },

  // Database
  mongodb: { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
  mongo: { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
  postgresql: { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  postgres: { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  mysql: { icon: SiMysql, color: "#4479A1", label: "MySQL" },
  sqlite: { icon: SiSqlite, color: "#003B57", label: "SQLite" },
  redis: { icon: SiRedis, color: "#DC382D", label: "Redis" },
  prisma: { icon: SiPrisma, color: "#2D3748", label: "Prisma" },
  supabase: { icon: SiSupabase, color: "#3ECF8E", label: "Supabase" },
  firebase: { icon: SiFirebase, color: "#FFCA28", label: "Firebase" },

  // DevOps / Cloud
  docker: { icon: SiDocker, color: "#2496ED", label: "Docker" },
  kubernetes: { icon: SiKubernetes, color: "#326CE5", label: "Kubernetes" },
  k8s: { icon: SiKubernetes, color: "#326CE5", label: "Kubernetes" },
  nginx: { icon: SiNginx, color: "#009639", label: "Nginx" },
  kafka: { icon: SiApachekafka, color: "#231F20", label: "Kafka" },
  rabbitmq: { icon: SiRabbitmq, color: "#FF6600", label: "RabbitMQ" },
  terraform: { icon: SiTerraform, color: "#7B42BC", label: "Terraform" },
  gcp: { icon: SiGooglecloud, color: "#4285F4", label: "Google Cloud" },
  "google cloud": { icon: SiGooglecloud, color: "#4285F4", label: "Google Cloud" },
  aws: { icon: FaAws, color: "#FF9900", label: "AWS" },
  vercel: { icon: SiVercel, color: "#000000", label: "Vercel" },
  netlify: { icon: SiNetlify, color: "#00C7B7", label: "Netlify" },
  cloudflare: { icon: SiCloudflare, color: "#F38020", label: "Cloudflare" },

  // Tools
  git: { icon: SiGit, color: "#F05032", label: "Git" },
  github: { icon: SiGit, color: "#F05032", label: "GitHub" },
  vite: { icon: SiVite, color: "#646CFF", label: "Vite" },
  webpack: { icon: SiWebpack, color: "#8DD6F9", label: "Webpack" },
  npm: { icon: SiNpm, color: "#CB3837", label: "NPM" },
  yarn: { icon: SiYarn, color: "#2C8EBB", label: "Yarn" },
  pnpm: { icon: SiNpm, color: "#CB3837", label: "pnpm" },
  postman: { icon: SiPostman, color: "#FF6C37", label: "Postman" },
  figma: { icon: SiFigma, color: "#F24E1E", label: "Figma" },
  cypress: { icon: SiCypress, color: "#17202C", label: "Cypress" },
  jest: { icon: SiJest, color: "#C21325", label: "Jest" },
  vitest: { icon: SiVitest, color: "#6E9F18", label: "Vitest" },

  // CMS / Mobile
  strapi: { icon: SiStrapi, color: "#4945FF", label: "Strapi" },
  wordpress: { icon: SiWordpress, color: "#21759B", label: "WordPress" },
  flutter: { icon: SiFlutter, color: "#02569B", label: "Flutter" },
  swift: { icon: SiSwift, color: "#FA7343", label: "Swift" },
  kotlin: { icon: SiKotlin, color: "#7F52FF", label: "Kotlin" },

  // AI / Maps
  openai: { icon: FaBrain, color: "#412991", label: "OpenAI" },
  "google maps": { icon: SiGooglemaps, color: "#4285F4", label: "Google Maps" },
  gmaps: { icon: SiGooglemaps, color: "#4285F4", label: "Google Maps" },
  cloudinary: { icon: SiCloudinary, color: "#F4F4F4", label: "Cloudinary" },
};

/**
 * Get tech info by name (case-insensitive, fuzzy match)
 */
export function getTechInfo(name: string): TechInfo | null {
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
