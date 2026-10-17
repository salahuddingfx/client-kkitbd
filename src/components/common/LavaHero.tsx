"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { LavaEffect } from "@/components/common/LavaEffect";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LavaHeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  intensity?: "subtle" | "medium" | "vibrant";
  align?: "center" | "left";
}

export function LavaHero({
  badge,
  title,
  description,
  breadcrumbItems,
  children,
  className,
  size = "md",
  intensity = "medium",
  align = "center",
}: LavaHeroProps) {
  const sizeClasses = {
    sm: "pt-10 sm:pt-14 pb-8 sm:pb-12",
    md: "pt-14 sm:pt-20 pb-12 sm:pb-16",
    lg: "pt-16 sm:pt-24 pb-14 sm:pb-20",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background border-b border-border/40",
        sizeClasses[size],
        className
      )}
    >
      {/* Dynamic Animated Lava Lamp Background */}
      <LavaEffect intensity={intensity} />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "max-w-3xl",
            align === "center" ? "mx-auto text-center" : "text-left"
          )}
        >
          {badge && (
            <div className={cn("mb-3 flex", align === "center" ? "justify-center" : "justify-start")}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 border border-primary/25 backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-4 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <div className={cn("mt-6 flex", align === "center" ? "justify-center" : "justify-start")}>
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/60 shadow-xs">
                <Breadcrumb items={breadcrumbItems} className="justify-center" />
              </div>
            </div>
          )}

          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
