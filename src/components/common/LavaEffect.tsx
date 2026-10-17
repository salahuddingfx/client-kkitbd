"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LavaEffectProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
  interactive?: boolean;
  showGrid?: boolean;
  showEmbers?: boolean;
}

/**
 * Premium Interactive Lava Effect Engine
 * All lava blobs dynamically react to mouse movement with fluid physics,
 * organic parallax displacement, liquid gooey SVG metaball fusion,
 * and an interactive molten core following the cursor anywhere across the section.
 */
export function LavaEffect({
  className,
  intensity = "medium",
  interactive = true,
  showGrid = true,
  showEmbers = true,
}: LavaEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);
  const cursorBlobRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  const [isHoveredState, setIsHoveredState] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    if (!container) return;

    // Use parent element (e.g. section) as tracking bounding box so mouse events
    // are captured seamlessly even when cursor is over text, headers, badges, or buttons!
    const targetSection = container.parentElement || container;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let isHovering = false;
    let animId: number;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = targetSection.getBoundingClientRect();

      // Check if mouse is inside or within generous proximity of the section
      const buffer = 40;
      const insideX = e.clientX >= rect.left - buffer && e.clientX <= rect.right + buffer;
      const insideY = e.clientY >= rect.top - buffer && e.clientY <= rect.bottom + buffer;

      if (insideX && insideY) {
        isHovering = true;
        setIsHoveredState(true);
        // Normalized coordinates 0 to 100%
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        targetX = x;
        targetY = y;
      } else {
        if (isHovering) {
          isHovering = false;
          setIsHoveredState(false);
          targetX = 50;
          targetY = 50;
        }
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      setIsHoveredState(false);
      targetX = 50;
      targetY = 50;
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    targetSection.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // High performance 60/120fps hardware-accelerated physics loop
    const updatePhysics = () => {
      // Lerp smooth inertia (spring speed: 0.08)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Normalized offset from center: -1.0 to +1.0
      const dx = (currentX - 50) / 50;
      const dy = (currentY - 50) / 50;

      // 1. Blob 1 (Crimson Leader): Gravitates in the direction of the cursor
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${dx * 75}px, ${dy * 55}px, 0) scale(${1 + dy * 0.1})`;
      }

      // 2. Blob 2 (Amber Flame): Fluid counter-displacement (pushes organically away)
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${-dx * 85}px, ${-dy * 65}px, 0) scale(${1 - dx * 0.09})`;
      }

      // 3. Blob 3 (Ruby Base): Rises and expands with mouse movement
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${dx * 60}px, ${-dy * 50}px, 0) scale(${1 + Math.abs(dx) * 0.14})`;
      }

      // 4. Blob 4 (Golden Honey Flare): Rotates and tilts toward mouse angle
      if (blob4Ref.current) {
        blob4Ref.current.style.transform = `translate3d(${-dx * 50}px, ${dy * 60}px, 0) scale(${1 + (Math.abs(dx) + Math.abs(dy)) * 0.08})`;
      }

      // 5. Cursor Molten Drop: Direct liquid drop that morphs & melts into any nearby blob
      if (cursorBlobRef.current) {
        cursorBlobRef.current.style.left = `${currentX}%`;
        cursorBlobRef.current.style.top = `${currentY}%`;
        cursorBlobRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.25 : 0.7})`;
        cursorBlobRef.current.style.opacity = isHovering ? "0.9" : "0.3";
      }

      // 6. Soft Ambient Cursor Glow: Direct illumination on the surface
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${currentX}%`;
        cursorGlowRef.current.style.top = `${currentY}%`;
        cursorGlowRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.15 : 0.8})`;
        cursorGlowRef.current.style.opacity = isHovering ? "0.75" : "0.2";
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      targetSection.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [interactive]);

  const opacityMap = {
    subtle: "opacity-45 dark:opacity-35",
    medium: "opacity-80 dark:opacity-70",
    vibrant: "opacity-95 dark:opacity-90",
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none -z-0",
        className
      )}
    >
      {/* SVG Goo Filter for authentic Liquid Lava Lamp blending */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="lava-goo-filter" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="32" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Lava Lamp Chamber with organic morphing blobs */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]",
          opacityMap[intensity]
        )}
        style={{
          filter: "blur(55px)",
          WebkitFilter: "blur(55px)",
        }}
      >
        {/* Blob 1: Crimson Red Primary Flame (with mouse physics wrapper) */}
        <div
          ref={blob1Ref}
          className="absolute -top-12 left-[15%] pointer-events-none transition-transform duration-75 ease-out"
          style={{ willChange: "transform" }}
        >
          <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 animate-lava-drift-1 mix-blend-multiply dark:mix-blend-screen opacity-90" />
        </div>

        {/* Blob 2: Warm Amber / Flame Orange (with mouse counter-physics wrapper) */}
        <div
          ref={blob2Ref}
          className="absolute top-1/4 right-[15%] pointer-events-none transition-transform duration-75 ease-out"
          style={{ willChange: "transform" }}
        >
          <div className="w-64 h-64 sm:w-88 sm:h-88 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-red-600 animate-lava-drift-2 mix-blend-multiply dark:mix-blend-screen opacity-85" />
        </div>

        {/* Blob 3: Deep Ruby / Coral Core (with mouse rise physics wrapper) */}
        <div
          ref={blob3Ref}
          className="absolute -bottom-14 left-[35%] pointer-events-none transition-transform duration-75 ease-out"
          style={{ willChange: "transform" }}
        >
          <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tl from-rose-700 via-red-500 to-orange-400 animate-lava-drift-3 mix-blend-multiply dark:mix-blend-screen opacity-80" />
        </div>

        {/* Blob 4: Golden Honey Accent (with tilt physics wrapper) */}
        <div
          ref={blob4Ref}
          className="absolute top-1/3 left-[50%] -translate-x-1/2 pointer-events-none transition-transform duration-75 ease-out"
          style={{ willChange: "transform" }}
        >
          <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 animate-lava-drift-4 mix-blend-multiply dark:mix-blend-screen opacity-75" />
        </div>

        {/* Interactive Mouse Molten Drop: Melts and connects dynamically with all blobs */}
        {interactive && (
          <div
            ref={cursorBlobRef}
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-opacity duration-300"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              willChange: "transform, left, top",
            }}
          />
        )}
      </div>

      {/* Interactive Ambient Cursor Light (outside goo filter for soft radiant highlight) */}
      {interactive && (
        <div
          ref={cursorGlowRef}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-red-500/30 via-orange-400/20 to-transparent blur-3xl pointer-events-none mix-blend-screen transition-opacity duration-300"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform, left, top",
          }}
        />
      )}

      {/* Floating Lava Embers */}
      {showEmbers && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="lava-ember" style={{ left: "15%", animationDelay: "0s", animationDuration: "7s" }} />
          <div className="lava-ember" style={{ left: "30%", animationDelay: "1.8s", animationDuration: "9s" }} />
          <div className="lava-ember" style={{ left: "50%", animationDelay: "3.2s", animationDuration: "6.5s" }} />
          <div className="lava-ember" style={{ left: "70%", animationDelay: "0.9s", animationDuration: "8s" }} />
          <div className="lava-ember" style={{ left: "85%", animationDelay: "2.5s", animationDuration: "7.5s" }} />
        </div>
      )}

      {/* Subtle SaaS Dot Grid Overlay */}
      {showGrid && (
        <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      )}

      {/* Soft Vignette / Edge Blends */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />

      {/* Bottom glowing accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none" />
    </div>
  );
}
