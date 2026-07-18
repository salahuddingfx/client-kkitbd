"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Input } from "@/components/ui";
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
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <FadeIn key={course._id} delay={index * 0.1}>
                    <Link href={`/courses/${course._id}`}>
                      <div className="animated-border-lg">
                        <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300 border-transparent bg-background">
                        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5" />
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{typeof course.category === "object" ? course.category?.name : course.category}</Badge>
                            <Badge>{course.level}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {course.shortDescription || course.description?.substring(0, 100)}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2 sm:space-x-4">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {course.totalDuration}h
                              </span>
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {course.enrolledStudents}
                              </span>
                            </div>
                            <span className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              {course.rating?.average?.toFixed(1) || "N/A"}
                            </span>
                          </div>
                          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">
                              ${course.price}
                            </span>
                            <Button variant="ghost" size="sm">
                              Enroll Now
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
