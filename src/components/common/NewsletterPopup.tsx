"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, Sparkles, Send } from "lucide-react";
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

    // Non-intrusive timer: show floating card after 12 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 12000);

    return () => clearTimeout(timer);
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
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="fixed bottom-6 left-6 z-40 w-80 sm:w-88 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-4 ring-1 ring-primary/10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors z-10"
            aria-label="Dismiss newsletter"
          >
            <X className="h-4 w-4" />
          </button>

          {submitted ? (
            <div className="flex items-center gap-3 py-1">
              <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">You're Subscribed!</p>
                <p className="text-[11px] text-muted-foreground">Thank you for joining KKIT.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 pr-6">
                <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Stay in the Loop</h4>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    Get special offers & new course updates.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-1.5 pt-0.5">
                <div className="relative flex-1">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className="w-full h-8 pl-8 pr-2 rounded-lg border border-border bg-background text-[11px] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-8 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-[11px] transition-colors flex items-center justify-center gap-1 shrink-0"
                >
                  {loading ? (
                    <span className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Join</span>
                      <Send className="h-3 w-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
