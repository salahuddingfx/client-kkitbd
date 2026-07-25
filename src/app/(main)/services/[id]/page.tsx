"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight, Code, Smartphone, Palette, TrendingUp, Sparkles } from "lucide-react";
import { Container, Breadcrumb } from "@/components/common";
import { motion } from "framer-motion";

const SERVICE_DETAILS: Record<string, { title: string; description: string; features: string[]; icon: any }> = {
  "web-development": {
    title: "Web Development",
    description: "Custom enterprise web applications built with Next.js, React, Node.js, and modern cloud architectures for maximum performance and security.",
    features: [
      "Custom React & Next.js App Router Architecture",
      "Robust Node.js & Express RESTful / GraphQL APIs",
      "Database Modeling & MongoDB / PostgreSQL Optimization",
      "Enterprise Grade Cloud Deployment & CI/CD Pipelines",
      "PWA & Offline First Capability",
      "SEO Optimization & Core Web Vitals Performance",
    ],
    icon: Code,
  },
  "app-development": {
    title: "Mobile App Development",
    description: "Cross-platform and native iOS & Android applications built with React Native and Flutter for high performance and smooth user experience.",
    features: [
      "Cross-Platform iOS & Android Apps",
      "Native Performance with React Native & Flutter",
      "Real-time Push Notifications & Offline Storage",
      "Biometric Authentication & Secure Payment Integration",
      "App Store & Google Play Store Publishing Support",
    ],
    icon: Smartphone,
  },
  "ui-ux-design": {
    title: "UI/UX Product Design",
    description: "User-centered interface design, wireframing, and interactive prototypes tailored to convert visitors into loyal clients.",
    features: [
      "User Journey & Empathy Mapping",
      "High-Fidelity Figma Wireframing & Interactive Prototypes",
      "Design Systems & Component Pattern Libraries",
      "Usability Testing & Accessibility (WCAG) Compliance",
    ],
    icon: Palette,
  },
  "digital-marketing": {
    title: "Digital Marketing & Growth",
    description: "Data-driven SEO, conversion rate optimization, and content strategies designed to boost product visibility and drive qualified leads.",
    features: [
      "Technical SEO & Search Engine Optimization",
      "Content Strategy & Social Media Campaigns",
      "Conversion Rate Optimization (CRO)",
      "Analytics Tracking & Funnel Conversion Metrics",
    ],
    icon: TrendingUp,
  },
};

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = SERVICE_DETAILS[id] || {
    title: id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: "Custom software and technology solution tailored to modern enterprise requirements.",
    features: [
      "Full Lifecycle Development Support",
      "Dedicated Technical Architecture",
      "24/7 Enterprise Maintenance",
    ],
    icon: Code,
  };

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen py-12 lg:py-20 bg-background text-foreground">
      <Container>
        <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: service.title }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-4xl space-y-8"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>

          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <IconComponent className="h-7 w-7 text-primary" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> Professional Service
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground">Key Service Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition-all"
            >
              Get Started with {service.title} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-muted text-muted-foreground font-semibold hover:text-foreground transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
