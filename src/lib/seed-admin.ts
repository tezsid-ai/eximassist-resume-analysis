import crypto from "crypto";
import { query } from "./db";
import { AdminRow } from "../types/analysis";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@resumeiq.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.log(
      "Seed Admin: Skipping seeding. ADMIN_PASSWORD is not defined in env.",
    );
    return;
  }

  try {
    const existingAdmins = await query<AdminRow[]>(
      "SELECT id FROM admins WHERE email = ?",
      [email]
    );

    if (existingAdmins && existingAdmins.length > 0) {
      console.log(`Seed Admin: Admin already exists with email: ${email}`);
      return;
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    await query(
      "INSERT INTO admins (name, email, password_sha256) VALUES ('Admin', ?, ?)",
      [email, hashedPassword]
    );

    console.log(`Seed Admin: Successfully seeded admin account: ${email}`);
  } catch (error) {
    console.error("Seed Admin: Error seeding admin account:", error);
  }
}
