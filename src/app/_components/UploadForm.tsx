"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, FileText, Loader2, CheckCircle2 } from "./Icons";

interface UploadFormProps {
  studentId: string | null;
  onSuccess?: () => void;
}

export default function UploadForm({ studentId, onSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (success) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.href = "https://eximassist.com/examination/student-dashboard.php";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [success]);

  if (!studentId) {
    return (
      <div className="text-center p-4">
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Please login first to submit your resume.
        </p>
      </div>
    );
  }

  const validateAndSetFile = (f: File) => {
    setError("");
    const isPDF = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPDF) return setError("Please select a PDF file only.");
    if (f.size > 5 * 1024 * 1024) return setError("File size exceeds 5MB limit.");
    setFile(f);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleSubmit = async () => {
    setError("");
    if (!file) return setError("Please upload your PDF resume.");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("student_id", studentId);
      formData.append("resume", file);

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-8 text-center space-y-5 font-poppins select-none animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-[var(--primary)]" />
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Resume Submitted Successfully!
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Redirecting you to the exam in {countdown} seconds...
          </p>
        </div>
        <div className="text-6xl font-black text-[var(--primary)]">{countdown}</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 text-sm text-left">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
        }}
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
          onChange={(e) => e.target.files?.[0] && validateAndSetFile(e.target.files[0])}
          disabled={loading}
          className="hidden"
        />
        {file ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-[var(--brand-blue-light)] flex items-center justify-center rounded-full text-[var(--brand-blue)]">
              <FileText className="w-6 h-6" />
            </div>
            <p className="font-semibold text-[var(--text-primary)] text-sm max-w-[280px] truncate">{file.name}</p>
            <p className="text-xs text-[var(--text-muted)] font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-[var(--surface-2)] flex items-center justify-center rounded-full text-[var(--text-secondary)]">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              <span className="text-[var(--brand-blue)] font-bold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[var(--text-muted)] font-medium">PDF files only (Max 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="text-[var(--error)] bg-[var(--error-light)] p-2.5 rounded-[var(--radius-sm)] border border-[var(--error-border)] text-xs font-semibold flex items-center gap-1.5">
          <span>⚠️</span> {error}
        </div>
      )}

      <div
        onClick={handleSubmit}
        className={`w-full py-3.5 rounded-[var(--radius-sm)] font-bold text-center text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] active:scale-[0.98] transition-all cursor-pointer shadow-[var(--shadow-sm)] flex items-center justify-center gap-2 ${
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
  );
}
