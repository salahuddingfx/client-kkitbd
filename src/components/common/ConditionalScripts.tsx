"use client";

import { useCookieConsent } from "./CookieConsentProvider";
import Script from "next/script";

export function ConditionalScripts() {
  const { preferences } = useCookieConsent();

  return (
    <>
      {/* Analytics — only loads if user accepted analytics cookies */}
      {preferences.analytics && (
        <>
          {/* Google Analytics Example — replace with your GA ID */}
          {/* <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </Script> */}

          {/* Microsoft Clarity Example */}
          {/* <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window, document, "clarity", "script", "YOUR_CLARITY_ID");`}
          </Script> */}
        </>
      )}

      {/* Marketing — only loads if user accepted marketing cookies */}
      {preferences.marketing && (
        <>
          {/* Facebook Pixel Example — replace with your Pixel ID */}
          {/* <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', 'YOUR_PIXEL_ID');fbq('track', 'PageView');`}
          </Script> */}

          {/* Google Ads Example */}
          {/* <Script id="gads-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-XXXXXXXXX');`}
          </Script> */}
        </>
      )}
    </>
  );
}
