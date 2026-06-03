import { NextRequest, NextResponse } from "next/server";
import { runMigration } from "@/src/lib/migrate";

export async function GET(req: NextRequest) {
  const key = req.headers.get("x-migrate-key");
  const expectedKey = process.env.MIGRATE_KEY;

  if (!expectedKey || key !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await runMigration();
    return NextResponse.json({ success: true, message: "Migration completed successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Migration failed" }, { status: 500 });
  }
}
