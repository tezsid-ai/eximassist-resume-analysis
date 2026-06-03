import React from "react";
import { DomainRecommendation } from "@/src/types/analysis";
import { AlertTriangle } from "./ResultIcons";

interface DomainCardsProps {
  domains: DomainRecommendation[];
}

export default function DomainCards({ domains }: DomainCardsProps) {
  const getBadgeStyle = (confidence: DomainRecommendation["confidence"]) => {
    switch (confidence) {
      case "High":
        return "bg-brand-blue-light text-brand-blue font-semibold border border-brand-blue";
      case "Medium":
        return "border border-brand-blue text-brand-blue-dark font-semibold bg-brand-blue-light/20";
      case "Low":
        return "bg-surface-2 text-text-secondary border border-border font-medium";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain, index) => (
        <div
          key={`${domain.name}-${index}`}
          className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-text-primary leading-snug">
                {domain.name}
              </h3>
              <span
                className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap select-none ${getBadgeStyle(
                  domain.confidence,
                )}`}
              >
                {domain.confidence} Confidence
              </span>
            </div>

            {/* Evidence Points */}
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-text-muted">
                Why This Fits
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(domain.evidencePoints || []).map((point, idx) => (
                  <span
                    key={`${point}-${idx}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-blue-light text-brand-blue font-semibold rounded-full text-xs select-all border border-brand-blue-light"
                  >
                    <span className="font-extrabold select-none">✓</span>
                    <span>{point}</span>
                  </span>
                ))}
                {(!domain.evidencePoints || domain.evidencePoints.length === 0) && (
                  <span className="text-xs text-text-secondary italic">General alignment</span>
                )}
              </div>
            </div>
          </div>

          {/* Gap Points & Warning block */}
          <div className="mt-6 pt-4 border-t border-border/80">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-text-muted block">
                Identified Skill Gaps
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(domain.gapPoints || []).map((point, idx) => (
                  <span
                    key={`${point}-${idx}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 font-semibold rounded-full text-xs select-all"
                    style={{
                      backgroundColor: "rgba(255, 140, 0, 0.12)",
                      color: "rgba(180, 83, 9, 1)",
                    }}
                  >
                    <AlertTriangle className="text-primary-dark shrink-0 w-3 h-3" />
                    <span>{point}</span>
                  </span>
                ))}
                {(!domain.gapPoints || domain.gapPoints.length === 0) && (
                  <span className="text-xs text-text-secondary italic">No major gaps identified</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
