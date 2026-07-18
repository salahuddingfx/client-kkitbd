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

export function Stats() {
  const [stats, setStats] = useState<HomeStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await homeStatsApi.getAll({ section: "stats", isActive: "true" });
        setStats(res.data || []);
      } catch {
        setStats([]);
      }
    };
    fetchStats();
  }, []);

  if (stats.length === 0) return null;

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
