"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Loader2,
  Copy,
  AlertCircle,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { cn } from "@/lib/utils";
import { paymentApi, PaymentMethod, PaymentProof } from "@/services/api";
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
    id: "stripe",
    label: "Credit / Debit Card",
    icon: CreditCard,
    color: "text-indigo-600",
    bg: "bg-indigo-500/10",
    description: "Pay securely with Stripe",
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
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (method === "stripe") {
      // Stripe will redirect — for now just proceed
      setStep("details");
    } else {
      setStep("details");
    }
  };

  const handleDetailsSubmit = () => {
    if (!billingName || !billingEmail) {
      toast.error("Please fill in your name and email");
      return;
    }
    if (selectedMethod === "bkash" || selectedMethod === "nagad") {
      setStep("proof");
    } else if (selectedMethod === "bank_transfer") {
      setStep("proof");
    } else {
      // Manual or Stripe — submit directly
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
        amount,
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
                    <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Amount</span>
                        <span className="text-xl font-bold text-primary">
                          ৳{amount.toLocaleString("en-BD")}
                        </span>
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
                    {info && selectedMethod !== "stripe" && (
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
                    <div className="p-3 rounded-lg bg-muted/50 border border-border flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="font-bold">৳{amount.toLocaleString("en-BD")}</span>
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
