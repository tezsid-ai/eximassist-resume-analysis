import React from "react";
import { Quote } from "./Icons";

interface SummaryCardProps {
  summary: string;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <section
      className="w-full p-6 md:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] border-l-4 border-l-[var(--brand-blue)] shadow-[var(--shadow-sm)] flex items-start gap-4 md:gap-6 text-left"
      style={{ backgroundColor: "rgba(35, 55, 141, 0.06)" }}
    >
      {/* Quote Icon */}
      <div className="shrink-0 text-[var(--brand-blue)] select-none">
        <Quote className="w-10 h-10" />
      </div>

      {/* Summary Content */}
      <div className="space-y-2">
        <h4 className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)] select-none">
          AI Executive Summary
        </h4>
        <p className="text-base md:text-lg italic font-medium text-[var(--text-primary)] leading-relaxed select-text">
          "{summary}"
        </p>
      </div>
    </section>
  );
}
