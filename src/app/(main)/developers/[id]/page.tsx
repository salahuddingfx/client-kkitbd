"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage, Button, GlowCard, Badge } from "@/components/ui";
import { Container, Breadcrumb } from "@/components/common";
import { FadeIn } from "@/components/animations";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  FolderGit2,
  Globe,
  Award,
  CheckCircle2,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiTailwindcss,
  SiFlutter,
  SiDjango,
  SiFastapi,
  SiRedis,
  SiKubernetes,
  SiGo,
  SiSwift,
  SiKotlin,
  SiVuedotjs,
  SiSvelte,
  SiFirebase,
  SiGit,
  SiFigma,
} from "react-icons/si";

export const developersData = [
  {
    id: "1",
    name: "Tanvir Hossain",
    role: "Full-Stack Developer",
    avatar: "/avatars/tanvir.jpg",
    bio: "Passionate full-stack engineer specializing in high-performance web applications, scalable cloud microservices, and modern frontend architecture. Experienced in leading engineering teams, mentoring junior developers, and designing fault-tolerant MERN stack platforms.",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
    experience: "5+ years",
    projects: 40,
    email: "tanvir@kkitbd.com",
    highlights: [
      "Architected real-time WebSocket and SSE streaming pipelines for KKIT learning platform",
      "Optimized frontend bundle sizes, reducing page load times by over 45%",
      "Mentored 200+ bootcamp students in MERN stack development",
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://kkitbd.com",
    },
  },
  {
    id: "2",
    name: "Rafiq Ahmed",
    role: "Backend Developer",
    avatar: "/avatars/rafiq.jpg",
    bio: "Backend architecture specialist focused on high-concurrency RESTful & GraphQL APIs, distributed database optimization, and cloud infrastructure. Open source contributor and passionate DevOps automation engineer.",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    ],
    experience: "4+ years",
    projects: 25,
    email: "rafiq@kkitbd.com",
    highlights: [
      "Designed MongoDB & Redis caching schema for high-throughput payment gateways",
      "Implemented secure JWT & OAuth2 RBAC authorization modules across backend services",
      "Automated CI/CD deployment pipelines using Docker & Kubernetes on cloud VPS",
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    role: "Frontend Developer",
    avatar: "/avatars/nusrat.jpg",
    bio: "Creating beautiful, accessible, and ultra-performant user interfaces with modern React frameworks, Tailwind CSS, and Framer Motion. Dedicated to crafting flawless user journeys and WCAG-compliant web apps.",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
    experience: "3+ years",
    projects: 30,
    email: "nusrat@kkitbd.com",
    highlights: [
      "Developed KKIT design system token library & reusable Radix UI component library",
      "Implemented dark mode glassmorphism themes and smooth micro-animations",
      "Achieved 98+ Lighthouse scores across web client applications",
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "4",
    name: "Sakib Rahman",
    role: "Mobile Developer",
    avatar: "/avatars/sakib.jpg",
    bio: "Crafting cross-platform mobile experiences with Flutter, Dart, and Native iOS/Android SDKs. Specialized in offline-first mobile sync, native hardware integration, and sleek mobile UI interactions.",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Dart", icon: SiFlutter, color: "#02569B" },
      { name: "Swift", icon: SiSwift, color: "#FA7343" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
    experience: "4+ years",
    projects: 20,
    email: "sakib@kkitbd.com",
    highlights: [
      "Published 10+ production mobile applications on Google Play Store & Apple App Store",
      "Integrated push notification services & real-time chat widgets in Flutter apps",
      "Built offline video caching for mobile course players",
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "5",
    name: "Farhana Akter",
    role: "DevOps Engineer",
    avatar: "/avatars/farhana.jpg",
    bio: "Automating cloud infrastructure, zero-downtime deployment pipelines, and server security for enterprise platforms. Expert in Docker containerization, Nginx reverse proxy configuration, and monitoring.",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
    experience: "3+ years",
    projects: 15,
    email: "farhana@kkitbd.com",
    highlights: [
      "Configured PM2 cluster mode & Nginx load balancing for KKIT VPS deployment",
      "Built automated database backup scripts & SSL cert auto-renewal workflows",
      "Reduced server deployment downtime to zero with automated Git Webhooks",
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "6",
    name: "Imran Hossain",
    role: "UI/UX Designer & Developer",
    avatar: "/avatars/imran.jpg",
    bio: "Bridging human-centered visual design and clean frontend code. Specializes in wireframing, high-fidelity Figma prototypes, modern web styling, and interactive component architecture.",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
    ],
    experience: "4+ years",
    projects: 35,
    email: "imran@kkitbd.com",
    highlights: [
      "Designed full UI/UX design kit and interactive wireframes for KKIT platform",
      "Created dynamic landing pages with interactive 3D particle elements",
      "Engineered accessible design systems used across web and mobile products",
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://kkitbd.com",
    },
  },
];

export default function DeveloperDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const dev = developersData.find((d) => d.id === id);

  if (!dev) {
    return (
      <div className="pt-20 pb-16 min-h-[75vh] flex items-center justify-center">
        <Container className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
            <Code2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Developer Not Found</h1>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            The developer profile you are looking for does not exist or has been updated.
          </p>
          <Button onClick={() => router.push("/developers")} variant="default">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Developers
          </Button>
        </Container>
      </div>
    );
  }

  const initials = dev.name.split(" ").map((n) => n[0]).join("");

  return (
    <>
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary border-b border-border">
        <Container>
          <Link
            href="/developers"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Developers Directory
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            <div className="flex-shrink-0 relative">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl">
                <AvatarImage src={dev.avatar} alt={dev.name} />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-background flex items-center gap-1 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Active
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <Code2 className="h-3.5 w-3.5" />
                KKIT Engineering Team
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">{dev.name}</h1>
              <p className="text-lg md:text-xl text-primary font-semibold mt-1">{dev.role}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1 font-medium bg-background px-3 py-1 rounded-lg border border-border">
                  <Briefcase className="h-3.5 w-3.5 text-primary" /> {dev.experience} Experience
                </span>
                <span className="flex items-center gap-1 font-medium bg-background px-3 py-1 rounded-lg border border-border">
                  <FolderGit2 className="h-3.5 w-3.5 text-primary" /> {dev.projects}+ Projects Delivered
                </span>
                {dev.email && (
                  <a href={`mailto:${dev.email}`} className="flex items-center gap-1 font-medium bg-background px-3 py-1 rounded-lg border border-border hover:text-primary transition-colors">
                    <Mail className="h-3.5 w-3.5 text-primary" /> {dev.email}
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-5">
                {dev.social.github && (
                  <a
                    href={dev.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="GitHub Profile"
                  >
                    <SiGithub className="h-4 w-4" />
                  </a>
                )}
                {dev.social.linkedin && (
                  <a
                    href={dev.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="LinkedIn Profile"
                  >
                    <BsLinkedin className="h-4 w-4" />
                  </a>
                )}
                {dev.social.twitter && (
                  <a
                    href={dev.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="Twitter Profile"
                  >
                    <SiX className="h-4 w-4" />
                  </a>
                )}
                {dev.social.website && (
                  <a
                    href={dev.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="Personal Website"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Main Details Body */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Bio Card */}
            <FadeIn>
              <GlowCard variant="glow">
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Biography & Engineering Background
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {dev.bio}
                  </p>
                </div>
              </GlowCard>
            </FadeIn>

            {/* Technical Skills Matrix */}
            <FadeIn delay={0.1}>
              <GlowCard variant="glow">
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    Technical Expertise & Tech Stack
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {dev.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-background border border-border flex flex-col items-center justify-center text-center hover:border-primary/40 transition-all shadow-xs group"
                      >
                        <skill.icon className="h-6 w-6 mb-1.5 group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
                        <span className="text-xs font-semibold text-foreground">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </FadeIn>

            {/* Key Accomplishments & Highlights */}
            {dev.highlights && dev.highlights.length > 0 && (
              <FadeIn delay={0.2}>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Key Platform Contributions & Highlights
                    </h2>
                    <ul className="space-y-3">
                      {dev.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </FadeIn>
            )}

            {/* Contact / Hire Callout */}
            <FadeIn delay={0.3}>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Collaborate with {dev.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Interested in technical consultation, custom project development, or mentorship?
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="default" asChild>
                    <a href={`mailto:${dev.email}`}>
                      <Mail className="mr-1.5 h-4 w-4" /> Send Message
                    </a>
                  </Button>
                  <Button variant="outline" size="default" asChild>
                    <Link href="/contact">
                      Contact Team <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
