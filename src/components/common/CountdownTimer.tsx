"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/utils";

interface CountdownTimerProps {
  deadline: string | Date;
  onComplete?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getTimeRemaining(deadline: Date) {
  const now = new Date().getTime();
  const diff = deadline.getTime() - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true, totalMs: diff };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
    totalMs: diff,
  };
}

function formatTwo(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer({ deadline, onComplete, className, size = "md", showLabel = true }: CountdownTimerProps) {
  const [time, setTime] = useState(() => getTimeRemaining(new Date(deadline)));

  useEffect(() => {
    const timer = setInterval(() => {
      const t = getTimeRemaining(new Date(deadline));
      setTime(t);
      if (t.expired) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline, onComplete]);

  const isUrgent = !time.expired && time.totalMs < 1000 * 60 * 60 * 24; // < 24h
  const isCritical = !time.expired && time.totalMs < 1000 * 60 * 60; // < 1h

  const sizeClasses = {
    sm: "text-xs gap-1",
    md: "text-sm gap-1.5",
    lg: "text-base gap-2",
  };

  const blockClasses = {
    sm: "px-1.5 py-0.5 min-w-[2rem]",
    md: "px-2 py-1 min-w-[2.5rem]",
    lg: "px-3 py-1.5 min-w-[3rem]",
  };

  if (time.expired) {
    return (
      <div className={cn("flex items-center gap-1.5 text-destructive font-medium", sizeClasses[size], className)}>
        <AlertTriangle className={cn(size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4")} />
        <span>Deadline passed</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {showLabel && (
        <Clock className={cn(
          "mr-1.5 shrink-0",
          size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
          isCritical ? "text-destructive" : isUrgent ? "text-yellow-500" : "text-muted-foreground"
        )} />
      )}
      <div className={cn("flex items-center gap-0.5 font-mono font-semibold", sizeClasses[size])}>
        {time.days > 0 && (
          <>
            <span className={cn("rounded bg-muted", blockClasses[size])}>{time.days}d</span>
            <span className="text-muted-foreground">:</span>
          </>
        )}
        <span className={cn(
          "rounded",
          blockClasses[size],
          isCritical ? "bg-destructive/10 text-destructive" : isUrgent ? "bg-yellow-500/10 text-yellow-600" : "bg-muted"
        )}>
          {formatTwo(time.hours)}
        </span>
        <span className="text-muted-foreground">:</span>
        <span className={cn(
          "rounded",
          blockClasses[size],
          isCritical ? "bg-destructive/10 text-destructive" : isUrgent ? "bg-yellow-500/10 text-yellow-600" : "bg-muted"
        )}>
          {formatTwo(time.minutes)}
        </span>
        <span className="text-muted-foreground">:</span>
        <span className={cn(
          "rounded",
          blockClasses[size],
          isCritical ? "bg-destructive/10 text-destructive" : isUrgent ? "bg-yellow-500/10 text-yellow-600" : "bg-muted"
        )}>
          {formatTwo(time.seconds)}
        </span>
      </div>
    </div>
  );
}
