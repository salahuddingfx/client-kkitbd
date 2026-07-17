import api from "@/lib/api";

// Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: { url: string; publicId: string };
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: { url: string; publicId: string };
  instructor: User;
  category: string;
  tags: string[];
  level: string;
  price: number;
  discountPrice?: number;
  totalDuration: number;
  totalLessons: number;
  enrolledStudents: number;
  rating: { average: number; count: number };
  status: string;
  isFeatured: boolean;
  modules: CourseModule[];
}

export interface CourseModule {
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  isFree: boolean;
}

export interface Enrollment {
  _id: string;
  user: User;
  course: Course;
  status: string;
  progress: {
    completedLessons: number;
    totalLessons: number;
    percentage: number;
  };
  enrolledAt: string;
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: Course;
  module?: string;
  maxPoints: number;
  passingPoints: number;
  dueDate: string;
  submissionType: string;
  status: string;
}

export interface Submission {
  _id: string;
  assignment: Assignment;
  student: User;
  course: Course;
  textContent?: string;
  files?: { title: string; url: string }[];
  links?: { title: string; url: string }[];
  submittedAt: string;
  isLate: boolean;
  status: string;
  grade?: {
    points: number;
    percentage: number;
    letter: string;
    gradedAt: string;
    gradedBy: User;
  };
  feedback?: {
    text: string;
    givenAt: string;
    givenBy: User;
  };
}

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>>("/auth/login", data),

  getMe: (token: string) =>
    api.get<ApiResponse<User>>("/auth/me", { token }),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<{ message: string }>>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<{ message: string }>>(`/auth/reset-password/${token}`, { password }),
};

