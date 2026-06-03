"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "../Icons";

interface StepOneProps {
  form: any;
  setForm: (form: any) => void;
  onNext: () => void;
}

export default function StepOne({ form, setForm, onNext }: StepOneProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleNext = () => {
    setValidationError("");

    // 1. Full Name Validation
    if (!form.name.trim()) {
      return setValidationError("Full Name is required.");
    }

    // 2. Email Validation
    if (!form.email.trim()) {
      return setValidationError("Email Address is required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setValidationError("Please enter a valid email address.");
    }

    // 3. Phone Number Validation
    if (!form.phone.trim()) {
      return setValidationError("Phone Number is required.");
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      return setValidationError("Phone number must be exactly 10 digits.");
    }

    // 4. OTP Validation
    if (!form.otp.trim()) {
      return setValidationError("OTP is required.");
    }

    // 5. Password Validation
    if (!form.password) {
      return setValidationError("Password is required.");
    }
    if (form.password.length < 8) {
      return setValidationError("Password must be at least 8 characters long.");
    }

    // 6. Confirm Password Validation
    if (form.password !== form.confirmPassword) {
      return setValidationError("Passwords do not match.");
    }

    onNext();
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1.5 text-left">
        <label
          htmlFor="name"
          className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] font-medium text-sm transition-all"
        />
      </div>

      {/* Email Address */}
      <div className="space-y-1.5 text-left">
        <label
          htmlFor="email"
          className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] font-medium text-sm transition-all"
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-1.5 text-left">
        <label
          htmlFor="phone"
          className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="10-digit phone number"
          value={form.phone}
          maxLength={10}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setForm({ ...form, phone: val });
          }}
          className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] font-medium text-sm transition-all"
        />
      </div>

      {/* OTP box */}
      <div className="space-y-1.5 text-left">
        <label
          htmlFor="otp"
          className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer"
        >
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          placeholder="Enter OTP code"
          value={form.otp}
          maxLength={6}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setForm({ ...form, otp: val });
          }}
          className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] font-medium text-sm transition-all"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5 text-left relative">
        <label
          htmlFor="password"
          className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full pl-4 pr-10 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] font-medium text-sm transition-all"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer select-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </div>
        </div>
        <p className="text-[10px] text-[var(--text-muted)] font-medium">
          * Password must be at least 8 characters long.
        </p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5 text-left relative">
        <label
          htmlFor="confirmPassword"
          className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full pl-4 pr-10 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] font-medium text-sm transition-all"
          />
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer select-none"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Error message */}
      {validationError && (
        <div className="text-[var(--error)] bg-[var(--error-light)] p-2.5 rounded-[var(--radius-sm)] border border-[var(--error-border)] text-left text-xs font-semibold flex items-center gap-1.5">
          <span>⚠️</span> {validationError}
        </div>
      )}

      {/* Next button */}
      <div
        onClick={handleNext}
        className="w-full py-3.5 mt-2 rounded-[var(--radius-sm)] font-bold text-center text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] active:scale-[0.99] transition-all cursor-pointer shadow-[var(--shadow-sm)] flex items-center justify-center gap-1.5 select-none"
      >
        Next Step <span className="text-base font-black">→</span>
      </div>
    </div>
  );
}
