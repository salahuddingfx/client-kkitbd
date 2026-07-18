"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Save, User, Mail, Phone, MapPin, Globe, Loader2 } from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { getInitials } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authApi, userApi, uploadApi } from "@/services/api";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/authSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);
  
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    authApi.getMe()
      .then((res) => {
        if (res.success) {
          const u = res.data as any;
          setUserProfile(u);
          setForm({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            bio: u.bio || "",
            location: u.address?.city || "",
            website: u.socialLinks?.github || "",
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        toast.error(err.message || "Failed to load profile data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile?._id) return;
    setSaving(true);
    try {
      const updateData = {
        name: form.name,
        phone: form.phone,
        bio: form.bio,
        address: {
          city: form.location,
        },
        socialLinks: {
          github: form.website,
        }
      };
      const res = await userApi.update(userProfile._id, updateData);
      if (res.success) {
        toast.success("Profile updated successfully!");
        if (authUser) {
          dispatch(setUser({ ...authUser, name: form.name }));
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile?._id) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploadingAvatar(true);
    try {
      const uploadRes = await uploadApi.single(file);
      if (uploadRes.success && uploadRes.data) {
        const res = await userApi.update(userProfile._id, {
          avatar: { url: uploadRes.data.url, publicId: uploadRes.data.publicId },
        } as any);
        if (res.success) {
          setUserProfile((prev: any) => prev ? { ...prev, avatar: { url: uploadRes.data.url, publicId: uploadRes.data.publicId } } : prev);
          toast.success("Profile picture updated!");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image.");
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const user = userProfile;

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Avatar skeleton card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <Skeleton className="h-16 w-16 sm:h-24 sm:w-24 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form skeleton card */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <Skeleton className="h-5 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
            <div className="flex justify-end pt-2">
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information.</p>
      </div>

      {/* Avatar */}
      <FadeIn>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="relative">
                <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-muted overflow-hidden ring-4 ring-primary/20">
                  {user.avatar ? (
                    <img
                      src={typeof user.avatar === "string" ? user.avatar : user.avatar.url}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/10">
                      <span className="text-2xl font-bold text-primary">{getInitials(user.name)}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {uploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since {new Date(user.createdAt || user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Personal Info */}
      <FadeIn delay={0.1}>
        <Card>
          <form onSubmit={handleSave}>
            <CardContent className="p-6 space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={form.email}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background/50 text-sm outline-none text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Optional"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Optional"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Website
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground text-right">{form.bio.length}/500</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Changes
                </button>
              </div>
            </CardContent>
          </form>
        </Card>
      </FadeIn>
    </div>
  );
}
