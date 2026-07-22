"use client";

import { Container } from "@/components/common";
import { StaggerReveal, ScrollReveal } from "@/components/animations";
import dynamic from "next/dynamic";

const WorldGlobe = dynamic(
  () => import("@/components/common/WorldGlobe").then((mod) => mod.WorldGlobe),
  { ssr: false }
);

const countries = [
  { name: "United States", students: "2,450+", flag: "🇺🇸" },
  { name: "United Kingdom", students: "1,200+", flag: "🇬🇧" },
  { name: "Canada", students: "890+", flag: "🇨🇦" },
  { name: "Australia", students: "650+", flag: "🇦🇺" },
  { name: "Germany", students: "520+", flag: "🇩🇪" },
  { name: "Japan", students: "410+", flag: "🇯🇵" },
  { name: "UAE", students: "780+", flag: "🇦🇪" },
  { name: "Singapore", students: "340+", flag: "🇸🇬" },
  { name: "Bangladesh", students: "5,200+", flag: "🇧🇩" },
];

export function TrustedCompanies() {
  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — Text + Stats */}
          <ScrollReveal direction="left" distance={40}>
            <div className="space-y-8">
              <div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Global Reach
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                  Our Students Work At
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join thousands of learners who have transformed their careers and now work at top companies across the globe.
                </p>
              </div>

              {/* Country stats */}
              <StaggerReveal
                childSelector=".country-item"
                stagger={0.05}
                y={20}
                duration={0.5}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {countries.map((country) => (
                    <div
                      key={country.name}
                      className="country-item flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-background transition-all duration-300"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{country.students}</p>
                        <p className="text-xs text-muted-foreground">{country.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </StaggerReveal>
            </div>
          </ScrollReveal>

          {/* Right — 3D Globe */}
          <ScrollReveal direction="right" distance={40} delay={0.2}>
            <div className="relative">
              <WorldGlobe />
              <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
