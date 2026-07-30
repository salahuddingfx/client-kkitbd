"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Hammer, Send, CheckCircle, Clock, Home, Sparkles, ShieldCheck } from "lucide-react";
import { Button, GlowCard } from "@/components/ui";
import { Container } from "@/components/common";
import api from "@/lib/api";

export default function UnderConstructionPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Target countdown: 30 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.trim()) return;
    setLoading(true);
    try {
      await api.post("/newsletter", { email: email.trim() });
      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitted(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 max-w-3xl text-center">
        <GlowCard variant="glow" className="p-8 md:p-12 border-primary/20 backdrop-blur-md">
          {/* Construction Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Hammer className="h-4 w-4" />
            Under Construction • Platform Upgrade
          </div>

          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary shadow-inner">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-4">
            We&apos;re Building Something <span className="text-primary">Extraordinary</span>
          </h1>

          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Our teams are enhancing the KKIT learning infrastructure to bring you next-generation tools, AI features, and seamless performance.
          </p>

          {/* Live Countdown Grid */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-10">
            <div className="p-3.5 rounded-2xl border border-border bg-background/60 text-center shadow-sm">
              <span className="block text-2xl md:text-4xl font-extrabold text-primary">{timeLeft.days}</span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Days</span>
            </div>
            <div className="p-3.5 rounded-2xl border border-border bg-background/60 text-center shadow-sm">
              <span className="block text-2xl md:text-4xl font-extrabold text-foreground">{timeLeft.hours}</span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Hours</span>
            </div>
            <div className="p-3.5 rounded-2xl border border-border bg-background/60 text-center shadow-sm">
              <span className="block text-2xl md:text-4xl font-extrabold text-foreground">{timeLeft.minutes}</span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Mins</span>
            </div>
            <div className="p-3.5 rounded-2xl border border-border bg-background/60 text-center shadow-sm">
              <span className="block text-2xl md:text-4xl font-extrabold text-primary">{timeLeft.seconds}</span>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Secs</span>
            </div>
          </div>

          {/* Upgrade Progress Bar */}
          <div className="max-w-md mx-auto mb-10 text-left">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" /> System Upgrade Progress</span>
              <span className="text-primary font-bold">85% Complete</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary via-accent to-primary w-[85%] rounded-full animate-pulse" />
            </div>
          </div>

          {/* Get Notified Form */}
          <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl border border-border bg-background/50">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
              Be the first to know when we launch
            </h4>
            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm font-semibold py-2">
                <CheckCircle className="h-5 w-5" />
                <span>You&apos;re on the VIP launch list!</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 h-10 px-3.5 rounded-xl border border-border bg-background text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button type="submit" size="sm" disabled={loading} className="h-10 px-4">
                  <Send className="h-3.5 w-3.5 mr-1" />
                  {loading ? "..." : "Notify Me"}
                </Button>
              </form>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Homepage
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/courses">
                <ShieldCheck className="mr-2 h-4 w-4" />
                View Active Courses
              </Link>
            </Button>
          </div>
        </GlowCard>
      </Container>
    </div>
  );
}
