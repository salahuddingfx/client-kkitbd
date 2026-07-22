"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { GlowCard } from "@/components/ui";
import { TeamMember } from "@/services/api";
import { getSkillIcon, socialIcons } from "@/lib/icons";
import { ArrowLeft, Mail, Briefcase, Globe } from "lucide-react";

export default function TeamMemberClient({ member }: { member: TeamMember }) {
  const initials = member.name?.split(" ").map((n) => n[0]).join("") || "";

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
                <AvatarImage src={member.avatar?.url} />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{member.name}</h1>
              <p className="text-lg text-primary font-medium mt-1">{member.designation}</p>
              {member.department && <p className="text-sm text-muted-foreground mt-1">{member.department}</p>}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" /> {member.email}
                  </a>
                )}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                {member.socialLinks?.linkedin && (
                  <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.linkedin.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <socialIcons.linkedin.icon className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks?.twitter && (
                  <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.twitter.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <socialIcons.twitter.icon className="h-5 w-5" />
                  </a>
                )}
                {member.socialLinks?.github && (
                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-all hover:text-white"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = socialIcons.github.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >
                    <socialIcons.github.icon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Bio */}
      {member.bio && (
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <GlowCard variant="glow">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </GlowCard>
              </FadeIn>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
