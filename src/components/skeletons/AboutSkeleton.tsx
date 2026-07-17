"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui";

export function AboutSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-3 w-20 mx-auto rounded-full" />
            <Skeleton className="h-12 w-full max-w-md mx-auto rounded-xl" />
            <Skeleton className="h-5 w-full max-w-[500px] mx-auto rounded-md" />
          </div>
        </Container>
      </section>

      {/* Story + Stats */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-8 w-40 rounded-lg" />
              <SkeletonText lines={8} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 bg-background-secondary">
        <Container>
          <div className="text-center space-y-3 mb-16">
            <Skeleton className="h-3 w-24 mx-auto rounded-full" />
            <Skeleton className="h-8 w-full max-w-xs mx-auto rounded-lg" />
          </div>
          <div className="space-y-8 md:space-y-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center">
                <div className={`flex ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  {i % 2 === 0 ? (
                    <SkeletonCard className="max-w-md" />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
                <Skeleton className="h-12 w-12 rounded-full shrink-0 mx-auto md:mx-0" />
                <div className={`flex ${i % 2 !== 0 ? "md:justify-start" : ""}`}>
                  {i % 2 !== 0 ? (
                    <SkeletonCard className="max-w-md" />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="text-center space-y-3 mb-12">
            <Skeleton className="h-3 w-24 mx-auto rounded-full" />
            <Skeleton className="h-8 w-full max-w-xs mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
