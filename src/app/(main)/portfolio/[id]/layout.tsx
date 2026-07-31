import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, { cache: "no-store" });
    const json = await res.json();
    const project = json.data;

    if (!project) {
      return {
        title: "Case Study & Portfolio | KKIT",
        description: "Discover KKIT's custom software engineering and enterprise digital solutions.",
      };
    }

    const title = `${project.title} - Case Study | KKIT Portfolio`;
    const description = project.summary || project.description || "Explore project deliverables, architecture, and client results.";
    const imageUrl = project.image || project.thumbnail || "https://kkitbd.com/og-image.png";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://kkitbd.com/portfolio/${id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: project.title,
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
      title: "Case Study & Portfolio | KKIT",
      description: "Discover KKIT's custom software engineering and enterprise digital solutions.",
    };
  }
}

export default function PortfolioLayout({ children }: Props) {
  return <>{children}</>;
}
