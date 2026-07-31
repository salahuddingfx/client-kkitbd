"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackGA4PageView } from "@/lib/tracking";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    // Avoid duplicate pings for exact same path in rapid succession
    if (lastPathRef.current === fullPath) return;
    lastPathRef.current = fullPath;

    const pageTitle = typeof document !== "undefined" ? document.title : "";
    const referrer = typeof document !== "undefined" ? document.referrer : "";

    // 1. GA4 Client-Side PageView
    trackGA4PageView(fullPath, pageTitle);

    // 2. Server-Side Visitor Ping
    try {
      fetch(`${API_BASE}/audit-logs/ping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          path: fullPath,
          title: pageTitle,
          referrer,
        }),
      }).catch(() => {});
    } catch {
      // Ignore network errors silently for non-blocking analytics
    }
  }, [pathname, searchParams]);

  return null;
}
