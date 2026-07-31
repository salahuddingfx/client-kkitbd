"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  Code2,
  Star,
  Quote,
  CheckCircle2,
  Clock,
  Building2,
  GraduationCap,
  Users,
  Sparkles,
  Layers,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ArrowRight,
} from "lucide-react";

import { Button, Badge, Skeleton, Card, CardContent } from "@/components/ui";
import { Container } from "@/components/common";
import { portfolioApi, PortfolioItem } from "@/services/api";
import { getTechInfo } from "@/utils/techIcons";

const fallbackCaseStudies: Record<string, PortfolioItem> = {
  "1": {
    _id: "1",
    title: "Enterprise Learning Management System (LMS)",
    slug: "enterprise-lms-platform",
    description: "A high-scale, real-time e-learning platform built for 50,000+ active students with automated invoice generation, live class scheduling, multi-role RBAC, and video stream optimization.",
    shortDescription: "Enterprise LMS platform handling 50k+ students and live interactive classes.",
    category: "Web Application",
    client: "EduTech Global Corp",
    duration: "4 Months",
    projectType: "client",
    technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS", "Docker"],
    liveUrl: "https://kkitbd.com",
    repoUrl: "https://github.com/kkitbd",
    status: "completed",
    featured: true,
    metrics: { label: "Active Student Retention", value: "98.4%" },
    challenge: "The client needed a robust, high-availability platform to transition from legacy offline classrooms to online interactive courses. The legacy system suffered from slow video buffering, invoice errors, and lack of real-time attendance tracking.",
    solution: "KKIT engineered a Next.js App Router frontend paired with a modular Express micro-service backend. We integrated Redis caching for instant query response, WebSockets for live chat during classes, and PDFKit for automated billing PDF generation.",
    features: [
      "Multi-role Access Control (Super Admin, Instructors, Students, Finance)",
      "Automated bKash / Nagad / Bank Payment verification with instant PDF invoices",
      "Live Class schedule integration with automatic Zoom & Google Meet links",
      "Gamification engine with badges, points history, and leaderboard rankings",
      "Progressive Web App (PWA) support with offline video caching fallback",
    ],
    deliverables: [
      "Production Next.js 16 Web Frontend",
      "Node.js & Express RESTful API",
      "Admin Panel with Revenue Analytics & Charts",
      "Mobile PWA & Service Worker Cache",
    ],
    testimonial: {
      quote: "KKIT delivered an outstanding platform ahead of schedule. Our student engagement doubled within the first month of launch!",
      author: "Rahim Chowdhury",
      designation: "CTO",
      company: "EduTech Global Corp",
    },
  },
  "2": {
    _id: "2",
    title: "Real-time Fintech Wallet & Payment Gateway Hub",
    slug: "realtime-fintech-wallet",
    description: "High-security financial ledger application with two-factor OTP verification, automated statement generation, and multi-currency exchange rate calculation.",
    shortDescription: "Fintech wallet application with automated statement PDF generation.",
    category: "Fintech",
    client: "PayFlex Solutions",
    duration: "3 Months",
    projectType: "client",
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://kkitbd.com",
    status: "completed",
    featured: true,
    metrics: { label: "Transaction Speed", value: "< 120ms" },
    challenge: "PayFlex needed an ultra-fast, 256-bit encrypted transaction system capable of handling concurrent payment callbacks from bKash, Nagad, and bank webhooks without race conditions.",
    solution: "We designed a transaction queue architecture backed by Redis locks, strictly validated using Zod schemas, with dual SMS OTP authentication.",
    features: [
      "Real-time wallet balance update via WebSockets",
      "Instant PDF transaction receipt generation",
      "Device fingerprinting and suspicious login detection",
      "Role-based financial auditing & refund manager",
    ],
    testimonial: {
      quote: "The reliability of KKIT's payment queue code has been stellar. Zero downtime since launch!",
      author: "Farhana Islam",
      designation: "Head of Operations",
      company: "PayFlex Solutions",
    },
  },
};

