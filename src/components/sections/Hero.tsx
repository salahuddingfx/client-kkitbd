"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui";
import { Container } from "@/components/common";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { Counter } from "@/components/animations";

const stats = [
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
      const pause = setTimeout(() => {
        setWordIndex(wordIndex);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === "") {
      const next = (wordIndex + 1) % typewriterWords.length;
      const timeout = setTimeout(() => {
        setWordIndex(next);
        setIsDeleting(false);
      }, 50);
      return () => clearTimeout(timeout);
    }

    const speed = isDeleting ? 40 : 100;
    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 30, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 30, duration: 0.6 }, "-=0.5")
        .from(".hero-buttons", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
        .from(".hero-stat", {
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.1,
        }, "-=0.3");

      gsap.to(".hero-orb-1", {
        y: 30,
        x: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-2", {
        y: -25,
        x: 15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    },
    [],
    containerRef
  );

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
            Transform Your Career with{" "}
            <Typewriter /> Courses
          </h1>

          <p className="hero-desc text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master in-demand skills with industry experts. From web development to AI,
            we provide comprehensive courses to accelerate your career growth.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <Link href="/courses">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/about">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                    separator
                  />
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
