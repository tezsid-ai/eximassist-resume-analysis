import { query } from "./db";
import { AnalysisResult } from "../types/analysis";

export async function createStudent(data: {
  name: string;
  email: string;
  phone: string;
  password_sha256: string;
}): Promise<number> {
  const result = await query<any>(
    `INSERT INTO students (name, email, phone, password_sha256) 
     VALUES (?, ?, ?, ?) 
     ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
    [data.name, data.email, data.phone || "", data.password_sha256 || ""]
  );
  return result.insertId;
}

export async function createSubmission(data: {
  student_id: number;
  resume_url: string;
  resume_public_id: string;
}): Promise<number> {
  const result = await query<any>(
    `INSERT INTO resume_submissions (student_id, resume_url, resume_public_id, status, analysis, uploaded_at) 
     VALUES (?, ?, ?, 'pending', null, NOW())`,
    [data.student_id, data.resume_url, data.resume_public_id]
  );
  return result.insertId;
}

export async function updateSubmissionAnalysis(id: number, analysis: AnalysisResult): Promise<void> {
  await query(
    "UPDATE resume_submissions SET analysis = ?, status = 'completed' WHERE id = ?",
    [JSON.stringify(analysis), id]
  );
}

export async function updateSubmissionFailed(id: number): Promise<void> {
  await query("UPDATE resume_submissions SET status = 'failed' WHERE id = ?", [id]);
}
