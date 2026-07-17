"use client";

import { useEffect } from "react";
import { initDevProtection } from "@/lib/security";
import { SecurityProvider } from "./SecurityProvider";

export function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initDevProtection();
  }, []);

  return <SecurityProvider>{children}</SecurityProvider>;
}
