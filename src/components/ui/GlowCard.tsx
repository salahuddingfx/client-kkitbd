"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "glow" | "animated" | "neu";
}

export function GlowCard({
  children,
  className = "",
  innerClassName = "",
  variant = "glow",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || variant !== "glow") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--glow-x", `${x}%`);
    cardRef.current.style.setProperty("--glow-y", `${y}%`);
  };

  const variantClass = {
    glow: "glow-card bg-card",
    animated: "animated-border",
    neu: "neu-card",
  }[variant];

  if (variant === "animated") {
    return (
      <div
        ref={cardRef}
        className={cn(variantClass, className)}
        onMouseMove={handleMouseMove}
      >
        {/* Inner wrapper: solid bg so the spinning conic gradient shows only as a border */}
        <div className={cn("bg-card h-full w-full rounded-[calc(1rem-2px)] relative z-10", innerClassName)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={cn(variantClass, className)}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}
