"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTechInfo } from "@/utils/techIcons";
import {
  Clock,
  Users,
  Star,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Play,
  Heart,
  ChevronDown,
  ChevronRight,
  Lock,
  Target,
  Lightbulb,
  Layers,
  FolderKanban,
  Award,
  GraduationCap,
  Globe,
  Download,
  Zap,
  Trophy,
  Infinity,
  BarChart3,
  Share2,
} from "lucide-react";
import { Button, Badge, Skeleton } from "@/components/ui";
import { Container, ShareButtons } from "@/components/common";
import { CourseOfferBanner } from "@/components/common/CourseOfferBanner";
import { CourseOutlineForm } from "@/components/common/CourseOutlineForm";
import { HowItWorksSection } from "@/components/common/HowItWorksSection";
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
  const [showOutlineForm, setShowOutlineForm] = useState(false);

  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        let res;
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        if (isObjectId) {
          try {
            res = await coursesApi.getById(id);
          } catch {
            res = await coursesApi.getBySlug(id);
          }
        } else {
          res = await coursesApi.getBySlug(id);
        }
        setCourse(res.data || null);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  const totalLessons = useMemo(() => {
    if (!course?.modules) return 0;
    return course.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  }, [course]);

  const toggleModule = (mi: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(mi)) next.delete(mi);
      else next.add(mi);
      return next;
    });
  };

  const handleTabClick = (tabId: string) => {
    setActiveSection(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleEnroll = () => {
    if (!user) { router.push(`/login?redirect=/checkout/${id}`); return; }
    router.push(`/checkout/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero skeleton */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-12 w-3/4 bg-white/10" />
                <Skeleton className="h-5 w-full bg-white/10" />
                <Skeleton className="h-5 w-2/3 bg-white/10" />
                <div className="flex gap-4 pt-2">
                  {[1,2,3,4].map(i => <Skeleton key={i} className="h-5 w-24 bg-white/10" />)}
                </div>
              </div>
              <div>
                <Skeleton className="h-80 w-full rounded-2xl bg-white/10" />
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div className="py-12 space-y-6">
            {[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
          </div>
        </Container>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button asChild>
            <Link href="/courses"><ArrowLeft className="mr-2 h-4 w-4" /> Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const instructorName = course.instructor?.name || "Instructor";
  const instructorInitials = instructorName.split(" ").map((n: string) => n[0]).join("");
  const discountPct = course.discountPrice && course.price
    ? Math.round((1 - course.discountPrice / course.price) * 100)
    : 0;

  return (
    <>
      {/* ─── Scroll Progress Bar ─── */}
      <div
        className="fixed top-0 left-0 z-[999] h-[3px] bg-gradient-to-r from-primary via-orange-400 to-primary transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px rgba(220,38,38,0.6)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: scrollProgress > 5 ? 1 : 0, scale: scrollProgress > 5 ? 1 : 0.8, y: scrollProgress > 5 ? 0 : 20 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white text-xs font-bold flex flex-col items-center justify-center shadow-xl"
        style={{ boxShadow: "0 0 0 4px rgba(220,38,38,0.2), 0 8px 32px rgba(220,38,38,0.4)" }}
      >
        <span className="text-sm font-black">{Math.round(scrollProgress)}%</span>
        <span className="text-[8px] opacity-70">done</span>
      </motion.div>

      {/* ─── Hero Banner ─── */}
      <section className="bg-background-secondary pt-20 pb-0 relative overflow-hidden border-b border-border">
        {/* Decorative bg elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/courses" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Courses
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-xs">{course.title}</span>
          </div>

          <div className="max-w-3xl space-y-4 pb-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {typeof course.category === "object" ? course.category?.name : course.category}
              </Badge>
              <Badge>{course.level}</Badge>
              {discountPct > 0 && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/25">{discountPct}% OFF</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              {course.title}
            </h1>

            {/* Short desc */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {course.shortDescription || course.description?.substring(0, 180)}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-yellow-500 font-medium">
                <Star className="h-4 w-4 fill-yellow-500" />
                {course.rating?.average?.toFixed(1) || "N/A"}
                <span className="text-muted-foreground font-normal">({course.rating?.count || 0} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-4 w-4 text-blue-500" />
                {course.enrolledStudents?.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4 text-green-500" />
                {course.totalDuration}h total
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="h-4 w-4 text-purple-500" />
                {totalLessons} lessons
              </span>
              {course.language && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="h-4 w-4 text-orange-500" />
                  {course.language}
                </span>
              )}
            </div>

            {/* Instructor strip */}
            <div className="flex items-center gap-3">
              {course.instructor?.avatar?.url ? (
                <img src={course.instructor.avatar.url} alt={instructorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center text-sm font-bold text-primary">{instructorInitials}</div>
              )}
              <div>
                <div className="text-foreground font-medium text-sm">{instructorName}</div>
                <div className="text-muted-foreground text-xs">{course.instructor?.designation || "Instructor"}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  isWishlisted
                    ? "bg-red-500/10 border-red-500/30 text-red-500"
                    : "border-border text-muted-foreground hover:border-red-500/30 hover:text-red-500 bg-background"
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <ShareButtons title={course.title} />
            </div>
          </div>

          {/* Quick nav tabs */}
          <div className="flex items-center gap-1 border-t border-border overflow-x-auto">
            {[
              { id: "overview", label: "Overview" },
              { id: "curriculum", label: "Curriculum" },
              { id: "instructor", label: "Instructor" },
              { id: "tech", label: "Tech Stack" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeSection === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Mobile Enroll Card ─── */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b border-border shadow-lg">
        <Container>
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-primary">৳{(course.discountPrice || course.price)?.toLocaleString()}</div>
              {course.discountPrice && course.discountPrice < course.price && (
                <div className="text-xs text-muted-foreground line-through">৳{course.price?.toLocaleString()}</div>
              )}
            </div>
            <Button className="flex-1 max-w-xs h-10" onClick={handleEnroll}>
              <Play className="mr-2 h-4 w-4" />
              {user ? "Enroll Now" : "Login to Enroll"}
            </Button>
          </div>
        </Container>
      </div>

      {/* ─── Main Content ─── */}
      <div className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left content col */}
            <div className="lg:col-span-2 space-y-6">

              {/* ─── OVERVIEW TAB VIEW ─── */}
              {activeSection === "overview" && (
                <div className="space-y-6">
                  {/* Detailed Description */}
                  {course.description && (
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-3">
                      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" /> Course Overview & Details
                      </h2>
                      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line space-y-2">
                        {course.description}
                      </div>
                    </div>
                  )}

                  {/* What You'll Learn */}
                  {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" /> What You&apos;ll Learn
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {course.learningOutcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prerequisites */}
                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" /> Prerequisites
                      </h2>
                      <div className="space-y-2">
                        {course.prerequisites.map((prereq, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="text-yellow-500 font-bold mt-0.5">→</span>
                            <span className="text-sm text-muted-foreground">{prereq}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {course.highlights && course.highlights.length > 0 && (
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" /> Course Highlights
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── CURRICULUM TAB VIEW ─── */}
              {activeSection === "curriculum" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Course Curriculum</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.modules?.length || 0} modules • {totalLessons} lessons • {course.totalDuration}h total
                      </p>
                    </div>
                    {course.modules && course.modules.length > 0 && (
                      <button
                        onClick={() => setExpandedModules(expandedModules.size === course.modules!.length ? new Set() : new Set(course.modules!.map((_, i) => i)))}
                        className="text-xs text-primary hover:underline font-semibold"
                      >
                        {expandedModules.size === course.modules.length ? "Collapse all" : "Expand all"}
                      </button>
                    )}
                  </div>

                  {course.modules && course.modules.length > 0 ? (
                    <div className="space-y-2">
                      {course.modules.map((mod, mi) => {
                        const isExpanded = expandedModules.has(mi);
                        const lessonCount = mod.lessons?.length || 0;
                        return (
                          <div key={mi} className="border border-border rounded-xl overflow-hidden">
                            <button
                              type="button"
                              onClick={() => toggleModule(mi)}
                              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 text-left transition-colors cursor-pointer"
                            >
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${isExpanded ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                                {mi + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-foreground">{mod.title}</div>
                                {mod.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{mod.description}</p>}
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs text-muted-foreground">{lessonCount} lessons</span>
                                {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                              </div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && mod.lessons && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden border-t border-border"
                                >
                                  {mod.lessons.map((lesson, li) => (
                                    <div key={li} className="flex items-center gap-3 px-4 py-2.5 border-b border-border/40 last:border-b-0 hover:bg-muted/30 transition-colors">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${lesson.isFree ? "bg-green-500/10" : "bg-muted"}`}>
                                        {lesson.isFree ? (
                                          <Play className="h-3 w-3 text-green-500" />
                                        ) : (
                                          <Lock className="h-3 w-3 text-muted-foreground" />
                                        )}
                                      </div>
                                      <span className="text-sm text-foreground flex-1 truncate">{lesson.title}</span>
                                      <div className="flex items-center gap-2 shrink-0">
                                        {lesson.isFree && <Badge variant="secondary" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">Free</Badge>}
                                        {lesson.duration && <span className="text-xs text-muted-foreground">{lesson.duration}m</span>}
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No curriculum modules published yet.
                    </div>
                  )}
                </div>
              )}

              {/* ─── INSTRUCTOR TAB VIEW ─── */}
              {activeSection === "instructor" && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" /> Dedicated Course Teaching & Support Team
                  </h2>

                  {/* Section 1: Lead Instructor */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">1. Lead Instructor (প্রধান নির্দেশক)</h3>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-4">
                      {course.instructor?.avatar?.url ? (
                        <img src={course.instructor.avatar.url} alt={instructorName} className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/40 shrink-0" />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-primary/10 ring-2 ring-primary/30 flex items-center justify-center text-2xl font-bold text-primary shrink-0">{instructorInitials}</div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground text-base">{instructorName}</span>
                          <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30">Lead Instructor</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">{course.instructor?.designation || "Senior Technical Lead & Educator"}</p>
                        {course.instructor?.bio && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{course.instructor.bio}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Dedicated Mentors */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">2. Dedicated Mentors (২-৪ জন মেন্টর সাপোর্ট)</h3>
                    {course.mentors && course.mentors.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {course.mentors.map((m, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border bg-background flex items-center gap-3">
                            {m.user?.avatar?.url ? (
                              <img src={m.user.avatar.url} alt="" className="h-12 w-12 rounded-full object-cover ring-1 ring-border shrink-0" />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-lg font-bold text-indigo-600 shrink-0">{m.user?.name?.charAt(0) || "M"}</div>
                            )}
                            <div className="min-w-0">
                              <div className="font-bold text-foreground text-sm truncate">{m.user?.name || `Mentor #${i + 1}`}</div>
                              <div className="text-[11px] text-indigo-600 font-semibold">Course Mentor</div>
                              <div className="text-[11px] text-muted-foreground truncate">{m.user?.designation || "Support & Code Review Specialist"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-dashed border-border text-xs text-muted-foreground text-center">
                        All enrolled students receive 24/7 dedicated mentor 1-on-1 code reviews and support.
                      </div>
                    )}
                  </div>

                  {/* Section 3: Co-Trainers & Assistants */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3">3. Co-Trainers & Assistants (সহকারী ট্রেইনারগণ)</h3>
                    {course.trainers && course.trainers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {course.trainers.map((t, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border bg-background flex items-center gap-3">
                            {t.user?.avatar?.url ? (
                              <img src={t.user.avatar.url} alt="" className="h-12 w-12 rounded-full object-cover ring-1 ring-border shrink-0" />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg font-bold text-purple-600 shrink-0">{t.user?.name?.charAt(0) || "T"}</div>
                            )}
                            <div className="min-w-0">
                              <div className="font-bold text-foreground text-sm truncate">{t.user?.name || `Trainer #${i + 1}`}</div>
                              <div className="text-[11px] text-purple-600 font-semibold">Co-Trainer</div>
                              <div className="text-[11px] text-muted-foreground truncate">{t.user?.designation || "Technical Lab Assistant"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-dashed border-border text-xs text-muted-foreground text-center">
                        Co-trainers conduct live problem solving labs and practice sessions.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── TECH STACK TAB VIEW ─── */}
              {activeSection === "tech" && (
                <div className="space-y-6">
                  {/* 1. Modern Frameworks & Core Tech */}
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" /> 1. Modern Frameworks & Core Technologies
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Modern industry-standard frameworks, databases, and AI models covered in this program.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
                      {((course.techStack && course.techStack.length > 0)
                        ? course.techStack
                        : [
                            { name: "React", color: "#61DAFB" },
                            { name: "Next.js", color: "#000000" },
                            { name: "Node.js", color: "#339933" },
                            { name: "Express", color: "#000000" },
                            { name: "TypeScript", color: "#3178C6" },
                            { name: "Tailwind CSS", color: "#06B6D4" },
                            { name: "MongoDB", color: "#47A248" },
                            { name: "Generative AI", color: "#10A37F" },
                            { name: "Agentic AI", color: "#9333EA" },
                          ]
                      ).map((tech, i) => {
                        const techInfo = getTechInfo(tech.name);
                        const IconComp = techInfo?.icon;
                        const rawColor = tech.color || techInfo?.color || "#6b7280";
                        const isBlackColor = rawColor.toLowerCase() === "#000000" || rawColor.toLowerCase() === "#000";
                        const bgStyleColor = isBlackColor ? "#38bdf8" : rawColor;

                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border bg-background hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                            style={{ borderColor: `${bgStyleColor}35` }}
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                              style={{ backgroundColor: `${bgStyleColor}18`, boxShadow: `0 0 0 1px ${bgStyleColor}30` }}
                            >
                              {IconComp ? (
                                <IconComp className={`h-6 w-6 ${isBlackColor ? "text-foreground dark:text-white" : ""}`} style={{ color: isBlackColor ? undefined : rawColor }} />
                              ) : (
                                <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: bgStyleColor }} />
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-foreground text-center leading-tight line-clamp-2">
                              {techInfo?.label || tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Developer Editors & Productivity Tools */}
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <FolderKanban className="h-5 w-5 text-indigo-600" /> 2. Developer Editors & Productivity Tools
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Professional IDEs, code editors, version control systems, and testing environments.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
                      {[
                        { name: "VS Code", color: "#007ACC" },
                        { name: "Sublime Text", color: "#FF9800" },
                        { name: "Git & GitHub", color: "#F05032" },
                        { name: "Postman", color: "#FF6C37" },
                        { name: "Docker", color: "#2496ED" },
                        { name: "Figma", color: "#F24E1E" },
                      ].map((tech, i) => {
                        const techInfo = getTechInfo(tech.name);
                        const IconComp = techInfo?.icon;
                        const color = tech.color || techInfo?.color || "#007ACC";

                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border bg-background hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group border-indigo-500/20"
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                              style={{ backgroundColor: `${color}18`, boxShadow: `0 0 0 1px ${color}30` }}
                            >
                              {IconComp ? (
                                <IconComp className="h-6 w-6" style={{ color }} />
                              ) : (
                                <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: color }} />
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-foreground text-center leading-tight line-clamp-2">
                              {techInfo?.label || tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Core Fundamentals & Prerequisites */}
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Target className="h-5 w-5 text-emerald-600" /> 3. Core Fundamentals & Prerequisites
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Foundational building blocks for clean architecture and problem-solving.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
                      {[
                        { name: "HTML5", color: "#E34F26" },
                        { name: "CSS3", color: "#1572B6" },
                        { name: "JavaScript", color: "#F7DF1E" },
                      ].map((tech, i) => {
                        const techInfo = getTechInfo(tech.name);
                        const IconComp = techInfo?.icon;
                        const color = tech.color || techInfo?.color || "#1572B6";

                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border bg-background hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group border-emerald-500/20"
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                              style={{ backgroundColor: `${color}18`, boxShadow: `0 0 0 1px ${color}30` }}
                            >
                              {IconComp ? (
                                <IconComp className="h-6 w-6" style={{ color }} />
                              ) : (
                                <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: color }} />
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-foreground text-center leading-tight line-clamp-2">
                              {techInfo?.label || tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Projects */}
                  {course.projects && course.projects.length > 0 && (
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                      <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" /> Real-World Projects You&apos;ll Build
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {course.projects.map((project, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border bg-background hover:shadow-sm transition-shadow">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Trophy className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground text-sm">{project.title}</h4>
                                {project.description && <p className="text-xs text-muted-foreground mt-1">{project.description}</p>}
                                {project.techUsed && project.techUsed.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {project.techUsed.map((t, j) => (
                                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right — Sticky Sidebar (desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <EnrollCard
                  course={course}
                  totalLessons={totalLessons}
                  onEnroll={handleEnroll}
                  onOutline={() => setShowOutlineForm(true)}
                  courseId={id}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── How It Works ─── */}
      <HowItWorksSection />

      {/* ─── Download Outline CTA ─── */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-gray-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Download Course Outline</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Get the complete course outline including curriculum, duration, and module details sent to your email.
            </p>
            <button
              onClick={() => setShowOutlineForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 outline-btn-pulse"
            >
              <Download className="w-5 h-5" />
              Get Course Outline
            </button>
          </motion.div>
        </Container>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-yellow-300" />
              <span className="text-white/80 font-medium">Limited Time Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Ready to Start Learning?</h2>
            <p className="text-white/80 mb-2">
              Join <span className="font-bold text-yellow-300">{course.enrolledStudents?.toLocaleString() || 0}</span> students already enrolled.
            </p>
            <div className="text-4xl font-black text-white mb-6">
              ৳{(course.discountPrice || course.price)?.toLocaleString()}
              {course.discountPrice && course.discountPrice < course.price && (
                <span className="text-xl font-normal text-white/50 line-through ml-3">৳{course.price?.toLocaleString()}</span>
              )}
            </div>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-8 h-14 text-base shadow-xl"
              onClick={handleEnroll}
            >
              <Play className="mr-2 h-5 w-5" />
              {user ? `Enroll Now` : "Login to Enroll"}
            </Button>
          </motion.div>
        </Container>
      </section>

      {showOutlineForm && <CourseOutlineForm courseName={course.title} courseId={course._id} onClose={() => setShowOutlineForm(false)} />}
    </>
  );
}

// ─── Enrollment Card Component ───────────────────────────────────────────────
function EnrollCard({
  course,
  totalLessons,
  onEnroll,
  onOutline,
  courseId,
}: {
  course: Course;
  totalLessons: number;
  onEnroll: () => void;
  onOutline: () => void;
  courseId: string;
}) {
  const discountPct = course.discountPrice && course.price
    ? Math.round((1 - course.discountPrice / course.price) * 100)
    : 0;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
      {/* Price header */}
      <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 p-6 border-b border-border">
        <div className="flex items-end gap-3 mb-1">
          <span className="text-4xl font-extrabold text-primary">
            ৳{(course.discountPrice || course.price)?.toLocaleString()}
          </span>
          {discountPct > 0 && (
            <span className="bg-green-500/15 text-green-600 text-xs font-bold px-2 py-1 rounded-full border border-green-500/25 mb-1">
              {discountPct}% OFF
            </span>
          )}
        </div>
        {course.discountPrice && course.discountPrice < course.price && (
          <p className="text-sm text-muted-foreground line-through">৳{course.price?.toLocaleString()}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">One-time payment • Lifetime access</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Active offers */}
        <CourseOfferBanner courseId={courseId} />

        {/* CTA */}
        <Button className="w-full h-12 text-base font-bold" size="lg" onClick={onEnroll}>
          <Play className="mr-2 h-5 w-5" />
          Enroll Now
        </Button>

        <button
          onClick={onOutline}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Download Course Outline
        </button>

        {/* Includes list */}
        <div className="pt-2">
          <h4 className="font-semibold text-foreground text-sm mb-3">This course includes:</h4>
          <div className="space-y-2.5">
            {[
              { icon: <BarChart3 className="h-4 w-4 text-blue-500" />, text: `${course.totalDuration}h on-demand content` },
              { icon: <BookOpen className="h-4 w-4 text-purple-500" />, text: `${totalLessons} comprehensive lessons` },
              { icon: <Trophy className="h-4 w-4 text-yellow-500" />, text: course.certificateIncluded !== false ? "Certificate of completion" : "No certificate" },
              { icon: <Infinity className="h-4 w-4 text-green-500" />, text: "Lifetime access & updates" },
              { icon: <Download className="h-4 w-4 text-orange-500" />, text: "Downloadable resources" },
              { icon: <Globe className="h-4 w-4 text-teal-500" />, text: `Language: ${course.language || "Bangla"}` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="shrink-0">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Share2 className="h-4 w-4" />
            <span>Share this course:</span>
            <ShareButtons title={course.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
