import api from "./api";

/**
 * Utility helper for checking if the application is running inside a native Capacitor webview
 */
export const isNativePlatform = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean((window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.());
};

/**
 * Returns the current active platform ('android', 'ios', or 'web')
 */
export const getPlatform = (): "android" | "ios" | "web" => {
  if (typeof window === "undefined") return "web";
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string } }).Capacitor;
  if (cap?.getPlatform) {
    const platform = cap.getPlatform();
    if (platform === "android" || platform === "ios") return platform;
  }
  return "web";
};

/**
 * Register FCM push token with backend Express API
 */
export const registerDeviceToken = async (fcmToken: string): Promise<boolean> => {
  try {
    if (!fcmToken) return false;
    await api.post("/notifications/register-token", { fcmToken });
    return true;
  } catch (error) {
    console.error("Failed to register device token:", error);
    return false;
  }
};

/**
 * Remove FCM push token on user logout
 */
export const unregisterDeviceToken = async (fcmToken: string): Promise<boolean> => {
  try {
    if (!fcmToken) return false;
    await api.post("/notifications/remove-token", { fcmToken });
    return true;
  } catch (error) {
    console.error("Failed to unregister device token:", error);
    return false;
  }
};

/**
 * Open payment gateway URL safely (In-App Browser for Native, direct navigation for Web)
 */
export const openPaymentUrl = async (url: string): Promise<void> => {
  if (isNativePlatform()) {
    try {
      // Dynamically import Capacitor Browser plugin if present
      const { Browser } = await import("@capacitor/browser");
      await Browser.open({ url, windowName: "_blank" });
      return;
    } catch {
      // Fallback if plugin is not available
      window.location.href = url;
    }
  } else {
    window.location.href = url;
  }
};

/**
 * Trigger subtle haptic feedback for user interactions
 */
export const triggerHaptic = async (style: "LIGHT" | "MEDIUM" | "HEAVY" = "LIGHT"): Promise<void> => {
  if (!isNativePlatform()) return;
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    const impactMap = {
      LIGHT: ImpactStyle.Light,
      MEDIUM: ImpactStyle.Medium,
      HEAVY: ImpactStyle.Heavy,
    };
    await Haptics.impact({ style: impactMap[style] });
  } catch {
    // Ignore if haptics fail or plugin not loaded
  }
};
