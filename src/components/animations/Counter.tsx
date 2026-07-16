"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/hooks/useGSAP";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  delay?: number;
  start?: string;
  decimals?: number;
  separator?: boolean;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
  delay = 0,
  start = "top 85%",
  decimals = 0,
  separator = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    if (!separator) return fixed;
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useGSAP(
    () => {
      if (!ref.current) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: value,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setDisplay(formatNumber(obj.val));
        },
      });
    },
    [value, duration, delay, start, decimals, separator]
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
