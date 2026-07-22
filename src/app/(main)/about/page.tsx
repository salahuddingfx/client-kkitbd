"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Play, Quote, Loader2 } from "lucide-react";
import { GlowCard, Button } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { VideoModal } from "@/components/common/VideoModal";
import { ScrollReveal, StaggerReveal, Timeline } from "@/components/animations";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { teamApi, TeamMember, homeStatsApi, HomeStat } from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
  Award, Users, TrendingUp, Target, Heart, Lightbulb, Rocket, GraduationCap, Globe, Zap, Eye,
} from "lucide-react";

const timelineData = [
  { year: "2020", title: "The Beginning", description: "KKIT was founded with a vision to make quality tech education accessible to everyone. We started with just 5 courses and a dream.", icon: <Rocket className="h-5 w-5" /> },
  { year: "2021", title: "Growing Fast", description: "Reached 1,000 students and expanded our course catalog to 50+ courses. Launched our first mobile app development program.", icon: <TrendingUp className="h-5 w-5" /> },
  { year: "2022", title: "Going Global", description: "Expanded to serve students in 30+ countries. Partnered with top tech companies for job placement programs.", icon: <Globe className="h-5 w-5" /> },
  { year: "2023", title: "Industry Recognition", description: "Won 'Best Online Learning Platform' award. Reached 5,000+ students and introduced AI and Data Science tracks.", icon: <Award className="h-5 w-5" /> },
  { year: "2024", title: "10K Milestone", description: "Crossed 10,000 students with a 95% completion rate. Launched enterprise training programs for Fortune 500 companies.", icon: <GraduationCap className="h-5 w-5" /> },
  { year: "2025", title: "The Future", description: "Building the next generation of learning with AI-powered personalized paths, VR labs, and global certification programs.", icon: <Zap className="h-5 w-5" /> },
];

const values = [
  { icon: Target, title: "Mission-Driven", description: "We're committed to making quality education accessible to everyone." },
  { icon: Heart, title: "Student First", description: "Every decision we make is centered around student success." },
  { icon: Lightbulb, title: "Innovation", description: "We constantly evolve our curriculum to stay ahead of industry trends." },
  { icon: Users, title: "Community", description: "Building a supportive community of learners and mentors." },
];

const missionVision = [
  { icon: Target, title: "Our Mission", description: "To democratize technology education by providing accessible, affordable, and industry-relevant courses that empower individuals to build successful careers in the digital age." },
  { icon: Eye, title: "Our Vision", description: "To become the world's most trusted platform for tech education, bridging the gap between learning and employment, and creating a global community of skilled professionals." },
];

