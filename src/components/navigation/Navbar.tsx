"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";
import { Button } from "@/components/ui";
import { Container } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMobileMenu, closeMobileMenu } from "@/redux/slices/uiSlice";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
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

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Right — Tablet: Theme toggle + Hamburger (md to lg) */}
          <div className="flex lg:hidden items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="relative"
            >
              <Menu
                className={cn(
                  "h-5 w-5 absolute transition-all duration-200",
                  isMobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                className={cn(
                  "h-5 w-5 absolute transition-all duration-200",
                  isMobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )}
              />
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
