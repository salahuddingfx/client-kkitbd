"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";
import { pricingApi, PricingPlan } from "@/services/api";

function Cell({ included }: { included: boolean }) {
  return included ? (
    <Check className="h-5 w-5 text-green-500 mx-auto" />
  ) : (
    <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
  );
}

export function CourseComparison() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    pricingApi.getAll().then((res) => {
      if (res.data?.length) setPlans(res.data);
    }).catch(() => {});
  }, []);

  if (!plans.length) return null;

  // Collect all unique feature names across plans
  const allFeatureNames = Array.from(new Set(plans.flatMap((p) => p.features?.map((f) => f.text) || [])));

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-4">Compare Plans</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Choose the Right Plan for You</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 sm:p-4 text-sm font-medium text-muted-foreground w-2/5">Features</th>
                  {plans.map((plan) => (
                    <th key={plan._id} className="p-3 sm:p-4 text-center">
                      <p className={cn("text-lg font-bold", plan.isPopular ? "text-primary" : "text-foreground")}>{plan.name}</p>
                      <p className="text-xs text-muted-foreground">৳{plan.price.toLocaleString()}/{plan.period}</p>
                      {plan.badge && <Badge variant="secondary" className="mt-1 text-[10px]">{plan.badge}</Badge>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatureNames.map((featureName, i) => (
                  <tr key={featureName} className={cn("border-t border-border", i % 2 === 0 && "bg-muted/30")}>
                    <td className="p-3 sm:p-4 text-sm text-foreground">{featureName}</td>
                    {plans.map((plan) => {
                      const feature = plan.features?.find((f) => f.text === featureName);
                      return (
                        <td key={plan._id} className="p-3 sm:p-4">
                          <Cell included={feature?.included ?? false} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
