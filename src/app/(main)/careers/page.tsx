"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Skeleton } from "@/components/ui";
import { Breadcrumb, Container } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { MapPin, Clock, ArrowRight, Search, Briefcase, Sparkles, DollarSign } from "lucide-react";
import { careersApi, CareerItem } from "@/services/api";

const fallbackJobs: CareerItem[] = [
  {
    _id: "65a000000000000000000001",
    title: "Senior Full-Stack Developer (Next.js & Node.js)",
    slug: "senior-full-stack-developer",
    department: "Engineering",
    location: "Dhaka, Bangladesh (Hybrid)",
    type: "full-time",
    description: "We are seeking a seasoned Full-Stack Engineer to lead the architectural development of scalable web platforms, mentor junior devs, and craft high-performance APIs.",
    requirements: ["4+ years experience with Next.js & Node.js", "MongoDB & Redis optimization", "Clean Code & Microservices mindset"],
    responsibilities: ["Build scalable web solutions", "Lead technical code reviews", "Optimize client-side performance"],
    salary: { min: 80000, max: 130000, currency: "BDT", period: "month" },
    status: "active",
  },
  {
    _id: "65a000000000000000000002",
    title: "Lead UI/UX & Product Designer",
    slug: "lead-ui-ux-designer",
    department: "Design",
    location: "Remote / Dhaka",
    type: "remote",
    description: "Create sleek, engaging user experience designs, design systems, and responsive wireframes for modern web applications and educational platforms.",
    requirements: ["3+ years Figma product design", "Design System maintenance", "User Journey mapping & usability testing"],
    salary: { min: 60000, max: 100000, currency: "BDT", period: "month" },
    status: "active",
  },
  {
    _id: "65a000000000000000000003",
    title: "Senior MERN Stack Course Mentor & Instructor",
    slug: "mern-stack-instructor",
    department: "Education",
    location: "Remote",
    type: "contract",
    description: "Guide student developers through hands-on project reviews, live coding masterclasses, and career mentorship for modern web stack courses.",
    requirements: ["Proven experience in MERN stack", "Passion for teaching and technical mentoring", "Strong communication skills"],
    salary: { min: 40000, max: 70000, currency: "BDT", period: "month" },
    status: "active",
  },
  {
    _id: "65a000000000000000000004",
    title: "Digital Growth & Performance Marketer",
    slug: "digital-marketing-manager",
    department: "Marketing",
    location: "Dhaka, Bangladesh",
    type: "full-time",
    description: "Drive strategic acquisition campaigns, SEO performance, social community engagement, and lead generation for KKIT courses & digital services.",
    requirements: ["Meta & Google Ads mastery", "Content funnel creation", "Data analytics & conversion optimization"],
    salary: { min: 50000, max: 85000, currency: "BDT", period: "month" },
    status: "active",
  },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    careersApi
      .getAll()
      .then((res) => {
        const fetched = res.data || [];
        setJobs(fetched.length > 0 ? fetched : fallbackJobs);
      })
      .catch(() => setJobs(fallbackJobs))
      .finally(() => setLoading(false));
  }, []);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const jobTypes = ["All", "full-time", "remote", "contract", "part-time", "internship"];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || job.department === selectedDept;
    const matchesType = selectedType === "All" || job.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesDept && matchesType;
  });

  return (
    <>
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary border-b">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> We Are Hiring
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2 mb-4">
              Build the Future of EdTech <span className="text-primary">&</span> Software
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Join KKIT&apos;s fast-growing team of software engineers, designers, and educators.
              We empower learners and build enterprise-grade software.
            </p>
            <Breadcrumb items={[{ label: "Careers" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      {/* Filter & Jobs Section */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Search and Filters Bar */}
            <div className="bg-card border border-border p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search job title, skill, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground self-center mr-2">
                  Department:
                </span>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedDept === dept
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground self-center mr-2">
                  Employment Type:
                </span>
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs List */}
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-44 w-full rounded-2xl" />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-card border rounded-2xl p-8 space-y-3">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-bold text-foreground">No openings match your filter</h3>
                <p className="text-sm text-muted-foreground">
                  Try clearing your search or filters to see all available roles.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setSelectedDept("All");
                    setSelectedType("All");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-5">
                {filteredJobs.map((job, index) => (
                  <FadeIn key={job._id} delay={index * 0.08}>
                    <div className="animated-border-lg">
                      <Card className="group hover:border-primary/50 transition-all duration-300 border-transparent bg-card">
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <div className="flex-1 space-y-2.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary" className="font-semibold">{job.department}</Badge>
                                <Badge className="capitalize bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                                  {job.type}
                                </Badge>
                                {job.salary?.min && (
                                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/20">
                                    <DollarSign className="h-3 w-3" />
                                    ৳{job.salary.min.toLocaleString()} - ৳{job.salary.max?.toLocaleString() || "Negotiable"} / {job.salary.period || "mo"}
                                  </span>
                                )}
                              </div>

                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>

                              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                                {job.description}
                              </p>

                              {job.requirements && job.requirements.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {job.requirements.slice(0, 3).map((req, rIdx) => (
                                    <span key={rIdx} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md">
                                      ✓ {req}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                                <span className="flex items-center">
                                  <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
                                  {job.location}
                                </span>
                                <span className="flex items-center capitalize">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                                  {job.type}
                                </span>
                              </div>
                            </div>

                            <Button variant="default" className="shrink-0 font-bold self-start md:self-center" asChild>
                              <Link href={`/careers/${job._id}`}>
                                View Role & Apply
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

