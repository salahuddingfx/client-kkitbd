"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/hooks/useGSAP";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  start?: string;
  end?: string;
}

export function Parallax({
  children,
  className = "",
  speed = 50,
  start = "top bottom",
  end = "bottom top",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub: 1.5,
        },
      });
    },
    [speed, start, end]
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
