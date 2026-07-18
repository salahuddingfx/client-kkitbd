"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const CONSENT_KEY = "kkit_cookie_consent";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  updatePreferences: (prefs: CookiePreferences) => void;
  resetConsent: () => void;
}

const defaultPrefs: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const CookieConsentContext = createContext<CookieConsentContextType>({
  preferences: defaultPrefs,
  hasConsented: false,
  updatePreferences: () => {},
  resetConsent: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPrefs);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPrefs, ...parsed });
        setHasConsented(true);
      } catch {
        setHasConsented(false);
      }
    }
  }, []);

  // Listen for storage changes (from CookieConsent banner in another tab/component)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setPreferences({ ...defaultPrefs, ...parsed });
          setHasConsented(true);
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updatePreferences = useCallback((prefs: CookiePreferences) => {
    setPreferences(prefs);
    setHasConsented(true);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  }, []);

  const resetConsent = useCallback(() => {
    setPreferences(defaultPrefs);
    setHasConsented(false);
    localStorage.removeItem(CONSENT_KEY);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ preferences, hasConsented, updatePreferences, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}
