"use client";

import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1400);
    const hideTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo mark */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full rounded-2xl bg-primary text-white text-3xl font-black">
            K
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">KKIT</h1>
          <p className="text-sm text-muted-foreground mt-1">Loading experience...</p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full intro-loader-bar" />
        </div>
      </div>
    </div>
  );
}
