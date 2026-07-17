"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui";

export function TechnologiesSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-32 mx-auto rounded-full" />
            <Skeleton className="h-14 w-full max-w-lg mx-auto rounded-xl" />
            <Skeleton className="h-5 w-full max-w-md mx-auto rounded-md" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Tech Grids */}
      {[1, 2, 3, 4].map((section) => (
        <section key={section} className={`py-12 sm:py-20 ${section % 2 === 0 ? "bg-background-secondary" : ""}`}>
          <Container>
            <div className="text-center space-y-3 mb-12">
              <Skeleton className="h-8 w-64 mx-auto rounded-lg" />
              <Skeleton className="h-4 w-80 mx-auto rounded-md" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <Skeleton className="h-14 w-14 rounded-xl mx-auto" />
                  <Skeleton className="h-4 w-20 mx-auto rounded-md" />
                  <Skeleton className="h-3 w-28 mx-auto rounded-md" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
}
