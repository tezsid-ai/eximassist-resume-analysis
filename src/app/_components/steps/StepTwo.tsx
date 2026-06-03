"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, Loader2 } from "../Icons";

interface StepTwoProps {
  file: File | null;
  setFile: (file: File | null) => void;
  loading: boolean;
  error: string;
  setError: (err: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepTwo({
  file,
  setFile,
  loading,
  error,
  setError,
  onBack,
  onSubmit,
}: StepTwoProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (f: File) => {
    setError("");
    const isPDF =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPDF) return setError("Please select a PDF file only.");
    if (f.size > 5 * 1024 * 1024)
      return setError("File size exceeds 5MB limit.");
    setFile(f);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-5">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !loading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-[var(--radius-md)] p-8 text-center cursor-pointer transition-all duration-200 select-none ${
          dragActive
            ? "border-[var(--brand-blue)] bg-[var(--brand-blue-light)]"
            : file
              ? "border-[var(--brand-blue)] bg-[var(--surface)]"
              : "border-[var(--border)] hover:border-[var(--brand-blue)] hover:bg-[var(--brand-blue-light)]/20"
        } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />

        {file ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-[var(--brand-blue-light)] flex items-center justify-center rounded-full text-[var(--brand-blue)]">
              <FileText className="w-6 h-6" />
            </div>
            <p className="font-semibold text-[var(--text-primary)] text-sm max-w-[280px] truncate">
              {file.name}
            </p>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-[var(--surface-2)] flex items-center justify-center rounded-full text-[var(--text-secondary)]">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              <span className="text-[var(--brand-blue)] font-bold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              PDF files only (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-[var(--error)] bg-[var(--error-light)] p-2.5 rounded-[var(--radius-sm)] border border-[var(--error-border)] text-left text-xs font-semibold flex items-center gap-1.5">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div
          onClick={() => !loading && onBack()}
          className={`text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors cursor-pointer select-none py-2 px-1 ${
            loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          ← Go Back
        </div>

        <div
          onClick={() => {
            if (loading) return;
            if (!file) {
              return setError("Please select or drop a PDF resume first.");
            }
            onSubmit();
          }}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-[var(--radius-sm)] font-bold text-center text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] active:scale-[0.99] transition-all cursor-pointer shadow-[var(--shadow-sm)] flex items-center justify-center gap-2 select-none ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 text-[var(--white)]" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Application</span>
              <span className="text-sm font-black">→</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
