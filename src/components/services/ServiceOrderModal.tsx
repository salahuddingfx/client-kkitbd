"use client";

import { useState } from "react";
import { X, Check, ShieldCheck, Sparkles, Send, Tag, CreditCard, Clock, FileText } from "lucide-react";
import { serviceOrdersApi, offersApi } from "@/services/api";

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  serviceId?: string;
}

const TIERS = [
  {
    id: "basic",
    name: "Starter",
    price: 15000,
    days: "5-7 Days",
    features: ["Core Features Development", "Mobile Responsive UI", "Basic SEO & Analytics", "1 Month Free Support"],
  },
  {
    id: "pro",
    name: "Business Pro",
    price: 35000,
    days: "10-14 Days",
    popular: true,
    features: ["Advanced Features & Custom UI", "API & Database Integration", "High Performance Optimization", "3 Months Support & Revisions"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 75000,
    days: "20-30 Days",
    features: ["Custom Architecture & Scalability", "Payment Gateway & Automated Services", "Dedicated Project Manager", "6 Months VIP Support"],
  },
];

const ADDONS = [
  { id: "express", name: "Express Delivery (3-Day Fast Track)", price: 5000 },
  { id: "seo", name: "Advanced SEO & Schema Optimization", price: 3000 },
  { id: "copywriting", name: "Professional Content & Copywriting", price: 4000 },
];

export function ServiceOrderModal({ isOpen, onClose, serviceTitle, serviceId }: ServiceOrderModalProps) {
  const [selectedTier, setSelectedTier] = useState<"basic" | "pro" | "enterprise">("pro");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [brief, setBrief] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any>(null);

  if (!isOpen) return null;

  const currentTierObj = TIERS.find((t) => t.id === selectedTier) || TIERS[1];
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const subtotal = currentTierObj.price + addonsTotal;
  const total = Math.max(0, subtotal - discountAmount);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponError("");
    try {
      const res = await offersApi.validateCoupon(coupon.trim());
      if (res.success && res.data) {
        const offer = res.data;
        const discount = offer.discountType === "percentage"
          ? Math.round(subtotal * (offer.discountValue / 100))
          : offer.discountValue;
        setDiscountAmount(discount || Math.round(subtotal * 0.1));
        setCouponApplied(true);
      } else {
        setCouponError("Invalid promo code");
      }
    } catch {
      // Fallback demo coupon logic if API unavailable
      if (coupon.trim().toUpperCase() === "KKIT10" || coupon.trim().toUpperCase() === "WELCOME10") {
        const disc = Math.round(subtotal * 0.1);
        setDiscountAmount(disc);
        setCouponApplied(true);
      } else {
        setCouponError("Invalid or expired coupon code");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.trim()) {
      alert("Please provide a brief description of your project requirements.");
      return;
    }
    setLoading(true);
    try {
      const addonsPayload = selectedAddons.map((id) => {
        const a = ADDONS.find((item) => item.id === id);
        return { name: a?.name || id, price: a?.price || 0 };
      });

      const res = await serviceOrdersApi.create({
        serviceId,
        serviceName: serviceTitle,
        tier: selectedTier,
        customAddons: addonsPayload,
        brief,
        totalAmount: total,
        depositAmount: Math.round(total * 0.5),
        paymentMethod,
        transactionId: transactionId || `TXN-${Date.now()}`,
      });

      if (res.success) {
        setSuccessOrder(res.data);
      }
    } catch (err: any) {
      alert(err.message || "Failed to submit service order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-background rounded-2xl border shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Service Customizer & Order</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">{serviceTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {successOrder ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-foreground">Service Order Placed!</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Order <span className="font-bold text-primary">{successOrder.orderNumber}</span> has been received. Our team will review your requirements and update your status in your client dashboard.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <a
                href="/dashboard/services"
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm"
              >
                Go to Service Tracker
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border font-semibold hover:bg-muted transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Tier Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                1. Select Package Tier
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as any)}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTier === tier.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                        MOST POPULAR
                      </span>
                    )}
                    <p className="font-bold text-sm text-foreground">{tier.name}</p>
                    <p className="text-lg font-black text-primary mt-1">৳{tier.price.toLocaleString("en-BD")}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-3">
                      <Clock className="h-3 w-3" />
                      <span>{tier.days}</span>
                    </div>
                    <ul className="space-y-1.5 border-t pt-2 text-[11px] text-muted-foreground">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Add-ons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                2. Custom Add-ons (Optional)
              </label>
              <div className="space-y-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        isChecked ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isChecked ? "bg-primary border-primary text-white" : "border-muted-foreground"
                          }`}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-xs font-semibold text-foreground">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">+৳{addon.price.toLocaleString("en-BD")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brief Requirements */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                3. Project Brief & Requirements *
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                required
                rows={3}
                placeholder="Describe your project goals, required pages, reference websites, or special instructions..."
                className="w-full p-3 text-xs rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Promo Code & Total Calculation */}
            <div className="p-4 rounded-xl bg-muted/40 border space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-foreground">Apply Promo / Coupon Code</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter code (e.g. KKIT10)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border bg-background focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-xs text-emerald-500 font-semibold">
                  Coupon applied! You saved ৳{discountAmount.toLocaleString("en-BD")}.
                </p>
              )}
              {couponError && <p className="text-xs text-destructive">{couponError}</p>}

              <div className="border-t pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Package Base Price:</span>
                  <span>৳{currentTierObj.price.toLocaleString("en-BD")}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Add-ons Total:</span>
                    <span>+৳{addonsTotal.toLocaleString("en-BD")}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Discount:</span>
                    <span>-৳{discountAmount.toLocaleString("en-BD")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-foreground pt-1 border-t">
                  <span>Total Investment:</span>
                  <span className="text-primary">৳{total.toLocaleString("en-BD")}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                4. Payment Method & Transaction Proof
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {["bkash", "nagad", "bank_transfer"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 text-xs font-bold rounded-lg border capitalize transition-colors ${
                      paymentMethod === m
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {m.replace("_", " ")}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  placeholder="Sender Phone / Account No."
                  className="px-3 py-2 text-xs rounded-lg border bg-background"
                />
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Transaction ID / Reference"
                  className="px-3 py-2 text-xs rounded-lg border bg-background"
                />
              </div>
            </div>

            {/* Footer Submit */}
            <div className="pt-2 flex items-center justify-between border-t">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2 text-xs disabled:opacity-50"
              >
                {loading ? (
                  "Processing Order..."
                ) : (
                  <>
                    <span>Submit Order (৳{total.toLocaleString("en-BD")})</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
