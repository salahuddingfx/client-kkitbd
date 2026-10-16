import api from "@/lib/api";

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  lessons: Array<{
    lesson: string | number;
    completed: boolean;
    watchTime: number;
    lastPosition: number;
  }>;
}

export interface UserCourseProgress {
  _id: string;
  course: {
    _id: string;
    title: string;
    slug: string;
    thumbnail: { url: string; publicId: string };
    totalLessons: number;
  };
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  lastAccessed: string;
}

export const progressApi = {
  markComplete: (courseId: string, lessonId: string) =>
    api.post<any>(`/progress/${courseId}/${lessonId}/complete`),

  updateProgress: (courseId: string, lessonId: string, data: { watchTime?: number; lastPosition?: number }) =>
    api.put<any>(`/progress/${courseId}/${lessonId}`, data),

  getCourseProgress: (courseId: string) =>
    api.get<CourseProgress>(`/progress/${courseId}`),

  getUserCoursesProgress: () =>
    api.get<UserCourseProgress[]>("/progress/dashboard"),

  deleteProgress: (courseId: string, lessonId: string) =>
    api.delete(`/progress/${courseId}/${lessonId}`),
};
