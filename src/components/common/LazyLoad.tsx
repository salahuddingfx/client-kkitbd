"use client";

import { ReactNode } from "react";
import { ScrollReveal } from "@/components/animations";

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
}

export function LazyLoad({ children, className }: LazyLoadProps) {
  return (
    <ScrollReveal direction="up" duration={0.6} className={className}>
      {children}
    </ScrollReveal>
  );
}
