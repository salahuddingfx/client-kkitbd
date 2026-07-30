"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Search, Compass, BookOpen, Layers, ArrowLeft, HelpCircle } from "lucide-react";
import { Button, GlowCard } from "@/components/ui";
import { Container } from "@/components/common";

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
      {/* Background Glow Elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

      <Container className="relative z-10 max-w-3xl text-center">
        <GlowCard variant="glow" className="p-8 md:p-12 border-primary/20 backdrop-blur-md">
          {/* Animated 404 Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="h-4 w-4" />
            Error 404 • Page Not Found
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-4">
            4<span className="text-primary animate-pulse">0</span>4
          </h1>

          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Oops! Looks like you&apos;ve wandered off course
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, services, or topics..."
                className="w-full h-11 pl-10 pr-24 rounded-xl border border-border bg-background/80 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Button type="submit" size="sm" className="absolute right-1.5 h-8 px-3">
                Search
              </Button>
            </div>
          </form>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <Link href="/" className="p-3 rounded-xl border border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center group">
              <Home className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-foreground">Home</span>
            </Link>
            <Link href="/courses" className="p-3 rounded-xl border border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center group">
              <BookOpen className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-foreground">Courses</span>
            </Link>
            <Link href="/services" className="p-3 rounded-xl border border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center group">
              <Layers className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-foreground">Services</span>
            </Link>
            <Link href="/discussions" className="p-3 rounded-xl border border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center group">
              <Compass className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-foreground">Community</span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Homepage
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.back()} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back Previous
            </Button>
          </div>
        </GlowCard>
      </Container>
    </div>
  );
}
