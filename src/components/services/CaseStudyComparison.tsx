"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Zap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  BarChart3,
  Gauge,
  Sliders,
  Maximize2,
} from "lucide-react";
import { Badge } from "@/components/ui";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  highlight: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
    isPositive: boolean;
  }[];
  before: {
    stack: string;
    lighthouse: number;
    loadTime: string;
    uptime: string;
    conversion: string;
    painPoints: string[];
    tag: string;
  };
  after: {
    stack: string;
    lighthouse: number;
    loadTime: string;
    uptime: string;
    conversion: string;
    achievements: string[];
    tag: string;
  };
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "apexmart",
    client: "ApexMart Bangladesh",
    industry: "High-Traffic E-Commerce",
    highlight: "+340% Checkout Conversion & 0.5s Instant Load",
    metrics: [
      { label: "Page Load Speed", before: "5.4s", after: "0.5s", improvement: "10.8x Faster", isPositive: true },
      { label: "Lighthouse Performance", before: "36 / 100", after: "99 / 100", improvement: "+175% Boost", isPositive: true },
      { label: "Checkout Conversion", before: "1.2%", after: "4.9%", improvement: "+308% Growth", isPositive: true },
      { label: "Peak Campaign Uptime", before: "93.4%", after: "99.99%", improvement: "Zero Downtime", isPositive: true },
    ],
    before: {
      tag: "Legacy Monolith (Before KKIT)",
      stack: "Heavy WooCommerce & Uncached MySQL Database",
      lighthouse: 36,
      loadTime: "5.4s",
      uptime: "93.4%",
      conversion: "1.2%",
      painPoints: [
        "Website crashed during major discount flash sales (11.11 & Eid)",
        "5+ seconds slow mobile loading led to 65% customer bounce rate",
        "Manual bKash payment verification caused severe order delays",
        "Expensive server hosting costs with zero auto-scaling capacity",
      ],
    },
    after: {
      tag: "KKIT Modern Solution (After)",
      stack: "Next.js 16 Edge SSR + Node.js Microservices + Redis Cache",
      lighthouse: 99,
      loadTime: "0.5s",
      uptime: "99.99%",
      conversion: "4.9%",
      achievements: [
        "Instant sub-second page transitions with Next.js edge caching",
        "Handled 65,000 concurrent shoppers during flash sales with 0% downtime",
        "Automated instant bKash, Nagad & Card payment reconciliations",
        "45% reduction in cloud server infrastructure expenses",
      ],
    },
    quote: {
      text: "Migrating to KKIT's custom architecture was the single best investment for our company. Our conversion surged by 340% within the first month alone.",
      author: "Tanvir Ahmed",
      role: "Founder & CTO, ApexMart BD",
    },
  },
  {
    id: "skillbridge",
    client: "SkillBridge Academy",
    industry: "EdTech & LMS Platform",
    highlight: "15,000+ Concurrent Live Learners with Zero Lag",
    metrics: [
      { label: "Video Start Latency", before: "6.8s", after: "0.7s", improvement: "9.7x Faster", isPositive: true },
      { label: "Lighthouse Performance", before: "42 / 100", after: "98 / 100", improvement: "+133% Boost", isPositive: true },
      { label: "Student Completion Rate", before: "24%", after: "78%", improvement: "+225% Growth", isPositive: true },
      { label: "Bandwidth Server Cost", before: "$850/mo", after: "$190/mo", improvement: "77% Cost Saved", isPositive: true },
    ],
    before: {
      tag: "Shared Hosting LMS (Before KKIT)",
      stack: "Generic WordPress Plugin & Shared Cloud Hosting",
      lighthouse: 42,
      loadTime: "6.8s",
      uptime: "95.1%",
      conversion: "2.4%",
      painPoints: [
        "Frequent video buffering and lecture playback failures on mobile networks",
        "No interactive assignment submission or real-time mentor chat",
        "Piracy leaks due to unprotected direct video links",
        "Database locked up whenever 500+ students attempted exams simultaneously",
      ],
    },
    after: {
      tag: "KKIT Modern Solution (After)",
      stack: "Encrypted Bunny Stream CDN + Socket.io Live Rooms + Docker",
      lighthouse: 98,
      loadTime: "0.7s",
      uptime: "99.98%",
      conversion: "8.6%",
      achievements: [
        "Adaptive DRM-encrypted video streaming that works even on 3G connections",
        "Real-time interactive code editor & live exam submission engine",
        "Multi-tiered role permissions for Instructors, Mentors & Students",
        "Automated batch certifications and LinkedIn digital badges",
      ],
    },
    quote: {
      text: "Our students love the new learning experience. Video buffering is completely gone, and our course completion rate shot up from 24% to 78%.",
      author: "Farhana Yasmin",
      role: "Head of Academics, SkillBridge",
    },
  },
  {
    id: "medix",
    client: "Medix Cloud Healthcare",
    industry: "HealthTech & Clinic Management",
    highlight: "Automated Patient Records & 100% Data Security",
    metrics: [
      { label: "Patient Check-in Time", before: "18 mins", after: "2 mins", improvement: "9x Faster", isPositive: true },
      { label: "Record Retrieval Speed", before: "12.0s", after: "0.3s", improvement: "40x Speed", isPositive: true },
      { label: "Billing Accuracy", before: "84%", after: "99.9%", improvement: "Zero Errors", isPositive: true },
      { label: "Data Backup SLA", before: "Manual/Weekly", after: "Realtime Multi-zone", improvement: "Enterprise Grade", isPositive: true },
    ],
    before: {
      tag: "Legacy Desktop Software (Before KKIT)",
      stack: "Offline Desktop Access Database & Paper Files",
      lighthouse: 28,
      loadTime: "12.0s",
      uptime: "91.0%",
      conversion: "N/A",
      painPoints: [
        "High risk of patient data loss due to local hard-drive failures",
        "Doctors could not view medical histories from home or branch clinics",
        "Manual prescription writing resulted in dosage confusion and errors",
        "Zero automated SMS reminders, leading to high appointment no-shows",
      ],
    },
    after: {
      tag: "KKIT Modern Solution (After)",
      stack: "HIPAA-Compliant Cloud EHR + Automated SMS Gateway + Audit Trails",
      lighthouse: 99,
      loadTime: "0.3s",
      uptime: "99.99%",
      conversion: "N/A",
      achievements: [
        "Secure cloud EHR accessible seamlessly across tablets, mobile & desktops",
        "Instant digital e-prescriptions with automatic drug interaction warnings",
        "Automated bKash advance appointment booking and SMS reminder alerts",
        "Encrypted multi-region automated backups with complete HIPAA compliance",
      ],
    },
    quote: {
      text: "KKIT transformed our clinical workflow. Patient wait times dropped from 18 minutes to under 2 minutes, and our doctors have all patient history at their fingertips.",
      author: "Dr. K. M. Rahman",
      role: "Managing Director, Medix Health Network",
    },
  },
];

