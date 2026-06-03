import { query } from "./db";
import { SubmissionDocument, AnalysisResult } from "../types/analysis";

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

export async function getSubmissionById(id: number): Promise<SubmissionDocument | null> {
  const rows = await query<any[]>(
    `SELECT 
      s.id,
      s.student_id,
      s.resume_url,
      s.resume_public_id,
      s.uploaded_at,
      s.status,
      s.analysis,
      st.name AS submitterName,
      st.email AS submitterEmail
    FROM resume_submissions s
    LEFT JOIN students st ON s.student_id = st.id
    WHERE s.id = ?`,
    [id]
  );
  if (!rows || rows.length === 0) return null;
  const row = rows[0];
  return {
    id: row.id,
    student_id: row.student_id,
    resume_url: row.resume_url,
    resume_public_id: row.resume_public_id,
    uploaded_at: row.uploaded_at instanceof Date ? row.uploaded_at.toISOString() : new Date(row.uploaded_at).toISOString(),
    status: row.status,
    analysis: typeof row.analysis === "string" ? JSON.parse(row.analysis) : row.analysis,
    _id: row.id.toString(),
    submitterName: row.submitterName || "",
    submitterEmail: row.submitterEmail || "",
    uploadedAt: row.uploaded_at instanceof Date ? row.uploaded_at.toISOString() : new Date(row.uploaded_at).toISOString(),
    resumeUrl: row.resume_url
  };
}

export async function getAllSubmissions(): Promise<SubmissionDocument[]> {
  const rows = await query<any[]>(
    `SELECT 
      s.id,
      s.student_id,
      s.resume_url,
      s.resume_public_id,
      s.uploaded_at,
      s.status,
      s.analysis,
      st.name AS submitterName,
      st.email AS submitterEmail
    FROM resume_submissions s
    LEFT JOIN students st ON s.student_id = st.id
    ORDER BY s.uploaded_at DESC`
  );
  return (rows || []).map((row) => ({
    id: row.id,
    student_id: row.student_id,
    resume_url: row.resume_url,
    resume_public_id: row.resume_public_id,
    uploaded_at: row.uploaded_at instanceof Date ? row.uploaded_at.toISOString() : new Date(row.uploaded_at).toISOString(),
    status: row.status,
    analysis: typeof row.analysis === "string" ? JSON.parse(row.analysis) : row.analysis,
    _id: row.id.toString(),
    submitterName: row.submitterName || "",
    submitterEmail: row.submitterEmail || "",
    uploadedAt: row.uploaded_at instanceof Date ? row.uploaded_at.toISOString() : new Date(row.uploaded_at).toISOString(),
    resumeUrl: row.resume_url
  }));
}
