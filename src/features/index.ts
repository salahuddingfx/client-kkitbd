export { IMAGES } from "@/assets";
export { SITE_CONFIG, DASHBOARD_CONFIG, COURSE_CONFIG } from "@/config";
export {
  loginSchema,
  registerSchema,
  otpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  profileSchema,
  changePasswordSchema,
  contactSchema,
} from "@/schemas";
export type {
  LoginInput,
  RegisterInput,
  OTPInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ProfileInput,
  ChangePasswordInput,
  ContactInput,
} from "@/schemas";
export {
  cn,
  formatDate,
  formatCurrency,
  formatNumber,
  truncate,
  slugify,
  getInitials,
  generateId,
  debounce,
  getProgressColor,
  getProgressBg,
} from "@/utils";
export type {
  Course,
  EnrolledCourse,
  Certificate,
  WishlistItem,
  UserProfile,
  Activity,
  DashboardStats,
} from "@/types/dashboard";
