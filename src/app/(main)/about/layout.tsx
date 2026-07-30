import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Empowering Engineering Excellence",
  description:
    "Learn about KKIT's mission, history, core values, and dedication to delivering top-tier digital education and agency software development.",
  alternates: {
    canonical: "https://kkitbd.com/about",
  },
  openGraph: {
    title: "About Us — Empowering Engineering Excellence | KKIT",
    description:
      "Learn about KKIT's mission, history, core values, and dedication to delivering top-tier digital education and agency software development.",
    url: "https://kkitbd.com/about",
    siteName: "KKIT",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
