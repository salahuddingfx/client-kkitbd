"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smartphone,
  Building2,
  CheckCircle2,
  Loader2,
  Copy,
  AlertCircle,
  Banknote,
  Tag,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { cn } from "@/lib/utils";
import { paymentApi, offersApi, PaymentMethod, PaymentProof } from "@/services/api";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  amount: number;
  onSuccess?: () => void;
}

type Step = "method" | "details" | "proof" | "success";

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  description: string;
}[] = [
  {
    id: "bkash",
    label: "bKash",
    icon: Smartphone,
    color: "text-pink-600",
    bg: "bg-pink-500/10",
    description: "Send money to our bKash number",
  },
  {
    id: "nagad",
    label: "Nagad",
    icon: Smartphone,
    color: "text-orange-600",
    bg: "bg-orange-500/10",
    description: "Send money to our Nagad number",
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    description: "Direct bank transfer",
  },
  {
    id: "manual",
    label: "Manual Payment",
    icon: Banknote,
    color: "text-gray-600",
    bg: "bg-gray-500/10",
    description: "Other payment methods",
  },
];

// Payment info for each method (admin config placeholder)
const paymentInfo: Record<string, { number: string; name: string; instructions: string }> = {
  bkash: {
    number: "+880 1XXXXXXXXX",
    name: "KKIT Education",
    instructions: "Send money via bKash Personal. After payment, provide the transaction ID below.",
  },
  nagad: {
    number: "+880 1XXXXXXXXX",
    name: "KKIT Education",
    instructions: "Send money via Nagad Personal. After payment, provide the transaction ID below.",
  },
  bank_transfer: {
    number: "XXXXXXXXXXXX",
    name: "KKIT Education Ltd.",
    instructions: "Transfer to: DBBL/NBL/BRAC Bank. After transfer, upload the receipt or provide transaction details.",
  },
  manual: {
    number: "Contact us",
    name: "KKIT Education",
    instructions: "Contact us at info@kkit.com for alternative payment arrangements.",
  },
};

