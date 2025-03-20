import connectMongoDB from "@/lib/mongodb";
import Mentee from "@/models/mentee";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const menteeData = await req.json();
    
    // Check if required fields are provided
    if (!menteeData.name || !menteeData.email || !menteeData.course) {
      return NextResponse.json({ message: "Name, email, and course are required" }, { status: 400 });
    }

    // Create a new mentee
    const newMentee = await Mentee.create(menteeData);
    
    return NextResponse.json({ message: "Mentee added successfully!", mentee: newMentee }, { status: 201 });
  } catch (error) {
    console.error("Error adding mentee:", error);
    return NextResponse.json({ error: "Failed to add mentee" }, { status: 500 });
  }
}
