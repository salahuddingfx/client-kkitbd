"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users, Star, Loader2 } from "lucide-react";
import { GlowCard, Badge, Button } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { StaggerReveal, ScrollReveal } from "@/components/animations";
import { coursesApi, Course } from "@/services/api";

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await coursesApi.getAll({ isFeatured: "true", limit: "6" });
        setCourses(res.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 bg-background-secondary">
      <Container>
        <ScrollReveal direction="up" distance={50}>
          <SectionHeader
            subtitle="Our Courses"
            title="Featured Courses"
            description="Explore our most popular courses taught by industry experts."
          />
        </ScrollReveal>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <StaggerReveal
            childSelector=".course-card"
            stagger={0.15}
            y={60}
            duration={0.8}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="course-card">
                  <Link href={`/courses/${course._id}`}>
                    <div className="animated-border-lg">
                      <GlowCard variant="glow" className="h-full overflow-hidden group border-transparent bg-background">
                      <div className="relative h-48 overflow-hidden">
                        {course.thumbnail?.url ? (
                          <Image
                            src={course.thumbnail.url}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute top-4 left-4 z-20">
                          <Badge variant="secondary">{course.level}</Badge>
                        </div>
                        <div className="absolute bottom-4 right-4 z-20">
                          <Badge className="bg-primary">৳{course.price.toLocaleString()}</Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {course.shortDescription || course.description?.substring(0, 100)}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.totalDuration}h
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {course.enrolledStudents?.toLocaleString() || 0}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
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

        <ScrollReveal direction="up" distance={30} delay={0.2}>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
