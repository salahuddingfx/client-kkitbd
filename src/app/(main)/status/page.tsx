"use client";

import { Breadcrumb } from "@/components/common";
import { StatusPage } from "@/components/common/StatusPage";

export default function Status() {
  return (
    <div className="pt-12 sm:pt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Status", href: "/status" },
        ]}
      />
      <StatusPage />
    </div>
  );
}
