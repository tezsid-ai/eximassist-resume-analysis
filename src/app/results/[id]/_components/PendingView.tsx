import React from "react";
import Link from "next/link";

interface PendingViewProps {
  id: string;
}

export default function PendingView({ id }: PendingViewProps) {
  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-md max-w-md w-full space-y-6">
        <div className="w-16 h-16 bg-[var(--brand-blue-light)] flex items-center justify-center rounded-full mx-auto text-[var(--brand-blue)]">
          <svg
            className="animate-spin h-8 w-8 text-[var(--brand-blue)]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-text-primary">
            Analyzing Your Resume...
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Your resume is being analyzed, please refresh in a moment.
          </p>
        </div>
        <Link
          href={`/results/${id}`}
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all cursor-pointer text-sm shadow-sm"
        >
          Refresh Page
        </Link>
      </div>
    </div>
  );
}
