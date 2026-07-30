import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Team & Software Developers",
  description:
    "Meet the software engineers, full-stack developers, and DevOps leads crafting technology solutions at KKIT.",
  alternates: {
    canonical: "https://kkitbd.com/developers",
  },
  openGraph: {
    title: "Engineering Team & Software Developers | KKIT",
    description:
      "Meet the software engineers, full-stack developers, and DevOps leads crafting technology solutions at KKIT.",
    url: "https://kkitbd.com/developers",
    siteName: "KKIT",
  },
};

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
