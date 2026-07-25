"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Heart,
  FileText,
  AlertCircle,
  X,
  Sparkles,
  Search,
} from "lucide-react";
import { blogApi } from "@/services/api";

interface StudentBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  status: "pending" | "published" | "rejected" | "draft";
  rejectionReason?: string;
  views: number;
  likes: number;
  createdAt: string;
  publishedAt?: string;
}

const BLOG_CATEGORIES = [
  "Technology",
  "Programming",
  "Web Development",
  "Career & Advice",
  "Design & UI/UX",
  "Artificial Intelligence",
  "Student Experience",
];

export default function StudentBlogsPage() {
  const [blogs, setBlogs] = useState<StudentBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Technology",
    excerpt: "",
    content: "",
    thumbnailUrl: "",
  });

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const res: any = await blogApi.getMyBlogs();
      const data = res.data?.data || res.data || [];
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Failed to load student blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setFeedbackMsg({ type: "error", text: "Title and content are required." });
      return;
    }

    try {
      setSubmitting(true);
      setFeedbackMsg(null);
      const payload = {
        title: form.title,
        category: form.category,
        excerpt: form.excerpt,
        content: form.content,
        thumbnail: form.thumbnailUrl ? { url: form.thumbnailUrl } : undefined,
      };

      await blogApi.create(payload);
      setFeedbackMsg({
        type: "success",
        text: "🎉 Your blog post has been submitted! It will appear publicly once approved by an admin.",
      });
      setForm({ title: "", category: "Technology", excerpt: "", content: "", thumbnailUrl: "" });
      setIsModalOpen(false);
      fetchMyBlogs();
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to submit blog. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = blogs.filter((b) => b.status === "pending").length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const rejectedCount = blogs.filter((b) => b.status === "rejected").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Newspaper className="h-7 w-7 text-primary" />
            My Blogs & Article Submissions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Share your knowledge with the KKIT community. Submitted articles undergo admin review before going live.
          </p>
        </div>

        <button
          onClick={() => {
            setFeedbackMsg(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg shrink-0"
        >
          <Plus className="h-5 w-5" />
          Submit New Blog
        </button>
      </div>

      {/* Alert banner if feedback */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center justify-between ${
            feedbackMsg.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 border border-destructive/30 text-destructive"
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="p-1 hover:opacity-80">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-card border border-border/60 rounded-xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Pending Approval</p>
            <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
          </div>
        </div>

        <div className="p-4 bg-card border border-border/60 rounded-xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Published Live</p>
            <p className="text-2xl font-bold text-foreground">{publishedCount}</p>
          </div>
        </div>

        <div className="p-4 bg-card border border-border/60 rounded-xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-destructive/10 text-destructive rounded-xl">
            <XCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Needs Revision</p>
            <p className="text-2xl font-bold text-foreground">{rejectedCount}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-card border border-border/60 p-3 rounded-xl">
        <Search className="h-5 w-5 text-muted-foreground ml-1" />
        <input
          type="text"
          placeholder="Search my blogs by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Blogs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse">
            Loading your blog submissions...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 bg-card border border-dashed rounded-2xl text-center space-y-3">
            <Sparkles className="h-10 w-10 text-primary mx-auto" />
            <h3 className="text-lg font-bold text-foreground">No blog submissions yet</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Got insights or project walkthroughs to share? Click "Submit New Blog" above to share with fellow students!
            </p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-card border border-border/60 rounded-2xl shadow-xs hover:border-primary/40 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary font-semibold text-xs rounded-md">
                      {blog.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Submitted {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                </div>

                {/* Status Badges */}
                <div className="shrink-0">
                  {blog.status === "pending" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold shadow-2xs">
                      <Clock className="h-4 w-4 animate-spin" /> Approval Pending
                    </span>
                  )}
                  {blog.status === "published" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold shadow-2xs">
                      <CheckCircle2 className="h-4 w-4" /> Published Live
                    </span>
                  )}
                  {blog.status === "rejected" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 border border-destructive/30 text-destructive rounded-full text-xs font-bold shadow-2xs">
                      <XCircle className="h-4 w-4" /> Rejected
                    </span>
                  )}
                  {blog.status === "draft" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted border text-muted-foreground rounded-full text-xs font-bold">
                      Draft
                    </span>
                  )}
                </div>
              </div>

              {blog.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
              )}

              {/* Rejection notice box */}
              {blog.status === "rejected" && blog.rejectionReason && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Admin Feedback:</strong> {blog.rejectionReason}
                  </div>
                </div>
              )}

              {/* Post Footer */}
              <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-border/40">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> {blog.views || 0} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" /> {blog.likes || 0} likes
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal to Submit New Blog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" /> Write & Submit Blog Post
                </h2>
                <p className="text-xs text-muted-foreground">
                  Your submission will be sent to the moderation team for approval.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How I Built My First Fullstack App at KKIT"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Cover / Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.thumbnailUrl}
                    onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="A short 1-2 sentence overview of your article..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Full Article Content *
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write your article content here..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-3 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              {/* Modal Footer */}
              <div className="border-t pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-sm font-medium hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Article for Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
