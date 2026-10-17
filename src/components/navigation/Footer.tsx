"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck, Heart } from "lucide-react";
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
    if (!email || !email.trim()) return;
    setLoading(true);
    
    // Safety timeout in case fetch hangs
    const timeoutId = setTimeout(() => {
      setSubscribed(true);
      setEmail("");
      setLoading(false);
    }, 4000);

    try {
      await api.post("/newsletter", { email: email.trim() });
      clearTimeout(timeoutId);
      setSubscribed(true);
      setEmail("");
    } catch {
      clearTimeout(timeoutId);
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

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border/80 bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-xs"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border/80 bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-xs"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border/80 bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-xs"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border/80 bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-xs"
                title="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions & Engineering */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Solutions</h3>
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

          {/* Learning Academy */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Learning Academy</h3>
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
        <div className="mt-10 p-6 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-muted-foreground">Get weekly updates on new engineering courses, tech releases, and exclusive offers.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                <CheckCircle className="h-5 w-5" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full sm:w-68 h-10 px-4 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-10 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto shadow-sm cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ─── Authentic Monochrome ASCII Art Watermark (KKIT) ─── */}
        <div className="pt-8 sm:pt-12 pb-4 overflow-hidden select-none pointer-events-none flex justify-center">
          <svg
            viewBox="0 0 540 92"
            className="w-full max-w-xl h-auto opacity-20 dark:opacity-30 hover:opacity-50 transition-opacity duration-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="16"
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              ██╗  ██╗██╗  ██╗██╗████████╗
            </text>
            <text
              x="50%"
              y="30"
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              ██║ ██╔╝██║ ██╔╝██║╚══██╔══╝
            </text>
            <text
              x="50%"
              y="44"
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              █████╔╝ █████╔╝ ██║   ██║   
            </text>
            <text
              x="50%"
              y="58"
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              ██╔═██╗ ██╔═██╗ ██║   ██║   
            </text>
            <text
              x="50%"
              y="72"
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              ██║  ██╗██║  ██╗██║   ██║   
            </text>
            <text
              x="50%"
              y="86"
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-bold tracking-widest"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   
            </text>
          </svg>
        </div>

        <Separator className="my-6" />

        {/* Legal Policies & Copyright Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <p className="text-xs text-muted-foreground text-center lg:text-left">
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm opacity-85 hover:opacity-100 transition-opacity duration-300">
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

        {/* Bottom Bar: Crafted with Love */}
        <div className="mt-6 pt-4 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground inline-flex items-center justify-center gap-1.5 font-medium">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse shrink-0" />
            <span>by</span>
            <Link
              href="/developers"
              className="text-foreground font-bold hover:text-primary transition-colors underline decoration-primary/40 underline-offset-2"
            >
              KKIT Engineering Team
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
