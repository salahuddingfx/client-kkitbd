"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { Breadcrumb, Container, ShareButtons } from "@/components/common";
import { ScrollReveal } from "@/components/animations";

const posts = [
  {
    id: "1",
    title: "The Future of Web Development in 2024",
    author: "John Doe",
    category: "Technology",
    publishedAt: "2024-01-15",
    readingTime: "5 min read",
    content: `The web development landscape is evolving rapidly. With the rise of AI-powered tools, server components, and edge computing, developers need to stay ahead of the curve. In this article, we explore the key trends shaping the future of web development.

## Key Trends

### 1. AI-Assisted Development
Tools like GitHub Copilot and ChatGPT are transforming how we write code. AI is becoming an essential part of the development workflow.

### 2. Server Components
React Server Components and similar patterns are changing how we think about rendering and data fetching.

### 3. Edge Computing
Running code closer to users reduces latency and improves user experience.

## Conclusion
The future of web development is exciting. Stay curious, keep learning, and embrace new technologies.`,
  },
  {
    id: "2",
    title: "Top 10 JavaScript Frameworks to Learn",
    author: "Sarah Smith",
    category: "Programming",
    publishedAt: "2024-01-10",
    readingTime: "8 min read",
    content: `JavaScript frameworks continue to evolve. Here are the top 10 frameworks every developer should learn in 2024.

## The List

1. **React** - The most popular UI library
2. **Next.js** - The React framework for production
3. **Vue.js** - The progressive framework
4. **Svelte** - The compile-time framework
5. **Angular** - The platform for enterprise
6. **Nuxt** - The Vue.js framework
7. **Remix** - The full stack web framework
8. **Astro** - The content-focused framework
9. **SolidJS** - The reactive framework
10. **Qwik** - The resumable framework`,
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const post = posts.find((p) => p.id === params.id);

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
              <Badge variant="secondary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
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
