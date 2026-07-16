"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Play, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  video?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "Software Engineer",
    company: "Google",
    avatar: "/avatars/sarah.jpg",
    content: "The courses here transformed my career. I went from knowing nothing about coding to landing my dream job at Google.",
    rating: 5,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Product Manager",
    company: "Microsoft",
    avatar: "/avatars/michael.jpg",
    content: "The instructors are world-class and the curriculum is perfectly structured. Highly recommend!",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Davis",
    position: "UX Designer",
    company: "Apple",
    avatar: "/avatars/emily.jpg",
    content: "The UI/UX design course gave me the skills I needed to land my dream job. Thank you!",
    rating: 5,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused || videoOpen) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, videoOpen, next]);

  const active = testimonials[current];

  return (
    <section className="py-20 bg-background-secondary">
      <Container>
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Students Say"
          description="Hear from our students who have successfully transformed their careers."
        />

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Video section */}
              {active.video && (
                <div className="mb-6 relative group">
                  <div className="relative w-full max-w-md mx-auto aspect-video rounded-xl overflow-hidden bg-muted">
                    {!videoOpen ? (
                      <button
                        onClick={() => setVideoOpen(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors z-10"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-7 w-7 text-white ml-1" />
                        </div>
                      </button>
                    ) : null}
                    <video
                      src={active.video}
                      controls={videoOpen}
                      className={cn(
                        "w-full h-full object-cover",
                        !videoOpen && "pointer-events-none"
                      )}
                      poster=""
                    />
                    {videoOpen && (
                      <button
                        onClick={() => setVideoOpen(false)}
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-foreground mb-6 italic">
                &ldquo;{active.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <Avatar>
                  <AvatarImage src={active.avatar} />
                  <AvatarFallback>
                    {active.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-semibold text-foreground">{active.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {active.position} at {active.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === current
                      ? "bg-primary w-6"
                      : "bg-muted hover:bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
