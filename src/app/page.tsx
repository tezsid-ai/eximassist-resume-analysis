"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import UploadForm from "./_components/UploadForm";

function UploadFormContainer() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get("student_id");
  const [success, setSuccess] = useState(false);

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
    <div className="w-full max-w-[520px] text-center space-y-6 animate-fade-in">
      {!success && (
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
      )}
      <UploadForm studentId={studentId} onSuccess={() => setSuccess(true)} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full relative min-h-screen flex flex-col bg-[var(--background)] font-poppins overflow-hidden">
      {/* Subtle Blue Blob Backgrounds */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--brand-blue-light)]/30 blur-[120px] -z-10" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[var(--brand-blue-light)]/25 blur-[120px] -z-10" />

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--white)]/85 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <img 
              src="/eximassist-logo.png" 
              alt="EximAssist Logo" 
              className="h-18 w-auto object-contain" 
            />
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-6 relative z-10">
        <Suspense fallback={
          <div className="w-full max-w-[520px] mx-auto bg-[var(--white)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] text-center text-xs text-[var(--text-muted)] font-medium">
            Loading...
          </div>
        }>
          <UploadFormContainer />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-6xl mx-auto px-6">
          <p>© 2026 EximAssist. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
