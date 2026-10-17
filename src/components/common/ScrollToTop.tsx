"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll to top on pathname route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Track scroll position and percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setProgress(pct);
      } else {
        setProgress(0);
      }

      setVisible(scrollTop > 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG ring parameters (radius 20 => circumference ~125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-75 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Scroll to top, page is ${progress}% scrolled`}
        className="relative group h-12 w-12 rounded-full bg-background/90 hover:bg-background backdrop-blur-md border border-border/80 hover:border-primary/60 shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {/* Progress SVG Ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
          {/* Background Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-muted/40"
            strokeWidth="3"
            fill="none"
          />
          {/* Active Progress Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-primary transition-[stroke-dashoffset] duration-150 ease-out"
            strokeWidth="3.2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Center Content: Switches between Arrow and exact % on hover, or displays % cleanly */}
        <div className="relative flex items-center justify-center text-foreground font-mono font-bold">
          {isHovered ? (
            <span className="text-[10px] tracking-tighter text-primary font-bold animate-in fade-in duration-200">
              {progress}%
            </span>
          ) : (
            <ArrowUp className="h-4 w-4 text-primary group-hover:text-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
          )}
        </div>

        {/* Floating Tooltip Pill */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-foreground text-background text-[10px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          {progress}% Top
        </span>
      </button>
    </div>
  );
}
