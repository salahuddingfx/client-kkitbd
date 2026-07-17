"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/common";

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Module Release Time",
    description:
      "One new module/practice task will be released every day at 8 PM. Use Gems to get early access 2 hours before.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Watch Time Duration",
    description:
      "Each module has about 10 videos (12-15 minutes each). Watching video content will require 3-5 hours daily.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Similar Topic Research",
    description:
      "Spend 1-2 hours daily researching similar topics on Google or through our support system.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Get Support When Stuck",
    description:
      "If you get stuck, join our support sessions. 6+ hours of live support daily.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Live Conceptual Sessions",
    description:
      "After every 2-4 modules, there will be a conceptual session/live class.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    title: "Assignment Submission",
    description:
      "After every 4-7 modules, there will be an assignment. Maximum marks: 60.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "SCIC Program",
    description:
      "Complete the bootcamp on time to join the SCIC program for job placement.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "28-30 Week Bootcamp",
    description:
      "Commit to investing 6-8 hours daily for 28-30 weeks to complete the bootcamp.",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Progress: 0 when section enters viewport, 1 when section exits
      const progress = 1 - (sectionTop + sectionHeight) / (windowHeight + sectionHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate curved path
  const generatePath = () => {
    const points = [
      { x: 50, y: 0 },
      { x: 50, y: 8 },
      { x: 15, y: 18 },
      { x: 15, y: 28 },
      { x: 50, y: 38 },
      { x: 85, y: 48 },
      { x: 85, y: 58 },
      { x: 50, y: 68 },
      { x: 15, y: 78 },
      { x: 15, y: 88 },
      { x: 50, y: 98 },
    ];

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  // Get node position along path
  const getNodePosition = (index: number) => {
    const positions = [
      { x: 50, y: 4 },
      { x: 32, y: 13 },
      { x: 15, y: 23 },
      { x: 32, y: 33 },
      { x: 68, y: 43 },
      { x: 85, y: 53 },
      { x: 68, y: 63 },
      { x: 32, y: 78 },
    ];
    return positions[index] || { x: 50, y: 50 };
  };

  const svgPath = generatePath();

  return (
    <section ref={sectionRef} className="py-20 bg-background-secondary">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How This Bootcamp{" "}
            <span className="text-primary">Works</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This bootcamp will make you skilled in MERN Stack Web Development through step-by-step learning, hands-on projects, and evaluation from zero.
          </p>
        </motion.div>

        {/* Track Container */}
        <div className="relative max-w-4xl mx-auto" style={{ height: "900px" }}>
          {/* SVG Track */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Background path */}
            <path
              d={svgPath}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            {/* Filled path */}
            <path
              d={svgPath}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.6"
              strokeLinecap="round"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: 500 - scrollProgress * 500,
              }}
            />
          </svg>

          {/* Step Nodes */}
          {steps.map((step, index) => {
            const pos = getNodePosition(index);
            const isLeft = pos.x < 50;
            const stepProgress = (index + 1) / steps.length;
            const isRevealed = scrollProgress >= stepProgress - 0.08;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className={`absolute top-1/2 -translate-y-1/2 w-56 md:w-64 ${
                    isLeft ? "right-10 md:right-14" : "left-10 md:left-14"
                  }`}
                >
                  <div className={`bg-card rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                    isRevealed ? "border-primary/30" : "border-border"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isRevealed 
                          ? "bg-primary text-white" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {step.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground mb-1 text-sm">
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Circle Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isRevealed ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg transition-all duration-300 z-10 ${
                      isRevealed
                        ? "bg-primary shadow-primary/30"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
