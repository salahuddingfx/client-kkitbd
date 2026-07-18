"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, Badge, Button, Input } from "@/components/ui";
import { Breadcrumb, Container, SectionHeader } from "@/components/common";
import { FadeIn } from "@/components/animations";
import { Clock, Users, Star, Tag, Zap, Copy, CheckCircle, ArrowRight, Timer } from "lucide-react";
import { offersApi, Offer, Course } from "@/services/api";
import { formatCurrency } from "@/utils";

function CountdownTimer({ endDate }: { endDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(endDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) { clearInterval(interval); return; }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex gap-2">
      {[
        { label: "Days", value: time.days },
        { label: "Hrs", value: time.hours },
        { label: "Min", value: time.minutes },
        { label: "Sec", value: time.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-12 h-12 rounded-lg bg-background/80 border border-border flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">{String(item.value).padStart(2, "0")}</span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 block">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function CouponBox({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-dashed border-primary/30">
        <Tag className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono font-bold text-primary text-sm">{code}</span>
      </div>
      <button onClick={handleCopy} className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors">
        {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
      </button>
    </div>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <FadeIn>
      <div className="animated-border-lg h-full">
        <Card className="h-full overflow-hidden border-transparent bg-background">
          {/* Banner */}
          <div className="relative h-48 overflow-hidden">
            {offer.bannerImage?.url ? (
              <Image src={offer.bannerImage.url} alt={offer.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-500 via-red-500 to-orange-500" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 border-0">
                <Zap className="h-3 w-3 mr-1" />
                {offer.badge || "Special Offer"}
              </Badge>
            </div>

            {/* Discount */}
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/90 text-foreground font-bold text-xl shadow-lg">
                {offer.discountType === "percentage"
                  ? `${offer.discountValue}% OFF`
                  : offer.discountType === "fixed"
                  ? `৳${offer.discountValue} OFF`
                  : "Buy 1 Get 1"}
              </div>
            </div>

            {/* Timer */}
            {offer.endDate && (
              <div className="absolute bottom-4 left-4 z-10">
                <CountdownTimer endDate={offer.endDate} />
              </div>
            )}
          </div>

          <CardContent className="p-5">
            <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>
            {offer.shortDescription && (
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{offer.shortDescription}</p>
            )}

            {/* Coupon */}
            {offer.couponCode && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1.5">Use coupon code:</p>
                <CouponBox code={offer.couponCode} />
              </div>
            )}

            {/* Courses preview */}
            {offer.courses?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Included courses ({offer.courses.length}):</p>
                <div className="space-y-1.5">
                  {offer.courses.slice(0, 3).map((course: Course) => (
                    <div key={course._id} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="truncate">{course.title}</span>
                    </div>
                  ))}
                  {offer.courses.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{offer.courses.length - 3} more courses</p>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link href="/courses">
              <Button className="w-full gap-2">
                View Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await offersApi.getActive();
        setOffers(res.data || []);
      } catch {
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
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
              Limited Time Offers
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Exclusive Deals & Discounts
            </h1>
            <p className="text-lg text-muted-foreground">
              Don't miss out on our special promotional offers. Grab a coupon code and save big on your learning journey.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-20">
              <Tag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Active Offers</h3>
              <p className="text-muted-foreground mb-6">Check back soon for exciting deals and discounts.</p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <OfferCard key={offer._id} offer={offer} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
