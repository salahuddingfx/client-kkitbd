import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Have questions about our tech courses or custom software development services? Reach out to the KKIT team today.",
  alternates: {
    canonical: "https://kkitbd.com/contact",
  },
  openGraph: {
    title: "Contact Us — Get in Touch | KKIT",
    description:
      "Have questions about our tech courses or custom software development services? Reach out to the KKIT team today.",
    url: "https://kkitbd.com/contact",
    siteName: "KKIT",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
