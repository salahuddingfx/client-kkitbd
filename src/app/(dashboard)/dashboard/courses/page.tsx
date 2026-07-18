"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Clock, BookOpen, Search, Filter, Loader2 } from "lucide-react";
import { Card, CardContent, Badge, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatDate } from "@/utils";
import { enrollmentsApi } from "@/services/api";
import { toast } from "sonner";

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusColors: Record<string, string> = {
  active: "bg-green-500 text-white",
  pending: "bg-yellow-500 text-white",
  completed: "bg-blue-500 text-white",
  cancelled: "bg-red-500 text-white",
};

export default function MyCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    enrollmentsApi
      .getAll()
      .then((res) => {
        if (res.success) {
          setEnrollments(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load courses:", err);
        toast.error("Failed to load your enrolled courses.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredEnrollments = enrollments.filter((e) => {
    const title = e.course?.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-48 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-full border border-border/50">
              <Skeleton className="aspect-video w-full rounded-t-xl" />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            {enrollments.length} enrolled course{enrollments.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-48 placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEnrollments.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            {enrollments.length === 0
              ? "No courses yet. Explore our catalog and enroll in one!"
              : "No courses match your search."}
          </div>
        ) : (
          filteredEnrollments.map((enrollment, i) => {
            const course = enrollment.course || {};
            const courseId = course._id || course.id;
            const progressPercentage = enrollment.progress?.percentage || 0;
            const completedCount = enrollment.progress?.completedLessons || 0;
            const totalCount = enrollment.progress?.totalLessons || course.totalLessons || 12;
            const enrollmentStatus = enrollment.status || "pending";

            return (
              <FadeIn key={enrollment._id} delay={i * 0.1}>
                <Link href={courseId ? `/dashboard/courses/${courseId}` : "#"}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer">
                    <div className="relative aspect-video bg-muted overflow-hidden rounded-t-xl">
                      {course.thumbnail?.url ? (
                        <img
                          src={course.thumbnail.url}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 text-white ml-0.5" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={cn("px-2 py-1 rounded-md text-xs font-medium", levelColors[course.level || "Beginner"])}>
                          {course.level || "Beginner"}
                        </span>
                        <span className={cn("px-2 py-1 rounded-md text-xs font-medium capitalize", statusColors[enrollmentStatus] || "bg-gray-500 text-white")}>
                          {enrollmentStatus}
                        </span>
                      </div>
                      {progressPercentage === 100 && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-500 text-white">
                            Completed
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="px-2 py-0.5 rounded bg-muted">{course.category || "General"}</span>
                        <span>&bull;</span>
                        <Clock className="h-3 w-3" />
                        <span>{course.duration || "Self-paced"}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            {completedCount}/{totalCount} lectures
                          </span>
                          <span className="font-semibold text-primary">{progressPercentage}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              progressPercentage === 100 ? "bg-green-500" : "bg-primary"
                            )}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-muted overflow-hidden flex items-center justify-center">
                            {course.instructor?.avatar ? (
                              <img
                                src={typeof course.instructor.avatar === "string" ? course.instructor.avatar : course.instructor.avatar?.url}
                                alt={course.instructor.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <span className="text-[10px] font-bold text-muted-foreground">INST</span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{course.instructor?.name || "KKIT Instructor"}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(enrollment.updatedAt)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            );
          })
        )}
      </div>
    </div>
  );
}
