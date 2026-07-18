"use client";

import { useState, useEffect } from "react";
import { Tag, Zap, Clock, Copy, CheckCircle } from "lucide-react";
import { offersApi, Offer } from "@/services/api";

function CouponBadge({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-dashed border-primary/30 hover:bg-primary/20 transition-colors cursor-pointer"
    >
      <Tag className="h-3 w-3 text-primary" />
      <span className="font-mono font-bold text-primary text-xs">{code}</span>
      {copied ? (
        <CheckCircle className="h-3 w-3 text-green-600" />
      ) : (
        <Copy className="h-3 w-3 text-primary/60" />
      )}
    </button>
  );
}

export function CourseOfferBanner({ courseId }: { courseId: string }) {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await offersApi.getActive();
        const allOffers = res.data || [];
        // Filter offers that include this course or are general (no specific courses)
        const relevant = allOffers.filter(
          (o) => !o.courses?.length || o.courses.some((c) => c._id === courseId)
        );
        setOffers(relevant.slice(0, 2));
      } catch {
        setOffers([]);
      }
    };
    fetchOffers();
  }, [courseId]);

  if (offers.length === 0) return null;

  return (
    <div className="space-y-2">
      {offers.map((offer) => (
        <div
          key={offer._id}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-500/10 via-red-500/10 to-orange-500/10 border border-pink-500/20"
        >
          <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground">{offer.title}</span>
              {offer.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-medium">
                  {offer.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {offer.discountType === "percentage"
                ? `Get ${offer.discountValue}% off`
                : offer.discountType === "fixed"
                ? `Save ৳${offer.discountValue}`
                : "Buy 1 Get 1 Free"}
              {offer.endDate && (
                <span className="inline-flex items-center gap-1 ml-2">
                  <Clock className="h-3 w-3" /> Ends soon
                </span>
              )}
            </p>
          </div>
          {offer.couponCode && <CouponBadge code={offer.couponCode} />}
        </div>
      ))}
    </div>
  );
}
