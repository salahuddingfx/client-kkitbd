"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/components/ui";
import { Breadcrumb, Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { teamApi, TeamMember } from "@/services/api";
import { socialIcons } from "@/lib/icons";
import { ArrowRight, Loader2 } from "lucide-react";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await teamApi.getAll({ status: "active" });
        setTeam(res.data || []);
      } catch {
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
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
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Meet the Experts Behind KKIT
            </h1>
            <p className="text-lg text-muted-foreground">
              Our team of passionate professionals is dedicated to helping you succeed.
            </p>
            <Breadcrumb items={[{ label: "Our Team" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-8 text-center space-y-4">
                    <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                    <Skeleton className="h-5 w-36 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6 mx-auto" />
                    <div className="flex justify-center gap-2 pt-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <FadeIn key={member._id} delay={index * 0.1}>
                  <Link href={`/team/${member.slug}`}>
                    <Card className="h-full text-center group hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4 sm:p-8">
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarImage src={member.avatar?.url} />
                          <AvatarFallback>
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-primary mb-2">{member.designation}</p>
                        {member.bio && (
                          <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                        )}
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          {member.socialLinks?.linkedin && (
                            <span
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-all hover:text-white"
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.linkedin.color; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                            >
                              <socialIcons.linkedin.icon className="h-4 w-4" />
                            </span>
                          )}
                          {member.socialLinks?.twitter && (
                            <span
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-all hover:text-white"
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.twitter.color; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                            >
                              <socialIcons.twitter.icon className="h-4 w-4" />
                            </span>
                          )}
                          {member.socialLinks?.github && (
                            <span
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-all hover:text-white"
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.github.color; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                            >
                              <socialIcons.github.icon className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          View Profile <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
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
