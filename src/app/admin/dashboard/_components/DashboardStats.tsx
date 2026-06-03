import React from "react";
import { SubmissionDocument } from "@/src/types/analysis";

interface DashboardStatsProps {
  submissions: SubmissionDocument[];
}

export default function DashboardStats({ submissions }: DashboardStatsProps) {
  const total = submissions.length;
  const completed = submissions.filter((s) => s.status === "completed").length;

  // Calculate Top Domain
  const domainCounts: Record<string, number> = {};
  for (const sub of submissions) {
    if (sub.status === "completed" && sub.analysis?.domains) {
      for (const d of sub.analysis.domains) {
        domainCounts[d.name] = (domainCounts[d.name] || 0) + 1;
      }
    }
  }

  let topDomain = "None";
  let maxCount = 0;
  for (const [name, count] of Object.entries(domainCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topDomain = name;
    }
  }

  const statItems = [
    { title: "Total Submissions", value: total, desc: "All resume uploads" },
    {
      title: "Completed Analyses",
      value: completed,
      desc: "Successfully parsed",
    },
    { title: "Top Domain", value: topDomain, desc: "Most recommended field" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statItems.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="bg-white p-6 rounded-xl border border-border border-l-4 border-l-[var(--brand-blue)] shadow-sm space-y-2 text-left"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-text-muted">
            {item.title}
          </span>
          <h3 className="text-xl font-black text-text-primary truncate">
            {item.value}
          </h3>
          <p className="text-xs text-text-secondary">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
