"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Breadcrumb, Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { GlowCard } from "@/components/ui";
import { Globe, ExternalLink } from "lucide-react";
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

const developers = [
  {
    id: "1",
    name: "Tanvir Hossain",
    role: "Full-Stack Developer",
    avatar: "/avatars/tanvir.jpg",
    bio: "Passionate about building scalable web applications and mentoring junior developers.",
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
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    id: "2",
    name: "Rafiq Ahmed",
    role: "Backend Developer",
    avatar: "/avatars/rafiq.jpg",
    bio: "Building robust APIs and microservices. Open source contributor and DevOps enthusiast.",
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
    social: {
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    role: "Frontend Developer",
    avatar: "/avatars/nusrat.jpg",
    bio: "Creating beautiful, accessible, and performant user interfaces with modern frameworks.",
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
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "4",
    name: "Sakib Rahman",
    role: "Mobile Developer",
    avatar: "/avatars/sakib.jpg",
    bio: "Crafting cross-platform mobile experiences with Flutter and native development.",
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
    social: {
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: "5",
    name: "Farhana Akter",
    role: "DevOps Engineer",
    avatar: "/avatars/farhana.jpg",
    bio: "Automating infrastructure and streamlining deployment pipelines for maximum efficiency.",
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
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "6",
    name: "Imran Hossain",
    role: "UI/UX Designer & Developer",
    avatar: "/avatars/imran.jpg",
    bio: "Bridging design and development to create intuitive, user-centered digital products.",
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
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
];

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Developers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              The Builders Behind KKIT
            </h1>
            <p className="text-lg text-muted-foreground">
              Meet the talented developers who craft the technology powering your learning experience.
            </p>
            <Breadcrumb items={[{ label: "Developers" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      {/* Developers Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <FadeIn key={dev.id} delay={index * 0.1}>
                <GlowCard variant="glow" className="h-full">
                  <div className="p-6">
                    {/* Avatar & Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={dev.avatar} />
                        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                          {dev.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{dev.name}</h3>
                        <p className="text-sm text-primary font-medium">{dev.role}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{dev.experience}</span>
                          <span>•</span>
                          <span>{dev.projects} projects</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4">{dev.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dev.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background-secondary border border-border text-xs font-medium"
                        >
                          <skill.icon className="h-3.5 w-3.5" style={{ color: skill.color }} />
                          {skill.name}
                        </div>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      {dev.social.github && (
                        <a
                          href={dev.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                          <SiGithub className="h-4 w-4" />
                        </a>
                      )}
                      {dev.social.linkedin && (
                        <a
                          href={dev.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                          <BsLinkedin className="h-4 w-4" />
                        </a>
                      )}
                      {dev.social.twitter && (
                        <a
                          href={dev.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                          <SiX className="h-4 w-4" />
                        </a>
                      )}
                      {dev.social.website && (
                        <a
                          href={dev.social.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re always looking for talented developers who are passionate about education and technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                View Open Positions
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
