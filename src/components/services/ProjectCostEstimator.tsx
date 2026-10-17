"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Database,
  Cpu,
  Layers,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  DollarSign,
  TrendingUp,
  Server,
  Lock,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui";

export interface EstimatedProject {
  platformId: string;
  platformName: string;
  selectedFeatures: string[];
  speedTier: "standard" | "express" | "milestone";
  currency: "BDT" | "USD";
  totalPriceBDT: number;
  totalPriceUSD: number;
  estimatedWeeksMin: number;
  estimatedWeeksMax: number;
  summaryTitle: string;
}

interface ProjectCostEstimatorProps {
  onOrderCustomProject: (project: EstimatedProject) => void;
}

const PLATFORMS = [
  {
    id: "web",
    name: "Web Application",
    subtitle: "Next.js 16 + React + Tailwind",
    icon: Globe,
    basePrice: 25000,
    baseDays: 10,
    description: "High-speed modern web application or SaaS platform optimized for SEO and conversion.",
  },
  {
    id: "mobile",
    name: "Mobile App (iOS & Android)",
    subtitle: "Flutter / Capacitor Native",
    icon: Smartphone,
    basePrice: 35000,
    baseDays: 14,
    description: "Fluid cross-platform mobile app with offline sync, push notifications, and app store deployment.",
  },
  {
    id: "fullstack",
    name: "Full-Stack Suite",
    subtitle: "Web + Mobile + Shared Backend",
    icon: Layers,
    basePrice: 55000,
    baseDays: 20,
    popular: true,
    description: "Complete unified ecosystem: customer web app, mobile app, and unified microservice backend.",
  },
  {
    id: "ecommerce",
    name: "Custom E-Commerce / Multi-Vendor",
    subtitle: "High-Scale Digital Storefront",
    icon: ShoppingBag,
    basePrice: 65000,
    baseDays: 24,
    description: "Enterprise shopping platform with vendor portals, inventory sync, and multi-currency checkout.",
  },
];

const FEATURES = [
  {
    id: "auth",
    name: "User Authentication & RBAC",
    description: "JWT, Social Login (Google, Apple), Role-based Access (Admin, Mentor, User, Staff).",
    price: 8000,
    days: 3,
    icon: Lock,
    category: "Security",
  },
  {
    id: "payment",
    name: "Multi Payment Gateway",
    description: "Automated bKash, Nagad, Rocket, SSLCommerz, Stripe with automated PDF invoices.",
    price: 12000,
    days: 4,
    icon: DollarSign,
    category: "Finance",
  },
  {
    id: "admin",
    name: "Custom BI Admin Dashboard",
    description: "Real-time metrics, order management, CSV/Excel export, data filtering, and role audit logs.",
    price: 16000,
    days: 5,
    icon: TrendingUp,
    category: "Management",
  },
  {
    id: "ai",
    name: "AI Assistant & LLM Integration",
    description: "Custom OpenAI/Claude conversational agent, automated customer support & data extraction.",
    price: 22000,
    days: 6,
    icon: Cpu,
    category: "AI & Innovation",
  },
  {
    id: "realtime",
    name: "Realtime WebSockets & Live Push",
    description: "Instant in-app notifications, live chat messages, and background status broadcast.",
    price: 12000,
    days: 4,
    icon: Zap,
    category: "Realtime",
  },
  {
    id: "devops",
    name: "Cloud DevOps & CI/CD Pipeline",
    description: "Docker containerization, automated GitHub Actions, AWS/DigitalOcean automated SSL & scaling.",
    price: 14000,
    days: 4,
    icon: Server,
    category: "Infrastructure",
  },
  {
    id: "audit",
    name: "Security Audit & Cloudflare WAF",
    description: "OWASP Top-10 pen-testing, DDoS shield, SQL/XSS prevention, and strict rate-limiting.",
    price: 12000,
    days: 3,
    icon: Shield,
    category: "Security",
  },
  {
    id: "i18n",
    name: "Multi-language & SEO Schema",
    description: "Bangla & English localization, dynamic OpenGraph cards, JSON-LD structured data for Google.",
    price: 8000,
    days: 3,
    icon: Globe,
    category: "Growth",
  },
];

const SPEED_OPTIONS = [
  {
    id: "standard" as const,
    name: "Standard Pace",
    multiplierPrice: 1.0,
    multiplierDays: 1.0,
    badge: "Most Balanced",
    description: "Standard agile sprints with bi-weekly client feedback rounds.",
  },
  {
    id: "express" as const,
    name: "Express Fast-Track",
    multiplierPrice: 1.25,
    multiplierDays: 0.65,
    badge: "35% Faster Delivery",
    description: "Dedicated priority engineering squad focused entirely on your release schedule.",
  },
  {
    id: "milestone" as const,
    name: "Staged Milestones",
    multiplierPrice: 1.1,
    multiplierDays: 1.2,
    badge: "Step-by-Step",
    description: "Phased rollout with beta user testing after every deliverable phase.",
  },
];

