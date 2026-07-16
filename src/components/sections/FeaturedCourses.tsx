"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { GlowCard, Badge, Button } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { StaggerReveal } from "@/components/animations";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js and more.",
    instructor: "John Doe",
    duration: "12 weeks",
    enrolledStudents: 5420,
    rating: 4.9,
    price: 99.99,
    image: "/courses/web-dev.jpg",
    level: "beginner" as const,
  },
  {
    id: "2",
    title: "React & Next.js Masterclass",
    description: "Build modern web applications with React and Next.js.",
    instructor: "Jane Smith",
    duration: "8 weeks",
    enrolledStudents: 3210,
    rating: 4.8,
    price: 79.99,
    image: "/courses/react.jpg",
    level: "intermediate" as const,
  },
  {
    id: "3",
    title: "Mobile App Development with Flutter",
    description: "Create beautiful cross-platform mobile apps.",
    instructor: "Mike Johnson",
    duration: "10 weeks",
    enrolledStudents: 2890,
    rating: 4.7,
    price: 89.99,
    image: "/courses/flutter.jpg",
    level: "beginner" as const,
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-20 bg-background-secondary">
      <Container>
        <SectionHeader
          subtitle="Our Courses"
          title="Featured Courses"
          description="Explore our most popular courses taught by industry experts."
        />

        <StaggerReveal
          childSelector=".course-card"
          stagger={0.15}
          y={60}
          duration={0.8}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <Link href={`/courses/${course.id}`}>
                  <div className="animated-border-lg">
                    <GlowCard variant="glow" className="h-full overflow-hidden group border-transparent bg-background">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div className="absolute top-4 left-4 z-20">
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 z-20">
                        <Badge className="bg-primary">${course.price}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {course.enrolledStudents}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          {course.rating}
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

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
