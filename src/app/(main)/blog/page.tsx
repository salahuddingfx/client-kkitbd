"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Input } from "@/components/ui";
import { Breadcrumb, Pagination, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development in 2024",
    excerpt: "Explore the latest trends and technologies shaping the future of web development.",
    author: "John Doe",
    category: "Technology",
    publishedAt: "2024-01-15",
    readingTime: "5 min read",
    image: "/blog/web-dev.jpg",
  },
  {
    id: "2",
    title: "Why React is Still the Best Choice",
    excerpt: "A comprehensive look at why React continues to dominate the frontend ecosystem.",
    author: "Jane Smith",
    category: "React",
    publishedAt: "2024-01-10",
    readingTime: "7 min read",
    image: "/blog/react.jpg",
  },
  {
    id: "3",
    title: "Building Scalable Applications with Next.js",
    excerpt: "Learn how to build production-ready applications with Next.js.",
    author: "Mike Johnson",
    category: "Next.js",
    publishedAt: "2024-01-05",
    readingTime: "10 min read",
    image: "/blog/nextjs.jpg",
  },
  {
    id: "4",
    title: "UI/UX Design Principles Every Developer Should Know",
    excerpt: "Essential design principles that will improve your applications.",
    author: "Sarah Williams",
    category: "Design",
    publishedAt: "2024-01-01",
    readingTime: "6 min read",
    image: "/blog/design.jpg",
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Latest Insights & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest trends, tips, and insights in technology and education.
            </p>
            <Breadcrumb items={[{ label: "Blog" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <FadeIn key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.id}`}>
                  <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <span className="text-sm font-medium text-primary group-hover:gap-2 transition-all inline-flex items-center">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No articles found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search query.
              </p>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
