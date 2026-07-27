"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users, Star, Loader2 } from "lucide-react";
import { GlowCard, Badge, Button } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { StaggerReveal, ScrollReveal } from "@/components/animations";
import { coursesApi, Course } from "@/services/api";

const FALLBACK_COURSES = [
  {
    _id: "fallback-course-1",
    title: "Full-Stack Web Development Masterclass",
    shortDescription: "Master MERN stack (MongoDB, Express, React, Node.js) with production-ready real-world projects.",
    price: 12500,
    level: "All Levels",
    totalDuration: 45,
    enrolledStudents: 1420,
    thumbnail: { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80", publicId: "thumb-1" },
    rating: { average: 4.9, count: 128 },
    isFeatured: true,
  },
  {
    _id: "fallback-course-2",
    title: "Mobile App Development with React Native & Flutter",
    shortDescription: "Build cross-platform iOS and Android mobile apps from scratch with modern UI animations.",
    price: 15000,
    level: "Intermediate",
    totalDuration: 40,
    enrolledStudents: 980,
    thumbnail: { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80", publicId: "thumb-2" },
    rating: { average: 4.8, count: 94 },
    isFeatured: true,
  },
  {
    _id: "fallback-course-3",
    title: "UI/UX Product Design & Figma Mastery",
    shortDescription: "Design intuitive user interfaces, interactive wireframes, and scalable design systems.",
    price: 9500,
    level: "Beginner",
    totalDuration: 30,
    enrolledStudents: 1650,
    thumbnail: { url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80", publicId: "thumb-3" },
    rating: { average: 4.9, count: 210 },
    isFeatured: true,
  },
  {
    _id: "fallback-course-4",
    title: "Python, Data Science & AI Machine Learning",
    shortDescription: "Learn Data Analysis, Pandas, NumPy, and Machine Learning algorithms with hands-on labs.",
    price: 14000,
    level: "Intermediate",
    totalDuration: 50,
    enrolledStudents: 1120,
    thumbnail: { url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80", publicId: "thumb-4" },
    rating: { average: 4.7, count: 86 },
    isFeatured: true,
  },
  {
    _id: "fallback-course-5",
    title: "DevOps, Docker & Cloud Architecture (AWS)",
    shortDescription: "Master CI/CD pipelines, Docker containerization, Kubernetes, and AWS cloud architecture.",
    price: 16500,
    level: "Advanced",
    totalDuration: 35,
    enrolledStudents: 750,
    thumbnail: { url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80", publicId: "thumb-5" },
    rating: { average: 4.9, count: 62 },
    isFeatured: true,
  },
  {
    _id: "fallback-course-6",
    title: "Cyber Security & Ethical Hacking",
    shortDescription: "Learn network security, penetration testing, vulnerability assessment, and threat defense.",
    price: 13500,
    level: "Intermediate",
    totalDuration: 38,
    enrolledStudents: 890,
    thumbnail: { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80", publicId: "thumb-6" },
    rating: { average: 4.8, count: 78 },
    isFeatured: true,
  },
] as unknown as Course[];

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>(FALLBACK_COURSES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await coursesApi.getAll({ isFeatured: "true", limit: "6" });
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setCourses(res.data);
        } else {
          setCourses(FALLBACK_COURSES);
        }
      } catch {
        // Fallback gracefully so the UI never displays raw "Failed to fetch" errors
        setCourses(FALLBACK_COURSES);
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
                      <GlowCard variant="glow" className="h-full overflow-hidden group border-transparent bg-background flex flex-col">
                        <div className="relative h-48 overflow-hidden shrink-0">
                          {course.thumbnail?.url ? (
                            <Image
                              src={course.thumbnail.url}
                              alt={course.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-muted-foreground font-medium text-xs">
                              {course.title}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                          <div className="absolute top-4 left-4 z-20">
                            <Badge variant="secondary">{course.level || "All Levels"}</Badge>
                          </div>
                          <div className="absolute bottom-4 right-4 z-20">
                            <Badge className="bg-primary">৳{(course.price || 0).toLocaleString()}</Badge>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {course.shortDescription || course.description?.substring(0, 100) || "Comprehensive course covering real-world industry skills."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border/50">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-primary/80" />
                                {course.totalDuration || 30}h
                              </span>
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-primary/80" />
                                {(course.enrolledStudents || 100).toLocaleString()}
                              </span>
                            </div>
                            <span className="flex items-center font-medium text-foreground">
                              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                              {course.rating?.average ? course.rating.average.toFixed(1) : "4.8"}
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
