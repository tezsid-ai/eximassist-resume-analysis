"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import UploadForm from "./UploadForm";

export default function UploadFormSection() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("student_id");

  if (!studentId) {
    return (
      <div className="w-full max-w-[520px] mx-auto bg-[var(--white)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] text-center font-poppins">
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Please login first to submit your resume.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[520px] text-center space-y-6">
      <div className="space-y-3">
        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[var(--brand-blue)] bg-[var(--brand-blue-light)] px-3.5 py-1.5 rounded-full">
          AI Resume Screening
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Submit Your Resume
        </h1>
        <p className="text-sm md:text-base text-[var(--text-secondary)]">
          Upload your PDF to get started with the exam.
        </p>
      </div>
      <UploadForm studentId={studentId} />
    </div>
  );
}
