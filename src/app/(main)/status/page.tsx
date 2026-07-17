"use client";

import { Breadcrumb, Container } from "@/components/common";
import { StatusPage } from "@/components/common/StatusPage";

export default function Status() {
  return (
    <div className="pt-12 sm:pt-20">
      <Container>
        <Breadcrumb
          items={[
            { label: "Status" },
          ]}
          className="justify-center mt-6"
        />
      </Container>
      <StatusPage />
    </div>
  );
}
