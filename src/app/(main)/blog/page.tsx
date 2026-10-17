"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Search,
  ArrowRight,
  Filter,
  Sparkles,
  BookOpen,
  Eye,
  Heart,
  MessageSquare,
  ThumbsUp,
  X,
  Code2,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Globe,
  GraduationCap,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  Badge,
  Button,
  Input,
  Skeleton,
} from "@/components/ui";
import { Container, LavaHero, Pagination } from "@/components/common";
import { blogApi, BlogReactions } from "@/services/api";

interface BlogPost {
  _id: string | number;
  id?: string | number;
  title: string;
  excerpt?: string;
  slug: string;
  author?: {
    name?: string;
    avatar?: string;
    designation?: string;
  } | string;
  category?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  reactions?: BlogReactions;
  comments?: unknown[];
  featured?: boolean | number;
  publishedAt?: string;
  createdAt: string;
  readingTime?: string;
  thumbnail?: string | { url?: string } | null;
}

// Category visual mapping for beautiful tech illustrations
const CATEGORY_STYLES: Record<
  string,
  {
    gradient: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    borderColor: string;
  }
> = {
  Technology: {
    gradient: "from-rose-500/20 via-red-500/10 to-amber-500/20",
    icon: Cpu,
    accentColor: "text-red-500",
    borderColor: "border-red-500/30",
  },
  Programming: {
    gradient: "from-blue-600/20 via-indigo-500/10 to-cyan-400/20",
    icon: Code2,
    accentColor: "text-blue-500",
    borderColor: "border-blue-500/30",
  },
  Career: {
    gradient: "from-purple-600/20 via-pink-500/10 to-rose-400/20",
    icon: TrendingUp,
    accentColor: "text-purple-500",
    borderColor: "border-purple-500/30",
  },
  Freelancing: {
    gradient: "from-emerald-600/20 via-teal-500/10 to-amber-400/20",
    icon: Globe,
    accentColor: "text-emerald-500",
    borderColor: "border-emerald-500/30",
  },
  Education: {
    gradient: "from-amber-500/20 via-orange-500/10 to-red-400/20",
    icon: GraduationCap,
    accentColor: "text-amber-500",
    borderColor: "border-amber-500/30",
  },
  Security: {
    gradient: "from-teal-600/20 via-cyan-500/10 to-blue-500/20",
    icon: ShieldCheck,
    accentColor: "text-teal-500",
    borderColor: "border-teal-500/30",
  },
};

