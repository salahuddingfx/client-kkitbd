"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { GlowCard } from "@/components/ui";
import { team, TeamMember } from "@/data/team";
import { getSkillIcon, socialIcons } from "@/lib/icons";
import { ArrowLeft, Mail, MapPin, Calendar, Briefcase, GraduationCap, Globe } from "lucide-react";

export default function TeamMemberClient({ member }: { member: TeamMember }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <Link
            href="/team"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{member.name}</h1>
              <p className="text-lg text-primary font-medium mt-1">{member.position}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {member.experience}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Joined {member.joinedYear}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {member.location}
                </span>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {member.email}
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    style={{ "--hover-bg": socialIcons.linkedin.color } as React.CSSProperties}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.linkedin.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <socialIcons.linkedin.icon className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    style={{ "--hover-bg": socialIcons.twitter.color } as React.CSSProperties}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.twitter.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <socialIcons.twitter.icon className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    style={{ "--hover-bg": socialIcons.github.color } as React.CSSProperties}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.github.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <socialIcons.github.icon className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks.website && (
                  <a
                    href={member.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.globe.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Details */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                <GlowCard variant="glow">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
                    <p className="text-muted-foreground leading-relaxed">{member.longBio}</p>
                  </div>
                </GlowCard>
              </FadeIn>

              <FadeIn delay={0.1}>
                <GlowCard variant="glow">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skillName) => {
                        const info = getSkillIcon(skillName);
                        const Icon = info?.icon;
                        return (
                          <div
                            key={skillName}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-secondary border border-border text-sm font-medium"
                          >
                            {Icon && <Icon className="h-4 w-4" style={{ color: info?.color }} />}
                            {skillName}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            </div>

            <div className="space-y-6">
              <FadeIn delay={0.15}>
                <GlowCard variant="neu">
                  <div className="p-6 space-y-5">
                    <h2 className="text-xl font-semibold text-foreground">Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Education</p>
                          <p className="text-sm text-foreground mt-0.5">{member.education}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Experience</p>
                          <p className="text-sm text-foreground mt-0.5">{member.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                          <p className="text-sm text-foreground mt-0.5">{member.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Joined</p>
                          <p className="text-sm text-foreground mt-0.5">{member.joinedYear}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>

              <FadeIn delay={0.2}>
                <GlowCard variant="glow">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Other Team Members</h2>
                    <div className="space-y-3">
                      {team
                        .filter((m) => m.slug !== member.slug)
                        .slice(0, 4)
                        .map((m) => (
                          <Link
                            key={m.id}
                            href={`/team/${m.slug}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={m.avatar} />
                              <AvatarFallback className="text-xs">
                                {m.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{m.position}</p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
