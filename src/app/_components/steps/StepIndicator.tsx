"use client";

import React from "react";
import { Check } from "../Icons";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: "Details" },
    { number: 2, label: "Resume" },
  ];

  return (
    <div className="w-full relative flex items-center justify-between px-4 pb-4">
      {/* Connecting Line */}
      <div className="absolute top-[22px] left-[15%] right-[15%] h-[2px] bg-[var(--border)] -z-10">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300"
          style={{ width: currentStep > 1 ? "100%" : "0%" }}
        />
      </div>

      {steps.map((step) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;

        return (
          <div key={step.number} className="flex flex-col items-center flex-1 relative">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                isCompleted
                  ? "bg-[var(--primary)] text-[var(--white)] border border-[var(--primary)]"
                  : isActive
                    ? "bg-[var(--primary)] text-[var(--white)] border-2 border-[var(--primary)] shadow-[0_0_0_4px_var(--primary-light)]"
                    : "bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border)]"
              }`}
            >
              {isCompleted ? (
                <Check className="w-5 h-5 text-[var(--white)]" />
              ) : (
                <span>{step.number}</span>
              )}
            </div>
            <span
              className={`mt-2.5 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                isActive || isCompleted
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
