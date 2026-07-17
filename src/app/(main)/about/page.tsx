"use client";

import { useRef } from "react";
import Link from "next/link";
import { GlowCard, Button } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { ScrollReveal, StaggerReveal, Timeline } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import {
  Award,
  Users,
  TrendingUp,
  Target,
  Heart,
  Lightbulb,
  Rocket,
  GraduationCap,
  Globe,
  Zap,
} from "lucide-react";

const timelineData = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "KKIT was founded with a vision to make quality tech education accessible to everyone. We started with just 5 courses and a dream.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    year: "2021",
    title: "Growing Fast",
    description:
      "Reached 1,000 students and expanded our course catalog to 50+ courses. Launched our first mobile app development program.",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    year: "2022",
    title: "Going Global",
    description:
      "Expanded to serve students in 30+ countries. Partnered with top tech companies for job placement programs.",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description:
      "Won 'Best Online Learning Platform' award. Reached 5,000+ students and introduced AI and Data Science tracks.",
    icon: <Award className="h-5 w-5" />,
  },
  {
    year: "2024",
    title: "10K Milestone",
    description:
      "Crossed 10,000 students with a 95% completion rate. Launched enterprise training programs for Fortune 500 companies.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    year: "2025",
    title: "The Future",
    description:
      "Building the next generation of learning with AI-powered personalized paths, VR labs, and global certification programs.",
    icon: <Zap className="h-5 w-5" />,
  },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to making quality education accessible to everyone.",
  },
  {
    icon: Heart,
    title: "Student First",
    description: "Every decision we make is centered around student success.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly evolve our curriculum to stay ahead of industry trends.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive community of learners and mentors.",
  },
];

const stats = [
  { number: "10,000+", label: "Students Enrolled" },
  { number: "500+", label: "Courses Available" },
  { number: "50+", label: "Expert Instructors" },
  { number: "95%", label: "Success Rate" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".about-subtitle", { opacity: 0, y: 20, duration: 0.5 })
        .from(".about-title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.3")
        .from(".about-desc", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
        .from(".about-breadcrumb", { opacity: 0, duration: 0.4 }, "-=0.3");
    },
    [],
    heroRef
  );

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="about-subtitle text-sm font-medium text-primary uppercase tracking-wider">
              About Us
            </span>
            <h1 className="about-title text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Empowering the Next Generation of Tech Leaders
            </h1>
            <p className="about-desc text-lg text-muted-foreground">
              We&apos;re on a mission to democratize technology education and help individuals
              build successful careers in the digital age.
            </p>
            <div className="about-breadcrumb">
              <Breadcrumb items={[{ label: "About Us" }]} className="justify-center mt-6" />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="right" distance={60} duration={0.8}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
                <p className="text-muted-foreground">
                  Founded in 2020, KKIT started with a simple vision: to bridge the gap
                  between traditional education and industry requirements. We noticed that
                  many talented individuals were struggling to find quality tech education
                  that was both accessible and practical.
                </p>
                <p className="text-muted-foreground">
                  Today, we&apos;ve grown into a leading platform serving thousands of students
                  worldwide. Our courses are designed by industry experts and updated regularly
                  to ensure our students are always learning the most relevant skills.
                </p>
                <p className="text-muted-foreground">
                  We believe that everyone deserves access to quality education, regardless
                  of their background or location. That&apos;s why we offer flexible learning
                  options, affordable pricing, and comprehensive support to help our students
                  succeed.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" distance={60} duration={0.8}>
              <StaggerReveal
                childSelector=".stat-card"
                stagger={0.1}
                y={30}
                duration={0.5}
              >
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <GlowCard variant="glow" className="text-center p-6">
                          <div className="text-3xl font-bold text-primary mb-2">
                            {stat.number}
                          </div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </GlowCard>
                    </div>
                  ))}
                </div>
              </StaggerReveal>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 bg-background-secondary overflow-hidden">
        <Container>
          <SectionHeader
            subtitle="Our Journey"
            title="From Humble Beginnings to Industry Leader"
            description="Every great achievement starts with a single step. Here's how we grew from a small startup to a global learning platform."
          />
          <Timeline items={timelineData} />
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20">
        <Container>
          <SectionHeader
            subtitle="Our Values"
            title="What We Stand For"
            description="Our core values guide everything we do."
          />

          <StaggerReveal
            childSelector=".value-card"
            stagger={0.12}
            y={50}
            duration={0.7}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="value-card">
                  <GlowCard variant="glow" className="h-full">
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-primary">
        <Container>
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have already transformed their careers
                with our courses.
              </p>
              <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/courses">Explore Our Courses</Link>
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
