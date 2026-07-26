"use client";

import { useState, useEffect } from "react";
import { serviceOrdersApi } from "@/services/api";
import { Clock, CheckCircle2, AlertCircle, FileText, Download, Sparkles, RefreshCw, ShoppingBag, ExternalLink } from "lucide-react";

interface ServiceOrder {
  _id: string;
  orderNumber: string;
  serviceName: string;
  tier: string;
  totalAmount: number;
  depositAmount: number;
  paymentStatus: string;
  projectStatus: string;
  brief: string;
  deliverables?: { title: string; fileUrl: string; notes?: string; deliveredAt: string }[];
  deliveryDeadline?: string;
  createdAt: string;
}

const STATUS_STEPS = ["pending_review", "in_progress", "revision", "delivered", "completed"];

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending_review: { label: "Pending Review", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
  in_progress: { label: "In Development", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  revision: { label: "Revision Requested", color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
  delivered: { label: "Delivered (Action Needed)", color: "text-indigo-500", bg: "bg-indigo-500/10 border-indigo-500/20" },
  completed: { label: "Completed", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  cancelled: { label: "Cancelled", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
};

export default function MyServiceOrdersPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);

  const fetchOrders = () => {
    setRefreshing(true);
    serviceOrdersApi
      .getMyOrders()
      .then((res) => {
        if (res.success) {
          const list = res.data || [];
          setOrders(list);
          if (list.length > 0 && !selectedOrder) {
            setSelectedOrder(list[0]);
          }
        }
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-6">
        <div className="h-28 rounded-2xl bg-muted" />
        <div className="h-64 rounded-2xl bg-muted" />
      </div>
    );
  }

  const activeCount = orders.filter((o) => ["pending_review", "in_progress", "revision"].includes(o.projectStatus)).length;
  const completedCount = orders.filter((o) => ["delivered", "completed"].includes(o.projectStatus)).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-indigo-600 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>Agency Client Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">My Service Orders & Projects</h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
              Track real-time progress, review project deliverables, and request revisions for your ordered digital services.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <a
              href="/services"
              className="px-4 py-2 rounded-xl bg-white text-primary text-xs font-bold hover:bg-white/90 shadow-md shrink-0 flex items-center gap-1.5"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              New Order
            </a>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-card space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Total Orders</p>
          <p className="text-2xl font-black text-foreground">{orders.length}</p>
        </div>
        <div className="p-4 rounded-xl border bg-card space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Active Development</p>
          <p className="text-2xl font-black text-blue-500">{activeCount}</p>
        </div>
        <div className="p-4 rounded-xl border bg-card space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Completed & Delivered</p>
          <p className="text-2xl font-black text-emerald-500">{completedCount}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center border rounded-2xl bg-card space-y-3">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto opacity-40" />
          <h3 className="text-lg font-bold text-foreground">No active service orders</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You haven't ordered any custom web development, app development, or UI/UX services yet.
          </p>
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-md"
          >
            Explore Services & Order
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Select Order</h3>
            {orders.map((o) => {
              const statusCfg = STATUS_LABELS[o.projectStatus] || STATUS_LABELS.pending_review;
              const isSelected = selectedOrder?._id === o._id;
              return (
                <div
                  key={o._id}
                  onClick={() => setSelectedOrder(o)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-primary">{o.orderNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground truncate">{o.serviceName}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 border-t pt-2">
                    <span className="capitalize font-semibold">{o.tier} Tier</span>
                    <span className="font-bold text-foreground">৳{o.totalAmount.toLocaleString("en-BD")}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Order Detail & Tracker */}
          {selectedOrder && (
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl border bg-card space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
                  <div>
                    <span className="text-xs font-bold text-primary">{selectedOrder.orderNumber}</span>
                    <h3 className="text-xl font-extrabold text-foreground">{selectedOrder.serviceName}</h3>
                    <p className="text-xs text-muted-foreground">
                      Ordered on {new Date(selectedOrder.createdAt).toLocaleDateString("en-BD")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-primary">৳{selectedOrder.totalAmount.toLocaleString("en-BD")}</p>
                    <span className="text-xs text-muted-foreground capitalize">
                      Payment Status: <strong className="text-foreground">{selectedOrder.paymentStatus}</strong>
                    </span>
                  </div>
                </div>

                {/* Live Progress Bar */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    Live Project Timeline Progress
                  </h4>
                  <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted -z-0" />
                    {STATUS_STEPS.map((stepKey, idx) => {
                      const currentIdx = STATUS_STEPS.indexOf(selectedOrder.projectStatus);
                      const isDone = idx <= (currentIdx >= 0 ? currentIdx : 0);
                      const isCurrent = idx === currentIdx;
                      return (
                        <div key={stepKey} className="relative z-10 flex flex-col items-center gap-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isDone
                                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                          </div>
                          <span className={`text-[10px] font-semibold capitalize max-w-[70px] text-center ${
                            isCurrent ? "text-primary font-bold" : "text-muted-foreground"
                          }`}>
                            {stepKey.replace("_", " ")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Brief & Requirements */}
                <div className="p-4 rounded-xl bg-muted/30 border space-y-2">
                  <h4 className="text-xs font-bold uppercase text-foreground">Project Brief & Requirements</h4>
                  <p className="text-xs text-muted-foreground whitespace-pre-wrap">{selectedOrder.brief}</p>
                </div>

                {/* Deliverables Section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Project Deliverables & Files
                  </h4>
                  {selectedOrder.deliverables && selectedOrder.deliverables.length > 0 ? (
                    <div className="space-y-2">
                      {selectedOrder.deliverables.map((d, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-emerald-500/5 border-emerald-500/20">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground">{d.title}</p>
                              {d.notes && <p className="text-[11px] text-muted-foreground">{d.notes}</p>}
                            </div>
                          </div>
                          <a
                            href={d.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shrink-0"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      No deliverables uploaded yet. Our team is actively working on your project.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
