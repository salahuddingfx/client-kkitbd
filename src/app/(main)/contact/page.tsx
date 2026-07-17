"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, Input, Textarea, Button, Label, PhoneInput } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@kkitbd.com",
    href: "mailto:info@kkitbd.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 123 456 7890",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [phone, setPhone] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // API call would go here
      console.log(data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or want to work together? We&apos;d love to hear from you.
            </p>
            <Breadcrumb items={[{ label: "Contact Us" }]} className="justify-center mt-6" />
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            <FadeIn direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Let&apos;s Talk
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.href}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <info.icon className="h-5 w-5 text-primary group-hover:text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{info.title}</div>
                        <div className="text-sm text-muted-foreground">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Phone (Optional)</Label>
                        <PhoneInput
                          value={phone}
                          onChange={(v) => {
                            setPhone(v);
                            setValue("phone", v);
                          }}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          {...register("subject")}
                        />
                        {errors.subject && (
                          <p className="text-sm text-destructive">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        rows={5}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
