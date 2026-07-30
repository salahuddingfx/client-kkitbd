"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/common";

const steps = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Module Release",
    description: "New module released daily at 8 PM. Use Gems for 2-hour early access.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Watch Time",
    description: "~10 videos/module (12–15 min each). Plan 3–5 hours daily for content.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-500/10",
    text: "text-purple-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Research",
    description: "Spend 1–2 hours researching similar topics on Google or our support system.",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-500/10",
    text: "text-teal-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Live Support",
    description: "Stuck? Join our daily 6+ hours of live support sessions.",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-500/10",
    text: "text-orange-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Conceptual Sessions",
    description: "Live class after every 2–4 modules to reinforce learning.",
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-500/10",
    text: "text-pink-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    title: "Assignments",
    description: "Assignment after every 4–7 modules. Maximum marks: 60.",
    color: "from-red-500 to-red-600",
    bg: "bg-red-500/10",
    text: "text-red-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "SCIC Program",
    description: "Complete on time to join the SCIC job placement program.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-500/10",
    text: "text-green-600",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "28–30 Weeks",
    description: "Commit 6–8 hours daily for 28–30 weeks to complete the bootcamp.",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-500/10",
    text: "text-indigo-600",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setRevealedSteps((prev) => new Set([...prev, index]));
            }, index * 80);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-background-secondary border-t border-border">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            How This Bootcamp <span className="text-primary">Works</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Step-by-step learning, hands-on projects, and guided evaluation from zero to job-ready.
          </p>
        </div>

        {/* Steps — vertical timeline style */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-4">
            {steps.map((step, index) => {
              const isRevealed = revealedSteps.has(index);
              return (
                <motion.div
                  key={index}
                  data-index={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="sm:pl-16 relative"
                >
                  {/* Step number on timeline */}
                  <div
                    className={`absolute left-0 top-4 hidden sm:flex w-10 h-10 rounded-full items-center justify-center font-bold text-sm text-white shadow-md transition-all duration-500 z-10 ${
                      isRevealed
                        ? `bg-gradient-to-br ${step.color} shadow-lg`
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
                      isRevealed
                        ? "border-border bg-card shadow-sm"
                        : "border-border/50 bg-card/50"
                    }`}
                  >
                    {/* Mobile step number */}
                    <div className={`sm:hidden shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${step.color}`}>
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`shrink-0 w-10 h-10 rounded-lg ${step.bg} ${step.text} flex items-center justify-center hidden sm:flex`}>
                      {step.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm mb-1 ${isRevealed ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Revealed indicator */}
                    {isRevealed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`shrink-0 w-2 h-2 rounded-full mt-2 bg-gradient-to-br ${step.color}`}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
