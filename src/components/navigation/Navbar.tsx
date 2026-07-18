"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { Button } from "@/components/ui";
import { Container } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMobileMenu, closeMobileMenu } from "@/redux/slices/uiSlice";

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
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(closeMobileMenu());
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

            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Right — Tablet: Theme toggle + Hamburger (md to lg) */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />

            {/* Hamburger — lines morph into X */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="relative"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line
                  x1="3" y1="6" x2="21" y2="6"
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    transform: isMobileMenuOpen ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0deg)",
                    transformOrigin: "center",
                  }}
                />
                <line
                  x1="7" y1="12" x2="17" y2="12"
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    transform: isMobileMenuOpen ? "scaleX(0)" : "scaleX(1)",
                    transformOrigin: "center",
                  }}
                />
                <line
                  x1="3" y1="18" x2="21" y2="18"
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    transform: isMobileMenuOpen ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
                    transformOrigin: "center",
                  }}
                />
              </svg>
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

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button variant="outline" asChild className="w-full sm:w-auto">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
