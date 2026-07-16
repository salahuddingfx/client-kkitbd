"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonCard } from "@/components/ui";

export function PolicySkeleton() {
  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-8 w-16 mx-auto rounded-full" />
            <Skeleton className="h-12 w-72 mx-auto rounded-xl" />
            <Skeleton className="h-4 w-48 mx-auto rounded-md" />
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-5 w-full rounded-md mb-8" />
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-48 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full rounded-md" />
                      <Skeleton className="h-3 w-5/6 rounded-md" />
                      <Skeleton className="h-3 w-2/3 rounded-md" />
                    </div>
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
