import MenteeOptions from "@/models/menteeOptions";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// This route is for fetching and updating mentee options
export async function GET() {
    await connectMongoDB();
    const options = await MenteeOptions.findOne();
    return NextResponse.json({ options });
  }
  
  export async function POST(req: Request) {
    await connectMongoDB();
    const data = await req.json();
    const updated = await MenteeOptions.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
    });
    return NextResponse.json({ message: "Mentee options updated", updated });
  }
  