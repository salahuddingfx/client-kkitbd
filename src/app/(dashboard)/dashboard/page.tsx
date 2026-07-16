"use client";

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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatCurrency, formatDate } from "@/utils";
import {
  mockDashboardStats,
  mockEnrolledCourses,
  mockActivity,
} from "@/services/dashboard-data";

const stats = [
  {
    label: "Enrolled Courses",
    value: mockDashboardStats.enrolledCourses,
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Completed",
    value: mockDashboardStats.completedCourses,
    icon: Award,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Hours Learned",
    value: mockDashboardStats.hoursLearned,
    icon: Clock,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Total Spent",
    value: formatCurrency(mockDashboardStats.totalSpent),
    icon: CreditCard,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const activityIcons = {
  course_progress: TrendingUp,
  certificate: Award,
  payment: CreditCard,
  wishlist: BookOpen,
  profile: BookOpen,
};

export default function DashboardOverviewPage() {
  const activeCourses = mockEnrolledCourses.filter((c) => c.progress < 100);
  const recentActivity = mockActivity.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, Rafiq!</h1>
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
                  {activeCourses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative w-20 h-14 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {course.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {course.completedLectures}/{course.lectures} lectures
                        </p>
                        <div className="mt-2">
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-primary">{course.progress}%</p>
                      </div>
                    </div>
                  ))}
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
                  {recentActivity.map((activity) => {
                    const Icon = activityIcons[activity.type];
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
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
