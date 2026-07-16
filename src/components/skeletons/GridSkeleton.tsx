"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonCard } from "@/components/ui";

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-3 w-20 mx-auto rounded-full" />
            <Skeleton className="h-12 w-72 mx-auto rounded-xl" />
            <Skeleton className="h-5 w-[400px] mx-auto rounded-md" />
          </div>
        </Container>
      </section>
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
