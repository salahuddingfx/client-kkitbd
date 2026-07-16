"use client";

import { Container } from "@/components/common";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui";

export function HomeSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center bg-background-secondary">
        <Container className="py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Skeleton className="h-8 w-48 mx-auto rounded-full" />
            <Skeleton className="h-16 w-full max-w-3xl mx-auto rounded-xl" />
            <Skeleton className="h-12 w-2/3 mx-auto rounded-xl" />
            <SkeletonText lines={2} className="max-w-2xl mx-auto" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-44 rounded-lg" />
              <Skeleton className="h-12 w-40 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-10 w-24 mx-auto rounded-md" />
                  <Skeleton className="h-3 w-28 mx-auto rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 bg-background-secondary">
        <Container>
          <div className="text-center space-y-3 mb-12">
            <Skeleton className="h-3 w-24 mx-auto rounded-full" />
            <Skeleton className="h-8 w-64 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg mx-auto w-24" />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-3 mb-12">
            <Skeleton className="h-3 w-28 mx-auto rounded-full" />
            <Skeleton className="h-8 w-56 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-background-secondary">
        <Container>
          <div className="text-center space-y-3 mb-12">
            <Skeleton className="h-3 w-28 mx-auto rounded-full" />
            <Skeleton className="h-8 w-52 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden space-y-0">
                <Skeleton className="h-48 rounded-none" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <SkeletonText lines={2} />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-4 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-8 w-80 rounded-lg" />
              <SkeletonText lines={3} />
              <div className="grid grid-cols-2 gap-6 pt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded-md" />
                      <Skeleton className="h-3 w-36 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="aspect-square rounded-2xl" />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <Container>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Skeleton className="h-10 w-96 mx-auto rounded-lg bg-white/10" />
            <Skeleton className="h-5 w-full rounded-md bg-white/10" />
            <Skeleton className="h-5 w-3/4 mx-auto rounded-md bg-white/10" />
            <div className="flex justify-center gap-4 pt-4">
              <Skeleton className="h-12 w-44 rounded-lg bg-white/10" />
              <Skeleton className="h-12 w-36 rounded-lg bg-white/10" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
