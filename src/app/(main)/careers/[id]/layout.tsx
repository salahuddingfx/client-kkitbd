import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/careers/${id}`, { cache: "no-store" });
    const json = await res.json();
    const job = json.data;

    if (!job) {
      return {
        title: "Career Openings | Join the KKIT Team",
        description: "Explore career opportunities, engineering roles, and job openings at KKIT.",
      };
    }

    const title = `${job.title} (${job.department || "Engineering"}) | KKIT Careers`;
    const description = job.description?.substring(0, 160) || "Join KKIT and build scalable digital solutions with cutting-edge tech.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://kkitbd.com/careers/${id}`,
        images: [
          {
            url: "https://kkitbd.com/og-image.png",
            width: 1200,
            height: 630,
            alt: job.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Career Openings | Join the KKIT Team",
      description: "Explore career opportunities, engineering roles, and job openings at KKIT.",
    };
  }
}

export default function CareerLayout({ children }: Props) {
  return <>{children}</>;
}
