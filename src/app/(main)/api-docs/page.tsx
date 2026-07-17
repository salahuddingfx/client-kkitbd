"use client";

import { Breadcrumb, Container } from "@/components/common";
import { ApiDocsSection } from "@/components/common/ApiDocs";

export default function ApiDocsPage() {
  return (
    <div className="pt-12 sm:pt-20">
      <Container>
        <Breadcrumb
          items={[
            { label: "API Documentation" },
          ]}
          className="justify-center mt-6"
        />
      </Container>
      <ApiDocsSection />
    </div>
  );
}
