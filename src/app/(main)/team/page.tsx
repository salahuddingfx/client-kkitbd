"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Skeleton, GlowCard } from "@/components/ui";
import { Breadcrumb, Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { teamApi, TeamMember } from "@/services/api";
import { getSkillIcon } from "@/lib/icons";
import { getImageUrl } from "@/utils";
import { ArrowRight, Globe, Users } from "lucide-react";
import { SiGithub, SiX, SiFacebook } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

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
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary border-b border-border">
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
              Our team of passionate professionals, leaders, and instructors is dedicated to your success.
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
                <GlowCard key={i} variant="glow">
                  <div className="p-6 text-center space-y-4">
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
                  </div>
                </GlowCard>
              ))}
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No Team Members Listed Yet</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Check back soon as our team members are updated from the admin dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => {
                const memberId = member.slug || member._id;
                const avatarSrc = getImageUrl(
                  typeof member.avatar === "string" ? member.avatar : member.avatar?.url
                );
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <FadeIn key={member._id} delay={index * 0.08}>
                    <GlowCard variant="glow" className="h-full flex flex-col">
                      <div className="p-6 sm:p-8 text-center flex flex-col h-full">
                        {/* Avatar */}
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/20 shadow-md">
                          <AvatarImage src={avatarSrc} alt={member.name} />
                          <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                            {initials}
                          </AvatarFallback>
                        </Avatar>

                        {/* Name & Designation */}
                        <Link href={`/team/${memberId}`}>
                          <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                            {member.name}
                          </h3>
                        </Link>
                        <p className="text-sm font-semibold text-primary mt-1 mb-2">
                          {member.designation}
                        </p>

                        {/* Department Badge */}
                        {member.department && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium self-center mb-3">
                            {member.department}
                          </span>
                        )}

                        {/* Bio */}
                        {member.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {member.bio}
                          </p>
                        )}

                        {/* Skill Badges Preview */}
                        {member.skills && member.skills.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                            {member.skills.slice(0, 4).map((skillName) => {
                              const iconData = getSkillIcon(skillName);
                              const IconComponent = iconData?.icon;

                              return (
                                <span
                                  key={skillName}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-background-secondary border border-border text-[11px] font-medium"
                                >
                                  {IconComponent ? (
                                    <IconComponent
                                      className="h-3 w-3"
                                      style={{ color: iconData.color }}
                                    />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  )}
                                  {skillName}
                                </span>
                              );
                            })}
                            {member.skills.length > 4 && (
                              <span className="text-[11px] text-muted-foreground self-center px-1">
                                +{member.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Social Links & View Profile */}
                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                          <div className="flex items-center gap-2">
                            {member.socialLinks?.github && (
                              <a
                                href={member.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="GitHub"
                              >
                                <SiGithub className="h-4 w-4" />
                              </a>
                            )}
                            {member.socialLinks?.linkedin && (
                              <a
                                href={member.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="LinkedIn"
                              >
                                <BsLinkedin className="h-4 w-4" />
                              </a>
                            )}
                            {member.socialLinks?.twitter && (
                              <a
                                href={member.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="Twitter"
                              >
                                <SiX className="h-4 w-4" />
                              </a>
                            )}
                            {member.socialLinks?.facebook && (
                              <a
                                href={member.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="Facebook"
                              >
                                <SiFacebook className="h-4 w-4" />
                              </a>
                            )}
                            {member.socialLinks?.website && (
                              <a
                                href={member.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="Website"
                              >
                                <Globe className="h-4 w-4" />
                              </a>
                            )}
                          </div>

                          <Link
                            href={`/team/${memberId}`}
                            className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1 ml-auto"
                          >
                            View Profile <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
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
