"use client";

import React, { useState, useEffect } from "react";
import { DomainRecommendation } from "@/src/types/analysis";
import { Target, CheckCircle2, AlertTriangle } from "./Icons";

interface DomainCardsProps {
  domains: DomainRecommendation[];
}

const ProgressRing = ({ confidence }: { confidence: "High" | "Medium" | "Low" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = confidence === "High" ? 85 : confidence === "Medium" ? 60 : 35;
    const t = setTimeout(() => setProgress(target), 150);
    return () => clearTimeout(t);
  }, [confidence]);

  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center shadow-[var(--shadow-sm)] animate-fade-in"
      style={{
        background: `conic-gradient(var(--primary-light) ${progress}%, var(--surface-2) ${progress}% 100%)`,
        transition: "background 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--white)] flex items-center justify-center font-extrabold text-sm  text-[#F86232] shadow-inner select-none">
        {progress}%
      </div>
    </div>
  );
};

export default function DomainCards({ domains }: DomainCardsProps) {
  const getConfidenceStyle = (c: string) => {
    const map: Record<string, string> = {
      High: "bg-[var(--brand-blue-light)] text-[var(--brand-blue)] font-semibold border border-[var(--brand-blue)]",
      Medium: "border border-[var(--brand-blue)] text-[var(--brand-blue-dark)] font-semibold bg-[var(--brand-blue-light)]/20",
      Low: "border border-[var(--border)] text-[var(--text-muted)] font-medium bg-[var(--surface)]",
    };
    return map[c] || "";
  };

  return (
    <div className="space-y-6 w-full text-left">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-[var(--brand-blue)]" />
        <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">Domain Fit Analysis</h3>
      </div>

      <div
        className="grid gap-6 w-full"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {domains.map((domain) => (
          <div
            key={domain.name}
            className="bg-[var(--white)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-sm)] p-5 md:p-6 flex flex-col justify-between space-y-6 cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden min-w-0 w-full"
          >
            <div className="flex items-start justify-between gap-3 min-w-0">
              <h4 className="font-bold text-base text-[var(--text-primary)] truncate" title={domain.name}>
                {domain.name}
              </h4>
              <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 select-none ${getConfidenceStyle(domain.confidence)}`}>
                {domain.confidence}
              </span>
            </div>

            <div className="flex justify-center py-1 shrink-0">
              <ProgressRing confidence={domain.confidence} />
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              {/* Row 1: WHY THIS FITS */}
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-[var(--text-primary)] select-none">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Why this fits</span>
                </div>
                <div className="flex flex-wrap gap-[6px] w-full overflow-hidden">
                  {(domain.evidencePoints || []).map((point, idx) => (
                    <span
                      key={`${point}-${idx}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--brand-blue-light)] text-[var(--brand-blue)] font-semibold rounded-full select-all whitespace-nowrap w-fit max-w-none border border-[var(--brand-blue-light)]"
                      style={{ fontSize: "12px" }}
                      title={point}
                    >
                      <CheckCircle2 className="w-3 h-3 text-[var(--brand-blue)] shrink-0" />
                      <span>{point}</span>
                    </span>
                  ))}
                  {(!domain.evidencePoints || domain.evidencePoints.length === 0) && (
                    <span className="text-xs text-[var(--text-muted)] italic select-none">General alignment</span>
                  )}
                </div>
              </div>

              {/* Row 2: WHAT'S MISSING */}
              <div className="space-y-2 text-left pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-1.5 select-none">
                  <AlertTriangle className="w-3.5 h-3.5" style={{ color: "rgba(180, 83, 9, 1)" }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(180, 83, 9, 1)" }}>
                    What's missing
                  </span>
                </div>
                <div className="flex flex-wrap gap-[6px] w-full overflow-hidden">
                  {(domain.gapPoints || []).map((point, idx) => (
                    <span
                      key={`${point}-${idx}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 font-semibold rounded-full select-all whitespace-nowrap w-fit max-w-none"
                      style={{
                        backgroundColor: "rgba(255, 140, 0, 0.12)",
                        color: "rgba(180, 83, 9, 1)",
                        fontSize: "12px",
                      }}
                      title={point}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(180, 83, 9, 1)" }} />
                      <span>{point}</span>
                    </span>
                  ))}
                  {(!domain.gapPoints || domain.gapPoints.length === 0) && (
                    <span className="text-xs text-[var(--text-muted)] italic select-none">No major gaps identified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
