"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, X } from "lucide-react";

const enrollments = [
  { name: "Sarah", city: "Dhaka", course: "Web Development" },
  { name: "Rahim", city: "Chittagong", course: "React Masterclass" },
  { name: "Nusrat", city: "Sylhet", course: "UI/UX Design" },
  { name: "Tanvir", city: "Rajshahi", course: "Python for Data Science" },
  { name: "Fatima", city: "Khulna", course: "Mobile App Development" },
  { name: "Arif", city: "Comilla", course: "Node.js Backend" },
  { name: "Sabrina", city: "Mymensingh", course: "TypeScript Advanced" },
  { name: "Imran", city: "Barisal", course: "Flutter Development" },
];

export function EnrollmentNotification() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10000);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % enrollments.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  const enrollment = enrollments[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 sm:left-6 z-50 max-w-xs bg-background border border-border rounded-xl shadow-xl p-4"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {enrollment.name} from {enrollment.city}
              </p>
              <p className="text-xs text-muted-foreground">
                Just enrolled in <span className="text-primary font-medium">{enrollment.course}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
