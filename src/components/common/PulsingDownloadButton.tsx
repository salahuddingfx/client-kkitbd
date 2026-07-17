"use client";

import { useState } from "react";
import { DownloadRequestForm } from "./DownloadRequestForm";

interface PulsingDownloadButtonProps {
  moduleName: string;
  courseId: string;
  moduleId: string;
  className?: string;
}

export function PulsingDownloadButton({
  moduleName,
  courseId,
  moduleId,
  className = "",
}: PulsingDownloadButtonProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className={`group relative inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg overflow-hidden transition-all hover:bg-red-600 download-btn-pulse ${className}`}
      >
        <span className="absolute inset-0 rounded-lg border-2 border-red-500 animate-pulse-border pointer-events-none" />
        <svg
          className="w-5 h-5 relative z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="relative z-10">Download Module</span>
      </button>

      {showForm && (
        <DownloadRequestForm
          moduleName={moduleName}
          courseId={courseId}
          moduleId={moduleId}
          onClose={() => setShowForm(false)}
          onSuccess={() => {}}
        />
      )}
    </>
  );
}