const DEFAULT_STYLE = {
  gradient: "from-primary/20 via-primary/10 to-amber-500/20",
  icon: Layers,
  accentColor: "text-primary",
  borderColor: "border-primary/30",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "liked">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch blogs from API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await blogApi.getAll({ status: "published" });
        setPosts((res.data as BlogPost[]) || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Compute unique categories with counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    posts.forEach((p) => {
      const cat = p.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Filter and Sort
  const filteredAndSortedPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory =
        selectedCategory === "All" || (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "popular") {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === "liked") {
        return (b.likes || 0) - (a.likes || 0);
      }
      // Newest
      return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
    });

    return result;
  }, [posts, searchQuery, selectedCategory, sortBy]);

  // Featured Post (first featured post or first post when on 'All' category and no search)
  const featuredPost = useMemo(() => {
    if (searchQuery.trim() !== "" || selectedCategory !== "All") return null;
    return posts.find((p) => p.featured === true || p.featured === 1) || posts[0] || null;
  }, [posts, searchQuery, selectedCategory]);

  // Grid posts (excluding featured post if spotlight is active)
  const gridPosts = useMemo(() => {
    if (featuredPost && selectedCategory === "All" && !searchQuery.trim()) {
      return filteredAndSortedPosts.filter((p) => (p.slug || p._id) !== (featuredPost.slug || featuredPost._id));
    }
    return filteredAndSortedPosts;
  }, [filteredAndSortedPosts, featuredPost, selectedCategory, searchQuery]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / postsPerPage));
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return gridPosts.slice(startIndex, startIndex + postsPerPage);
  }, [gridPosts, currentPage]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const getAuthorName = (author: BlogPost["author"]): string => {
    if (!author) return "KKIT Team";
    if (typeof author === "string") return author;
    return author.name || "KKIT Team";
  };

  const getReadingTime = (post: BlogPost): string => {
    if (post.readingTime) return post.readingTime;
    const words = (post.excerpt || "").split(/\s+/).length + 450;
    return `${Math.max(2, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Enhanced Lava Ambient Header */}
      <LavaHero
        badge="KKIT Tech Blog"
        title="Latest Insights, Tutorials & Tech Trends"
        description="Deep dives into software engineering, emerging tech ecosystems in Bangladesh, and career roadmaps by industry leaders."
        breadcrumbItems={[{ label: "Blog" }]}
        size="lg"
      />

      {/* Filter, Search & Controls Section */}
      <section className="sticky top-16 z-30 py-4 bg-background/85 backdrop-blur-md border-b border-border/60 transition-all">
        <Container>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Horizontal Scrollable Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {Object.keys(categoriesWithCounts).map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                const count = categoriesWithCounts[cat];

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-background/80 text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9.5 pr-8 h-9 text-xs rounded-full border-border/80 bg-background/90 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-full border border-border/60 text-xs">
                <button
                  type="button"
                  onClick={() => setSortBy("newest")}
                  className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    sortBy === "newest" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Latest
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("popular")}
                  className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    sortBy === "popular" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Popular
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("liked")}
                  className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    sortBy === "liked" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Liked
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Blog Content Section */}
      <section className="py-12 sm:py-16">
        <Container>
          {loading ? (
            /* Loading State Skeleton */
            <div className="space-y-12">
              <div className="p-8 rounded-3xl border border-border/70 bg-card space-y-4">
                <Skeleton className="h-6 w-36 rounded-full" />
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-10 w-32 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="rounded-3xl overflow-hidden border-border/80">
                    <Skeleton className="h-52 w-full" />
                    <CardContent className="p-6 space-y-3">
                      <Skeleton className="h-4 w-20 rounded-full" />
                      <Skeleton className="h-6 w-5/6" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex justify-between items-center pt-4 border-t border-border/40">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Top Featured Spotlight Post (when viewing All with no search) */}
              {featuredPost && (
                <div className="relative group overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/95 to-background shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Visual Art / Cover */}
                    <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-gradient-to-tr from-red-600/25 via-amber-500/15 to-rose-500/20 flex items-center justify-center p-8 overflow-hidden">
                      {/* Abstract Tech Graphic */}
                      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
                      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative z-10 text-center space-y-3">
                        <div className="w-20 h-20 rounded-2xl bg-background/80 backdrop-blur-md border border-border/80 shadow-lg flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform duration-300">
                          <Cpu className="h-10 w-10" />
                        </div>
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary text-white shadow-xs">
                          Spotlight Story
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-3.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Badge variant="secondary" className="px-3 py-1 rounded-full font-semibold text-xs">
                            {featuredPost.category || "Technology"}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {getReadingTime(featuredPost)}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <Link href={`/blog/${featuredPost.slug || featuredPost._id}`}>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {featuredPost.title}
                          </h2>
                        </Link>

                        <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs uppercase">
                            {getAuthorName(featuredPost.author).charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-foreground">
                            {getAuthorName(featuredPost.author)}
                          </span>
                        </div>

                        <Button asChild className="rounded-full px-5 text-xs font-semibold gap-1.5 shadow-sm">
                          <Link href={`/blog/${featuredPost.slug || featuredPost._id}`}>
                            Read Full Article
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filter Status */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>
                  Showing <strong className="text-foreground">{gridPosts.length}</strong> articles
                  {selectedCategory !== "All" && (
                    <span> in <strong className="text-primary">{selectedCategory}</strong></span>
                  )}
                  {searchQuery && (
                    <span> matching &ldquo;<strong className="text-foreground">{searchQuery}</strong>&rdquo;</span>
                  )}
                </span>

                {(selectedCategory !== "All" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* 3-Column Modern Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedPosts.map((post) => {
                  const category = post.category || "Technology";
                  const style = CATEGORY_STYLES[category] || DEFAULT_STYLE;
                  const CategoryIcon = style.icon;

                  return (
                    <article
                      key={post.slug || post._id}
                      className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Consistent Branded Tech Art Card Header */}
                      <Link
                        href={`/blog/${post.slug || post._id}`}
                        className="relative h-52 w-full overflow-hidden flex items-center justify-center bg-gradient-to-tr transition-all"
                        style={{
                          backgroundImage: `linear-gradient(135deg, rgba(220, 38, 38, 0.08), rgba(249, 115, 22, 0.05), rgba(15, 23, 42, 0.04))`,
                        }}
                      >
                        {/* Background tech mesh & glow */}
                        <div className="absolute inset-0 bg-dot-pattern opacity-25" />
                        <div
                          className={`absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-gradient-to-br ${style.gradient} blur-2xl opacity-75 group-hover:scale-125 transition-transform duration-500`}
                        />

                        {/* Center Category Emblem */}
                        <div className="relative z-10 text-center space-y-2">
                          <div className="w-14 h-14 rounded-2xl bg-background/90 backdrop-blur-md border border-border/80 shadow-md flex items-center justify-center mx-auto text-primary group-hover:scale-110 group-hover:border-primary/60 transition-all duration-300">
                            <CategoryIcon className="h-7 w-7" />
                          </div>
                        </div>

                        {/* Floating Category Tag */}
                        <div className="absolute top-3.5 left-3.5 z-20">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background/90 backdrop-blur-md border border-border/70 text-foreground shadow-xs">
                            {category}
                          </span>
                        </div>

                        {/* Floating Reading Time */}
                        <div className="absolute top-3.5 right-3.5 z-20">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 backdrop-blur-md text-muted-foreground border border-border/50 flex items-center gap-1 shadow-xs">
                            <Clock className="h-3 w-3 text-primary" />
                            {getReadingTime(post)}
                          </span>
                        </div>
                      </Link>

                      {/* Card Content */}
                      <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <Link href={`/blog/${post.slug || post._id}`}>
                            <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer Meta */}
                        <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                          {/* Author & Date */}
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-[10px] uppercase">
                              {getAuthorName(post.author).charAt(0)}
                            </div>
                            <span className="truncate max-w-[110px] font-medium text-foreground">
                              {getAuthorName(post.author)}
                            </span>
                          </div>

                          {/* Social Stats & Read Action */}
                          <div className="flex items-center gap-3">
                            {post.likes ? (
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-semibold">
                                <Heart className="h-3 w-3 text-rose-500 fill-rose-500/20" />
                                {post.likes}
                              </span>
                            ) : null}

                            <Link
                              href={`/blog/${post.slug || post._id}`}
                              className="font-semibold text-primary inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                            >
                              Read
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </article>
                  );
                })}
              </div>

              {/* Empty State */}
              {gridPosts.length === 0 && (
                <div className="py-16 text-center space-y-4 rounded-3xl border border-dashed border-border bg-card/60 p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    <Search className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">No articles match your criteria</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Try searching for different keywords or select &ldquo;All&rdquo; categories.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="rounded-full text-xs"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}

              {/* Newsletter & Community Callout Banner */}
              <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-card via-card to-primary/10 border border-primary/20 shadow-md">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/15 border border-primary/25">
                    <Sparkles className="h-3.5 w-3.5" />
                    KKIT Developer Digest
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    Never Miss an Industry Insight
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get weekly breakdowns of modern web development, career trends in Bangladesh, and exclusive tutorials delivered straight to your inbox.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md">
                    <Input
                      placeholder="Enter your work or personal email..."
                      type="email"
                      className="rounded-full text-xs h-10 px-4 bg-background border-border/80"
                    />
                    <Button className="rounded-full px-6 text-xs font-semibold shrink-0 shadow-md">
                      Subscribe Free
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
