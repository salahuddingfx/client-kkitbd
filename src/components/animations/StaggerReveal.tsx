"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/hooks/useGSAP";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  ease?: string;
  start?: string;
  from?: "start" | "center" | "edges" | "random";
}

export function StaggerReveal({
  children,
  className = "",
  childSelector = ".stagger-item",
  stagger = 0.1,
  duration = 0.8,
  delay = 0,
  y = 60,
  x = 0,
  opacity = 0,
  scale = 1,
  ease = "power3.out",
  start = "top 85%",
  from = "start",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const items = ref.current.querySelectorAll(childSelector);

      gsap.from(items, {
        opacity,
        y,
        x,
        scale,
        duration,
        stagger: { amount: stagger * items.length, from },
        delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    [childSelector, stagger, duration, delay, y, x, opacity, scale, ease, start, from]
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