const fallbackStats = [
  { number: "10,000+", label: "Students Enrolled" },
  { number: "500+", label: "Courses Available" },
  { number: "50+", label: "Expert Instructors" },
  { number: "95%", label: "Success Rate" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [leaders, setLeaders] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    // Fetch team for leadership — filter for ceo/md/admin roles
    teamApi.getAll().then((res) => {
      const team = res.data || [];
      const leadership = team.filter((m: TeamMember) => {
        const desig = (m.designation || "").toLowerCase();
        return desig.includes("ceo") || desig.includes("managing director") || desig.includes("founder") || desig.includes("md");
      });
      setLeaders(leadership.length ? leadership : team.slice(0, 2));
    }).catch(() => {});

    // Fetch stats
    homeStatsApi.getAll({ section: "stats" }).then((res) => {
      if (res.data?.length) {
        setStats(res.data.map((s: HomeStat) => ({
          number: `${s.value}${s.suffix || ""}`,
          label: s.label,
        })));
      }
    }).catch(() => {});
  }, []);

  const INTRO_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".about-subtitle", { opacity: 0, y: 20, duration: 0.5 })
      .from(".about-title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.3")
      .from(".about-desc", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
      .from(".about-breadcrumb", { opacity: 0, duration: 0.4 }, "-=0.3");
  }, [], heroRef);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="about-subtitle text-sm font-medium text-primary uppercase tracking-wider">About Us</span>
            <h1 className="about-title text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">Empowering the Next Generation of Tech Leaders</h1>
            <p className="about-desc text-lg text-muted-foreground">We&apos;re on a mission to democratize technology education and help individuals build successful careers in the digital age.</p>
            <div className="about-breadcrumb"><Breadcrumb items={[{ label: "About Us" }]} className="justify-center mt-6" /></div>
          </div>
        </Container>
      </section>

      {/* Introduction Video */}
      <section className="py-12 sm:py-20">
        <Container>
          <ScrollReveal direction="up" distance={40} duration={0.8}>
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setVideoOpen(true)} className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-10 w-10 text-primary ml-1" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-foreground">Watch Our Story</p>
                      <p className="text-muted-foreground">Learn about KKIT and our mission</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </ScrollReveal>
          <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={INTRO_VIDEO_URL} title="About KKIT" />
        </Container>
      </section>

      {/* Our Story + Stats */}
      <section className="py-12 sm:py-20 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="right" distance={60} duration={0.8}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
                <p className="text-muted-foreground">Founded in 2020, KKIT started with a simple vision: to bridge the gap between traditional education and industry requirements. We noticed that many talented individuals were struggling to find quality tech education that was both accessible and practical.</p>
                <p className="text-muted-foreground">Today, we&apos;ve grown into a leading platform serving thousands of students worldwide. Our courses are designed by industry experts and updated regularly to ensure our students are always learning the most relevant skills.</p>
                <p className="text-muted-foreground">We believe that everyone deserves access to quality education, regardless of their background or location. That&apos;s why we offer flexible learning options, affordable pricing, and comprehensive support to help our students succeed.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" distance={60} duration={0.8}>
              <StaggerReveal childSelector=".stat-card" stagger={0.1} y={30} duration={0.5}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <GlowCard variant="glow" className="text-center p-6">
                        <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
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

      {/* Mission & Vision */}
      <section className="py-12 sm:py-20 bg-background-secondary overflow-hidden">
        <Container>
          <SectionHeader subtitle="Purpose" title="Mission & Vision" description="What drives us forward and where we're headed." />
          <StaggerReveal childSelector=".mv-card" stagger={0.15} y={40} duration={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {missionVision.map((item) => (
                <div key={item.title} className="mv-card">
                  <GlowCard variant="glow" className="h-full">
                    <div className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                        <item.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 bg-background-secondary overflow-hidden">
        <Container>
          <SectionHeader subtitle="Our Journey" title="From Humble Beginnings to Industry Leader" description="Every great achievement starts with a single step." />
          <Timeline items={timelineData} />
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20">
        <Container>
          <SectionHeader subtitle="Our Values" title="What We Stand For" description="Our core values guide everything we do." />
          <StaggerReveal childSelector=".value-card" stagger={0.12} y={50} duration={0.7}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="value-card">
                  <GlowCard variant="glow" className="h-full">
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Container>
      </section>

      {/* Leadership Messages */}
      {leaders.length > 0 && (
        <section className="py-12 sm:py-20 bg-background-secondary overflow-hidden">
          <Container>
            <SectionHeader subtitle="Leadership" title="Messages from Our Leaders" description="Hear directly from the people driving KKIT's mission forward." />
            <StaggerReveal childSelector=".leader-card" stagger={0.15} y={40} duration={0.6}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {leaders.map((leader) => (
                  <div key={leader._id} className="leader-card">
                    <GlowCard variant="glow" className="h-full">
                      <div className="p-8">
                        <Quote className="h-8 w-8 text-primary/30 mb-4" />
                        <p className="text-muted-foreground leading-relaxed mb-6 italic">
                          &ldquo;{leader.bio || "At KKIT, we believe that education is the most powerful tool for change."}&rdquo;
                        </p>
                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={leader.avatar?.url} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                              {leader.name?.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{leader.name}</p>
                            <p className="text-sm text-muted-foreground">{leader.designation}</p>
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </div>
                ))}
              </div>
            </StaggerReveal>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-primary">
        <Container>
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">Join thousands of students who have already transformed their careers with our courses.</p>
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
