"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from "@/components/ui";
import { Breadcrumb, Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { GlowCard } from "@/components/ui";
import { teamApi, TeamMember } from "@/services/api";
import { getSkillIcon } from "@/lib/icons";
import { Globe, ExternalLink, ArrowRight, Code2 } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await teamApi.getAll({ status: "active" });
        const allMembers = res.data || [];
        // Filter developers or engineering members, fallback to all active members if none tagged explicitly
        const devsOnly = allMembers.filter(
          (m) =>
            m.isDeveloper ||
            m.department?.toLowerCase().includes("eng") ||
            m.department?.toLowerCase().includes("dev") ||
            m.designation?.toLowerCase().includes("dev") ||
            m.designation?.toLowerCase().includes("engineer") ||
            m.designation?.toLowerCase().includes("instructor") ||
            (m.skills && m.skills.length > 0)
        );

        setDevelopers(devsOnly.length > 0 ? devsOnly : allMembers);
      } catch {
        setDevelopers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Engineering & Tech Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              The Builders Behind KKIT
            </h1>
            <p className="text-lg text-muted-foreground">
              Meet the talented developers, engineers, and mentors who craft the technology powering your learning experience.
            </p>
            <Breadcrumb items={[{ label: "Developers" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      {/* Developers Grid */}
      <section className="py-12 sm:py-20">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <GlowCard key={i} variant="glow">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-6 w-16 rounded-lg" />
                      <Skeleton className="h-6 w-16 rounded-lg" />
                      <Skeleton className="h-6 w-16 rounded-lg" />
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          ) : developers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No Developers Listed Yet</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Check back soon as our team grows, or contact us to join our developer directory.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developers.map((dev, index) => {
                const devId = dev.slug || dev._id;
                const initials = dev.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <FadeIn key={dev._id} delay={index * 0.08}>
                    <GlowCard variant="glow" className="h-full flex flex-col">
                      <div className="p-6 flex flex-col h-full">
                        {/* Avatar & Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-16 h-16 border-2 border-primary/20">
                            <AvatarImage src={dev.avatar?.url} alt={dev.name} />
                            <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Link
                              href={`/developers/${devId}`}
                              className="hover:text-primary transition-colors"
                            >
                              <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                                {dev.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-primary font-medium">{dev.designation}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              {dev.experience && <span>{dev.experience}</span>}
                              {dev.experience && dev.projects && <span>•</span>}
                              {dev.projects && <span>{dev.projects} projects</span>}
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        {dev.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dev.bio}</p>
                        )}

                        {/* Skills */}
                        {dev.skills && dev.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {dev.skills.map((skillName) => {
                              const iconData = getSkillIcon(skillName);
                              const IconComponent = iconData?.icon;

                              return (
                                <div
                                  key={skillName}
                                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background-secondary border border-border text-xs font-medium"
                                >
                                  {IconComponent ? (
                                    <IconComponent
                                      className="h-3.5 w-3.5"
                                      style={{ color: iconData.color }}
                                    />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  )}
                                  {skillName}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Social Links & View Profile */}
                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                          <div className="flex items-center gap-2">
                            {dev.socialLinks?.github && (
                              <a
                                href={dev.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="GitHub"
                              >
                                <SiGithub className="h-4 w-4" />
                              </a>
                            )}
                            {dev.socialLinks?.linkedin && (
                              <a
                                href={dev.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="LinkedIn"
                              >
                                <BsLinkedin className="h-4 w-4" />
                              </a>
                            )}
                            {dev.socialLinks?.twitter && (
                              <a
                                href={dev.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                aria-label="Twitter"
                              >
                                <SiX className="h-4 w-4" />
                              </a>
                            )}
                            {dev.socialLinks?.website && (
                              <a
                                href={dev.socialLinks.website}
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
                            href={`/developers/${devId}`}
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

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re always looking for talented developers who are passionate about education and technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                View Open Positions
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
