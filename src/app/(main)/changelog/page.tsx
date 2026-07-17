"use client";

import { Breadcrumb, Container } from "@/components/common";
import { ChangelogPage } from "@/components/common/ChangelogPage";

export default function Changelog() {
  return (
    <div className="pt-12 sm:pt-20">
      <Container>
        <Breadcrumb
          items={[
            { label: "Changelog" },
          ]}
          className="justify-center mt-6"
        />
      </Container>
      <ChangelogPage />
    </div>
  );
}
