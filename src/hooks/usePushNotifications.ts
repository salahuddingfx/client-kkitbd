"use client";

import { useState, useEffect, useCallback } from "react";
import {
  requestNotificationPermission,
  registerFCMToken,
  removeFCMToken,
} from "@/lib/push-notifications";

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [token, setToken] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    const fcmToken = await requestNotificationPermission();
    if (fcmToken) {
      setToken(fcmToken);
      setPermission("granted");
      await registerFCMToken(fcmToken);
      return true;
    }
    return false;
  }, [isSupported]);

  const unsubscribe = useCallback(async () => {
    if (token) {
      await removeFCMToken(token);
      setToken(null);
    }
  }, [token]);

  const onMessage = useCallback(
    (callback: (payload: { notification?: { title?: string; body?: string } }) => void) => {
      if (!isSupported) return () => {};

      let unsubscribeFn: (() => void) | undefined;

      import("firebase/messaging").then(({ onMessage: fbOnMessage }) => {
        import("@/lib/firebase").then(({ getFirebaseMessaging }) => {
          getFirebaseMessaging().then((messaging) => {
            if (messaging) {
              unsubscribeFn = fbOnMessage(messaging, callback);
            }
          });
        });
      });

      return () => {
        unsubscribeFn?.();
      };
    },
    [isSupported]
  );

  return {
    permission,
    token,
    isSupported,
    requestPermission,
    unsubscribe,
    onMessage,
  };
};
