"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Film,
  FileText,
  Code2,
  Paperclip,
  Play,
  CheckCircle2,
  Clock,
  List,
  X,
  Loader2,
  Check,
  Circle,
} from "lucide-react";
import { Button, Badge, Skeleton } from "@/components/ui";
import { cn } from "@/utils";
import { coursesApi, enrollmentsApi, Course } from "@/services/api";
import { VideoPlayer } from "@/components/common/VideoPlayer";
import { toast } from "sonner";

export default function DashboardCourseViewerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completingLesson, setCompletingLesson] = useState<string | null>(null);

  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));
  const [selectedLesson, setSelectedLesson] = useState<{ moduleIndex: number; lessonIndex: number } | null>(null);
  const [lessonTab, setLessonTab] = useState<"video" | "notes" | "code" | "attachments">("video");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const lessonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const [courseRes, enrollRes] = await Promise.all([
          coursesApi.getById(id),
          enrollmentsApi.getAll(),
        ]);
        if (courseRes.success) setCourse(courseRes.data || null);
        if (enrollRes.success) {
          const enrollments = enrollRes.data as any[];
          const found = enrollments.find((e: any) => (e.course?._id || e.course?.id || e.course) === id);
          if (found) setEnrollment(found);
        }
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  // Build completed lessons set from user data
  useEffect(() => {
    if (!course?.modules || !enrollment) return;
    // We need to fetch user's completed lessons — use getMe
    import("@/services/api").then(({ authApi }) => {
      authApi.getMe().then((res) => {
        if (res.success) {
          const u = res.data as any;
          const completed = new Set<string>();
          (u.completedLessons || []).forEach((cl: any) => {
            const courseId = typeof cl.course === "string" ? cl.course : cl.course?._id;
            if (courseId === id) {
              const lessonId = typeof cl.lesson === "string" ? cl.lesson : cl.lesson?._id;
              completed.add(lessonId);
            }
          });
          setCompletedLessons(completed);
        }
      }).catch(() => {});
    });
  }, [course, enrollment, id]);

  const { totalLessons } = useMemo(() => {
    if (!course?.modules) return { flatLessons: [], totalLessons: 0 };
    let total = 0;
    course.modules.forEach((mod) => { total += mod.lessons?.length || 0; });
    return { flatLessons: [], totalLessons: total };
  }, [course]);

  const filteredModules = useMemo(() => {
    if (!course?.modules || !searchQuery.trim()) return course?.modules.map((m, i) => ({ ...m, _index: i })) || [];
    const q = searchQuery.toLowerCase();
    return course.modules
      .map((mod, mi) => {
        const matched = (mod.lessons || []).filter(
          (l) => l.title.toLowerCase().includes(q) || l.description?.toLowerCase().includes(q)
        );
        if (mod.title.toLowerCase().includes(q) || matched.length > 0) {
          return { ...mod, _index: mi, lessons: matched.length > 0 ? matched : mod.lessons };
        }
        return null;
      })
      .filter(Boolean) as (Course["modules"][0] & { _index: number })[];
  }, [course, searchQuery]);

  const toggleModule = useCallback((mi: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(mi)) next.delete(mi);
      else next.add(mi);
      return next;
    });
  }, []);

  const handleLessonClick = useCallback((mi: number, li: number) => {
    setSelectedLesson({ moduleIndex: mi, lessonIndex: li });
    setLessonTab("video");
    setExpandedModules((prev) => new Set(prev).add(mi));
    setShowMobileMenu(false);
    setTimeout(() => {
      const key = `${mi}-${li}`;
      lessonRefs.current.get(key)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }, []);

  useEffect(() => {
    if (course?.modules && !selectedLesson) {
      for (let mi = 0; mi < course.modules.length; mi++) {
        if (course.modules[mi].lessons?.length) {
          handleLessonClick(mi, 0);
          break;
        }
      }
    }
  }, [course, selectedLesson, handleLessonClick]);

  const currentLesson = selectedLesson && course?.modules
    ? course.modules[selectedLesson.moduleIndex]?.lessons?.[selectedLesson.lessonIndex]
    : null;

  const currentLessonId = useMemo(() => {
    if (!currentLesson || !course?.modules || !selectedLesson) return null;
    let idx = 0;
    for (let mi = 0; mi <= selectedLesson.moduleIndex; mi++) {
      const lessons = course.modules[mi].lessons || [];
      if (mi === selectedLesson.moduleIndex) {
        idx += selectedLesson.lessonIndex;
        break;
      }
      idx += lessons.length;
    }
    return `lesson-${idx}`;
  }, [currentLesson, course, selectedLesson]);

  const handleToggleComplete = async () => {
    if (!enrollment?._id || !currentLessonId || !currentLesson) return;
    setCompletingLesson(currentLessonId);
    try {
      const res = await enrollmentsApi.toggleLessonComplete(enrollment._id, currentLessonId);
      if (res.success && res.data) {
        setCompletedLessons((prev) => {
          const next = new Set(prev);
          if (res.data.completed) next.add(currentLessonId);
          else next.delete(currentLessonId);
          return next;
        });
        setEnrollment((prev: any) => prev ? {
          ...prev,
          progress: {
            ...prev.progress,
            completedLessons: res.data.completedCount,
            percentage: res.data.percentage,
          }
        } : prev);
        toast.success(res.data.completed ? "Lesson completed!" : "Lesson marked incomplete");
      }
    } catch {
      toast.error("Failed to update lesson status");
    } finally {
      setCompletingLesson(null);
    }
  };

  const isCurrentCompleted = currentLessonId ? completedLessons.has(currentLessonId) : false;
  const progressPct = enrollment?.progress?.percentage || 0;

  // Prev/Next helpers
  const goToPrev = () => {
    if (!selectedLesson || !course?.modules) return;
    let { moduleIndex: mi, lessonIndex: li } = selectedLesson;
    if (li > 0) li--;
    else if (mi > 0) { mi--; li = (course.modules[mi].lessons?.length || 1) - 1; }
    handleLessonClick(mi, li);
  };

  const goToNext = () => {
    if (!selectedLesson || !course?.modules) return;
    let { moduleIndex: mi, lessonIndex: li } = selectedLesson;
    const currentModLessons = course.modules[mi].lessons?.length || 0;
    if (li < currentModLessons - 1) li++;
    else if (mi < course.modules.length - 1) { mi++; li = 0; }
    handleLessonClick(mi, li);
  };

  const isPrevDisabled = selectedLesson?.moduleIndex === 0 && selectedLesson?.lessonIndex === 0;
  const isNextDisabled = selectedLesson?.moduleIndex === (course?.modules?.length || 0) - 1
    && selectedLesson?.lessonIndex >= ((course?.modules?.[selectedLesson.moduleIndex]?.lessons?.length || 1) - 1);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-12 gap-4">
          <Skeleton className="col-span-8 h-[500px] rounded-xl" />
          <Skeleton className="col-span-4 h-[500px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg font-medium mb-4">Course not found</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/courses"><ArrowLeft className="h-4 w-4 mr-2" /> Back to My Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/courses">
            <ArrowLeft className="h-4 w-4 mr-1" /> My Courses
          </Link>
        </Button>
        <div className="h-4 w-px bg-border" />
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground truncate">{course.title}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
            <span>{course.modules?.length || 0} modules</span>
            <span>&bull;</span>
            <span>{totalLessons} lessons</span>
            {progressPct > 0 && (
              <>
                <span>&bull;</span>
                <span className="text-primary font-medium">{progressPct}% complete</span>
              </>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
          <List className="h-4 w-4 mr-1" /> Lessons
        </Button>
      </div>

      {/* Progress bar */}
      {progressPct > 0 && (
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT — Video + Tabs + Prev/Next */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          {currentLesson ? (
            <div className="border rounded-xl overflow-hidden border-border bg-card">
              {/* Video player */}
              <div className="aspect-video bg-black">
                {currentLesson.videoUrl ? (
                  <VideoPlayer url={currentLesson.videoUrl} title={currentLesson.title} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Film className="h-12 w-12 mb-3 opacity-40" />
                    <p className="text-sm">No video available for this lesson</p>
                  </div>
                )}
              </div>

              {/* Tabs row */}
              <div className="flex items-center gap-0 border-t border-border overflow-x-auto">
                {[
                  { key: "video" as const, icon: Film, label: "Video" },
                  { key: "notes" as const, icon: FileText, label: "Notes" },
                  { key: "code" as const, icon: Code2, label: "Code" },
                  { key: "attachments" as const, icon: Paperclip, label: "Attachments" },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setLessonTab(t.key)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-1 justify-center",
                      lessonTab === t.key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <t.icon className="h-4 w-4" /> {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-5 min-h-[200px]">
                {lessonTab === "notes" && (
                  currentLesson.notes ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                      {currentLesson.notes}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <FileText className="h-10 w-10 mb-2 opacity-40" />
                      <p className="text-sm">No notes for this lesson</p>
                    </div>
                  )
                )}

                {lessonTab === "code" && (
                  currentLesson.codeExamples && currentLesson.codeExamples.length > 0 ? (
                    <div className="space-y-4">
                      {currentLesson.codeExamples.map((ex, ci) => (
                        <div key={ci} className="border rounded-lg overflow-hidden border-border">
                          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                            <span className="text-sm font-medium text-foreground">{ex.title || `Example ${ci + 1}`}</span>
                            <Badge variant="secondary" className="text-xs">{ex.language}</Badge>
                          </div>
                          {ex.description && <p className="px-4 py-2 text-sm text-muted-foreground border-b border-border">{ex.description}</p>}
                          <pre className="p-4 overflow-x-auto text-sm font-mono bg-muted/20 leading-relaxed"><code>{ex.code}</code></pre>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Code2 className="h-10 w-10 mb-2 opacity-40" />
                      <p className="text-sm">No code examples for this lesson</p>
                    </div>
                  )
                )}

                {lessonTab === "attachments" && (
                  currentLesson.attachments && currentLesson.attachments.length > 0 ? (
                    <div className="space-y-3">
                      {currentLesson.attachments.map((att, ai) => (
                        <a key={ai} href={att.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Paperclip className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{att.title || "Attachment"}</div>
                            <div className="text-xs text-muted-foreground uppercase">{att.type}</div>
                          </div>
                          {att.size && <span className="text-xs text-muted-foreground shrink-0">{(att.size / 1024 / 1024).toFixed(1)}MB</span>}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <Paperclip className="h-10 w-10 mb-2 opacity-40" />
                      <p className="text-sm">No attachments for this lesson</p>
                    </div>
                  )
                )}
              </div>

              {/* Prev / Next + Complete toggle */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                <Button variant="outline" size="sm" disabled={isPrevDisabled} onClick={goToPrev}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>

                <Button
                  variant={isCurrentCompleted ? "default" : "outline"}
                  size="sm"
                  disabled={!!completingLesson}
                  onClick={handleToggleComplete}
                  className={cn(
                    "gap-1.5",
                    isCurrentCompleted && "bg-green-600 hover:bg-green-700 text-white"
                  )}
                >
                  {completingLesson === currentLessonId ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isCurrentCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  {isCurrentCompleted ? "Completed" : "Mark Complete"}
                </Button>

                <Button variant="outline" size="sm" disabled={isNextDisabled} onClick={goToNext}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-xl border-border bg-card flex flex-col items-center justify-center py-20 text-muted-foreground">
              <CheckCircle2 className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1">Select a lesson to start learning</p>
              <p className="text-sm">Click any lesson from the sidebar on the right</p>
            </div>
          )}
        </div>

        {/* RIGHT — Module/Lesson sidebar */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className={cn(
            "border rounded-xl border-border bg-card overflow-hidden",
            showMobileMenu ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:relative lg:bg-card" : ""
          )}>
            {showMobileMenu && (
              <div className="flex items-center justify-between p-3 border-b lg:hidden">
                <span className="font-semibold text-sm">Course Lessons</span>
                <button onClick={() => setShowMobileMenu(false)} className="p-1"><X className="h-5 w-5" /></button>
              </div>
            )}

            <div className={cn(showMobileMenu && "absolute right-0 top-0 h-full w-80 bg-card border-l shadow-2xl overflow-hidden flex flex-col")}>
              {/* Search */}
              <div className="p-3 border-b border-border sticky top-0 bg-card z-10">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><List className="h-4 w-4" /></span>
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 pl-9 pr-8 rounded-lg border bg-background text-sm placeholder:text-muted-foreground"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              {/* Module list */}
              <div className="overflow-y-auto flex-1" style={{ maxHeight: showMobileMenu ? "100%" : "calc(100vh - 220px)" }}>
                {filteredModules.length === 0 && (
                  <p className="p-4 text-sm text-muted-foreground text-center">No lessons found</p>
                )}
                {filteredModules.map((mod) => {
                  const mi = mod._index;
                  const isExpanded = expandedModules.has(mi);
                  const lessonCount = mod.lessons?.length || 0;
                  return (
                    <div key={mi} className="border-b border-border last:border-b-0">
                      <button
                        type="button"
                        onClick={() => toggleModule(mi)}
                        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 text-left transition-colors"
                      >
                        {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Module {mi + 1}</div>
                          <div className="text-sm font-medium text-foreground truncate">{mod.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{lessonCount} lessons</div>
                        </div>
                      </button>

                      {isExpanded && mod.lessons && (
                        <div>
                          {mod.lessons.map((lesson, li) => {
                            let lessonIdx = 0;
                            for (let m = 0; m < mi; m++) { lessonIdx += course.modules[m].lessons?.length || 0; }
                            lessonIdx += li;
                            const lessonId = `lesson-${lessonIdx}`;
                            const isSelected = selectedLesson?.moduleIndex === mi && selectedLesson.lessonIndex === li;
                            const isDone = completedLessons.has(lessonId);
                            return (
                              <button
                                key={li}
                                ref={(el) => { if (el) lessonRefs.current.set(`${mi}-${li}`, el); }}
                                type="button"
                                onClick={() => handleLessonClick(mi, li)}
                                className={cn(
                                  "w-full flex items-center gap-2 pl-10 pr-3 py-2 text-left transition-colors border-b border-border/50 last:border-b-0",
                                  isSelected ? "bg-primary/10 border-l-2 border-l-primary" : "hover:bg-muted/30"
                                )}
                              >
                                <div className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                                  isDone ? "bg-green-500 text-white" : isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                )}>
                                  {isDone ? <Check className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className={cn("text-sm truncate", isSelected ? "text-primary font-medium" : "text-foreground")}>
                                    {lesson.title}
                                  </div>
                                </div>
                                {lesson.duration && <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}m</span>}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
