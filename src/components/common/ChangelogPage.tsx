"use client";

import { Container } from "@/components/common";
import { Badge } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "feature" | "improvement" | "fix";
  title: string;
  description: string;
}

const entries: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "2026-01-10",
    type: "feature",
    title: "Live Chat Support",
    description: "Real-time chat widget powered by Tawk.to. Get instant help from our support team.",
  },
  {
    version: "2.3.2",
    date: "2026-01-05",
    type: "fix",
    title: "Mobile Navigation Fix",
    description: "Fixed hamburger menu not closing on route change. Improved touch target sizes.",
  },
  {
    version: "2.3.1",
    date: "2025-12-28",
    type: "improvement",
    title: "Performance Optimization",
    description: "Reduced bundle size by 35%. Implemented lazy loading for below-the-fold sections.",
  },
  {
    version: "2.3.0",
    date: "2025-12-20",
    type: "feature",
    title: "Course Comparison Table",
    description: "Compare features across Basic, Pro, and Enterprise plans side by side.",
  },
  {
    version: "2.2.0",
    date: "2025-12-15",
    type: "feature",
    title: "Certificate System",
    description: "Download verifiable certificates upon course completion. Share on LinkedIn.",
  },
  {
    version: "2.1.3",
    date: "2025-12-10",
    type: "fix",
    title: "Form Validation",
    description: "Fixed contact form not validating phone numbers correctly on iOS devices.",
  },
  {
    version: "2.1.2",
    date: "2025-12-01",
    type: "improvement",
    title: "Dark Mode Improvements",
    description: "Refined color palette for better contrast ratios. Fixed syntax highlighting in dark mode.",
  },
  {
    version: "2.1.0",
    date: "2025-11-25",
    type: "feature",
    title: "Student Dashboard",
    description: "New dashboard with course progress tracking, enrolled courses, and learning analytics.",
  },
];

const typeConfig = {
  feature: { label: "Feature", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  improvement: { label: "Improvement", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  fix: { label: "Bug Fix", color: "bg-green-500/10 text-green-600 border-green-500/20" },
};

export function ChangelogPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Changelog</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                What&apos;s New
              </h1>
              <p className="text-muted-foreground">
                Track all updates, improvements, and fixes to the KKIT platform.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {entries.map((entry, i) => {
                  const config = typeConfig[entry.type];
                  return (
                    <ScrollReveal key={entry.version} direction="up" delay={i * 0.05}>
                      <div className="relative pl-12 sm:pl-16">
                        <div className="absolute left-2.5 sm:left-4.5 top-1 h-3 w-3 rounded-full bg-border border-2 border-background ring-4 ring-background" />
                        <div className="pb-8">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <code className="text-sm font-mono font-semibold text-foreground">
                              v{entry.version}
                            </code>
                            <Badge variant="outline" className={`text-[10px] ${config.color}`}>
                              {config.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{entry.date}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {entry.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.description}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
