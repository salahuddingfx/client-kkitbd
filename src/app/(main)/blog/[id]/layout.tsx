import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, { cache: "no-store" });
    const json = await res.json();
    const blog = json.data;

    if (!blog) {
      return {
        title: "Blog Article | KKIT Tech Blog",
        description: "Read latest technology insights, tutorials, and career guides from KKIT.",
      };
    }

    const title = `${blog.title} | KKIT Blog`;
    const description = blog.excerpt || blog.summary || "Tech articles, insights, and tutorials from KKIT.";
    const imageUrl = blog.coverImage || blog.thumbnail || "https://kkitbd.com/og-image.png";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://kkitbd.com/blog/${id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
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
      title: "Blog Article | KKIT Tech Blog",
      description: "Read latest technology insights, tutorials, and career guides from KKIT.",
    };
  }
}

export default function BlogLayout({ children }: Props) {
  return <>{children}</>;
}
