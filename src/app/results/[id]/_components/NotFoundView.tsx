import React from "react";
import Link from "next/link";
import { ArrowLeft } from "./ResultIcons";

export default function NotFoundView() {
  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-md max-w-md w-full space-y-5">
        <span className="text-4xl">🔍</span>
        <h1 className="text-2xl font-bold text-text-primary">
          Analysis Not Found
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          We couldn't locate any resume analysis for this reference ID. Please
          try uploading again.
        </p>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all cursor-pointer text-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
