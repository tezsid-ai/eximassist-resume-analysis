import React from "react";
import Link from "next/link";
import { getSubmission } from "@/src/lib/get-submission";
import { ArrowLeft, ArrowRight, Clock, User } from "./_components/ResultIcons";
import DomainCards from "./_components/DomainCards";
import QualityCards from "./_components/QualityCards";
import NotFoundView from "./_components/NotFoundView";
import PendingView from "./_components/PendingView";
import FailedView from "./_components/FailedView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;
  const doc = await getSubmission(id);

  // 1. Not Found State
  if (!doc) {
    return <NotFoundView />;
  }

  // 2. Pending State
  if (doc.status === "pending") {
    return <PendingView id={id} />;
  }

  // 3. Failed State
  if (doc.status === "failed") {
    return <FailedView />;
  }

  const formattedDate = new Date(doc.uploadedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 4. Completed State
  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-border backdrop-blur-md bg-white/95 h-16 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-[var(--brand-blue)] transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity cursor-pointer select-none"
          >
            <img src="/eximassist-logo.png" alt="EximAssist Logo" className="h-8 w-auto object-contain" />
          </Link>

          <div className="flex-col text-right hidden sm:flex">
            <div className="flex items-center gap-1 text-xs font-semibold text-text-secondary">
              <User className="w-3.5 h-3.5" />
              <span>{doc.submitterName}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-text-muted mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Results Layout */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full space-y-12">
        {/* Header Block */}
        <div className="text-left space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-blue)] bg-[var(--brand-blue-light)] px-3.5 py-1.5 rounded-full">
            Analysis Complete
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
            Your Resume Profile Insights
          </h1>
          <p className="text-sm text-text-secondary">
            AI-powered resume evaluation and engineering domain mapping.
          </p>
        </div>

        {/* AI Summary Card */}
        {doc.analysis && (
          <section className="bg-white p-6 md:p-8 rounded-xl border border-border border-l-4 border-l-[var(--brand-blue)] shadow-sm space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-text-muted">
              AI Executive Summary
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium">
              {doc.analysis.summary}
            </p>
          </section>
        )}

        {/* Domain Recommendations Grid */}
        {doc.analysis?.domains && (
          <section className="space-y-6">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-text-primary">
                Domain Mapping & Fit
              </h2>
              <p className="text-sm text-text-secondary">
                Matches your skills to key engineering domains and identifies
                core roadblocks.
              </p>
            </div>
            <DomainCards domains={doc.analysis.domains} />
          </section>
        )}

        {/* Key Qualities Grid */}
        {doc.analysis?.qualities && (
          <section className="space-y-6">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-text-primary">
                Your Strongest Signals
              </h2>
              <p className="text-sm text-text-secondary">
                Standout competencies highlighted by our parser model.
              </p>
            </div>
            <QualityCards qualities={doc.analysis.qualities} />
          </section>
        )}

        {/* Bottom CTA Block */}
        {/* <section className="bg-surface border border-border rounded-2xl py-12 px-6 text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-text-primary">
              Not aligned with your dream roles?
            </h3>
            <p className="text-sm text-text-secondary">
              Refined your resume with the recommendations above? Run another
              evaluation.
            </p>
          </div>
          <Link
            href="/#upload"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-black rounded-full font-semibold transition-all hover:scale-[1.02] shadow-sm hover:shadow-md cursor-pointer text-sm"
          >
            Want to improve your resume? Upload again
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section> */}
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-border py-8 text-center text-sm text-text-secondary">
        <p>© 2026 EximAssist. Powered by AI.</p>
      </footer>
    </div>
  );
}
