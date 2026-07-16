"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Clock, BookOpen, Search, Filter } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";
import { mockEnrolledCourses } from "@/services/dashboard-data";

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function MyCoursesPage() {
  const courses = mockEnrolledCourses;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            {courses.length} enrolled course{courses.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent text-sm outline-none w-48 placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <FadeIn key={course.id} delay={i * 0.1}>
            <Card className="h-full hover:shadow-lg transition-all group">
              <div className="relative aspect-video bg-muted overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={cn("px-2 py-1 rounded-md text-xs font-medium", levelColors[course.level])}>
                    {course.level}
                  </span>
                </div>
                {course.progress === 100 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-500 text-white">
                      Completed
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="px-2 py-0.5 rounded bg-muted">{course.category}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      {course.completedLectures}/{course.lectures} lectures
                    </span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        course.progress === 100 ? "bg-green-500" : "bg-primary"
                      )}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-muted overflow-hidden">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{course.instructor.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Last: {formatDate(course.lastAccessedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
