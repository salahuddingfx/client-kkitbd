"use client";

import { useState, useEffect } from "react";
import { Container, SectionHeader } from "@/components/common";
import { ScrollReveal, StaggerReveal } from "@/components/animations";
import { homeStatsApi, HomeStat } from "@/services/api";
import {
  Users, BookOpen, Award, TrendingUp, Globe, Heart,
  Calendar, Smile, GraduationCap, Star, Zap, Target,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Users, BookOpen, Award, TrendingUp, Globe, Heart,
  Calendar, Smile, GraduationCap, Star, Zap, Target,
};

function StatCard({ stat }: { stat: HomeStat }) {
  const Icon = stat.icon ? iconMap[stat.icon] : Users;

  return (
    <div className="stat-item text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
      <div
        className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: stat.color + "15" }}
      >
        {Icon && <Icon className="w-7 h-7" style={{ color: stat.color }} />}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        {stat.value}
        {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
      </div>
      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
      {stat.description && (
        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
      )}
    </div>
  );
}

const FALLBACK_STATS: HomeStat[] = [
  { _id: "stat-1", label: "Graduated Students", value: "10,000", suffix: "+", icon: "Users", color: "#3B82F6", description: "Across 30+ countries worldwide", order: 1, isActive: true, section: "stats" },
  { _id: "stat-2", label: "Active Courses", value: "45", suffix: "+", icon: "BookOpen", color: "#8B5CF6", description: "Taught by industry experts", order: 2, isActive: true, section: "stats" },
  { _id: "stat-3", label: "Job Placement Rate", value: "94", suffix: "%", icon: "Award", color: "#10B981", description: "Hired within 6 months of graduation", order: 3, isActive: true, section: "stats" },
  { _id: "stat-4", label: "Client Satisfaction", value: "4.9", suffix: "/5", icon: "Star", color: "#F59E0B", description: "Based on 2,500+ student reviews", order: 4, isActive: true, section: "stats" },
];

export function Stats() {
  const [stats, setStats] = useState<HomeStat[]>(FALLBACK_STATS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await homeStatsApi.getAll({ section: "stats", isActive: "true" });
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setStats(res.data);
        }
      } catch {
        // Keep FALLBACK_STATS
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-20 bg-background-secondary">
      <Container>
        <ScrollReveal direction="up" distance={40}>
          <SectionHeader
            subtitle="Our Impact"
            title="Numbers That Speak"
            description="Join thousands of successful graduates who have transformed their careers with us."
          />
        </ScrollReveal>

        <StaggerReveal
          childSelector=".stat-item"
          stagger={0.08}
          y={40}
          duration={0.6}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
            {stats.map((stat) => (
              <StatCard key={stat._id} stat={stat} />
            ))}
          </div>
        </StaggerReveal>
      </Container>
    </section>
  );
}
