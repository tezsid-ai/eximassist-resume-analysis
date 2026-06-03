"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { SubmissionDocument } from "@/src/types/analysis";
import { LogOut, Search } from "./DashboardIcons";
import DashboardStats from "./DashboardStats";

interface AdminDashboardProps {
  submissions: SubmissionDocument[];
}

export default function AdminDashboard({ submissions }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  const filteredSubmissions = (submissions || []).filter((sub) => {
    if (!sub) return false;
    const term = (searchTerm || "").trim().toLowerCase();
    const name = (sub.submitterName || "").toLowerCase();
    const email = (sub.submitterEmail || "").toLowerCase();
    const status = (sub.status || "").toLowerCase();
    return name.includes(term) || email.includes(term) || status.includes(term);
  });

  const getStatusBadge = (status: SubmissionDocument["status"]) => {
    switch (status) {
      case "completed":
        return "bg-brand-blue text-white font-semibold border border-brand-blue-dark";
      case "pending":
        return "bg-surface-2 text-text-secondary border border-border font-medium";
      case "failed":
        return "bg-red-50 text-red-600 border border-red-100 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm h-16 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer select-none"
          >
            <img src="/eximassist-logo.png" alt="EximAssist Logo" className="h-8 w-auto object-contain" />
            <span className="text-[10px] bg-brand-blue text-white px-2 py-0.5 rounded font-semibold uppercase tracking-wider">Admin</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-border hover:bg-surface-2 rounded-md font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-xs"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary">
              Submissions Dashboard
            </h1>
            <p className="text-xs md:text-sm text-text-secondary">
              Review and monitor AI-powered resume processing pipelines.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md border border-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-light focus:outline-none placeholder:text-text-muted text-text-primary text-xs bg-white cursor-pointer"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats submissions={submissions} />

        {/* Submissions Table / Mobile Stack */}
        <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface border-b border-border text-text-secondary font-bold select-none">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      <td className="p-4 font-bold text-text-primary">
                        {sub.submitterName}
                      </td>
                      <td className="p-4 text-text-secondary">
                        {sub.submitterEmail}
                      </td>
                      <td className="p-4 text-text-muted">
                        {new Date(sub.uploadedAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full select-none ${getStatusBadge(
                            sub.status,
                          )}`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          href={`/admin/submissions/${sub._id}`}
                          className="px-3.5 py-1.5 border border-border hover:bg-surface-2 text-text-secondary hover:text-text-primary font-semibold rounded-md transition-colors cursor-pointer inline-block"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-text-muted font-medium"
                    >
                      No submissions found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View */}
          <div className="md:hidden divide-y divide-border">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub) => (
                <div key={sub._id} className="p-5 space-y-4 text-left">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-text-primary">
                        {sub.submitterName}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {sub.submitterEmail}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap select-none ${getStatusBadge(
                        sub.status,
                      )}`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">
                      {new Date(sub.uploadedAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <Link
                      href={`/admin/submissions/${sub._id}`}
                      className="px-4 py-2 border border-border hover:bg-surface-2 text-text-secondary hover:text-text-primary font-semibold rounded-md transition-colors cursor-pointer inline-block"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-text-muted font-medium text-xs">
                No submissions found matching criteria.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
