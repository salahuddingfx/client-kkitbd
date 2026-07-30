"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Input, Skeleton } from "@/components/ui";
import { Breadcrumb, Pagination, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { Clock, Users, Star, Search, Filter, Loader2 } from "lucide-react";
import { coursesApi, categoriesApi, Course, Category } from "@/services/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredCourses = courses.filter((course) => {
    const catId = typeof course.category === "object" ? course.category?._id : course.category;
    const matchesCategory =
      selectedCategory === "All" || catId === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Courses
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Expand Your Knowledge
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive catalog of courses designed to help you master in-demand skills.
            </p>
            <Breadcrumb items={[{ label: "Courses" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={selectedCategory === category._id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-4 pt-2">
                      <Skeleton className="h-3.5 w-16" />
                      <Skeleton className="h-3.5 w-16" />
                      <Skeleton className="h-3.5 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredCourses.map((course, index) => (
                  <FadeIn key={course._id} delay={index * 0.1}>
                    <Link href={`/courses/${course._id}`}>
                      <div className="animated-border-lg h-full">
                        <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300 border-transparent bg-background flex flex-col">
                        {/* Thumbnail */}
                        <div className="relative h-44 bg-gradient-to-br from-primary/20 via-primary/10 to-orange-500/10 overflow-hidden shrink-0">
                          {course.thumbnail?.url ? (
                            <img src={course.thumbnail.url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl font-black text-primary/20">{course.title?.[0]}</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge variant="secondary" className="text-[10px]">{typeof course.category === "object" ? course.category?.name : course.category}</Badge>
                            <Badge className="text-[10px]">{course.level}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-5 flex flex-col flex-1">
                          <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-xs mb-3 line-clamp-2 flex-1">
                            {course.shortDescription || course.description?.substring(0, 100)}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {course.totalDuration}h
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                {course.enrolledStudents?.toLocaleString()}
                              </span>
                            </div>
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-yellow-500" />
                              {course.rating?.average?.toFixed(1) || "N/A"}
                            </span>
                          </div>
                          <div className="pt-3 border-t border-border flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-primary">
                                ৳{(course.discountPrice || course.price)?.toLocaleString()}
                              </span>
                              {course.discountPrice && course.discountPrice < course.price && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ৳{course.price?.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 text-xs">
                              Enroll Now →
                            </Button>
                          </div>
                        </CardContent>
                        </Card>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">No courses found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}

              {filteredCourses.length > 0 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={3}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
