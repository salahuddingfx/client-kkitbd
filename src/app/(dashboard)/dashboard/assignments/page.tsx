"use client";

import { useState, useEffect } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Calendar,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";
import { assignmentsApi, submissionsApi, Assignment, Submission } from "@/services/api";

const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Completed" },
  in_progress: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "In Progress" },
  locked: { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted", label: "Locked" },
  submitted: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", label: "Submitted" },
  graded: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Graded" },
  pending: { icon: FileText, color: "text-muted-foreground", bg: "bg-muted", label: "Not Started" },
  overdue: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Overdue" },
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([
      assignmentsApi.getAll(),
      submissionsApi.getMySubmissions(),
    ])
      .then(([assignRes, subRes]) => {
        if (assignRes.success) setAssignments(assignRes.data || []);
        if (subRes.success) setSubmissions(subRes.data || []);
      })
      .catch(() => {
        setAssignments([]);
        setSubmissions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getSubmissionForAssignment = (assignmentId: string) =>
    submissions.find((s) => s.assignment?._id === assignmentId);

  const getAssignmentStatus = (assignment: Assignment): string => {
    const sub = getSubmissionForAssignment(assignment._id);
    if (sub?.grade) return "graded";
    if (sub) return "submitted";
    if (assignment.status === "overdue") return "overdue";
    return "pending";
  };

  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter((a) => getAssignmentStatus(a) === "graded").length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">Loading assignments...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground mt-1">
          {completedAssignments}/{totalAssignments} assignments completed
        </p>
      </div>

      {totalAssignments > 0 && (
        <FadeIn>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-sm font-semibold text-primary">
                  {Math.round((completedAssignments / totalAssignments) * 100)}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(completedAssignments / totalAssignments) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {assignments.length === 0 ? (
        <FadeIn>
          <Card>
            <CardContent className="p-12 text-center">
              <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Assignments Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Assignments will appear here once you&apos;re enrolled in a course with assignments.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment, i) => {
            const status = getAssignmentStatus(assignment);
            const config = statusConfig[status] || statusConfig.pending;
            const isExpanded = expandedMilestones.has(assignment._id);
            const sub = getSubmissionForAssignment(assignment._id);

            return (
              <FadeIn key={assignment._id} delay={i * 0.1}>
                <Card className="overflow-hidden">
                  <button
                    onClick={() => toggleMilestone(assignment._id)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className={cn("p-2 rounded-lg", config.bg)}>
                      <config.icon className={cn("h-5 w-5", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", config.bg, config.color)}>
                          {config.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {assignment.maxPoints} points
                        </span>
                        {assignment.dueDate && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due {formatDate(assignment.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border p-5">
                      <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                      {sub?.grade && (
                        <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-green-600">
                              Grade: {sub.grade.points}/{assignment.maxPoints}
                            </span>
                          </div>
                          {sub.feedback && (
                            <p className="text-sm text-muted-foreground">{sub.feedback.text}</p>
                          )}
                        </div>
                      )}
                      {status === "submitted" && (
                        <p className="text-sm text-blue-500">Submitted — awaiting grading</p>
                      )}
                    </div>
                  )}
                </Card>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
