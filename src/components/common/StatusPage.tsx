"use client";

import { useState } from "react";
import { Check, AlertCircle, Clock } from "lucide-react";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";

type Status = "operational" | "degraded" | "outage" | "maintenance";

interface Service {
  name: string;
  status: Status;
  uptime: string;
  responseTime: string;
}

const services: Service[] = [
  { name: "Website", status: "operational", uptime: "99.99%", responseTime: "120ms" },
  { name: "API", status: "operational", uptime: "99.97%", responseTime: "85ms" },
  { name: "Course Platform", status: "operational", uptime: "99.98%", responseTime: "200ms" },
  { name: "Payment Gateway", status: "operational", uptime: "99.99%", responseTime: "310ms" },
  { name: "Email Service", status: "degraded", uptime: "99.50%", responseTime: "450ms" },
  { name: "CDN", status: "operational", uptime: "100%", responseTime: "45ms" },
  { name: "Database", status: "operational", uptime: "99.99%", responseTime: "30ms" },
  { name: "Video Streaming", status: "maintenance", uptime: "99.90%", responseTime: "—" },
];

const statusConfig: Record<Status, { label: string; icon: typeof Check; color: string; bg: string }> = {
  operational: { label: "Operational", icon: Check, color: "text-green-600", bg: "bg-green-500/10" },
  degraded: { label: "Degraded", icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-500/10" },
  outage: { label: "Outage", icon: AlertCircle, color: "text-red-600", bg: "bg-red-500/10" },
  maintenance: { label: "Maintenance", icon: Clock, color: "text-blue-600", bg: "bg-blue-500/10" },
};

export function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">System Status</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Service Status
              </h1>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${allOperational ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${allOperational ? "bg-green-500" : "bg-yellow-500"}`} />
                <span className={`text-sm font-medium ${allOperational ? "text-green-700 dark:text-green-400" : "text-yellow-700 dark:text-yellow-400"}`}>
                  {allOperational ? "All Systems Operational" : "Some Systems Degraded"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {services.map((service) => {
                const config = statusConfig[service.status];
                const Icon = config.icon;
                return (
                  <div
                    key={service.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{service.name}</p>
                        <p className={`text-xs font-medium ${config.color}`}>{config.label}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 pl-12 sm:pl-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Uptime</p>
                        <p className="text-sm font-medium text-foreground">{service.uptime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Response</p>
                        <p className="text-sm font-medium text-foreground">{service.responseTime}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
