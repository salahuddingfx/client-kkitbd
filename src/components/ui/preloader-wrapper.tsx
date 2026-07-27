"use client";

import { useState, useEffect, useCallback } from "react";
import Preloader from "@/components/ui/preloader";

const HAS_SHOWN_KEY = "kkit_preloader_shown";

export function PreloaderWrapper() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasShown = sessionStorage.getItem(HAS_SHOWN_KEY);
    if (!hasShown) {
      setShow(true);
    }
  }, []);

  const handleComplete = useCallback(() => {
    setShow(false);
    sessionStorage.setItem(HAS_SHOWN_KEY, "true");
  }, []);

  if (!mounted || !show) return null;

  return <Preloader onComplete={handleComplete} />;
}