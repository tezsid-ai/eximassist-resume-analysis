import React from "react";
import { KeyQuality } from "@/src/types/analysis";
import { CheckCircle2 } from "./ResultIcons";

interface QualityCardsProps {
  qualities: KeyQuality[];
}

export default function QualityCards({ qualities }: QualityCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {qualities.map((quality, index) => (
        <div
          key={`${quality.title}-${index}`}
          className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left"
        >
          <div className="w-10 h-10 bg-[var(--brand-blue-light)] text-[var(--brand-blue)] flex items-center justify-center rounded-full mb-4">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-base font-bold text-text-primary mb-2">
            {quality.title}
          </h3>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            {quality.description}
          </p>
        </div>
      ))}
    </div>
  );
}
