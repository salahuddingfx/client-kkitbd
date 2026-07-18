"use client";

import { useEffect } from "react";
import { initDevProtection } from "@/lib/security";
import { SecurityProvider } from "./SecurityProvider";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";

export function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useInactivityTimer();

  useEffect(() => {
    initDevProtection();
  }, []);

  return <SecurityProvider>{children}</SecurityProvider>;
}
