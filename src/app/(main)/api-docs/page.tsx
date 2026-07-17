"use client";

import { Breadcrumb } from "@/components/common";
import { ApiDocsSection } from "@/components/common/ApiDocs";

export default function ApiDocsPage() {
  return (
    <div className="pt-12 sm:pt-20">
      <Breadcrumb
        items={[
          { label: "API Documentation" },
        ]}
      />
      <ApiDocsSection />
    </div>
  );
}
