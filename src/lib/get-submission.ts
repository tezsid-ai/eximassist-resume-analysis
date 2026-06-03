import { getSubmissionById } from "./submissions";

export async function getSubmission(id: string): Promise<any | null> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return null;
  }

  try {
    return await getSubmissionById(numericId);
  } catch (error) {
    console.error("Error in getSubmission:", error);
    return null;
  }
}