export function PaymentModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  amount,
  onSuccess,
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("method");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  // For bKash/Nagad
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");

  // For bank transfer
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");

  // For screenshot upload
  const [screenshotUrl, setScreenshotUrl] = useState("");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const discount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? Math.round((amount * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountType === "fixed"
      ? appliedCoupon.discountValue
      : 0
    : 0;
  const finalAmount = Math.max(0, amount - discount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await offersApi.validateCoupon(couponCode);
      if (res.success && res.data) {
        setAppliedCoupon(res.data);
        toast.success(`Coupon applied! ${res.data.discountType === "percentage" ? res.data.discountValue + "% off" : "৳" + res.data.discountValue + " off"}`);
      }
    } catch (err: any) {
      setCouponError(err?.message || "Invalid coupon code");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const reset = () => {
    setStep("method");
    setSelectedMethod(null);
    setBillingName("");
    setBillingEmail("");
    setBillingPhone("");
    setTransactionId("");
    setSenderNumber("");
    setBankName("");
    setAccountNumber("");
    setBranchName("");
    setScreenshotUrl("");
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep("details");
  };

  const handleDetailsSubmit = () => {
    if (!billingName || !billingEmail) {
      toast.error("Please fill in your name and email");
      return;
    }
    if (selectedMethod === "bkash" || selectedMethod === "nagad" || selectedMethod === "bank_transfer") {
      setStep("proof");
    } else {
      // Manual — submit directly
      handleSubmitPayment();
    }
  };

  const handleSubmitPayment = async () => {
    if (!selectedMethod) return;
    setLoading(true);

    try {
      const paymentProof: PaymentProof = {};

      if (selectedMethod === "bkash" || selectedMethod === "nagad") {
        if (!transactionId) {
          toast.error("Transaction ID is required");
          setLoading(false);
          return;
        }
        paymentProof.transactionId = transactionId;
        paymentProof.senderNumber = senderNumber;
      }

      if (selectedMethod === "bank_transfer") {
        paymentProof.bankName = bankName;
        paymentProof.accountNumber = accountNumber;
        paymentProof.branchName = branchName;
      }

      if (screenshotUrl) {
        paymentProof.screenshot = { url: screenshotUrl, publicId: "" };
      }

      await paymentApi.create({
        course: courseId,
        method: selectedMethod,
        amount: finalAmount,
        couponCode: appliedCoupon?.couponCode || undefined,
        billingDetails: {
          name: billingName,
          email: billingEmail,
          phone: billingPhone,
        },
        paymentProof,
      });

      setStep("success");
      toast.success("Payment submitted! We will verify and confirm shortly.");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const info = selectedMethod ? paymentInfo[selectedMethod] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Enroll in Course</h2>
                <p className="text-sm text-muted-foreground mt-0.5 truncate max-w-[280px]">{courseTitle}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 px-6 py-3 bg-muted/30">
              {["method", "details", "proof", "success"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      step === s
                        ? "bg-primary text-primary-foreground"
                        : ["method", "details", "proof", "success"].indexOf(step) > i
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {["method", "details", "proof", "success"].indexOf(step) > i ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 3 && <div className="w-8 h-0.5 bg-border" />}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Method */}
                {step === "method" && (
                  <motion.div
                    key="method"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-muted-foreground mb-4">Select payment method</p>
                    {paymentMethods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleMethodSelect(m.id)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                          selectedMethod === m.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-border hover:border-primary/30 hover:bg-muted/50"
                        )}
                      >
                        <div className={cn("p-2.5 rounded-lg", m.bg)}>
                          {(() => {
                            const Icon = m.icon as React.ComponentType<{ className?: string }>;
                            return <Icon className={cn("h-5 w-5", m.color)} />;
                          })()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.description}</p>
                        </div>
                      </button>
                    ))}

                    {/* Price summary */}
                    <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border space-y-3">
                      {/* Coupon input */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5">Have a coupon code?</p>
                        {appliedCoupon ? (
                          <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="font-mono font-bold text-sm text-green-700 dark:text-green-400">{appliedCoupon.couponCode}</span>
                              <span className="text-xs text-green-600">
                                ({appliedCoupon.discountType === "percentage" ? `${appliedCoupon.discountValue}% off` : `৳${appliedCoupon.discountValue} off`})
                              </span>
                            </div>
                            <button onClick={handleRemoveCoupon} className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                              placeholder="Enter coupon code"
                              className="flex-1 h-9 px-3 rounded-lg border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <Button type="button" variant="outline" size="sm" onClick={handleApplyCoupon} disabled={couponLoading || !couponCode.trim()}>
                              {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
                            </Button>
                          </div>
                        )}
                        {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
                      </div>

                      <div className="border-t border-border pt-3 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Course Price</span>
                          <span>৳{amount.toLocaleString("en-BD")}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Coupon Discount</span>
                            <span>-৳{discount.toLocaleString("en-BD")}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-sm font-medium">Total</span>
                          <span className="text-xl font-bold text-primary">
                            ৳{finalAmount.toLocaleString("en-BD")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Billing Details */}
                {step === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Payment method info */}
                    {info && (
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <p className="text-sm font-medium mb-2">{info.instructions}</p>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border">
                          <span className="text-sm flex-1 font-mono">{info.number}</span>
                          {info.number !== "Contact us" && (
                            <button
                              onClick={() => copyToClipboard(info.number)}
                              className="p-1.5 rounded-md hover:bg-muted transition-colors"
                            >
                              <Copy className="h-4 w-4 text-muted-foreground" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Account Name: {info.name}</p>
                      </div>
                    )}

                    {/* Amount */}
                    <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Course Price</span>
                        <span>৳{amount.toLocaleString("en-BD")}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {appliedCoupon?.couponCode}</span>
                          <span>-৳{discount.toLocaleString("en-BD")}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold pt-1 border-t border-border">
                        <span className="text-sm">Total</span>
                        <span>৳{finalAmount.toLocaleString("en-BD")}</span>
                      </div>
                    </div>

                    {/* Billing form */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Full Name *</label>
                        <input
                          type="text"
                          value={billingName}
                          onChange={(e) => setBillingName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email *</label>
                        <input
                          type="email"
                          value={billingEmail}
                          onChange={(e) => setBillingEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <input
                          type="tel"
                          value={billingPhone}
                          onChange={(e) => setBillingPhone(e.target.value)}
                          placeholder="+880 1XXXXXXXXX"
                          className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment Proof */}
                {step === "proof" && (
                  <motion.div
                    key="proof"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <AlertCircle className="h-4 w-4 text-yellow-600 shrink-0" />
                      <p className="text-xs text-yellow-700">
                        Please provide your payment proof so we can verify and confirm your enrollment.
                      </p>
                    </div>

                    {(selectedMethod === "bkash" || selectedMethod === "nagad") && (
                      <>
                        <div>
                          <label className="text-sm font-medium">Transaction ID *</label>
                          <input
                            type="text"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="e.g., 9A1B2C3D4E5F"
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Sender Number</label>
                          <input
                            type="tel"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            placeholder="+880 1XXXXXXXXX"
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </>
                    )}

                    {selectedMethod === "bank_transfer" && (
                      <>
                        <div>
                          <label className="text-sm font-medium">Bank Name *</label>
                          <input
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="e.g., DBBL, BRAC Bank"
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Account Number *</label>
                          <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Your account number"
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Branch</label>
                          <input
                            type="text"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                            placeholder="Branch name"
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </>
                    )}

                    {/* Screenshot upload */}
                    <div>
                      <label className="text-sm font-medium">Payment Screenshot (optional)</label>
                      <div className="mt-1">
                        <ImageUpload
                          value={screenshotUrl}
                          onChange={(url) => setScreenshotUrl(url)}
                          onRemove={() => setScreenshotUrl("")}
                          folder="payments"
                          label="Upload payment screenshot"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Payment Submitted!</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Your payment of <span className="font-semibold">৳{amount.toLocaleString("en-BD")}</span> has been submitted.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      We will verify your payment and confirm your enrollment shortly.
                    </p>
                    <Button onClick={handleClose} className="w-full">
                      Done
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step !== "success" && (
              <div className="flex items-center gap-3 p-6 border-t border-border">
                {step !== "method" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (step === "proof") setStep("details");
                      else if (step === "details") setStep("method");
                    }}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={
                    step === "method"
                      ? undefined
                      : step === "proof"
                      ? handleSubmitPayment
                      : handleDetailsSubmit
                  }
                  disabled={
                    loading ||
                    (step === "method" && !selectedMethod)
                  }
                  className={cn("flex-1", step === "method" && "hidden")}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {step === "proof" ? "Submit Payment" : "Continue"}
                </Button>
                {step === "method" && (
                  <Button onClick={handleClose} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
