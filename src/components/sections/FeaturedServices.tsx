"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Code, Smartphone, Palette, TrendingUp } from "lucide-react";
import { GlowCard } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { StaggerReveal } from "@/components/animations";
import { servicesApi, ServiceItem } from "@/services/api";

const iconMap: Record<string, any> = {
  code: Code,
  smartphone: Smartphone,
  palette: Palette,
  trending: TrendingUp,
};

const fallbackServices = [
  { title: "Web Development", description: "Custom web applications built with the latest technologies for optimal performance.", icon: "code", href: "/services/web-development" },
  { title: "App Development", description: "Native and cross-platform mobile applications for iOS and Android.", icon: "smartphone", href: "/services/app-development" },
  { title: "UI/UX Design", description: "User-centered design solutions that drive engagement and conversions.", icon: "palette", href: "/services/ui-ux-design" },
  { title: "Digital Marketing", description: "Data-driven marketing strategies to grow your online presence.", icon: "trending", href: "/services/digital-marketing" },
];

export function FeaturedServices() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    servicesApi.getAll().then((res) => {
      if (res.data?.length) {
        setServices(res.data.map((s: ServiceItem) => ({
          title: s.title,
          description: s.shortDescription || s.description,
          icon: s.icon || "code",
          href: `/services/${s.slug}`,
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          subtitle="Our Services"
          title="What We Offer"
          description="We provide comprehensive digital solutions to help your business succeed in the digital landscape."
        />
        <StaggerReveal childSelector=".service-card" stagger={0.12} y={50} duration={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComp = iconMap[service.icon] || Code;
              return (
                <div key={service.title} className="service-card">
                  <Link href={service.href}>
                    <div className="animated-border-lg">
                      <GlowCard variant="glow" className="h-full group border-transparent bg-background">
                        <div className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <IconComp className="h-6 w-6 text-primary group-hover:text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                          <p className="text-muted-foreground mb-4">{service.description}</p>
                          <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                            Learn More <ArrowRight className="ml-1 h-4 w-4" />
                          </span>
                        </div>
                      </GlowCard>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </StaggerReveal>
      </Container>
    </section>
  );
}
