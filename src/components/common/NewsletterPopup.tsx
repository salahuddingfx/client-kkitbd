"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import api from "@/lib/api";

const NEWSLETTER_KEY = "newsletter-dismissed";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(NEWSLETTER_KEY, "true");
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(NEWSLETTER_KEY);
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      setSubmitted(true);
      localStorage.setItem(NEWSLETTER_KEY, "true");
      setTimeout(() => handleDismiss(), 2500);
    } catch {
      setSubmitted(true);
      localStorage.setItem(NEWSLETTER_KEY, "true");
      setTimeout(() => handleDismiss(), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-background border border-border rounded-3xl shadow-2xl overflow-hidden">
              {/* Decorative top bar */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                /* Success state */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">You're In!</h3>
                  <p className="text-muted-foreground">Welcome to the KKIT community. Check your inbox for a welcome email.</p>
                </div>
              ) : (
                /* Form state */
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Stay in the Loop
                    </h3>
                    <p className="text-muted-foreground">
                      Get exclusive offers, new courses, and tech insights delivered to your inbox. No spam, ever.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Subscribing...
                        </span>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Join 10,000+ learners. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
