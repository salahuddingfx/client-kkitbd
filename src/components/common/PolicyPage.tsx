"use client";

import { useRef } from "react";
import { Breadcrumb, Container } from "@/components/common";
import { GlowCard } from "@/components/ui";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";

interface PolicyItem {
  title: string;
  content: string | React.ReactNode;
}

interface PolicyPageProps {
  title: string;
  lastUpdated: string;
  breadcrumbLabel: string;
  items: PolicyItem[];
  intro?: string;
}

export function PolicyPage({
  title,
  lastUpdated,
  breadcrumbLabel,
  items,
  intro,
}: PolicyPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".policy-badge", { opacity: 0, y: 20, duration: 0.5 })
        .from(".policy-title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.3")
        .from(".policy-date", { opacity: 0, y: 15, duration: 0.4 }, "-=0.4")
        .from(".policy-breadcrumb", { opacity: 0, duration: 0.4 }, "-=0.3");
    },
    [],
    heroRef
  );

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="policy-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Legal
            </span>
            <h1 className="policy-title text-4xl md:text-5xl font-bold text-foreground">
              {title}
            </h1>
            <p className="policy-date text-lg text-muted-foreground mt-4">
              Last updated: {lastUpdated}
            </p>
            <div className="policy-breadcrumb">
              <Breadcrumb items={[{ label: breadcrumbLabel }]} className="justify-center mt-6" />
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            {intro && (
              <ScrollReveal direction="up" distance={20}>
                <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                  {intro}
                </p>
              </ScrollReveal>
            )}

            <StaggerReveal
              childSelector=".policy-item"
              stagger={0.06}
              y={30}
              duration={0.5}
            >
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="policy-item">
                    <GlowCard variant="neu" className="p-6 md:p-8">
                      <div className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {item.title}
                          </h3>
                          <div className="text-muted-foreground leading-relaxed text-sm policy-content">
                            {typeof item.content === "string" ? (
                              <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            ) : (
                              item.content
                            )}
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </div>
                ))}
              </div>
            </StaggerReveal>

            {/* Contact footer */}
            <ScrollReveal direction="up" distance={20} delay={0.2}>
              <div className="mt-16 p-8 rounded-2xl bg-background-secondary border border-border text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Questions about this policy?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Contact us at{" "}
                  <span className="text-primary font-medium">legal@kkitbd.com</span>{" "}
                  and we&apos;ll get back to you within 48 hours.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
