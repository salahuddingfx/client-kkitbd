"use client";

import { CreditCard, Download, CheckCircle, Clock, XCircle, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn, formatCurrency, formatDate } from "@/utils";
import { mockPayments } from "@/services/dashboard-data";

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Completed" },
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
  failed: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Failed" },
  refunded: { icon: CreditCard, color: "text-orange-500", bg: "bg-orange-500/10", label: "Refunded" },
};

export default function BillingPage() {
  const payments = mockPayments;
  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

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
                {payments.map((payment) => {
                  const status = statusConfig[payment.status];
                  return (
                    <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">{payment.courseTitle}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
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
                        <a
                          href={payment.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" />
                          PDF
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
