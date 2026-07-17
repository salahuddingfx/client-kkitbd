"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Play,
  Heart,
  Share2,
} from "lucide-react";
import { Button, Badge, GlowCard } from "@/components/ui";
import { Breadcrumb, Container, ShareButtons } from "@/components/common";
import { CourseOutlineForm } from "@/components/common/CourseOutlineForm";
import { HowItWorksSection } from "@/components/common/HowItWorksSection";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js and more. This comprehensive course takes you from zero to job-ready developer with hands-on projects and real-world applications.",
    introVideoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
    instructor: "John Doe",
    instructorRole: "Senior Software Engineer",
    duration: "12 weeks",
    enrolledStudents: 5420,
    rating: 4.9,
    reviews: 1280,
    price: 99.99,
    level: "beginner",
    category: "Web Development",
    language: "English",
    lastUpdated: "June 2026",
    whatYouWillLearn: [
      "Build 16 web development projects for your portfolio",
      "Learn the latest technologies: HTML5, CSS3, JavaScript, React, Node.js",
      "Master frontend development with React and Next.js",
      "Understand backend development with Node.js and Express",
      "Work with databases: MongoDB and PostgreSQL",
      "Deploy applications to production environments",
      "Write clean, maintainable, and scalable code",
      "Understand version control with Git and GitHub",
    ],
    requirements: [
      "No programming experience needed — I'll teach you everything",
      "A computer with internet access",
      "Willingness to learn and practice",
    ],
    curriculum: [
      {
        title: "Getting Started",
        lessons: 8,
        duration: "2h 30m",
      },
      {
        title: "HTML & CSS Fundamentals",
        lessons: 12,
        duration: "4h 15m",
      },
      {
        title: "JavaScript Essentials",
        lessons: 15,
        duration: "5h 45m",
      },
      {
        title: "React Deep Dive",
        lessons: 18,
        duration: "7h 20m",
      },
      {
        title: "Node.js & Backend",
        lessons: 14,
        duration: "5h 10m",
      },
      {
        title: "Database Integration",
        lessons: 10,
        duration: "3h 50m",
      },
      {
        title: "Deployment & DevOps",
        lessons: 6,
        duration: "2h 40m",
      },
      {
        title: "Final Project",
        lessons: 4,
        duration: "3h 00m",
      },
    ],
  },
  {
    id: "2",
    title: "React & Next.js Masterclass",
    description:
      "Build modern web applications with React and Next.js. From component architecture to server-side rendering, API routes, and deployment strategies.",
    introVideoUrl: "https://www.youtube.com/embed/vwSlYG7hFk0",
    instructor: "Jane Smith",
    instructorRole: "Lead Frontend Engineer",
    duration: "8 weeks",
    enrolledStudents: 3210,
    rating: 4.8,
    reviews: 890,
    price: 79.99,
    level: "intermediate",
    category: "Web Development",
    language: "English",
    lastUpdated: "May 2026",
    whatYouWillLearn: [
      "Build production-ready React applications",
      "Master Next.js App Router and server components",
      "Implement authentication and authorization",
      "Optimize performance and SEO",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with React fundamentals",
    ],
    curriculum: [
      { title: "React Fundamentals Review", lessons: 6, duration: "2h 00m" },
      { title: "Advanced React Patterns", lessons: 10, duration: "4h 30m" },
      { title: "Next.js App Router", lessons: 12, duration: "5h 00m" },
      { title: "Server Components & Actions", lessons: 8, duration: "3h 20m" },
      { title: "Authentication & Database", lessons: 10, duration: "4h 15m" },
      { title: "Deployment & Testing", lessons: 6, duration: "2h 30m" },
    ],
  },
  {
    id: "3",
    title: "Mobile App Development with Flutter",
    description:
      "Create beautiful cross-platform mobile apps with Flutter and Dart. Build iOS and Android apps from a single codebase.",
    introVideoUrl: "https://www.youtube.com/embed/fnRrYk20cxQ",
    instructor: "Mike Johnson",
    instructorRole: "Mobile Development Lead",
    duration: "10 weeks",
    enrolledStudents: 2890,
    rating: 4.7,
    reviews: 720,
    price: 89.99,
    level: "beginner",
    category: "Mobile Development",
    language: "English",
    lastUpdated: "April 2026",
    whatYouWillLearn: [
      "Build beautiful, natively compiled apps for mobile",
      "Master Dart programming language",
      "Implement custom UI designs with Flutter widgets",
      "Connect to REST APIs and databases",
    ],
    requirements: [
      "No prior mobile development experience needed",
      "A computer with Flutter SDK installed",
    ],
    curriculum: [
      { title: "Dart Programming", lessons: 8, duration: "3h 00m" },
      { title: "Flutter Basics", lessons: 12, duration: "5h 00m" },
      { title: "UI/UX in Flutter", lessons: 10, duration: "4h 30m" },
      { title: "State Management", lessons: 8, duration: "3h 15m" },
      { title: "API Integration", lessons: 6, duration: "2h 45m" },
      { title: "App Publishing", lessons: 4, duration: "1h 30m" },
    ],
  },
  {
    id: "4",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn the principles of great user interface design. Master Figma, design systems, and user research methodologies.",
    introVideoUrl: "https://www.youtube.com/embed/QFnijRZ-6Kc",
    instructor: "Sarah Williams",
    instructorRole: "Senior UX Designer",
    duration: "6 weeks",
    enrolledStudents: 4100,
    rating: 4.9,
    reviews: 1100,
    price: 69.99,
    level: "beginner",
    category: "Design",
    language: "English",
    lastUpdated: "June 2026",
    whatYouWillLearn: [
      "Master design thinking and user research",
      "Create wireframes and prototypes in Figma",
      "Build scalable design systems",
      "Conduct usability testing",
    ],
    requirements: [
      "No design experience required",
      "A computer with Figma installed (free)",
    ],
    curriculum: [
      { title: "Design Thinking", lessons: 6, duration: "2h 15m" },
      { title: "User Research", lessons: 8, duration: "3h 00m" },
      { title: "Wireframing & Prototyping", lessons: 10, duration: "4h 30m" },
      { title: "Visual Design", lessons: 8, duration: "3h 20m" },
      { title: "Design Systems", lessons: 6, duration: "2h 45m" },
      { title: "Portfolio Project", lessons: 4, duration: "2h 00m" },
    ],
  },
  {
    id: "5",
    title: "Python for Data Science",
    description:
      "Master Python programming for data analysis and machine learning. Learn pandas, NumPy, matplotlib, and scikit-learn.",
    introVideoUrl: "https://www.youtube.com/embed/rLlXIt6BqSk",
    instructor: "David Brown",
    instructorRole: "Data Science Manager",
    duration: "14 weeks",
    enrolledStudents: 6200,
    rating: 4.8,
    reviews: 1450,
    price: 109.99,
    level: "intermediate",
    category: "Data Science",
    language: "English",
    lastUpdated: "May 2026",
    whatYouWillLearn: [
      "Master Python for data manipulation and analysis",
      "Build machine learning models with scikit-learn",
      "Visualize data effectively with matplotlib and seaborn",
      "Work with real-world datasets",
    ],
    requirements: [
      "Basic programming knowledge",
      "High school math fundamentals",
    ],
    curriculum: [
      { title: "Python Basics", lessons: 10, duration: "4h 00m" },
      { title: "NumPy & Pandas", lessons: 12, duration: "5h 30m" },
      { title: "Data Visualization", lessons: 8, duration: "3h 15m" },
      { title: "Statistics for Data Science", lessons: 10, duration: "4h 00m" },
      { title: "Machine Learning Basics", lessons: 14, duration: "6h 30m" },
      { title: "Real-World Projects", lessons: 6, duration: "3h 00m" },
    ],
  },
  {
    id: "6",
    title: "Advanced TypeScript",
    description:
      "Deep dive into TypeScript advanced features and patterns. Master generics, decorators, utility types, and more.",
    introVideoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
    instructor: "Emily Davis",
    instructorRole: "TypeScript Core Contributor",
    duration: "6 weeks",
    enrolledStudents: 1890,
    rating: 4.7,
    reviews: 520,
    price: 59.99,
    level: "advanced",
    category: "Web Development",
    language: "English",
    lastUpdated: "March 2026",
    whatYouWillLearn: [
      "Master advanced TypeScript type system",
      "Implement generic patterns and utility types",
      "Build type-safe APIs and libraries",
      "Understand declaration files and module augmentation",
    ],
    requirements: [
      "Solid understanding of TypeScript basics",
      "Experience building projects with TypeScript",
    ],
    curriculum: [
      { title: "Type System Deep Dive", lessons: 8, duration: "3h 30m" },
      { title: "Generics & Constraints", lessons: 10, duration: "4h 15m" },
      { title: "Utility Types & Mapped Types", lessons: 8, duration: "3h 00m" },
      { title: "Decorators & Metadata", lessons: 6, duration: "2h 30m" },
      { title: "Type-Safe Patterns", lessons: 8, duration: "3h 45m" },
      { title: "Project", lessons: 4, duration: "2h 00m" },
    ],
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const course = courses.find((c) => c.id === id);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showOutlineForm, setShowOutlineForm] = useState(false);

  if (!course) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The course you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const totalLessons = course.curriculum.reduce((acc, s) => acc + s.lessons, 0);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 bg-background-secondary">
        <Container>
          <Breadcrumb
            items={[
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge>{course.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {course.title}
              </h1>

              <p className="text-muted-foreground text-lg">{course.description}</p>

              {/* Intro Video - Right after description */}
              {course.introVideoUrl && (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl mt-6">
                  <iframe
                    src={course.introVideoUrl}
                    title={`${course.title} - Introduction`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{course.rating}</span>
                  ({course.reviews.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.enrolledStudents.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {totalLessons} lessons
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {course.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{course.instructor}</div>
                  <div className="text-xs text-muted-foreground">{course.instructorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                      : "bg-background border-border text-muted-foreground hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`}
                  />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <ShareButtons title={course.title} />
              </div>
            </div>

            {/* Right — Enrollment Card */}
            <div>
              <GlowCard variant="neu" className="p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ${course.price}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    One-time payment • Lifetime access
                  </p>
                </div>

                <Button className="w-full h-12" size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Enroll Now
                </Button>

                <button className="w-full mt-3 h-12 flex items-center justify-center gap-2 bg-transparent border-2 border-red-500 text-red-500 font-semibold rounded-lg transition-all hover:bg-red-500 hover:text-white course-download-btn">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Course PDF
                </button>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">This course includes:</h4>
                  {[
                    `${course.duration} of on-demand video`,
                    `${totalLessons} comprehensive lessons`,
                    "Certificate of completion",
                    "Lifetime access & updates",
                    "Downloadable resources",
                    "Mobile & TV access",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>
        </Container>
      </section>

      {/* What You'll Learn */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">What You&apos;ll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.whatYouWillLearn.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-background-secondary">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Requirements</h2>
            <ul className="space-y-3">
              {course.requirements.map((req) => (
                <li key={req} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* How This Bootcamp Works */}
      <HowItWorksSection />

      {/* Download Course Outline */}
      <section className="py-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Download Course Outline
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get the complete course outline including curriculum, duration, and module details sent to your email
            </p>
            <button
              onClick={() => setShowOutlineForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-all outline-btn-pulse"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Get Course Outline
            </button>
          </motion.div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-background-secondary">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Student Reviews</h2>
            <p className="text-sm text-muted-foreground mb-8">
              {course.reviews.toLocaleString()} reviews • {course.rating} average rating
            </p>
            <div className="space-y-6">
              {[
                {
                  name: "Alex Turner",
                  avatar: "AT",
                  rating: 5,
                  date: "2 weeks ago",
                  text: "Excellent course! The instructor explains everything clearly and the projects are very practical. I landed my first dev job after completing this.",
                },
                {
                  name: "Maria Garcia",
                  avatar: "MG",
                  rating: 5,
                  date: "1 month ago",
                  text: "Best investment I've made in my career. The curriculum is well-structured and the community support is amazing.",
                },
                {
                  name: "James Wilson",
                  avatar: "JW",
                  rating: 4,
                  date: "2 months ago",
                  text: "Great content overall. Some sections could use more depth, but the hands-on projects make up for it. Highly recommended for beginners.",
                },
              ].map((review, i) => (
                <div key={i} className="p-5 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{review.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star
                              key={si}
                              className={`h-3 w-3 ${si < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-white/80 mb-8">
              Join {course.enrolledStudents.toLocaleString()} students already enrolled.
            </p>
            <Button variant="secondary" size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/register">
                Enroll Now — ${course.price}
              </Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Course Outline Modal */}
      {showOutlineForm && (
        <CourseOutlineForm
          courseName={course.title}
          courseId={course.id}
          onClose={() => setShowOutlineForm(false)}
        />
      )}
    </>
  );
}
