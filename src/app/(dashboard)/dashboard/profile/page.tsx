"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, Save, User, Mail, Phone, MapPin, Globe, Loader2 } from "lucide-react";
import { socialIcons } from "@/lib/icons";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { getInitials, getImageUrl } from "@/utils";
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
    designation: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      website: "",
    },
  });

  useEffect(() => {
    authApi.getMe()
      .then((res: any) => {
        if (res.success && res.data) {
          const u = res.data as any;
          setUserProfile(u);
          
          const parsedLocation =
            typeof u.address === "object" && u.address !== null
              ? u.address.city || u.address.street || u.address.country || ""
              : typeof u.address === "string"
              ? u.address
              : "";

          setForm({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            bio: u.bio || "",
            location: parsedLocation,
            designation: u.designation || "",
            socialLinks: {
              github: u.socialLinks?.github || "",
              linkedin: u.socialLinks?.linkedin || "",
              twitter: u.socialLinks?.twitter || "",
              facebook: u.socialLinks?.facebook || "",
              website: u.socialLinks?.website || u.website || "",
            },
          });
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Failed to load profile details.");
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
        designation: form.designation,
        address: typeof userProfile?.address === "object" && userProfile.address !== null
          ? { ...userProfile.address, city: form.location }
          : form.location,
        socialLinks: form.socialLinks,
      };
      const res: any = await userApi.update(userProfile._id, updateData);
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
      const uploadRes: any = await uploadApi.single(file, "users");
      if (uploadRes.success && uploadRes.data) {
        const relativePath = uploadRes.data.path || `/uploads/users/${uploadRes.data.filename}`;
        const avatarUrl = getImageUrl(relativePath);
        const res: any = await userApi.update(userProfile._id, {
          avatar: { url: relativePath, publicId: uploadRes.data.filename || "" },
        } as any);
        if (res.success) {
          setUserProfile((prev: any) =>
            prev ? { ...prev, avatar: { url: relativePath, publicId: uploadRes.data.filename || "" } } : prev
          );
          if (authUser) {
            dispatch(setUser({ ...authUser, avatar: relativePath }));
          }
          toast.success("Profile picture updated!");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const rawAvatar = userProfile?.avatar || userProfile?.avatar;
  const avatarPath = typeof rawAvatar === "string"
    ? rawAvatar
    : (rawAvatar?.url || rawAvatar?.path || "");
  const avatarDisplayUrl = avatarPath ? getImageUrl(avatarPath) : "";

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = userProfile;

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
                  {avatarDisplayUrl ? (
                    <img
                      src={avatarDisplayUrl}
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
                  title="Upload profile picture"
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
                  Member since {new Date(user.createdAt || user.joinedAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Personal Info Form */}
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Designation / Role Title
                </label>
                <input
                  type="text"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  placeholder="e.g. Full Stack Software Engineer"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <h4 className="text-sm font-semibold text-foreground pt-2">Social & Portfolio Links</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <socialIcons.github.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={form.socialLinks.github}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: { ...form.socialLinks, github: e.target.value },
                      })
                    }
                    placeholder="https://github.com/username"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <socialIcons.linkedin.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={form.socialLinks.linkedin}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: { ...form.socialLinks, linkedin: e.target.value },
                      })
                    }
                    placeholder="https://linkedin.com/in/username"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <socialIcons.twitter.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    value={form.socialLinks.twitter}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: { ...form.socialLinks, twitter: e.target.value },
                      })
                    }
                    placeholder="https://twitter.com/username"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <socialIcons.facebook.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={form.socialLinks.facebook}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: { ...form.socialLinks, facebook: e.target.value },
                      })
                    }
                    placeholder="https://facebook.com/username"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <socialIcons.globe.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  Portfolio / Personal Website
                </label>
                <input
                  type="url"
                  value={form.socialLinks.website}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      socialLinks: { ...form.socialLinks, website: e.target.value },
                    })
                  }
                  placeholder="https://yourportfolio.com"
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
