"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Mail, Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button, Label } from "@/components/ui";
import { OTPInput } from "@/components/ui/OTPInput";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";
import { authApi } from "@/services/api";

async function getBrowserFingerprint(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth.toString(),
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset().toString(),
    navigator.hardwareConcurrency?.toString() || "0",
    navigator.platform,
  ];
  const raw = components.join("|||");
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiFlutter,
  SiTailwindcss,
  SiPython,
} from "react-icons/si";

const credentialsSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type CredentialsFormData = z.infer<typeof credentialsSchema>;

const OTP_EXPIRY = 60;

const techStack = [
  { name: "React", Icon: SiReact, color: "#61DAFB", bg: "rgba(97,218,251,0.15)" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000", bg: "rgba(0,0,0,0.08)" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", bg: "rgba(49,120,198,0.15)" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F0DB4F", bg: "rgba(240,219,79,0.2)" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", bg: "rgba(51,153,51,0.15)" },
  { name: "Flutter", Icon: SiFlutter, color: "#02569B", bg: "rgba(2,86,155,0.15)" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", bg: "rgba(6,182,212,0.15)" },
  { name: "Python", Icon: SiPython, color: "#3776AB", bg: "rgba(55,118,171,0.15)" },
];

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [formData, setFormData] = useState<CredentialsFormData | null>(null);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(OTP_EXPIRY);
  const dispatch = useAppDispatch();

  const credentialsForm = useForm<CredentialsFormData>({
    resolver: zodResolver(credentialsSchema),
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

  /* ---------- step 1: credentials ---------- */
  const onCredentialsSubmit = async (data: CredentialsFormData) => {
    setFormData(data);
    setIsSubmitting(true);
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });
      if (response.success && response.data.otpRequired) {
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
      const fp = await getBrowserFingerprint();
      const response = await authApi.verifyLogin({
        email: formData.email,
        otp,
        fingerprint: fp,
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
          })
        );
        toast.success("Login successful!");
        window.location.href = redirectTo;
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
    if (!formData?.email || !formData?.password) return;
    setIsSubmitting(true);
    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      if (response.success && response.data.otpRequired) {
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
      {/* ===== Left Side - Tech Stack ===== */}
      <div className="hidden lg:flex lg:w-1/2 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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
              Master the Tech Stack
              <br />
              <span className="text-primary">That Powers the Future</span>
            </h1>
            <p className="text-muted-foreground mb-10 max-w-md">
              Learn from industry experts and build real-world projects with the most in-demand technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <div
                  className="tech-card flex flex-col items-center gap-3 p-4 rounded-2xl
                    bg-background border border-border
                    shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.03)]"
                  style={{
                    ["--tech-color" as string]: tech.color,
                    ["--tech-bg" as string]: tech.bg,
                  }}
                >
                  <tech.Icon className="tech-icon h-8 w-8 text-muted-foreground transition-all duration-300" />
                  <span className="tech-label text-xs font-medium text-muted-foreground transition-colors">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>500+ Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>95% Success</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Right Side - Form ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-block mb-8 lg:hidden">
            <span className="text-2xl font-bold text-primary">KKIT</span>
          </Link>

          <AnimatePresence mode="wait">
            {/* ---------- Step 1: Credentials ---------- */}
            {step === "credentials" && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
                  <p className="text-muted-foreground mt-2">
                    Sign in to continue your learning journey
                  </p>
                </div>

                <form onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)} className="space-y-4">
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
                        {...credentialsForm.register("email")}
                      />
                    </div>
                    {credentialsForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {credentialsForm.formState.errors.email.message}
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
                        placeholder="Enter your password"
                        className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-11 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        {...credentialsForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {credentialsForm.formState.errors.password && (
                      <p className="text-sm text-destructive">
                        {credentialsForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-12" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending OTP..." : "Login"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            )}

            {/* ---------- Step 2: OTP ---------- */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <button
                    onClick={() => {
                      setStep("credentials");
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
                  <h2 className="text-3xl font-bold text-foreground">Check your email</h2>
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
                    {isSubmitting ? "Verifying..." : "Login"}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
