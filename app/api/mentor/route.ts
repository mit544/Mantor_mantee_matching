import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Mentor from "@/models/mentor";

// This route is for creating a new mentor
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const existing = await Mentor.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json({ message: "Mentor with this email already exists." }, { status: 400 });
    }

    const newMentor = new Mentor({ ...body });
    await newMentor.save();

    return NextResponse.json({ message: "Mentor added successfully!", mentor: newMentor }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding mentor:", error);
    return NextResponse.json({ message: "Server error while adding mentor." }, { status: 500 });
  }
}

// This route is for fetching all mentors
export async function GET() {
  try {
    await connectMongoDB();
    const mentors = await Mentor.find();
    return NextResponse.json({ mentors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch mentors." }, { status: 500 });
  }
}


