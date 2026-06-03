/**
 * POST /api/admin/signup
 * Body (raw JSON):
 * {
 *   "email": "admin@resumeiq.com",
 *   "password": "yourpassword",
 *   "secretKey": "your_secret_key_here"
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "@/src/lib/db";
import { AdminRow } from "@/src/types/analysis";

export async function POST(req: NextRequest) {
  try {
    const { email, password, secretKey } = await req.json();

    // 1. Validate fields
    if (!email || !password || !secretKey) {
      return NextResponse.json(
        { error: "Email, password, and secretKey are required." },
        { status: 400 },
      );
    }

    // 2. Validate secret key against env variable
    const expectedSecretKey = process.env.ADMIN_SECRET_KEY;
    if (!expectedSecretKey || secretKey !== expectedSecretKey) {
      return NextResponse.json(
        { error: "Unauthorized. Secret key mismatch." },
        { status: 401 },
      );
    }

    // 3. Check if admin already exists
    const existingAdmins = await query<AdminRow[]>(
      "SELECT id FROM admins WHERE email = ?",
      [email]
    );

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: "Admin already exists." },
        { status: 409 },
      );
    }

    // 4. Hash password and create admin record
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const name = email.split("@")[0];

    await query(
      "INSERT INTO admins (name, email, password_sha256) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      { success: true, message: "Admin created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Admin Signup API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred." },
      { status: 500 },
    );
  }
}
