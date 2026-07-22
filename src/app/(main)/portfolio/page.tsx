"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Skeleton } from "@/components/ui";
import { Breadcrumb, Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { ExternalLink, Loader2, Briefcase, GraduationCap, Quote, ArrowRight, Star, Code, Users } from "lucide-react";
import { portfolioApi, PortfolioItem } from "@/services/api";
import { getTechInfo } from "@/utils/techIcons";

interface ExtendedPortfolio extends PortfolioItem {
  projectType?: "client" | "student" | "internal";
  client?: string;
  duration?: string;
  metrics?: { label: string; value: string };
  testimonial?: { quote: string; author: string; designation: string; company: string };
  studentName?: string;
  courseName?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<ExtendedPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "client" | "student">("all");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    portfolioApi.getAll().then((res) => {
      setProjects(res.data || []);
    }).catch(() => setProjects([])).finally(() => setLoading(false));
  }, []);

  const clientProjects = projects.filter((p) => p.projectType === "client");
  const studentProjects = projects.filter((p) => p.projectType === "student");
  const featuredProjects = projects.filter((p) => p.featured);

  const displayed = activeTab === "all" ? projects
    : activeTab === "client" ? clientProjects
    : studentProjects;

  const categories = ["All", ...Array.from(new Set(displayed.map((p) => p.category)))];
  const filtered = selectedCategory === "All" ? displayed : displayed.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Work</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Services <span className="text-primary">&</span> Student Results
            </h1>
            <p className="text-lg text-muted-foreground">
              We build world-class digital products AND teach the next generation of developers.
              See what we deliver for clients and what our students achieve.
            </p>
            <Breadcrumb items={[{ label: "Portfolio" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="py-8 border-y bg-card">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{clientProjects.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Client Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{studentProjects.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Student Projects</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{featuredProjects.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Featured Work</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{new Set(projects.map((p) => p.category)).size}</p>
              <p className="text-sm text-muted-foreground mt-1">Categories</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tabs + Filters */}
      <section className="py-12 sm:py-20">
        <Container>
          {/* Tab switcher */}
          <div className="flex justify-center gap-2 mb-8">
            {([
              { key: "all", label: "All Work", icon: null },
              { key: "client", label: "Client Services", icon: Briefcase },
              { key: "student", label: "Student Projects", icon: GraduationCap },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setSelectedCategory("All"); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-primary-foreground/20" : "bg-foreground/10"}`}>
                  {key === "all" ? projects.length : key === "client" ? clientProjects.length : studentProjects.length}
                </span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-52 w-full" />
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-1.5 flex-wrap pt-1">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <Skeleton key={j} className="h-5 w-12 rounded-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No projects found.</p>
          ) : (
            <>
              {/* Category filters */}
              {categories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {categories.map((category) => (
                    <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)}>
                      {category}
                    </Button>
                  ))}
                </div>
              )}

              {/* Client Projects Grid */}
              {activeTab !== "student" && filtered.some((p) => p.projectType === "client") && (
                <div className="mb-16">
                  {activeTab === "all" && (
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold">Client Services</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.filter((p) => p.projectType === "client").map((project, index) => (
                      <FadeIn key={project._id} delay={index * 0.1}>
                        <ClientProjectCard project={project} />
                      </FadeIn>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Projects Grid */}
              {activeTab !== "client" && filtered.some((p) => p.projectType === "student") && (
                <div>
                  {activeTab === "all" && (
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold">Student Achievements</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.filter((p) => p.projectType === "student").map((project, index) => (
                      <FadeIn key={project._id} delay={index * 0.1}>
                        <StudentProjectCard project={project} />
                      </FadeIn>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Build or Learn?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Whether you need a digital product built or want to become a developer — we&apos;ve got you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Hire Us <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/courses">Browse Courses <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ClientProjectCard({ project }: { project: ExtendedPortfolio }) {
  return (
    <div className="animated-border-lg h-full">
      <Card className="h-full group hover:border-primary/50 transition-all duration-300 border-transparent bg-background">
        {project.image?.url ? (
          <div className="h-48 bg-muted overflow-hidden">
            <img src={project.image.url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-blue-500/20 to-blue-500/5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Briefcase className="h-12 w-12 text-blue-500/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 text-foreground" />
                </a>
              )}
            </div>
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary">{project.category}</Badge>
            {project.duration && <span className="text-xs text-muted-foreground">{project.duration}</span>}
          </div>
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          {project.client && <p className="text-sm text-muted-foreground mb-2">Client: {project.client}</p>}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.shortDescription || project.description}</p>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 mb-4">
              <Star className="h-4 w-4 text-primary shrink-0" />
              <span className="text-lg font-bold text-primary">{project.metrics.value}</span>
              <span className="text-sm text-muted-foreground">{project.metrics.label}</span>
            </div>
          )}

          {/* Testimonial */}
          {project.testimonial?.quote && (
            <div className="p-3 rounded-lg bg-muted/50 mb-4">
              <div className="flex items-start gap-2">
                <Quote className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm italic line-clamp-2">&ldquo;{project.testimonial.quote}&rdquo;</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    — {project.testimonial.author}{project.testimonial.designation && `, ${project.testimonial.designation}`}{project.testimonial.company && ` @ ${project.testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 5).map((tech) => {
              const info = getTechInfo(tech);
              const Icon = info?.icon;
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border bg-background"
                  title={info?.label || tech}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" style={{ color: info?.color || undefined }} /> : <span className="w-3.5 h-3.5 rounded bg-muted inline-block" />}
                  <span>{info?.label || tech}</span>
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentProjectCard({ project }: { project: ExtendedPortfolio }) {
  return (
    <div className="animated-border-lg h-full">
      <Card className="h-full group hover:border-primary/50 transition-all duration-300 border-transparent bg-background">
        {project.image?.url ? (
          <div className="h-48 bg-muted overflow-hidden">
            <img src={project.image.url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-green-500/20 to-green-500/5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Code className="h-12 w-12 text-green-500/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 text-foreground" />
                </a>
              )}
            </div>
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600">{project.category}</Badge>
            {project.courseName && <span className="text-xs text-muted-foreground">{project.courseName}</span>}
          </div>
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          {project.studentName && (
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">by {project.studentName}</span>
            </div>
          )}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.shortDescription || project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 5).map((tech) => {
              const info = getTechInfo(tech);
              const Icon = info?.icon;
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border bg-background"
                  title={info?.label || tech}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" style={{ color: info?.color || undefined }} /> : <span className="w-3.5 h-3.5 rounded bg-muted inline-block" />}
                  <span>{info?.label || tech}</span>
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
