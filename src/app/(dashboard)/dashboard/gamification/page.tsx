"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Star,
  Flame,
  Target,
  TrendingUp,
  Zap,
  Award,
  Lock,
  Loader2,
  BookOpen,
  GraduationCap,
  MessageSquare,
  FolderGit2,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn } from "@/utils";
import { gamificationApi, GamificationData, BadgeDefinition } from "@/services/api";
import { useAppSelector } from "@/redux/hooks";

function getLevelProgress(points: number): { current: number; next: number; pct: number } {
  const level = Math.floor(Math.sqrt(points / 100)) + 1;
  const prevThreshold = (level - 1) * (level - 1) * 100;
  const nextThreshold = level * level * 100;
  const current = points - prevThreshold;
  const needed = nextThreshold - prevThreshold;
  return { current, next: needed, pct: Math.min(100, Math.round((current / needed) * 100)) };
}

export default function GamificationPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [data, setData] = useState<GamificationData | null>(null);
  const [allBadges, setAllBadges] = useState<BadgeDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      gamificationApi.getMe().catch(() => ({ data: null })),
      gamificationApi.getBadges().catch(() => ({ data: [] })),
    ]).then(([gRes, bRes]) => {
      setData(gRes.data);
      setAllBadges(bRes.data || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5 flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-xl shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-full rounded-full" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex flex-col items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-4 w-20 mx-auto" />
                <Skeleton className="h-3 w-16 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const levelInfo = data ? getLevelProgress(data.points) : { current: 0, next: 100, pct: 0 };
  const earnedBadgeIds = new Set(data?.badges?.map((b) => b.badgeId) || []);

  const statCards = data ? [
    { label: "Total Points", value: data.points.toLocaleString(), icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Level", value: data.level.toString(), icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Badges Earned", value: data.badges?.length?.toString() || "0", icon: Award, color: "text-primary", bg: "bg-primary/10" },
    { label: "Lessons Done", value: data.stats?.lessonsCompleted?.toString() || "0", icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
        <p className="text-muted-foreground mt-1">Track your progress and earn badges.</p>
      </div>

      {/* XP Bar */}
      <FadeIn>
        <Card className="overflow-hidden">
          <div className="h-2 bg-muted">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700"
              style={{ width: `${levelInfo.pct}%` }}
            />
          </div>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Level {data?.level || 1}</p>
                  <p className="text-xl font-bold text-foreground">{data?.points || 0} XP</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{levelInfo.current} / {levelInfo.next} XP</p>
                <p className="text-xs text-muted-foreground">to next level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Badges Grid */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Badges</h2>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {earnedBadgeIds.size} / {allBadges.length} earned
                  </span>
                </div>
                {allBadges.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No badges available yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {allBadges.map((badge) => {
                      const earned = earnedBadgeIds.has(badge.badgeId);
                      return (
                        <div
                          key={badge.badgeId}
                          className={cn(
                            "relative p-4 rounded-xl border text-center transition-all",
                            earned
                              ? "border-primary/30 bg-primary/5"
                              : "border-border bg-muted/30 opacity-60"
                          )}
                        >
                          {!earned && (
                            <div className="absolute top-2 right-2">
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            </div>
                          )}
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <p className="text-sm font-medium text-foreground">{badge.name}</p>
                          <p className="text-[11px] text-muted-foreground mt-1">{badge.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Stats Breakdown */}
        <div className="space-y-6">
          <FadeIn delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Activity Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: "Lessons Completed", value: data?.stats?.lessonsCompleted || 0, icon: BookOpen, color: "text-green-500" },
                    { label: "Courses Completed", value: data?.stats?.coursesCompleted || 0, icon: GraduationCap, color: "text-blue-500" },
                    { label: "Assignments Submitted", value: data?.stats?.assignmentsSubmitted || 0, icon: ClipboardList, color: "text-orange-500" },
                    { label: "Projects Submitted", value: data?.stats?.projectsSubmitted || 0, icon: FolderGit2, color: "text-purple-500" },
                    { label: "Reviews Written", value: data?.stats?.reviewsWritten || 0, icon: Star, color: "text-yellow-500" },
                    { label: "Discussions Created", value: data?.stats?.discussionsCreated || 0, icon: MessageSquare, color: "text-cyan-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4", item.color)} />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">How to Earn</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Complete a lesson</span><span className="text-primary font-medium">+10 XP</span></div>
                  <div className="flex justify-between"><span>Enroll in a course</span><span className="text-primary font-medium">+5 XP</span></div>
                  <div className="flex justify-between"><span>Complete a course</span><span className="text-primary font-medium">+100 XP</span></div>
                  <div className="flex justify-between"><span>Submit assignment</span><span className="text-primary font-medium">+25 XP</span></div>
                  <div className="flex justify-between"><span>Project approved</span><span className="text-primary font-medium">+75 XP</span></div>
                  <div className="flex justify-between"><span>Write a review</span><span className="text-primary font-medium">+15 XP</span></div>
                  <div className="flex justify-between"><span>Create discussion</span><span className="text-primary font-medium">+10 XP</span></div>
                  <div className="flex justify-between"><span>Reply to discussion</span><span className="text-primary font-medium">+5 XP</span></div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
