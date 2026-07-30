"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Mail, ShieldAlert } from "lucide-react";
import { Button, GlowCard } from "@/components/ui";
import { Container } from "@/components/common";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client-side errors
    console.error("System Error Caught:", error);
  }, [error]);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 max-w-2xl text-center">
        <GlowCard variant="glow" className="p-8 md:p-12 border-red-500/20 backdrop-blur-md">
          {/* Danger Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldAlert className="h-4 w-4" />
            System Status • 500 Internal Error
          </div>

          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner animate-pulse">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Something went wrong!
          </h1>

          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-6 leading-relaxed">
            Our system encountered an unexpected issue while processing your request. Don&apos;t worry, our engineering team has been notified.
          </p>

          {error.digest && (
            <div className="inline-block px-3 py-1 rounded-md bg-muted text-muted-foreground text-xs font-mono mb-8 border border-border">
              Reference ID: {error.digest}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="default" size="lg" onClick={() => reset()} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Report Issue
              </Link>
            </Button>
          </div>
        </GlowCard>
      </Container>
    </div>
  );
}
