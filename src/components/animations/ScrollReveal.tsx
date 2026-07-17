"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

const directionVars = {
  up: { y: (d: number) => d, x: 0 },
  down: { y: (d: number) => -d, x: 0 },
  left: { x: (d: number) => d, y: 0 },
  right: { x: (d: number) => -d, y: 0 },
};

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  distance = 60,
  duration = 1,
  delay = 0,
  ease = "power3.out",
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const { x: xVal, y: yVal } = directionVars[direction];
      const fromVars: gsap.TweenVars = {
        opacity: 0,
        x: typeof xVal === "function" ? xVal(distance) : xVal,
        y: typeof yVal === "function" ? yVal(distance) : yVal,
      };

      gsap.from(ref.current, {
        ...fromVars,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    [direction, distance, duration, delay, ease, start]
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
