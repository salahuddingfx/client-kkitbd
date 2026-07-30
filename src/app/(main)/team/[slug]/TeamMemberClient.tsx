"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { GlowCard } from "@/components/ui";
import { TeamMember } from "@/services/api";
import { getSkillIcon } from "@/lib/icons";
import { getImageUrl } from "@/utils";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Globe,
  Code2,
  FolderGit2,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { SiGithub, SiX, SiFacebook } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

export default function TeamMemberClient({ member }: { member: TeamMember }) {
  const rawAvatar =
    typeof member.avatar === "string"
      ? member.avatar
      : member.avatar?.url ||
        (typeof member.user === "object" ? member.user?.avatar?.url : "") ||
        "/avatars/tanvir.jpg";
  const avatarSrc = getImageUrl(rawAvatar);

  const initials = member.name
    ?.split(" ")
    .map((n) => n[0])
    .join("") || "";

  return (
    <>
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary border-b border-border">
        <Container>
          <Link
            href="/team"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Developers Directory
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            <div className="flex-shrink-0 relative">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl">
                <AvatarImage src={avatarSrc} alt={member.name} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {member.status === "active" && (
                <div className="absolute bottom-1 right-1 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border-2 border-background flex items-center gap-1 shadow-md z-10">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Active
                </div>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <Code2 className="h-3.5 w-3.5" />
                {member.isDeveloper ? "KKIT Engineering Team" : member.department || "KKIT Team"}
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                {member.name}
              </h1>
              <p className="text-lg md:text-xl text-primary font-semibold mt-1">
                {member.designation}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-4 text-xs md:text-sm">
                {member.department && (
                  <span className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 whitespace-nowrap">
                    <Briefcase className="h-4 w-4 text-primary shrink-0" /> {member.department}
                  </span>
                )}
                {member.experience && (
                  <span className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 whitespace-nowrap">
                    <Briefcase className="h-4 w-4 text-primary shrink-0" /> {member.experience} Experience
                  </span>
                )}
                {member.projects !== undefined && member.projects !== null && (
                  <span className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 whitespace-nowrap">
                    <FolderGit2 className="h-4 w-4 text-primary shrink-0" /> {member.projects}+ Projects Delivered
                  </span>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4 text-primary shrink-0" /> {member.email}
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-5">
                {member.socialLinks?.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="GitHub Profile"
                  >
                    <SiGithub className="h-4 w-4" />
                  </a>
                )}
                {member.socialLinks?.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="LinkedIn Profile"
                  >
                    <BsLinkedin className="h-4 w-4" />
                  </a>
                )}
                {member.socialLinks?.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="Twitter Profile"
                  >
                    <SiX className="h-4 w-4" />
                  </a>
                )}
                {member.socialLinks?.facebook && (
                  <a
                    href={member.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="Facebook Profile"
                  >
                    <SiFacebook className="h-4 w-4" />
                  </a>
                )}
                {member.socialLinks?.website && (
                  <a
                    href={member.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="Personal Website"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Bio & Details Section */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Bio Card */}
            {member.bio && (
              <FadeIn>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      About {member.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {member.bio}
                    </p>
                  </div>
                </GlowCard>
              </FadeIn>
            )}

            {/* Technical Skills Matrix */}
            {member.skills && member.skills.length > 0 && (
              <FadeIn delay={0.1}>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      Skills & Technologies
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {member.skills.map((skillName: string) => {
                        const iconData = getSkillIcon(skillName);
                        const IconComponent = iconData?.icon;

                        return (
                          <div
                            key={skillName}
                            className="p-3 rounded-xl bg-background border border-border flex flex-col items-center justify-center text-center hover:border-primary/40 transition-all shadow-xs group"
                          >
                            {IconComponent ? (
                              <IconComponent
                                className="h-6 w-6 mb-1.5 group-hover:scale-110 transition-transform"
                                style={{ color: iconData.color }}
                              />
                            ) : (
                              <Code2 className="h-6 w-6 mb-1.5 text-primary group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-xs font-semibold text-foreground">{skillName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            )}

            {/* Key Accomplishments & Highlights */}
            {member.highlights && member.highlights.length > 0 && (
              <FadeIn delay={0.2}>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Key Platform Contributions & Highlights
                    </h2>
                    <ul className="space-y-3">
                      {member.highlights.map((highlight: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </FadeIn>
            )}

            {/* Contact Callout */}
            <FadeIn delay={0.3}>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Get in Touch with {member.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Interested in technical training, project collaboration, or mentorship?
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {member.email && (
                    <Button size="default" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="mr-1.5 h-4 w-4" /> Send Message
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="default" asChild>
                    <Link href="/contact">
                      Contact Team <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
