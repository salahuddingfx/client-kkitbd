"use client";

import { useEffect } from "react";

const TAWK_PROPERTY_ID = "YOUR_TAWK_PROPERTY_ID";
const TAWK_WIDGET_ID = "YOUR_TAWK_WIDGET_ID";

export function LiveChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector(`script[src*="tawk.to"]`);
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
