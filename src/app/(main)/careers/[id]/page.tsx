"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  Send,
  Building,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button, Badge, Skeleton, Card, CardContent } from "@/components/ui";
import { Container } from "@/components/common";
import { careersApi, CareerItem } from "@/services/api";

const fallbackJobs: Record<string, CareerItem> = {
  "65a000000000000000000001": {
    _id: "65a000000000000000000001",
    title: "Senior Full-Stack Developer (Next.js & Node.js)",
    slug: "senior-full-stack-developer",
    department: "Engineering",
    location: "Dhaka, Bangladesh (Hybrid)",
    type: "full-time",
    description: "We are seeking a seasoned Full-Stack Engineer to lead the architectural development of scalable web platforms, mentor junior devs, and craft high-performance APIs.",
    requirements: [
      "4+ years of professional experience building web apps with Next.js, React, Node.js & TypeScript",
      "Solid database design experience using MongoDB, Mongoose, and Redis caching",
      "Hands-on experience with RESTful APIs, JWT authentication, and WebSockets",
      "Deep understanding of frontend performance tuning, SEO, and SSR/SSG patterns",
      "Strong Git workflow, CI/CD pipelines, and clean architecture practices",
    ],
    responsibilities: [
      "Architect and scale frontend & backend core web platforms",
      "Collaborate with Product Designers & QA to build pixel-perfect interactive UIs",
      "Write clean, self-documenting code with high test coverage and reliability",
      "Mentor mid-level and junior developers through code reviews & tech sessions",
      "Participate in daily standups and agile sprint planning",
    ],
    salary: { min: 80000, max: 130000, currency: "BDT", period: "month" },
    status: "active",
  },
  "65a000000000000000000002": {
    _id: "65a000000000000000000002",
    title: "Lead UI/UX & Product Designer",
    slug: "lead-ui-ux-designer",
    department: "Design",
    location: "Remote / Dhaka",
    type: "remote",
    description: "Create sleek, engaging user experience designs, design systems, and responsive wireframes for modern web applications and educational platforms.",
    requirements: [
      "3+ years experience designing complex web and mobile products in Figma",
      "Experience creating & maintaining scalable Design Systems (tokens, component libraries)",
      "Strong portfolio demonstrating user-centered design process & interactive prototypes",
      "Ability to conduct user research, usability testing, and wireframing",
    ],
    responsibilities: [
      "Design modern, accessible UI components for our LMS & agency clients",
      "Maintain consistent design tokens across desktop and mobile platforms",
      "Conduct user research and translate insights into elegant UI flows",
    ],
    salary: { min: 60000, max: 100000, currency: "BDT", period: "month" },
    status: "active",
  },
};

export default function SingleCareerPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<CareerItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Application Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("3-5 years");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    careersApi
      .getById(id)
      .then((res) => {
        setJob(res.data || fallbackJobs[id] || null);
      })
      .catch(() => {
        setJob(fallbackJobs[id] || Object.values(fallbackJobs)[0] || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !resumeUrl.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, Resume link)");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (job?._id) {
        await careersApi.apply(job._id, {
          name,
          email,
          phone,
          experience,
          resumeUrl,
          coverLetter,
        });
      }
      setSuccessMsg("🎉 Your application was submitted successfully! Our HR team will reach out soon.");
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg("");
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Briefcase className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-2xl font-bold">Job Opening Not Found</h2>
          <p className="text-sm text-muted-foreground">This job post may have been closed or removed.</p>
          <Button asChild><Link href="/careers">Explore All Careers</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-background-secondary">
      <Container className="max-w-5xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Careers
          </Link>
        </div>

        {/* Job Header Hero Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-bold text-xs">{job.department}</Badge>
            <Badge className="capitalize bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs">
              {job.type}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary" /> {job.location}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {job.title}
              </h1>
              {job.salary?.min && (
                <div className="flex items-center gap-2 mt-3 text-primary font-bold text-lg">
                  <DollarSign className="h-5 w-5" />
                  <span>
                    ৳{job.salary.min.toLocaleString()} - ৳{job.salary.max?.toLocaleString() || "Negotiable"} / {job.salary.period || "month"}
                  </span>
                </div>
              )}
            </div>

            <Button
              size="lg"
              className="font-bold text-base shadow-md shrink-0 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Send className="mr-2 h-4 w-4" /> Apply for this Role
            </Button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Left */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-4">
              <h2 className="text-xl font-bold text-foreground border-b pb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Role Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-4">
                <h2 className="text-xl font-bold text-foreground border-b pb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Key Responsibilities
                </h2>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-4">
                <h2 className="text-xl font-bold text-foreground border-b pb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-500" /> Requirements & Qualifications
                </h2>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perks & Benefits */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-4">
              <h2 className="text-xl font-bold text-foreground border-b pb-3 flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-500" /> Why Work at KKIT?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-muted/40 border">
                  <h4 className="font-bold mb-1">🚀 Fast Growth Environment</h4>
                  <p className="text-xs text-muted-foreground">Work on live cutting-edge client applications and EdTech tools.</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40 border">
                  <h4 className="font-bold mb-1">💡 Competitive Compensation</h4>
                  <p className="text-xs text-muted-foreground">Attractive salary package with performance bonuses & learning allowances.</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40 border">
                  <h4 className="font-bold mb-1">🏡 Flexible & Hybrid Work</h4>
                  <p className="text-xs text-muted-foreground">Enjoy remote work options and comfortable office environment.</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40 border">
                  <h4 className="font-bold mb-1">🎓 Unlimited Learning</h4>
                  <p className="text-xs text-muted-foreground">Free access to all KKIT premium courses, certifications, and mentorship.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
              <h3 className="font-bold text-lg border-b pb-3 text-foreground">Job Summary</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-bold text-foreground">{job.department}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-bold text-foreground">{job.location}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Employment Type:</span>
                  <span className="font-bold capitalize text-emerald-600">{job.type}</span>
                </div>
                {job.salary?.min && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-bold text-primary">৳{job.salary.min.toLocaleString()} / {job.salary.period || "mo"}</span>
                  </div>
                )}
              </div>

              <Button className="w-full h-11 font-bold text-sm cursor-pointer" onClick={() => setShowModal(true)}>
                Apply for this Position
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>100% Equal Opportunity Employer</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-card border border-border rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Job Application</span>
              <h2 className="text-2xl font-bold text-foreground">Apply for {job.title}</h2>
              <p className="text-xs text-muted-foreground">Please fill in your details below. Our recruiting team will review your profile.</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" /> {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> {successMsg}
              </div>
            )}

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hasan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="tanvir@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+8801700000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Relevant Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Fresher / 0-1 year">Fresher / 0-1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Resume / Portfolio URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Cover Note / Why KKIT?</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about your projects, skills, or why you want to join our team..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3">
                <Button type="submit" disabled={submitting} className="w-full h-11 font-bold text-sm">
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Application...</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Submit Application</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
