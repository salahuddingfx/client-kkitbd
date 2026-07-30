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

// FontAwesome / Bootstrap Icons for Design, Video, Social
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
  BsFacebook,
  BsGlobe,
  BsFilm,
  BsCameraVideo,
  BsBrush,
} from "react-icons/bs";

export interface SkillIcon {
  name: string;
  icon: IconType;
  color: string;
}

// Tech skill & Tool icons map
export const techSkillIcons: Record<string, SkillIcon> = {
  // Frontend
  React: { name: "React", icon: SiReact, color: "#61DAFB" },
  "Next.js": { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  TypeScript: { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  "Vue.js": { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  Svelte: { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
  Angular: { name: "Angular", icon: SiAngular, color: "#DD0031" },
  Tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  "Tailwind CSS": { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },

  // Backend
  "Node.js": { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  Python: { name: "Python", icon: SiPython, color: "#3776AB" },
  Django: { name: "Django", icon: SiDjango, color: "#092E20" },
  FastAPI: { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  PHP: { name: "PHP", icon: SiPhp, color: "#777BB4" },
  Laravel: { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  Go: { name: "Go", icon: SiGo, color: "#00ADD8" },
  Rust: { name: "Rust", icon: SiRust, color: "#000000" },
  GraphQL: { name: "GraphQL", icon: SiGraphql, color: "#E10098" },

  // Database & DevOps
  PostgreSQL: { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  MySQL: { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  MongoDB: { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  Redis: { name: "Redis", icon: SiRedis, color: "#DC382D" },
  Firebase: { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  Docker: { name: "Docker", icon: SiDocker, color: "#2496ED" },
  Kubernetes: { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  Git: { name: "Git", icon: SiGit, color: "#F05032" },

  // Design Tools
  Photoshop: { name: "Adobe Photoshop", icon: BsPalette, color: "#31A8FF" },
  "Adobe Photoshop": { name: "Adobe Photoshop", icon: BsPalette, color: "#31A8FF" },
  Illustrator: { name: "Adobe Illustrator", icon: BsBrush, color: "#FF9A00" },
  "Adobe Illustrator": { name: "Adobe Illustrator", icon: BsBrush, color: "#FF9A00" },
  InDesign: { name: "Adobe InDesign", icon: BsPen, color: "#FF3366" },
  "Adobe InDesign": { name: "Adobe InDesign", icon: BsPen, color: "#FF3366" },
  "Creative Cloud": { name: "Adobe Creative Cloud", icon: BsGrid, color: "#DA1F26" },
  "Adobe Creative Cloud": { name: "Adobe Creative Cloud", icon: BsGrid, color: "#DA1F26" },
  Canva: { name: "Canva", icon: BsBrush, color: "#00C4CC" },
  Photopea: { name: "Photopea", icon: BsPalette, color: "#18A0FB" },
  Figma: { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  "UI/UX Design": { name: "UI/UX Design", icon: BsPalette, color: "#EC4899" },
  "Design Systems": { name: "Design Systems", icon: BsGrid, color: "#8B5CF6" },

  // Video Editing & Animation
  "After Effects": { name: "Adobe After Effects", icon: BsFilm, color: "#9999FF" },
  "Adobe After Effects": { name: "Adobe After Effects", icon: BsFilm, color: "#9999FF" },
  "Premiere Pro": { name: "Adobe Premiere Pro", icon: BsCameraVideo, color: "#9999FF" },
  "Adobe Premiere Pro": { name: "Adobe Premiere Pro", icon: BsCameraVideo, color: "#9999FF" },
  "DaVinci Resolve": { name: "DaVinci Resolve", icon: BsCameraVideo, color: "#E54526" },
  "Adobe Animate": { name: "Adobe Animate", icon: BsFilm, color: "#FF0000" },
  Blender: { name: "Blender 3D", icon: SiBlender, color: "#E87D0D" },
  "Video Editing": { name: "Video Editing", icon: BsFilm, color: "#9999FF" },
  "Animation & Motion": { name: "Animation & Motion", icon: BsLightbulb, color: "#F59E0B" },

  // Social Media, Marketing & SEO
  Meta: { name: "Meta", icon: SiMeta, color: "#0081FB" },
  Facebook: { name: "Facebook", icon: SiFacebook, color: "#1877F2" },
  Instagram: { name: "Instagram", icon: SiInstagram, color: "#E4405F" },
  LinkedIn: { name: "LinkedIn", icon: BsLinkedin, color: "#0A66C2" },
  Pinterest: { name: "Pinterest", icon: SiPinterest, color: "#BD081C" },
  Behance: { name: "Behance", icon: SiBehance, color: "#1769FF" },
  Dribbble: { name: "Dribbble", icon: SiDribbble, color: "#EA4C89" },
  YouTube: { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
  Twitter: { name: "Twitter / X", icon: SiX, color: "#000000" },
  "X Marketing": { name: "X Marketing", icon: SiX, color: "#000000" },
  TikTok: { name: "TikTok", icon: SiTiktok, color: "#000000" },
  "Digital Marketing": { name: "Digital Marketing", icon: BsMegaphone, color: "#EF4444" },
  SEO: { name: "SEO Optimization", icon: BsSearch, color: "#10B981" },
  "Social Media Marketing": { name: "Social Media Marketing", icon: BsMegaphone, color: "#3B82F6" },
};

// Social icons with brand colors
export const socialIcons = {
  github: { icon: BsGithub, label: "GitHub", color: "#333333" },
  linkedin: { icon: BsLinkedin, label: "LinkedIn", color: "#0A66C2" },
  twitter: { icon: SiX, label: "Twitter / X", color: "#000000" },
  facebook: { icon: SiFacebook, label: "Facebook", color: "#1877F2" },
  instagram: { icon: SiInstagram, label: "Instagram", color: "#E4405F" },
  pinterest: { icon: SiPinterest, label: "Pinterest", color: "#BD081C" },
  behance: { icon: SiBehance, label: "Behance", color: "#1769FF" },
  dribbble: { icon: SiDribbble, label: "Dribbble", color: "#EA4C89" },
  youtube: { icon: SiYoutube, label: "YouTube", color: "#FF0000" },
  globe: { icon: BsGlobe, label: "Website", color: "#10B981" },
};

// Helper to get skill icon by name
export function getSkillIcon(skillName: string): SkillIcon | null {
  if (techSkillIcons[skillName]) return techSkillIcons[skillName];
  const normalized = skillName.toLowerCase().trim();
  for (const [key, value] of Object.entries(techSkillIcons)) {
    if (key.toLowerCase() === normalized || normalized.includes(key.toLowerCase())) {
      return value;
    }
  }
  return null;
}
