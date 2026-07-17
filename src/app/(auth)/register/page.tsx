"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  CheckCircle2,
  Users,
  BookOpen,
  Trophy,
  Sparkles,
  GraduationCap,
  Target,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button, Label, PhoneInput } from "@/components/ui";
import { OTPInput } from "@/components/ui/OTPInput";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";
import { authApi } from "@/services/api";

const stepOneSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    acceptedTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.acceptedTerms === true, {
    message: "You must accept the terms and conditions",
    path: ["acceptedTerms"],
  });

type StepOneData = z.infer<typeof stepOneSchema>;

const OTP_EXPIRY = 60;

const features = [
  {
    icon: BookOpen,
    title: "500+ Expert-Led Courses",
    description: "From web development to AI, master in-demand skills.",
  },
  {
    icon: Users,
    title: "10,000+ Community",
    description: "Join a global community of learners and mentors.",
  },
  {
    icon: Trophy,
    title: "Industry Certificates",
    description: "Get recognized certificates to boost your career.",
  },
  {
    icon: Target,
    title: "Job Placement Support",
    description: "Career guidance and job placement assistance.",
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState<"info" | "otp">("info");
  const [formData, setFormData] = useState<StepOneData | null>(null);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [phone, setPhone] = useState("");
  const [timer, setTimer] = useState(OTP_EXPIRY);
  const dispatch = useAppDispatch();

  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
  });

  /* ---------- countdown timer ---------- */
  useEffect(() => {
    if (step !== "otp") return;
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [step, timer]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  /* ---------- step 1: info ---------- */
  const onStepOneSubmit = async (data: StepOneData) => {
    setFormData(data);
    setIsSubmitting(true);
    try {
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      if (response.success) {
        toast.success(response.message || "OTP sent to your email!");
        setTimer(OTP_EXPIRY);
        setStep("otp");
      } else {
        toast.error(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error.message || "Failed to send OTP. Please try again.";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- step 2: otp verify ---------- */
  const onOTPVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    if (!formData?.email) return;
    setIsSubmitting(true);
    try {
      const response = await authApi.verifyRegister({
        email: formData.email,
        otp,
      });
      if (response.success) {
        const payload = response.data;
        dispatch(
          login({
            user: {
              id: payload.user._id,
              name: payload.user.name,
              email: payload.user.email,
            },
            token: payload.accessToken,
          })
        );
        toast.success("Account created successfully! Welcome aboard.");
        window.location.href = "/dashboard";
      } else {
        toast.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error.message || "Invalid OTP. Please try again.";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- resend ---------- */
  const resendOTP = useCallback(async () => {
    if (!formData?.email) return;
    setIsSubmitting(true);
    try {
      const response = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      if (response.success) {
        setTimer(OTP_EXPIRY);
        setOtp("");
        toast.success("OTP resent to your email!");
      } else {
        toast.error(response.message || "Failed to resend OTP.");
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error.message || "Failed to resend OTP.";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen flex">
      {/* ===== Left Side - Form ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-block mb-8 lg:hidden">
            <span className="text-2xl font-bold text-primary">KKIT</span>
          </Link>

          <AnimatePresence mode="wait">
            {/* ---------- Step 1: Info ---------- */}
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Create your account</h2>
                  <p className="text-muted-foreground mt-2">
                    Start your learning journey today
                  </p>
                </div>

                <form
                  onSubmit={stepOneForm.handleSubmit(onStepOneSubmit)}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        {...stepOneForm.register("name")}
                      />
                    </div>
                    {stepOneForm.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {stepOneForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        {...stepOneForm.register("email")}
                      />
                    </div>
                    {stepOneForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {stepOneForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <PhoneInput
                      value={phone}
                      onChange={(v) => {
                        setPhone(v);
                        stepOneForm.setValue("phone", v, { shouldValidate: true });
                      }}
                    />
                    {stepOneForm.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {stepOneForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-11 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        {...stepOneForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {stepOneForm.formState.errors.password && (
                      <p className="text-sm text-destructive">
                        {stepOneForm.formState.errors.password.message}
                      </p>
                    )}

                    {/* Password Strength Checker */}
                    {stepOneForm.watch("password") && (
                      <PasswordStrength password={stepOneForm.watch("password")} />
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-11 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        {...stepOneForm.register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {stepOneForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {stepOneForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => {
                          setAcceptedTerms(e.target.checked);
                          stepOneForm.setValue("acceptedTerms", e.target.checked as true, {
                            shouldValidate: true,
                          });
                        }}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                      />
                      <span className="text-sm text-muted-foreground leading-snug">
                        I accept the{" "}
                        <Link href="/terms-conditions" target="_blank" className="text-primary font-medium hover:underline">
                          Terms &amp; Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" target="_blank" className="text-primary font-medium hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {stepOneForm.formState.errors.acceptedTerms && (
                      <p className="text-sm text-destructive">
                        {stepOneForm.formState.errors.acceptedTerms.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-12" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending OTP..." : "Send Verification Code"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            )}

            {/* ---------- Step 2: OTP ---------- */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <button
                    onClick={() => {
                      setStep("info");
                      setOtp("");
                    }}
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back
                  </button>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Verify your email</h2>
                  <p className="text-muted-foreground mt-2">
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-foreground">{formData?.email}</span>
                  </p>
                </div>

                <div className="space-y-6">
                  <OTPInput length={6} value={otp} onChange={setOtp} />

                  {/* Timer + Resend */}
                  <div className="flex items-center justify-between">
                    {timer > 0 ? (
                      <span className="text-sm text-muted-foreground">
                        Resend code in{" "}
                        <span className="font-mono font-semibold text-foreground">
                          {formatTime(timer)}
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Code expired</span>
                    )}
                    <button
                      onClick={resendOTP}
                      disabled={timer > 0 || isSubmitting}
                      className="text-sm font-medium text-primary hover:underline disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:no-underline transition-all"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <Button
                    onClick={onOTPVerify}
                    className="w-full h-12"
                    size="lg"
                    disabled={isSubmitting || otp.length !== 6}
                  >
                    {isSubmitting ? "Verifying..." : "Create Account"}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== Right Side - Info ===== */}
      <div className="hidden lg:flex lg:w-1/2 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-32 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <Link href="/" className="inline-block mb-12">
            <span className="text-3xl font-bold text-primary">KKIT</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
              Your Future in Tech
              <br />
              <span className="text-primary">Starts Here</span>
            </h1>
            <p className="text-muted-foreground mb-10 max-w-md">
              Join thousands of learners who have transformed their careers with our expert-led courses and hands-on projects.
            </p>
          </motion.div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div
                  className="tech-card w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                    bg-background border border-border
                    shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.03)]"
                  style={{
                    ["--tech-color" as string]: "#dc2626",
                    ["--tech-bg" as string]: "rgba(220,38,38,0.08)",
                  }}
                >
                  <feature.icon className="tech-icon h-5 w-5 text-muted-foreground transition-all duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 p-4 rounded-2xl bg-background border border-border
              shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
              dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.03)]"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground font-medium">
                Free 7-day trial on all plans
              </span>
              <Sparkles className="h-4 w-4 text-yellow-500 ml-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Password Strength Component ---------- */
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "Number", test: (p: string) => /[0-9]/.test(p) },
    { label: "Special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  const passed = checks.filter((c) => c.test(password)).length;
  const level = passed <= 1 ? "weak" : passed <= 3 ? "medium" : "strong";
  const colors = { weak: "bg-red-500", medium: "bg-yellow-500", strong: "bg-green-500" };
  const labels = { weak: "Weak", medium: "Medium", strong: "Strong" };

  return (
    <div className="space-y-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                i < (level === "weak" ? 1 : level === "medium" ? 2 : 3)
                  ? colors[level]
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${
          level === "weak" ? "text-red-500" : level === "medium" ? "text-yellow-500" : "text-green-500"
        }`}>
          {labels[level]}
        </span>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                check.test(password) ? "bg-green-500" : "bg-muted-foreground/30"
              }`}
            />
            <span className={`text-xs ${
              check.test(password) ? "text-muted-foreground" : "text-muted-foreground/60"
            }`}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
