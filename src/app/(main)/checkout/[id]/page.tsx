"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShieldCheck,
  CreditCard,
  Building2,
  Smartphone,
  Tag,
  AlertCircle,
  Play,
  Loader2,
  BookOpen,
} from "lucide-react";
import { Button, Badge, Skeleton } from "@/components/ui";
import { Container } from "@/components/common";
import { coursesApi, paymentApi, offersApi, Course } from "@/services/api";
import { useAppSelector } from "@/redux/hooks";
import { trackGA4BeginCheckout, trackGA4Purchase } from "@/lib/tracking";

export default function FullPageCheckout() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAppSelector((state) => state.auth);

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Payment Form State
  const [method, setMethod] = useState<"bkash" | "nagad" | "rocket" | "bank" | "card">("bkash");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await coursesApi.getById(id);
        if (res.data) {
          setCourse(res.data);
          trackGA4BeginCheckout({
            id: res.data._id,
            name: res.data.title,
            value: res.data.discountPrice || res.data.price || 0,
          });
        } else {
          setCourse(null);
        }
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError("");
    try {
      const res: any = await offersApi.validateCoupon(couponCode);
      const data = res.data?.data || res.data;
      if (data && (data.discountValue || data.discountPercentage || data.code)) {
        const calcDiscount = data.discountValue || 200;
        setDiscountAmount(calcDiscount);
        setCouponApplied(true);
      } else {
        setCouponError("Invalid or expired coupon code");
      }
    } catch (err: any) {
      setCouponError(err.message || "Failed to validate coupon");
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/login?redirect=/checkout/${id}`);
      return;
    }

    if (["bkash", "nagad", "rocket"].includes(method) && (!senderNumber || !transactionId)) {
      setErrorMsg("Please enter your MFS Sender Number and Transaction ID");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const basePrice = course?.discountPrice || course?.price || 0;
    const finalAmount = Math.max(0, basePrice - discountAmount);

    try {
      const res: any = await paymentApi.create({
        course: id,
        amount: finalAmount,
        method: method as any,
        couponCode: couponApplied ? couponCode : undefined,
        paymentProof: senderNumber || transactionId ? {
          accountNumber: senderNumber,
          transactionId: transactionId,
        } : undefined,
      });

      if (res.success || res.data) {
        trackGA4Purchase({
          transaction_id: res.data?._id || transactionId || `TX-${Date.now()}`,
          value: finalAmount,
          item_id: id,
          item_name: course?.title || "Course Enrollment",
          coupon: couponApplied ? couponCode : undefined,
        });

        setSuccessMsg("Payment submitted successfully! Directing to your enrolled dashboard...");
        setTimeout(() => {
          router.push("/dashboard/courses");
        }, 1800);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || "Payment submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="md:col-span-2 h-96 rounded-2xl" />
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <Button asChild><Link href="/courses">Browse Courses</Link></Button>
        </div>
      </div>
    );
  }

  const basePrice = course.discountPrice || course.price || 0;
  const originalPrice = course.price || 0;
  const finalPayable = Math.max(0, basePrice - discountAmount);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-background-secondary">
      <Container className="max-w-5xl">
        {/* Top Back Link */}
        <div className="mb-6">
          <Link href={`/courses/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Course Details
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Section (Payment Method & Details) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Lock className="h-6 w-6 text-emerald-500" /> Secure Checkout
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete your enrollment by choosing your preferred payment method.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> {successMsg}
                </div>
              )}

              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Select Payment Method */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    1. Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setMethod("bkash")}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        method === "bkash"
                          ? "border-pink-500 bg-pink-500/10 text-pink-600 font-bold shadow-xs"
                          : "border-border hover:border-pink-500/40 text-muted-foreground"
                      }`}
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">bKash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod("nagad")}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        method === "nagad"
                          ? "border-orange-500 bg-orange-500/10 text-orange-600 font-bold shadow-xs"
                          : "border-border hover:border-orange-500/40 text-muted-foreground"
                      }`}
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">Nagad</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod("rocket")}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        method === "rocket"
                          ? "border-purple-500 bg-purple-500/10 text-purple-600 font-bold shadow-xs"
                          : "border-border hover:border-purple-500/40 text-muted-foreground"
                      }`}
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">Rocket</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => setMethod("bank")}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        method === "bank"
                          ? "border-blue-500 bg-blue-500/10 text-blue-600 font-bold shadow-xs"
                          : "border-border hover:border-blue-500/40 text-muted-foreground"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs">Bank Transfer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod("card")}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        method === "card"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold shadow-xs"
                          : "border-border hover:border-emerald-500/40 text-muted-foreground"
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="text-xs">Debit / Credit Card</span>
                    </button>
                  </div>
                </div>

                {/* MFS Payment Instructions & Form */}
                {["bkash", "nagad", "rocket"].includes(method) && (
                  <div className="p-4 rounded-xl bg-muted/40 border space-y-4">
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-foreground">Payment Instructions:</p>
                      <p className="text-muted-foreground">
                        Send <strong className="text-primary">৳{finalPayable.toLocaleString()}</strong> to our Merchant Account number:
                      </p>
                      <p className="text-sm font-mono font-bold text-foreground bg-background px-3 py-1.5 rounded-lg border w-fit">
                        +8801700000000 ({method.toUpperCase()} Merchant)
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">
                          Your Sender Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 01712345678"
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">
                          Transaction ID (TrxID) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 9J82KLS001"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Apply Coupon Code */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-primary" /> 2. Have a Coupon Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code (e.g. KKIT2026)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      disabled={couponApplied}
                      className="flex-1 h-9 px-3 rounded-lg border bg-background text-xs uppercase font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode.trim()}
                    >
                      {couponApplied ? "Applied" : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                  {couponApplied && <p className="text-xs text-emerald-600 font-semibold mt-1">✓ Coupon applied! Saved ৳{discountAmount}</p>}
                </div>

                {/* Submit Checkout Button */}
                <Button type="submit" disabled={submitting} className="w-full h-12 text-base font-bold">
                  {submitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Order...</>
                  ) : (
                    <><Play className="mr-2 h-5 w-5 fill-current" /> Pay ৳{finalPayable.toLocaleString()} & Complete Enrollment</>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>256-bit SSL Encrypted & 100% Refund Guarantee</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base border-b pb-3 text-foreground">Order Summary</h3>

              <div className="flex gap-3">
                {course.thumbnail?.url ? (
                  <img src={course.thumbnail.url} alt="" className="w-20 h-16 rounded-xl object-cover ring-1 ring-border shrink-0" />
                ) : (
                  <div className="w-20 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-foreground truncate">{course.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">{course.level}</Badge>
                    <span className="text-xs text-muted-foreground">{course.totalDuration}h total</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t pt-3 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Regular Course Price:</span>
                  <span className="line-through font-mono">৳{originalPrice.toLocaleString()}</span>
                </div>
                {originalPrice > basePrice && (
                  <div className="flex justify-between text-green-600">
                    <span>Discounted Price:</span>
                    <span className="font-mono">৳{basePrice.toLocaleString()}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Savings ({couponCode}):</span>
                    <span className="font-mono">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-foreground border-t pt-3">
                  <span>Total Amount Payable:</span>
                  <span className="text-primary text-base font-mono font-extrabold">৳{finalPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
