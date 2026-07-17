"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/common";
import { Badge } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";

interface Feature {
  name: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
}

const features: Feature[] = [
  { name: "Course Access", basic: true, pro: true, enterprise: true },
  { name: "Community Forum", basic: true, pro: true, enterprise: true },
  { name: "Certificate of Completion", basic: false, pro: true, enterprise: true },
  { name: "1-on-1 Mentoring", basic: false, pro: true, enterprise: true },
  { name: "Career Coaching", basic: false, pro: false, enterprise: true },
  { name: "Custom Learning Path", basic: false, pro: false, enterprise: true },
  { name: "Team Analytics Dashboard", basic: false, pro: false, enterprise: true },
  { name: "Priority Support", basic: false, pro: true, enterprise: true },
  { name: "Offline Access", basic: false, pro: true, enterprise: true },
  { name: "API Access", basic: false, pro: false, enterprise: true },
];

const plans = [
  { name: "Basic", price: "$29", color: "text-muted-foreground" },
  { name: "Pro", price: "$79", color: "text-primary" },
  { name: "Enterprise", price: "$199", color: "text-red-500" },
];

function Cell({ included }: { included: boolean }) {
  return included ? (
    <Check className="h-5 w-5 text-green-500 mx-auto" />
  ) : (
    <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
  );
}

export function CourseComparison() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-4">Compare Plans</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Choose the Right Plan for You
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 sm:p-4 text-sm font-medium text-muted-foreground w-2/5">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="p-3 sm:p-4 text-center">
                      <p className={cn("text-lg font-bold", plan.color)}>{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.price}/mo</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      "border-t border-border",
                      i % 2 === 0 && "bg-muted/30"
                    )}
                  >
                    <td className="p-3 sm:p-4 text-sm text-foreground">{feature.name}</td>
                    <td className="p-3 sm:p-4"><Cell included={feature.basic} /></td>
                    <td className="p-3 sm:p-4"><Cell included={feature.pro} /></td>
                    <td className="p-3 sm:p-4"><Cell included={feature.enterprise} /></td>
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
