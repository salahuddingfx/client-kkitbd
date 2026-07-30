import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Expert Team",
  description:
    "Meet the visionary leaders, senior instructors, and domain experts behind KKIT.",
  alternates: {
    canonical: "https://kkitbd.com/team",
  },
  openGraph: {
    title: "Meet Our Expert Team | KKIT",
    description:
      "Meet the visionary leaders, senior instructors, and domain experts behind KKIT.",
    url: "https://kkitbd.com/team",
    siteName: "KKIT",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
