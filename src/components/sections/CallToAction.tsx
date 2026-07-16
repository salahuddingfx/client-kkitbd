"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { Container } from "@/components/common";
import { ScrollReveal } from "@/components/animations";

export function CallToAction() {
  return (
    <section className="py-20 bg-primary">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal direction="up" distance={0} duration={0.8}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2} duration={0.8}>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of students who have already transformed their careers.
              Start learning today and unlock your potential.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.4} duration={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="xl"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link href="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
