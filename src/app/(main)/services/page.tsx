"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  TrendingUp,
  ShoppingBag,
  Cloud,
  Cpu,
  ShieldCheck,
  Store,
  Sparkles,
} from "lucide-react";
import { Breadcrumb, Container, SectionHeader, LavaEffect } from "@/components/common";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { ServiceOrderModal } from "@/components/services/ServiceOrderModal";
import { ProjectCostEstimator, EstimatedProject } from "@/components/services/ProjectCostEstimator";
import { CaseStudyComparison } from "@/components/services/CaseStudyComparison";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web applications built with the latest technologies for optimal performance and scalability.",
    features: ["React & Next.js", "Node.js & Express", "Database Design", "API Development"],
    href: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android with seamless user experience.",
    features: ["iOS & Android", "React Native", "Flutter", "UI/UX Design"],
    href: "/services/app-development",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that drive engagement and conversions through intuitive interfaces.",
    features: ["User Research", "Wireframing", "Prototyping", "User Testing"],
    href: "/services/ui-ux-design",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to grow your online presence and reach your target audience.",
    features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"],
    href: "/services/digital-marketing",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Automated CI/CD pipelines, containerization, and robust cloud infrastructure scaling.",
    features: ["Docker & Kubernetes", "AWS & Cloud Hosting", "CI/CD Pipelines", "24/7 Monitoring"],
    href: "/services/web-development",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "Intelligent workflows, OpenAI/LLM models, AI agent automations, and predictive data systems.",
    features: ["Custom AI Agents", "LLM Integration", "Automated Pipelines", "Data Analytics"],
    href: "/services/web-development",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & QA",
    description:
      "Comprehensive security audits, automated testing, and software quality assurance.",
    features: ["Penetration Testing", "Security Audits", "Automated QA", "Code Review"],
    href: "/services/web-development",
  },
  {
    icon: Store,
    title: "E-Commerce Solutions",
    description:
      "High-converting online storefronts, multi-vendor marketplaces, and payment gateway systems.",
    features: ["Payment Integration", "Inventory Control", "Custom SaaS Portals", "High-Traffic Checkout"],
    href: "/services/web-development",
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".svc-hero-badge", { opacity: 0, y: 20, duration: 0.5 })
        .from(".svc-hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(".svc-hero-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
    },
    [],
    heroRef
  );

  const handleCustomEstimateOrder = (project: EstimatedProject) => {
    setSelectedService(project.summaryTitle);
  };

  return (
    <>
      <section ref={heroRef} className="pt-14 sm:pt-22 pb-12 sm:pb-18 bg-background relative overflow-hidden border-b border-border/40">
        <LavaEffect intensity="medium" />

        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="svc-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-6 shadow-xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Our Services & Solutions
            </span>
            <h1 className="svc-hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
              Digital Solutions for <span className="gradient-text">Your Business</span>
            </h1>
            <p className="svc-hero-desc text-base sm:text-lg text-muted-foreground leading-relaxed">
              We engineer mission-critical digital products, scalable cloud architectures, and modern web & mobile apps. Select our pre-configured packages or use the live calculator below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href="#cost-calculator"
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-all inline-flex items-center gap-2"
              >
                Estimate Project Cost & Timeline
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#case-studies"
                className="px-5 py-2.5 rounded-xl border border-border bg-card/80 hover:bg-muted font-bold text-xs text-foreground transition-colors inline-flex items-center gap-2"
              >
                View Before/After Case Studies
              </a>
            </div>
            <Breadcrumb items={[{ label: "Services" }]} className="justify-center mt-6" />
          </div>
        </Container>
      </section>

      {/* ─── Standard Services Grid ─── */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-mesh-subtle pointer-events-none opacity-60" />

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Enterprise Offerings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              End-to-End Technology Capabilities
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              From conception to enterprise cloud deployment, our dedicated engineering teams build scalable, reliable solutions.
            </p>
          </div>

          <StaggerReveal childSelector=".service-card" stagger={0.08} y={30} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.title} className="service-card flex">
                  <div className="animated-border-lg w-full flex">
                    <div className="w-full bg-card p-6 flex flex-col justify-between group overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div>
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-orange-500/10 border border-primary/25 shadow-xs shadow-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300">
                          <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/70 text-muted-foreground text-[11px] font-medium border border-border/60 group-hover:border-primary/25 group-hover:bg-primary/5 transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary mr-1.5" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/80 mt-auto">
                        <Link
                          href={service.href}
                          className="inline-flex items-center text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                        >
                          Learn Details
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => setSelectedService(service.title)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-primary-foreground text-xs font-bold shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/40 active:scale-95 transition-all cursor-pointer"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </section>

      {/* ─── Interactive Project Cost & Timeline Calculator ─── */}
      <section className="py-16 sm:py-24 bg-card/50 border-y border-border/70 relative overflow-hidden" id="cost-calculator">
        <Container className="relative z-10">
          <ProjectCostEstimator onOrderCustomProject={handleCustomEstimateOrder} />
        </Container>
      </section>

      {/* ─── Before vs After KKIT Case Study Comparison Slider ─── */}
      <section className="py-16 sm:py-24 bg-background relative overflow-hidden" id="case-studies">
        <Container className="relative z-10">
          <CaseStudyComparison />
        </Container>
      </section>

      {/* ─── Final CTA Section ─── */}
      <section className="py-16 sm:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Ready to Accelerate Your Business?
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Schedule a discovery call with our tech lead or order a custom sprint directly with full source code ownership.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedService("Custom Enterprise Solution")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  Order Custom Project
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href="https://wa.me/8801886178338?text=Hello%20KKIT,%20I%20would%20like%20to%20discuss%20a%20new%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-black/20 hover:bg-black/30 text-white font-semibold rounded-xl border border-white/20 transition-all backdrop-blur-sm"
                >
                  Talk with Tech Lead
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <ServiceOrderModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        serviceTitle={selectedService || "Digital Service"}
      />
    </>
  );
}
