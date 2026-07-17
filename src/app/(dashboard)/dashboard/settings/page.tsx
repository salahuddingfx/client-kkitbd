"use client";

import { useState } from "react";
import { Lock, Bell, Sun, Moon, Save, Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn } from "@/utils";
import { useAppSelector } from "@/redux/hooks";
import { authApi } from "@/services/api";
import { toast } from "sonner";

export default function SettingsPage() {
  const { token } = useAppSelector((state) => state.auth);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
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
      const res = await authApi.changePassword(
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        token
      );
      if (res.success) {
        toast.success("Password updated successfully!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update password.");
    } finally {
      setUpdatingPassword(false);
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
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                <Save className="h-4 w-4" />
                Save Preferences
              </button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
