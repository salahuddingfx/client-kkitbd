"use client";

import { Breadcrumb } from "@/components/common";
import { ChangelogPage } from "@/components/common/ChangelogPage";

export default function Changelog() {
  return (
    <div className="pt-12 sm:pt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Changelog", href: "/changelog" },
        ]}
      />
      <ChangelogPage />
    </div>
  );
}
