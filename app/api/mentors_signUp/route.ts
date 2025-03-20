import connectMongoDB from "@/lib/mongodb";
import Mentor from "@/models/mentor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const mentorData = await req.json();
    
    // Check if required fields are provided
    if (!mentorData.name || !mentorData.email || !mentorData.job_role) {
      return NextResponse.json({ message: "Name, email, and job role are required" }, { status: 400 });
    }

    // Create a new mentor
    const newMentor = await Mentor.create(mentorData);
    
    return NextResponse.json({ message: "Mentor added successfully!", mentor: newMentor }, { status: 201 });
  } catch (error) {
    console.error("Error adding mentor:", error);
    return NextResponse.json({ error: "Failed to add mentor" }, { status: 500 });
  }
}
