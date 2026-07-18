"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { authApi } from "@/services/api";

const INACTIVITY_TIMEOUT = 35 * 60 * 1000; // 35 minutes
const EVENTS = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];

export function useInactivityTimer() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      dispatch(logout());
      router.push("/login?reason=inactivity");
    }
  }, [dispatch, router]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
  }, [handleLogout]);

  useEffect(() => {
    if (!user) return;

    resetTimer();

    EVENTS.forEach((event) => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    // Also reset on visibility change (tab focus)
    const handleVisibility = () => {
      if (document.visibilityState === "visible") resetTimer();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      EVENTS.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user, resetTimer]);
}
