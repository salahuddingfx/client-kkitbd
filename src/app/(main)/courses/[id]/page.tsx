"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Play,
  Heart,
  Share2,
  Loader2,
  ChevronDown,
  ChevronRight,
  Film,
  FileText,
  Code2,
  Paperclip,
  Lock,
  Search,
  List,
  X,
} from "lucide-react";
import { Button, Badge, GlowCard } from "@/components/ui";
import { Breadcrumb, Container, ShareButtons, PaymentModal } from "@/components/common";
import { CourseOutlineForm } from "@/components/common/CourseOutlineForm";
import { HowItWorksSection } from "@/components/common/HowItWorksSection";
import { VideoPlayer } from "@/components/common/VideoPlayer";
import { coursesApi, Course } from "@/services/api";
import { useAppSelector } from "@/redux/hooks";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAppSelector((state) => state.auth);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showOutlineForm, setShowOutlineForm] = useState(false);

  // Curriculum navigation
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [selectedLesson, setSelectedLesson] = useState<{ moduleIndex: number; lessonIndex: number } | null>(null);
  const [lessonTab, setLessonTab] = useState<"video" | "notes" | "code" | "attachments">("video");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const lessonListRef = useRef<HTMLDivElement>(null);
  const lessonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await coursesApi.getById(id);
        setCourse(res.data || null);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  // Compute flat lesson list and progress
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

  // Search filter
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
    // Scroll to selected lesson in sidebar
    setTimeout(() => {
      const key = `${mi}-${li}`;
      lessonRefs.current.get(key)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }, []);

  // Auto-select first lesson
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

  if (loading) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The course you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const instructorName = course.instructor?.name || "Instructor";
  const instructorInitials = instructorName.split(" ").map((n: string) => n[0]).join("");

  const currentLesson = selectedLesson && course.modules
    ? course.modules[selectedLesson.moduleIndex]?.lessons?.[selectedLesson.lessonIndex]
    : null;
  const currentModule = selectedLesson && course.modules
    ? course.modules[selectedLesson.moduleIndex]
    : null;

  const completedCount = 0; // TODO: fetch from enrollment progress

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 bg-background-secondary">
        <Container>
          <Breadcrumb
            items={[
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge>{course.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {course.title}
              </h1>

              <p className="text-muted-foreground text-lg">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">
                    {course.rating?.average?.toFixed(1) || "N/A"}
                  </span>
                  ({course.rating?.count || 0} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.enrolledStudents?.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.totalDuration}h total
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {totalLessons} lessons
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {instructorInitials}
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{instructorName}</div>
                  <div className="text-xs text-muted-foreground">Instructor</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                      : "bg-background border-border text-muted-foreground hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`}
                  />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <ShareButtons title={course.title} />
              </div>
            </div>

            {/* Right — Enrollment Card */}
            <div>
              <GlowCard variant="neu" className="p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ৳{(course.discountPrice || course.price).toLocaleString()}
                  </div>
                  {course.discountPrice && course.discountPrice < course.price && (
                    <p className="text-xs text-muted-foreground line-through">
                      ৳{course.price.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    One-time payment &bull; Lifetime access
                  </p>
                </div>

                <Button
                  className="w-full h-12"
                  size="lg"
                  onClick={() => {
                    if (!user) {
                      router.push(`/login?redirect=/courses/${id}`);
                      return;
                    }
                    setShowPayment(true);
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {user ? "Enroll Now" : "Login to Enroll"}
                </Button>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">This course includes:</h4>
                  {[
                    `${course.totalDuration}h of on-demand video`,
                    `${totalLessons} comprehensive lessons`,
                    "Certificate of completion",
                    "Lifetime access & updates",
                    "Downloadable resources",
                    "Mobile & TV access",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>
        </Container>
      </section>

      {/* Curriculum + Lesson Viewer */}
      {course.modules && course.modules.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Section header with stats */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Course Curriculum</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.modules.length} modules &bull; {totalLessons} lessons &bull; {course.totalDuration}h total
                    {completedCount > 0 && <span className="ml-2 text-primary">&bull; {completedCount} completed</span>}
                  </p>
                </div>
                {/* Mobile: open sidebar */}
                <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
                  <List className="h-4 w-4 mr-2" /> Lessons
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
                {/* Left — Module/Lesson list (scrollable sidebar) */}
                <div className={`${showMobileMenu ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "hidden"} lg:block lg:col-span-4 xl:col-span-3`}>
                  <div className={`${showMobileMenu ? "absolute right-0 top-0 h-full w-80 bg-background border-l shadow-2xl" : ""} lg:relative lg:w-full`}>
                    {/* Mobile close button */}
                    {showMobileMenu && (
                      <div className="flex items-center justify-between p-3 border-b lg:hidden">
                        <span className="font-semibold text-sm">Course Lessons</span>
                        <button onClick={() => setShowMobileMenu(false)} className="p-1"><X className="h-5 w-5" /></button>
                      </div>
                    )}

                    {/* Search */}
                    <div className="p-3 border-b border-border sticky top-0 bg-background z-10">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                    <div ref={lessonListRef} className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                      {filteredModules.length === 0 && (
                        <p className="p-4 text-sm text-muted-foreground text-center">No lessons match your search</p>
                      )}
                      {filteredModules.map((mod) => {
                        const mi = mod._index;
                        const isExpanded = expandedModules.has(mi);
                        const moduleLessonCount = mod.lessons?.length || 0;
                        const moduleCompleted = 0;
                        return (
                          <div key={mi} className="border-b border-border last:border-b-0">
                            {/* Module header */}
                            <button
                              type="button"
                              onClick={() => toggleModule(mi)}
                              className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 text-left transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-foreground truncate uppercase tracking-wider">
                                  Module {mi + 1}
                                </div>
                                <div className="text-sm font-medium text-foreground truncate mt-0.5">
                                  {mod.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {moduleLessonCount} lessons
                                  {moduleCompleted > 0 && <span className="text-primary"> &bull; {moduleCompleted} done</span>}
                                </div>
                              </div>
                            </button>

                            {/* Lessons inside module */}
                            {isExpanded && mod.lessons && (
                              <div>
                                {mod.lessons.map((lesson, li) => {
                                  const actualMi = mi;
                                  const isSelected = selectedLesson?.moduleIndex === actualMi && selectedLesson.lessonIndex === li;
                                  const key = `${actualMi}-${li}`;
                                  return (
                                    <button
                                      key={li}
                                      ref={(el) => { if (el) lessonRefs.current.set(key, el); }}
                                      type="button"
                                      onClick={() => handleLessonClick(actualMi, li)}
                                      className={`w-full flex items-center gap-2.5 pl-10 pr-3 py-2 text-left transition-colors border-b border-border/50 last:border-b-0 ${
                                        isSelected
                                          ? "bg-primary/10 border-l-2 border-l-primary"
                                          : "hover:bg-muted/30"
                                      }`}
                                    >
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                      }`}>
                                        {lesson.isFree || lesson.videoUrl ? (
                                          <Play className="h-3 w-3" />
                                        ) : (
                                          <Lock className="h-3 w-3" />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className={`text-sm truncate ${isSelected ? "text-primary font-medium" : "text-foreground"}`}>
                                          {lesson.title}
                                        </div>
                                      </div>
                                      {lesson.duration && (
                                        <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}m</span>
                                      )}
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

                {/* Right — Lesson viewer (sticky) */}
                <div className="lg:col-span-8 xl:col-span-9">
                  <div className="lg:sticky lg:top-20">
                    {currentLesson ? (
                      <div className="border rounded-xl overflow-hidden border-border bg-background">
                        {/* Viewer header */}
                        <div className="px-5 py-4 border-b border-border bg-background-secondary">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span>Module {(selectedLesson?.moduleIndex ?? 0) + 1}</span>
                            <span>&bull;</span>
                            <span>Lesson {(selectedLesson?.lessonIndex ?? 0) + 1}</span>
                            {currentLesson.duration && <><span>&bull;</span><span>{currentLesson.duration} min</span></>}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">{currentLesson.title}</h3>
                          {currentLesson.description && (
                            <p className="text-sm text-muted-foreground mt-1">{currentLesson.description}</p>
                          )}
                        </div>

                        {/* Viewer tabs */}
                        <div className="flex gap-0 border-b border-border bg-background-secondary overflow-x-auto">
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
                              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                lessonTab === t.key
                                  ? "border-primary text-primary"
                                  : "border-transparent text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <t.icon className="h-4 w-4" /> {t.label}
                            </button>
                          ))}
                        </div>

                        {/* Viewer content */}
                        <div className="p-5 min-h-[400px]">
                          {lessonTab === "video" && (
                            <div>
                              {currentLesson.videoUrl ? (
                                <VideoPlayer
                                  url={currentLesson.videoUrl}
                                  title={currentLesson.title}
                                />
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
                                    {ex.description && (
                                      <p className="px-4 py-2 text-sm text-muted-foreground border-b border-border">{ex.description}</p>
                                    )}
                                    <pre className="p-4 overflow-x-auto text-sm font-mono bg-muted/20 leading-relaxed">
                                      <code>{ex.code}</code>
                                    </pre>
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
                                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                        {att.title || "Attachment"}
                                      </div>
                                      <div className="text-xs text-muted-foreground uppercase">{att.type}</div>
                                    </div>
                                    {att.size && (
                                      <span className="text-xs text-muted-foreground shrink-0">
                                        {(att.size / 1024 / 1024).toFixed(1)}MB
                                      </span>
                                    )}
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

                        {/* Prev/Next navigation */}
                        {selectedLesson && (
                          <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-background-secondary">
                            <Button
                              variant="outline"
                              size="sm"
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
                              variant="outline"
                              size="sm"
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
                      <div className="border rounded-xl border-border bg-background flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <BookOpen className="h-16 w-16 mb-4 opacity-30" />
                        <p className="text-lg font-medium mb-1">Select a lesson to start learning</p>
                        <p className="text-sm">Click any lesson from the curriculum on the left</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* How This Bootcamp Works */}
      <HowItWorksSection />

      {/* Download Course Outline */}
      <section className="py-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Download Course Outline
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get the complete course outline including curriculum, duration, and module details sent to your email
            </p>
            <button
              onClick={() => setShowOutlineForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-all outline-btn-pulse"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Get Course Outline
            </button>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-white/80 mb-8">
              Join {course.enrolledStudents?.toLocaleString() || 0} students already enrolled.
            </p>
            <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/register">
                Enroll Now — ৳{(course.discountPrice || course.price).toLocaleString()}
              </Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Course Outline Modal */}
      {showOutlineForm && (
        <CourseOutlineForm
          courseName={course.title}
          courseId={course._id}
          onClose={() => setShowOutlineForm(false)}
        />
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        courseId={course._id}
        courseTitle={course.title}
        amount={course.discountPrice || course.price}
      />
    </>
  );
}
