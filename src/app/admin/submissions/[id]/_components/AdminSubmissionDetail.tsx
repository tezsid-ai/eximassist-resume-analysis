"use client";

import React from "react";
import Link from "next/link";
import { SubmissionDocument } from "@/src/types/analysis";
import { ArrowLeft, Loader2, AlertCircle } from "./Icons";
import CandidateHeader from "./CandidateHeader";
import QuickStatsBar from "./QuickStatsBar";
import DomainCards from "./DomainCards";
import StrengthsPanel from "./StrengthsPanel";
import SummaryCard from "./SummaryCard";

interface AdminSubmissionDetailProps {
  submission: SubmissionDocument;
}

export default function AdminSubmissionDetail({
  submission,
}: AdminSubmissionDetailProps) {
  const getTopMatchName = (domains: any[]) => {
    if (!domains || domains.length === 0) return "N/A";
    const high = domains.find((d) => d.confidence === "High");
    if (high) return high.name;
    const med = domains.find((d) => d.confidence === "Medium");
    if (med) return med.name;
    return domains[0].name;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] font-poppins text-[var(--text-primary)] flex flex-col">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.12s; }
        .delay-3 { animation-delay: 0.20s; }
        .delay-4 { animation-delay: 0.28s; }
        .delay-5 { animation-delay: 0.36s; }
      `}</style>

      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b border-[var(--border)] h-16 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="text-right text-[10px] text-[var(--text-muted)] hidden sm:block">
            <span className="font-semibold block text-[var(--text-secondary)] select-all">
              Sub ID: {submission._id}
            </span>
            <span className="mt-0.5 block truncate max-w-[200px]" title={submission.submitterName}>
              {submission.submitterName}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 md:py-12 w-full space-y-8 md:space-y-10 overflow-hidden">
        {/* Section 1: Candidate Header Card */}
        <section className="animate-fade-in-up delay-1">
          <CandidateHeader
            submitterName={submission.submitterName}
            submitterEmail={submission.submitterEmail}
            uploadedAt={submission.uploadedAt}
            status={submission.status}
            resumeUrl={submission.resumeUrl}
          />
        </section>

        {/* Pending State */}
        {submission.status === "pending" && (
          <section className="animate-fade-in-up delay-2">
            <div className="bg-[var(--white)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] text-center flex flex-col items-center justify-center space-y-4 py-16">
              <div className="w-12 h-12 bg-[var(--brand-blue-light)] flex items-center justify-center rounded-full text-[var(--brand-blue)]">
                <Loader2 className="animate-spin w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Analysis processing
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your resume is currently being parsed. Please refresh in a moment to review insights.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Failed State */}
        {submission.status === "failed" && (
          <section className="animate-fade-in-up delay-2">
            <div className="bg-[var(--white)] p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] text-center flex flex-col items-center justify-center space-y-4 py-16">
              <div className="w-12 h-12 bg-[var(--error-light)] text-[var(--error)] flex items-center justify-center rounded-full border border-[var(--error-border)]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Analysis failed for this submission
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  The parsing pipeline encountered an error. Candidate may need to re-upload.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Completed State Dashboard */}
        {submission.status === "completed" && submission.analysis && (
          <div className="space-y-8 md:space-y-10">
            {/* Section 2: Domain Match Cards */}
            <section className="animate-fade-in-up delay-2">
              <DomainCards domains={submission.analysis.domains} />
            </section>

            {/* Section 4: Quick Stats Bar */}
            <section className="animate-fade-in-up delay-3">
              <QuickStatsBar
                domainsCount={submission.analysis.domains.length}
                strengthsCount={submission.analysis.qualities.length}
                topMatchName={getTopMatchName(submission.analysis.domains)}
              />
            </section>

            {/* Section 3: Strengths Panel */}
            <section className="animate-fade-in-up delay-4">
              <StrengthsPanel qualities={submission.analysis.qualities} />
            </section>

            {/* Section 5: AI Summary Card */}
            <section className="animate-fade-in-up delay-5">
              <SummaryCard summary={submission.analysis.summary} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
