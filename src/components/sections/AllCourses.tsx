"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users, Star, Loader2, ChevronDown } from "lucide-react";
import { GlowCard, Badge, Button } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { StaggerReveal, ScrollReveal } from "@/components/animations";
import { coursesApi, Course } from "@/services/api";

const BATCH_SIZE = 6;

export function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCount, setShowCount] = useState(BATCH_SIZE);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await coursesApi.getAll({ status: "published", limit: "200" });
        setCourses(res.data || []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(courses.map((c) => c.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [courses]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return courses;
    return courses.filter((c) => c.category === activeCategory);
  }, [courses, activeCategory]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  useEffect(() => {
    setShowCount(BATCH_SIZE);
  }, [activeCategory]);

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <SectionHeader
            subtitle="Explore"
            title="All Courses"
            description="Browse our complete catalog of courses designed to advance your career."
          />
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </Container>
      </section>
    );
  }

  if (courses.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <ScrollReveal direction="up" distance={40}>
          <SectionHeader
            subtitle="Explore"
            title="All Courses"
            description="Browse our complete catalog of courses designed to advance your career."
          />
        </ScrollReveal>

        {/* Category filter pills */}
        <ScrollReveal direction="up" distance={30} delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({courses.filter((c) => c.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Course grid */}
        {visible.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found in this category.</p>
          </div>
        ) : (
          <StaggerReveal
            childSelector=".all-course-card"
            stagger={0.12}
            y={80}
            duration={0.9}
            ease="power3.out"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((course, idx) => (
                <div key={course._id} className="all-course-card">
                  <Link href={`/courses/${course._id}`}>
                    <div className="animated-border-lg">
                      <GlowCard
                        variant="glow"
                        className="h-full overflow-hidden group border-transparent bg-background"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-48 overflow-hidden">
                          {course.thumbnail?.url ? (
                            <Image
                              src={course.thumbnail.url}
                              alt={course.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                            <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                              {course.level}
                            </Badge>
                            {course.category && (
                              <Badge variant="outline" className="backdrop-blur-sm bg-background/80 border-white/20 text-foreground">
                                {course.category}
                              </Badge>
                            )}
                          </div>

                          {/* Price */}
                          <div className="absolute bottom-4 right-4 z-20">
                            <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30">
                              ৳{(course.discountPrice || course.price).toLocaleString()}
                            </div>
                          </div>

                          {course.discountPrice && course.discountPrice < course.price && (
                            <div className="absolute bottom-4 left-4 z-20">
                              <span className="text-xs text-white/60 line-through">৳{course.price.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {course.shortDescription || course.description?.substring(0, 120)}
                          </p>

                          {/* Stats row */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {course.totalDuration}h
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                {course.enrolledStudents?.toLocaleString() || 0}
                              </span>
                            </div>
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                              {course.rating?.average?.toFixed(1) || "N/A"}
                            </span>
                          </div>
                        </div>
                      </GlowCard>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </StaggerReveal>
        )}

        {/* Load More */}
        {hasMore && (
          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowCount((prev) => prev + BATCH_SIZE)}
                className="group"
              >
                Load More Courses
                <span className="ml-2 text-xs text-muted-foreground">
                  ({filtered.length - showCount} remaining)
                </span>
                <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
          </ScrollReveal>
        )}

        {/* View All link */}
        <ScrollReveal direction="up" distance={20} delay={0.3}>
          <div className="mt-6 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Browse full course catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
