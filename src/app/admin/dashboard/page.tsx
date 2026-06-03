import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";
import { getAllSubmissions } from "@/src/lib/get-all-submissions";
import AdminDashboard from "./_components/AdminDashboard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const submissions = await getAllSubmissions();

  return <AdminDashboard submissions={submissions} />;
}
