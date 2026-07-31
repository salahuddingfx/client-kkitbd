import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/courses/${id}`, { cache: "no-store" });
    const json = await res.json();
    const course = json.data;

    if (!course) {
      return {
        title: "Course Details | KKIT",
        description: "Explore industry-leading technology and programming courses at KKIT.",
      };
    }

    const title = `${course.title} | KKIT`;
    const description = course.description || "Master cutting-edge tech skills with expert-led training at KKIT.";
    const imageUrl = course.thumbnail || "https://kkitbd.com/og-image.png";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://kkitbd.com/courses/${id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: course.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Course Details | KKIT",
      description: "Explore industry-leading technology and programming courses at KKIT.",
    };
  }
}

export default function CourseLayout({ children }: Props) {
  return <>{children}</>;
}
