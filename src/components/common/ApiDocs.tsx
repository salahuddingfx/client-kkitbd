"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Container } from "@/components/common";
import { Badge, Input } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  params?: string[];
}

const sections: { title: string; endpoints: Endpoint[] }[] = [
  {
    title: "Authentication",
    endpoints: [
      { method: "POST", path: "/api/auth/register", description: "Register a new user account" },
      { method: "POST", path: "/api/auth/login", description: "Login and receive access token" },
      { method: "POST", path: "/api/auth/refresh", description: "Refresh access token" },
    ],
  },
  {
    title: "Courses",
    endpoints: [
      { method: "GET", path: "/api/courses", description: "List all available courses", params: ["?page", "?limit", "?category"] },
      { method: "GET", path: "/api/courses/:id", description: "Get course details by ID" },
      { method: "POST", path: "/api/courses/:id/enroll", description: "Enroll in a course" },
    ],
  },
  {
    title: "Users",
    endpoints: [
      { method: "GET", path: "/api/users/me", description: "Get current user profile" },
      { method: "PUT", path: "/api/users/me", description: "Update user profile" },
      { method: "GET", path: "/api/users/me/courses", description: "Get enrolled courses" },
    ],
  },
  {
    title: "Progress",
    endpoints: [
      { method: "GET", path: "/api/progress/:courseId", description: "Get course progress" },
      { method: "POST", path: "/api/progress/:courseId/complete", description: "Mark lesson as complete" },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-500/10 text-green-600 border-green-500/20",
  POST: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PUT: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  DELETE: "bg-red-500/10 text-red-600 border-red-500/20",
};

function EndpointItem({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
      >
        <Badge variant="outline" className={cn("font-mono text-xs", methodColors[endpoint.method])}>
          {endpoint.method}
        </Badge>
        <code className="text-sm font-mono text-foreground flex-1">{endpoint.path}</code>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border pt-3">
              <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
              {endpoint.params && (
                <div className="flex gap-2 flex-wrap">
                  {endpoint.params.map((p) => (
                    <code key={p} className="text-xs bg-muted px-2 py-1 rounded">{p}</code>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ApiDocsSection() {
  const [search, setSearch] = useState("");

  const filtered = sections
    .map((s) => ({
      ...s,
      endpoints: s.endpoints.filter(
        (e) =>
          e.path.toLowerCase().includes(search.toLowerCase()) ||
          e.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((s) => s.endpoints.length > 0);

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">API Reference</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                API Documentation
              </h1>
              <p className="text-muted-foreground">
                Integrate KKIT services into your applications using our RESTful API.
              </p>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search endpoints..."
                className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-8">
              {filtered.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-semibold text-foreground mb-4">{section.title}</h2>
                  <div className="space-y-2">
                    {section.endpoints.map((ep) => (
                      <EndpointItem key={ep.path + ep.method} endpoint={ep} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
