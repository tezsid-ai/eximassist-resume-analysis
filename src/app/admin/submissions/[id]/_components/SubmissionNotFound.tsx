import React from "react";
import Link from "next/link";
import { ArrowLeft } from "@/src/app/results/[id]/_components/ResultIcons";

export default function SubmissionNotFound() {
  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-md max-w-md w-full space-y-5">
        <span className="text-4xl">🔍</span>
        <h1 className="text-2xl font-bold text-text-primary">
          Submission Not Found
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          The requested resume submission could not be found.
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all cursor-pointer text-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
