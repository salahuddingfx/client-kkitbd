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
  notes?: string;
  codeExamples?: { title: string; language: string; code: string; description?: string }[];
  attachments?: { title: string; url: string; type: string; size?: number }[];
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
  updatedAt?: string;
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
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api.post<ApiResponse<any>>("/auth/register", data),

  verifyRegister: (data: { email: string; otp: string }) =>
    api.post<ApiResponse<{ user: User }>>("/auth/verify-register", data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<any>>("/auth/login", data),

  verifyLogin: (data: { email: string; otp: string; fingerprint?: string }) =>
    api.post<ApiResponse<{ user: User; deviceInfo?: any }>>("/auth/verify-login", data),

  getMe: () =>
    api.get<ApiResponse<User>>("/auth/me"),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<{ message: string }>>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<{ message: string }>>(`/auth/reset-password/${token}`, { password }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put<ApiResponse<{ message: string }>>("/auth/change-password", data),

  logout: () =>
    api.post<ApiResponse<any>>("/auth/logout"),

  refresh: () =>
    api.post<ApiResponse<any>>("/auth/refresh"),
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

  create: (data: Partial<Course>) =>
    api.post<ApiResponse<Course>>("/courses", data),

  update: (id: string, data: Partial<Course>) =>
    api.put<ApiResponse<Course>>(`/courses/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/courses/${id}`),

  enroll: (id: string) =>
    api.post<ApiResponse<Course>>(`/courses/${id}/enroll`, {}),

  assignMentor: (courseId: string, userId: string) =>
    api.post<ApiResponse<Course>>(`/courses/${courseId}/assign/mentor`, { userId }),

  assignTrainer: (courseId: string, userId: string) =>
    api.post<ApiResponse<Course>>(`/courses/${courseId}/assign/trainer`, { userId }),

  getCoursesByUser: (userId: string) =>
    api.get<ApiResponse<Course[]>>(`/courses/user/${userId}`),
};

// Enrollments API
export const enrollmentsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Enrollment[]>>(`/enrollments${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Enrollment>>(`/enrollments/${id}`),

  updateStatus: (id: string, status: string) =>
    api.put<ApiResponse<Enrollment>>(`/enrollments/${id}/status`, { status }),

  markComplete: (id: string) =>
    api.post<ApiResponse<Enrollment>>(`/enrollments/${id}/complete`, {}),
};

// Assignments API
export const assignmentsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Assignment[]>>(`/assignments${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Assignment>>(`/assignments/${id}`),

  create: (data: Partial<Assignment>) =>
    api.post<ApiResponse<Assignment>>("/assignments", data),

  update: (id: string, data: Partial<Assignment>) =>
    api.put<ApiResponse<Assignment>>(`/assignments/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/assignments/${id}`),

  assignStudents: (id: string, userIds: string[]) =>
    api.post<ApiResponse<Assignment>>(`/assignments/${id}/assign`, { userIds }),

  getStats: (id: string) =>
    api.get<ApiResponse<unknown>>(`/assignments/${id}/stats`),
};

// Submissions API
export const submissionsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Submission[]>>(`/submissions${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Submission>>(`/submissions/${id}`),

  getMySubmissions: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Submission[]>>(`/submissions/my${query}`);
  },

  submit: (data: { assignment: string; courseId: string; textContent?: string; files?: unknown[]; links?: unknown[] }) =>
    api.post<ApiResponse<Submission>>("/submissions", data),

  grade: (id: string, data: { points: number; feedback?: string; rubricScores?: unknown[] }) =>
    api.post<ApiResponse<Submission>>(`/submissions/${id}/grade`, data),

  return: (id: string, returnNote: string) =>
    api.post<ApiResponse<Submission>>(`/submissions/${id}/return`, { returnNote }),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/submissions/${id}`),
};

// User API
export const userApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<User[]>>(`/users${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<User>>(`/users/${id}`),

  update: (id: string, data: Partial<User>) =>
    api.put<ApiResponse<User>>(`/users/${id}`, data),

  changeRole: (id: string, role: string) =>
    api.put<ApiResponse<User>>(`/users/${id}/role`, { role }),
};

// Blog API
export const blogApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<unknown[]>>(`/blogs${query}`);
  },

  getBySlug: (slug: string) =>
    api.get<ApiResponse<unknown>>(`/blogs/${slug}`),

  create: (data: unknown) =>
    api.post<ApiResponse<unknown>>("/blogs", data),

  update: (id: string, data: unknown) =>
    api.put<ApiResponse<unknown>>(`/blogs/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/blogs/${id}`),
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
  getStats: () =>
    api.get<ApiResponse<unknown>>("/dashboard/stats"),

  getEnrollmentChart: () =>
    api.get<ApiResponse<unknown>>("/dashboard/enrollments"),

  getRevenueChart: () =>
    api.get<ApiResponse<unknown>>("/dashboard/revenue"),

  getRecentActivity: () =>
    api.get<ApiResponse<unknown>>("/dashboard/recent"),
};

// Payment API
export type PaymentMethod = "bkash" | "nagad" | "bank_transfer" | "stripe" | "sslcommerz" | "manual";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded" | "cancelled";

export interface PaymentProof {
  transactionId?: string;
  senderNumber?: string;
  screenshot?: { url: string; publicId: string };
  bankName?: string;
  accountNumber?: string;
  branchName?: string;
}

export interface Payment {
  _id: string;
  user: User;
  course: Course;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  billingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  paymentProof?: PaymentProof;
  invoice?: string;
  paidAt?: string;
  createdAt: string;
}

export const paymentApi = {
  create: (data: {
    course: string;
    method: PaymentMethod;
    amount: number;
    billingDetails?: Record<string, string>;
    paymentProof?: PaymentProof;
  }) => api.post<ApiResponse<Payment>>("/payments", data),

  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Payment[]>>(`/payments${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Payment>>(`/payments/${id}`),

  confirm: (id: string) =>
    api.put<ApiResponse<Payment>>(`/payments/${id}/confirm`),

  cancel: (id: string, reason?: string) =>
    api.put<ApiResponse<Payment>>(`/payments/${id}/cancel`, { reason }),

  refund: (id: string, refundAmount?: number) =>
    api.put<ApiResponse<Payment>>(`/payments/${id}/refund`, { refundAmount }),
};

// Testimonials API
export interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  company?: string;
  avatar?: { url: string; publicId: string };
  content: string;
  rating?: number;
  user?: User;
  course?: Course;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  order: number;
  video?: string;
}

export const testimonialsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Testimonial[]>>(`/testimonials${query}`);
  },
};

