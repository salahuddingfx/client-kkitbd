"use client";

import { useState } from "react";
import {
  FolderGit2,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  courseName: string;
  status: "approved" | "pending_review" | "revision_requested" | "not_submitted";
  submittedAt?: string;
  reviewedAt?: string;
  feedback?: string;
  grade?: string;
  repoUrl?: string;
  liveUrl?: string;
  milestones: { title: string; completed: boolean }[];
}

const projects: Project[] = [
  {
    id: "p1",
    title: "E-Commerce Frontend",
    description: "Build a complete e-commerce frontend with product listing, cart, checkout flow, and responsive design using React.",
    courseName: "Complete Web Development Bootcamp",
    status: "approved",
    submittedAt: "2026-06-20",
    reviewedAt: "2026-06-22",
    feedback: "Excellent implementation! Clean component structure, good state management, and polished UI. The responsive design works perfectly across all breakpoints.",
    grade: "A",
    repoUrl: "https://github.com/user/ecommerce-frontend",
    liveUrl: "https://ecommerce-demo.vercel.app",
    milestones: [
      { title: "Product listing page", completed: true },
      { title: "Shopping cart", completed: true },
      { title: "Checkout flow", completed: true },
      { title: "Responsive design", completed: true },
    ],
  },
  {
    id: "p2",
    title: "RESTful Blog API",
    description: "Design and implement a complete blog API with authentication, CRUD, pagination, filtering, and rate limiting.",
    courseName: "Complete Web Development Bootcamp",
    status: "pending_review",
    submittedAt: "2026-07-10",
    milestones: [
      { title: "Authentication system", completed: true },
      { title: "CRUD operations", completed: true },
      { title: "Pagination & filtering", completed: true },
      { title: "Rate limiting", completed: true },
      { title: "API documentation", completed: true },
    ],
  },
  {
    id: "p3",
    title: "Task Management Dashboard",
    description: "Build a Kanban-style task management dashboard with drag-and-drop, user auth, and real-time updates.",
    courseName: "React & Next.js Masterclass",
    status: "revision_requested",
    submittedAt: "2026-07-05",
    feedback: "Good foundation but needs improvements: 1) Add error boundaries, 2) Improve loading states, 3) Add optimistic updates for drag-and-drop. Please resubmit with these fixes.",
    repoUrl: "https://github.com/user/task-dashboard",
    milestones: [
      { title: "Kanban board layout", completed: true },
      { title: "Drag and drop", completed: true },
      { title: "User authentication", completed: true },
      { title: "Real-time updates", completed: false },
      { title: "Error boundaries", completed: false },
    ],
  },
  {
    id: "p4",
    title: "Personal Portfolio Website",
    description: "Design and build a personal portfolio site with animations, dark mode, and contact form.",
    courseName: "UI/UX Design Fundamentals",
    status: "not_submitted",
    milestones: [
      { title: "Wireframe & design", completed: true },
      { title: "Hero & about section", completed: false },
      { title: "Project showcase", completed: false },
      { title: "Contact form", completed: false },
    ],
  },
];

const statusConfig = {
  approved: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", label: "Approved" },
  pending_review: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending Review" },
  revision_requested: { icon: XCircle, color: "text-orange-500", bg: "bg-orange-500/10", label: "Revision Requested" },
  not_submitted: { icon: Upload, color: "text-muted-foreground", bg: "bg-muted", label: "Not Submitted" },
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Submit projects for instructor review and feedback.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          <Upload className="h-4 w-4" />
          Submit New Project
        </button>
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
      <div className="space-y-4">
        {projects.map((project, i) => {
          const config = statusConfig[project.status];
          const completedMilestones = project.milestones.filter((m) => m.completed).length;

          return (
            <FadeIn key={project.id} delay={i * 0.1}>
              <Card className="overflow-hidden hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2.5 rounded-xl", config.bg)}>
                        <FolderGit2 className={cn("h-5 w-5", config.color)} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{project.courseName}</p>
                      </div>
                    </div>
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0", config.bg, config.color)}>
                      {config.label}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                  {/* Milestones Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Milestones</span>
                      <span className="font-medium text-foreground">
                        {completedMilestones}/{project.milestones.length}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${(completedMilestones / project.milestones.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.milestones.map((m) => (
                        <span
                          key={m.title}
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            m.completed
                              ? "bg-green-500/10 text-green-600"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {m.completed ? "✓ " : ""}{m.title}
                        </span>
                      ))}
                    </div>
                  </div>

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
                          <ExternalLink className="h-3 w-3" />
                          Live
                        </a>
                      )}
                      {project.status === "not_submitted" && (
                        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
                          <Upload className="h-3 w-3" />
                          Submit
                        </button>
                      )}
                      {project.status === "revision_requested" && (
                        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
                          <Upload className="h-3 w-3" />
                          Resubmit
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
    </div>
  );
}
