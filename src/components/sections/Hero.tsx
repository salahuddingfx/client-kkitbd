"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui";
import { Container, StudentTicker } from "@/components/common";
import { VideoModal } from "@/components/common/VideoModal";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { Counter } from "@/components/animations";
import { homeStatsApi, HomeStat } from "@/services/api";

const fallbackStats = [
  { value: 10000, suffix: "+", label: "Students Enrolled" },
  { value: 500, suffix: "+", label: "Courses Available" },
  { value: 50, suffix: "+", label: "Expert Instructors" },
  { value: 95, suffix: "%", label: "Success Rate" },
];

const typewriterWords = [
  "Expert-Led",
  "Industry-Ready",
  "Career-Focused",
  "Hands-On",
  "Job-Ready",
];

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];
    if (!isDeleting && text === currentWord) {
      const pause = setTimeout(() => { setIsDeleting(true); }, 1800);
      return () => clearTimeout(pause);
    }
    if (isDeleting && text === "") {
      const next = (wordIndex + 1) % typewriterWords.length;
      const timeout = setTimeout(() => { setWordIndex(next); setIsDeleting(false); }, 50);
      return () => clearTimeout(timeout);
    }
    const speed = isDeleting ? 40 : 100;
    const timeout = setTimeout(() => {
      setText(isDeleting ? currentWord.substring(0, text.length - 1) : currentWord.substring(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="text-primary">
      {text}<span className="animate-pulse text-primary">|</span>
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    homeStatsApi.getAll({ section: "hero" }).then((res) => {
      if (res.data?.length) {
        setStats(res.data.map((s: HomeStat) => ({
          value: Number(s.value) || 0,
          suffix: s.suffix || "",
          label: s.label,
        })));
      }
    }).catch(() => {});
  }, []);

  const COURSE_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-badge", { opacity: 0, y: 30, duration: 0.6 })
      .from(".hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
      .from(".hero-desc", { opacity: 0, y: 30, duration: 0.6 }, "-=0.5")
      .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
      .from(".hero-stat", { opacity: 0, y: 30, scale: 0.9, duration: 0.5, stagger: 0.1 }, "-=0.3");
    gsap.to(".hero-orb-1", { y: 30, x: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-orb-2", { y: -25, x: 15, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  }, [], containerRef);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-secondary" />
      <div className="hero-orb-1 absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <Container className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hero-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Welcome to the Future of Learning
          </div>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transform Your Career with <Typewriter /> Courses
          </h1>
          <p className="hero-desc text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master in-demand skills with industry experts. From web development to AI, we provide comprehensive courses to accelerate your career growth.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <Link href="/courses">Explore Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button variant="outline" size="xl" onClick={() => setVideoOpen(true)}>
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <button onClick={() => setVideoOpen(true)} className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">See What You&apos;ll Learn</p>
                    <p className="text-sm text-muted-foreground">Watch a preview of our top courses</p>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoUrl={COURSE_VIDEO_URL} title="Course Highlight" />

          <div className="mt-8 flex justify-center"><StudentTicker /></div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <Counter value={stat.value} suffix={stat.suffix} duration={2} separator />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
