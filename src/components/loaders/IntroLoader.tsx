"use client";

import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const hideTimer = setTimeout(() => setVisible(false), 2100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Background stays opaque until fully hidden */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_70%)]" />

      {/* Content fades out */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-600 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative flex flex-col items-center gap-8">
          {/* Logo container with orbit rings */}
          <div className="relative w-28 h-28">
            {/* Outer orbit ring */}
            <div className="absolute inset-[-12px] rounded-full border border-primary/10 intro-loader-orbit" />

            {/* Inner orbit ring */}
            <div className="absolute inset-[-4px] rounded-full border border-primary/20 intro-loader-orbit-reverse" />

            {/* Glow behind logo */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl intro-loader-pulse" />

            {/* Logo box */}
            <div className="relative flex items-center justify-center w-full h-full rounded-2xl overflow-hidden intro-loader-logo">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-red-700" />

              {/* Glossy shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />

              {/* Edge highlight */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />

              {/* Letter */}
              <span className="relative text-4xl font-black text-white drop-shadow-lg">
                K
              </span>
            </div>
          </div>

          {/* Brand text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              KKIT
            </h1>
            <p className="text-sm text-muted-foreground tracking-wide uppercase">
              Loading experience...
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-56 space-y-2">
            <div className="relative h-1.5 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Shimmer track */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent intro-loader-shimmer" />

              {/* Fill bar */}
              <div className="h-full rounded-full intro-loader-bar relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-red-500 to-primary" />
                {/* Bar shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary/40 intro-loader-dot intro-loader-dot-1" />
              <div className="w-1 h-1 rounded-full bg-primary/40 intro-loader-dot intro-loader-dot-2" />
              <div className="w-1 h-1 rounded-full bg-primary/40 intro-loader-dot intro-loader-dot-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
