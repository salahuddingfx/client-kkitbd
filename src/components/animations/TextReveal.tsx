"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/hooks/useGSAP";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "words" | "chars";
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  splitBy?: "words" | "chars" | "lines";
}

export function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
  mode = "words",
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [parts, setParts] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "chars") {
      setParts(text.split(""));
    } else if (splitBy === "lines") {
      setParts(text.split("\n"));
    } else {
      setParts(text.split(" "));
    }
  }, [text, mode, splitBy]);

  useGSAP(
    () => {
      if (!ref.current) return;

      const spans = ref.current.querySelectorAll(".reveal-part");

      gsap.set(spans, { opacity: 0, y: 40, rotateX: -40 });

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    [parts, stagger, duration, delay, start]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag className="flex flex-wrap gap-x-[0.25em]" style={{ perspective: "600px" }}>
        {parts.map((part, i) => (
          <span key={i} className="reveal-part inline-block" style={{ transformOrigin: "bottom" }}>
            {mode === "chars" && part === " " ? "\u00A0" : part}
            {mode === "words" && i < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    </div>
  );
}
