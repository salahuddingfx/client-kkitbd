"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  CreditCard,
  ArrowRight,
  Play,
  Loader2,
} from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatCurrency, formatDate } from "@/utils";
import {
  mockDashboardStats,
  mockEnrolledCourses,
  mockActivity,
} from "@/services/dashboard-data";
import { useAppSelector } from "@/redux/hooks";
import { enrollmentsApi, paymentApi } from "@/services/api";

const activityIcons = {
  course_progress: TrendingUp,
  certificate: Award,
  payment: CreditCard,
  wishlist: BookOpen,
  profile: BookOpen,
};

export default function DashboardOverviewPage() {
  const { token, user: authUser } = useAppSelector((state) => state.auth);
  const userName = authUser?.name || "Student";

  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      enrollmentsApi.getAll(undefined, token),
      paymentApi.getAll(undefined, token),
    ])
      .then(([enrollmentsRes, paymentsRes]) => {
        if (enrollmentsRes.success) {
          setEnrollments(enrollmentsRes.data);
        }
        if (paymentsRes.success) {
          setPayments(paymentsRes.data);
        }
      })
      .catch((err) => {
        console.error("Error loading dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const enrolledCount = enrollments.length;
  const completedCount = enrollments.filter(
    (e) => e.status === "completed" || e.progress?.percentage === 100
  ).length;
  const totalSpent = payments.reduce(
    (acc, p) => (p.status === "completed" ? acc + p.amount : acc),
    0
  );
  const totalHours = Math.round(
    enrollments.reduce((acc, e) => {
      const duration = e.course?.totalDuration || 0;
      const progress = e.progress?.percentage || 0;
      return acc + (duration * progress) / 100;
    }, 0)
  );

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCount,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: Award,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Hours Learned",
      value: totalHours,
      icon: Clock,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: CreditCard,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  const activeCourses = enrollments.filter(
    (e) => e.status === "active" && (e.progress?.percentage || 0) < 100
  );

  const recentActivity = [
    ...enrollments.map((e) => ({
      id: e._id,
      type: "course_progress" as const,
      title: `Enrolled in ${e.course?.title || "Course"}`,
      description:
        e.status === "completed"
          ? "Completed the course!"
          : `Progress is at ${e.progress?.percentage || 0}%`,
      date: e.createdAt,
    })),
    ...payments.map((p) => ({
      id: p._id,
      type: "payment" as const,
      title: `Payment ${p.status.toUpperCase()}`,
      description: `Amount: ${formatCurrency(p.amount)} via ${p.method}`,
      date: p.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Welcome Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning Skeleton */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border/50">
                      <Skeleton className="relative w-20 h-14 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-1.5 w-full rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-8 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Skeleton */}
          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-32 mb-2" />
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-2.5 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your learning journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Continue Learning</h2>
                  <Link
                    href="/dashboard/courses"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {activeCourses.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No active courses. Enroll in a course to get started!
                    </p>
                  ) : (
                    activeCourses.slice(0, 3).map((enrollment) => (
                      <div
                        key={enrollment._id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="relative w-20 h-14 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          {enrollment.course?.thumbnail?.url ? (
                            <img
                              src={enrollment.course.thumbnail.url}
                              alt={enrollment.course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-6 w-6 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {enrollment.course?.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {enrollment.progress?.completedLessons || 0}/
                            {enrollment.progress?.totalLessons ||
                              enrollment.course?.totalLessons ||
                              12}{" "}
                            lectures
                          </p>
                          <div className="mt-2">
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${enrollment.progress?.percentage || 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-primary">
                            {enrollment.progress?.percentage || 0}%
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Recent Activity */}
        <div>
          <FadeIn delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No recent activity.
                    </p>
                  ) : (
                    recentActivity.map((activity) => {
                      const Icon = activityIcons[activity.type] || BookOpen;
                      return (
                        <div key={activity.id} className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {activity.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(activity.date)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
