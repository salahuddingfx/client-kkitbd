"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const jobOpenings = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description: "We're looking for an experienced frontend developer to join our team.",
    requirements: ["5+ years of experience", "React & Next.js expertise", "TypeScript proficiency"],
  },
  {
    id: "2",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Join our design team to create beautiful user experiences.",
    requirements: ["3+ years of experience", "Figma expertise", "User research skills"],
  },
  {
    id: "3",
    title: "Course Instructor",
    department: "Education",
    location: "Remote",
    type: "Contract",
    description: "Share your expertise by creating and teaching courses.",
    requirements: ["Industry expertise", "Teaching experience", "Content creation skills"],
  },
  {
    id: "4",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description: "Drive our marketing efforts to reach more learners.",
    requirements: ["5+ years of experience", "Digital marketing expertise", "Analytics skills"],
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="pt-20 pb-16 bg-background-secondary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Careers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Join Our Team
            </h1>
            <p className="text-lg text-muted-foreground">
              Be part of a team that&apos;s transforming education and digital solutions.
            </p>
            <Breadcrumb items={[{ label: "Careers" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              {jobOpenings.map((job, index) => (
                <FadeIn key={job.id} delay={index * 0.1}>
                  <Card className="group hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{job.department}</Badge>
                            <Badge>{job.type}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {job.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="shrink-0" asChild>
                          <Link href={`/careers/${job.id}`}>
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
