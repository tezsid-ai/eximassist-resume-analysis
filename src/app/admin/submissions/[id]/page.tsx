import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";
import { getSubmission } from "@/src/lib/get-submission";
import AdminSubmissionDetail from "./_components/AdminSubmissionDetail";
import SubmissionNotFound from "./_components/SubmissionNotFound";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmissionDetailPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const submission = await getSubmission(id);

  if (!submission) {
    return <SubmissionNotFound />;
  }

  return <AdminSubmissionDetail submission={submission} />;
}
