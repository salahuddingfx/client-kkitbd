"use client";

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuaranteeBadgeProps {
  className?: string;
}

export function GuaranteeBadge({ className }: GuaranteeBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/20",
        className
      )}
    >
      <ShieldCheck className="h-8 w-8 text-green-600 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-foreground">30-Day Money-Back Guarantee</p>
        <p className="text-xs text-muted-foreground">Not satisfied? Get a full refund, no questions asked.</p>
      </div>
    </div>
  );
}
