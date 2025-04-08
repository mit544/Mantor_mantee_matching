import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Mentor from "@/models/mentor";
import { getServerSession } from "next-auth";
import User from "@/models/user"
import { authOptions } from "../auth/[...nextauth]/route";

// This route is for creating a new mentor
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    // Get the logged-in user's MongoDB _id
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const body = await req.json();

    const existing = await Mentor.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json({ message: "Mentor with this ID already exists." }, { status: 400 });
    }

    const newMentor = await Mentor.create({
      ...body,
      user_id: user._id, 
    });

    user.profileCompleted = true;
    await user.save();
        return NextResponse.json({ message: "Menntor created successfully", data: newMentor }, { status: 201 });
    
      } catch (error) {
        console.error("Error creating mentor:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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


