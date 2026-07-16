"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What is KKIT?",
        answer: "KKIT is a premium digital solutions and learning platform that offers expert-led courses in technology, design, and business. We also provide digital services like web development, app development, and UI/UX design.",
      },
      {
        question: "Who can benefit from KKIT?",
        answer: "Anyone looking to learn new tech skills, advance their career, or get professional digital solutions for their business can benefit from our platform.",
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 30-day money-back guarantee on all our courses. If you're not satisfied, you can request a full refund.",
      },
    ],
  },
  {
    category: "Courses",
    questions: [
      {
        question: "How long do I have access to a course?",
        answer: "Once you enroll in a course, you have lifetime access to all course materials, including future updates.",
      },
      {
        question: "Are the courses self-paced?",
        answer: "Yes, most of our courses are self-paced, allowing you to learn at your own speed. Some courses may include live sessions with instructors.",
      },
      {
        question: "Do I get a certificate?",
        answer: "Yes, you receive an industry-recognized certificate upon successful completion of any course.",
      },
    ],
  },
  {
    category: "Account",
    questions: [
      {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking 'Forgot Password' on the login page and following the instructions sent to your email.",
      },
      {
        question: "Can I change my email address?",
        answer: "Yes, you can update your email address in your account settings. You'll need to verify the new email address.",
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, please contact our support team. Note that this action is irreversible.",
      },
    ],
  },
];

export default function FAQPage() {
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
              FAQ
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our platform, courses, and services.
            </p>
            <Breadcrumb items={[{ label: "FAQ" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
