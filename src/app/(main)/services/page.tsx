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
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { ServiceOrderModal } from "@/components/services/ServiceOrderModal";

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

  return (
    <>
      <section ref={heroRef} className="pt-14 sm:pt-22 pb-12 sm:pb-18 bg-background-secondary relative overflow-hidden border-b border-border/50">
        {/* Ambient background glow & grid depth */}
        <div className="absolute inset-0 bg-mesh-subtle pointer-events-none" />
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-50" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="svc-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-6 shadow-xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Our Services
            </span>
            <h1 className="svc-hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
              Digital Solutions for <span className="gradient-text">Your Business</span>
            </h1>
            <p className="svc-hero-desc text-base sm:text-lg text-muted-foreground leading-relaxed">
              We provide comprehensive digital services to help your business succeed in the digital landscape. Select a package and order directly online.
            </p>
            <Breadcrumb items={[{ label: "Services" }]} className="justify-center mt-6" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
        {/* Subtle ambient mesh background */}
        <div className="absolute inset-0 bg-mesh-subtle pointer-events-none opacity-60" />

        <Container className="relative z-10">
          <StaggerReveal childSelector=".service-card" stagger={0.08} y={30} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.title} className="service-card flex">
                  <div className="animated-border-lg w-full flex">
                    <div className="w-full bg-card p-6 flex flex-col justify-between group overflow-hidden">
                      {/* Top subtle highlight gradient */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div>
                        {/* Icon with gradient badge and subtle depth */}
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-orange-500/10 border border-primary/25 shadow-xs shadow-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300">
                          <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                        </div>

                        <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                          {service.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                          {service.description}
                        </p>

                        {/* Feature pills with subtle depth */}
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

                      {/* Bottom Action Footer with Depth */}
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

      <section className="py-12 sm:py-20 bg-primary">
        <Container>
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help your business grow with our custom digital solutions.
              </p>
              <button
                onClick={() => setSelectedService("Custom Digital Solution")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors shadow-lg"
              >
                Order Custom Project
                <ArrowRight className="h-5 w-5" />
              </button>
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
