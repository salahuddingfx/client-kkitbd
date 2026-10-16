"use client";

import { Card, CardContent } from "@/components/ui";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";

interface CourseProgressCardProps {
  course: {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: { url: string };
    totalLessons: number;
  };
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  lastAccessed?: string;
}

export function CourseProgressCard({
  course,
  completedLessons,
  totalLessons,
  percentage,
  lastAccessed,
}: CourseProgressCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {course.thumbnail?.url && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={course.thumbnail.url}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-1">{course.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {completedLessons}/{totalLessons} lessons
              </span>
              {lastAccessed && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(lastAccessed).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="mt-2">
              <ProgressBar value={percentage} size="sm" showLabel={false} />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">
                {percentage}% complete
              </span>
              {percentage === 100 && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
