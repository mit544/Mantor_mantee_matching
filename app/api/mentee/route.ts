import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Mentee from "@/models/mentee";
import { getServerSession } from "next-auth";
import User from "@/models/user"
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();

    const existing = await Mentee.findOne({ student_id: body.student_id });
    if (existing) {
      return NextResponse.json({ message: "Mentee with this ID already exists." }, { status: 400 });
    }

    const newMentee = await Mentee.create({
      ...body,
      user_id: user._id, 
    });

    user.profileCompleted = true;
    await user.save();

    return NextResponse.json({ message: "Mentee created successfully", data: newMentee }, { status: 201 });

  } catch (error) {
    console.error("Error creating mentee:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const mentees = await Mentee.find();
    return NextResponse.json({ mentees }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching mentees:", error);
    return NextResponse.json({ message: "Failed to fetch mentees." }, { status: 500 });
  }
}