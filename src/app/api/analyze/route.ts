import { NextRequest, NextResponse } from "next/server";
import {
  createSubmission,
  updateSubmissionAnalysis,
  updateSubmissionFailed,
} from "@/src/lib/submissions";
import { uploadToCloudinary, callGemini } from "@/src/lib/analyze-helpers";
import cloudinary from "@/src/lib/cloudinary";

const GEMINI_PROMPT = `
You are an expert career counselor and resume analyst. Analyze this resume deeply and return ONLY a valid JSON object with no markdown, no backticks, no explanation.

JSON structure:
{
  "summary": "2-3 sentence honest overall assessment",
  "domains": [
    {
      "name": "Domain name",
      "confidence": "High|Medium|Low",
      "evidencePoints": ["Skill or project from resume", "Another specific evidence", "Another one", "Max 4 items"],
      "gapPoints": ["Specific missing skill", "Another gap", "Max 3 items"]
    }
  ],
  "qualities": [
    {
      "title": "Short quality title (3 words max)",
      "description": "One sentence referencing specific resume content"
    }
  ]
}

Rules & Instructions:
- Return exactly 2-3 domains, ordered by confidence.
- Return exactly 3-4 qualities, only the strongest signals.
- Be direct and specific, reference actual content from their resume.
- Never be generic (avoid: hardworking, team player, fast learner).
- qualities descriptions must reference specific projects or skills from the resume.
- evidencePoints: array of 3-4 SHORT labels (2-4 words each) that are specific skills, technologies, or experiences FROM the resume that make this domain a fit. Examples: "Next.js Projects", "MERN Internship", "Leadership Role", "SaaS Built"
- gapPoints: array of 2-3 SHORT labels (2-4 words each) of specific skills or experiences MISSING for this domain. Examples: "System Design", "AWS Knowledge", "Testing Skills", "Backend Depth"
- Never use full sentences in evidencePoints or gapPoints.
- Each point must be independently meaningful to a hiring manager.
`;

export async function POST(req: NextRequest) {
  let submissionId: number | null = null;

  try {
    const formData = await req.formData();
    const studentIdRaw = formData.get("student_id");
    const file = formData.get("resume") as File | null;

    // Validate
    if (!studentIdRaw || !file) {
      return NextResponse.json(
        { error: "Both student_id and resume are required." },
        { status: 400 }
      );
    }

    const student_id = Number(studentIdRaw);
    if (isNaN(student_id)) {
      return NextResponse.json(
        { error: "student_id must be a valid number." },
        { status: 400 }
      );
    }

    const isPDF =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const isUnder5MB = file.size <= 5 * 1024 * 1024;

    if (!isPDF) {
      return NextResponse.json(
        { error: "Resume must be a PDF file." },
        { status: 400 }
      );
    }

    if (!isUnder5MB) {
      return NextResponse.json(
        { error: "Resume file size must be under 5MB." },
        { status: 400 }
      );
    }

    // Upload PDF to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinaryResult = await uploadToCloudinary(buffer);

    // Create resume_submission row
    submissionId = await createSubmission({
      student_id,
      resume_url: cloudinaryResult.secure_url,
      resume_public_id: cloudinaryResult.public_id,
    });

    // Convert PDF to base64 string
    const base64Data = buffer.toString("base64");

    // Call Gemini API (gemini-2.5-flash) and parse JSON
    let parsedResult;
    try {
      parsedResult = await callGemini(base64Data, GEMINI_PROMPT);
    } catch (geminiError: any) {
      console.error("Gemini analysis error:", geminiError);
      if (submissionId !== null) {
        await updateSubmissionFailed(submissionId);
      }
      return NextResponse.json(
        { error: geminiError?.message || "Failed to analyze resume with Gemini." },
        { status: 500 }
      );
    }

    // Save analysis to DB
    await updateSubmissionAnalysis(submissionId, parsedResult);

    // Return 201 Success
    return NextResponse.json(
      { success: true, submissionId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Analyze API general error:", error);
    if (submissionId !== null) {
      try {
        await updateSubmissionFailed(submissionId);
      } catch (dbErr) {
        console.error("Failed to mark submission status as failed:", dbErr);
      }
    }
    return NextResponse.json(
      { error: error?.message || "An internal server error occurred." },
      { status: 500 }
    );
  }
}
