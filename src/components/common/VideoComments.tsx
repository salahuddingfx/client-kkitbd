"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  User,
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
} from "lucide-react";
import { Button, Avatar, AvatarFallback, AvatarImage, Badge } from "@/components/ui";
import { cn, getInitials } from "@/utils";
import { discussionsApi, Discussion } from "@/services/api";
import { toast } from "sonner";

interface VideoCommentsProps {
  courseId: string;
  lessonId: string;
}

export function VideoComments({ courseId, lessonId }: VideoCommentsProps) {
  const [comments, setComments] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [commentType, setCommentType] = useState<"question" | "discussion">("question");
  const [submitting, setSubmitting] = useState(false);

  // Reply states
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await discussionsApi.getAll({ course: courseId, lessonId });
      if (res.success) {
        setComments((res.data as any) || []);
      }
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    try {
      setSubmitting(true);
      const res = await discussionsApi.create({
        title: newTitle.trim() || (newContent.length > 50 ? newContent.slice(0, 50) + "..." : newContent),
        content: newContent.trim(),
        course: courseId,
        lessonId,
        type: commentType,
      });

      if (res.success) {
        setNewTitle("");
        setNewContent("");
        toast.success("Comment posted for this video lesson!");
        fetchComments();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostReply = async (discussionId: string) => {
    if (!replyContent.trim()) return;
    try {
      setReplySubmitting(true);
      const res = await discussionsApi.addReply(discussionId, { content: replyContent.trim() });
      if (res.success) {
        setReplyContent("");
        setActiveReplyId(null);
        toast.success("Reply added!");
        fetchComments();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add reply");
    } finally {
      setReplySubmitting(false);
    }
  };

  const handleToggleLikeReply = async (discussionId: string, replyId: string) => {
    try {
      const res = await discussionsApi.likeReply(discussionId, replyId);
      if (res.success) {
        fetchComments();
      }
    } catch {
      toast.error("Failed to like reply");
    }
  };

  const handleToggleResolved = async (discussionId: string) => {
    try {
      const res = await discussionsApi.toggleResolved(discussionId);
      if (res.success) {
        toast.success(res.data?.isResolved ? "Marked as resolved" : "Marked as unresolved");
        fetchComments();
      }
    } catch {
      toast.error("Failed to toggle resolved state");
    }
  };

  return (
    <div className="space-y-6">
      {/* Post Comment / Question Form */}
      <div className="p-4 bg-muted/20 border border-border rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Ask a Question or Comment on this Lesson
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-background border p-0.5 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setCommentType("question")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors flex items-center gap-1",
                commentType === "question"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <HelpCircle className="h-3 w-3" /> Question
            </button>
            <button
              type="button"
              onClick={() => setCommentType("discussion")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors flex items-center gap-1",
                commentType === "discussion"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MessageCircle className="h-3 w-3" /> Comment
            </button>
          </div>
        </div>

        <form onSubmit={handlePostComment} className="space-y-2.5">
          <input
            type="text"
            placeholder="Topic / Summary (optional)..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-1.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            required
            rows={3}
            placeholder={
              commentType === "question"
                ? "What are you confused about in this video lesson?"
                : "Share your thoughts or helpful tips regarding this lesson..."
            }
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full p-3 bg-background border border-input rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!newContent.trim() || submitting}
              className="gap-1.5"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Post {commentType === "question" ? "Question" : "Comment"}
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground space-y-2">
            <MessageSquare className="h-10 w-10 mx-auto opacity-30" />
            <p className="text-sm font-medium">No comments on this video lesson yet.</p>
            <p className="text-xs">Be the first to ask a question or leave feedback!</p>
          </div>
        ) : (
          comments.map((item) => {
            const author = typeof item.author === "object" ? item.author : null;
            const authorName = author?.name || "Student";
            const authorRole = author?.role || "user";
            const isReplying = activeReplyId === item._id;

            return (
              <div
                key={item._id}
                className={cn(
                  "p-4 rounded-xl border border-border bg-card space-y-3 transition-all",
                  item.isResolved && "border-emerald-500/30 bg-emerald-500/5"
                )}
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={typeof author?.avatar === "string" ? author.avatar : author?.avatar?.url} />
                      <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{authorName}</span>
                        {["admin", "super_admin", "mentor", "trainer"].includes(authorRole) ? (
                          <Badge variant="default" className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-primary/30 font-semibold">
                            Instructor / Mentor
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            Student
                          </Badge>
                        )}

                        {item.isResolved && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Resolved
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleResolved(item._id)}
                    className="p-1 text-xs text-muted-foreground hover:text-foreground rounded"
                    title={item.isResolved ? "Mark unresolved" : "Mark resolved"}
                  >
                    <CheckCircle2 className={cn("h-4 w-4", item.isResolved ? "text-emerald-500" : "opacity-40")} />
                  </button>
                </div>

                {/* Comment Title & Body */}
                <div className="space-y-1 pl-12">
                  {item.title && (
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  )}
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-4 pl-12 pt-1 text-xs text-muted-foreground">
                  <button
                    onClick={() => {
                      if (isReplying) setActiveReplyId(null);
                      else {
                        setActiveReplyId(item._id);
                        setReplyContent("");
                      }
                    }}
                    className="flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Reply ({item.replies?.length || 0})
                  </button>
                </div>

                {/* Reply Form */}
                {isReplying && (
                  <div className="pl-12 pt-2 space-y-2">
                    <textarea
                      rows={2}
                      placeholder={`Reply to ${authorName}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full p-2.5 bg-background border border-input rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveReplyId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={!replyContent.trim() || replySubmitting}
                        onClick={() => handlePostReply(item._id)}
                      >
                        {replySubmitting ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                        Post Reply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Threaded Replies */}
                {item.replies && item.replies.length > 0 && (
                  <div className="pl-12 space-y-3 pt-2 border-t border-border/50">
                    {item.replies.map((reply: any) => {
                      const replyAuthor = typeof reply.author === "object" ? reply.author : null;
                      const replyAuthorName = replyAuthor?.name || "User";
                      const replyAuthorRole = replyAuthor?.role || "user";
                      const likesCount = reply.likes?.length || 0;

                      return (
                        <div
                          key={reply._id}
                          className="p-3 bg-muted/30 border border-border/40 rounded-lg space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={typeof replyAuthor?.avatar === "string" ? replyAuthor.avatar : replyAuthor?.avatar?.url} />
                                <AvatarFallback className="text-[10px]">{getInitials(replyAuthorName)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-bold text-foreground">{replyAuthorName}</span>
                              {["admin", "super_admin", "mentor", "trainer"].includes(replyAuthorRole) && (
                                <span className="text-[9px] px-1 py-0 bg-primary/20 text-primary font-bold rounded">
                                  Mentor
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap pl-8">
                            {reply.content}
                          </p>

                          <div className="flex justify-end pl-8 pt-0.5">
                            <button
                              onClick={() => handleToggleLikeReply(item._id, reply._id)}
                              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ThumbsUp className="h-3 w-3" /> {likesCount}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
