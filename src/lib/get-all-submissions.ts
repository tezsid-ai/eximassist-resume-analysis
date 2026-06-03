import { getAllSubmissions as fetchAll } from "./submissions";

export async function getAllSubmissions(): Promise<any[]> {
  try {
    return await fetchAll();
  } catch (error) {
    console.error("Error in getAllSubmissions:", error);
    return [];
  }
}
