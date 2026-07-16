"use client";

import { Skeleton } from "@/components/ui";

export function AuthSkeleton() {
  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex flex-1 bg-background-secondary items-center justify-center p-12">
        <div className="max-w-md space-y-8">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-6 w-64 rounded-md" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <Skeleton className="h-8 w-48 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-64 rounded-md mx-auto" />
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-4 w-48 rounded-md mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
