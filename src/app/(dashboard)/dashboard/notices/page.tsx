"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  AlertCircle,
  Wrench,
  Pin,
  Calendar,
  CheckCircle2,
  Loader2,
  Eye,
  Filter,
  Video,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";
import { noticesApi, Notice } from "@/services/api";
import { toast } from "sonner";

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", label: "Info" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Warning" },
  urgent: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Urgent" },
  maintenance: { icon: Wrench, color: "text-purple-500", bg: "bg-purple-500/10", label: "Maintenance" },
  general: { icon: Bell, color: "text-primary", bg: "bg-primary/10", label: "General" },
};

const priorityConfig: Record<string, { color: string; label: string }> = {
  low: { color: "text-muted-foreground", label: "Low" },
  medium: { color: "text-blue-500", label: "Medium" },
  high: { color: "text-orange-500", label: "High" },
  critical: { color: "text-red-500", label: "Critical" },
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [markingRead, setMarkingRead] = useState<string | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await noticesApi.getAll({ isActive: "true" });
      if (res.success) setNotices(res.data || []);
    } catch {
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (noticeId: string) => {
    setMarkingRead(noticeId);
    try {
      await noticesApi.markAsRead(noticeId);
      // Update local state
      setNotices((prev) =>
        prev.map((n) =>
          n._id === noticeId
            ? { ...n, readBy: [...n.readBy, { user: "me", readAt: new Date().toISOString() }] }
            : n
        )
      );
      if (selectedNotice?._id === noticeId) {
        setSelectedNotice((prev) =>
          prev
            ? { ...prev, readBy: [...prev.readBy, { user: "me", readAt: new Date().toISOString() }] }
            : prev
        );
      }
      toast.success("Notice marked as read");
    } catch {
      toast.error("Failed to mark as read");
    } finally {
      setMarkingRead(null);
    }
  };

  const filtered = filterType === "all" ? notices : notices.filter((n) => n.type === filterType);

  const pinnedNotices = filtered.filter((n) => n.isPinned);
  const regularNotices = filtered.filter((n) => !n.isPinned);

  return (
    <FadeIn>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Notices
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Stay updated with the latest announcements
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["all", "info", "warning", "urgent", "maintenance", "general"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                filterType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {type === "all" ? "All" : typeConfig[type]?.label || type}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notice List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No notices found</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Pinned */}
                {pinnedNotices.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
                      Pinned
                    </p>
                    {pinnedNotices.map((notice) => (
                      <NoticeCard
                        key={notice._id}
                        notice={notice}
                        isSelected={selectedNotice?._id === notice._id}
                        onClick={() => setSelectedNotice(notice)}
                      />
                    ))}
                  </div>
                )}

                {/* Regular */}
                {regularNotices.length > 0 && (
                  <div className="space-y-2">
                    {pinnedNotices.length > 0 && (
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
                        All Notices
                      </p>
                    )}
                    {regularNotices.map((notice) => (
                      <NoticeCard
                        key={notice._id}
                        notice={notice}
                        isSelected={selectedNotice?._id === notice._id}
                        onClick={() => setSelectedNotice(notice)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Notice Detail */}
          <div className="lg:col-span-2">
            {selectedNotice ? (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            typeConfig[selectedNotice.type]?.bg || "bg-muted"
                          )}
                        >
                          {(() => {
                            const Icon = (typeConfig[selectedNotice.type]?.icon || Bell) as React.ComponentType<{ className?: string }>;
                            const iconColor = typeConfig[selectedNotice.type]?.color || "text-muted-foreground";
                            return <Icon className={`h-5 w-5 ${iconColor}`} />;
                          })()}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">{selectedNotice.title}</h2>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span
                              className={cn(
                                "font-medium",
                                priorityConfig[selectedNotice.priority]?.color
                              )}
                            >
                              {priorityConfig[selectedNotice.priority]?.label} Priority
                            </span>
                            <span>·</span>
                            <span className="capitalize">{selectedNotice.type}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(selectedNotice.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedNotice.isPinned && (
                        <Pin className="h-4 w-4 text-primary fill-primary shrink-0" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{selectedNotice.content}</p>
                    </div>

                    {/* Online Class Link */}
                    {selectedNotice.classLink && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <Video className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">Online Class</p>
                          {selectedNotice.classSchedule && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(selectedNotice.classSchedule).toLocaleString("en-BD", {
                                weekday: "short", month: "short", day: "numeric",
                                hour: "2-digit", minute: "2-digit",
                              })}
                            </p>
                          )}
                        </div>
                        <a
                          href={selectedNotice.classLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors shrink-0"
                        >
                          Join <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}

                    {/* Target Courses */}
                    {selectedNotice.targetCourses && selectedNotice.targetCourses.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Target Courses</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedNotice.targetCourses.map((course: any) => (
                            <span key={course._id} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {course.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attachments */}
                    {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium mb-2">Attachments</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedNotice.attachments.map((att, i) => (
                            <a
                              key={i}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm hover:bg-muted transition-colors"
                            >
                              {att.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="text-xs text-muted-foreground">
                        By {selectedNotice.author?.name || "Unknown"}
                        {selectedNotice.expiresAt && (
                          <span> · Expires {formatDate(selectedNotice.expiresAt)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleMarkAsRead(selectedNotice._id)}
                        disabled={markingRead === selectedNotice._id}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                          selectedNotice.readBy.some((r) => r.user === "me")
                            ? "bg-green-500/10 text-green-600 cursor-default"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                      >
                        {markingRead === selectedNotice._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : selectedNotice.readBy.some((r) => r.user === "me") ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        {selectedNotice.readBy.some((r) => r.user === "me") ? "Read" : "Mark as Read"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-24 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Select a notice to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function NoticeCard({
  notice,
  isSelected,
  onClick,
}: {
  notice: Notice;
  isSelected: boolean;
  onClick: () => void;
}) {
  const isRead = notice.readBy.some((r) => r.user === "me");
  const config = typeConfig[notice.type] || typeConfig.general;
  const Icon = config.icon as React.ComponentType<{ className?: string }>;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-xl border transition-all",
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border hover:border-primary/30 hover:bg-muted/50",
        !isRead && "border-l-2 border-l-primary"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-1.5 rounded-lg shrink-0", config.bg)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn("text-sm font-medium truncate", !isRead && "font-semibold")}>
              {notice.title}
            </p>
            {notice.isPinned && (
              <Pin className="h-3 w-3 text-primary fill-primary shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {notice.content}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(notice.createdAt)}</p>
        </div>
        {!isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
      </div>
    </button>
  );
}
