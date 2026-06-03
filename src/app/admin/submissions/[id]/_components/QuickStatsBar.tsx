import React from "react";

interface QuickStatsBarProps {
  domainsCount: number;
  strengthsCount: number;
  topMatchName: string;
}

export default function QuickStatsBar({
  domainsCount,
  strengthsCount,
  topMatchName,
}: QuickStatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* Domains Pill */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-[var(--brand-blue)] text-white rounded-full shadow-[var(--shadow-sm)] border border-[var(--brand-blue-dark)] transition-all hover:scale-[1.01]">
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
            Domains Identified
          </span>
          <span className="text-lg font-extrabold select-all leading-tight">
            {domainsCount}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--white)]/25 flex items-center justify-center font-extrabold text-sm select-none">
          D
        </div>
      </div>

      {/* Strengths Pill */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-[var(--brand-blue)] text-white rounded-full shadow-[var(--shadow-sm)] border border-[var(--brand-blue-dark)] transition-all hover:scale-[1.01]">
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
            Strengths Found
          </span>
          <span className="text-lg font-extrabold select-all leading-tight">
            {strengthsCount}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--white)]/25 flex items-center justify-center font-extrabold text-sm select-none">
          S
        </div>
      </div>

      {/* Top Match Pill */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-[var(--brand-blue)] text-white rounded-full shadow-[var(--shadow-sm)] border border-[var(--brand-blue-dark)] transition-all hover:scale-[1.01]">
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 shrink-0">
            Top Match
          </span>
          <span
            className="text-sm font-extrabold truncate select-all leading-tight"
            title={topMatchName}
          >
            {topMatchName || "N/A"}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--white)]/25 flex items-center justify-center font-extrabold text-sm shrink-0 select-none">
          ★
        </div>
      </div>
    </div>
  );
}
