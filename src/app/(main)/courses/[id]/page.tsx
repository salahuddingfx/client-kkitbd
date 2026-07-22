"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
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
  Loader2,
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
} from "lucide-react";
import { Button, Badge, GlowCard, Skeleton } from "@/components/ui";
import { Breadcrumb, Container, ShareButtons, PaymentModal } from "@/components/common";
import { CourseOfferBanner } from "@/components/common/CourseOfferBanner";
import { CourseOutlineForm } from "@/components/common/CourseOutlineForm";
import { HowItWorksSection } from "@/components/common/HowItWorksSection";
import { coursesApi, Course } from "@/services/api";
import { useAppSelector } from "@/redux/hooks";
import { getSkillIcon } from "@/lib/icons";

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
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

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

  if (loading) {
    return (
      <div className="pt-20 pb-16 min-h-screen">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-4 w-48" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <div className="flex items-center gap-4 flex-wrap pt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-64 w-full rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-72 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/courses"><ArrowLeft className="mr-2 h-4 w-4" /> Browse Courses</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const instructorName = course.instructor?.name || "Instructor";
  const instructorInitials = instructorName.split(" ").map((n: string) => n[0]).join("");

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 bg-background-secondary">
        <Container>
          <Breadcrumb
            items={[{ label: "Courses", href: "/courses" }, { label: course.title }]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{typeof course.category === "object" ? course.category?.name : course.category}</Badge>
                <Badge>{course.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground text-lg">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{course.rating?.average?.toFixed(1) || "N/A"}</span>
                  ({course.rating?.count || 0} reviews)
                </span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.enrolledStudents?.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.totalDuration}h total</span>
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {totalLessons} lessons</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{instructorInitials}</div>
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
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <ShareButtons title={course.title} />
              </div>
            </div>

            {/* Right — Enrollment Card */}
            <div>
              <GlowCard variant="neu" className="p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">৳{(course.discountPrice || course.price).toLocaleString()}</div>
                  {course.discountPrice && course.discountPrice < course.price && (
                    <p className="text-xs text-muted-foreground line-through">৳{course.price.toLocaleString()}</p>
                  )}
                  <p className="text-xs text-muted-foreground">One-time payment &bull; Lifetime access</p>
                </div>

                {/* Active offers */}
                <div className="mb-4">
                  <CourseOfferBanner courseId={id} />
                </div>

                <Button
                  className="w-full h-12" size="lg"
                  onClick={() => {
                    if (!user) { router.push(`/login?redirect=/courses/${id}`); return; }
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
                    course.certificateIncluded !== false && "Certificate of completion",
                    "Lifetime access & updates",
                    "Downloadable resources",
                    course.language || "Bangla",
                  ].filter((item): item is string => Boolean(item)).map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>
        </Container>
      </section>

      {/* Instructor & Team */}
      <section className="py-12 border-b border-border">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"><GraduationCap className="h-6 w-6 text-primary" /> Meet Your Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Instructor */}
              <div className="p-4 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-3 mb-2">
                  {course.instructor?.avatar?.url ? (
                    <img src={course.instructor.avatar.url} alt="" className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                      {instructorInitials}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground text-sm">{instructorName}</div>
                    <div className="text-xs text-primary font-medium">Instructor</div>
                    {course.instructor?.designation && <div className="text-xs text-muted-foreground">{course.instructor.designation}</div>}
                  </div>
                </div>
              </div>
              {/* Mentors */}
              {course.mentors?.map((m, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-3">
                    {m.user?.avatar?.url ? (
                      <img src={m.user.avatar.url} alt="" className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-lg font-bold text-indigo-600">
                        {m.user?.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-foreground text-sm">{m.user?.name}</div>
                      <div className="text-xs text-indigo-600 font-medium">Mentor</div>
                      {m.user?.designation && <div className="text-xs text-muted-foreground">{m.user.designation}</div>}
                    </div>
                  </div>
                </div>
              ))}
              {/* Trainers */}
              {course.trainers?.map((t, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-3">
                    {t.user?.avatar?.url ? (
                      <img src={t.user.avatar.url} alt="" className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg font-bold text-purple-600">
                        {t.user?.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.user?.name}</div>
                      <div className="text-xs text-purple-600 font-medium">Trainer</div>
                      {t.user?.designation && <div className="text-xs text-muted-foreground">{t.user.designation}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What You'll Learn + Prerequisites */}
      {(course.learningOutcomes?.length || course.prerequisites?.length) && (
        <section className="py-12 border-b border-border">
          <Container>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What You'll Learn */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> What You'll Learn</h3>
                  <div className="space-y-2">
                    {course.learningOutcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-yellow-500" /> Prerequisites</h3>
                  <div className="space-y-2">
                    {course.prerequisites.map((prereq, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-0.5">•</span>
                        <span className="text-sm text-muted-foreground">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Tech Stack */}
      {course.techStack && course.techStack.length > 0 && (
        <section className="py-12 border-b border-border">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {course.techStack.map((tech, i) => {
                  const skillIcon = getSkillIcon(tech.name);
                  const IconComp = skillIcon?.icon;
                  const color = tech.color || skillIcon?.color || "#6b7280";
                  return (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-background hover:shadow-md transition-shadow"
                      style={{ borderColor: `${color}40` }}
                    >
                      {IconComp ? (
                        <IconComp className="h-5 w-5" style={{ color }} />
                      ) : (
                        <div className="h-5 w-5 rounded" style={{ backgroundColor: color }} />
                      )}
                      <span className="text-sm font-medium" style={{ color }}>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Projects */}
      {course.projects && course.projects.length > 0 && (
        <section className="py-12 border-b border-border">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><FolderKanban className="h-5 w-5 text-primary" /> Projects You'll Build</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.projects.map((project, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-background">
                    <h4 className="font-semibold text-foreground text-sm mb-1">{project.title}</h4>
                    {project.description && <p className="text-xs text-muted-foreground mb-2">{project.description}</p>}
                    {project.techUsed && project.techUsed.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.techUsed.map((t, j) => (
                          <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Highlights */}
      {course.highlights && course.highlights.length > 0 && (
        <section className="py-12 border-b border-border">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Course Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {h}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Language & Certificate */}
      <section className="py-8 border-b border-border">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-sm text-muted-foreground">
            {course.language && (
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Language: <span className="font-medium text-foreground">{course.language}</span></div>
            )}
            {course.certificateIncluded !== undefined && (
              <div className="flex items-center gap-2"><Award className="h-4 w-4" /> Certificate: <span className="font-medium text-foreground">{course.certificateIncluded ? "Included" : "Not included"}</span></div>
            )}
          </div>
        </Container>
      </section>

      {/* Curriculum Overview — simple module list */}
      {course.modules && course.modules.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Course Curriculum</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {course.modules.length} modules &bull; {totalLessons} lessons &bull; {course.totalDuration}h total
                </p>
              </div>

              <div className="space-y-2">
                {course.modules.map((mod, mi) => {
                  const isExpanded = expandedModules.has(mi);
                  const lessonCount = mod.lessons?.length || 0;
                  return (
                    <div key={mi} className="border rounded-lg border-border overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleModule(mi)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 text-left transition-colors"
                      >
                        {isExpanded ? <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-primary uppercase tracking-wider">Module {mi + 1}</div>
                          <div className="text-sm font-semibold text-foreground mt-0.5">{mod.title}</div>
                          {mod.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{mod.description}</p>}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{lessonCount} lessons</span>
                      </button>

                      {isExpanded && mod.lessons && (
                        <div className="border-t border-border">
                          {mod.lessons.map((lesson, li) => (
                            <div key={li} className="flex items-center gap-3 px-4 py-2.5 border-b border-border/50 last:border-b-0">
                              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                                {lesson.isFree ? (
                                  <Play className="h-3 w-3 text-primary" />
                                ) : (
                                  <Lock className="h-3 w-3 text-muted-foreground" />
                                )}
                              </div>
                              <span className="text-sm text-foreground flex-1 truncate">{lesson.title}</span>
                              {lesson.isFree && <Badge variant="secondary" className="text-[10px] shrink-0">Free</Badge>}
                              {lesson.duration && <span className="text-xs text-muted-foreground shrink-0">{lesson.duration} min</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
            <h2 className="text-2xl font-bold text-foreground mb-3">Download Course Outline</h2>
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
            <p className="text-white/80 mb-8">Join {course.enrolledStudents?.toLocaleString() || 0} students already enrolled.</p>
            <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/register">Enroll Now — ৳{(course.discountPrice || course.price).toLocaleString()}</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {showOutlineForm && <CourseOutlineForm courseName={course.title} courseId={course._id} onClose={() => setShowOutlineForm(false)} />}

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} courseId={course._id} courseTitle={course.title} amount={course.discountPrice || course.price} />
    </>
  );
}
