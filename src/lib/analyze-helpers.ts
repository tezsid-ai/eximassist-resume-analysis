import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "./cloudinary";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export function uploadToCloudinary(
  fileBuffer: Buffer,
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "eximassist/resumes",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed."));
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );
    uploadStream.end(fileBuffer);
  });
}

// Helper to execute async function with exponential backoff and jitter
async function runWithRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1500,
  factor = 2,
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0) {
      // Add a randomized jitter between 0 and 300ms to avoid simultaneous retries
      const jitter = Math.random() * 300;
      const sleepTime = delay + jitter;
      console.warn(
        `[Gemini API] Request failed. Retrying in ${Math.round(
          sleepTime,
        )}ms... (${retries} attempts remaining). Error: ${error.message || error}`,
      );
      await new Promise((resolve) => setTimeout(resolve, sleepTime));
      return runWithRetry(fn, retries - 1, delay * factor, factor);
    }
    throw error;
  }
}

export async function callGemini(
  base64Data: string,
  prompt: string,
): Promise<any> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in env variables.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // Helper to execute generation with a specific model name
  const executeGeneration = async (modelName: string) => {
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Data,
                mimeType: "application/pdf",
              },
            },
          ],
        },
      ],
    });

    const text = response.response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  };

  try {
    // Primary attempt: Call gemini-2.5-flash with retries (3 retries, starting at 1.5s delay)
    return await runWithRetry(
      () => executeGeneration("gemini-2.5-flash"),
      3,
      1500,
      2,
    );
  } catch (primaryError: any) {
    console.error(
      `[Gemini API] Primary model (gemini-2.5-flash) failed: ${
        primaryError.message || primaryError
      }`,
    );
    console.log(
      "[Gemini API] Attempting fallback model (gemini-1.5-flash) with retry strategy...",
    );

    try {
      // Secondary attempt: Fallback to highly stable gemini-1.5-flash with retries
      return await runWithRetry(
        () => executeGeneration("gemini-1.5-flash"),
        2,
        1000,
        2,
      );
    } catch (fallbackError: any) {
      console.error(
        `[Gemini API] Fallback model failed: ${fallbackError.message || fallbackError}`,
      );
      throw new Error(
        `Resume Analysis failed due to high demand on Gemini servers. Please try again in a few moments.`,
      );
    }
  }
}
