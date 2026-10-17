import "core-js/stable";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Providers from "@/components/providers";
import { CookieConsentProvider } from "@/components/common/CookieConsentProvider";
import { SecurityWrapper } from "@/components/common/SecurityWrapper";
import { VisitorTracker } from "@/components/common/VisitorTracker";
import { PreloaderWrapper } from "@/components/ui/preloader-wrapper";
import { ConditionalScripts } from "@/components/common/ConditionalScripts";
import { CookieConsent } from "@/components/common/CookieConsent";
import { AppRoutes } from "./AppRoutes";
import "./app/globals.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Providers>
          <CookieConsentProvider>
            <SecurityWrapper>
              <Suspense fallback={null}>
                <VisitorTracker />
              </Suspense>
              <PreloaderWrapper />
              <ConditionalScripts />
              <AppRoutes />
              <CookieConsent />
            </SecurityWrapper>
          </CookieConsentProvider>
        </Providers>
      </BrowserRouter>
    </React.StrictMode>
  );
}