const USD_RATE = 120; // 1 USD = 120 BDT

export function ProjectCostEstimator({ onOrderCustomProject }: ProjectCostEstimatorProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("web");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["auth", "admin", "payment"]);
  const [speedTier, setSpeedTier] = useState<"standard" | "express" | "milestone">("standard");
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");

  const platformObj = useMemo(
    () => PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0],
    [selectedPlatform]
  );

  const speedObj = useMemo(
    () => SPEED_OPTIONS.find((s) => s.id === speedTier) || SPEED_OPTIONS[0],
    [speedTier]
  );

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllFeatures = () => {
    if (selectedFeatures.length === FEATURES.length) {
      setSelectedFeatures([]);
    } else {
      setSelectedFeatures(FEATURES.map((f) => f.id));
    }
  };

  // Calculations
  const rawFeaturePrice = useMemo(() => {
    return selectedFeatures.reduce((acc, featId) => {
      const feat = FEATURES.find((f) => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);
  }, [selectedFeatures]);

  const rawDays = useMemo(() => {
    const featDays = selectedFeatures.reduce((acc, featId) => {
      const feat = FEATURES.find((f) => f.id === featId);
      return acc + (feat ? feat.days : 0);
    }, 0);
    return platformObj.baseDays + featDays;
  }, [platformObj, selectedFeatures]);

  const subtotalBDT = platformObj.basePrice + rawFeaturePrice;
  const finalPriceBDT = Math.round(subtotalBDT * speedObj.multiplierPrice);
  const finalPriceUSD = Math.round(finalPriceBDT / USD_RATE);

  const finalDays = Math.max(7, Math.round(rawDays * speedObj.multiplierDays));
  const weeksMin = Math.max(1, Math.floor(finalDays / 7));
  const weeksMax = Math.ceil((finalDays + 4) / 7);

  const formatPrice = (bdt: number, usd: number) => {
    if (currency === "USD") {
      return `$${usd.toLocaleString()}`;
    }
    return `৳${bdt.toLocaleString()}`;
  };

  const handleOrderClick = () => {
    const featureNames = selectedFeatures
      .map((id) => FEATURES.find((f) => f.id === id)?.name)
      .filter(Boolean) as string[];

    const summaryTitle = `${platformObj.name} [${speedObj.name}] + ${featureNames.length} Modules`;

    onOrderCustomProject({
      platformId: platformObj.id,
      platformName: platformObj.name,
      selectedFeatures: featureNames,
      speedTier,
      currency,
      totalPriceBDT: finalPriceBDT,
      totalPriceUSD: finalPriceUSD,
      estimatedWeeksMin: weeksMin,
      estimatedWeeksMax: weeksMax,
      summaryTitle,
    });
  };

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <Calculator className="h-3.5 w-3.5" />
            Interactive Project Cost Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Calculate Your Project <span className="gradient-text">Budget & Timeline</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Choose your core platform, architectural modules, and delivery velocity. Get an instant transparent estimate with zero hidden surprises.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center self-start md:self-auto bg-muted/60 p-1 rounded-xl border border-border">
          <button
            onClick={() => setCurrency("BDT")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "BDT"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            BDT (৳)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currency === "USD"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Platform Selection */}
          <div className="bg-card rounded-2xl border border-border/70 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-foreground">Select Project Core Platform</h3>
              </div>
              <span className="text-xs text-muted-foreground">Base Architecture</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLATFORMS.map((plat) => {
                const Icon = plat.icon;
                const isSelected = selectedPlatform === plat.id;
                return (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatform(plat.id)}
                    className={`relative p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                        : "border-border/70 hover:border-border hover:bg-muted/40"
                    }`}
                  >
                    {plat.popular && (
                      <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-xs shadow-primary/30"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm text-foreground flex items-center justify-between">
                          <span>{plat.name}</span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                        </div>
                        <p className="text-[11px] text-primary/80 font-medium mt-0.5">{plat.subtitle}</p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {plat.description}
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50 text-[11px]">
                          <span className="text-muted-foreground">Base: ~{plat.baseDays} days</span>
                          <span className="font-bold text-foreground">
                            {formatPrice(plat.basePrice, Math.round(plat.basePrice / USD_RATE))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Architecture & Feature Modules */}
          <div className="bg-card rounded-2xl border border-border/70 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-foreground">Custom Feature Modules</h3>
              </div>
              <button
                onClick={selectAllFeatures}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                {selectedFeatures.length === FEATURES.length ? "Deselect All" : "Select All"}
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Select key enterprise components you require. Each module automatically computes its engineering timeline and cost.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map((feat) => {
                const Icon = feat.icon;
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                      isChecked
                        ? "border-primary/60 bg-primary/5 ring-1 ring-primary/20"
                        : "border-border/60 hover:border-border hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-foreground truncate">{feat.name}</span>
                          <span className="text-[10px] font-semibold text-primary shrink-0">
                            +{formatPrice(feat.price, Math.round(feat.price / USD_RATE))}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-tight">
                          {feat.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                            +{feat.days}d sprint
                          </span>
                          <span className="text-[10px] text-muted-foreground/80 font-medium">
                            {feat.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Delivery Speed & SLA */}
          <div className="bg-card rounded-2xl border border-border/70 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-foreground">Timeline Velocity & SLA</h3>
              </div>
              <span className="text-xs text-muted-foreground">Engineering Speed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SPEED_OPTIONS.map((opt) => {
                const isSelected = speedTier === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSpeedTier(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                        : "border-border/60 hover:border-border hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{opt.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary/10 text-primary border border-primary/20">
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Live Estimator Summary Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="bg-card rounded-2xl border border-primary/30 p-6 shadow-lg shadow-primary/5 relative overflow-hidden">
            {/* Ambient accent header */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-orange-500 to-amber-500" />

            <div className="flex items-center justify-between pb-4 border-b border-border/70">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm text-foreground">Instant Estimate Summary</span>
              </div>
              <Badge variant="outline" className="text-[10px] bg-primary/5 border-primary/25 text-primary font-bold">
                Live Calculation
              </Badge>
            </div>

            {/* Price & Delivery Highlights */}
            <div className="py-5 space-y-4">
              <div>
                <span className="text-xs font-medium text-muted-foreground">Estimated Investment:</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                    {formatPrice(finalPriceBDT, finalPriceUSD)}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {currency === "BDT" ? `(~ $${finalPriceUSD.toLocaleString()} USD)` : `(~ ৳${finalPriceBDT.toLocaleString()} BDT)`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60">
                <div>
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" /> Estimated Time:
                  </span>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    {weeksMin} - {weeksMax} Weeks
                  </p>
                  <p className="text-[10px] text-muted-foreground">(~{finalDays} working days)</p>
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" /> Velocity:
                  </span>
                  <p className="text-sm font-bold text-foreground mt-0.5">{speedObj.name}</p>
                  <p className="text-[10px] text-primary font-semibold">{speedObj.badge}</p>
                </div>
              </div>
            </div>

            {/* Selected Breakdown */}
            <div className="space-y-2.5 pb-5 border-b border-border/70 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Core: {platformObj.name}</span>
                <span className="font-bold text-foreground">
                  {formatPrice(platformObj.basePrice, Math.round(platformObj.basePrice / USD_RATE))}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Features ({selectedFeatures.length} modules selected)</span>
                <span className="font-bold text-foreground">
                  +{formatPrice(rawFeaturePrice, Math.round(rawFeaturePrice / USD_RATE))}
                </span>
              </div>
              {speedTier !== "standard" && (
                <div className="flex items-center justify-between text-primary font-medium">
                  <span>Sprint Speed Multiplier ({speedObj.name})</span>
                  <span>+{Math.round((speedObj.multiplierPrice - 1) * 100)}%</span>
                </div>
              )}
            </div>

            {/* Standard Enterprise Inclusions */}
            <div className="py-4 space-y-2">
              <span className="text-xs font-bold text-foreground">Included In Every Project:</span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>100% Full Source Code & IP Ownership</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>3 Months Free Bug-Fix Warranty & Tech Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Production Deployment & SSL Certification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Staging URL Previews updated every sprint</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleOrderClick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-primary-foreground font-bold text-sm shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="h-4 w-4" />
                Order This Custom Project Stack
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>

              <a
                href={`https://wa.me/8801886178338?text=${encodeURIComponent(
                  `Hi KKIT Team! I used your Project Cost Calculator for a "${platformObj.name}" with features: ${selectedFeatures.join(
                    ", "
                  )}. Estimated Budget: ${formatPrice(finalPriceBDT, finalPriceUSD)}. Let's discuss!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                Instant WhatsApp Consultation
              </a>
            </div>
          </div>

          {/* Quick FAQ / Note */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground flex items-start gap-3">
            <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Need a completely custom enterprise scope, multi-system integration, or dedicated DevOps engineering? Contact us directly for a custom RFP proposal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
