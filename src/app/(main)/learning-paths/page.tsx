"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { learningPathsApi, LearningPath } from "@/services/api";
import { Container, Breadcrumb, SectionHeader } from "@/components/common";
import { GlowCard, Badge, Button } from "@/components/ui";
import { FadeIn, StaggerReveal } from "@/components/animations";
import { Route, Clock, BookOpen, ArrowRight, Loader2, Filter } from "lucide-react";

const DIFFICULTY_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"] as const;

const difficultyColor = (d: string) => {
  switch (d) {
    case "beginner": return "success";
    case "intermediate": return "warning";
    case "advanced": return "destructive";
    default: return "secondary";
  }
};

export default function LearningPathsPage() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const res = await learningPathsApi.getAll();
        setPaths(res.data || []);
      } catch {
        setPaths([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPaths();
  }, []);

  const filtered = paths.filter(
    (p) =>
      selectedDifficulty === "All" ||
      p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
  );

  return (
    <>
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Roadmaps
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Learning Paths
            </h1>
            <p className="text-lg text-muted-foreground">
              Follow curated roadmaps that guide you step-by-step from fundamentals to mastery in your chosen field.
            </p>
            <Breadcrumb items={[{ label: "Learning Paths" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {DIFFICULTY_FILTERS.map((level) => (
              <Button
                key={level}
                variant={selectedDifficulty === level ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(level)}
              >
                {level}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No learning paths found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filter or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((path, index) => (
                <FadeIn key={path._id} delay={index * 0.1}>
                  <Link href={`/learning-paths/${path.slug}`}>
                    <GlowCard variant="animated" className="h-full">
                      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                        {path.image?.url ? (
                          <Image
                            src={path.image.url}
                            alt={path.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Route className="h-12 w-12 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant={difficultyColor(path.difficulty) as any}>
                            {path.difficulty}
                          </Badge>
                          {path.estimatedDuration && (
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {path.estimatedDuration}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                          {path.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {path.shortDescription || path.description?.substring(0, 120)}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="flex items-center text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {path.courses.length} course{path.courses.length !== 1 && "s"}
                          </span>
                          <Button variant="ghost" size="sm">
                            View Path
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
