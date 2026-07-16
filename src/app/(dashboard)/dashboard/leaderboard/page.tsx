"use client";

import { Trophy, Flame, Target, Star, TrendingUp, Crown, Medal, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { cn } from "@/utils";

const leaderboardData = [
  { rank: 1, name: "Tanvir Hossain", points: 2850, streak: 45, coursesCompleted: 12, avatar: "TH" },
  { rank: 2, name: "Nusrat Jahan", points: 2720, streak: 38, coursesCompleted: 11, avatar: "NJ" },
  { rank: 3, name: "Rafiq Ahmed", points: 2580, streak: 32, coursesCompleted: 10, avatar: "RA" },
  { rank: 4, name: "Sakib Rahman", points: 2340, streak: 28, coursesCompleted: 9, avatar: "SR" },
  { rank: 5, name: "Farhana Akter", points: 2190, streak: 25, coursesCompleted: 8, avatar: "FA" },
  { rank: 6, name: "Imran Hossain", points: 2050, streak: 22, coursesCompleted: 8, avatar: "IH" },
  { rank: 7, name: "Fatima Begum", points: 1890, streak: 19, coursesCompleted: 7, avatar: "FB" },
  { rank: 8, name: "Kamal Hasan", points: 1750, streak: 16, coursesCompleted: 6, avatar: "KH" },
  { rank: 9, name: "Ayesha Siddiqua", points: 1620, streak: 14, coursesCompleted: 6, avatar: "AS" },
  { rank: 10, name: "Zahidul Islam", points: 1480, streak: 11, coursesCompleted: 5, avatar: "ZI" },
];

const weeklyTopPerformers = [
  { name: "Tanvir Hossain", points: 420, avatar: "TH" },
  { name: "Nusrat Jahan", points: 385, avatar: "NJ" },
  { name: "Rafiq Ahmed", points: 350, avatar: "RA" },
];

const myStats = {
  rank: 3,
  points: 2580,
  streak: 32,
  weeklyRank: 3,
};

const rankIcons = [Crown, Medal, Award];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground mt-1">Compete with fellow learners and climb the ranks.</p>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Rank", value: `#${myStats.rank}`, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Total Points", value: myStats.points.toLocaleString(), icon: Star, color: "text-primary", bg: "bg-primary/10" },
          { label: "Day Streak", value: `${myStats.streak} days`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "Weekly Rank", value: `#${myStats.weeklyRank}`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
        ].map((stat, i) => (
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
                <div className="space-y-3">
                  {leaderboardData.map((user, i) => {
                    const RankIcon = rankIcons[i];
                    const isMe = user.rank === 3;
                    return (
                      <div
                        key={user.rank}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-xl transition-colors",
                          isMe ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                        )}
                      >
                        <div className="w-8 text-center">
                          {i < 3 ? (
                            <RankIcon className={cn("h-5 w-5 mx-auto", i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : "text-orange-500")} />
                          ) : (
                            <span className="text-sm font-semibold text-muted-foreground">#{user.rank}</span>
                          )}
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium", isMe ? "text-primary" : "text-foreground")}>
                            {user.name} {isMe && <span className="text-xs">(You)</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.coursesCompleted} courses completed</p>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Flame className="h-3 w-3 text-orange-500" />
                            {user.streak}
                          </div>
                          <div className="text-sm font-bold text-foreground">{user.points.toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                    { action: "Complete a lesson", points: "+10" },
                    { action: "Complete a course", points: "+100" },
                    { action: "7-day streak", points: "+50" },
                    { action: "Submit assignment", points: "+25" },
                    { action: "Project approved", points: "+75" },
                    { action: "Write a review", points: "+15" },
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
                <h3 className="font-semibold text-foreground mb-4">Top Performers This Week</h3>
                <div className="space-y-3">
                  {weeklyTopPerformers.map((user, i) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">{user.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
