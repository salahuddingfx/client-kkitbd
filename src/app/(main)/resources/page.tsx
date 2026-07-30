"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/common";
import { GlowCard, Button } from "@/components/ui";
import {
  Download,
  ExternalLink,
  Search,
  BookOpen,
  Code2,
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import { SiGithub, SiReact, SiNextdotjs, SiDocker, SiPython, SiTypescript } from "react-icons/si";
import { toast } from "sonner";

interface ResourceItem {
  id: string;
  title: string;
  category: "Starter Kits" | "Cheat Sheets" | "Roadmaps" | "Architecture";
  description: string;
  format: "GitHub Repo" | "PDF Guide" | "Figma File" | "ZIP Starter";
  icon: any;
  iconColor: string;
  downloadsCount: number;
  tags: string[];
  link: string;
  isPopular?: boolean;
}

const RESOURCES_DATA: ResourceItem[] = [
  {
    id: "mern-starter",
    title: "MERN Stack Enterprise Boilerplate 2026",
    category: "Starter Kits",
    description: "Production-ready Express, Node.js, MongoDB, and Next.js App Router boilerplate with JWT authentication, role management, and Zod validation.",
    format: "GitHub Repo",
    icon: SiNextdotjs,
    iconColor: "text-foreground",
    downloadsCount: 1420,
    tags: ["Next.js", "Express", "TypeScript", "JWT"],
    link: "https://github.com/kkitbd/mern-enterprise-starter",
    isPopular: true,
  },
  {
    id: "fullstack-roadmap",
    title: "2026 Full-Stack Web Engineering Roadmap",
    category: "Roadmaps",
    description: "Step-by-step visual career guide covering modern JavaScript, React 19, Next.js, Node.js microservices, Docker, and DevOps pipelines.",
    format: "PDF Guide",
    icon: Layers,
    iconColor: "text-blue-500",
    downloadsCount: 3850,
    tags: ["Career Guide", "Full-Stack", "DevOps"],
    link: "/resources/fullstack-roadmap-2026.pdf",
    isPopular: true,
  },
  {
    id: "react-typescript-cheatsheet",
    title: "React 19 & TypeScript Developer Cheat Sheet",
    category: "Cheat Sheets",
    description: "Quick reference guide for React 19 hooks, Server Actions, TypeScript type guards, generic props, and performance optimization tricks.",
    format: "PDF Guide",
    icon: SiReact,
    iconColor: "text-cyan-400",
    downloadsCount: 2190,
    tags: ["React 19", "TypeScript", "Hooks"],
    link: "/resources/react-19-cheatsheet.pdf",
  },
  {
    id: "docker-devops-cheatsheet",
    title: "Docker & Kubernetes Command Reference",
    category: "Cheat Sheets",
    description: "Essential CLI commands for container management, multi-stage Dockerfiles, Docker Compose networking, and production deployments.",
    format: "PDF Guide",
    icon: SiDocker,
    iconColor: "text-sky-500",
    downloadsCount: 1780,
    tags: ["Docker", "Kubernetes", "DevOps"],
    link: "/resources/docker-cheatsheet.pdf",
  },
  {
    id: "system-design-blueprint",
    title: "High-Scale System Architecture Blueprint",
    category: "Architecture",
    description: "Architectural patterns for database sharding, Redis caching layers, WebSocket real-time feeds, and SSLCommerz payment integration.",
    format: "Figma File",
    icon: Terminal,
    iconColor: "text-purple-500",
    downloadsCount: 940,
    tags: ["System Design", "Microservices", "Redis"],
    link: "https://figma.com/@kkit-system-design",
    isPopular: true,
  },
  {
    id: "python-data-science-kit",
    title: "Python Data Science & ML Starter Kit",
    category: "Starter Kits",
    description: "Jupyter notebooks, Pandas, NumPy, and Scikit-Learn starter scripts for data cleaning, exploratory analysis, and model training.",
    format: "ZIP Starter",
    icon: SiPython,
    iconColor: "text-amber-400",
    downloadsCount: 1120,
    tags: ["Python", "Machine Learning", "Pandas"],
    link: "/resources/python-ml-starter.zip",
  },
];

const CATEGORIES = ["All", "Starter Kits", "Cheat Sheets", "Roadmaps", "Architecture"] as const;

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: ResourceItem) => {
    toast.success(`Accessing "${item.title}" resource!`);
    if (item.link.startsWith("http")) {
      window.open(item.link, "_blank");
    } else {
      // Simulate resource download
      const link = document.createElement("a");
      link.href = item.link;
      link.download = `${item.id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pt-20 pb-20 bg-background min-h-screen">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              KKIT Open Knowledge Hub
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Free Engineering Resources, Roadmaps & Starter Kits
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Production boilerplates, developer cheat sheets, system design diagrams, and career roadmaps hand-crafted by the KKIT Engineering Team.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-2xl mx-auto mt-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by technology (e.g. Next.js, Docker, React, Python)..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Resources Cards Grid */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => {
              const Icon = item.icon;
              return (
                <GlowCard key={item.id} className="p-6 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className={`h-6 w-6 ${item.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isPopular && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            Popular
                          </span>
                        )}
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted text-muted-foreground border border-border">
                          {item.format}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold bg-background px-2.5 py-1 rounded-md border border-border text-foreground/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                      <Download className="h-3.5 w-3.5 text-primary" /> {item.downloadsCount.toLocaleString()} access
                    </span>

                    <Button
                      size="sm"
                      onClick={() => handleDownload(item)}
                      className="gap-1.5 font-semibold text-xs"
                    >
                      {item.format === "GitHub Repo" ? (
                        <>
                          <SiGithub className="h-3.5 w-3.5" /> View Repo
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" /> Download
                        </>
                      )}
                    </Button>
                  </div>
                </GlowCard>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 max-w-md mx-auto">
              <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-1">No Resources Found</h3>
              <p className="text-xs text-muted-foreground mb-4">
                No learning resources matched your search query. Try searching for different keywords like Next.js, React, or Docker.
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} variant="outline" size="sm">
                Reset Filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Engineering CTA */}
      <section className="mt-10">
        <Container>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-primary/15 via-primary/5 to-background border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Need Custom Software Solutions or Team Training?
              </h2>
              <p className="text-sm text-muted-foreground">
                Partner with the KKIT Engineering Team for full-stack software development, cloud infrastructure setup, or corporate tech bootcamps.
              </p>
            </div>
            <Button size="lg" className="shrink-0 gap-2 font-bold shadow-lg" asChild>
              <a href="/contact">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
