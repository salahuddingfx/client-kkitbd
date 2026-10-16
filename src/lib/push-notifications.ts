"use client";

import api from "@/lib/api";

export const requestNotificationPermission = async (): Promise<string | null> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return null;
  }

  const { getFirebaseMessaging } = await import("@/lib/firebase");
  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;

  const { getToken } = await import("firebase/messaging");
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  return token;
};

export const registerFCMToken = async (token: string): Promise<boolean> => {
  try {
    await api.post("/notifications/register-token", { fcmToken: token });
    return true;
  } catch {
    return false;
  }
};

export const removeFCMToken = async (token: string): Promise<boolean> => {
  try {
    await api.post("/notifications/remove-token", { fcmToken: token });
    return true;
  } catch {
    return false;
  }
};