// Team API
export interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  department?: string;
  bio?: string;
  avatar?: { url: string; publicId: string };
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  user?: User;
  status: "active" | "inactive";
  order: number;
}

export const teamApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<TeamMember[]>>(`/team${query}`);
  },

  getBySlug: (slug: string) =>
    api.get<ApiResponse<TeamMember>>(`/team/${slug}`),
};

// Pricing API
export interface PricingPlan {
  _id: string;
  name: string;
  slug: string;
  price: number;
  period: string;
  description?: string;
  features: { text: string; included: boolean }[];
  isPopular: boolean;
  status: "active" | "inactive";
  order: number;
  badge?: string;
}

export const pricingApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<PricingPlan[]>>(`/pricing${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<PricingPlan>>(`/pricing/${id}`),
};

// Certificates API
export interface Certificate {
  _id: string;
  certificateNumber: string;
  user: User;
  course: Course;
  enrollment?: Enrollment;
  studentName: string;
  courseName: string;
  completionDate: string;
  pdfUrl?: string;
  status: "active" | "revoked";
}

export const certificatesApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Certificate[]>>(`/certificates${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Certificate>>(`/certificates/${id}`),
};

// Reviews API
export interface Review {
  _id: string;
  user: User;
  course: Course;
  rating: number;
  title?: string;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const reviewsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Review[]>>(`/reviews${query}`);
  },

  create: (data: { course: string; rating: number; title?: string; comment: string }) =>
    api.post<ApiResponse<Review>>("/reviews", data),
};

// Invoice API
export interface Invoice {
  _id: string;
  invoiceNumber: string;
  user: User;
  course: Course;
  payment: Payment;
  amount: number;
  tax: number;
  total: number;
  status: "pending" | "paid" | "cancelled" | "refunded";
  paymentMethod: string;
  billingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  items: { description: string; amount: number }[];
  pdfUrl?: string;
  paidAt?: string;
  createdAt: string;
}

export const invoiceApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get<ApiResponse<Invoice[]>>(`/invoices${query}`);
  },

  getById: (id: string) =>
    api.get<ApiResponse<Invoice>>(`/invoices/${id}`),

  downloadPdf: async (id: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const response = await fetch(`${baseUrl}/invoices/${id}/pdf`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to download PDF");
    return response.blob();
  },
};

// Devices API
export interface DeviceSession {
  _id: string;
  user: string;
  fingerprint: string;
  userAgent: string;
  ip: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
  isActive: boolean;
  lastActivity: string;
  expiresAt: string;
  createdAt: string;
}

export const devicesApi = {
  getActive: () =>
    api.get<ApiResponse<DeviceSession[]>>("/devices"),

  remove: (deviceId: string) =>
    api.delete<ApiResponse<null>>(`/devices/${deviceId}`),

  removeAll: () =>
    api.delete<ApiResponse<null>>("/devices"),
};

// Upload API
export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
  bytes: number;
  thumbnail?: string;
}

export const uploadApi = {
  single: (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);
    return api.upload<ApiResponse<UploadResult>>("/upload/single", formData);
  },

  multiple: (files: File[], folder?: string) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    if (folder) formData.append("folder", folder);
    return api.upload<ApiResponse<UploadResult[]>>("/upload/multiple", formData);
  },

  remove: (publicId: string, resourceType?: string) =>
    api.delete<ApiResponse<null>>(`/upload/${encodeURIComponent(publicId)}${resourceType ? `?resourceType=${resourceType}` : ""}`),

  removeMultiple: (publicIds: string[]) =>
    api.post<ApiResponse<null>>("/upload/delete-multiple", { publicIds }),
};

// Notice API
export interface Notice {
  _id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "urgent" | "maintenance" | "general";
  priority: "low" | "medium" | "high" | "critical";
  targetAudience: "all" | "students" | "instructors" | "admins";
  author: { _id: string; name: string; avatar?: string };
  isActive: boolean;
  isPinned: boolean;
  expiresAt?: string;
  attachments?: { url: string; publicId: string; name: string; type: string }[];
  readBy: { user: string; readAt: string }[];
  createdAt: string;
}

export const noticesApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<ApiResponse<Notice[]>>(`/notices${params ? `?${new URLSearchParams(params)}` : ""}`),

  getById: (id: string) =>
    api.get<ApiResponse<Notice>>(`/notices/${id}`),

  create: (data: Partial<Notice>) =>
    api.post<ApiResponse<Notice>>("/notices", data),

  update: (id: string, data: Partial<Notice>) =>
    api.put<ApiResponse<Notice>>(`/notices/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/notices/${id}`),

  markAsRead: (id: string) =>
    api.post<ApiResponse<Notice>>(`/notices/${id}/read`),

  getUnreadCount: () =>
    api.get<ApiResponse<{ count: number }>>("/notices/unread/count"),
};
