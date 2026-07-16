"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

function TimelineCard({
  item,
  isInView,
  align,
}: {
  item: TimelineItem;
  isInView: boolean;
  align: "left" | "right" | "empty";
}) {
  if (align === "empty") {
    return <div className="hidden md:block" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -60 : 60 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className={cn(
        "max-w-md p-6 rounded-2xl border border-border bg-card",
        "shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]",
        "dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.03)]",
        "hover:shadow-lg transition-shadow duration-300",
        isInView && "border-primary/30"
      )}
    >
      <span className="text-sm font-bold text-primary">{item.year}</span>
      <h3 className="text-xl font-bold text-foreground mt-1">{item.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

function TimelineNode({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center min-h-[200px]">
      {/* Left Content */}
      <div className={cn(
        "flex justify-end",
        !isEven && "opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100"
      )}>
        <TimelineCard
          item={item}
          isInView={isInView}
          align={isEven ? "left" : "empty"}
        />
      </div>

      {/* Center Line & Dot */}
      <div className="flex flex-col items-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, ease: "backOut", delay: 0.2 }}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center z-10",
            "border-4 border-background",
            "transition-all duration-500",
            isInView
              ? "bg-primary shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              : "bg-muted"
          )}
        >
          {item.icon ? (
            <div className={cn("transition-colors duration-300", isInView ? "text-white" : "text-muted-foreground")}>
              {item.icon}
            </div>
          ) : (
            <div className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              isInView ? "bg-white scale-100" : "bg-muted-foreground scale-75"
            )} />
          )}
        </motion.div>
      </div>

      {/* Right Content */}
      <div className={cn(
        "flex justify-start",
        isEven && "opacity-0 pointer-events-none md:pointer-events-auto md:opacity-100"
      )}>
        <TimelineCard
          item={item}
          isInView={isInView}
          align={!isEven ? "right" : "empty"}
        />
      </div>
    </div>
  );
}

export function Timeline({ items, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={cn("relative py-12", className)}>
      {/* Background Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

      {/* Animated Progress Line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-primary -translate-x-1/2 origin-top"
        style={{ height: lineHeight }}
      />

      {/* Timeline Items */}
      <div className="relative space-y-8 md:space-y-16">
        {items.map((item, index) => (
          <TimelineNode key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
