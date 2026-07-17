"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText } from "@/components/ui";

export function ContactSkeleton() {
  return (
    <div className="min-h-screen">
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-3 w-20 mx-auto rounded-full" />
            <Skeleton className="h-12 w-full max-w-xs mx-auto rounded-xl" />
            <Skeleton className="h-5 w-full max-w-md mx-auto rounded-md" />
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <Skeleton className="h-6 w-48 rounded-lg" />
              <SkeletonText lines={3} />
              <div className="space-y-4 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded-md" />
                      <Skeleton className="h-3 w-40 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-5">
              <Skeleton className="h-5 w-36 rounded-md" />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-10 rounded-lg" />
                  <Skeleton className="h-10 rounded-lg" />
                </div>
                <Skeleton className="h-10 rounded-lg" />
                <Skeleton className="h-10 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-12 w-36 rounded-lg" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
