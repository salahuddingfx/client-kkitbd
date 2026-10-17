"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Headless route-change scroll reset.
 * Automatically scrolls the window to the top on Next.js page transitions.
 * Returns null so it doesn't render any duplicate UI (UI is handled by BackToTop).
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