// Courses API
export const coursesApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Course[]>>(`/courses${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Course>>(`/courses/${id}`),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Course>>(`/courses/slug/${slug}`),

  create: (data: Partial<Course>, token: string) =>
    api.post<ApiResponse<Course>>("/courses", data, { token }),

  update: (id: string, data: Partial<Course>, token: string) =>
    api.put<ApiResponse<Course>>(`/courses/${id}`, data, { token }),

  delete: (id: string, token: string) =>
    api.delete<ApiResponse<null>>(`/courses/${id}`, { token }),

  enroll: (id: string, token: string) =>
    api.post<ApiResponse<Course>>(`/courses/${id}/enroll`, {}, { token }),

  assignMentor: (courseId: string, userId: string, token: string) =>
    api.post<ApiResponse<Course>>(`/courses/${courseId}/assign/mentor`, { userId }, { token }),

  assignTrainer: (courseId: string, userId: string, token: string) =>
    api.post<ApiResponse<Course>>(`/courses/${courseId}/assign/trainer`, { userId }, { token }),

  getCoursesByUser: (userId: string, token: string) =>
    api.get<ApiResponse<Course[]>>(`/courses/user/${userId}`, { token }),
};

// Enrollments API
export const enrollmentsApi = {
  getAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Enrollment[]>>(`/enrollments${query}`, { token });
  },

  getById: (id: string, token: string) =>
    api.get<ApiResponse<Enrollment>>(`/enrollments/${id}`, { token }),

  updateStatus: (id: string, status: string, token: string) =>
    api.put<ApiResponse<Enrollment>>(`/enrollments/${id}/status`, { status }, { token }),

  markComplete: (id: string, token: string) =>
    api.post<ApiResponse<Enrollment>>(`/enrollments/${id}/complete`, {}, { token }),
};

// Assignments API
export const assignmentsApi = {
  getAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Assignment[]>>(`/assignments${query}`, { token });
  },

  getById: (id: string, token: string) =>
    api.get<ApiResponse<Assignment>>(`/assignments/${id}`, { token }),

  create: (data: Partial<Assignment>, token: string) =>
    api.post<ApiResponse<Assignment>>("/assignments", data, { token }),

  update: (id: string, data: Partial<Assignment>, token: string) =>
    api.put<ApiResponse<Assignment>>(`/assignments/${id}`, data, { token }),

  delete: (id: string, token: string) =>
    api.delete<ApiResponse<null>>(`/assignments/${id}`, { token }),

  assignStudents: (id: string, userIds: string[], token: string) =>
    api.post<ApiResponse<Assignment>>(`/assignments/${id}/assign`, { userIds }, { token }),

  getStats: (id: string, token: string) =>
    api.get<ApiResponse<unknown>>(`/assignments/${id}/stats`, { token }),
};

// Submissions API
export const submissionsApi = {
  getAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Submission[]>>(`/submissions${query}`, { token });
  },

  getById: (id: string, token: string) =>
    api.get<ApiResponse<Submission>>(`/submissions/${id}`, { token }),

  getMySubmissions: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Submission[]>>(`/submissions/my${query}`, { token });
  },

  submit: (data: { assignment: string; courseId: string; textContent?: string; files?: unknown[]; links?: unknown[] }, token: string) =>
    api.post<ApiResponse<Submission>>("/submissions", data, { token }),

  grade: (id: string, data: { points: number; feedback?: string; rubricScores?: unknown[] }, token: string) =>
    api.post<ApiResponse<Submission>>(`/submissions/${id}/grade`, data, { token }),

  return: (id: string, returnNote: string, token: string) =>
    api.post<ApiResponse<Submission>>(`/submissions/${id}/return`, { returnNote }, { token }),

  delete: (id: string, token: string) =>
    api.delete<ApiResponse<null>>(`/submissions/${id}`, { token }),
};

// User API
export const userApi = {
  getAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<User[]>>(`/users${query}`, { token });
  },

  getById: (id: string, token: string) =>
    api.get<ApiResponse<User>>(`/users/${id}`, { token }),

  update: (id: string, data: Partial<User>, token: string) =>
    api.put<ApiResponse<User>>(`/users/${id}`, data, { token }),

  changeRole: (id: string, role: string, token: string) =>
    api.put<ApiResponse<User>>(`/users/${id}/role`, { role }, { token }),
};

// Blog API
export const blogApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<unknown[]>>(`/blogs${query}`);
  },

  getBySlug: (slug: string) =>
    api.get<ApiResponse<unknown>>(`/blogs/${slug}`),

  create: (data: unknown, token: string) =>
    api.post<ApiResponse<unknown>>("/blogs", data, { token }),

  update: (id: string, data: unknown, token: string) =>
    api.put<ApiResponse<unknown>>(`/blogs/${id}`, data, { token }),

  delete: (id: string, token: string) =>
    api.delete<ApiResponse<null>>(`/blogs/${id}`, { token }),
};

// Contact API
export const contactApi = {
  send: (data: { name: string; email: string; subject: string; message: string; phone?: string }) =>
    api.post<ApiResponse<unknown>>("/contact", data),
};

// Newsletter API
export const newsletterApi = {
  subscribe: (data: { email: string; name?: string }) =>
    api.post<ApiResponse<unknown>>("/newsletter", data),
};

// Dashboard API (Admin)
export const dashboardApi = {
  getStats: (token: string) =>
    api.get<ApiResponse<unknown>>("/dashboard/stats", { token }),

  getEnrollmentChart: (token: string) =>
    api.get<ApiResponse<unknown>>("/dashboard/enrollments", { token }),

  getRevenueChart: (token: string) =>
    api.get<ApiResponse<unknown>>("/dashboard/revenue", { token }),

  getRecentActivity: (token: string) =>
    api.get<ApiResponse<unknown>>("/dashboard/recent", { token }),
};

// Payment API
export const paymentApi = {
  create: (data: { course: string; method: string; billingDetails?: unknown }, token: string) =>
    api.post<ApiResponse<unknown>>("/payments", data, { token }),

  getAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<unknown[]>>(`/payments${query}`, { token });
  },
};

// Invoice API
export const invoiceApi = {
  getAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<unknown[]>>(`/invoices${query}`, { token });
  },

  getById: (id: string, token: string) =>
    api.get<ApiResponse<unknown>>(`/invoices/${id}`, { token }),

  downloadPdf: async (id: string, token: string) => {
    const response = await fetch(`${API_URL}/invoices/${id}/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.blob();
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
