"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage, Button, GlowCard, Skeleton } from "@/components/ui";
import { Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { teamApi, TeamMember } from "@/services/api";
import { getSkillIcon } from "@/lib/icons";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  FolderGit2,
  Globe,
  Award,
  CheckCircle2,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";

import { getImageUrl } from "@/utils";

export default function DeveloperDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [dev, setDev] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      if (!id) return;
      setLoading(true);

      try {
        const res = await teamApi.getBySlug(id);
        if (res.data) {
          setDev(res.data);
          setLoading(false);
          return;
        }
      } catch {
        // Fallthrough
      }

      try {
        const res = await teamApi.getById(id);
        if (res.data) {
          setDev(res.data);
          setLoading(false);
          return;
        }
      } catch {
        // Fallthrough
      }

      try {
        const res = await teamApi.getAll();
        const found = (res.data || []).find(
          (m: TeamMember) =>
            m._id === id ||
            m.slug === id ||
            m.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
        );
        setDev(found || null);
      } catch {
        setDev(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 pb-16 min-h-[75vh] flex items-center justify-center">
        <Container className="max-w-4xl space-y-6">
          <Skeleton className="h-4 w-40 mb-6" />
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0" />
            <div className="space-y-4 w-full text-center md:text-left">
              <Skeleton className="h-8 w-64 mx-auto md:mx-0" />
              <Skeleton className="h-5 w-44 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-center md:justify-start gap-2 pt-2">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!dev) {
    return (
      <div className="pt-20 pb-16 min-h-[75vh] flex items-center justify-center">
        <Container className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
            <Code2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Developer Not Found</h1>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
            The developer profile you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => router.push("/developers")} variant="default">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Developers
          </Button>
        </Container>
      </div>
    );
  }

  const rawAvatar =
    typeof dev.avatar === "string"
      ? dev.avatar
      : dev.avatar?.url ||
        (typeof dev.user === "object" ? dev.user?.avatar?.url : "") ||
        "/avatars/tanvir.jpg";
  const avatarSrc = getImageUrl(rawAvatar);

  const initials = dev.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary border-b border-border">
        <Container>
          <Link
            href="/developers"
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
                <AvatarImage src={avatarSrc} alt={dev.name} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {dev.status === "active" && (
                <div className="absolute bottom-1 right-1 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border-2 border-background flex items-center gap-1 shadow-md z-10">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Active
                </div>
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <Code2 className="h-3.5 w-3.5" />
                KKIT Engineering Team
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">{dev.name}</h1>
              <p className="text-lg md:text-xl text-primary font-semibold mt-1">{dev.designation}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-4 text-xs md:text-sm">
                {dev.department && (
                  <span className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 whitespace-nowrap">
                    <Briefcase className="h-4 w-4 text-primary shrink-0" /> {dev.department}
                  </span>
                )}
                {dev.experience && (
                  <span className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 whitespace-nowrap">
                    <Briefcase className="h-4 w-4 text-primary shrink-0" /> {dev.experience} Experience
                  </span>
                )}
                {dev.projects !== undefined && dev.projects !== null && (
                  <span className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 whitespace-nowrap">
                    <FolderGit2 className="h-4 w-4 text-primary shrink-0" /> {dev.projects}+ Projects Delivered
                  </span>
                )}
                {dev.email && (
                  <a
                    href={`mailto:${dev.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold bg-background px-3 py-1.5 rounded-xl border border-border text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4 text-primary shrink-0" /> {dev.email}
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-5">
                {dev.socialLinks?.github && (
                  <a
                    href={dev.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="GitHub Profile"
                  >
                    <SiGithub className="h-4 w-4" />
                  </a>
                )}
                {dev.socialLinks?.linkedin && (
                  <a
                    href={dev.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="LinkedIn Profile"
                  >
                    <BsLinkedin className="h-4 w-4" />
                  </a>
                )}
                {dev.socialLinks?.twitter && (
                  <a
                    href={dev.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs"
                    aria-label="Twitter Profile"
                  >
                    <SiX className="h-4 w-4" />
                  </a>
                )}
                {dev.socialLinks?.website && (
                  <a
                    href={dev.socialLinks.website}
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

      {/* Main Details Body */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Bio Card */}
            {dev.bio && (
              <FadeIn>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Biography & Engineering Background
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {dev.bio}
                    </p>
                  </div>
                </GlowCard>
              </FadeIn>
            )}

            {/* Technical Skills Matrix */}
            {dev.skills && dev.skills.length > 0 && (
              <FadeIn delay={0.1}>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      Technical Expertise & Tech Stack
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {dev.skills.map((skillName) => {
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
            {dev.highlights && dev.highlights.length > 0 && (
              <FadeIn delay={0.2}>
                <GlowCard variant="glow">
                  <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Key Platform Contributions & Highlights
                    </h2>
                    <ul className="space-y-3">
                      {dev.highlights.map((highlight, idx) => (
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

            {/* Contact / Hire Callout */}
            <FadeIn delay={0.3}>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Collaborate with {dev.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Interested in technical consultation, custom project development, or mentorship?
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {dev.email && (
                    <Button size="default" asChild>
                      <a href={`mailto:${dev.email}`}>
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
