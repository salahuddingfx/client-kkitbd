"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui";

export function ServicesSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-3 w-28 mx-auto rounded-full" />
            <Skeleton className="h-12 w-80 mx-auto rounded-xl" />
            <Skeleton className="h-5 w-[450px] mx-auto rounded-md" />
          </div>
        </Container>
      </section>

      {/* Service Cards */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-8 space-y-4">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-6 w-48 rounded-md" />
                <SkeletonText lines={3} />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Skeleton className="h-1.5 w-1.5 rounded-full" />
                      <Skeleton className="h-3 w-32 rounded-md" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
