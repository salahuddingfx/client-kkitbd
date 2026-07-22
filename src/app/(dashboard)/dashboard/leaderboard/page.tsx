"use client";

import { useState, useEffect } from "react";
import { Trophy, Flame, Target, Star, TrendingUp, Crown, Medal, Award, Loader2 } from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn } from "@/utils";
import { leaderboardApi, LeaderboardEntry, MyStats } from "@/services/api";
import { useAppSelector } from "@/redux/hooks";
import { getInitials } from "@/utils";

const rankIcons = [Crown, Medal, Award];

export default function LeaderboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [myStats, setMyStats] = useState<MyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      leaderboardApi.getAll({ limit: "50" }).catch(() => ({ data: [] })),
      leaderboardApi.getMyStats().catch(() => ({ data: null })),
    ]).then(([lbRes, statsRes]) => {
      setLeaderboard(lbRes.data || []);
      setMyStats(statsRes.data || null);
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
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-none">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-5 w-16 shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  const statsCards = myStats ? [
    { label: "Overall Rank", value: `#${myStats.rank}`, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Total Points", value: myStats.points.toLocaleString(), icon: Star, color: "text-primary", bg: "bg-primary/10" },
    { label: "Current Streak", value: `${myStats.streak} day${myStats.streak !== 1 ? "s" : ""}`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Lessons Done", value: myStats.lessonsCompleted.toString(), icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  ] : [
    { label: "Overall Rank", value: "-", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Total Points", value: "0", icon: Star, color: "text-primary", bg: "bg-primary/10" },
    { label: "Current Streak", value: "0 days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Lessons Done", value: "0", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground mt-1">Compete with fellow learners and climb the ranks.</p>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
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
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold text-foreground">All-Time Rankings</h2>
                </div>
                {leaderboard.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No rankings yet. Complete courses and lessons to earn points!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.map((entry, i) => {
                      const RankIcon = rankIcons[i];
                      const isMe = user && entry._id === user.id;
                      const initials = entry.name?.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() || "??";
                      return (
                        <div
                          key={entry._id}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-xl transition-colors",
                            isMe ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                          )}
                        >
                          <div className="w-8 text-center">
                            {i < 3 && RankIcon ? (
                              <RankIcon className={cn("h-5 w-5 mx-auto", i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : "text-orange-500")} />
                            ) : (
                              <span className="text-sm font-semibold text-muted-foreground">#{entry.rank}</span>
                            )}
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                            {entry.avatar?.url ? (
                              <img src={entry.avatar.url} alt={entry.name} className="h-full w-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium", isMe ? "text-primary" : "text-foreground")}>
                              {entry.name} {isMe && <span className="text-xs">(You)</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{entry.coursesCompleted} courses completed</p>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Flame className="h-3 w-3 text-orange-500" />
                              {entry.lessonsCompleted}
                            </div>
                            <div className="text-sm font-bold text-foreground">{entry.points.toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <FadeIn delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Points Breakdown</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { action: "Enroll in a course", points: "+5" },
                    { action: "Complete a lesson", points: "+10" },
                    { action: "Complete a course", points: "+100" },
                  ].map((item) => (
                    <div key={item.action} className="flex items-center justify-between py-1.5">
                      <span className="text-sm text-muted-foreground">{item.action}</span>
                      <span className="text-sm font-semibold text-primary">{item.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Top 3 Performers</h3>
                {leaderboard.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data yet.</p>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.slice(0, 3).map((entry, i) => {
                      const initials = entry.name?.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() || "??";
                      return (
                        <div key={entry._id} className="flex items-center gap-3">
                          <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                            {entry.avatar?.url ? (
                              <img src={entry.avatar.url} alt={entry.name} className="h-full w-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{entry.name}</p>
                          </div>
                          <span className="text-sm font-semibold text-primary">{entry.points}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
