"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText } from "@/components/ui";

export function CoursesSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-3 w-20 mx-auto rounded-full" />
            <Skeleton className="h-12 w-full max-w-sm mx-auto rounded-xl" />
            <Skeleton className="h-5 w-full max-w-md mx-auto rounded-md" />
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <Container>
          <div className="flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-lg" />
            ))}
          </div>
        </Container>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <Skeleton className="h-48 rounded-none" />
                <div className="p-6 space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-md" />
                  </div>
                  <Skeleton className="h-5 w-full rounded-md" />
                  <SkeletonText lines={2} />
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-24 rounded-md" />
                      <Skeleton className="h-2.5 w-16 rounded-md" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
