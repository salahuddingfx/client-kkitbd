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
} from "lucide-react";
import { GlowCard } from "@/components/ui";
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
      <section ref={heroRef} className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="svc-hero-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="svc-hero-title text-4xl md:text-5xl font-bold text-foreground mb-6">
              Digital Solutions for Your Business
            </h1>
            <p className="svc-hero-desc text-lg text-muted-foreground">
              We provide comprehensive digital services to help your business succeed in the digital landscape. Select a package and order directly online.
            </p>
            <Breadcrumb items={[{ label: "Services" }]} className="justify-center mt-6" />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          <StaggerReveal childSelector=".service-card" stagger={0.08} y={40} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.title} className="service-card flex">
                  <div className="animated-border-lg w-full">
                    <GlowCard variant="glow" className="h-full group border-transparent bg-background flex flex-col justify-between">
                      <div className="p-5 sm:p-6 flex flex-col justify-between h-full">
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                          </div>
                          <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                            {service.description}
                          </p>
                          <ul className="space-y-1.5 mb-5">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-center text-xs text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mr-2" />
                                <span className="truncate">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                          <Link href={service.href} className="inline-flex items-center text-xs font-semibold text-primary hover:underline">
                            Learn Details
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => setSelectedService(service.title)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Order
                          </button>
                        </div>
                      </div>
                    </GlowCard>
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
