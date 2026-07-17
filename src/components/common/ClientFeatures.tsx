"use client";

import { ScrollProgress } from "@/components/common/ScrollProgress";
import { BackToTop } from "@/components/common/BackToTop";
import { LiveChat } from "@/components/common/LiveChat";
import { NewsletterPopup } from "@/components/common/NewsletterPopup";
import { EnrollmentNotification } from "@/components/common/EnrollmentNotification";

export function ClientFeatures() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <EnrollmentNotification />
      <NewsletterPopup />
      <LiveChat />
    </>
  );
}