export function CaseStudyComparison() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("apexmart");
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPercentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
            <Sliders className="h-3.5 w-3.5" />
            Live Transformation Case Studies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Before vs After <span className="gradient-text">KKIT Engineering Impact</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Drag the interactive slider below to see how our engineering transformed real businesses from sluggish legacy bottlenecks into high-converting industry leaders.
          </p>
        </div>

        {/* Case Study Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-muted/60 p-1.5 rounded-2xl border border-border">
          {CASE_STUDIES.map((c) => {
            const isSelected = selectedCaseId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-card text-foreground shadow-sm border border-border/80"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.client}
              </button>
            );
          })}
        </div>
      </div>

      {/* Client Highlight Badge */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
            {activeCase.client.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-foreground">{activeCase.client}</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {activeCase.industry}
              </span>
            </div>
            <p className="text-xs text-primary font-bold mt-0.5">{activeCase.highlight}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setSliderPos(0)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
              sliderPos === 0
                ? "bg-red-500/10 text-red-600 border-red-500/30"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Show Full Before
          </button>
          <button
            onClick={() => setSliderPos(50)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
              sliderPos === 50
                ? "bg-primary/10 text-primary border-primary/30"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            50/50 Split View
          </button>
          <button
            onClick={() => setSliderPos(100)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
              sliderPos === 100
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Show Full KKIT After
          </button>
        </div>
      </div>

      {/* ─── INTERACTIVE SLIDER CONTAINER ─── */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full rounded-2xl border border-border shadow-md overflow-hidden select-none bg-background min-h-[440px]"
      >
        {/* RIGHT LAYER: "AFTER KKIT" (Always at background, revealed by slider) */}
        <div className="absolute inset-0 p-6 sm:p-8 bg-gradient-to-br from-emerald-500/5 via-background to-primary/5 flex flex-col justify-between">
          <div className="space-y-6 max-w-lg ml-auto">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                {activeCase.after.tag}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Modernized Architecture
              </span>
              <h4 className="text-lg font-bold text-foreground mt-0.5 flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-500 shrink-0" />
                {activeCase.after.stack}
              </h4>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-card border border-emerald-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Load Time</span>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {activeCase.after.loadTime}
                </p>
                <span className="text-[10px] text-emerald-600 font-bold">Instant LCP</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-emerald-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Lighthouse</span>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {activeCase.after.lighthouse}/100
                </p>
                <span className="text-[10px] text-emerald-600 font-bold">Flawless 100%</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-emerald-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Conversion</span>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {activeCase.after.conversion}
                </p>
                <span className="text-[10px] text-emerald-600 font-bold">+308% Surge</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-emerald-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Uptime</span>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {activeCase.after.uptime}
                </p>
                <span className="text-[10px] text-emerald-600 font-bold">Zero Crash</span>
              </div>
            </div>

            {/* Achievements list */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-foreground">KKIT Engineering Achievements:</span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {activeCase.after.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* LEFT LAYER: "BEFORE KKIT" (Clipped dynamically by sliderPos %) */}
        <div
          className="absolute inset-0 p-6 sm:p-8 bg-gradient-to-br from-red-500/10 via-background to-orange-500/5 flex flex-col justify-between overflow-hidden border-r border-border"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold shadow-xs">
                <AlertTriangle className="h-3.5 w-3.5" />
                {activeCase.before.tag}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Legacy Bottleneck Stack
              </span>
              <h4 className="text-lg font-bold text-foreground mt-0.5 flex items-center gap-2">
                <Server className="h-5 w-5 text-red-500 shrink-0" />
                {activeCase.before.stack}
              </h4>
            </div>

            {/* Metrics cards before */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-card border border-red-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Load Time</span>
                <p className="text-lg font-black text-red-600 dark:text-red-400">
                  {activeCase.before.loadTime}
                </p>
                <span className="text-[10px] text-red-600 font-bold">Severe Lag</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-red-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Lighthouse</span>
                <p className="text-lg font-black text-red-600 dark:text-red-400">
                  {activeCase.before.lighthouse}/100
                </p>
                <span className="text-[10px] text-red-600 font-bold">Critical Fails</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-red-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Conversion</span>
                <p className="text-lg font-black text-red-600 dark:text-red-400">
                  {activeCase.before.conversion}
                </p>
                <span className="text-[10px] text-red-600 font-bold">65% Abandonment</span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-red-500/30 shadow-xs">
                <span className="text-[10px] text-muted-foreground font-semibold">Uptime</span>
                <p className="text-lg font-black text-red-600 dark:text-red-400">
                  {activeCase.before.uptime}
                </p>
                <span className="text-[10px] text-red-600 font-bold">Crashing Often</span>
              </div>
            </div>

            {/* Pain points list */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-foreground">Bottlenecks & Customer Complaints:</span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {activeCase.before.painPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── SLIDER DIVIDER HANDLE ─── */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Draggable Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-primary shadow-xl flex items-center justify-center text-primary cursor-ew-resize pointer-events-auto">
            <Sliders className="h-4 w-4" />
          </div>
        </div>

        {/* Floating Hint Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-medium text-muted-foreground shadow-sm pointer-events-none">
          ↔ Drag slider left/right to compare
        </div>
      </div>

      {/* ─── PERFORMANCE COMPARISON SUMMARY ROW ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {activeCase.metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
            <span className="text-xs font-semibold text-muted-foreground">{m.label}</span>
            <div className="flex items-baseline justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-red-600 dark:text-red-400 line-through">
                  {m.before}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {m.after}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {m.improvement}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── CLIENT TESTIMONIAL QUOTE ─── */}
      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-card to-emerald-500/5 border border-primary/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-sm italic text-foreground leading-relaxed">
            &ldquo;{activeCase.quote.text}&rdquo;
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-bold text-foreground">{activeCase.quote.author}</span>
            <span className="text-xs text-muted-foreground">• {activeCase.quote.role}</span>
          </div>
        </div>

        <div className="shrink-0">
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Verified Case Study
          </Badge>
        </div>
      </div>
    </div>
  );
}
