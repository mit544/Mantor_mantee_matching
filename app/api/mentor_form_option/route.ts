import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import MentorOptions from "@/models/mentorOptions";

// This route is for fetching and updating mentor options
export async function GET() {
    await connectMongoDB();
    const options = await MentorOptions.findOne();
    return NextResponse.json({ options });
  }
  
  export async function POST(req: Request) {
    await connectMongoDB();
    const data = await req.json();
    const updated = await MentorOptions.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
    });
    return NextResponse.json({ message: "Mentor options updated", updated });
  }