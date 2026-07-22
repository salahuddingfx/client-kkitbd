"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Loader2,
  BarChart3,
  Star,
} from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn } from "@/utils";
import { submissionsApi } from "@/services/api";

interface GradeEntry {
  _id: string;
  assignmentTitle: string;
  courseTitle: string;
  points: number;
  maxPoints: number;
  percentage: number;
  letter: string;
  gradedAt: string;
  feedback: string | null;
  rubricScores: { criterion: string; maxPoints: number; awardedPoints: number; comment?: string }[];
  milestoneProgress: { milestoneTitle: string; completed: boolean; awardedPoints?: number }[];
  isLate: boolean;
  attemptNumber: number;
}

interface CourseGrades {
  courseId: string;
  courseTitle: string;
  submissions: GradeEntry[];
  scaledPoints: number;
  scaledMax: number;
  percentage: number;
  letterGrade: string;
}

interface GradesData {
  maxGrade: number;
  overall: {
    scaledPoints: number;
    maxGrade: number;
    percentage: number;
    letterGrade: string;
    rawTotalPoints: number;
    rawTotalMax: number;
    totalSubmissions: number;
  };
  courses: CourseGrades[];
  submissions: GradeEntry[];
  distribution: Record<string, number>;
}

const gradeColors: Record<string, string> = {
  "A+": "text-green-600 bg-green-500/10",
  A: "text-green-600 bg-green-500/10",
  "A-": "text-green-500 bg-green-500/10",
  "B+": "text-blue-600 bg-blue-500/10",
  B: "text-blue-500 bg-blue-500/10",
  "B-": "text-blue-400 bg-blue-500/10",
  "C+": "text-yellow-600 bg-yellow-500/10",
  C: "text-yellow-500 bg-yellow-500/10",
  "C-": "text-orange-500 bg-orange-500/10",
  "D+": "text-orange-600 bg-orange-500/10",
  D: "text-red-500 bg-red-500/10",
  F: "text-red-600 bg-red-500/10",
};

// GPA based on percentage of 70
function getGPA(pct: number): string {
  if (pct >= 90) return "4.0";
  if (pct >= 80) return "3.5";
  if (pct >= 70) return "3.0";
  if (pct >= 60) return "2.5";
  if (pct >= 50) return "2.0";
  if (pct >= 40) return "1.5";
  if (pct >= 30) return "1.0";
  return "0.0";
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" });
}

const maxDist = (dist: Record<string, number>) => Math.max(...Object.values(dist), 1);

export default function GradesPage() {
  const [data, setData] = useState<GradesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);

  useEffect(() => {
    submissionsApi.getMyGrades()
      .then((res) => { if (res.success) setData(res.data); })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-4">
                <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4.5 w-1/2" />
                  <Skeleton className="h-3.5 w-1/4" />
                </div>
                <Skeleton className="h-8 w-14 rounded-lg shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.submissions.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Grades</h1>
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Grades Yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Submit assignments and projects to see your grades here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { overall, courses, submissions, distribution, maxGrade } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Grades</h1>
        <p className="text-muted-foreground mt-1">
          {overall.totalSubmissions} graded {overall.totalSubmissions === 1 ? "submission" : "submissions"} — Max grade: {maxGrade}
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FadeIn>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Overall Grade</p>
                  <p className="text-2xl font-bold">{overall.letterGrade}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="text-2xl font-bold">{overall.scaledPoints}<span className="text-sm text-muted-foreground">/{maxGrade}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-500/10">
                  <Award className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GPA</p>
                  <p className="text-2xl font-bold">{getGPA(overall.percentage)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-500/10">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Percentage</p>
                  <p className="text-2xl font-bold">{overall.percentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Grade Distribution */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Grade Distribution</h3>
            </div>
            <div className="flex items-end gap-1.5 h-32">
              {Object.entries(distribution).map(([letter, count]) => (
                <div key={letter} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-muted-foreground">{count || ""}</span>
                  <div
                    className={cn(
                      "w-full rounded-t transition-all duration-500 min-h-[2px]",
                      count > 0 ? "bg-primary/80" : "bg-muted"
                    )}
                    style={{ height: `${(count / maxDist(distribution)) * 100}%` }}
                  />
                  <span className="text-[10px] font-medium text-muted-foreground">{letter}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Course breakdown */}
      <FadeIn delay={0.25}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            By Course
          </h3>
          {courses.map((course) => {
            const isExpanded = expandedCourse === course.courseId;
            return (
              <Card key={course.courseId} className="overflow-hidden">
                <button
                  onClick={() => setExpandedCourse(isExpanded ? null : course.courseId)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className={cn("p-2 rounded-lg", gradeColors[course.letterGrade] || "bg-muted")}>
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{course.courseTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {course.submissions.length} {course.submissions.length === 1 ? "submission" : "submissions"} · {course.scaledPoints}/{course.scaledMax} pts
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={cn("text-lg font-bold px-2.5 py-0.5 rounded", gradeColors[course.letterGrade] || "bg-muted")}>
                      {course.letterGrade}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.percentage}%</p>
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                </button>

                {isExpanded && (
                  <div className="border-t divide-y">
                    {course.submissions.map((sub) => {
                      const isSubExpanded = expandedSubmission === sub._id;
                      return (
                        <div key={sub._id}>
                          <button
                            onClick={() => setExpandedSubmission(isSubExpanded ? null : sub._id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/20 transition-colors"
                          >
                            <span className={cn("text-sm font-semibold px-2 py-0.5 rounded", gradeColors[sub.letter] || "bg-muted")}>
                              {sub.letter}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{sub.assignmentTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                {sub.points}/{sub.maxPoints} ({sub.percentage}%)
                                {sub.isLate && <span className="ml-2 text-orange-500">Late</span>}
                                {sub.attemptNumber > 1 && <span className="ml-2 text-muted-foreground">#{sub.attemptNumber}</span>}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">{sub.gradedAt ? formatDate(sub.gradedAt) : ""}</span>
                            {isSubExpanded ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                          </button>

                          {isSubExpanded && (
                            <div className="px-4 pb-4 space-y-3 bg-muted/10">
                              {/* Rubric breakdown */}
                              {sub.rubricScores.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold mb-2">Rubric Breakdown</p>
                                  <div className="space-y-1.5">
                                    {sub.rubricScores.map((r, i) => (
                                      <div key={i} className="flex items-center gap-2 text-sm">
                                        <span className="flex-1 truncate">{r.criterion}</span>
                                        <span className={cn("font-medium", r.awardedPoints >= r.maxPoints ? "text-green-600" : r.awardedPoints >= r.maxPoints * 0.7 ? "text-yellow-600" : "text-red-500")}>
                                          {r.awardedPoints}/{r.maxPoints}
                                        </span>
                                        {r.comment && <span className="text-xs text-muted-foreground italic max-w-[200px] truncate">{r.comment}</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Milestones */}
                              {sub.milestoneProgress.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold mb-2">Milestones</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {sub.milestoneProgress.map((m, i) => (
                                      <span
                                        key={i}
                                        className={cn(
                                          "text-xs px-2 py-0.5 rounded-full",
                                          m.completed ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
                                        )}
                                      >
                                        {m.completed ? "✓ " : ""}{m.milestoneTitle}
                                        {m.awardedPoints ? ` (${m.awardedPoints} pts)` : ""}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Feedback */}
                              {sub.feedback && (
                                <div className="p-3 rounded-lg bg-background border">
                                  <p className="text-xs font-semibold mb-1">Feedback</p>
                                  <p className="text-sm text-muted-foreground">{sub.feedback}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
}
