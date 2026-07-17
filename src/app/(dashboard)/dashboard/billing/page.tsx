"use client";

import { useState, useEffect } from "react";
import { CreditCard, Download, CheckCircle, Clock, XCircle, Receipt, Loader2 } from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatCurrency, formatDate } from "@/utils";
import { useAppSelector } from "@/redux/hooks";
import { paymentApi, invoiceApi } from "@/services/api";
import { toast } from "sonner";

const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  completed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Completed" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
  failed: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Failed" },
  refunded: { icon: CreditCard, color: "text-orange-500", bg: "bg-orange-500/10", label: "Refunded" },
};

export default function BillingPage() {
  const { token } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    paymentApi
      .getAll(undefined, token)
      .then((res) => {
        if (res.success) {
          setPayments(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load billing history:", err);
        toast.error("Failed to load billing history.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadPdf = async (invoiceId: string) => {
    setDownloading(invoiceId);
    try {
      if (!token) return;
      const blob = await invoiceApi.downloadPdf(invoiceId, token);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success("Invoice downloaded!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to download invoice PDF.");
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Card className="sm:w-auto">
            <CardContent className="p-4 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments table skeleton */}
        <Card>
          <div className="p-6 space-y-4">
            <div className="flex justify-between border-b border-border/50 pb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-border/30 last:border-0">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing & Payments</h1>
          <p className="text-muted-foreground mt-1">View your payment history and invoices.</p>
        </div>
        <Card className="sm:w-auto">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments table */}
      <FadeIn delay={0.1}>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Course
                  </th>
                  <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Method
                  </th>
                  <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground px-6 py-4">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => {
                    const status = statusConfig[payment.status] || statusConfig.pending;
                    return (
                      <tr key={payment._id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-foreground">{payment.course?.title || "Course Enrollment"}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground">{formatDate(payment.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-muted-foreground capitalize">{payment.method}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-foreground">
                            {formatCurrency(payment.amount)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", status.bg, status.color)}>
                            <status.icon className="h-3 w-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {payment.invoice ? (
                            <button
                              disabled={downloading === payment.invoice}
                              onClick={() => handleDownloadPdf(payment.invoice)}
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline disabled:opacity-50"
                            >
                              {downloading === payment.invoice ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Download className="h-3.5 w-3.5" />
                              )}
                              PDF
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground">N/A</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
