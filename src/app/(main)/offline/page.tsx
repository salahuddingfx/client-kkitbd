"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WifiOff, RefreshCw, Home, BookOpen, CheckCircle, Smartphone } from "lucide-react";
import { Button, GlowCard } from "@/components/ui";
import { Container } from "@/components/common";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      window.location.reload();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 max-w-2xl text-center">
        <GlowCard variant="glow" className="p-8 md:p-12 border-amber-500/20 backdrop-blur-md">
          {/* Offline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
            <WifiOff className="h-4 w-4" />
            {isOnline ? "Connection Restored!" : "No Connection Detected"}
          </div>

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-inner animate-pulse">
            <WifiOff className="h-8 w-8" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            You&apos;re Currently Offline
          </h1>

          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
            It looks like your internet connection went offline. Don&apos;t worry, cached content and outlines remain accessible!
          </p>

          {/* Helpful Check Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-left">
            <div className="p-3.5 rounded-xl border border-border bg-background/50 flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-amber-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">Check Cellular Data</p>
                <p className="text-muted-foreground">Verify Wi-Fi or Mobile Data</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-background/50 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">Auto-Reconnect</p>
                <p className="text-muted-foreground">Page auto-reloads on reconnect</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="default" size="lg" onClick={() => window.location.reload()} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Reconnecting
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </GlowCard>
      </Container>
    </div>
  );
}
