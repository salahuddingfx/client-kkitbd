"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui";

export function AboutSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-3 w-20 mx-auto rounded-full" />
            <Skeleton className="h-12 w-96 mx-auto rounded-xl" />
            <Skeleton className="h-5 w-[500px] mx-auto rounded-md" />
          </div>
        </Container>
      </section>

      {/* Story + Stats */}
      <section className="py-20">
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
      <section className="py-20 bg-background-secondary">
        <Container>
          <div className="text-center space-y-3 mb-16">
            <Skeleton className="h-3 w-24 mx-auto rounded-full" />
            <Skeleton className="h-8 w-80 mx-auto rounded-lg" />
          </div>
          <div className="space-y-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
                <div className={`flex ${i % 2 === 0 ? "justify-end" : ""}`}>
                  {i % 2 === 0 ? (
                    <SkeletonCard className="max-w-md" />
                  ) : (
                    <div />
                  )}
                </div>
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className={`flex ${i % 2 !== 0 ? "justify-start" : ""}`}>
                  {i % 2 !== 0 ? (
                    <SkeletonCard className="max-w-md" />
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-3 mb-12">
            <Skeleton className="h-3 w-24 mx-auto rounded-full" />
            <Skeleton className="h-8 w-52 mx-auto rounded-lg" />
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
