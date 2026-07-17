"use client";

import { Container, SectionHeader } from "@/components/common";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { Award, Users, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a vibrant community of learners and mentors.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Get personalized career guidance and job placement assistance.",
  },
  {
    icon: Shield,
    title: "Certified Courses",
    description: "Receive industry-recognized certificates upon completion.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              subtitle="Why Choose Us"
              title="The Best Platform for Your Learning Journey"
              description="We provide world-class education with practical skills that employers actually look for."
              centered={false}
            />

            <StaggerReveal
              childSelector=".feature-item"
              stagger={0.1}
              y={30}
              duration={0.6}
              className="mt-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="feature-item flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </StaggerReveal>
          </div>

          <ScrollReveal direction="right" distance={80} duration={1}>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <div className="w-full h-full rounded-xl bg-background-secondary border border-border p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20" />
                      <div className="flex-1">
                        <div className="h-4 w-32 bg-muted rounded" />
                        <div className="h-3 w-24 bg-muted rounded mt-2" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full bg-muted rounded" />
                      <div className="h-3 w-5/6 bg-muted rounded" />
                      <div className="h-3 w-4/6 bg-muted rounded" />
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-24 bg-primary/20 rounded" />
                      <div className="h-8 w-24 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
