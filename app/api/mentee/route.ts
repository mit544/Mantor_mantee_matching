import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Mentee from "@/models/mentee";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const existing = await Mentee.findOne({ student_id: body.student_id });
    if (existing) {
      return NextResponse.json({ message: "Mentee with this ID already exists." }, { status: 400 });
    }

    const newMentee = await Mentee.create(body);
    return NextResponse.json({ message: "Mentee created successfully", data: newMentee }, { status: 201 });
  } catch (error) {
    console.error("Error creating mentee:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
