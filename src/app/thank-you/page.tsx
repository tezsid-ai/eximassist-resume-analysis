import React from "react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] p-6 font-poppins">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
      
      <div className="w-full max-w-[480px] bg-[var(--white)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] p-8 md:p-10 text-center animate-fade-in flex flex-col items-center space-y-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--brand-blue)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--brand-blue)]"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Resume Submitted!
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Thank you for submitting your resume.
          </p>
        </div>

        <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)] w-full">
          You may close this tab.
        </p>
      </div>
    </div>
  );
}
