export interface DomainRecommendation {
  name: string;
  confidence: "High" | "Medium" | "Low";
  evidencePoints: string[];
  gapPoints: string[];
}

export interface KeyQuality {
  title: string;
  description: string;
}

export interface Quality {
  title: string;
  description: string;
}

export interface ResumeAnalysis {
  submitterName: string;
  submitterEmail: string;
  uploadedAt: string;
  domains: DomainRecommendation[];
  qualities: KeyQuality[];
  summary: string;
}

export interface AnalysisResult {
  summary: string;
  domains: DomainRecommendation[];
  qualities: Quality[];
}

export interface SubmissionDocument {
  id: number;
  student_id: number;
  resume_url: string;
  resume_public_id: string;
  uploaded_at: string;
  status: "pending" | "completed" | "failed";
  analysis: AnalysisResult | null;

  // UI Compatibility virtual fields (joined from students table)
  _id: string;
  submitterName: string;
  submitterEmail: string;
  uploadedAt: string;
  resumeUrl: string;
}

export interface StudentRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  password_sha256: string;
  created_at: string;
}

export interface AdminRow {
  id: number;
  name: string;
  email: string;
  password_sha256: string;
  created_at: string;
}
