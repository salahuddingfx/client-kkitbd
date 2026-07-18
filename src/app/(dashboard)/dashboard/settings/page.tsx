"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  Bell,
  Save,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  Smartphone,
  Monitor,
  Tablet,
  Trash2,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn } from "@/utils";
import { useAppSelector } from "@/redux/hooks";
import { authApi, userApi, devicesApi, DeviceSession } from "@/services/api";
import { toast } from "sonner";
import { formatDate } from "@/utils";

function parseUserAgent(ua: string): { browser: string; os: string; device: "desktop" | "mobile" | "tablet" } {
  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /Chrome/.test(ua) ? "Chrome" :
    /Firefox/.test(ua) ? "Firefox" :
    /Safari/.test(ua) ? "Safari" :
    "Unknown";

  const os =
    /Windows/.test(ua) ? "Windows" :
    /Mac OS/.test(ua) ? "macOS" :
    /Linux/.test(ua) ? "Linux" :
    /Android/.test(ua) ? "Android" :
    /iPhone|iPad/.test(ua) ? "iOS" :
    "Unknown";

  let device: "desktop" | "mobile" | "tablet" = "desktop";
  if (/Android.*Mobile|iPhone(?!.*iPad)/.test(ua)) device = "mobile";
  else if (/iPad|Android(?!.*Mobile)/.test(ua)) device = "tablet";

  return { browser, os, device };
}

function getDeviceIcon(type: "desktop" | "mobile" | "tablet") {
  switch (type) {
    case "mobile": return Smartphone;
    case "tablet": return Tablet;
    default: return Monitor;
  }
}

function getDeviceLabel(type: "desktop" | "mobile" | "tablet") {
  switch (type) {
    case "mobile": return "Mobile";
    case "tablet": return "Tablet";
    default: return "Desktop";
  }
}

export default function SettingsPage() {
  const { user: authUser } = useAppSelector((state) => state.auth);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    courseUpdates: true,
    marketing: false,
    weeklyDigest: true,
  });

  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [removingDevice, setRemovingDevice] = useState<string | null>(null);
  const [removingAll, setRemovingAll] = useState(false);

  useEffect(() => {
    devicesApi.getActive()
      .then((res) => {
        if (res.success) setDevices(res.data || []);
      })
      .catch(() => setDevices([]))
      .finally(() => setDevicesLoading(false));
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setUpdatingPassword(true);
    try {
      const res = await authApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      if (res.success) {
        toast.success("Password updated successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!authUser?.id) return;
    setSavingPrefs(true);
    try {
      await userApi.update(authUser.id, { notifications: notifications } as any);
      toast.success("Preferences saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save preferences.");
    } finally {
      setSavingPrefs(false);
    }
  };

  const handleRemoveDevice = async (deviceId: string) => {
    setRemovingDevice(deviceId);
    try {
      await devicesApi.remove(deviceId);
      setDevices((prev) => prev.filter((d) => d._id !== deviceId));
      toast.success("Device removed successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove device.");
    } finally {
      setRemovingDevice(null);
    }
  };

  const handleRemoveAllDevices = async () => {
    setRemovingAll(true);
    try {
      await devicesApi.removeAll();
      setDevices([]);
      toast.success("All other devices logged out.");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove devices.");
    } finally {
      setRemovingAll(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      {/* Change Password */}
      <FadeIn>
        <Card>
          <form onSubmit={handleUpdatePassword}>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <div className="relative">
                    <input
                      required
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <div className="relative">
                    <input
                      required
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full h-10 px-3 pr-10 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {updatingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                  Update Password
                </button>
              </div>
            </CardContent>
          </form>
        </Card>
      </FadeIn>

      {/* Notifications */}
      <FadeIn delay={0.1}>
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            </div>

            <div className="space-y-4">
              {Object.entries({
                email: "Email notifications",
                courseUpdates: "Course updates & new lectures",
                marketing: "Marketing & promotional emails",
                weeklyDigest: "Weekly learning digest",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <p className="text-sm text-foreground">{label}</p>
                  <button
                    onClick={() =>
                      setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })
                    }
                    className={cn(
                      "relative w-11 h-6 rounded-full transition-colors",
                      notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                        notifications[key as keyof typeof notifications] ? "left-6" : "left-1"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSavePreferences}
                disabled={savingPrefs}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {savingPrefs ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Preferences
              </button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Device Management */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Devices</h3>
                  <p className="text-xs text-muted-foreground">
                    {devices.length}/3 devices used
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDevicesLoading(true);
                  devicesApi.getActive()
                    .then((res) => { if (res.success) setDevices(res.data || []); })
                    .catch(() => {})
                    .finally(() => setDevicesLoading(false));
                }}
                disabled={devicesLoading}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Refresh"
              >
                <RefreshCw className={cn("h-4 w-4", devicesLoading && "animate-spin")} />
              </button>
            </div>

            {devicesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : devices.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No active device sessions found.
              </div>
            ) : (
              <div className="space-y-3">
                {devices.map((device) => {
                  const parsed = parseUserAgent(device.userAgent || "");
                  const Icon = getDeviceIcon(parsed.device);
                  const label = getDeviceLabel(parsed.device);

                  return (
                    <div
                      key={device._id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="p-2.5 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">
                            {label} - {parsed.browser}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {parsed.os} &middot; {device.ip || "Unknown IP"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Last active: {formatDate(device.lastActivity)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveDevice(device._id)}
                        disabled={removingDevice === device._id}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Remove device"
                      >
                        {removingDevice === device._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {devices.length > 1 && (
              <div className="flex justify-end pt-2 border-t border-border">
                <button
                  onClick={handleRemoveAllDevices}
                  disabled={removingAll}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {removingAll ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  Logout from all other devices
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
