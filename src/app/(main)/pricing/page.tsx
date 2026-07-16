"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Separator } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for beginners starting their journey.",
    features: [
      "Access to 10 courses",
      "Basic community support",
      "Course completion certificates",
      "Email support",
    ],
    isPopular: false,
  },
  {
    name: "Professional",
    price: 79,
    description: "For serious learners who want to advance.",
    features: [
      "Access to all courses",
      "Priority community support",
      "Course completion certificates",
      "Career guidance",
      "Mock interviews",
      "Resume review",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For teams and organizations.",
    features: [
      "Everything in Professional",
      "Custom learning paths",
      "Team management dashboard",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Priority support",
    ],
    isPopular: false,
  },
];

export default function PricingPage() {
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
              Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for you. All plans include a 7-day free trial.
            </p>
            <Breadcrumb items={[{ label: "Pricing" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <FadeIn key={plan.name} delay={index * 0.1}>
                <Card
                  className={`h-full relative ${
                    plan.isPopular ? "border-primary shadow-lg scale-105" : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <Separator className="my-6" />
                    <ul className="space-y-3 text-left mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.isPopular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
