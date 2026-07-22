"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui";
import { Container } from "@/components/common";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/constants";
import api from "@/lib/api";
import { cn } from "@/utils";

const paymentMethods = [
  // Cards
  { name: "Visa", color: "text-[#1A1F71]", bg: "bg-[#1A1F71]/5", border: "border-[#1A1F71]/20", label: "VISA" },
  { name: "Mastercard", color: "text-[#EB001B]", bg: "bg-[#FF5F00]/5", border: "border-[#FF5F00]/20", isMastercard: true },
  { name: "Amex", color: "text-[#0070d2]", bg: "bg-[#0070d2]/5", border: "border-[#0070d2]/20", label: "AMEX" },
  { name: "DBBL Nexus", color: "text-[#005c2a]", bg: "bg-[#005c2a]/5", border: "border-[#005c2a]/20", label: "Nexus" },
  { name: "CityTouch", color: "text-[#DA291C]", bg: "bg-[#DA291C]/5", border: "border-[#DA291C]/20", label: "CityTouch" },
  { name: "Bank Asia", color: "text-[#0D4F8B]", bg: "bg-[#0D4F8B]/5", border: "border-[#0D4F8B]/20", label: "Bank Asia" },
  { name: "IBBL", color: "text-[#009E49]", bg: "bg-[#009E49]/5", border: "border-[#009E49]/20", label: "IBBL" },
  { name: "AB Bank", color: "text-[#ED1C24]", bg: "bg-[#ED1C24]/5", border: "border-[#ED1C24]/20", label: "AB" },
  { name: "MTB", color: "text-[#0072BC]", bg: "bg-[#0072BC]/5", border: "border-[#0072BC]/20", label: "MTB" },
  // MFS
  { name: "bKash", color: "text-[#E2125B]", bg: "bg-[#E2125B]/5", border: "border-[#E2125B]/20", label: "bKash" },
  { name: "Nagad", color: "text-[#F15A22]", bg: "bg-[#F15A22]/5", border: "border-[#F15A22]/20", label: "Nagad" },
  { name: "Rocket", color: "text-[#8C3494]", bg: "bg-[#8C3494]/5", border: "border-[#8C3494]/20", label: "Rocket" },
  { name: "Upay", color: "text-[#00AEEF]", bg: "bg-[#00AEEF]/5", border: "border-[#00AEEF]/20", label: "Upay" },
  { name: "iPay", color: "text-[#00A651]", bg: "bg-[#00A651]/5", border: "border-[#00A651]/20", label: "iPay" },
  { name: "OK Wallet", color: "text-[#0054A6]", bg: "bg-[#0054A6]/5", border: "border-[#0054A6]/20", label: "OK Wallet" }
];

const getMethodIcon = (name: string) => {
  switch (name) {
    case "bKash":
      return (
        <svg className="h-3 w-3 text-[#E2125B] fill-current mr-1 flex-shrink-0" viewBox="0 0 100 100">
          <polygon points="50,15 20,60 50,45" />
          <polygon points="50,15 80,60 50,45" />
          <polygon points="50,45 20,60 50,85" />
          <polygon points="50,45 80,60 50,85" />
        </svg>
      );
    case "Nagad":
      return (
        <svg className="h-3.5 w-3.5 text-[#F15A22] fill-current mr-1 flex-shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "Rocket":
      return (
        <svg className="h-3 w-3 text-[#8C3494] fill-current mr-1 flex-shrink-0" viewBox="0 0 24 24">
          <path d="M12 2L3 21l9-5 9 5L12 2z" />
        </svg>
      );
    case "Visa":
      return (
        <span className="text-[10px] font-extrabold italic text-[#1A1F71] dark:text-[#5D63B0] mr-1 flex-shrink-0">V</span>
      );
    default:
      return null;
  }
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-background-secondary border-t border-border">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-primary">KKIT</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering individuals and businesses with cutting-edge technology solutions and education.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:info@kkitbd.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@kkitbd.com</span>
              </a>
              <a
                href="tel:+8801234567890"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+880 123 456 7890</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Courses</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.courses.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-muted-foreground">Get weekly updates on new courses, tech tips, and exclusive offers.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 md:w-64 h-10 px-4 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-10 px-5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KKIT. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Custom Code-based Payment Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm mt-8 opacity-75 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pay With</span>
            <div className="h-4 w-[1px] bg-border hidden lg:block" />
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-3xl">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className={cn(
                  "px-2.5 py-1 rounded-lg border text-[10px] font-semibold transition-all duration-300 shadow-xs cursor-default select-none bg-background flex items-center justify-center",
                  method.border || "border-border hover:border-primary/30"
                )}
                title={method.name}
              >
                {getMethodIcon(method.name)}
                {method.isMastercard ? (
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                      <div className="w-2 h-2 rounded-full bg-[#EB001B]" />
                      <div className="w-2 h-2 rounded-full bg-[#F79E1B] opacity-85" />
                    </div>
                    <span className="text-[9px] font-bold text-foreground">mastercard</span>
                  </div>
                ) : method.name === "Visa" ? (
                  <span className="text-[10px] font-bold italic text-[#1A1F71] dark:text-[#5D63B0]">VISA</span>
                ) : (
                  <span className={cn("text-[9px] font-semibold", method.color)}>{method.label}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold flex-shrink-0">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified by SSLCommerz</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
