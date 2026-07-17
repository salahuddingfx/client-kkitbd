"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const BASE_COUNT = 12847;

export function StudentTicker() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <Users className="h-3.5 w-3.5 text-green-600" />
      <span className="text-xs font-medium text-green-700 dark:text-green-400">
        {count.toLocaleString()} students online now
      </span>
    </div>
  );
}
