"use client";

import { useEffect } from "react";
import { useCookieConsent } from "./CookieConsentProvider";
import Script from "next/script";

export function ConditionalScripts() {
  const { preferences } = useCookieConsent();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      } else {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
    }
  }, []);

  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID || "G-DEMO123456";

  return (
    <>
      {/* Google Analytics 4 — Active */}
      {preferences.analytics && ga4Id && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}

