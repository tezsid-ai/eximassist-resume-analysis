import React from "react";
import Link from "next/link";
import { ArrowRight } from "./ResultIcons";

export default function FailedView() {
  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-md max-w-md w-full space-y-5">
        <div className="w-16 h-16 bg-red-50 text-red-600 flex items-center justify-center rounded-full mx-auto font-bold text-2xl border border-red-100">
          ⚠️
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-text-primary">
            Analysis Failed
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            We encountered an issue while analyzing your resume details. Please
            try re-uploading.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all cursor-pointer text-sm shadow-sm"
        >
          Retry Upload
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
