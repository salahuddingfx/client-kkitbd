"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, X, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { GlowCard } from "@/components/ui";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "cookie-consent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const categories = [
  {
    key: "essential" as const,
    label: "Essential",
    description: "Required for the website to function properly. Cannot be disabled.",
    required: true,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    description: "Help us understand how visitors interact with our website.",
    required: false,
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description: "Used to deliver personalized advertisements and track campaign performance.",
    required: false,
  },
  {
    key: "preferences" as const,
    label: "Preferences",
    description: "Remember your settings like language, theme, and region.",
    required: false,
  },
];

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const save = (preferences: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    setVisible(false);
    setShowCustomize(false);
  };

  const acceptAll = () => {
    save({ essential: true, analytics: true, marketing: true, preferences: true });
  };

  const rejectAll = () => {
    save({ essential: true, analytics: false, marketing: false, preferences: false });
  };

  const saveCustom = () => {
    save({ ...prefs, essential: true });
  };

  const togglePref = (key: keyof CookiePreferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          {showCustomize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[9998]"
              onClick={() => setShowCustomize(false)}
            />
          )}

          {/* Modal / Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed z-[9999] bg-background border border-border shadow-2xl",
              showCustomize
                ? "bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-lg md:bottom-8 rounded-2xl"
                : "bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:max-w-md md:rounded-2xl rounded-t-2xl md:rounded-t-none"
            )}
          >
            <GlowCard variant="neu" className={cn("border-0 shadow-none", showCustomize ? "rounded-2xl" : "rounded-t-2xl md:rounded-2xl")}>
              <div className="p-5 md:p-6">
                {!showCustomize ? (
                  /* ---- Default Banner ---- */
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Cookie className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">We value your privacy</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We use cookies to enhance your experience, analyze site traffic, and personalize content. You choose what&apos;s best for you.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      <Button size="sm" onClick={acceptAll} className="flex-1 min-w-[100px]">
                        <Check className="h-4 w-4 mr-1" />
                        Accept All
                      </Button>
                      <Button size="sm" variant="outline" onClick={rejectAll} className="flex-1 min-w-[100px]">
                        Reject All
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowCustomize(true)}
                        className="flex-1 min-w-[100px] text-primary hover:text-primary"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Customize
                      </Button>
                    </div>
                  </>
                ) : (
                  /* ---- Customize Panel ---- */
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Settings className="h-4 w-4 text-primary" />
                        Cookie Preferences
                      </h3>
                      <button
                        onClick={() => setShowCustomize(false)}
                        className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {categories.map((cat) => (
                        <div
                          key={cat.key}
                          className="flex items-start justify-between gap-4 p-3 rounded-xl bg-background-secondary border border-border"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-foreground">{cat.label}</span>
                              {cat.required && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {cat.description}
                            </p>
                          </div>
                          <button
                            onClick={() => !cat.required && togglePref(cat.key)}
                            disabled={cat.required}
                            className={cn(
                              "relative w-10 h-6 rounded-full transition-colors shrink-0 mt-0.5",
                              prefs[cat.key] ? "bg-primary" : "bg-border",
                              cat.required && "opacity-60 cursor-not-allowed"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                                prefs[cat.key] && "translate-x-4"
                              )}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-5">
                      <Button size="sm" onClick={saveCustom} className="flex-1">
                        Save Preferences
                      </Button>
                      <Button size="sm" variant="outline" onClick={acceptAll} className="flex-1">
                        Accept All
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </GlowCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
