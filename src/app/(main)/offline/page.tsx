"use client";

import { Container } from "@/components/common";

export default function OfflinePage() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">You&apos;re Offline</h1>
        <p className="text-lg text-gray-400">
          It looks like you&apos;ve lost your internet connection.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </Container>
  );
}
