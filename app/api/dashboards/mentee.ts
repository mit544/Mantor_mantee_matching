import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Mentee from "@/models/mentee";

// This route is for fetching mentee data for the dashboard
export async function GET(req: NextRequest) {
    try {
      await connectMongoDB();

      // Get the session and validate it
      const session = await getServerSession(authOptions);
      if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // Extract email from session
      const email = session.user.email;

      // Find the mentee details using the email
      const mentee = await Mentee.findByUserEmail(email);

      if (!mentee) {
        return NextResponse.json({ message: "Mentee data not found" }, { status: 404 });
      }

      // Return the mentee details
      return NextResponse.json({ mentee }, { status: 200 });
    } catch (error) {
      console.error("Error fetching mentee data:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
