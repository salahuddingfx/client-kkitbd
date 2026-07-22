"use client";

import { useState, useEffect } from "react";
import {
  FolderGit2,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Loader2,
} from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";
import { projectsApi, Project } from "@/services/api";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { MilestoneTracker } from "@/components/common/MilestoneTracker";
import { toast } from "sonner";

const statusConfig = {
  in_progress: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", label: "In Progress" },
  approved: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Approved" },
  pending_review: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending Review" },
  revision_requested: { icon: XCircle, color: "text-orange-500", bg: "bg-orange-500/10", label: "Revision Requested" },
  not_submitted: { icon: Upload, color: "text-muted-foreground", bg: "bg-muted", label: "Not Submitted" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    projectsApi.getMy()
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (id: string, repoUrl: string, liveUrl: string) => {
    setSubmitting(id);
    try {
      const res = await projectsApi.submit(id, { repoUrl, liveUrl });
      if (res.success) {
        setProjects((prev) => prev.map((p) => p._id === id ? { ...p, status: "pending_review", submittedAt: new Date().toISOString() } : p));
        toast.success("Project submitted for review!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit project.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleMilestoneComplete = async (projectId: string, milestoneIndex: number) => {
    try {
      const res = await projectsApi.completeMilestone(projectId, milestoneIndex);
      if (res.success) {
        setProjects((prev) => prev.map((p) => p._id === projectId ? res.data : p));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to complete milestone");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-3.5 w-1/4" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full shrink-0" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-9 w-32 rounded-lg" />
                  <Skeleton className="h-9 w-28 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Submit projects for instructor review and feedback.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: projects.length, color: "text-foreground" },
          { label: "Approved", value: projects.filter((p) => p.status === "approved").length, color: "text-green-500" },
          { label: "Pending", value: projects.filter((p) => p.status === "pending_review").length, color: "text-yellow-500" },
          { label: "Revision", value: projects.filter((p) => p.status === "revision_requested").length, color: "text-orange-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderGit2 className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">No projects yet. Start a course to begin working on projects.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project, i) => {
            const config = statusConfig[project.status];

            return (
              <FadeIn key={project._id} delay={i * 0.1}>
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className={cn("p-2.5 rounded-xl", config.bg)}>
                          <FolderGit2 className={cn("h-5 w-5", config.color)} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{project.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{project.courseName || "General Project"}</p>
                        </div>
                      </div>
                      <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0", config.bg, config.color)}>
                        {config.label}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                    {/* Deadline countdown */}
                    {project.deadline && project.status !== "approved" && (
                      <div className="mb-4">
                        <CountdownTimer deadline={project.deadline} size="sm" />
                      </div>
                    )}

                    {/* Milestones */}
                    {project.milestones && project.milestones.length > 0 && (
                      <div className="mb-4">
                        <MilestoneTracker
                          milestones={project.milestones}
                          progress={project.milestones.map((m) => ({
                            milestoneTitle: m.title,
                            completed: m.completed,
                            completedAt: m.completedAt,
                            awardedPoints: m.maxPoints,
                          }))}
                          type="project"
                          projectId={project._id}
                          onMilestoneComplete={() => {
                            projectsApi.getMy().then((res) => {
                              if (res.success) setProjects(res.data || []);
                            });
                          }}
                        />
                      </div>
                    )}

                    {/* Feedback */}
                    {project.feedback && (
                      <div className="p-3 rounded-lg bg-muted/50 mb-4">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Instructor Feedback</p>
                        <p className="text-sm text-foreground">{project.feedback}</p>
                        {project.grade && (
                          <p className="text-sm font-semibold text-primary mt-1">Grade: {project.grade}</p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {project.submittedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Submitted {formatDate(project.submittedAt)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
                          >
                            <FolderGit2 className="h-3 w-3" />
                            Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
                          >
                            Live
                          </a>
                        )}
                        {(project.status === "not_submitted" || project.status === "revision_requested") && (
                          <button
                            onClick={() => handleSubmit(project._id, project.repoUrl || "", project.liveUrl || "")}
                            disabled={submitting === project._id}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                          >
                            {submitting === project._id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Upload className="h-3 w-3" />
                            )}
                            {project.status === "revision_requested" ? "Resubmit" : "Submit"}
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
