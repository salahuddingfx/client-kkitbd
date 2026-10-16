"use client";

import { useState, useEffect, useCallback } from "react";
import { progressApi, CourseProgress, UserCourseProgress } from "@/services/progressApi";

export const useCourseProgress = (courseId: string) => {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await progressApi.getCourseProgress(courseId);
      setProgress(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch progress");
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = useCallback(
    async (lessonId: string) => {
      try {
        await progressApi.markComplete(courseId, lessonId);
        await fetchProgress();
        return true;
      } catch {
        return false;
      }
    },
    [courseId, fetchProgress]
  );

  const updateProgress = useCallback(
    async (lessonId: string, data: { watchTime?: number; lastPosition?: number }) => {
      try {
        await progressApi.updateProgress(courseId, lessonId, data);
        return true;
      } catch {
        return false;
      }
    },
    [courseId]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string | number) => {
      return progress?.lessons.some(
        (l) => l.lesson === lessonId && l.completed
      ) || false;
    },
    [progress]
  );

  return {
    progress,
    isLoading,
    error,
    markComplete,
    updateProgress,
    isLessonCompleted,
    refetch: fetchProgress,
  };
};

export const useUserProgress = () => {
  const [coursesProgress, setCoursesProgress] = useState<UserCourseProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await progressApi.getUserCoursesProgress();
      setCoursesProgress(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch progress");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    coursesProgress,
    isLoading,
    error,
    refetch: fetchProgress,
  };
};
