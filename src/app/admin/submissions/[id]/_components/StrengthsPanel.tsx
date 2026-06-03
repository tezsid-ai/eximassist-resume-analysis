import React from "react";
import { Quality } from "@/src/types/analysis";
import { Zap, Star } from "./Icons";

interface StrengthsPanelProps {
  qualities: Quality[];
}

export default function StrengthsPanel({ qualities }: StrengthsPanelProps) {
  return (
    <div className="space-y-6 w-full text-left">
      {/* Section Heading */}
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-[var(--brand-blue)]" />
        <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
          Key Strengths
        </h3>
      </div>

      {/* Horizontal scroll on mobile, 2x2 grid on desktop */}
      <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-6 scroll-smooth snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 shrink-0">
        {qualities.map((quality) => (
          <div
            key={quality.title}
            className="snap-start shrink-0 min-w-[280px] md:min-w-0 bg-[var(--white)] rounded-[var(--radius-md)] border border-[var(--border)] border-l-4 border-l-[var(--brand-blue)] shadow-[var(--shadow-sm)] p-5 relative flex flex-col justify-center space-y-2 hover:shadow-[var(--shadow-md)] transition-shadow duration-300"
          >
            {/* Top-Right Star Icon */}
            <div className="absolute top-4 right-4 select-none">
              <Star
                className="w-4 h-4 text-[var(--brand-blue)]"
                style={{ fill: "var(--brand-blue)" }}
              />
            </div>

            {/* Content */}
            <div className="pr-6 space-y-1">
              <h4 className="font-bold text-sm md:text-base text-[var(--text-primary)] truncate" title={quality.title}>
                {quality.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2" title={quality.description}>
                {quality.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
