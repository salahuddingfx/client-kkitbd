import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Developer Resources, Roadmaps & Starter Kits",
  description:
    "Explore free developer cheat sheets, software engineering roadmaps, full-stack starter kits, and open-source learning tools from KKIT.",
  alternates: {
    canonical: "https://kkitbd.com/resources",
  },
  openGraph: {
    title: "Free Developer Resources, Roadmaps & Starter Kits | KKIT",
    description:
      "Explore free developer cheat sheets, software engineering roadmaps, full-stack starter kits, and open-source learning tools from KKIT.",
    url: "https://kkitbd.com/resources",
    siteName: "KKIT",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
