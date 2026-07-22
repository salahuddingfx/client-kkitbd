"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import { Container, SectionHeader } from "@/components/common";
import { faqsApi, FaqItem } from "@/services/api";

const fallbackFaqs = [
  { question: "What courses do you offer?", answer: "We offer a wide range of courses including Web Development, Mobile App Development, UI/UX Design, Data Science, and more." },
  { question: "Are the courses self-paced?", answer: "Yes, most of our courses are self-paced, allowing you to learn at your own speed." },
  { question: "Do I get a certificate after completing a course?", answer: "Yes, you receive an industry-recognized certificate upon successful completion of any course." },
  { question: "What is the refund policy?", answer: "We offer a 30-day money-back guarantee." },
  { question: "Do you offer job placement assistance?", answer: "Yes, we provide career guidance, resume review, and job placement assistance to all our students." },
];

export function FAQ() {
  const [faqs, setFaqs] = useState(fallbackFaqs);

  useEffect(() => {
    faqsApi.getAll().then((res) => {
      if (res.data?.length) {
        setFaqs(res.data.map((f: FaqItem) => ({ question: f.question, answer: f.answer })));
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our courses and services."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
