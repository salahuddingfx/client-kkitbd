"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { getInitials } from "@/utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { authApi } from "@/services/api";
import { setUser, logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { label: "Grades", href: "/dashboard/grades", icon: GraduationCap },
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

  useEffect(() => {
    if (!authUser) {
      authApi.getMe()
        .then((res) => {
          if (res.success) {
            const u = res.data as any;
            dispatch(setUser({
              id: u._id,
              name: u.name,
              email: u.email,
              avatar: typeof u.avatar === "string" ? u.avatar : u.avatar?.url
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
    }
  }, [authUser, dispatch, router]);

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
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
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
              <button className="relative p-2 rounded-lg hover:bg-muted">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              </button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