export default function CaseStudyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi
      .getById(id)
      .then((res) => {
        setProject(res.data || fallbackCaseStudies[id] || null);
      })
      .catch(() => {
        setProject(fallbackCaseStudies[id] || fallbackCaseStudies["1"]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-56 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Briefcase className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-2xl font-bold">Case Study Not Found</h2>
          <Button asChild><Link href="/portfolio">Back to Portfolio</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-background-secondary">
      <Container className="max-w-5xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
        </div>

        {/* Hero Banner Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-bold text-xs">{project.category}</Badge>
            <Badge className={`capitalize text-xs ${project.projectType === "student" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : "bg-blue-500/10 text-blue-600 border-blue-500/30"}`}>
              {project.projectType === "student" ? "Student Project Result" : "Client Project Case Study"}
            </Badge>
            {project.duration && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary" /> {project.duration} Timeline
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Links & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {project.client && (
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <Building2 className="h-4 w-4 text-primary" /> Client: {project.client}
                </span>
              )}
              {project.studentName && (
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <Users className="h-4 w-4 text-emerald-500" /> Built by: {project.studentName}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {project.repoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Code2 className="h-4 w-4 mr-2" /> Code Repo
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="default" size="sm" asChild className="font-bold">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Strip */}
        {project.metrics && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-primary">Key Business Impact</p>
                <p className="text-sm font-semibold text-foreground">{project.metrics.label}</p>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono">
              {project.metrics.value}
            </div>
          </div>
        )}

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Left */}
          <div className="lg:col-span-8 space-y-8">
            {/* Problem & Challenge */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-foreground border-b pb-3 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-red-500" /> The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {project.challenge || project.shortDescription || project.description}
              </p>
            </div>

            {/* Solution & Engineering */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-foreground border-b pb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-emerald-500" /> Solution & Architecture
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {project.solution || "KKIT engineered an end-to-end custom software architecture using modern frameworks and performance optimization standards."}
              </p>
            </div>

            {/* Features & Deliverables */}
            {((project.features && project.features.length > 0) || (project.deliverables && project.deliverables.length > 0)) && (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                {project.features && project.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Key Features & Functionality
                    </h3>
                    <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-muted/40 p-3 rounded-xl border">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.deliverables && project.deliverables.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4 text-blue-500" /> Project Deliverables
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((deliv, idx) => (
                        <Badge key={idx} variant="outline" className="px-3 py-1 text-xs">
                          ✓ {deliv}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Testimonial Quote */}
            {project.testimonial?.quote && (
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 sm:p-8 relative">
                <Quote className="h-10 w-10 text-primary/30 absolute right-6 top-6" />
                <p className="text-base sm:text-lg italic font-medium text-foreground mb-4 relative z-10">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{project.testimonial.author}</h4>
                    <p className="text-xs text-muted-foreground">
                      {project.testimonial.designation}{project.testimonial.company && ` @ ${project.testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Breakdown */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4 sticky top-24">
              <h3 className="font-bold text-base border-b pb-3 text-foreground flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" /> Technology Stack
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => {
                  const info = getTechInfo(tech);
                  const Icon = info?.icon;
                  return (
                    <div
                      key={tech}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-background text-xs font-medium"
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4" style={{ color: info?.color || undefined }} />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-primary/20 inline-block" />
                      )}
                      <span>{info?.label || tech}</span>
                    </div>
                  );
                })}
              </div>

              {/* Hire / Build CTA Widget */}
              <div className="pt-4 border-t space-y-3">
                <h4 className="font-bold text-sm text-foreground">Have a similar project idea?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our engineering team can bring your product vision to reality with guaranteed performance and speed.
                </p>
                <Button className="w-full font-bold text-xs h-10" asChild>
                  <Link href="/contact">
                    Request a Quote <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>100% Quality & Security Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
