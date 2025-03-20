import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "✅ Database connection successful!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    return NextResponse.json({ message: "❌ Failed to connect to database", error }, { status: 500 });
  }
}
