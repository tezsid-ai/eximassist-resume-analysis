import React from "react";
import { FileText } from "./Icons";

interface CandidateHeaderProps {
  submitterName: string;
  submitterEmail: string;
  uploadedAt: string | Date;
  status: "pending" | "completed" | "failed";
  resumeUrl: string;
}

export default function CandidateHeader({
  submitterName,
  submitterEmail,
  uploadedAt,
  status,
  resumeUrl,
}: CandidateHeaderProps) {
  const formattedDate = new Date(uploadedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Helper to get initials
  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const getStatusStyle = (s: typeof status) => {
    switch (s) {
      case "completed":
        return "bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border border-[var(--brand-blue)] font-semibold";
      case "pending":
        return "bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border)] font-medium";
      case "failed":
        return "bg-[var(--error-light)] text-[var(--error)] border border-[var(--error-border)] font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-[var(--white)] p-6 md:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] border-l-4 border-l-[var(--brand-blue)] shadow-[var(--shadow-md)] flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Left side: Avatar + Candidate details */}
      <div className="flex items-center gap-4 text-left">
        <div className="w-14 h-14 rounded-full bg-[var(--brand-blue)] text-[var(--white)] font-bold flex items-center justify-center text-white text-lg shadow-[var(--shadow-sm)] border border-[var(--brand-blue-dark)] shrink-0 select-none">
          {getInitials(submitterName)}
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
              {submitterName}
            </h2>
            <span
              className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider select-none shrink-0 ${getStatusStyle(
                status,
              )}`}
            >
              {status}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{submitterEmail}</p>
          <p className="text-xs text-[var(--text-muted)]">Submitted {formattedDate}</p>
        </div>
      </div>

      {/* Right side: View Resume PDF Button */}
      <div className="shrink-0 flex justify-start md:justify-end">
        <a
          href={`/api/view-pdf?url=${encodeURIComponent(resumeUrl)}&filename=${encodeURIComponent(
            `${submitterName.replace(/\s+/g, "_")}_Resume.pdf`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--border)] hover:border-[var(--brand-blue)] hover:bg-[var(--surface)] text-[var(--text-primary)] font-semibold rounded-[var(--radius-sm)] transition-all cursor-pointer text-sm shadow-[var(--shadow-sm)] active:scale-[0.98]"
        >
          <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>View Resume PDF</span>
        </a>
      </div>
    </div>
  );
}
