import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Tech Courses & Bootcamps",
  description:
    "Master Full-Stack Web Development, Mobile Apps, Data Science, and UI/UX Design with hands-on, project-based courses at KKIT.",
  alternates: {
    canonical: "https://kkitbd.com/courses",
  },
  openGraph: {
    title: "Professional Tech Courses & Bootcamps | KKIT",
    description:
      "Master Full-Stack Web Development, Mobile Apps, Data Science, and UI/UX Design with hands-on, project-based courses at KKIT.",
    url: "https://kkitbd.com/courses",
    siteName: "KKIT",
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
