"use client";

import React from "react";
import { UploadCloud, FileText } from "./Icons";

interface DropZoneProps {
  file: File | null;
  dragActive: boolean;
  loading: boolean;
  handleDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DropZone({
  file,
  dragActive,
  loading,
  handleDrag,
  onDrop,
  onClick,
  fileInputRef,
  onFileChange,
}: DropZoneProps) {
  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={onDrop}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-[var(--radius-md)] p-8 text-center cursor-pointer transition-all duration-200 ${
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
        onChange={onFileChange}
        disabled={loading}
        className="hidden"
      />

      {file ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-[var(--brand-blue-light)] flex items-center justify-center rounded-full text-[var(--brand-blue)]">
            <FileText className="w-6 h-6" />
          </div>
          <p className="font-semibold text-[var(--text-primary)]">{file.name}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-[var(--surface-2)] flex items-center justify-center rounded-full text-[var(--text-secondary)]">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="font-medium text-[var(--text-primary)]">
            <span className="text-[var(--brand-blue)] font-semibold">
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
  );
}
