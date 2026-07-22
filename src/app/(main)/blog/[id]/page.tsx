"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, User, Loader2 } from "lucide-react";
import { Badge, Button, Card, CardContent, Skeleton } from "@/components/ui";
import { Breadcrumb, Container, ShareButtons } from "@/components/common";
import { ScrollReveal } from "@/components/animations";
import { blogApi } from "@/services/api";

interface BlogPostDetail {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: { name: string };
  category?: string;
  publishedAt?: string;
  createdAt: string;
  readingTime?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slugOrId = params.id as string;
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await blogApi.getBySlug(slugOrId);
        setPost((res.data as BlogPostDetail) || null);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    if (slugOrId) fetchPost();
  }, [slugOrId]);

  if (loading) {
    return (
      <div className="pt-12 sm:pt-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8 py-12">
            <Skeleton className="h-4 w-40" />
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-7 w-2/3" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-72 w-full rounded-2xl" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-12 sm:pt-20">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-12 sm:pt-20">
      <Container>
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
          className="py-6"
        />

        <ScrollReveal direction="up">
          <article className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category && <Badge variant="secondary">{post.category}</Badge>}
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
              )}
              {post.author && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  {post.author.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
              {post.title}
            </h1>

            <ShareButtons title={post.title} className="mb-8" />

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-semibold text-foreground mt-6 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  const items = paragraph.split("\n");
                  return (
                    <ol key={i} className="list-decimal list-inside space-y-2 mb-4">
                      {items.map((item, j) => (
                        <li key={j} className="text-muted-foreground">{item.replace(/^\d+\.\s*/, "")}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </article>
        </ScrollReveal>
      </Container>
    </div>
  );
}
