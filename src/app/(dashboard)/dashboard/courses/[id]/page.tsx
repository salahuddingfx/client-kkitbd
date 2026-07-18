"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Film,
  FileText,
  Code2,
  Paperclip,
  Play,
  Lock,
  Search,
  X,
  Loader2,
  CheckCircle2,
  Clock,
  List,
} from "lucide-react";
import { Button, Badge, Skeleton } from "@/components/ui";
import { cn } from "@/utils";
import { coursesApi, enrollmentsApi, Course } from "@/services/api";
import { VideoPlayer } from "@/components/common/VideoPlayer";

export default function DashboardCourseViewerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));
  const [selectedLesson, setSelectedLesson] = useState<{ moduleIndex: number; lessonIndex: number } | null>(null);
  const [lessonTab, setLessonTab] = useState<"video" | "notes" | "code" | "attachments">("video");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const lessonListRef = useRef<HTMLDivElement>(null);
  const lessonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

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

  const { flatLessons, totalLessons } = useMemo(() => {
    if (!course?.modules) return { flatLessons: [], totalLessons: 0 };
    const flat: { moduleIndex: number; lessonIndex: number; module: string; lesson: Course["modules"][0]["lessons"][0] }[] = [];
    let total = 0;
    course.modules.forEach((mod, mi) => {
      (mod.lessons || []).forEach((lesson, li) => {
        flat.push({ moduleIndex: mi, lessonIndex: li, module: mod.title, lesson });
        total++;
      });
    });
    return { flatLessons: flat, totalLessons: total };
  }, [course]);

  const filteredModules = useMemo(() => {
    if (!course?.modules || !searchQuery.trim()) return course?.modules.map((m, i) => ({ ...m, _index: i })) || [];
    const q = searchQuery.toLowerCase();
    return course.modules
      .map((mod, mi) => {
        const matchedLessons = (mod.lessons || []).filter(
          (l) => l.title.toLowerCase().includes(q) || l.description?.toLowerCase().includes(q)
        );
        if (mod.title.toLowerCase().includes(q) || matchedLessons.length > 0) {
          return { ...mod, _index: mi, lessons: matchedLessons.length > 0 ? matchedLessons : mod.lessons };
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

  const completedCount = enrollment?.progress?.completedLessons || 0;
  const progressPct = enrollment?.progress?.percentage || 0;

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-12 gap-4">
          <Skeleton className="col-span-3 h-[600px] rounded-xl" />
          <Skeleton className="col-span-9 h-[600px] rounded-xl" />
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
            <span>&bull;</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.totalDuration}h</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4">
        {/* Mobile sidebar overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setShowMobileMenu(false)} />
        )}

        {/* Sidebar — lesson list */}
        <div className={cn(
          "lg:col-span-3 xl:col-span-2 border rounded-xl overflow-hidden bg-card",
          showMobileMenu ? "fixed inset-y-0 right-0 z-50 w-80 shadow-2xl lg:relative lg:w-auto" : "hidden lg:block"
        )}>
          {showMobileMenu && (
            <div className="flex items-center justify-between p-3 border-b lg:hidden">
              <span className="font-semibold text-sm">Lessons</span>
              <button onClick={() => setShowMobileMenu(false)} className="p-1"><X className="h-5 w-5" /></button>
            </div>
          )}

          <div className="p-2 border-b border-border sticky top-0 bg-card z-10">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-7 rounded-lg border bg-background text-xs placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          <div ref={lessonListRef} className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 260px)" }}>
            {filteredModules.length === 0 && (
              <p className="p-3 text-xs text-muted-foreground text-center">No lessons found</p>
            )}
            {filteredModules.map((mod) => {
              const mi = mod._index;
              const isExpanded = expandedModules.has(mi);
              const lessonCount = mod.lessons?.length || 0;
              return (
                <div key={mi} className="border-b border-border/50 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleModule(mi)}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted/50 text-left transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Module {mi + 1}</div>
                      <div className="text-xs font-medium text-foreground truncate">{mod.title}</div>
                      <div className="text-[10px] text-muted-foreground">{lessonCount} lessons</div>
                    </div>
                  </button>

                  {isExpanded && mod.lessons && (
                    <div>
                      {mod.lessons.map((lesson, li) => {
                        const isSelected = selectedLesson?.moduleIndex === mi && selectedLesson.lessonIndex === li;
                        const key = `${mi}-${li}`;
                        return (
                          <button
                            key={li}
                            ref={(el) => { if (el) lessonRefs.current.set(key, el); }}
                            type="button"
                            onClick={() => handleLessonClick(mi, li)}
                            className={cn(
                              "w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-left transition-colors border-b border-border/30 last:border-b-0",
                              isSelected ? "bg-primary/10 border-l-2 border-l-primary" : "hover:bg-muted/30"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                              isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                              {lesson.isFree || lesson.videoUrl ? <Play className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
                            </div>
                            <span className={cn("text-xs truncate flex-1", isSelected ? "text-primary font-medium" : "text-foreground")}>
                              {lesson.title}
                            </span>
                            {lesson.duration && <span className="text-[10px] text-muted-foreground shrink-0">{lesson.duration}m</span>}
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

        {/* Main content — lesson viewer */}
        <div className="lg:col-span-9 xl:col-span-10">
          {currentLesson ? (
            <div className="border rounded-xl overflow-hidden border-border bg-card">
              <div className="px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span>Module {(selectedLesson?.moduleIndex ?? 0) + 1}</span>
                  <span>&bull;</span>
                  <span>Lesson {(selectedLesson?.lessonIndex ?? 0) + 1}</span>
                  {currentLesson.duration && <><span>&bull;</span><span>{currentLesson.duration} min</span></>}
                </div>
                <h2 className="text-lg font-semibold text-foreground">{currentLesson.title}</h2>
                {currentLesson.description && (
                  <p className="text-sm text-muted-foreground mt-1">{currentLesson.description}</p>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-border overflow-x-auto">
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
                      "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
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
              <div className="p-5 min-h-[400px]">
                {lessonTab === "video" && (
                  <div>
                    {currentLesson.videoUrl ? (
                      <VideoPlayer url={currentLesson.videoUrl} title={currentLesson.title} />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <Film className="h-12 w-12 mb-3 opacity-40" />
                        <p className="text-sm">No video available for this lesson</p>
                      </div>
                    )}
                  </div>
                )}

                {lessonTab === "notes" && (
                  <div>
                    {currentLesson.notes ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                        {currentLesson.notes}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <FileText className="h-12 w-12 mb-3 opacity-40" />
                        <p className="text-sm">No notes available for this lesson</p>
                      </div>
                    )}
                  </div>
                )}

                {lessonTab === "code" && (
                  <div className="space-y-4">
                    {currentLesson.codeExamples && currentLesson.codeExamples.length > 0 ? (
                      currentLesson.codeExamples.map((ex, ci) => (
                        <div key={ci} className="border rounded-lg overflow-hidden border-border">
                          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                            <span className="text-sm font-medium text-foreground">{ex.title || `Example ${ci + 1}`}</span>
                            <Badge variant="secondary" className="text-xs">{ex.language}</Badge>
                          </div>
                          {ex.description && <p className="px-4 py-2 text-sm text-muted-foreground border-b border-border">{ex.description}</p>}
                          <pre className="p-4 overflow-x-auto text-sm font-mono bg-muted/20 leading-relaxed"><code>{ex.code}</code></pre>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <Code2 className="h-12 w-12 mb-3 opacity-40" />
                        <p className="text-sm">No code examples available for this lesson</p>
                      </div>
                    )}
                  </div>
                )}

                {lessonTab === "attachments" && (
                  <div className="space-y-3">
                    {currentLesson.attachments && currentLesson.attachments.length > 0 ? (
                      currentLesson.attachments.map((att, ai) => (
                        <a
                          key={ai}
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Paperclip className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{att.title || "Attachment"}</div>
                            <div className="text-xs text-muted-foreground uppercase">{att.type}</div>
                          </div>
                          {att.size && <span className="text-xs text-muted-foreground shrink-0">{(att.size / 1024 / 1024).toFixed(1)}MB</span>}
                        </a>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <Paperclip className="h-12 w-12 mb-3 opacity-40" />
                        <p className="text-sm">No attachments available for this lesson</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Prev / Next */}
              {selectedLesson && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                  <Button
                    variant="outline" size="sm"
                    disabled={selectedLesson.moduleIndex === 0 && selectedLesson.lessonIndex === 0}
                    onClick={() => {
                      let { moduleIndex: mi, lessonIndex: li } = selectedLesson;
                      if (li > 0) li--;
                      else if (mi > 0) { mi--; li = (course.modules[mi].lessons?.length || 1) - 1; }
                      handleLessonClick(mi, li);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline" size="sm"
                    disabled={selectedLesson.moduleIndex === course.modules.length - 1 && selectedLesson.lessonIndex >= (course.modules[course.modules.length - 1].lessons?.length || 0) - 1}
                    onClick={() => {
                      let { moduleIndex: mi, lessonIndex: li } = selectedLesson;
                      const currentModLessons = course.modules[mi].lessons?.length || 0;
                      if (li < currentModLessons - 1) li++;
                      else if (mi < course.modules.length - 1) { mi++; li = 0; }
                      handleLessonClick(mi, li);
                    }}
                  >
                    Next <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-xl border-border bg-card flex flex-col items-center justify-center py-20 text-muted-foreground">
              <CheckCircle2 className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1">Select a lesson to start learning</p>
              <p className="text-sm">Click any lesson from the sidebar on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
