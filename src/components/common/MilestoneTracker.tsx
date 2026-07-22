"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils";
import { toast } from "sonner";

interface Milestone {
  title: string;
  description?: string;
  maxPoints?: number;
  order?: number;
}

interface MilestoneProgress {
  milestoneTitle: string;
  completed: boolean;
  completedAt?: string;
  awardedPoints?: number;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  progress?: MilestoneProgress[];
  submissionId?: string;
  type?: "assignment" | "project";
  projectId?: string;
  onMilestoneComplete?: () => void;
}

export function MilestoneTracker({
  milestones,
  progress = [],
  submissionId,
  type = "assignment",
  projectId,
  onMilestoneComplete,
}: MilestoneTrackerProps) {
  const [completing, setCompleting] = useState<number | null>(null);

  if (!milestones || milestones.length === 0) return null;

  const totalPoints = milestones.reduce((sum, m) => sum + (m.maxPoints || 0), 0);
  const earnedPoints = progress.filter((p) => p.completed).reduce((sum, p) => sum + (p.awardedPoints || 0), 0);
  const completedCount = progress.filter((p) => p.completed).length;

  const handleComplete = async (index: number) => {
    setCompleting(index);
    try {
      const url = type === "assignment"
        ? `/api/v1/submissions/${submissionId}/milestone/${index}`
        : `/api/v1/projects/${projectId}/milestone/${index}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed");
      }

      toast.success("Milestone completed! +5 XP");
      onMilestoneComplete?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to complete milestone");
    } finally {
      setCompleting(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Milestones</h4>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{milestones.length} done
          {totalPoints > 0 && ` · ${earnedPoints}/${totalPoints} pts`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0}%` }}
        />
      </div>

      {/* Milestone list */}
      <div className="space-y-1.5">
        {milestones.map((m, idx) => {
          const p = progress.find((pr) => pr.milestoneTitle === m.title);
          const isCompleted = p?.completed || false;
          const isCompleting = completing === idx;

          return (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-3 p-2.5 rounded-lg border transition-colors",
                isCompleted ? "bg-primary/5 border-primary/20" : "bg-background hover:bg-muted/50"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", isCompleted && "text-primary")}>
                  {m.title}
                </p>
                {m.description && (
                  <p className="text-xs text-muted-foreground truncate">{m.description}</p>
                )}
              </div>
              {m.maxPoints ? (
                <span className="text-xs text-muted-foreground shrink-0">
                  {isCompleted ? `${m.maxPoints} pts` : `${m.maxPoints} pts`}
                </span>
              ) : null}
              {!isCompleted && submissionId && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs shrink-0"
                  onClick={() => handleComplete(idx)}
                  disabled={isCompleting}
                >
                  {isCompleting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    "Complete"
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
