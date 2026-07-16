export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  discountPrice?: number;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  duration: string;
  lectures: number;
  instructor: {
    name: string;
    avatar: string;
  };
  updatedAt: string;
}

export interface EnrolledCourse extends Course {
  enrolledAt: string;
  progress: number;
  lastAccessedAt: string;
  completedLectures: number;
  currentLecture: number;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  completedAt: string;
  certificateUrl: string;
  instructor: string;
}

export interface Payment {
  id: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  invoiceUrl: string;
  method: string;
}

export interface WishlistItem {
  id: string;
  course: Course;
  addedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  role: "student" | "instructor" | "admin";
}

export interface Activity {
  id: string;
  type: "course_progress" | "certificate" | "payment" | "wishlist" | "profile";
  title: string;
  description: string;
  date: string;
  courseId?: string;
}

export interface DashboardStats {
  enrolledCourses: number;
  completedCourses: number;
  certificates: number;
  totalSpent: number;
  hoursLearned: number;
}
