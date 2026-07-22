"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Breadcrumb } from "@/components/common";
import { GlowCard, Badge, Button } from "@/components/ui";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { Calendar, Clock, Users, Video, ExternalLink, Loader2 } from "lucide-react";
import { liveClassesApi, LiveClass } from "@/services/api";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export default function LiveClassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await liveClassesApi.getUpcoming();
        setClasses(res.data || []);
      } catch {
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

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
              Live Classes
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Upcoming Live Sessions
            </h1>
            <p className="text-lg text-muted-foreground">
              Join interactive live classes taught by industry experts. Learn in real-time and ask questions directly.
            </p>
            <Breadcrumb items={[{ label: "Live Classes" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-9 w-20 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Upcoming Classes
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no live classes scheduled at the moment. Check back soon for new sessions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls, index) => {
                const isLive = cls.status === "live";
                const isJoinable = cls.status === "live" || cls.status === "scheduled";

                return (
                  <FadeIn key={cls._id} delay={index * 0.1}>
                    <GlowCard className="h-full">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            variant={isLive ? "success" : "default"}
                            className={isLive ? "relative" : ""}
                          >
                            {isLive && (
                              <span className="relative flex h-2 w-2 mr-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                              </span>
                            )}
                            {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {cls.duration} min
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {cls.title}
                        </h3>

                        {typeof cls.course === "object" && (
                          <p className="text-sm text-primary mb-3">
                            {cls.course.title}
                          </p>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            {cls.instructor?.avatar?.url ? (
                              <img
                                src={cls.instructor.avatar.url}
                                alt={cls.instructor.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-medium text-muted-foreground">
                                {cls.instructor?.name?.charAt(0) || "I"}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {cls.instructor?.name}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{formatDate(cls.scheduledAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span>{formatTime(cls.scheduledAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 shrink-0" />
                            <span>
                              {cls.attendees?.length || 0}
                              {cls.maxAttendees ? ` / ${cls.maxAttendees}` : ""} attendees
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          {isJoinable && cls.meetingUrl ? (
                            <Button
                              className="w-full"
                              onClick={() => window.open(cls.meetingUrl, "_blank")}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Join Class
                              <ExternalLink className="h-3 w-3 ml-2" />
                            </Button>
                          ) : (
                            <Button variant="outline" className="w-full" disabled>
                              <Calendar className="h-4 w-4 mr-2" />
                              {cls.status === "completed" ? "Completed" : "Not Available"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
