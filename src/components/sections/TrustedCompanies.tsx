"use client";

import { Container, SectionHeader } from "@/components/common";
import { StaggerReveal } from "@/components/animations";

const companies = [
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Apple", logo: "/logos/apple.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Netflix", logo: "/logos/netflix.svg" },
];

export function TrustedCompanies() {
  return (
    <section className="py-16 bg-background-secondary">
      <Container>
        <SectionHeader
          subtitle="Trusted By"
          title="Our Students Work At"
          description="Join thousands of learners who have transformed their careers and now work at top companies."
        />

        <StaggerReveal
          childSelector=".company-item"
          stagger={0.08}
          y={30}
          duration={0.6}
          from="center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {companies.map((company) => (
              <div
                key={company.name}
                className="company-item flex items-center justify-center p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-muted-foreground">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </StaggerReveal>
      </Container>
    </section>
  );
}
