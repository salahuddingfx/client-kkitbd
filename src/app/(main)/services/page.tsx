"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Palette, TrendingUp } from "lucide-react";
import { GlowCard } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";

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
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

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
      <section ref={heroRef} className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="svc-hero-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="svc-hero-title text-4xl md:text-5xl font-bold text-foreground mb-6">
              Digital Solutions for Your Business
            </h1>
            <p className="svc-hero-desc text-lg text-muted-foreground">
              We provide comprehensive digital services to help your business succeed in the digital landscape.
            </p>
            <Breadcrumb items={[{ label: "Services" }]} className="justify-center mt-6" />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <StaggerReveal childSelector=".service-card" stagger={0.12} y={50} duration={0.7}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service.title} className="service-card">
                  <Link href={service.href}>
                    <div className="animated-border-lg">
                      <GlowCard variant="glow" className="h-full group border-transparent bg-background">
                      <div className="p-8">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <service.icon className="h-7 w-7 text-primary group-hover:text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </GlowCard>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </section>

      <section className="py-20 bg-primary">
        <Container>
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help your business grow with our digital solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
