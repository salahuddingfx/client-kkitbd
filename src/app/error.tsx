"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { Container } from "@/components/common";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-destructive mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        An unexpected error occurred. Please try again later.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </Container>
  );
}
