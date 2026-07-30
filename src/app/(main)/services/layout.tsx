import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Solutions & Software Engineering Services",
  description:
    "Scale your business with high-performance web applications, mobile apps, DevOps pipelines, and UI/UX design services from KKIT.",
  alternates: {
    canonical: "https://kkitbd.com/services",
  },
  openGraph: {
    title: "Digital Solutions & Software Engineering Services | KKIT",
    description:
      "Scale your business with high-performance web applications, mobile apps, DevOps pipelines, and UI/UX design services from KKIT.",
    url: "https://kkitbd.com/services",
    siteName: "KKIT",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
