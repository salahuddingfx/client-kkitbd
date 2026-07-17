"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import {
  Play,
  BookOpen,
  Clock,
  Trophy,
  Zap,
  FileText,
  Code,
  Lightbulb,
  Target,
  Award,
  Rocket,
  Flag,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CurriculumSection {
  title: string;
  lessons: number;
  duration: string;
  topics?: string[];
}

interface CurriculumTimelineProps {
  curriculum: CurriculumSection[];
  totalLessons: number;
}

const moduleColors = [
  { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20", accent: "#3B82F6" },
  { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", accent: "#10B981" },
  { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", accent: "#F59E0B" },
  { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/20", accent: "#F43F5E" },
  { bg: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-500/20", accent: "#8B5CF6" },
  { bg: "bg-cyan-500/10", text: "text-cyan-600", border: "border-cyan-500/20", accent: "#06B6D4" },
  { bg: "bg-pink-500/10", text: "text-pink-600", border: "border-pink-500/20", accent: "#EC4899" },
  { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "border-indigo-500/20", accent: "#6366F1" },
];

const moduleIcons = [Target, Code, Lightbulb, Play, FileText, Award, Zap, Trophy];

const ROAD_PATH =
  "M 560,140 L 694,140 Q 734,140 734,180 L 734,400 Q 734,440 694,440 L 330,440 Q 290,440 290,480 L 290,671 Q 290,711 330,711 L 694,711 Q 734,711 734,751 L 734,985 Q 734,1025 694,1025 L 330,1025 Q 290,1025 290,1065 L 290,1311 Q 290,1351 330,1351 L 694,1351 Q 734,1351 734,1391 L 734,1625 Q 734,1665 694,1665 L 330,1665 Q 290,1665 290,1705 L 290,1965 Q 290,2005 330,2005 L 694,2005 Q 734,2005 734,2045 L 734,2265 Q 734,2305 694,2305";

const VIEWBOX = "0 100 1024 2280";
const VB_WIDTH = 1024;
const VB_HEIGHT = 2280;
const VB_Y_OFFSET = 100;

const ROAD_START = { x: 560, y: 140 };
const ROAD_END = { x: 694, y: 2305 };

function waypointToPercent(x: number, y: number) {
  return {
    leftPct: (x / VB_WIDTH) * 100,
    topPct: ((y - VB_Y_OFFSET) / VB_HEIGHT) * 100,
  };
}

interface CardWaypoint {
  x: number;
  y: number;
  side: "left" | "right";
}

function computeWaypoints(count: number): CardWaypoint[] {
  const segments = [
    { x: 734, yStart: 180, yEnd: 400, side: "right" as const },
    { x: 290, yStart: 480, yEnd: 671, side: "left" as const },
    { x: 734, yStart: 751, yEnd: 985, side: "right" as const },
    { x: 290, yStart: 1065, yEnd: 1311, side: "left" as const },
    { x: 734, yStart: 1391, yEnd: 1625, side: "right" as const },
    { x: 290, yStart: 1705, yEnd: 1965, side: "left" as const },
    { x: 734, yStart: 2045, yEnd: 2265, side: "right" as const },
  ];

  const result: CardWaypoint[] = [];
  for (let i = 0; i < Math.min(count, segments.length); i++) {
    const seg = segments[i];
    const midY = (seg.yStart + seg.yEnd) / 2;
    result.push({ x: seg.x, y: midY, side: seg.side });
  }
  return result;
}

export default function CurriculumTimeline({ curriculum, totalLessons }: CurriculumTimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const waypoints = useMemo(() => computeWaypoints(curriculum.length), [curriculum.length]);

  useEffect(() => {
    if (!wrapperRef.current || !pathRef.current || !carRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      const measuredPath = svgRef.current?.querySelector(
        "#road-measured"
      ) as SVGPathElement | null;

      if (measuredPath) {
        const measuredLength = measuredPath.getTotalLength();
        const car = carRef.current!;

        gsap.to(
          {},
          {
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 70%",
              end: "bottom 20%",
              scrub: 1.5,
              onUpdate: (self) => {
                const pt = measuredPath.getPointAtLength(self.progress * measuredLength);
                const svgEl = svgRef.current!;
                const svgRect = svgEl.getBoundingClientRect();
                const wrapperRect = wrapperRef.current!.getBoundingClientRect();

                const scaleX = svgRect.width / VB_WIDTH;
                const scaleY = svgRect.height / VB_HEIGHT;
                const offsetX = svgRect.left - wrapperRect.left;
                const offsetY = svgRect.top - wrapperRect.top;

                const px = offsetX + pt.x * scaleX;
                const py = offsetY + (pt.y - VB_Y_OFFSET) * scaleY;

                gsap.set(car, {
                  x: px - car.offsetWidth / 2,
                  y: py - car.offsetHeight / 2,
                });
              },
            },
          }
        );
      }

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [curriculum.length]);

  const startPt = waypointToPercent(ROAD_START.x, ROAD_START.y);
  const endPt = waypointToPercent(ROAD_END.x, ROAD_END.y);

  return (
    <>
      {/* Mobile: Simple vertical timeline */}
      <div className="md:hidden w-full max-w-lg mx-auto py-8 px-4">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 h-12 w-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                <Rocket className="h-5 w-5 text-green-600" />
              </div>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Starting Point</span>
                <p className="text-sm font-semibold text-foreground">Let&apos;s Begin!</p>
              </div>
            </div>
            {curriculum.map((section, i) => {
              const color = moduleColors[i % moduleColors.length];
              const Icon = moduleIcons[i % moduleIcons.length];
              return (
                <div key={i} className="relative flex items-start gap-4">
                  <div className="relative z-10 h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className={`h-5 w-5 ${color.text}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Module {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                      {section.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {section.lessons} lessons
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {section.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="relative flex items-start gap-4">
              <div className="relative z-10 h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <Flag className="h-5 w-5 text-primary" />
              </div>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Finish Line</span>
                <p className="text-sm font-semibold text-foreground">Course Complete!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2.5">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary">
              {curriculum.length} Modules • {totalLessons} Lessons
            </span>
          </div>
        </div>
      </div>

      {/* Desktop: SVG road timeline */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto py-12 overflow-visible">
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ aspectRatio: `${VB_WIDTH} / ${VB_HEIGHT}` }}
      >
        <svg
          ref={svgRef}
          viewBox={VIEWBOX}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="road-measured"
            d={ROAD_PATH}
            fill="none"
            stroke="transparent"
            strokeWidth="2"
          />
          <path
            ref={pathRef}
            d={ROAD_PATH}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>

        <div
          ref={carRef}
          className="absolute top-0 left-0 z-30 pointer-events-none"
          style={{ willChange: "transform" }}
        >
          <svg
            viewBox="0 0 120 50"
            className="w-16 h-7 drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="20" y="22" width="80" height="22" rx="11" fill="#DC2626" />
            <rect x="22" y="24" width="76" height="18" rx="9" fill="#EF4444" />
            <ellipse cx="60" cy="33" rx="30" ry="6" fill="#FCA5A5" />
            <rect x="28" y="16" width="64" height="10" rx="3" fill="#DC2626" />
            <rect x="30" y="18" width="60" height="6" rx="2" fill="#7C3AED" />
            <rect x="48" y="12" width="24" height="6" rx="2" fill="#1E1E1E" />
            <rect x="54" y="10" width="12" height="3" rx="1" fill="#374151" />
            <rect x="10" y="24" width="16" height="8" rx="2" fill="#1E1E1E" />
            <rect x="94" y="24" width="16" height="8" rx="2" fill="#1E1E1E" />
            <rect x="12" y="26" width="12" height="4" rx="1" fill="#4B5563" />
            <rect x="96" y="26" width="12" height="4" rx="1" fill="#4B5563" />
            <rect x="14" y="36" width="10" height="3" rx="1" fill="#1E1E1E" />
            <rect x="96" y="36" width="10" height="3" rx="1" fill="#1E1E1E" />
            <circle cx="60" cy="26" r="3" fill="#FBBF24" />
            <rect x="38" y="30" width="6" height="2" rx="1" fill="#FEF3C7" />
            <rect x="76" y="30" width="6" height="2" rx="1" fill="#FEF3C7" />
          </svg>
        </div>

        {/* Start card */}
        <div
          ref={(el) => { cardsRef.current[0] = el!; }}
          className="absolute z-10"
          style={{
            top: `${startPt.topPct}%`,
            left: `${startPt.leftPct}%`,
            transform: "translate(-50%, -100%) translateY(-8px)",
          }}
        >
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-3 shadow-md backdrop-blur-sm">
            <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Rocket className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Starting Point</span>
              <p className="text-sm font-semibold text-foreground">Let&apos;s Begin!</p>
            </div>
          </div>
        </div>

        {/* Module cards on the line */}
        {curriculum.slice(0, 7).map((section, i) => {
          const wp = waypoints[i];
          if (!wp) return null;
          const { leftPct, topPct } = waypointToPercent(wp.x, wp.y);

          return (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i + 1] = el!; }}
              className="absolute z-10"
              style={{
                top: `${topPct}%`,
                left: `${leftPct}%`,
                transform:
                  wp.side === "right"
                    ? "translateX(16px) translateY(-50%)"
                    : "translateX(calc(-100% - 16px)) translateY(-50%)",
              }}
            >
              <ModuleCard
                section={section}
                index={i}
                side={wp.side}
                total={curriculum.length}
              />
            </div>
          );
        })}

        {/* End card */}
        <div
          ref={(el) => { cardsRef.current[8] = el!; }}
          className="absolute z-10"
          style={{
            top: `${endPt.topPct}%`,
            left: `${endPt.leftPct}%`,
            transform: "translate(-50%, 8px)",
          }}
        >
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-2xl px-5 py-3 shadow-md backdrop-blur-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Flag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Finish Line</span>
              <p className="text-sm font-semibold text-foreground">Course Complete!</p>
            </div>
          </div>
        </div>

        {curriculum.length > 7 && (
          (() => {
            const overflow = curriculum.length - 7;
            const lastWp = waypoints[6];
            const { leftPct, topPct } = waypointToPercent(lastWp.x, lastWp.y + 180);
            return (
              <div
                ref={(el) => { cardsRef.current[9] = el!; }}
                className="absolute z-10"
                style={{
                  top: `${topPct}%`,
                  left: `${leftPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex items-center gap-2 bg-muted/80 backdrop-blur-sm border border-border rounded-xl px-4 py-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">
                    +{overflow} more modules
                  </span>
                </div>
              </div>
            );
          })()
        )}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2.5">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-primary">
            {curriculum.length} Modules • {totalLessons} Lessons
          </span>
        </div>
      </div>
      </div>
    </>
  );
}

function ModuleCard({
  section,
  index,
  side,
  total,
}: {
  section: CurriculumSection;
  index: number;
  side: "left" | "right";
  total: number;
}) {
  const color = moduleColors[index % moduleColors.length];
  const Icon = moduleIcons[index % moduleIcons.length];

  return (
    <div className="w-[260px] sm:w-[300px] md:w-[340px]">
      <div
        className={`group relative p-4 md:p-6 rounded-2xl border bg-card/95 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl ${color.border} hover:border-primary/30`}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <div
            className={`h-12 w-12 md:h-14 md:w-14 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
          >
            <Icon className={`h-6 w-6 md:h-7 md:w-7 ${color.text}`} />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md inline-block mb-1.5"
              style={{ backgroundColor: `${color.accent}15`, color: color.accent }}
            >
              MODULE {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-semibold text-foreground text-sm md:text-base group-hover:text-primary transition-colors leading-tight line-clamp-2">
              {section.title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                {section.lessons} lessons
              </span>
              <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                {section.duration}
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color.accent}08 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
