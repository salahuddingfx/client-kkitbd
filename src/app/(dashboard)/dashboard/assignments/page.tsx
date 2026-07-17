"use client";

import { useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";

interface Milestone {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "locked";
  dueDate: string;
  assignments: Assignment[];
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  status: "submitted" | "graded" | "pending" | "overdue";
  points: number;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
}

const milestones: Milestone[] = [
  {
    id: "m1",
    title: "Module 1: HTML & CSS Fundamentals",
    status: "completed",
    dueDate: "2026-06-15",
    assignments: [
      {
        id: "a1",
        title: "Build a Responsive Landing Page",
        description: "Create a fully responsive landing page using only HTML and CSS. Must include a hero section, features grid, and contact form.",
        status: "graded",
        points: 100,
        submittedAt: "2026-06-12",
        grade: 92,
        feedback: "Excellent work! Your semantic HTML is clean and the responsive design is spot-on. Minor CSS improvements suggested.",
      },
      {
        id: "a2",
        title: "CSS Grid Layout Challenge",
        description: "Recreate a complex dashboard layout using CSS Grid and Flexbox.",
        status: "graded",
        points: 100,
        submittedAt: "2026-06-14",
        grade: 88,
        feedback: "Good use of CSS Grid. Consider using gap consistently instead of margins for spacing.",
      },
    ],
  },
  {
    id: "m2",
    title: "Module 2: JavaScript Essentials",
    status: "completed",
    dueDate: "2026-06-30",
    assignments: [
      {
        id: "a3",
        title: "Interactive Quiz Application",
        description: "Build a quiz app that tracks scores, shows progress, and displays results with animations.",
        status: "graded",
        points: 150,
        submittedAt: "2026-06-28",
        grade: 95,
        feedback: "Outstanding! Great DOM manipulation and clean code structure. Love the animation additions.",
      },
      {
        id: "a4",
        title: "API Fetch Challenge",
        description: "Fetch data from a public API and display it with filtering and sorting capabilities.",
        status: "graded",
        points: 100,
        submittedAt: "2026-06-29",
        grade: 90,
        feedback: "Solid implementation. Error handling could be more comprehensive.",
      },
    ],
  },
  {
    id: "m3",
    title: "Module 3: React Deep Dive",
    status: "in_progress",
    dueDate: "2026-07-31",
    assignments: [
      {
        id: "a5",
        title: "Component Library Builder",
        description: "Build a reusable component library with Button, Card, Input, and Modal components with proper props and documentation.",
        status: "submitted",
        points: 200,
        submittedAt: "2026-07-14",
      },
      {
        id: "a6",
        title: "State Management Challenge",
        description: "Implement a shopping cart with Redux Toolkit including add, remove, quantity management, and persistence.",
        status: "pending",
        points: 200,
      },
    ],
  },
  {
    id: "m4",
    title: "Module 4: Node.js & Backend",
    status: "locked",
    dueDate: "2026-08-31",
    assignments: [
      {
        id: "a7",
        title: "RESTful API Design",
        description: "Design and implement a complete REST API with authentication, CRUD operations, and validation.",
        status: "pending",
        points: 250,
      },
    ],
  },
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Completed" },
  in_progress: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "In Progress" },
  locked: { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted", label: "Locked" },
  submitted: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", label: "Submitted" },
  graded: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Graded" },
  pending: { icon: FileText, color: "text-muted-foreground", bg: "bg-muted", label: "Not Started" },
  overdue: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Overdue" },
};

export default function AssignmentsPage() {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(
    new Set(["m3"])
  );

  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalAssignments = milestones.reduce((acc, m) => acc + m.assignments.length, 0);
  const completedAssignments = milestones.reduce(
    (acc, m) => acc + m.assignments.filter((a) => a.status === "graded").length,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground mt-1">
          {completedAssignments}/{totalAssignments} assignments completed
        </p>
      </div>

      {/* Progress */}
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

      {/* Milestones */}
      <div className="space-y-4">
        {milestones.map((milestone, i) => {
          const config = statusConfig[milestone.status];
          const isExpanded = expandedMilestones.has(milestone.id);
          const gradedCount = milestone.assignments.filter((a) => a.status === "graded").length;

          return (
            <FadeIn key={milestone.id} delay={i * 0.1}>
              <Card className="overflow-hidden">
                {/* Milestone Header */}
                <button
                  onClick={() => toggleMilestone(milestone.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className={cn("p-2 rounded-lg", config.bg)}>
                    <config.icon className={cn("h-5 w-5", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", config.bg, config.color)}>
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {gradedCount}/{milestone.assignments.length} graded
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due {formatDate(milestone.dueDate)}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {/* Assignments List */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {milestone.assignments.map((assignment) => {
                      const aConfig = statusConfig[assignment.status];
                      return (
                        <div
                          key={assignment.id}
                          className="p-5 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-foreground">{assignment.title}</h4>
                                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", aConfig.bg, aConfig.color)}>
                                  {aConfig.label}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                <span>{assignment.points} points</span>
                                {assignment.submittedAt && (
                                  <span>Submitted {formatDate(assignment.submittedAt)}</span>
                                )}
                              </div>
                              {assignment.grade !== undefined && (
                                <div className="mt-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-green-600">
                                      Grade: {assignment.grade}/{assignment.points}
                                    </span>
                                  </div>
                                  {assignment.feedback && (
                                    <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                                  )}
                                </div>
                              )}
                            </div>
                            {assignment.status === "pending" && (
                              <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
                                Start
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
