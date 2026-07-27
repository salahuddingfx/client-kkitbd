"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  Trophy,
  Heart,
  User,
  Settings,
  BookOpen,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { Button } from "@/components/ui";
import { Container } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMobileMenu, closeMobileMenu } from "@/redux/slices/uiSlice";
import { authApi, leaderboardApi, siteSettingsApi } from "@/services/api";
import { setUser, logout } from "@/redux/slices/authSlice";
import { getInitials, getImageUrl } from "@/utils";

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("relative", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const { user: authUser, isAuthenticated } = useAppSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [showOffers, setShowOffers] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    siteSettingsApi.getPublic(["show_offers_banner"])
      .then((res) => {
        if (res.success && res.data) setShowOffers(!!(res.data as any).show_offers_banner);
      })
      .catch(() => {});
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
        }
      })
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      leaderboardApi.getMyStats()
        .then((res) => {
          if (res.success && res.data) {
            setUserRank((res.data as any).rank);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    dispatch(logout());
    setUserRank(null);
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(closeMobileMenu());
    setIsUserMenuOpen(false);
  }, [pathname, dispatch]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleBackdropClick = useCallback(() => {
    dispatch(closeMobileMenu());
  }, [dispatch]);

  const avatarUrl = authUser?.avatar ? getImageUrl(authUser.avatar) : "";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-2">
          {/* Left — Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              KKIT
            </span>
          </Link>

          {/* Center — Empty (pushes links right on lg+) */}
          <div className="hidden lg:block flex-1" />

          {/* Right — Desktop Links + Actions (lg+) */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-5 bg-border" />

            <ThemeToggle />

            {isAuthenticated && authUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-muted/60 transition-all border border-transparent hover:border-border cursor-pointer focus:outline-none"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all shrink-0">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={authUser.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs font-bold text-primary">
                        {getInitials(authUser.name)}
                      </div>
                    )}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <div className="text-sm font-semibold text-foreground leading-tight flex items-center gap-1">
                      <span>{authUser.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                          isUserMenuOpen && "rotate-180"
                        )}
                      />
                    </div>
                    {userRank && (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-yellow-600 dark:text-yellow-400 mt-0.5">
                        <Trophy className="h-3 w-3" />
                        Rank #{userRank}
                      </div>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 rounded-2xl border border-border bg-background/95 backdrop-blur-md p-2 shadow-2xl z-50"
                    >
                      <div className="px-3 py-2.5 border-b border-border/60 mb-1">
                        <p className="text-sm font-bold text-foreground truncate">{authUser.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{authUser.email}</p>
                        {userRank && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1.5 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                            <Trophy className="h-3 w-3" /> Rank #{userRank}
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-foreground"
                        >
                          <LayoutDashboard className="h-4 w-4 text-primary" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/dashboard/courses"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
                        >
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>My Courses</span>
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
                        >
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <span>Settings</span>
                        </Link>
                      </div>

                      <div className="my-1 border-t border-border/60" />

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Right — Tablet: Theme toggle + Offer + Hamburger (md to lg) */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </Button>
          </div>
        </nav>
      </Container>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-black/50 lg:hidden"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background lg:hidden"
          >
            <Container className="py-4 sm:py-6">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary -mx-4 px-4 py-3 rounded-lg hover:bg-muted/50",
                      pathname === link.href
                        ? "text-primary bg-muted/50"
                        : "text-foreground/70"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="my-4 h-px bg-border" />

                {isAuthenticated && authUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 overflow-hidden ring-2 ring-primary/20 shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={authUser.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-sm font-bold text-primary">
                            {getInitials(authUser.name)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{authUser.name}</div>
                        {userRank && (
                          <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                            <Trophy className="h-3 w-3" />
                            Rank #{userRank}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" asChild className="w-full justify-start">
                      <Link href="/dashboard">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link href="/dashboard/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
