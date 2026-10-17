"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Eye,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  ThumbsUp,
  Flame,
  Lightbulb,
  Sparkles,
  Send,
  CornerDownRight,
  Check,
  Copy,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Skeleton,
  Input,
  Textarea,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui";
import { Container, ShareButtons, LavaHero, LavaEffect } from "@/components/common";
import { toast } from "sonner";
import { blogApi, authApi, BlogComment, BlogReactions } from "@/services/api";

interface BlogPostDetail {
  _id: string | number;
  id?: string | number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string | { url?: string } | null;
  author?: {
    name?: string;
    avatar?: string;
    designation?: string;
    bio?: string;
  };
  category?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  reactions?: BlogReactions;
  comments?: BlogComment[];
  publishedAt?: string;
  createdAt: string;
  readingTime?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const REACTION_CONFIG = [
  { type: "like", emoji: "👍", label: "Helpful", activeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30" },
  { type: "love", emoji: "❤️", label: "Love it", activeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30" },
  { type: "fire", emoji: "🔥", label: "Brilliant", activeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30" },
  { type: "clap", emoji: "👏", label: "Inspiring", activeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" },
  { type: "insightful", emoji: "💡", label: "Insightful", activeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30" },
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slugOrId = (params.id as string) || "";

  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostDetail[]>([]);

  // Auth user state
  const [currentUser, setCurrentUser] = useState<{
    _id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  } | null>(null);

  // Reading progress
  const [readingProgress, setReadingProgress] = useState(0);

  // Reaction state
  const [reactions, setReactions] = useState<BlogReactions>({
    like: 0,
    love: 0,
    fire: 0,
    clap: 0,
    insightful: 0,
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [showFlyout, setShowFlyout] = useState(false);
  const flyoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Comments state
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Active TOC section
  const [activeTocId, setActiveTocId] = useState<string>("");

  // Fetch current user
  useEffect(() => {
    authApi
      .getMe()
      .then((res) => {
        if (res.data) {
          setCurrentUser(res.data);
          setGuestName(res.data.name || "");
          setGuestEmail(res.data.email || "");
        }
      })
      .catch(() => {
        // Guest reader
      });
  }, []);

  // Fetch Post and Related
  useEffect(() => {
    if (!slugOrId) return;

    const fetchPostData = async () => {
      setLoading(true);
      try {
        const res = await blogApi.getBySlug(slugOrId);
        const data = res.data as BlogPostDetail;
        setPost(data || null);

        if (data) {
          if (data.reactions) {
            setReactions(data.reactions);
          }
          if (Array.isArray(data.comments)) {
            setComments(data.comments);
          }
        }

        // Fetch related blogs
        try {
          const relatedRes = await blogApi.getRelated(slugOrId);
          if (Array.isArray(relatedRes.data)) {
            setRelatedPosts(relatedRes.data as BlogPostDetail[]);
          }
        } catch {
          // ignore
        }
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slugOrId]);

  // Track scroll progress and active TOC heading
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))));
      }

      // Check active TOC headings
      const headingElements = document.querySelectorAll("article h2, article h3");
      let currentHeadingId = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160) {
          currentHeadingId = el.id;
        }
      });
      if (currentHeadingId) {
        setActiveTocId(currentHeadingId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate Table of Contents
  const tocItems = useMemo<TocItem[]>(() => {
    if (!post?.content) return [];
    const items: TocItem[] = [];
    const paragraphs = post.content.split("\n\n");

    paragraphs.forEach((p, idx) => {
      if (p.startsWith("## ")) {
        const text = p.replace("## ", "").trim();
        const id = `heading-${idx}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        items.push({ id, text, level: 2 });
      } else if (p.startsWith("### ")) {
        const text = p.replace("### ", "").trim();
        const id = `heading-${idx}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        items.push({ id, text, level: 3 });
      }
    });

    return items;
  }, [post?.content]);

  // Estimated reading time
  const readingTime = useMemo(() => {
    if (!post?.content) return "3 min read";
    const words = post.content.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  }, [post?.content]);

  // Handle Reactions
  const handleReact = async (type: string) => {
    if (isReacting) return;
    setIsReacting(true);

    // Optimistic UI update
    setReactions((prev) => ({
      ...prev,
      [type]: (Number(prev[type]) || 0) + 1,
    }));
    setUserReaction(type);

    try {
      const res = await blogApi.addReaction(slugOrId, type);
      if (res.data?.reactions) {
        setReactions(res.data.reactions);
      }
      toast.success(`Marked as ${type}! Thanks for your feedback.`);
    } catch {
      toast.error("Could not register reaction. Please try again.");
    } finally {
      setIsReacting(false);
    }
  };

  // Handle Comment Submission
  const handleSubmitComment = async (e: React.FormEvent, parentId?: string | null) => {
    e.preventDefault();
    const content = (parentId ? replyContent : commentContent).trim();

    if (!content) {
      toast.error("Please enter a comment");
      return;
    }

    if (!currentUser && !guestName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsSubmittingComment(true);
    try {
      const res = await blogApi.addComment(slugOrId, {
        content,
        name: currentUser?.name || guestName.trim() || "Anonymous Reader",
        email: currentUser?.email || guestEmail.trim() || "",
        parentId: parentId || null,
      });

      if (res.data?.comments) {
        setComments(res.data.comments);
      } else if (res.data?.comment) {
        setComments((prev) => [res.data.comment, ...prev]);
      }

      if (parentId) {
        setReplyingToId(null);
        setReplyContent("");
        toast.success("Reply posted!");
      } else {
        setCommentContent("");
        toast.success("Comment posted successfully!");
      }
    } catch {
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Handle Comment Like
  const handleLikeComment = async (commentId: string) => {
    // Optimistic UI update
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, likes: (c.likes || 0) + 1 };
        }
        if (c.replies && c.replies.length > 0) {
          return {
            ...c,
            replies: c.replies.map((r) => (r.id === commentId ? { ...r, likes: (r.likes || 0) + 1 } : r)),
          };
        }
        return c;
      })
    );

    try {
      await blogApi.likeComment(slugOrId, commentId);
    } catch {
      // ignore
    }
  };

  // Copy article link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Scroll to TOC Heading
  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTocId(id);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 pb-24">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-12 w-4/5" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-80 w-full rounded-3xl" />
            <div className="space-y-4 pt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 pb-28 text-center">
        <Container>
          <div className="max-w-md mx-auto space-y-6 p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-xl">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Article Not Found</h1>
            <p className="text-muted-foreground text-sm">
              The article you are looking for might have been moved, removed, or is still awaiting moderation.
            </p>
            <Button asChild className="w-full">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-16 left-0 right-0 h-1 bg-primary z-40 transition-all duration-150 origin-left"
        style={{ transform: `scaleX(${readingProgress / 100})` }}
      />

      {/* Hero Heading Banner with Interactive Lava Effect */}
      <LavaHero
        badge={post.category || "Technology"}
        title={post.title}
        description={post.excerpt}
        breadcrumbItems={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        size="lg"
      >
        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm text-muted-foreground">
          {/* Author */}
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border/60 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
              {post.author?.name ? post.author.name.charAt(0) : "K"}
            </div>
            <span className="font-semibold text-foreground">{post.author?.name || "KKIT Editorial Team"}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span>{readingTime}</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-primary" />
            <span>{(post.views || 0) + 1} views</span>
          </div>
        </div>
      </LavaHero>

      {/* Main Content Layout */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Article Main Body (Col 1 to 8) */}
            <article className="lg:col-span-8 space-y-10">
              {/* Floating Quick Action & Share Bar */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Share:</span>
                  <ShareButtons title={post.title} />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="h-8 gap-1.5 text-xs rounded-full border-border/80 hover:border-primary/50"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedLink ? "Copied" : "Copy Link"}
                  </Button>
                </div>
              </div>

              {/* Formatted Article Body */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-6">
                {post.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    const headingText = paragraph.replace("## ", "").trim();
                    const headingId = `heading-${i}-${headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                    return (
                      <h2
                        key={i}
                        id={headingId}
                        className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-10 mb-4 pt-4 border-t border-border/40 scroll-mt-24 group flex items-center justify-between"
                      >
                        <span>{headingText}</span>
                        <a
                          href={`#${headingId}`}
                          className="text-muted-foreground/40 group-hover:text-primary transition-colors text-lg opacity-0 group-hover:opacity-100"
                        >
                          #
                        </a>
                      </h2>
                    );
                  }

                  if (paragraph.startsWith("### ")) {
                    const headingText = paragraph.replace("### ", "").trim();
                    const headingId = `heading-${i}-${headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                    return (
                      <h3
                        key={i}
                        id={headingId}
                        className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3 scroll-mt-24"
                      >
                        {headingText}
                      </h3>
                    );
                  }

                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n");
                    return (
                      <ul key={i} className="space-y-2.5 my-5 pl-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                            <span>{item.replace(/^-\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (paragraph.match(/^\d\./)) {
                    const items = paragraph.split("\n");
                    return (
                      <ol key={i} className="space-y-3 my-5 pl-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3.5 text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {j + 1}
                            </span>
                            <span className="leading-relaxed">{item.replace(/^\d+\.\s*/, "")}</span>
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  return (
                    <p key={i} className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags Cloud */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">Tags:</span>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Compact Facebook-style Reaction & Engagement Bar */}
              {(() => {
                const totalReactions = Object.values(reactions).reduce((a, b) => a + (Number(b) || 0), 0);
                const currentActiveConfig = REACTION_CONFIG.find((c) => c.type === userReaction);

                return (
                  <div className="py-3 px-4 sm:px-5 rounded-2xl bg-card border border-border shadow-xs space-y-2.5">
                    {/* Top Row: Reaction summary and post metadata */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        {/* Overlapping mini emoji badges like Facebook */}
                        <div className="flex -space-x-1 items-center">
                          <span className="w-5 h-5 rounded-full bg-blue-500/20 text-xs flex items-center justify-center ring-2 ring-card">
                            👍
                          </span>
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-xs flex items-center justify-center ring-2 ring-card">
                            ❤️
                          </span>
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-xs flex items-center justify-center ring-2 ring-card">
                            🔥
                          </span>
                        </div>
                        <span className="font-semibold text-foreground text-xs">
                          {totalReactions > 0
                            ? `${totalReactions} ${totalReactions === 1 ? "reaction" : "reactions"}`
                            : "Be the first to react"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
                          className="hover:underline hover:text-foreground cursor-pointer"
                        >
                          {comments.length} comments
                        </button>
                        <span>•</span>
                        <span>{post.views || 1} views</span>
                      </div>
                    </div>

                    {/* Bottom Row: Facebook Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-0.5 relative">
                      <div className="flex items-center gap-1.5 sm:gap-2 relative">
                        {/* Animated Facebook Floating Reaction Popup on Hover/Click */}
                        {showFlyout && (
                          <div
                            onMouseEnter={() => {
                              if (flyoutTimerRef.current) clearTimeout(flyoutTimerRef.current);
                            }}
                            onMouseLeave={() => setShowFlyout(false)}
                            className="absolute -top-14 left-0 z-40 flex items-center gap-1.5 p-1.5 bg-background/95 backdrop-blur-md rounded-full border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-150"
                          >
                            {REACTION_CONFIG.map((cfg) => (
                              <button
                                key={cfg.type}
                                type="button"
                                onClick={() => {
                                  handleReact(cfg.type);
                                  setShowFlyout(false);
                                }}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-xl hover:scale-130 hover:-translate-y-1 active:scale-95 transition-all duration-150 cursor-pointer relative group"
                                title={cfg.label}
                              >
                                <span>{cfg.emoji}</span>
                                <span className="absolute -top-7 px-1.5 py-0.5 rounded bg-black/85 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                                  {cfg.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Facebook Primary React/Like Button */}
                        <button
                          type="button"
                          onMouseEnter={() => setShowFlyout(true)}
                          onMouseLeave={() => {
                            flyoutTimerRef.current = setTimeout(() => setShowFlyout(false), 300);
                          }}
                          onClick={() => {
                            setShowFlyout((prev) => !prev);
                            if (!userReaction) handleReact("like");
                          }}
                          disabled={isReacting}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentActiveConfig
                              ? currentActiveConfig.activeColor
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span className="text-base">{currentActiveConfig ? currentActiveConfig.emoji : "👍"}</span>
                          <span>{currentActiveConfig ? currentActiveConfig.label : "Like"}</span>
                        </button>

                        {/* Compact Inline Reaction Chips */}
                        <div className="flex items-center gap-1 pl-1.5 border-l border-border/60 overflow-x-auto py-0.5">
                          {REACTION_CONFIG.map((cfg) => {
                            const count = Number(reactions[cfg.type]) || 0;
                            const isSelected = userReaction === cfg.type;
                            return (
                              <button
                                key={cfg.type}
                                type="button"
                                onClick={() => handleReact(cfg.type)}
                                disabled={isReacting}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all cursor-pointer shrink-0 ${
                                  isSelected
                                    ? cfg.activeColor + " font-bold shadow-xs scale-105"
                                    : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40"
                                }`}
                              >
                                <span>{cfg.emoji}</span>
                                <span className="text-[11px] font-semibold">{count}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Quick Comment & Share buttons */}
                      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
                          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Comment</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                        >
                          {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                          <span className="hidden sm:inline">{copiedLink ? "Copied" : "Share"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Author Bio Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-primary to-amber-500 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0">
                  {post.author?.name ? post.author.name.charAt(0) : "K"}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{post.author?.name || "KKIT Engineering Team"}</h4>
                      <p className="text-xs text-primary font-medium">{post.author?.designation || "Lead Tech Educator & Systems Architect"}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="rounded-full text-xs self-center sm:self-auto">
                      <Link href="/about">View Profile</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.author?.bio ||
                      "Writing in-depth articles on modern web architecture, emerging tech trends in Bangladesh, and developer roadmaps."}
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div id="comments" className="space-y-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
                      <MessageSquare className="h-6 w-6 text-primary" />
                      Discussion &amp; Comments
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                        {comments.length}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Join the discussion, ask questions, or share your thoughts with fellow tech enthusiasts.
                    </p>
                  </div>
                </div>

                {/* Comment Input Card */}
                <Card className="rounded-3xl border-border/80 bg-card shadow-sm overflow-hidden">
                  <CardContent className="p-5 sm:p-6 space-y-4">
                    <form onSubmit={(e) => handleSubmitComment(e)}>
                      <Textarea
                        placeholder="Write your constructive thoughts, questions, or insights..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-2xl border-border/80 focus:border-primary focus:ring-1 focus:ring-primary p-4 text-sm"
                      />

                      {/* Guest details if user is not logged in */}
                      {!currentUser && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                          <Input
                            placeholder="Your Name *"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            required
                            className="rounded-xl text-sm"
                          />
                          <Input
                            placeholder="Your Email (optional)"
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="rounded-xl text-sm"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/40">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {currentUser ? (
                            <span>
                              Commenting as <span className="font-semibold text-foreground">{currentUser.name}</span>
                            </span>
                          ) : (
                            <span>Commenting as Guest</span>
                          )}
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmittingComment || !commentContent.trim()}
                          className="rounded-full px-5 gap-2 text-xs font-semibold shadow-md"
                        >
                          {isSubmittingComment ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" />
                              Post Comment
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="p-8 text-center rounded-3xl border border-dashed border-border/80 bg-muted/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <p className="text-base font-semibold text-foreground">No comments yet</p>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        Be the first to start the conversation on this article!
                      </p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3 transition-all hover:border-primary/30"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs uppercase shrink-0">
                              {comment.name ? comment.name.charAt(0) : "U"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-foreground">{comment.name}</span>
                                {comment.role && comment.role !== "reader" && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {comment.role}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleLikeComment(comment.id)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border/60 transition-colors cursor-pointer"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span>{comment.likes || 0}</span>
                          </button>
                        </div>

                        <p className="text-sm text-foreground/90 leading-relaxed pl-12 whitespace-pre-wrap">
                          {comment.content}
                        </p>

                        {/* Reply Button and Nested Replies */}
                        <div className="pl-12 pt-1 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingToId(replyingToId === comment.id ? null : comment.id);
                              setReplyContent("");
                            }}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <CornerDownRight className="h-3 w-3" />
                            {replyingToId === comment.id ? "Cancel Reply" : "Reply"}
                          </button>
                        </div>

                        {/* Inline Reply Form */}
                        {replyingToId === comment.id && (
                          <div className="ml-12 mt-3 p-3.5 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
                            <Textarea
                              placeholder={`Reply to ${comment.name}...`}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              rows={2}
                              className="w-full resize-none text-xs rounded-xl"
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setReplyingToId(null)}
                                className="h-7 text-xs rounded-full"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => handleSubmitComment(e, comment.id)}
                                disabled={isSubmittingComment || !replyContent.trim()}
                                className="h-7 text-xs rounded-full px-4"
                              >
                                {isSubmittingComment ? "Posting..." : "Send Reply"}
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Render Nested Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-12 mt-3 space-y-3 pt-3 border-t border-border/40">
                            {comment.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-2 text-xs"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-[10px] uppercase">
                                      {reply.name ? reply.name.charAt(0) : "R"}
                                    </div>
                                    <span className="font-bold text-foreground">{reply.name}</span>
                                    <span className="text-[10px] text-muted-foreground">
                                      {new Date(reply.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleLikeComment(reply.id)}
                                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary"
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{reply.likes || 0}</span>
                                  </button>
                                </div>
                                <p className="text-foreground/80 leading-relaxed pl-8">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Navigation Back */}
              <div className="pt-8 border-t border-border flex items-center justify-between">
                <Button variant="outline" asChild className="rounded-full gap-2">
                  <Link href="/blog">
                    <ArrowLeft className="h-4 w-4" />
                    Back to All Blogs
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full text-xs">
                  Back to Top ↑
                </Button>
              </div>
            </article>

            {/* Sticky Sidebar (Col 9 to 12) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Table of Contents Sticky Card */}
              {tocItems.length > 0 && (
                <div className="sticky top-24 p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Table of Contents
                  </h4>
                  <nav className="space-y-1.5 text-xs">
                    {tocItems.map((item) => {
                      const isActive = activeTocId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToHeading(item.id)}
                          className={`w-full text-left py-1.5 px-3 rounded-lg transition-all duration-150 cursor-pointer block leading-snug ${
                            item.level === 3 ? "pl-6" : ""
                          } ${
                            isActive
                              ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium"
                          }`}
                        >
                          {item.text}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Course & Community Promo Widget */}
              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/25 shadow-md space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                  <Sparkles className="h-3 w-3" />
                  Free Tech Consultation
                </div>
                <h4 className="text-lg font-extrabold text-foreground leading-snug">
                  Want to Launch Your Tech Career in 2026?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Join KKIT's intensive hands-on bootcamps with industry mentorship, live project training, and job placement support.
                </p>
                <Button asChild className="w-full rounded-full text-xs font-semibold shadow-md">
                  <Link href="/courses">
                    Explore Courses
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              {/* Related Articles Card */}
              {relatedPosts.length > 0 && (
                <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    Related Articles
                  </h4>
                  <div className="space-y-3.5 divide-y divide-border/40">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.slug || rel.id}
                        href={`/blog/${rel.slug || rel.id}`}
                        className="pt-3.5 first:pt-0 block group"
                      >
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                          {rel.category || "Tech"}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                          {rel.title}
                        </h5>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {new Date(rel.publishedAt || rel.createdAt).toLocaleDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}
