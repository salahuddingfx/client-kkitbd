"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  Badge,
  Button,
  Input,
  Skeleton,
} from "@/components/ui";
import {
  Pagination,
  Container,
  LavaHero,
  VideoModal,
} from "@/components/common";
import { FadeIn } from "@/components/animations";
import {
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  SlidersHorizontal,
  X,
  Radio,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import { coursesApi, categoriesApi, Course, Category } from "@/services/api";

const TECH_TAGS = [
  "All",
  "Next.js",
  "React",
  "MERN",
  "Node.js",
  "Python",
  "Flutter",
  "DevOps",
  "UI/UX",
  "AI & ML",
];

const LEVELS = [
  { id: "all", label: "All Levels" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

const FORMATS = [
  { id: "all", label: "All Formats" },
  { id: "live", label: "Live Bootcamp" },
  { id: "self-paced", label: "Self-Paced" },
];

const PRICE_FILTERS = [
  { id: "all", label: "All Prices" },
  { id: "under-5k", label: "Under ৳5,000" },
  { id: "5k-10k", label: "৳5,000 - ৳10,000" },
  { id: "above-10k", label: "৳10,000+" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedTech, setSelectedTech] = useState("All");
  const [minRating, setMinRating] = useState<number>(0);
  const [priceFilter, setPriceFilter] = useState("all");
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Preview Video Modal
  const [previewVideo, setPreviewVideo] = useState<{ url: string; title: string } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [coursesRes, catsRes] = await Promise.all([
          coursesApi.getAll({ status: "published" }),
          categoriesApi.getAll({ isActive: "true" }),
        ]);
        setCourses(coursesRes.data || []);
        setCategories(catsRes.data || []);
      } catch {
        setCourses([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Multi-facet filtering logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // 1. Search Query
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.shortDescription && course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category
      const catId = typeof course.category === "object" ? course.category?._id : course.category;
      const catName = typeof course.category === "object" ? course.category?.name : "";
      const matchesCategory =
        selectedCategory === "All" ||
        catId === selectedCategory ||
        catName.toLowerCase() === selectedCategory.toLowerCase();

      // 3. Level
      const courseLevel = (course.level || "").toLowerCase();
      const matchesLevel =
        selectedLevel === "all" ||
        courseLevel.includes(selectedLevel) ||
        (selectedLevel === "beginner" && courseLevel.includes("beg"));

      // 4. Format (Bootcamp vs Self-paced)
      const isBootcamp =
        course.tags?.some((t) => t.toLowerCase().includes("bootcamp") || t.toLowerCase().includes("live")) ||
        course.title.toLowerCase().includes("bootcamp") ||
        course.title.toLowerCase().includes("live");
      const matchesFormat =
        selectedFormat === "all" ||
        (selectedFormat === "live" && isBootcamp) ||
        (selectedFormat === "self-paced" && !isBootcamp);

      // 5. Tech Stack
      const matchesTech =
        selectedTech === "All" ||
        course.title.toLowerCase().includes(selectedTech.toLowerCase()) ||
        course.description?.toLowerCase().includes(selectedTech.toLowerCase()) ||
        course.tags?.some((t) => t.toLowerCase().includes(selectedTech.toLowerCase())) ||
        course.techStack?.some((t) => t.name.toLowerCase().includes(selectedTech.toLowerCase()));

      // 6. Rating
      const courseRating = course.rating?.average || 4.8;
      const matchesRating = minRating === 0 || courseRating >= minRating;

      // 7. Price
      const effectivePrice = course.discountPrice || course.price || 0;
      let matchesPrice = true;
      if (priceFilter === "under-5k") matchesPrice = effectivePrice < 5000;
      else if (priceFilter === "5k-10k") matchesPrice = effectivePrice >= 5000 && effectivePrice <= 10000;
      else if (priceFilter === "above-10k") matchesPrice = effectivePrice > 10000;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesFormat &&
        matchesTech &&
        matchesRating &&
        matchesPrice
      );
    });
  }, [
    courses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedTech,
    minRating,
    priceFilter,
  ]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedTech,
    minRating,
    priceFilter,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedLevel !== "all") count++;
    if (selectedFormat !== "all") count++;
    if (selectedTech !== "All") count++;
    if (minRating > 0) count++;
    if (priceFilter !== "all") count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedTech,
    minRating,
    priceFilter,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("all");
    setSelectedFormat("all");
    setSelectedTech("All");
    setMinRating(0);
    setPriceFilter("all");
  };

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage));
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * coursesPerPage;
    return filteredCourses.slice(start, start + coursesPerPage);
  }, [filteredCourses, currentPage]);

  // Total active learners across all courses
  const totalLearners = useMemo(() => {
    return courses.reduce((acc, c) => acc + (c.enrolledStudents || 0), 0) || 2840;
  }, [courses]);

  return (
    <div className="min-h-screen bg-background">
      {/* Lava Hero Section with Enrollment Social Proof Banner */}
      <LavaHero
        badge="KKIT Academy"
        title="Master Industry-Leading Tech Skills"
        description="Join hands-on software development, modern web engineering, and AI bootcamps led by senior industry engineers."
        breadcrumbItems={[{ label: "Courses" }]}
        size="lg"
      >
        {/* Live Enrollment Social Proof Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/70 text-xs font-semibold shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>
              <strong className="text-foreground">{totalLearners.toLocaleString()}+</strong> enrolled students
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Job Placement &amp; Internship Support</span>
          </div>
        </div>
      </LavaHero>

      {/* Main Course Explorer & Filters */}
      <section className="py-10 sm:py-16">
        <Container>
          {/* Top Bar: Search, Category Pills & Quick Filter Controls */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, technology, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9.5 pr-8 h-10 text-xs sm:text-sm rounded-full border-border/80 bg-card shadow-xs focus:border-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Actions & Mobile Filter Button */}
              <div className="flex items-center gap-2.5 self-end md:self-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowFiltersModal(!showFiltersModal)}
                  className={`h-10 rounded-full px-4 text-xs font-semibold gap-2 border-border/80 ${
                    activeFilterCount > 0 ? "border-primary text-primary bg-primary/5" : ""
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="h-10 text-xs text-muted-foreground hover:text-primary gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Horizontal Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted"
                }`}
              >
                All Categories ({courses.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === category._id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Technology Stack Tags Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mr-1 shrink-0">
                Stack:
              </span>
              {TECH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTech(tag)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedTech === tag
                      ? "bg-foreground text-background font-bold shadow-xs"
                      : "bg-muted/40 text-muted-foreground hover:text-foreground border border-border/40"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Expandable Advanced Multi-Facet Filter Drawer */}
            <AnimatePresence>
              {showFiltersModal && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden p-5 rounded-2xl bg-card border border-border/80 shadow-md space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    {/* Level */}
                    <div>
                      <label className="font-bold text-foreground block mb-2 uppercase tracking-wider text-[11px]">
                        Difficulty Level
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {LEVELS.map((lvl) => (
                          <button
                            key={lvl.id}
                            type="button"
                            onClick={() => setSelectedLevel(lvl.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                              selectedLevel === lvl.id
                                ? "bg-primary text-white font-bold"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {lvl.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Format */}
                    <div>
                      <label className="font-bold text-foreground block mb-2 uppercase tracking-wider text-[11px]">
                        Learning Format
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {FORMATS.map((fmt) => (
                          <button
                            key={fmt.id}
                            type="button"
                            onClick={() => setSelectedFormat(fmt.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                              selectedFormat === fmt.id
                                ? "bg-primary text-white font-bold"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {fmt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="font-bold text-foreground block mb-2 uppercase tracking-wider text-[11px]">
                        Price Range
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {PRICE_FILTERS.map((pr) => (
                          <button
                            key={pr.id}
                            type="button"
                            onClick={() => setPriceFilter(pr.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                              priceFilter === pr.id
                                ? "bg-primary text-white font-bold"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {pr.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Minimum Rating */}
                    <div>
                      <label className="font-bold text-foreground block mb-2 uppercase tracking-wider text-[11px]">
                        Minimum Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[0, 4.0, 4.5, 4.8].map((rt) => (
                          <button
                            key={rt}
                            type="button"
                            onClick={() => setMinRating(rt)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer ${
                              minRating === rt
                                ? "bg-amber-500 text-white font-bold"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {rt === 0 ? "All" : <><Star className="h-3 w-3 fill-current" /> {rt}+</>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
            <span>
              Showing <strong className="text-foreground">{filteredCourses.length}</strong> available courses
            </span>
            {activeFilterCount > 0 && (
              <span className="text-primary font-medium">Filtered results</span>
            )}
          </div>

          {/* Courses Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="rounded-3xl overflow-hidden border-border/80">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between items-center pt-4 border-t border-border/40">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedCourses.map((course, index) => {
                  const isBootcamp =
                    course.tags?.some((t) => t.toLowerCase().includes("bootcamp") || t.toLowerCase().includes("live")) ||
                    course.title.toLowerCase().includes("bootcamp");
                  const activeLearners = ((course.enrolledStudents || 1) % 45) + 12;

                  // Find first free preview lecture if available
                  let firstFreeVideoUrl: string | null = null;
                  let firstFreeTitle = "Course Preview";
                  if (course.modules) {
                    for (const mod of course.modules) {
                      if (mod.lessons) {
                        for (const lesson of mod.lessons) {
                          if (lesson.isFree && lesson.videoUrl) {
                            firstFreeVideoUrl = lesson.videoUrl;
                            firstFreeTitle = lesson.title;
                            break;
                          }
                        }
                      }
                      if (firstFreeVideoUrl) break;
                    }
                  }
                  // Fallback demo preview video if none set
                  const previewUrl = firstFreeVideoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

                  return (
                    <FadeIn key={course._id || course.slug} delay={index * 0.05}>
                      <div className="group h-full flex flex-col justify-between rounded-3xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        {/* Thumbnail / Header with Quick Video Preview Button */}
                        <div className="relative h-48 sm:h-52 bg-gradient-to-br from-primary/20 via-primary/10 to-amber-500/10 overflow-hidden shrink-0">
                          {course.thumbnail?.url ? (
                            <img
                              src={course.thumbnail.url}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                              <span className="text-5xl font-black text-primary/30 tracking-widest">
                                {course.title?.[0] || "K"}
                              </span>
                            </div>
                          )}

                          {/* Quick Preview Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setPreviewVideo({
                                url: previewUrl,
                                title: `${course.title} — ${firstFreeTitle}`,
                              });
                            }}
                            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-background/90 text-primary shadow-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer z-20"
                            title="Quick Video Preview"
                          >
                            <Play className="h-5 w-5 fill-current ml-0.5" />
                          </button>

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-background/90 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
                              {typeof course.category === "object" ? course.category?.name : course.category || "Tech"}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-background/90 backdrop-blur-md text-primary border border-border/60">
                              {course.level || "All Levels"}
                            </span>
                          </div>

                          {/* Format Badge */}
                          <div className="absolute top-3 right-3 z-10">
                            {isBootcamp ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                Live Bootcamp
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-background/80 backdrop-blur-md text-muted-foreground border border-border/50">
                                Self-Paced
                              </span>
                            )}
                          </div>

                          {/* Live Social Proof Pill */}
                          <div className="absolute bottom-2.5 left-3 z-10">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {activeLearners} active learners
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <CardContent className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <Link href={`/courses/${course.slug || course._id}`}>
                              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {course.title}
                              </h3>
                            </Link>

                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {course.shortDescription || course.description?.substring(0, 110)}
                            </p>
                          </div>

                          {/* Tech Stack Chips if available */}
                          {course.techStack && course.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {course.techStack.slice(0, 3).map((tech, ti) => (
                                <span
                                  key={ti}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40"
                                >
                                  {tech.name}
                                </span>
                              ))}
                              {course.techStack.length > 3 && (
                                <span className="text-[10px] text-muted-foreground px-1">
                                  +{course.techStack.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Meta stats */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 font-medium">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                {course.totalDuration || 24}h
                              </span>
                              <span className="flex items-center gap-1 font-medium">
                                <Users className="h-3.5 w-3.5 text-primary" />
                                {(course.enrolledStudents || 120).toLocaleString()}
                              </span>
                            </div>

                            <span className="flex items-center gap-1 font-bold text-foreground">
                              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                              {course.rating?.average?.toFixed(1) || "4.9"}
                            </span>
                          </div>

                          {/* Price & CTA */}
                          <div className="pt-3 border-t border-border flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-black text-primary">
                                ৳{(course.discountPrice || course.price)?.toLocaleString()}
                              </span>
                              {course.discountPrice && course.discountPrice < course.price && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ৳{course.price?.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <Button asChild size="sm" className="rounded-full px-4 text-xs font-semibold gap-1 shadow-xs">
                              <Link href={`/courses/${course.slug || course._id}`}>
                                View Details
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredCourses.length === 0 && (
                <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-border bg-card/60 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    <Filter className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">No matching courses found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Try clearing some filters or searching with different tech keywords.
                  </p>
                  <Button variant="outline" onClick={handleResetFilters} className="rounded-full text-xs">
                    Reset All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* Video Modal Preview */}
      {previewVideo && (
        <VideoModal
          isOpen={!!previewVideo}
          onClose={() => setPreviewVideo(null)}
          videoUrl={previewVideo.url}
          title={previewVideo.title}
        />
      )}
    </div>
  );
}
