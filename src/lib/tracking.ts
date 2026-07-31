"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * GA4 Client-Side Event Tracker
 */

export const getGA4Id = (): string => {
  return process.env.NEXT_PUBLIC_GA4_ID || "G-DEMO123456";
};

// Generic GA4 event dispatcher
export const trackGA4Event = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;

  // 1. Push to dataLayer for GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  // 2. Direct gtag dispatch if initialized
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[GA4 Client Event] ${eventName}:`, params);
  }
};

// Standard GA4 PageView
export const trackGA4PageView = (url: string, title?: string) => {
  trackGA4Event("page_view", {
    page_location: url,
    page_title: title || (typeof document !== "undefined" ? document.title : ""),
  });
};

// Standard GA4 View Item (Course / Service View)
export const trackGA4ViewItem = (item: {
  id: string;
  name: string;
  category?: string;
  price?: number;
  currency?: string;
}) => {
  trackGA4Event("view_item", {
    currency: item.currency || "BDT",
    value: item.price || 0,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || "Course",
        price: item.price || 0,
      },
    ],
  });
};

// Standard GA4 Begin Checkout
export const trackGA4BeginCheckout = (data: {
  id: string;
  name: string;
  value: number;
  currency?: string;
}) => {
  trackGA4Event("begin_checkout", {
    currency: data.currency || "BDT",
    value: data.value,
    items: [
      {
        item_id: data.id,
        item_name: data.name,
        price: data.value,
      },
    ],
  });
};

// Standard GA4 Purchase (Order / Payment submitted)
export const trackGA4Purchase = (purchase: {
  transaction_id: string;
  value: number;
  currency?: string;
  item_id: string;
  item_name: string;
  coupon?: string;
}) => {
  trackGA4Event("purchase", {
    transaction_id: purchase.transaction_id,
    value: purchase.value,
    currency: purchase.currency || "BDT",
    coupon: purchase.coupon || "",
    items: [
      {
        item_id: purchase.item_id,
        item_name: purchase.item_name,
        price: purchase.value,
      },
    ],
  });
};

// Standard GA4 Lead (Contact, Job App, Download Request)
export const trackGA4Lead = (lead: {
  lead_type: "contact_form" | "job_application" | "download_request" | "newsletter";
  lead_name?: string;
  value?: number;
}) => {
  trackGA4Event("generate_lead", {
    lead_type: lead.lead_type,
    lead_name: lead.lead_name || "",
    value: lead.value || 0,
    currency: "BDT",
  });
};

// Standard GA4 Sign Up
export const trackGA4SignUp = (method: string = "email_otp") => {
  trackGA4Event("sign_up", {
    method,
  });
};
