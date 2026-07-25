"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  User,
  Settings,
  CreditCard,
  Heart,
  Trophy,
  ClipboardList,
  FolderGit2,
  MessageSquare,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
  Search,
  Sun,
  Moon,
  Loader2,
  MessagesSquare,
  Zap,
  GraduationCap,
  Newspaper,
} from "lucide-react";
import { cn, getInitials, getImageUrl } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { authApi, noticesApi } from "@/services/api";
import { setUser, logout } from "@/redux/slices/authSlice";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { label: "Grades", href: "/dashboard/grades", icon: GraduationCap },
  { label: "My Blogs", href: "/dashboard/blogs", icon: Newspaper },
  { label: "Discussions", href: "/discussions", icon: MessagesSquare, external: true },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Achievements", href: "/dashboard/gamification", icon: Zap },
  { label: "Reviews", href: "/dashboard/reviews", icon: MessageSquare },
  { label: "Notices", href: "/dashboard/notices", icon: Bell },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user: authUser } = useAppSelector((state) => state.auth);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    noticesApi.getAll()
      .then((res) => {
        if (res.success && res.data) {
          setNotices(res.data.slice(0, 5));
          setUnreadCount(res.data.filter((n: any) => !n.isRead).length || res.data.length);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    authApi.getMe()
      .then((res) => {
        if (res.success && res.data) {
          const u = res.data as any;
          const userAvatar = typeof u.avatar === "string" ? u.avatar : (u.avatar?.url || u.avatar?.path || "");
          dispatch(setUser({
            id: u._id,
            name: u.name,
            email: u.email,
            avatar: userAvatar,
          }));
        } else {
          dispatch(logout());
          router.push("/login");
        }
      })
      .catch((err) => {
        console.error("Failed to load user profile in layout:", err);
        dispatch(logout());
        router.push("/login");
      });
  }, [dispatch, router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout API errors
    } finally {
      dispatch(logout());
      router.push("/login");
    }
  };

  const user = authUser;

  if (!user) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const avatarSrc = getImageUrl(user.avatar);

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-foreground">KKIT</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive =
                link.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : link.external
                  ? pathname === link.href || pathname.startsWith(link.href + "/")
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                  {isActive && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User card */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarImage src={avatarSrc} alt={user.name} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-transparent text-sm outline-none w-64 placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Functional Notification Bell with Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen((prev) => !prev)}
                  className="relative p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer focus:outline-none"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card animate-pulse" />
                  )}
                </button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-4 shadow-2xl z-50"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-foreground">Notifications</h4>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 rounded-full">
                              {unreadCount} New
                            </span>
                          )}
                        </div>
                        <Link
                          href="/dashboard/notices"
                          onClick={() => setNotifOpen(false)}
                          className="text-xs text-primary font-medium hover:underline"
                        >
                          View all
                        </Link>
                      </div>

                      <div className="py-2 divide-y divide-border/50 max-h-72 overflow-y-auto">
                        {notices.length === 0 ? (
                          <div className="py-6 text-center text-xs text-muted-foreground">
                            No recent notices found.
                          </div>
                        ) : (
                          notices.map((n) => (
                            <div key={n._id} className="py-2.5 px-1 hover:bg-muted/50 rounded-lg transition-colors">
                              <p className="text-xs font-semibold text-foreground leading-snug">{n.title}</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{n.content}</p>
                              <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                                {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : "Recent"}
                              </span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="pt-2 border-t border-border">
                        <Link
                          href="/dashboard/notices"
                          onClick={() => setNotifOpen(false)}
                          className="block text-center w-full py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold transition-colors"
                        >
                          See All Notices & Announcements
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Avatar linking to Profile */}
              <Link href="/dashboard/profile" title="View Profile" className="relative group cursor-pointer">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                  <AvatarImage src={avatarSrc} alt={user.name} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
