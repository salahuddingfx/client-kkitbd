"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X, CheckCircle2 } from "lucide-react";
import { enrollmentsApi } from "@/services/api";

interface EnrollmentItem {
  id?: string;
  name: string;
  city: string;
  course: string;
}

const FALLBACK_LIST: EnrollmentItem[] = [
  { name: "Sarah K.", city: "Dhaka", course: "Full-Stack Web Development" },
  { name: "Rahim M.", city: "Chittagong", course: "React & Next.js Masterclass" },
  { name: "Nusrat J.", city: "Sylhet", course: "UI/UX Product Design" },
  { name: "Tanvir A.", city: "Rajshahi", course: "Python & Data Science" },
  { name: "Fatima Z.", city: "Khulna", course: "Mobile App Development" },
  { name: "Arif H.", city: "Comilla", course: "Node.js & Microservices" },
];

export function EnrollmentNotification() {
  const [items, setItems] = useState<EnrollmentItem[]>(FALLBACK_LIST);
  const [current, setCurrent] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("enrollment_dismissed") === "true") {
      setIsDismissed(true);
    }
  }, []);

  useEffect(() => {
    enrollmentsApi
      .getRecentPublic(8)
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (items.length === 0 || isDismissed) return;

    const showTimer = setTimeout(() => {
      if (localStorage.getItem("enrollment_dismissed") !== "true") {
        setVisible(true);
      }
    }, 6000);

    const interval = setInterval(() => {
      if (localStorage.getItem("enrollment_dismissed") === "true") {
        setVisible(false);
        return;
      }
      setCurrent((prev) => (prev + 1) % items.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 18000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [items, isDismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setIsDismissed(true);
    localStorage.setItem("enrollment_dismissed", "true");
  };

  const enrollment = items[current] || FALLBACK_LIST[0];

  return (
    <AnimatePresence>
      {visible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="fixed bottom-20 left-4 sm:left-6 z-50 max-w-xs bg-background/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-2xl p-3.5 ring-1 ring-primary/10"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 text-muted-foreground/70 hover:text-foreground p-0.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5 pr-3">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-foreground truncate">
                  {enrollment.name}
                </p>
                <span className="text-[10px] text-muted-foreground/80 font-medium">({enrollment.city})</span>
              </div>
              <p className="text-xs text-muted-foreground leading-tight">
                Just enrolled in <span className="text-primary font-semibold">{enrollment.course}</span>
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                <CheckCircle2 className="h-3 w-3" /> Verified Enrollment
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
