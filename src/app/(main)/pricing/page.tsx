"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Separator } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader, CourseComparison, GuaranteeBadge } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { Check, Loader2 } from "lucide-react";
import { pricingApi, PricingPlan } from "@/services/api";

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await pricingApi.getAll({ status: "active" });
        setPlans(res.data || []);
      } catch {
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  return (
    <>
      <section className="pt-12 sm:pt-20 pb-10 sm:pb-16 bg-background-secondary">
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

      <section className="py-12 sm:py-20">
        <Container>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {plans.map((plan, index) => (
                <FadeIn key={plan._id} delay={index * 0.1}>
                  <Card
                    className={`h-full relative ${
                      plan.isPopular ? "border-primary shadow-lg md:scale-105" : ""
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary">{plan.badge || "Most Popular"}</Badge>
                      </div>
                    )}
                    <CardContent className="p-4 sm:p-8 text-center">
                      <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                      {plan.description && (
                        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                      )}
                      <div className="mt-6">
                        <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <Separator className="my-6" />
                      <ul className="space-y-3 text-left mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <Check className={`h-4 w-4 mr-2 shrink-0 ${feature.included ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={feature.included ? "" : "text-muted-foreground line-through"}>
                              {feature.text}
                            </span>
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
          )}
        </Container>
      </section>

      <div className="flex justify-center pb-12 sm:pb-20">
        <GuaranteeBadge />
      </div>

      <CourseComparison />
    </>
  );
}
