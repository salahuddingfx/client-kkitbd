"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Eye,
  Clock,
  CheckCircle,
  Pin,
  Plus,
  Search,
  Loader2,
  Send,
  X,
} from "lucide-react";
import { discussionsApi, coursesApi, Discussion, Course } from "@/services/api";
import { Container, Breadcrumb } from "@/components/common";
import { GlowCard, Badge, Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { useAppSelector } from "@/redux/hooks";

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

type DiscussionType = "question" | "discussion" | "announcement";

const TYPE_CONFIG: Record<DiscussionType, { label: string; className: string }> = {
  question: { label: "Question", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  discussion: { label: "Discussion", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  announcement: { label: "Announcement", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
};

const FILTERS = ["All", "Questions", "Discussions", "Announcements"] as const;

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formType, setFormType] = useState<DiscussionType>("discussion");
  const [formCourse, setFormCourse] = useState("");

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await discussionsApi.getAll();
        setDiscussions((res.data as Discussion[]) || []);
      } catch {
        setDiscussions([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchCourses = async () => {
      try {
        const res = await coursesApi.getAll();
        setCourses((res.data as Course[]) || []);
      } catch {
        setCourses([]);
      }
    };
    fetchDiscussions();
    fetchCourses();
  }, []);

  const handleCreate = async () => {
    if (!formTitle.trim() || !formContent.trim()) return;
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        title: formTitle.trim(),
        content: formContent.trim(),
        type: formType,
      };
      if (formCourse) payload.course = formCourse;
      const res = await discussionsApi.create(payload);
      if (res.data) {
        setDiscussions((prev) => [res.data as Discussion, ...prev]);
      }
      setFormTitle("");
      setFormContent("");
      setFormType("discussion");
      setFormCourse("");
      setShowForm(false);
    } catch {
      // error handled silently
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = discussions.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Questions") return matchesSearch && d.type === "question";
    if (activeFilter === "Discussions") return matchesSearch && d.type === "discussion";
    if (activeFilter === "Announcements") return matchesSearch && d.type === "announcement";
    return matchesSearch;
  });

  const pinned = filtered.filter((d) => d.isPinned);
  const unpinned = filtered.filter((d) => !d.isPinned);

  return (
    <>
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Community
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Community Forum
            </h1>
            <p className="text-lg text-muted-foreground">
              Ask questions, share insights, and connect with fellow learners and instructors.
            </p>
            <Breadcrumb items={[{ label: "Discussions" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {showForm ? "Cancel" : "New Discussion"}
            </Button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <GlowCard className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Start a New Discussion</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
                      <Input
                        placeholder="What's your question or topic?"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Content</label>
                      <Textarea
                        placeholder="Describe your topic in detail..."
                        rows={4}
                        value={formContent}
                        onChange={(e) => setFormContent(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Type</label>
                        <Select value={formType} onValueChange={(v) => setFormType(v as DiscussionType)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="question">Question</SelectItem>
                            <SelectItem value="discussion">Discussion</SelectItem>
                            <SelectItem value="announcement">Announcement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Course (optional)</label>
                        <Select value={formCourse} onValueChange={setFormCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((c) => (
                              <SelectItem key={c._id} value={c._id}>
                                {c.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleCreate}
                        disabled={!formTitle.trim() || !formContent.trim() || submitting}
                        className="gap-2"
                      >
                        {submitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Post Discussion
                      </Button>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-1/3" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <div className="flex gap-3 pt-1">
                          <Skeleton className="h-3.5 w-14" />
                          <Skeleton className="h-3.5 w-14" />
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No discussions found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search query." : "Be the first to start a discussion!"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {[...pinned, ...unpinned].map((discussion, index) => (
                <FadeIn key={discussion._id} delay={index * 0.05}>
                  <GlowCard className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {discussion.author?.avatar?.url ? (
                          <img
                            src={discussion.author.avatar.url}
                            alt={discussion.author.name}
                            className="h-10 w-10 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-sm font-medium text-primary">
                              {discussion.author?.name?.charAt(0)?.toUpperCase() || "?"}
                            </span>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            {discussion.isPinned && (
                              <Pin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                            )}
                            {discussion.isResolved && (
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                            )}
                            <h3 className="font-semibold text-foreground truncate">
                              {discussion.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                            <span>{discussion.author?.name || "Anonymous"}</span>
                            <span className="text-border">·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {timeAgo(discussion.createdAt)}
                            </span>
                            {typeof discussion.course === "object" && discussion.course?.title && (
                              <>
                                <span className="text-border">·</span>
                                <span className="text-primary/80">{discussion.course.title}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        <Badge variant="outline" className={TYPE_CONFIG[discussion.type]?.className}>
                          {TYPE_CONFIG[discussion.type]?.label}
                        </Badge>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            {discussion.replies?.length || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {discussion.views || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
