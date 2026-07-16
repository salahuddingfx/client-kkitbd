"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Breadcrumb, Pagination, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { ExternalLink, Filter } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with payment integration.",
    category: "Web Development",
    client: "TechStore Inc.",
    duration: "3 months",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
  },
  {
    id: "2",
    title: "Fitness Tracking App",
    description: "Mobile app for tracking workouts and nutrition.",
    category: "App Development",
    client: "FitLife",
    duration: "4 months",
    technologies: ["React Native", "Firebase", "Redux"],
    liveUrl: "#",
  },
  {
    id: "3",
    title: "Banking Dashboard",
    description: "Modern dashboard for banking operations.",
    category: "UI/UX Design",
    client: "FinanceHub",
    duration: "2 months",
    technologies: ["Figma", "React", "Tailwind CSS"],
    liveUrl: "#",
  },
  {
    id: "4",
    title: "Learning Management System",
    description: "Complete LMS platform for online education.",
    category: "Web Development",
    client: "EduTech",
    duration: "6 months",
    technologies: ["Next.js", "PostgreSQL", "AWS"],
    liveUrl: "#",
  },
  {
    id: "5",
    title: "Food Delivery App",
    description: "On-demand food delivery mobile application.",
    category: "App Development",
    client: "FoodieExpress",
    duration: "5 months",
    technologies: ["Flutter", "Node.js", "Redis"],
    liveUrl: "#",
  },
  {
    id: "6",
    title: "Real Estate Platform",
    description: "Property listing and management platform.",
    category: "Web Development",
    client: "PropertyPro",
    duration: "4 months",
    technologies: ["Vue.js", "Django", "PostgreSQL"],
    liveUrl: "#",
  },
];

const categories = ["All", "Web Development", "App Development", "UI/UX Design"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Our Latest Work
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of successful projects delivered to clients worldwide.
            </p>
            <Breadcrumb items={[{ label: "Portfolio" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <div className="animated-border-lg">
                  <Card className="h-full group hover:border-primary/50 transition-all duration-300 border-transparent bg-background">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                      >
                        <ExternalLink className="h-5 w-5 text-foreground" />
                      </a>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <span className="text-sm text-muted-foreground">{project.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                </div>
              </FadeIn>
            ))}
          </div>

          {filteredProjects.length > 0 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
