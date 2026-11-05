import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET() {
  let dbStatus: "connected" | "down" = "down";

  try {
    const mongoose = await connectDB();
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
      dbStatus = "connected";
    }
  } catch (err) {
    logger.error({ err }, "Database health check ping failed");
    dbStatus = "down";
  }

  return NextResponse.json({
    status: "ok",
    db: dbStatus,
  });
}
