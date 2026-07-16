export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor: Instructor;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  enrolledStudents: number;
  rating: number;
  price: number;
  discountPrice?: number;
  image: string;
  modules: Module[];
  isFeatured: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readingTime: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  client: string;
  duration: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  avatar: string;
  bio: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
