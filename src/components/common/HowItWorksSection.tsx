"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common";

const steps = [
  {
    icon: "📋",
    title: "Module Release Time",
    description:
      "One new module/practice task will be released every day. Modules (video content or practice tasks) will be released at 8 PM. Using Gems, you can get early access 2 hours before to watch the module. (Complete modules on time and do well in quizzes to collect Gems).",
  },
  {
    icon: "⏱️",
    title: "Watch Time Duration",
    description:
      "Each module has about 10 videos (12-15 minutes each). Watching video content will require 3-5 hours daily. We suggest allocating 6-8 hours daily for watching videos and practice.",
  },
  {
    icon: "🔍",
    title: "Similar Topic Research",
    description:
      "Spend 1-2 hours daily researching similar topics on Google or through our support system to solidify your learning.",
  },
  {
    icon: "💬",
    title: "Get Support When Stuck",
    description:
      "If you don't understand something while watching videos, or get stuck while practicing with errors, join our support sessions for solutions. Post detailed issues in our dedicated Facebook group for instant help. 6+ hours of live support sessions daily (2 hours × 3 sessions).",
  },
  {
    icon: "🎓",
    title: "Live Conceptual Sessions",
    description:
      "After every 2-4 modules, there will be a practice day with a conceptual session/live class where topics are taught differently from the main module to clear any confusion.",
  },
  {
    icon: "📝",
    title: "Assignment Submission",
    description:
      "After every 4-7 modules, there will be an assignment. Maximum marks: 60. On-time submission: 60 marks. One day late: 50 marks. After that: 30 marks.",
  },
  {
    icon: "🚀",
    title: "SCIC Program",
    description:
      "If you complete the bootcamp on time with good assignment scores, you can join the SCIC program where we help you prepare everything needed for landing a job. You must stay focused and dedicated to complete the bootcamp on time.",
  },
  {
    icon: "📅",
    title: "28-30 Week Bootcamp",
    description:
      "There is no shortcut to hard work. Commit to investing 6-8 hours daily for the next 28-30 weeks to complete the bootcamp.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background-secondary">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How This Bootcamp{" "}
              <span className="text-primary">Works</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This bootcamp will make you skilled in MERN Stack Web Development through step-by-step learning, hands-on projects, and evaluation from zero.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical dashed line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-muted-foreground/30" />

            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 mb-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ml-16 md:ml-0 ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                        isLeft ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon circle */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl shadow-lg z-10">
                    {step.icon}
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
